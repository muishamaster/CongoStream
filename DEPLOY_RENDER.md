# Guide de Déploiement sur Render

## 1. Préparer votre dépôt GitHub

Assurez-vous que votre `package.json` et `server/` sont pushés sur GitHub :

```bash
cd c:\spofix
git add .
git commit -m "Add server and dependencies"
git push origin main
```

## 2. Créer un compte Render (si nécessaire)

1. Aller sur [render.com](https://render.com)
2. S'inscrire avec GitHub ou email
3. Connecter votre compte GitHub

## 3. Créer une base de données PostgreSQL managée

1. Dans le dashboard Render, cliquer sur **"New +"** → **"PostgreSQL"**
2. Remplir les infos :
   - **Name**: `congostream-db`
   - **Database**: `congostream`
   - **User**: `congostream`
   - Laisser les autres par défaut
3. Cliquer **"Create Database"**
4. **IMPORTANT** : Copier la chaîne de connexion `DATABASE_URL` (affichée après création) — vous en aurez besoin pour le service web

## 4. Créer un Web Service pour le backend

1. Cliquer sur **"New +"** → **"Web Service"**
2. Connecter votre dépôt GitHub (`muishamaster/CongoStream`)
3. Remplir les infos :
   - **Name**: `congostream-api`
   - **Root Directory**: `server` (optionnel, mais aide Render à trouver le bon dossier)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Cliquer **"Create Web Service"**

## 5. Configurer les variables d'environnement

Après création du service web, accéder à **Settings** → **Environment** :

Ajouter les variables suivantes :
```
DATABASE_URL=<copier la chaîne de Postgres depuis l'étape 3>
JWT_SECRET=your-secure-random-secret-here-change-this
PORT=10000
```

⚠️ **Important** : 
- Pour `JWT_SECRET`, générer une chaîne aléatoire (ex: `openssl rand -hex 32` ou utiliser un UUID)
- Ne pas utiliser de valeurs par défaut en production

## 6. Déclencher le déploiement

Après avoir configuré les env vars :
1. Cliquer sur **"Deploy"** en haut du dashboard
2. Attendre quelques minutes (Render clonera le dépôt, installera npm, et démarrera le service)
3. Une fois déployé, vous verrez une URL de domaine Render (ex: `https://congostream-api.onrender.com`)

## 7. Tester le backend en production

Utiliser curl ou Postman pour tester :

```bash
# Lister les films
curl https://congostream-api.onrender.com/api/films

# Créer un compte
curl -X POST https://congostream-api.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"pass123"}'

# Login
curl -X POST https://congostream-api.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"pass123"}'
```

## 8. Configurer le domaine personnalisé (optionnel)

1. Dans le Web Service, aller à **Settings** → **Custom Domain**
2. Ajouter votre domaine (ex: `api.congostream.com`)
3. Suivre les instructions DNS chez votre registraire (ajouter un CNAME vers le domaine Render)

## 9. Connecter le frontend (Netlify) au backend (Render)

Mettre à jour vos appels fetch dans `public/assets/js/main.js` :

```javascript
const API_BASE = 'https://congostream-api.onrender.com';

// Remplacer les fetch locaux :
fetch(`${API_BASE}/api/films`)
  .then(r => r.json())
  .then(data => { /* ... */ })
```

## Troubleshooting

### Le service s'arrête juste après le déploiement
- Vérifier les logs : **Settings** → **Logs**
- S'assurer que `DATABASE_URL` est valide
- Vérifier que `npm start` démarre sans erreur localement

### Erreur de connexion PostgreSQL
- S'assurer que la PostgreSQL instance est active sur Render
- Vérifier que `DATABASE_URL` est entièrement copié (no truncation)
- Attendre 1-2 minutes après création de la DB (elle peut être en initialisation)

### Pas de données seed
- Les données sont créées à la première requête
- Vérifier avec `curl https://your-api.onrender.com/api/films`

### Port issue
- Render définit automatiquement la variable `PORT` — ne pas la changer
- Notre serveur utilise `process.env.PORT || 4000` par défaut

## Automatisation (optionnel)

Pour déployer automatiquement à chaque push sur GitHub :
1. Render vérifie automatiquement les nouveaux pushes s'il est configuré avec GitHub
2. Aller à **Settings** → **Auto-Deploy** et sélectionner **Yes**
3. À chaque `git push`, Render redéploiera automatiquement

---

**URL finale pour votre API :**
```
https://congostream-api.onrender.com
```

Utilisez cette URL dans vos fetch du frontend pour pointer vers le backend en production.
