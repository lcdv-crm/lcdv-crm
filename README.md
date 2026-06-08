# LCDV CRM — Suivi Commercial HORECA

## Installation sur téléphone (recommandé)

### Sur Android (Chrome)
1. Ouvrez le fichier `index.html` dans Chrome
2. Une bannière "Installer l'application" apparaît en haut → tapez **Installer**
3. L'icône LCDV apparaît sur votre écran d'accueil
4. L'app fonctionne même sans connexion internet

### Sur iPhone (Safari)
1. Ouvrez `index.html` dans **Safari** (obligatoire)
2. Tapez l'icône de partage ↑ en bas de l'écran
3. Choisissez **"Sur l'écran d'accueil"**
4. Confirmez en tapant "Ajouter"

---

## Pour partager avec vos collègues

**Option 1 — Hébergement local (recommandé)**
Déposez le dossier sur votre serveur / NAS d'entreprise.
Partagez l'URL interne (ex: `http://192.168.1.10/lcdv-crm/`)
Chaque collègue installe l'app depuis son téléphone.

**Option 2 — GitHub Pages (gratuit, accessible partout)**
1. Créez un compte GitHub gratuit
2. Nouveau repository public, uploadez tous les fichiers
3. Settings → Pages → Source: main → Save
4. Partagez l'URL `https://votre-nom.github.io/lcdv-crm/`

---

## Fichiers du projet
```
lcdv-crm/
├── index.html      Interface principale
├── style.css       Design mobile-first
├── app.js          Logique applicative
├── data.js         260 clients HORECA (import KML)
├── manifest.json   Config PWA (installation)
├── sw.js           Service Worker (hors-ligne)
├── README.md       Ce guide
└── icons/          Icônes application
    ├── icon-192.png
    ├── icon-512.png
    └── logo.jpg
```

## Fonctionnalités

- **Carte** : 260 clients HORECA positionnés, filtres par catégorie/commercial/produit
- **Clients** : fiches modifiables, produits, commercial référent
- **Visites** : journal terrain/appel/email/livraison avec compte-rendu
- **Distribution** : vue analytique produits par catégorie
- **Export CSV** : compatible Excel
- **Mode hors-ligne** : fonctionne sans internet après première ouverture

---
*LCDV — Le Comptoir des Vins · Wine Merchant Since 2002*
