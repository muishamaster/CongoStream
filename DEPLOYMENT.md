# 🚀 DÉPLOIEMENT RAPIDE — CongoStream

## 3 Options rapides (du plus simple au plus avancé)

---

## ⚡ OPTION 1 : Netlify Drop (30 secondes) — LE PLUS SIMPLE

### Étape 1 : Préparer le dossier
```bash
# Aller au dossier spofix
cd C:\spofix

# Sélectionner tout le contenu
# Créer un ZIP du contenu (pas le dossier lui-même)
# Ou juste garder le dossier ouvert
```

### Étape 2 : Drag & Drop sur Netlify
1. Aller sur **https://app.netlify.com/drop**
2. **Glisser-déposer** le dossier `C:\spofix` entier
3. Netlify génère une URL temporaire en **2 secondes** ✅

**URL générée :** `https://xxx-congostream.netlify.app`

### Avantages ✅
- ⚡ Super rapide (30 sec)
- 🎯 Pas de Git nécessaire
- 📝 Pas de configuration
- 🔄 Auto-redéploiement si vous re-drag

### Inconvénients ❌
- Pas de domaine personnalisé
- Pas d'historique Git
- URL temporaire (ex : `dreamy-panda-123.netlify.app`)

---

## 🔗 OPTION 2 : Netlify + GitHub (Recommandé pour production)

### Étape 1 : Créer repo GitHub (5 min)

#### Sur GitHub.com
```
1. Cliquer "New repository"
2. Nom : "CongoStream"
3. Description : "Plateforme streaming 100% congolaise"
4. Public
5. Créer le repo
```

#### En local (PowerShell)
```powershell
cd C:\spofix

# Vérifier que git existe déjà
git remote -v
# (devrait afficher rien si pas connecté à GitHub)

# Ajouter le remote GitHub
git remote add origin https://github.com/VOTRE_USERNAME/CongoStream.git

# Renommer branche si nécessaire
git branch -M main

# Pousser le code
git push -u origin main

# Vérifier
git remote -v
```

### Étape 2 : Connecter à Netlify (3 min)

#### Sur Netlify.com
```
1. Se connecter (ou créer compte)
2. Cliquer "New site from Git"
3. Choisir "GitHub"
4. Autoriser l'accès
5. Chercher "CongoStream"
6. Cliquer dessus
```

#### Configuration Netlify
```
Build command:     (laisser vide — site statique)
Publish directory: . (ou spofix/)
Environment:       (laisser vide)
```

7. **Deploy site** ✅

### Étape 3 : Domaine personnalisé (2 min)

#### Option A : Netlify domain (gratuit)
```
Settings → Domain management
Cliquer "Add custom domain"
Entrer : congostream.netlify.app
```

#### Option B : Domaine propre (.cd, .com, etc.)
```
Settings → Domain management
Cliquer "Add custom domain"
Entrer : mon-domaine.cd

# Puis configurer DNS chez votre registraire
# (Guide fourni par Netlify)
```

### URL résultante
- Netlify : `https://congostream.netlify.app`
- Personnalisé : `https://congostream.cd`

---

## 🌍 OPTION 3 : Vercel (Alternative, aussi simple)

### Étape 1 : Créer compte Vercel

```
1. Aller sur https://vercel.com
2. "Sign up"
3. Se connecter avec GitHub
4. Autoriser l'accès
```

### Étape 2 : Importer projet

```
1. "New Project"
2. "Import Git Repository"
3. Coller l'URL GitHub : https://github.com/VOTRE_USERNAME/CongoStream.git
4. "Import"
```

### Étape 3 : Configuration (laisser par défaut)

```
Framework Preset : Other (c'est statique)
Build Command  : (vide)
Output Folder  : . (ou spofix/)
```

5. **Deploy** ✅

### URL résultante
- Vercel auto  : `congostream.vercel.app`
- Custom : Ajouter domaine dans Settings

---

## 📊 Comparaison rapide

| Critère | Netlify Drop | Netlify Git | Vercel |
|---------|--------------|-------------|--------|
| **Temps** | 30 sec | 5 min | 5 min |
| **Git** | ❌ | ✅ | ✅ |
| **Domaine perso** | ❌ | ✅ | ✅ |
| **Custom domain SSL** | ✅ | ✅ | ✅ |
| **Redéploiement auto** | ❌ | ✅ (sur push) | ✅ (sur push) |
| **Meilleur pour** | Test rapide | Production | Production |

---

## 🎯 RECOMMANDATION

### Pour démarrer MAINTENANT
➜ **Utiliser Netlify Drop** (30 sec, aucune configuration)

### Pour production (recommandé)
➜ **Netlify + GitHub** (meilleur contrôle, historique, auto-déploiement)

---

## ✅ Checklist avant déploiement

- [ ] Tous les fichiers HTML chargent sans erreur 404
- [ ] `js/main.js` est chargé sur chaque page
- [ ] `congostream/script.js` fonctionne
- [ ] Mock API répond (F12 → Network → `mon-compte-1.json`)
- [ ] Pas d'erreur en console (F12 → Console)
- [ ] Responsive OK sur mobile (F12 → Toggle device)

---

## 🔧 Si ça ne fonctionne pas

### Problème : Erreurs 404 sur images
```
Solução : C'est normal (fichiers image manquants)
Mettre des placeholders ou images de test
```

### Problème : `js/main.js` chargé mais ne fonctionne pas
```
Vérifier console (F12 → Console)
Chercher erreurs rouges
Vérifier paths relatifs : "js/main.js" vs "./js/main.js"
```

### Problème : Aucun fichier trouvé
```
Vérifier structure :
C:\spofix\
├── accueil.html
├── js/
│   └── main.js
├── congostream/
│   └── script.js
└── style.css
```

---

## 🚀 Prochaines étapes post-déploiement

### 1. Mettre à jour le README

```markdown
# CongoStream 🇨🇩

**Live :** https://congostream.netlify.app

[Rest du README...]
```

### 2. Ajouter certificat SSL (déjà inclus)

Netlify/Vercel gèrent ça automatiquement — HTTPS activé par défaut ✅

### 3. Configurer analytique

Ajouter Google Analytics :
```html
<!-- Dans <head> de chaque page -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 4. Configurer redirects (optionnel)

Créer `netlify.toml` à la racine :
```toml
[[redirects]]
  from = "/*"
  to = "/accueil.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=3600"
```

---

## 📞 Support & Questions

| Plateforme | Support |
|------------|---------|
| **Netlify** | https://docs.netlify.com |
| **Vercel** | https://vercel.com/docs |
| **GitHub** | https://docs.github.com |

---

## 🎉 Résumé des commandes Git (si vous choisissez option 2)

```bash
# Initialiser (première fois uniquement)
git remote add origin https://github.com/VOTRE_USERNAME/CongoStream.git
git branch -M main
git push -u origin main

# Après chaque changement local
git add .
git commit -m "description du changement"
git push origin main
# → Netlify redéploie automatiquement !
```

---

**Prêt ? Lancez Netlify Drop maintenant !** 🚀

Vous pouvez toujours switcher vers GitHub + Netlify après si besoin.

*Generated: 2 décembre 2025*
