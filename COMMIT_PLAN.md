# Plan de Commit & Déploiement — CongoStream

## 📋 État actuel

✅ **Complété :**
- Structure HTML de 8 pages
- JavaScript centralisé (`js/main.js`)
- Mini-app musicale (`spofix/`) avec TypeScript compilé
- Styles CSS (thème sombre)
- Mock API pour développement
- Commentaires et documentation
- Serveur local en test

## 🔄 Workflow Git

### 1️⃣ Initialiser le repo (si pas déjà fait)

```bash
cd C:\spofix
git init
git config user.name "Votre Nom"
git config user.email "votre.email@example.com"
```

### 2️⃣ Premier commit : Structure de base

```bash
- Mini-app musicale CongoStream (playlist, citations, thème)
- Mock API pour développement local
- Configuration TypeScript
"
```

### 3️⃣ Commits logiques (par domaine)

#### A. Architecture et cleanup

```bash
- Suppression des scripts inline des pages HTML
- Compilation TypeScript congostream/script.ts → script.js (ES5)
- Amélioration gestion erreurs avec try/catch
"
```

#### B. API et fallback

```bash
- Implémenter fallback init_compte() : API réelle → mock local
- Permettre développement sans serveur backend actif
- Améliorer gestion erreurs réseau
"
```

#### C. Documentation

```bash
- COMMIT_PLAN.md : workflow et améliorations futures
- .gitignore : exclusions pour Git
- Commentaires d'en-tête dans tous les fichiers
"
```

#### D. Corrections et améliorations

```bash
- Supprimer console.log et fetch dupliqués
- Améliorer structure et lisibilité du code
- Ajouter JSDoc complets
"
```

## 🚀 Déploiement — Étapes

### Phase 1 : Local + Tests

```bash
# 1. Démarrer serveur
python -m http.server 8000

# 2. Tester toutes les pages
curl http://localhost:8000/accueil.html
curl http://localhost:8000/spofix/

# 3. Vérifier console navigateur (F12)
# - Pas d'erreurs 404
# - Pas d'erreurs JS
# - init_accueil, init_compte, init_index accessible
```

### Phase 2 : Repository GitHub

```bash
# Créer repo vide sur GitHub.com → "CongoStream"

git remote add origin https://github.com/VOTRE_USER/CongoStream.git
git branch -M main
git push -u origin main

# Ajouter collaborateurs si besoin
```

### Phase 3 : Déploiement sur Netlify (recommandé)

```bash
# Option A : Via CLI
npm install -g netlify-cli
netlify deploy --prod --dir=.

# Option B : Via GitHub (auto-déploiement)
# 1. Aller sur netlify.com → "New site from Git"
# 2. Connecter repo GitHub → CongoStream
# 3. Build command: none
# 4. Publish directory: .
# 5. Deploy!
```

### Phase 4 : Configuration post-déploiement

```bash
# 1. Configurer domaine personnalisé
#    Netlify → Site settings → Domain management
#    Ex: spofix.netlify.app ou spofix.cd (ICANN)

# 2. Ajouter redirects (si nécessaire)
#    Créer netlify.toml :
```

### Fichier `netlify.toml` (optionnel)

```toml
[build]
  command = "echo 'Static site - no build needed'"
  publish = "."

[[redirects]]
  from = "/*"
  to = "/accueil.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=3600"
```

## 🔮 Améliorations futures (Post-MVP)

### Court terme (1-2 semaines)

- [ ] **Minification** : Réduire taille CSS/JS (avec uglify-js, cssnano)
- [ ] **SEO** : Ajouter meta tags, robots.txt, sitemap.xml
- [ ] **PWA** : manifest.json pour installation mobile
- [ ] **Analytics** : Intégrer Google Analytics ou Plausible
- [ ] **Performance** : Optimiser images, lazy loading

### Moyen terme (1 mois)

- [ ] **Backend API** : Node.js/Express ou Python/Flask
  - Authentification JWT
  - Base de données (PostgreSQL/MongoDB)
  - Endpoints : `/users`, `/films`, `/musiques`, `/podcasts`
- [ ] **Authentification réelle** : JWT + Refresh tokens
- [ ] **Recherche** : Elasticsearch ou solution simple regex
- [ ] **Tests** : Jest (JS) + Cypress (E2E)

### Long terme (3+ mois)

- [ ] **Streaming** : Intégrer lecteur vidéo/audio (HLS, DASH)
- [ ] **Recommandations** : ML/IA pour suggestions personnalisées
- [ ] **Notifications** : WebSocket + notifications push
- [ ] **Admin panel** : Gestion contenu (films, musiques, utilisateurs)
- [ ] **Support mobile** : React Native app
- [ ] **i18n** : Traduction FR/EN/Lingala

## 📊 Checklist de qualité

### Avant chaque commit

- [ ] Pas de console.log en prod
- [ ] Pas de fichier temporaire ou node_modules
- [ ] Code lint-free (pas de syntax errors)
- [ ] Tests en local OK
- [ ] Message commit clair et descriptif

### Avant déploiement

- [ ] Tous les tests passent
- [ ] Performance acceptable (Lighthouse > 80)
- [ ] Mobile responsive testé
- [ ] HTTPS activé
- [ ] Pas de données sensibles en clair
- [ ] Documentation à jour
- [ ] `.gitignore` respecté

## 📧 Commandes rapides

```bash
# Voir historique
git log --oneline --graph --all

# Annuler dernier commit (non poussé)
git reset --soft HEAD~1

# Voir différences avant commit
git diff --cached

# Revert un commit poussé
git revert <commit-hash>

# Créer branche pour feature
git checkout -b feature/ma-feature
git push -u origin feature/ma-feature
```

---

**Prêt pour le commit ?** Lancez la phase 1 ! 🚀
