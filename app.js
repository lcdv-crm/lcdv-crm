/* ══════════════════════════════════════════════════════
   LCDV CRM — app.js  (PWA Mobile-first + Google Sheets)
   Données clients intégrées depuis Excel — 2026-06-08
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

/* ── Données clients (185 établissements HORECA) ───────── */
const KML_CLIENTS = [
  {
    "id": 1,
    "societe": "Ambassador-Hôtel Bosten",
    "ville": "EUPEN",
    "contact": "",
    "canal": "",
    "categorie": "Hôtel / Autre",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 2,
    "societe": "Arnaud Schreiber",
    "ville": "WELKENRAEDT",
    "contact": "Arnaud SCHREIBER",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 3,
    "societe": "Atelier",
    "ville": "EUPEN",
    "contact": "Marc NUCHTERN",
    "canal": "Mail",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1080.57,
    "ca2025": 3882.56,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 4,
    "societe": "Atelier 42",
    "ville": "THIMISTER",
    "contact": "Lucas PONCELET",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 4541.41,
    "ca2025": 10242.43,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 5,
    "societe": "Au 3 bis restaurant",
    "ville": "EUPEN",
    "contact": "Nico",
    "canal": "",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0.0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 6,
    "societe": "Au Bercail",
    "ville": "WELKENRAEDT",
    "contact": "François BILLET",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 704.18,
    "ca2025": 1180.69,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 7,
    "societe": "Au Bistronome",
    "ville": "DALHEM",
    "contact": "François BILLET",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 14227.66,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 8,
    "societe": "Au Coucou",
    "ville": "LA REID",
    "contact": "François BILLET",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 3599.6,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 9,
    "societe": "Au Clair Obscur",
    "ville": "VERVIERS",
    "contact": "François BILLET",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0.0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 10,
    "societe": "Au Murmure",
    "ville": "VERVIERS",
    "contact": "Nico",
    "canal": "",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 6998.82,
    "ca2025": 12247.61,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 11,
    "societe": "Au P'tit Marché",
    "ville": "LIMBOURG",
    "contact": "Nico",
    "canal": "",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 658.41,
    "ca2025": 495.21,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 12,
    "societe": "Au P'tit Marmiton",
    "ville": "VERVIERS",
    "contact": "Nico",
    "canal": "",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 589.1,
    "ca2025": 925.46,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 13,
    "societe": "Au P'tit Nico",
    "ville": "VERVIERS",
    "contact": "Nico",
    "canal": "",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0.0,
    "ca2025": 886.24,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 14,
    "societe": "Au Petit Chef",
    "ville": "MALMEDY",
    "contact": "Nico",
    "canal": "",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0,
    "ca2025": 1212.69,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 15,
    "societe": "Au Petit Clos",
    "ville": "HEUSY",
    "contact": "Nico",
    "canal": "",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 420.24,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 16,
    "societe": "Au Portail",
    "ville": "MOMALLE",
    "contact": "LEKEU",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0.0,
    "ca2025": 5769.59,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 17,
    "societe": "Au Relais",
    "ville": "LAMBERMONT",
    "contact": "Christian KERN",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 10424.42,
    "ca2025": 24304.28,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 18,
    "societe": "Au Renouveau",
    "ville": "THIMISTER",
    "contact": "Dorian SCHOONBROODT",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 2336.99,
    "ca2025": 10935.76,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 19,
    "societe": "Au Repère Gourmand",
    "ville": "HOMBOURG",
    "contact": "Dorian SCHOONBROODT",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1906.72,
    "ca2025": 5171.39,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 20,
    "societe": "Au Vi Houget",
    "ville": "VERVIERS",
    "contact": "",
    "canal": "",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1159.71,
    "ca2025": 1088.27,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 21,
    "societe": "Au Vieil Aubel",
    "ville": "AUBEL",
    "contact": "",
    "canal": "",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0.0,
    "ca2025": 2723.82,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 22,
    "societe": "Au Vieux Cerexhe",
    "ville": "PEPINSTER",
    "contact": "",
    "canal": "",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 17469.32,
    "ca2025": 45277.43,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 23,
    "societe": "Au Vieux Sart",
    "ville": "SART-LEZ-SPA",
    "contact": "Charlotte BERNARD",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 3313.13,
    "ca2025": 9596.26,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 24,
    "societe": "Aux Alentours",
    "ville": "VERVIERS",
    "contact": "Michael MISSIO",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 2905.75,
    "ca2025": 324.36,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 25,
    "societe": "Aux Deux Frères",
    "ville": "AUBEL",
    "contact": "Michael MISSIO",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1835.98,
    "ca2025": 3490.85,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 26,
    "societe": "Aux Étangs",
    "ville": "HERVE",
    "contact": "Sophia THIRION",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 18924.46,
    "ca2025": 65535.05,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 27,
    "societe": "Azzurra Pizzeria",
    "ville": "HERVE",
    "contact": "Benjamin ABINET",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 124.98,
    "ca2025": 2005.31,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 28,
    "societe": "Bar@Pasta",
    "ville": "WELKENRAEDT",
    "contact": "Eric DEGENEFFE",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 29,
    "societe": "Bar à Bout des Charmilles",
    "ville": "OVIFAT",
    "contact": "Eric DEGENEFFE",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 6937.89,
    "ca2025": 18889.44,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 30,
    "societe": "Bella Vita",
    "ville": "AUBEL",
    "contact": "Bernard PLEYERS",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1804.77,
    "ca2025": 5250.35,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 31,
    "societe": "Bien vivre et partager",
    "ville": "VISÉ",
    "contact": "Bernard PLEYERS",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 32,
    "societe": "Bilisse",
    "ville": "JALHAY",
    "contact": "Bernard PLEYERS",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 4302.34,
    "ca2025": 11116.25,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 33,
    "societe": "Bistronomie M",
    "ville": "WANZE",
    "contact": "Caro",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 2057.73,
    "ca2025": 4881.73,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 34,
    "societe": "Bonbon Caramel",
    "ville": "HEUSY",
    "contact": "Caro",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1415.91,
    "ca2025": 8922.03,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 35,
    "societe": "Bonbon Caramel",
    "ville": "FLERON",
    "contact": "Sophie",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1415.91,
    "ca2025": 8922.03,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 36,
    "societe": "Bonbon Caramel",
    "ville": "MALMEDY",
    "contact": "Caro",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1415.91,
    "ca2025": 8922.03,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 37,
    "societe": "Bonni",
    "ville": "WELKENRAEDT",
    "contact": "Andy",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 2032.9,
    "ca2025": 1623.48,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 38,
    "societe": "Boucherie de la Platte",
    "ville": "BELLEVAUX",
    "contact": "Linda GEURTS",
    "canal": "SMS",
    "categorie": "Boucherie / Boulangerie",
    "statut": "Client",
    "ca2026": 0,
    "ca2025": 685.46,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 39,
    "societe": "Boucherie Geurts",
    "ville": "WELKENRAEDT",
    "contact": "Linda GEURTS",
    "canal": "SMS",
    "categorie": "Boucherie / Boulangerie",
    "statut": "Client",
    "ca2026": 181.15,
    "ca2025": 654.52,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 40,
    "societe": "Boucherie Gouder de Beauregard",
    "ville": "GEMMENICH",
    "contact": "Dany GOUDER DE BEAUREGARD",
    "canal": "WhatsApp",
    "categorie": "Boucherie / Boulangerie",
    "statut": "Client",
    "ca2026": 1319.8,
    "ca2025": 721.11,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 41,
    "societe": "Boucherie Porc Amarelle",
    "ville": "PLOMBIERES",
    "contact": "Muriel ROBROECKS",
    "canal": "WhatsApp",
    "categorie": "Boucherie / Boulangerie",
    "statut": "Client",
    "ca2026": 593.57,
    "ca2025": 1220.77,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 42,
    "societe": "Boucherie Renders",
    "ville": "LIMBOURG",
    "contact": "André RENDERS",
    "canal": "Messenger",
    "categorie": "Boucherie / Boulangerie",
    "statut": "Client",
    "ca2026": 0.0,
    "ca2025": 94.86,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 43,
    "societe": "Bowling67 - S'Pace",
    "ville": "LONTZEN",
    "contact": "Olivier RAUSCHEN",
    "canal": "Messenger",
    "categorie": "Drink / Cave",
    "statut": "Client",
    "ca2026": 1592.33,
    "ca2025": 4600.52,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 44,
    "societe": "Brasserie Central",
    "ville": "VERVIERS",
    "contact": "John MOMMER",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 356.5,
    "ca2025": 561.03,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 45,
    "societe": "Brasserie du Bernalmont",
    "ville": "LIEGE",
    "contact": "John MOMMER",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 794.58,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 46,
    "societe": "Brasserie L'Entracte WDT",
    "ville": "WELKENRAEDT",
    "contact": "John MOMMER",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 47,
    "societe": "Casino de Spa",
    "ville": "SPA",
    "contact": "Chouchou / Nathalie LINNERTZ",
    "canal": "Mail",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 5506.71,
    "ca2025": 15363.37,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 48,
    "societe": "Chamelon",
    "ville": "EUPEN",
    "contact": "Chouchou / Nathalie LINNERTZ",
    "canal": "Mail",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 49,
    "societe": "Chez Chouchou",
    "ville": "MALMEDY",
    "contact": "Chouchou / Nathalie LINNERTZ",
    "canal": "Mail",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 6368.41,
    "ca2025": 12502.74,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 50,
    "societe": "Chez Didier",
    "ville": "VERVIERS",
    "contact": "Constantinos DEMERTZIDIS",
    "canal": "",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 77.52,
    "ca2025": 346.48,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 51,
    "societe": "Chez Gary",
    "ville": "BASSENGE",
    "contact": "Jessica",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 3358.21,
    "ca2025": 7432.68,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 52,
    "societe": "Chez H",
    "ville": "VERVIERS",
    "contact": "Jessica",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 4764.08,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 53,
    "societe": "Chez Josephine",
    "ville": "WELKENRAEDT",
    "contact": "Jessica",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 54,
    "societe": "Chez M",
    "ville": "HERSTAL",
    "contact": "Jessica",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 6787.33,
    "ca2025": 11836.87,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 55,
    "societe": "Chez Marie",
    "ville": "VERVIERS",
    "contact": "Jessica",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 326.7,
    "ca2025": 2814.03,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 56,
    "societe": "Chez Maureen",
    "ville": "PEPINSTER",
    "contact": "Jessica",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1346.97,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 57,
    "societe": "Chez Sarah",
    "ville": "VERVIERS",
    "contact": "Sarah RINGHOFFER",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0,
    "ca2025": 7431.63,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 58,
    "societe": "Chez Vinc'e",
    "ville": "SPA",
    "contact": "Sarah RINGHOFFER",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 59,
    "societe": "Club des Cinq",
    "ville": "AUBEL",
    "contact": "Pierre REENAERS",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 9777.96,
    "ca2025": 20641.91,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 60,
    "societe": "Côté Comptoir by Sandroli",
    "ville": "WELKENRAEDT",
    "contact": "Pierre REENAERS",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 21095.31,
    "ca2025": 15864.72,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 61,
    "societe": "Côté Comptoir",
    "ville": "WELKENRAEDT",
    "contact": "Rob",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 62,
    "societe": "Cuisine Authentique",
    "ville": "CHAINEUX",
    "contact": "Emilie HARDIQUEST",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 11956.22,
    "ca2025": 28517.12,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 63,
    "societe": "Delicatess' Am Markt",
    "ville": "EUPEN",
    "contact": "Dominique",
    "canal": "Messenger",
    "categorie": "Drink / Cave",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0.0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 64,
    "societe": "De Mère en Fille",
    "ville": "VISÉ",
    "contact": "Cécile",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 9257.57,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 65,
    "societe": "Didier T Artisans Culinaires",
    "ville": "MALMEDY",
    "contact": "Cécile",
    "canal": "WhatsApp",
    "categorie": "Traiteur / Épicerie fine",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 66,
    "societe": "Domaine Bilstain",
    "ville": "BILSTAIN",
    "contact": "Cécile",
    "canal": "WhatsApp",
    "categorie": "Hôtel / Autre",
    "statut": "Client",
    "ca2026": 5433.51,
    "ca2025": 11868.59,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 67,
    "societe": "Dolce Vita",
    "ville": "SPA",
    "contact": "Dominique",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 68,
    "societe": "Drink Charlier Shop",
    "ville": "HERVE",
    "contact": "Dominique",
    "canal": "Messenger",
    "categorie": "Drink / Cave",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 69,
    "societe": "Drink Grooten",
    "ville": "WELKENRAEDT",
    "contact": "Dominique",
    "canal": "Messenger",
    "categorie": "Drink / Cave",
    "statut": "Client",
    "ca2026": 0.0,
    "ca2025": 5626.5,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 70,
    "societe": "Drive-In Andrien",
    "ville": "THEUX",
    "contact": "Dominique",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 71,
    "societe": "Einkaufen&Geniessen",
    "ville": "KRINKELT",
    "contact": "Valérie FANK",
    "canal": "Mail",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0.0,
    "ca2025": 3222.74,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 72,
    "societe": "El Chicco by Caro",
    "ville": "VERVIERS",
    "contact": "Lazarine BECKERS",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0,
    "ca2025": 302.44,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 73,
    "societe": "Elandeline",
    "ville": "WELKENRAEDT",
    "contact": "Lazarine BECKERS",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1002.28,
    "ca2025": 1647.8,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 74,
    "societe": "Eli's Café",
    "ville": "AUBEL",
    "contact": "Lazarine BECKERS",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 75,
    "societe": "Épicur'Anne",
    "ville": "GRIVEGNEE",
    "contact": "Anne Pesesse",
    "canal": "Messenger",
    "categorie": "Drink / Cave",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 76,
    "societe": "Extra Time",
    "ville": "BATTICE",
    "contact": "Samuel HEMMER",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1577.96,
    "ca2025": 5164.85,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 77,
    "societe": "Friterie Graffiti",
    "ville": "LONTZEN",
    "contact": "Muriel ROOGEMANS",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 502.34,
    "ca2025": 2146.41,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 78,
    "societe": "Friterie La Terrasse",
    "ville": "LAMBERMONT",
    "contact": "Muriel ROOGEMANS",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 288.8,
    "ca2025": 400.33,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 79,
    "societe": "Fromagerie Straet",
    "ville": "VERVIERS",
    "contact": "Muriel ROOGEMANS",
    "canal": "Messenger",
    "categorie": "Drink / Cave",
    "statut": "Client",
    "ca2026": 1567.26,
    "ca2025": 352.66,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 80,
    "societe": "Gare aux Goûts",
    "ville": "HOMBOURG",
    "contact": "Joël",
    "canal": "Whatsapp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 16854.73,
    "ca2025": 36038.69,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 81,
    "societe": "Goosse",
    "ville": "LIEGE",
    "contact": "Joël",
    "canal": "Whatsapp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 82,
    "societe": "Gorgées",
    "ville": "VERVIERS",
    "contact": "Joël",
    "canal": "Whatsapp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 83,
    "societe": "Grill de La Clouse",
    "ville": "AUBEL",
    "contact": "Jean GOIRE",
    "canal": "SMS",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 3664.95,
    "ca2025": 8044.39,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 84,
    "societe": "GUGA",
    "ville": "AUBEL",
    "contact": "Arnaud Van Melsen",
    "canal": "SMS",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 85,
    "societe": "Hôtel Ambassador Bosten",
    "ville": "MALMEDY",
    "contact": "Jean GOIRE",
    "canal": "SMS",
    "categorie": "Hôtel / Autre",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 86,
    "societe": "Hôtel du Moulin",
    "ville": "MALMEDY",
    "contact": "Jean GOIRE",
    "canal": "SMS",
    "categorie": "Hôtel / Autre",
    "statut": "Client",
    "ca2026": 0.0,
    "ca2025": 1452.17,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 87,
    "societe": "Hôtel Van der Valk",
    "ville": "VERVIERS",
    "contact": "Alex HEINEN",
    "canal": "Messenger",
    "categorie": "Hôtel / Autre",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0.0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 88,
    "societe": "Homestorys PGmbH",
    "ville": "EUPEN",
    "contact": "Alex HEINEN",
    "canal": "Messenger",
    "categorie": "Hôtel / Autre",
    "statut": "Client",
    "ca2026": 794.41,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 89,
    "societe": "Jungle Park",
    "ville": "LONTZEN",
    "contact": "Alex HEINEN",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 929.2,
    "ca2025": 946.93,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 90,
    "societe": "KERN'S FOODTRUCK & EVENT",
    "ville": "LAMBERMONT",
    "contact": "",
    "canal": "",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 91,
    "societe": "Koda",
    "ville": "VISE",
    "contact": "Joseph NYSSEN",
    "canal": "0493 50 88 21 / 0479 70 11 41",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 4750.91,
    "ca2025": 7718.73,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 92,
    "societe": "L'Arnica",
    "ville": "CRISNEE",
    "contact": "Sébastien DELATTRE",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 2604.05,
    "ca2025": 2706.6,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 93,
    "societe": "L'Entracte Verviers",
    "ville": "VERVIERS",
    "contact": "Sébastien DELATTRE",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1631.46,
    "ca2025": 1171.51,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 94,
    "societe": "L'Entre D2ux",
    "ville": "GRIVEGNEE",
    "contact": "Sébastien DELATTRE",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1889.75,
    "ca2025": 7519.69,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 95,
    "societe": "L'Entre-Potes",
    "ville": "HERBESTAL",
    "contact": "Sébastien DELATTRE",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 3800.35,
    "ca2025": 10484.63,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 96,
    "societe": "L'Épée Gourmande",
    "ville": "VERVIERS",
    "contact": "Léo/Merghim ZEEKOLI",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 11617.1,
    "ca2025": 31472.02,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 97,
    "societe": "L'Epicurien",
    "ville": "HERVE",
    "contact": "Sébastien BRELA",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 2034.97,
    "ca2025": 8481.29,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 98,
    "societe": "L'Obra",
    "ville": "BRA",
    "contact": "Raphael OUTMANNS",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 4535.72,
    "ca2025": 13094.56,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 99,
    "societe": "L'Officine",
    "ville": "EUPEN",
    "contact": "Raphael OUTMANNS",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1017.96,
    "ca2025": 1387.28,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 100,
    "societe": "L'Usine",
    "ville": "DISON",
    "contact": "Raphael OUTMANNS",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 17596.07,
    "ca2025": 36032.89,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 101,
    "societe": "La Barbotte",
    "ville": "VERVIERS",
    "contact": "Achraf/Zouhair LARHOUASLI",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 9225.74,
    "ca2025": 31348.44,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 102,
    "societe": "La Belle Epoque",
    "ville": "SPA",
    "contact": "Achraf/Zouhair LARHOUASLI",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0,
    "ca2025": 6143.52,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 103,
    "societe": "La Belle Maison",
    "ville": "SIPPENAEKEN",
    "contact": "Achraf/Zouhair LARHOUASLI",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 857.21,
    "ca2025": 1730.57,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 104,
    "societe": "La Bouchée d'Ailleurs",
    "ville": "VERVIERS",
    "contact": "Achraf/Zouhair LARHOUASLI",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 8368.98,
    "ca2025": 20576.61,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 105,
    "societe": "La Brasserie de Franchimont",
    "ville": "THEUX",
    "contact": "Laurent BRIXHE",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 2858.18,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 106,
    "societe": "La Brasserie des Etangs",
    "ville": "HERVE",
    "contact": "Laurent BRIXHE",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 13744.88,
    "ca2025": 36612.69,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 107,
    "societe": "La Brasserie des Thermes",
    "ville": "SPA",
    "contact": "Durim KRYEZI",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0,
    "ca2025": 4636.71,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 108,
    "societe": "La Brasserie du 4009 by Pompon",
    "ville": "VERVIERS",
    "contact": "Maurane ROGGEMANS",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0.0,
    "ca2025": 1190.08,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 109,
    "societe": "La Brasserie du Ciné",
    "ville": "VERVIERS",
    "contact": "Maurane ROGGEMANS",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 17148.58,
    "ca2025": 29461.27,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 110,
    "societe": "La Brasserie du Haras",
    "ville": "HEUSY",
    "contact": "Maurane ROGGEMANS",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 10925.4,
    "ca2025": 10859.61,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 111,
    "societe": "La Centrale Des Viandes",
    "ville": "LIEGE",
    "contact": "",
    "canal": "",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 112,
    "societe": "La Commanderie 7",
    "ville": "FOURON",
    "contact": "Vincent BALTUS",
    "canal": "SMS",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1059.24,
    "ca2025": 4214.36,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 113,
    "societe": "La Couronne",
    "ville": "KAPEL",
    "contact": "Jérémy FINCK",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 21535.3,
    "ca2025": 45404.59,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 114,
    "societe": "La Crémaillère",
    "ville": "JALHAY",
    "contact": "Jérémy FINCK",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 115,
    "societe": "La Croustade",
    "ville": "VERVIERS",
    "contact": "Jérémy FINCK",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0,
    "ca2025": 107.29,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 116,
    "societe": "La Papote",
    "ville": "THEUX",
    "contact": "Jérémy FINCK",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 3718.61,
    "ca2025": 1338.32,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 117,
    "societe": "La Pausa",
    "ville": "SPA",
    "contact": "Jérémy FINCK",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 9597.07,
    "ca2025": 29892.73,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 118,
    "societe": "La Plume",
    "ville": "SOUMAGNE",
    "contact": "Jérémy FINCK",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 119,
    "societe": "La Retenue",
    "ville": "VERVIERS",
    "contact": "Cyril DEGEE",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 7785.47,
    "ca2025": 19683.77,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 120,
    "societe": "La Table Rase",
    "ville": "JEHANSTER",
    "contact": "Julien BERNARD",
    "canal": "Téléphone",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0.0,
    "ca2025": 513.01,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 121,
    "societe": "La Taverne du Perron",
    "ville": "STEMBERT",
    "contact": "Julien BERNARD",
    "canal": "Téléphone",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 2456.96,
    "ca2025": 8462.62,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 122,
    "societe": "La Véranda",
    "ville": "MORESNET",
    "contact": "Cynthia ROOGEMANS",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 6220.7,
    "ca2025": 15116.75,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 123,
    "societe": "La Vieille Vaisselle",
    "ville": "THIMISTER",
    "contact": "Cynthia ROOGEMANS",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 124,
    "societe": "Le Bar Fly",
    "ville": "SPA",
    "contact": "Vincent & Kelly",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 125,
    "societe": "Le Baron",
    "ville": "COO",
    "contact": "Nicolas ROCK",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0.0,
    "ca2025": 1060.84,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 126,
    "societe": "Le Berry",
    "ville": "AUBEL",
    "contact": "Nicolas ROCK",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 21234.07,
    "ca2025": 18541.03,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 127,
    "societe": "Le Charlemagne",
    "ville": "VERVIERS",
    "contact": "Nicolas ROCK",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 3696.17,
    "ca2025": 2501.68,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 128,
    "societe": "Le Coq en Ville",
    "ville": "VERVIERS",
    "contact": "Nicolas ROCK",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 129,
    "societe": "Le Domaine des Hautes Fagnes",
    "ville": "OVIFAT",
    "contact": "Mathieu CIALONE",
    "canal": "Whatsapp",
    "categorie": "Hôtel / Autre",
    "statut": "Client",
    "ca2026": 6285.05,
    "ca2025": 16597.11,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 130,
    "societe": "Le Fourquet",
    "ville": "THIMISTER",
    "contact": "Joël",
    "canal": "Whatsapp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 6268.73,
    "ca2025": 15331.95,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 131,
    "societe": "Le Franc'off",
    "ville": "SPA",
    "contact": "Ludovic COMPÈRE",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0.0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 132,
    "societe": "Le Jardin des Elfes",
    "ville": "SPA",
    "contact": "Ludovic COMPÈRE",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 3783.1,
    "ca2025": 20777.46,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 133,
    "societe": "Le Macadam",
    "ville": "EUPEN",
    "contact": "Ludovic COMPÈRE",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0.0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 134,
    "societe": "Le Ménobu",
    "ville": "THEUX",
    "contact": "Ludovic COMPÈRE",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 855.78,
    "ca2025": 3765.83,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 135,
    "societe": "Le Midi",
    "ville": "PETIT-RECHAIN",
    "contact": "Ludovic COMPÈRE",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 8945.1,
    "ca2025": 425.86,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 136,
    "societe": "Le Palmares",
    "ville": "SPA",
    "contact": "",
    "canal": "",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 137,
    "societe": "Le Patch",
    "ville": "VERVIERS",
    "contact": "",
    "canal": "",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0,
    "ca2025": 98.22,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 138,
    "societe": "Le Roannay",
    "ville": "STAVELOT",
    "contact": "David LINDT",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 5273.61,
    "ca2025": 14104.92,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 139,
    "societe": "Le Solera",
    "ville": "WELKENRAEDT",
    "contact": "Pierre DUBOIS",
    "canal": "-",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1829.28,
    "ca2025": 3625.77,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 140,
    "societe": "Le Tigre",
    "ville": "VERVIERS",
    "contact": "Jean-Louis BERNARD",
    "canal": "Téléphone",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1846.54,
    "ca2025": 3247.68,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 141,
    "societe": "Le Tonnelet",
    "ville": "NIVEZE",
    "contact": "Jean-Louis BERNARD",
    "canal": "Téléphone",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 2968.03,
    "ca2025": 1754.4,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 142,
    "societe": "Les Fines Gueules",
    "ville": "HERVE",
    "contact": "Flavio SANTOS MARTINS",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 31129.69,
    "ca2025": 80500.02,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 143,
    "societe": "Les Montagnards",
    "ville": "OLNE",
    "contact": "Valérie DANSE",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 25076.48,
    "ca2025": 25426.46,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 144,
    "societe": "Les Thermes de Spa",
    "ville": "SPA",
    "contact": "Valérie DANSE",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 15148.37,
    "ca2025": 54068.78,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 145,
    "societe": "Les Toqués Gourmands",
    "ville": "EUPEN",
    "contact": "Fanny GUSTIN",
    "canal": "Téléphone",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 155.03,
    "ca2025": 1005.5,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 146,
    "societe": "Level 5",
    "ville": "EUPEN",
    "contact": "Fanny GUSTIN",
    "canal": "Téléphone",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 147,
    "societe": "Ma Cuisine",
    "ville": "HACCOURT",
    "contact": "Guy DUYSENS",
    "canal": "Téléphone",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 148,
    "societe": "Maison Blanche",
    "ville": "LONTZEN",
    "contact": "Guy DUYSENS",
    "canal": "Téléphone",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 149,
    "societe": "Maison Charlemagne",
    "ville": "KELMIS",
    "contact": "Guy DUYSENS",
    "canal": "Téléphone",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 2230.96,
    "ca2025": 8212.67,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 150,
    "societe": "Maison Duysens",
    "ville": "WELKENRAEDT",
    "contact": "Guy DUYSENS",
    "canal": "Téléphone",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 337.5,
    "ca2025": 1706.48,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 151,
    "societe": "Maison Fagne",
    "ville": "MALMEDY",
    "contact": "Guy DUYSENS",
    "canal": "Téléphone",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 5871.1,
    "ca2025": 3411.98,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 152,
    "societe": "Manoir de Lébiole",
    "ville": "SPA",
    "contact": "Maxime",
    "canal": "Messenger",
    "categorie": "Hôtel / Autre",
    "statut": "Client",
    "ca2026": 0.0,
    "ca2025": 17119.73,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 153,
    "societe": "Marco Brasserie Pizzeria",
    "ville": "HEUSY",
    "contact": "Maxime",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1900.52,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 154,
    "societe": "Mosa Passion",
    "ville": "ENGIS",
    "contact": "Maxime",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 9465.38,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 155,
    "societe": "My Hotel by Intermills",
    "ville": "MALMEDY",
    "contact": "David LINDT",
    "canal": "Mail",
    "categorie": "Hôtel / Autre",
    "statut": "Client",
    "ca2026": 9303.95,
    "ca2025": 21382.02,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 156,
    "societe": "O Bois de la Julienne",
    "ville": "VISÉ",
    "contact": "Annick CHRISTIAENS",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 157,
    "societe": "Opcanner Anker",
    "ville": "RIEMST",
    "contact": "Annick CHRISTIAENS",
    "canal": "WhatsApp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0,
    "ca2025": 2503.16,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 158,
    "societe": "PamPam",
    "ville": "VISÉ",
    "contact": "Alex  BRANA-AZCONA",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0,
    "ca2025": 229.51,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 159,
    "societe": "Piazza Cucina",
    "ville": "THEUX",
    "contact": "Chantal GEHLEN",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 928.76,
    "ca2025": 1818.62,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 160,
    "societe": "Pizza Kapella",
    "ville": "WELKENRAEDT",
    "contact": "Chantal GEHLEN",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0,
    "ca2025": 17.51,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 161,
    "societe": "Pizzeria Antica",
    "ville": "SART-LEZ-SPA",
    "contact": "Charlotte BERNARD",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 2162.91,
    "ca2025": 5485.44,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 162,
    "societe": "Pizzeria Sangio",
    "ville": "DOLHAIN",
    "contact": "Charlotte BERNARD",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 3643.29,
    "ca2025": 490.7,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 163,
    "societe": "Poulette",
    "ville": "RETINNE",
    "contact": "Lionel JOHNEN",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 7104.16,
    "ca2025": 6750.69,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 164,
    "societe": "Pub Grain d'Orge",
    "ville": "PLOMBIERES",
    "contact": "Lionel JOHNEN",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 19389.55,
    "ca2025": 42394.78,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 165,
    "societe": "Raph Cook's",
    "ville": "AUBEL",
    "contact": "Florent DECKER",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 12334.54,
    "ca2025": 30862.29,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 166,
    "societe": "Restaurant Le 4860",
    "ville": "PEPINSTER",
    "contact": "Florent DECKER",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 167,
    "societe": "Royale Etoile Elsautoise",
    "ville": "ELSAUTE",
    "contact": "DEMONCEAU",
    "canal": "Tel",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 185.12,
    "ca2025": 59.8,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 168,
    "societe": "Royal Football Club WDT",
    "ville": "WELKENRAEDT",
    "contact": "Albert HENDRICK",
    "canal": "Mail",
    "categorie": "Drink / Cave",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 169,
    "societe": "Royal Football Club Malmundaria",
    "ville": "MALMEDY",
    "contact": "Albert HENDRICK",
    "canal": "Mail",
    "categorie": "Drink / Cave",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 170,
    "societe": "RTC Belle-Vue",
    "ville": "WELKENRAEDT",
    "contact": "Eric REYNIERS",
    "canal": "Whatsapp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 3635.01,
    "ca2025": 7541.36,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 171,
    "societe": "Seventy",
    "ville": "MALMEDY",
    "contact": "Caro & Eric CHARLIE",
    "canal": "Mail",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 924.8,
    "ca2025": 5831.08,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 172,
    "societe": "Sirop Charlier",
    "ville": "HENRI-CHAPELLE",
    "contact": "Caro & Eric CHARLIE",
    "canal": "Mail",
    "categorie": "Drink / Cave",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 173,
    "societe": "Source de la Géronstère",
    "ville": "SPA",
    "contact": "Caro & Eric CHARLIE",
    "canal": "Mail",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0.0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 174,
    "societe": "Sucré Salé",
    "ville": "EUPEN",
    "contact": "Marc VLUGGEN",
    "canal": "Whatsapp",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 4592.06,
    "ca2025": 5013.96,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 175,
    "societe": "Swing & Saveurs",
    "ville": "HENRI-CHAPELLE",
    "contact": "Caro & Eric CHARLIE",
    "canal": "Mail",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 21223.08,
    "ca2025": 68422.5,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 176,
    "societe": "Take-Five",
    "ville": "AMBLEVE",
    "contact": "Jean-Marc LAMBIET",
    "canal": "tel",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 177,
    "societe": "Taverne Le Parc",
    "ville": "WELKENRAEDT",
    "contact": "Jean-Marc LAMBIET",
    "canal": "tel",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 6591.7,
    "ca2025": 16085.17,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 178,
    "societe": "Tel Père Telles Filles",
    "ville": "HERVE",
    "contact": "Stéphane HERZET",
    "canal": "mail",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 179,
    "societe": "Temps Libre",
    "ville": "WELKENRAEDT",
    "contact": "Stéphane HERZET",
    "canal": "mail",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 736.68,
    "ca2025": 1390.63,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 180,
    "societe": "The Swing",
    "ville": "HEUSY",
    "contact": "Stéphane HERZET",
    "canal": "mail",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 0,
    "ca2025": 13671.43,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 181,
    "societe": "Verviers Indoor Games Center",
    "ville": "VERVIERS",
    "contact": "Vincent & Kelly",
    "canal": "Messenger",
    "categorie": "Drink / Cave",
    "statut": "Client",
    "ca2026": 1141.18,
    "ca2025": 4101.18,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 182,
    "societe": "VIKE",
    "ville": "BAELEN",
    "contact": "Vincent & Kelly",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Prospect",
    "ca2026": 0,
    "ca2025": 0,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 183,
    "societe": "Vita Bella",
    "ville": "LAMBERMONT",
    "contact": "Vincent & Kelly",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 1733.44,
    "ca2025": 2055.11,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 184,
    "societe": "Wel Padel",
    "ville": "WELKENRAEDT",
    "contact": "Annick DODEMONT",
    "canal": "Messenger",
    "categorie": "Drink / Cave",
    "statut": "Client",
    "ca2026": 13745.82,
    "ca2025": 5361.54,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  },
  {
    "id": 185,
    "societe": "Zum Stiefel",
    "ville": "EUPEN",
    "contact": "Annick DODEMONT",
    "canal": "Messenger",
    "categorie": "Restaurant / Brasserie",
    "statut": "Client",
    "ca2026": 2122.13,
    "ca2025": 5498.94,
    "comm": "",
    "produits": [],
    "lat": null,
    "lng": null,
    "notes": "",
    "tel": "",
    "email": ""
  }
];

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
    if (s) {
      const d = JSON.parse(s);
      // Merge Excel data into saved clients (preserve visites/todos/GPS/produits)
      const saved = d.clients || [];
      clients = KML_CLIENTS.map(base => {
        const saved_c = saved.find(c => c.societe === base.societe);
        if (saved_c) {
          // Keep saved fields but update Excel-sourced fields
          return {
            ...base,
            ...saved_c,
            ca2026: base.ca2026,
            ca2025: base.ca2025,
            ville: base.ville || saved_c.ville || '',
            canal: saved_c.canal || base.canal || '',
          };
        }
        return base;
      });
      // Add any manually created clients not in KML_CLIENTS
      saved.forEach(sc => {
        if (!clients.find(c => c.societe === sc.societe)) clients.push(sc);
      });
      visites = d.visites || [];
      todos = d.todos || [];
      nextCId = Math.max(...clients.map(c=>c.id), 0) + 1;
      nextVId = d.nextVId || (visites.length ? Math.max(...visites.map(v=>v.id)) + 1 : 1);
      nextTId = d.nextTId || 1;
      return;
    }
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
function fmtCA(v) { return v>0 ? v.toLocaleString('fr-BE',{maximumFractionDigits:0})+' €' : ''; }
function getTopClients(year,limit) { year=year||2026;limit=limit||15;const f=year===2026?'ca2026':'ca2025';return[...clients].filter(c=>c[f]>0).sort((a,b)=>b[f]-a[f]).slice(0,limit); }
function totalCA(year) { const f=(year||2026)===2026?'ca2026':'ca2025';return clients.reduce((s,c)=>s+(c[f]||0),0); }
function clientsToRelaunch() { return clients.filter(c=>!c.ca2026&&!c.ca2025&&c.statut!=='Inactif'); }

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
    const caHtml=c.ca2026>0?`<div style="margin-top:4px;font-size:11px;color:#666">CA 2026 : <strong style="color:#c9a84c">${fmtCA(c.ca2026)}</strong></div>`:'';
    const popup=`<div style="font-family:system-ui,sans-serif;font-size:13px;min-width:200px">
      <strong style="font-size:14px">${c.societe}</strong><br>
      <span style="color:#888;font-size:12px">${c.categorie}${c.ville?` · ${c.ville}`:''}${c.comm?` · ${c.comm}`:''}</span>
      ${prodsHtml}${visitHtml}${caHtml}
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
    (!q||c.societe.toLowerCase().includes(q)||
         (c.ville||'').toLowerCase().includes(q)||
         (c.contact||'').toLowerCase().includes(q))&&
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
    const caHtml=c.ca2026>0
      ?`<div class="card-ca">CA 2026 : <strong>${fmtCA(c.ca2026)}</strong>${c.ca2025>0?` · 2025 : ${fmtCA(c.ca2025)}`:''}</div>`
      :(c.ca2025>0?`<div class="card-ca">CA 2025 : <strong>${fmtCA(c.ca2025)}</strong></div>`:'');
    const villeHtml=c.ville?`<span class="card-ville"> · ${c.ville}</span>`:'';
    return `<div class="client-card" onclick="openCli(${c.id})">
      <span class="cat-dot" style="background:${col}"></span>
      <div class="card-body">
        <div class="card-name">${c.societe}</div>
        <div class="card-meta">${c.categorie}${villeHtml}${c.comm?` · <strong>${c.comm}</strong>`:''}</div>
        ${prodsHtml?`<div class="card-tags">${prodsHtml}</div>`:''}
        <div class="card-visit${noV?' alert':''}">${noV?'⚠ ':''} ${lvText}</div>
        ${caHtml}
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
    // Show CA block
    const caBlock=document.getElementById('cli-ca-block');
    if(caBlock){
      if(c.ca2026>0||c.ca2025>0){
        caBlock.style.display='block';
        const parts=[];
        if(c.ca2026>0) parts.push(`2026 : <strong>${fmtCA(c.ca2026)}</strong>`);
        if(c.ca2025>0) parts.push(`2025 : <strong>${fmtCA(c.ca2025)}</strong>`);
        document.getElementById('cli-ca-display').innerHTML=parts.join(' &nbsp;·&nbsp; ');
      } else { caBlock.style.display='none'; }
    }
    // Show ville
    const villeEl=document.getElementById('cl-ville-display');
    if(villeEl&&c.ville) villeEl.textContent=c.ville;
  } else {
    editCliId=null;selectedProds=[];
    document.getElementById('mcli-title').textContent='Nouveau client';
    ['cl-soc','cl-con','cl-email','cl-tel','cl-comm','cl-lat','cl-notes'].forEach(i=>document.getElementById(i).value='');
    document.getElementById('cl-cat').value='Restaurant / Brasserie';
    document.getElementById('cl-st').value='Client';
    const caBlock=document.getElementById('cli-ca-block');
    if(caBlock) caBlock.style.display='none';
  }
  renderProdChips();
  document.getElementById('mcli').classList.add('open');
  setTimeout(()=>document.getElementById('cl-soc').focus(),300);
}

function renderProdChips() {
  const all=[...new Set([...allProds(),...selectedProds])].sort();
  document.getElementById('prod-chips').innerHTML=all.map(p=>
    `<button class="chip${selectedProds.includes(p)?' sel':''}" onclick="toggleProd(this,'${p.replace(/'/g,"\'")}' )">${p}</button>`
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
  const existing=editCliId?clients.find(c=>c.id===editCliId):null;
  const o={
    ...(existing||{}),
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
  persist();scheduleSyncToSheets();closeMod('mcli');renderClients();refreshMap();syncSelects();
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
  persist();scheduleSyncToSheets();closeMod('mvis');renderVisites();syncSelects();
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
  const rows=[['ID','Société','Ville','Catégorie','Statut','Commercial','Contact','Canal','Email','Téléphone','Produits','CA 2026','CA 2025','Dernière visite','Notes']];
  clients.forEach(c=>{
    const lv=lastVisit(c.id);
    rows.push([c.id,c.societe,c.ville||'',c.categorie,c.statut,c.comm||'',c.contact||'',c.canal||'',c.email||'',c.tel||'',
      (c.produits||[]).join(' | '),c.ca2026||0,c.ca2025||0,lv?lv.date:'',c.notes||'']);
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
  persist();scheduleSyncToSheets();closeMod('mtodo');renderTodos();
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

  document.querySelectorAll('.modal-overlay').forEach(el=>{
    el.addEventListener('click',e=>{if(e.target===el)el.classList.remove('open');});
  });

  document.getElementById('new-prod').addEventListener('keydown',e=>{
    if(e.key==='Enter'){e.preventDefault();addProduit();}
  });

  const hash = window.location.hash;
  if(hash==='#visite') setTimeout(openVisite, 500);

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

  renderClients();
  renderVisites();
  renderTodos();
});
