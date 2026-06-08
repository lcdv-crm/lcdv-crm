/* ══════════════════════════════════════════════════════
   LCDV CRM — app.js  (PWA Mobile-first + Google Sheets)
   ══════════════════════════════════════════════════════ */

const SK = 'lcdv_crm_v2';
const GS_URL = 'https://script.google.com/macros/s/AKfycbxvbsNuaqg2BZMQSEBGybjOea8o-4YpSJq0ySZMTwxtacYUt8msQv_eqvMW5hzI4i6v2w/exec';

const CAT_COLOR = {
  'Restaurant / Brasserie':  '#185FA5',
  'Hôtel / Autre':           '#EF9F27',
  'Traiteur / Épicerie fine':'#7F77DD',
  'Boucherie / Boulangerie': '#E24B4A',
  'Drink / Cave':            '#1D9E75',
  'Siège / Bureau':          '#888780',
};

/* ── État global ───────────────────────────────────────── */
let clients, visites, todos, nextCId, nextVId, nextTId;
let editCliId = null, selectedProds = [], currentVisitType = 'Visite terrain';
let currentCatFilter = '';
let currentTodoFilter = 'all', editTodoId = null, currentTodoPrio = 'normale';
let map, markers = [];
let deferredInstallPrompt = null;
let syncTimeout = null;

/* ── Google Sheets Sync ────────────────────────────────── */
async function syncFromSheets() {
  showSyncStatus('sync');
  try {
    const [r1, r2, r3] = await Promise.all([
      fetch(GS_URL + '?action=read&sheet=clients').then(r=>r.json()),
      fetch(GS_URL + '?action=read&sheet=visites').then(r=>r.json()),
      fetch(GS_URL + '?action=read&sheet=todos').then(r=>r.json()),
    ]);
    if (r1.ok && r1.data.length > 0) {
      clients = r1.data.map(c => ({...c, id: Number(c.id), lat: c.lat?Number(c.lat):null, lng: c.lng?Number(c.lng):null, produits: c.produits?c.produits.split('|').filter(Boolean):[]}));
      nextCId = Math.max(...clients.map(c=>c.id)) + 1;
    }
    if (r2.ok && r2.data.length > 0) {
      visites = r2.data.map(v => ({...v, id: Number(v.id), clientId: Number(v.clientId)}));
      nextVId = Math.max(...visites.map(v=>v.id)) + 1;
    }
    if (r3.ok && r3.data.length > 0) {
      todos = r3.data.map(t => ({...t, id: Number(t.id), clientId: t.clientId?Number(t.clientId):null, done: t.done==='true'||t.done===true}));
      nextTId = Math.max(...todos.map(t=>t.id)) + 1;
    }
    persist();
    syncSelects();
    renderClients();
    renderVisites();
    renderTodos();
    refreshMap();
    showSyncStatus('ok');
  } catch(e) {
    console.error('Sync error:', e);
    showSyncStatus('error');
  }
}

async function syncToSheets() {
  try {
    const clientsData = clients.map(c => ({...c, produits: (c.produits||[]).join('|')}));
    await Promise.all([
      fetch(GS_URL, {method:'POST', body: JSON.stringify({action:'write', sheet:'clients', data: clientsData})}),
      fetch(GS_URL, {method:'POST', body: JSON.stringify({action:'write', sheet:'visites', data: visites})}),
      fetch(GS_URL, {method:'POST', body: JSON.stringify({action:'write', sheet:'todos', data: todos})}),
    ]);
    showSyncStatus('ok');
  } catch(e) {
    console.error('Sync to sheets error:', e);
    showSyncStatus('error');
  }
}

function scheduleSyncToSheets() {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(syncToSheets, 2000);
}

function showSyncStatus(status) {
  const el = document.getElementById('sync-status');
  if (!el) return;
  if (status === 'sync') { el.innerHTML = '<i class="ti ti-refresh" style="animation:spin 1s linear infinite"></i>'; el.title = 'Synchronisation...'; el.style.color = 'rgba(245,240,232,.5)'; }
  else if (status === 'ok') { el.innerHTML = '<i class="ti ti-cloud-check"></i>'; el.title = 'Synchronisé'; el.style.color = '#1D9E75'; setTimeout(()=>{el.innerHTML='<i class="ti ti-cloud"></i>';el.style.color='rgba(245,240,232,.3)';}, 3000); }
  else { el.innerHTML = '<i class="ti ti-cloud-off"></i>'; el.title = 'Erreur de sync'; el.style.color = '#E24B4A'; }
}

/* ── Chargement ────────────────────────────────────────── */
function loadState() {
  try {
    const s = localStorage.getItem(SK);
    if (s) { const d = JSON.parse(s); clients=d.clients; visites=d.visites; todos=d.todos||[]; nextCId=d.nextCId; nextVId=d.nextVId; nextTId=d.nextTId||1; return; }
  } catch(e) {}
  clients = JSON.parse(JSON.stringify(KML_CLIENTS));
  visites = [];
  todos = [];
  nextCId = clients.length + 1;
  nextVId = 1;
  nextTId = 1;
}

function persist() {
  try { localStorage.setItem(SK, JSON.stringify({clients,visites,todos,nextCId,nextVId,nextTId})); } catch(e) {}
}

/* ── Utilitaires ───────────────────────────────────────── */
function allProds() { const s=new Set(); clients.forEach(c=>(c.produits||[]).forEach(p=>s.add(p))); return[...s].sort(); }
function allComms() { const s=new Set(); clients.forEach(c=>{if(c.comm)s.add(c.comm)}); visites.forEach(v=>{if(v.comm)s.add(v.comm)}); return[...s].sort(); }
function lastVisit(cid) { return visites.filter(v=>v.clientId===cid).sort((a,b)=>b.date.localeCompare(a.date))[0]||null; }
function notVisited(cid,days=30) { const lv=lastVisit(cid); if(!lv)return true; return(Date.now()-new Date(lv.date))/86400000>days; }
function fmtDate(iso) { return new Date(iso).toLocaleDateString('fr-BE'); }

/* ── PWA Install ───────────────────────────────────────── */
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstallPrompt = e;
  document.getElementById('install-banner').style.display = 'flex';
});
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('install-btn').addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') document.getElementById('install-banner').style.display = 'none';
    deferredInstallPrompt = null;
  });
});

/* ── Service Worker ────────────────────────────────────── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
}

/* ── Sync selects ──────────────────────────────────────── */
function syncSelects() {
  const comms = allComms(), prods = allProds();
  ['map-comm','fv-cm'].forEach(id => {
    const el=document.getElementById(id); if(!el)return;
    const v=el.value;
    el.innerHTML='<option value="">Tous commerciaux</option>'+comms.map(c=>`<option>${c}</option>`).join('');
    el.value=v;
  });
  const mp=document.getElementById('map-prod');
  if(mp){const v=mp.value;mp.innerHTML='<option value="">Tous produits</option>'+prods.map(p=>`<option>${p}</option>`).join('');mp.value=v;}
  const dl=document.getElementById('comm-list');
  if(dl) dl.innerHTML=comms.map(c=>`<option value="${c}">`).join('');
  updateStats();
}

function updateStats() {
  const now=new Date(),m=now.getMonth(),y=now.getFullYear();
  const vi=visites.filter(v=>{const d=new Date(v.date);return d.getMonth()===m&&d.getFullYear()===y}).length;
  const nv=clients.filter(c=>notVisited(c.id)).length;
  document.getElementById('ms-tot').textContent=clients.length;
  document.getElementById('ms-rb').textContent=clients.filter(c=>c.categorie==='Restaurant / Brasserie').length;
  document.getElementById('ms-vi').textContent=vi;
  document.getElementById('ms-nv').textContent=nv;
}

function updateFilterCount() {
  const cat=document.getElementById('map-cat').value;
  const comm=document.getElementById('map-comm').value;
  const prod=document.getElementById('map-prod').value;
  const n=[cat,comm,prod].filter(Boolean).length;
  const el=document.getElementById('filter-count');
  if(el) el.textContent = n>0 ? n : '';
}

/* ── Navigation ────────────────────────────────────────── */
function goTab(id, btn) {
  document.querySelectorAll('.pg').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.nav-btn[data-tab]').forEach(b=>b.classList.remove('on'));
  document.getElementById('pg-'+id).classList.add('on');
  if(btn) btn.classList.add('on');
  if(id==='map') refreshMap();
  else if(id==='clients') renderClients();
  else if(id==='visites') renderVisites();
  else if(id==='todo') renderTodos();
  else renderZones();
}

function toggleFilters() {
  const p=document.getElementById('filter-panel');
  p.style.display = p.style.display==='none'?'flex':'none';
}

/* ── Carte ─────────────────────────────────────────────── */
function initMap() {
  map = L.map('map',{zoomControl:true}).setView([50.59,5.9],10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom:18
  }).addTo(map);
  refreshMap();
}

function refreshMap() {
  if(!map) return;
  markers.forEach(m=>map.removeLayer(m)); markers=[];
  const q=(document.getElementById('map-q').value||'').toLowerCase();
  const cat=document.getElementById('map-cat').value;
  const comm=document.getElementById('map-comm').value;
  const prod=document.getElementById('map-prod').value;

  clients.filter(c=>{
    if(cat&&c.categorie!==cat)return false;
    if(comm&&c.comm!==comm)return false;
    if(prod&&!(c.produits||[]).includes(prod))return false;
    if(q&&!c.societe.toLowerCase().includes(q))return false;
    return c.lat&&c.lng;
  }).forEach(c=>{
    const noV=notVisited(c.id);
    const col=CAT_COLOR[c.categorie]||'#888';
    const lv=lastVisit(c.id);
    const border=noV?'3px solid #991f1f':'2px solid #fff';
    const icon=L.divIcon({
      html:`<div style="width:13px;height:13px;border-radius:50%;background:${col};border:${border};box-shadow:0 1px 3px rgba(0,0,0,.35)"></div>`,
      className:'',iconSize:[13,13],iconAnchor:[6,6]
    });
    const prodsHtml=(c.produits||[]).length
      ?'<div style="margin-top:5px">'+(c.produits||[]).map(p=>`<span style="display:inline-block;padding:1px 7px;border-radius:10px;font-size:11px;background:#FAEEDA;color:#633806;margin:2px">${p}</span>`).join('')+'</div>':'';
    const visitHtml=lv
      ?`<div style="margin-top:5px;font-size:11px;color:#666">Dernière visite: ${fmtDate(lv.date)} — ${lv.comm}</div>`
      :`<div style="margin-top:5px;font-size:11px;color:#c00;font-weight:600">Aucune visite enregistrée</div>`;
    const popup=`<div style="font-family:system-ui,sans-serif;font-size:13px;min-width:200px">
      <strong style="font-size:14px">${c.societe}</strong><br>
      <span style="color:#888;font-size:12px">${c.categorie}${c.comm?` · ${c.comm}`:''}</span>
      ${prodsHtml}${visitHtml}
      ${c.notes?`<div style="font-size:11px;color:#aaa;margin-top:3px">${c.notes}</div>`:''}
    </div>`;
    const m=L.marker([c.lat,c.lng],{icon}).bindPopup(popup).addTo(map);
    markers.push(m);
  });
}

/* ── Clients (cards) ───────────────────────────────────── */
function setCatFilter(cat, btn) {
  currentCatFilter = cat;
  document.querySelectorAll('.filter-chip').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  renderClients();
}

function renderClients() {
  const q=(document.getElementById('sc').value||'').toLowerCase();
  const list=clients.filter(c=>
    (!q||c.societe.toLowerCase().includes(q))&&
    (!currentCatFilter||c.categorie===currentCatFilter)
  );
  const container=document.getElementById('clients-list');
  if(!list.length){
    container.innerHTML=`<div class="empty-state"><i class="ti ti-building-store"></i><p>Aucun client trouvé</p></div>`;
    return;
  }
  container.innerHTML=list.map(c=>{
    const col=CAT_COLOR[c.categorie]||'#888';
    const lv=lastVisit(c.id);
    const noV=notVisited(c.id);
    const lvText=lv?`Dernière visite : ${fmtDate(lv.date)} — ${lv.comm}`:'Aucune visite enregistrée';
    const prodsHtml=(c.produits||[]).slice(0,3).map(p=>`<span class="prod-tag">${p}</span>`).join('')+
      ((c.produits||[]).length>3?`<span style="font-size:11px;color:var(--text-3)"> +${(c.produits||[]).length-3}</span>`:'');
    return `<div class="client-card" onclick="openCli(${c.id})">
      <span class="cat-dot" style="background:${col}"></span>
      <div class="card-body">
        <div class="card-name">${c.societe}</div>
        <div class="card-meta">${c.categorie}${c.comm?` · <strong>${c.comm}</strong>`:''}</div>
        ${prodsHtml?`<div class="card-tags">${prodsHtml}</div>`:''}
        <div class="card-visit${noV?' alert':''}">${noV?'⚠ ':''} ${lvText}</div>
      </div>
      <i class="ti ti-chevron-right card-arrow"></i>
    </div>`;
  }).join('');
}

/* ── Visites (cards) ───────────────────────────────────── */
function renderVisites() {
  const q=(document.getElementById('sv').value||'').toLowerCase();
  const fc=document.getElementById('fv-cm').value;
  const list=visites.filter(v=>{
    const c=clients.find(x=>x.id===v.clientId);
    const cn=c?c.societe:'';
    return(!q||(cn+v.comm+(v.note||'')).toLowerCase().includes(q))&&(!fc||v.comm===fc);
  }).sort((a,b)=>b.date.localeCompare(a.date));
  const container=document.getElementById('visites-list');
  if(!list.length){
    container.innerHTML=`<div class="empty-state"><i class="ti ti-calendar-off"></i><p>Aucune visite enregistrée.<br>Utilisez le bouton <strong>+</strong> pour en ajouter.</p></div>`;
    return;
  }
  container.innerHTML=list.map(v=>{
    const c=clients.find(x=>x.id===v.clientId);
    return `<div class="visit-card">
      <div class="visit-card-header">
        <div>
          <div class="visit-client">${c?c.societe:'—'}</div>
          <div class="visit-meta">
            <span class="visit-type-badge">${v.type}</span>${v.comm||''}
          </div>
        </div>
        <div style="text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:6px">
          <span class="visit-date">${fmtDate(v.date)}</span>
          <button
