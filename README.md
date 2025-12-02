# CongoStream 🇨🇩

Une plateforme de streaming 100% congolaise avec films, musiques, podcasts et une mini-app musicale.

## 📂 Structure du projet

```
spofix/
├── accueil.html                  # Page d'accueil avec message dynamique
├── compte.html                   # Page du compte utilisateur (avec mock API)
├── exploration.html              # Page d'exploration des catégories
├── films.html                    # Catalogue de films
├── login.html                    # Formulaire de connexion
├── musique.html                  # Catalogue de musique
├── podcast.html                  # Détail d'un podcast
├── podcasts.html                 # Catalogue de podcasts
│
├── style.css                     # Styles globaux (thème sombre)
├── js/
│   └── main.js                   # JavaScript centralisé (utilitaires + init par page)
│
├── spofix/
│   ├── index.html                # Mini-app musicale
│   ├── script.ts                 # Source TypeScript de la mini-app
│   ├── script.js                 # JavaScript compilé (ES5 compatible)
│   └── style.css                 # Styles de la mini-app
│
├── mock-api/
│   └── mon-compte-1.json         # Mock pour l'API compte
│
├── input.py                      # Utilitaire Python (tests locaux)
├── print.py                      # Script de démonstration Python
├── tsconfig.json                 # Configuration TypeScript
│
└── README.md                     # Cette documentation
```

## 🚀 Démarrage rapide

### 1. Serveur local

```bash
# Démarrer un serveur HTTP sur le port 8000
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000` dans le navigateur.

### 2. Pages accessibles

- **Accueil** : `http://localhost:8000/accueil.html`
- **Compte** : `http://localhost:8000/compte.html` (mock API)
- **Exploration** : `http://localhost:8000/exploration.html`
- **Mini-app CongoStream** : `http://localhost:8000/spofix/`

## 🛠️ Architecture JavaScript

### Centralisation

- **`js/main.js`** : Point d'entrée unique
  - Utilitaires DOM (`window.utils.qs`, `window.utils.qsa`)
  - Détection automatique de page (par URL ou attribut `data-page`)
  - Appel de `init_<pagename>()` si définie

- **`congostream/script.js`** : Mini-app musicale
  - Playlist dynamique
  - Citations congolaises aléatoires
  - Toggle thème sombre/clair
  - Exposé via `window.init_index`

### Initialisation par page

Chaque page HTML définit sa propre fonction d'initialisation :
- `init_accueil()` - Message d'heure dynamique
- `init_compte()` - Chargement données utilisateur (API ou mock)
- `init_index()` - Logique de `congostream/index.html`

## 📡 API & Mock

### Compte utilisateur

**Endpoint réel** (si disponible) :
```
GET http://localhost:3000/mon-compte/1
```

**Fallback mock local** :
```json
{
  "abonnement": "Premium (mock)"
}
```

Localisation : `mock-api/mon-compte-1.json`

## 🎨 Personnalisation

### Couleurs
Thème sombre (cyan/noir) défini dans `style.css` :
- Primaire : `#00ffcc` (cyan)
- Fond : `#0d0d0d` (noir profond)
- Texte : `#fff` (blanc)

### Ajouter une nouvelle page

1. Créer `nouvelle-page.html`
2. Inclure `<script src="js/main.js" defer></script>` avant `</body>`
3. Ajouter `init_nouvelle_page()` dans `js/main.js`

## 🧪 Tests

### Console navigateur (F12)

```javascript
// Vérifier les utilitaires
console.log(window.utils);

// Tester le mock API
fetch('mock-api/mon-compte-1.json')
  .then(r => r.json())
  .then(d => console.log(d));

// Vérifier les fonctions d'init
console.log(window.init_accueil);
console.log(window.init_compte);
console.log(window.init_index);
```

## 📦 Compilations

### TypeScript → JavaScript

```bash
# Compiler spofix/script.ts
tsc spofix/script.ts --target es2020 --lib es2020,dom
```

Le résultat est en `spofix/script.js` (ES5 compatible).

## 📝 Commits recommandés

```bash
# 1. Structure initiale + centralisateur JS
git add -A
git commit -m "feat: structure de base avec js/main.js centralisé"

# 2. Extraction des scripts inline
git commit -m "refactor: extraction scripts inline vers js/main.js"

# 3. Mini-app musicale
git commit -m "feat: congostream mini-app (playlist, citations, thème)"

# 4. Mock API + améliorations
git commit -m "feat: mock API compte + fallback pour développement"

# 5. Documentation
git commit -m "docs: README et commentaires d'en-tête complets"
```

## 🚢 Déploiement

### Option 1 : Serveur statique simple
```bash
# Avec Python
python -m http.server 8000

# Avec Node (si http-server installé)
npx http-server -p 8000
```

### Option 2 : Docker
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY . .
CMD ["python", "-m", "http.server", "8000"]
```

### Option 3 : Cloud (Netlify, Vercel, GitHub Pages)
- Push le projet sur GitHub
- Connecter le repo à Netlify/Vercel
- Build : Rien (site statique)
- Publish : `.` (ou `spofix/`)

## 🔮 Améliorations futures

- [ ] Authentification réelle (JWT, OAuth)
- [ ] Backend API (Node.js/Express, Python/Flask)
- [ ] Base de données (films, musiques, utilisateurs)
- [ ] Recherche avancée
- [ ] Favoris/Watchlist
- [ ] Recommandations personnalisées
- [ ] Notifications en temps réel
- [ ] Support mobile/PWA
- [ ] Traduction (FR/EN)
- [ ] Tests E2E (Cypress/Playwright)

## 📋 Checklist avant production

- [ ] Retirer les console.log de débogage
- [ ] Minifier CSS/JS
- [ ] Ajouter robots.txt et sitemap.xml
- [ ] Configurer CORS si backend séparé
- [ ] SSL/HTTPS activé
- [ ] Caching headers optimisés
- [ ] Performance metrics OK (Lighthouse)
- [ ] Responsive design testé (mobile/tablet/desktop)

## 📧 Support

Pour des questions ou bugs : créer une issue sur le repo ou contacter l'équipe.

---

**CongoStream** — *Streaming la culture congolaise* 🎬🎵🎙️
