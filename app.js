@@ -1,8 +1,9 @@
/* ══════════════════════════════════════════════════════
   LCDV CRM — app.js  (PWA Mobile-first)
   LCDV CRM — app.js  (PWA Mobile-first + Google Sheets)
   ══════════════════════════════════════════════════════ */

const SK = 'lcdv_crm_v2';
const GS_URL = 'https://script.google.com/macros/s/AKfycbxvbsNuaqg2BZMQSEBGybjOea8o-4YpSJq0ySZMTwxtacYUt8msQv_eqvMW5hzI4i6v2w/exec';

const CAT_COLOR = {
  'Restaurant / Brasserie':  '#185FA5',
@@ -20,6 +21,69 @@ let currentCatFilter = '';
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
@@ -164,8 +228,8 @@ function refreshMap() {
      ${prodsHtml}${visitHtml}
      ${c.notes?`<div style="font-size:11px;color:#aaa;margin-top:3px">${c.notes}</div>`:''}
    </div>`;
    L.marker([c.lat,c.lng],{icon}).bindPopup(popup).addTo(map);
    markers.push(L.marker([c.lat,c.lng],{icon}));
    const m=L.marker([c.lat,c.lng],{icon}).bindPopup(popup).addTo(map);
    markers.push(m);
  });
}

@@ -183,13 +247,11 @@ function renderClients() {
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
@@ -219,13 +281,11 @@ function renderVisites() {
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
@@ -238,356 +298,4 @@ function renderVisites() {
        </div>
        <div style="text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:6px">
          <span class="visit-date">${fmtDate(v.date)}</span>
          <button class="visit-del" onclick="delVis(${v.id})"><i class="ti ti-trash"></i></button>
        </div>
      </div>
      ${v.prods?`<div class="visit-note" style="margin-top:4px"><i class="ti ti-bottle" style="font-size:12px;vertical-align:-1px"></i> ${v.prods}</div>`:''}
      ${v.note?`<div class="visit-note">${v.note}</div>`:''}
    </div>`;
  }).join('');
}

/* ── Distribution ──────────────────────────────────────── */
function renderZones() {
  const allP=allProds();
  const container=document.getElementById('zone-content');
  if(!allP.length){
    container.innerHTML=`<div class="empty-state" style="margin:20px 14px"><i class="ti ti-info-circle"></i><p>Ajoutez des produits aux fiches clients pour visualiser la distribution par catégorie.</p></div>`;
    return;
  }
  container.innerHTML=Object.keys(CAT_COLOR).map(cat=>{
    const cc=clients.filter(c=>c.categorie===cat);
    if(!cc.length)return'';
    const catP=new Set();cc.forEach(c=>(c.produits||[]).forEach(p=>catP.add(p)));
    const missing=allP.filter(p=>!catP.has(p));
    const pct=Math.round(catP.size/allP.length*100);
    const col=CAT_COLOR[cat];
    return `<div class="zone-card">
      <div class="zone-header">
        <div class="zone-title"><span class="leg-dot" style="background:${col}"></span>${cat}</div>
        <span class="zone-meta">${cc.length} établ. · ${catP.size}/${allP.length} produits</span>
      </div>
      <div class="zone-bar-bg"><div class="zone-bar-fill" style="width:${pct}%;background:${col}"></div></div>
      <div>${[...catP].map(p=>`<span class="prod-tag">${p}</span>`).join('')||'<span style="font-size:12px;color:var(--text-3)">Aucun produit associé</span>'}</div>
      ${missing.length?`<div class="zone-missing">Non distribué : ${missing.join(', ')}</div>`:''}
    </div>`;
  }).join('');
}

/* ── Modal client ──────────────────────────────────────── */
function openCli(id) {
  if(id!==null){
    const c=clients.find(x=>x.id===id);if(!c)return;
    editCliId=id;selectedProds=[...(c.produits||[])];
    document.getElementById('mcli-title').textContent='Modifier';
    document.getElementById('cl-soc').value=c.societe||'';
    document.getElementById('cl-con').value=c.contact||'';
    document.getElementById('cl-email').value=c.email||'';
    document.getElementById('cl-tel').value=c.tel||'';
    document.getElementById('cl-cat').value=c.categorie||'Restaurant / Brasserie';
    document.getElementById('cl-comm').value=c.comm||'';
    document.getElementById('cl-st').value=c.statut||'Client';
    document.getElementById('cl-lat').value=(c.lat&&c.lng)?`${c.lat}, ${c.lng}`:'';
    document.getElementById('cl-notes').value=c.notes||'';
  } else {
    editCliId=null;selectedProds=[];
    document.getElementById('mcli-title').textContent='Nouveau client';
    ['cl-soc','cl-con','cl-email','cl-tel','cl-comm','cl-lat','cl-notes'].forEach(i=>document.getElementById(i).value='');
    document.getElementById('cl-cat').value='Restaurant / Brasserie';
    document.getElementById('cl-st').value='Client';
  }
  renderProdChips();
  document.getElementById('mcli').classList.add('open');
  setTimeout(()=>document.getElementById('cl-soc').focus(),300);
}

function renderProdChips() {
  const all=[...new Set([...allProds(),...selectedProds])].sort();
  document.getElementById('prod-chips').innerHTML=all.map(p=>
    `<button class="chip${selectedProds.includes(p)?' sel':''}" onclick="toggleProd(this,'${p.replace(/'/g,"\\'")}' )">${p}</button>`
  ).join('');
}

function toggleProd(el,p) {
  selectedProds.includes(p)?selectedProds=selectedProds.filter(x=>x!==p):selectedProds.push(p);
  el.classList.toggle('sel');
}

function addProduit() {
  const inp=document.getElementById('new-prod');
  const v=inp.value.trim();if(!v)return;
  if(!selectedProds.includes(v))selectedProds.push(v);
  inp.value='';renderProdChips();
}

function saveCli() {
  const latv=document.getElementById('cl-lat').value.trim();
  let lat=null,lng=null;
  if(latv){const p=latv.split(',').map(x=>parseFloat(x.trim()));if(p.length===2&&!isNaN(p[0])&&!isNaN(p[1])){[lat,lng]=p;}}
  const o={
    id:editCliId||nextCId++,
    societe:document.getElementById('cl-soc').value||'Sans nom',
    contact:document.getElementById('cl-con').value,
    email:document.getElementById('cl-email').value,
    tel:document.getElementById('cl-tel').value,
    categorie:document.getElementById('cl-cat').value,
    comm:document.getElementById('cl-comm').value,
    statut:document.getElementById('cl-st').value,
    produits:[...selectedProds],
    notes:document.getElementById('cl-notes').value,
    lat,lng,
  };
  if(editCliId){const i=clients.findIndex(c=>c.id===editCliId);clients[i]=o;}
  else clients.push(o);
  persist();closeMod('mcli');renderClients();refreshMap();syncSelects();
}

function delCli(id) {
  if(!confirm('Supprimer ce client ?'))return;
  clients=clients.filter(c=>c.id!==id);
  visites=visites.filter(v=>v.clientId!==id);
  persist();renderClients();refreshMap();updateStats();
}

/* ── Modal visite ──────────────────────────────────────── */
function openVisite(prefillClientId=null) {
  const sel=document.getElementById('vi-cli');
  const sorted=[...clients].sort((a,b)=>a.societe.localeCompare(b.societe,'fr'));
  sel.innerHTML='<option value="">— Choisir un client —</option>'+
    sorted.map(c=>`<option value="${c.id}"${c.id===prefillClientId?' selected':''}>${c.societe}</option>`).join('');
  document.getElementById('vi-date').value=new Date().toISOString().slice(0,10);
  ['vi-comm','vi-prods'].forEach(i=>document.getElementById(i).value='');
  document.getElementById('vi-note').innerHTML='';
  setVisitType('Visite terrain', document.querySelector('.type-btn'));
  document.getElementById('mvis').classList.add('open');
}

function setVisitType(type, btn) {
  currentVisitType=type;
  document.querySelectorAll('.type-btn').forEach(b=>b.classList.remove('on'));
  if(btn) btn.classList.add('on');
}

function saveVisite() {
  const cid=parseInt(document.getElementById('vi-cli').value);
  if(!cid){alert('Veuillez sélectionner un client.');return;}
  const noteEl=document.getElementById('vi-note');
  visites.push({
    id:nextVId++,clientId:cid,
    comm:document.getElementById('vi-comm').value,
    date:document.getElementById('vi-date').value,
    type:currentVisitType,
    prods:document.getElementById('vi-prods').value,
    note:noteEl.innerHTML||'',
  });
  persist();closeMod('mvis');renderVisites();syncSelects();
}

function delVis(id) {
  if(!confirm('Supprimer cette visite ?'))return;
  visites=visites.filter(v=>v.id!==id);
  persist();renderVisites();updateStats();
}

function closeMod(id) {
  document.getElementById(id).classList.remove('open');
}

/* ── Export CSV ────────────────────────────────────────── */
function exportCSV() {
  const rows=[['ID','Société','Catégorie','Statut','Commercial','Contact','Email','Téléphone','Produits','Dernière visite','Notes']];
  clients.forEach(c=>{
    const lv=lastVisit(c.id);
    rows.push([c.id,c.societe,c.categorie,c.statut,c.comm||'',c.contact||'',c.email||'',c.tel||'',
      (c.produits||[]).join(' | '),lv?lv.date:'',c.notes||'']);
  });
  const csv=rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(';')).join('\n');
  const blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;
  a.download=`LCDV_Clients_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();URL.revokeObjectURL(url);
}

/* ── Rich text ─────────────────────────────────────────── */
function rtCmd(cmd) {
  document.getElementById('vi-note').focus();
  document.execCommand(cmd, false, null);
}

function addTodoFromNote() {
  const cid=parseInt(document.getElementById('vi-cli').value)||null;
  closeMod('mvis');
  openTodo(null, cid);
}

/* ── To Do ─────────────────────────────────────────────── */
function setTodoFilter(f, btn) {
  currentTodoFilter=f;
  document.querySelectorAll('.todo-filters .filter-chip').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  renderTodos();
}

function setTodoPrio(prio, btn) {
  currentTodoPrio=prio;
  document.querySelectorAll('#todo-prio-group .type-btn').forEach(b=>b.classList.remove('on'));
  if(btn) btn.classList.add('on');
}

function renderTodos() {
  const list = currentTodoFilter==='pending' ? todos.filter(t=>!t.done)
             : currentTodoFilter==='done'    ? todos.filter(t=>t.done)
             : todos;
  const container=document.getElementById('todo-list');
  if(!list.length){
    container.innerHTML=`<div class="empty-state"><i class="ti ti-checklist"></i><p>${currentTodoFilter==='done'?'Aucune tâche terminée':'Aucune tâche en cours'}</p></div>`;
    updateTodoBadge();
    return;
  }
  // Sort: pending first, then by date
  const sorted=[...list].sort((a,b)=>{
    if(a.done!==b.done) return a.done?1:-1;
    const prioOrder={haute:0,normale:1,basse:2};
    if(!a.done&&prioOrder[a.prio]!==prioOrder[b.prio]) return prioOrder[a.prio]-prioOrder[b.prio];
    if(a.echeance&&b.echeance) return a.echeance.localeCompare(b.echeance);
    return 0;
  });
  container.innerHTML=sorted.map(t=>{
    const cli=t.clientId?clients.find(c=>c.id===t.clientId):null;
    const overdue=!t.done&&t.echeance&&new Date(t.echeance)<new Date();
    return `<div class="todo-card${t.done?' done':''}">
      <button class="todo-check-btn${t.done?' checked':''}" onclick="toggleTodoDone(${t.id})" title="${t.done?'Rouvrir':'Marquer comme fait'}">
        ${t.done?'<i class="ti ti-check"></i>':''}
      </button>
      <div class="todo-body">
        <div class="todo-title">${t.titre}</div>
        <div class="todo-meta">
          <span class="prio-badge prio-${t.prio}">${t.prio==='haute'?'↑ Haute':t.prio==='basse'?'↓ Basse':'Normale'}</span>
          ${cli?`<span>🏢 ${cli.societe}</span> · `:''}
          ${t.comm?`<span>👤 ${t.comm}</span>`:''}
          ${t.echeance?`<span${overdue?' style="color:#A32D2D;font-weight:600"':''}>📅 ${fmtDate(t.echeance)}${overdue?' (En retard)':''}</span>`:''}
        </div>
        ${t.notes?`<div class="todo-notes">${t.notes}</div>`:''}
      </div>
      <div class="todo-actions">
        <button class="todo-edit-btn" onclick="openTodo(${t.id})" title="Modifier"><i class="ti ti-pencil"></i></button>
        <button class="todo-del" onclick="delTodo(${t.id})" title="Supprimer"><i class="ti ti-trash"></i></button>
      </div>
    </div>`;
  }).join('');
  updateTodoBadge();
}

function updateTodoBadge() {
  const pending=todos.filter(t=>!t.done).length;
  const badge=document.getElementById('todo-badge');
  if(badge){
    badge.style.display=pending>0?'flex':'none';
    badge.textContent=pending>0?pending:'';
  }
}

function openTodo(id, prefillClientId=null) {
  editTodoId=id;
  currentTodoPrio='normale';
  const sel=document.getElementById('td-cli');
  const sorted=[...clients].sort((a,b)=>a.societe.localeCompare(b.societe,'fr'));
  sel.innerHTML='<option value="">— Aucun client lié —</option>'+
    sorted.map(c=>`<option value="${c.id}"${c.id===prefillClientId?' selected':''}>${c.societe}</option>`).join('');
  if(id!==null){
    const t=todos.find(x=>x.id===id);if(!t)return;
    document.getElementById('mtodo-title').textContent='Modifier la tâche';
    document.getElementById('td-title').value=t.titre||'';
    document.getElementById('td-cli').value=t.clientId||'';
    document.getElementById('td-comm').value=t.comm||'';
    document.getElementById('td-date').value=t.echeance||'';
    document.getElementById('td-notes').value=t.notes||'';
    currentTodoPrio=t.prio||'normale';
  } else {
    document.getElementById('mtodo-title').textContent='Nouvelle tâche';
    ['td-title','td-comm','td-date','td-notes'].forEach(i=>document.getElementById(i).value='');
    if(prefillClientId) document.getElementById('td-cli').value=prefillClientId;
  }
  document.querySelectorAll('#todo-prio-group .type-btn').forEach(b=>{
    b.classList.toggle('on', b.textContent.trim().toLowerCase().includes(currentTodoPrio));
  });
  document.getElementById('mtodo').classList.add('open');
  setTimeout(()=>document.getElementById('td-title').focus(),300);
}

function saveTodo() {
  const titre=document.getElementById('td-title').value.trim();
  if(!titre){alert('Veuillez saisir un titre.');return;}
  const o={
    id:editTodoId||nextTId++,
    titre,
    clientId:parseInt(document.getElementById('td-cli').value)||null,
    comm:document.getElementById('td-comm').value,
    echeance:document.getElementById('td-date').value,
    prio:currentTodoPrio,
    notes:document.getElementById('td-notes').value,
    done:editTodoId?(todos.find(t=>t.id===editTodoId)||{}).done||false:false,
  };
  if(editTodoId){const i=todos.findIndex(t=>t.id===editTodoId);todos[i]=o;}
  else todos.push(o);
  persist();closeMod('mtodo');renderTodos();
}

function toggleTodoDone(id) {
  const t=todos.find(x=>x.id===id);if(!t)return;
  t.done=!t.done;
  persist();renderTodos();
}

function delTodo(id) {
  if(!confirm('Supprimer cette tâche ?'))return;
  todos=todos.filter(t=>t.id!==id);
  persist();renderTodos();
}


function showMapError() {
  const mapEl = document.getElementById('map');
  if(mapEl) mapEl.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;gap:10px;color:var(--text-3)"><i class="ti ti-map-off" style="font-size:48px;opacity:.4"></i><p>Carte non disponible</p></div>';
}

/* ── Init ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  syncSelects();
  updateTodoBadge();

  // Fermeture modals
  document.querySelectorAll('.modal-overlay').forEach(el=>{
    el.addEventListener('click',e=>{if(e.target===el)el.classList.remove('open');});
  });

  // Entrée dans nouveau produit
  document.getElementById('new-prod').addEventListener('keydown',e=>{
    if(e.key==='Enter'){e.preventDefault();addProduit();}
  });

  // Deep link hash
  const hash = window.location.hash;
  if(hash==='#visite') setTimeout(openVisite, 500);

  // Carte — ne bloque pas l'app si Leaflet échoue
  setTimeout(()=>{
    try {
      if(typeof L!=='undefined') { initMap(); }
      else {
        const c=setInterval(()=>{
          try { if(typeof L!=='undefined'){clearInterval(c);initMap();} }
          catch(e){ clearInterval(c); showMapError(); }
        },200);
        setTimeout(()=>{ clearInterval(c); if(!map) showMapError(); },8000);
      }
    } catch(e){ showMapError(); }
  },300);

  // Pré-render pour que tous les onglets fonctionnent immédiatement
  renderClients();
  renderVisites();
  renderTodos();
});
          <button
