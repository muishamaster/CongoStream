# Guide d'automatisation du déploiement Render

## Option 1 : Déploiement Manuel Rapide (Recommandé pour la première fois)

Si vous préférez un déploiement plus visuel et contrôlé, suivez ces étapes :

### 1. **Créer un compte Render** (si nécessaire)
- Allez sur https://render.com
- Cliquez "Sign up with GitHub"
- Autorisez Render à accéder à votre dépôt

### 2. **Créer une base de données PostgreSQL**
- Dans le dashboard Render, cliquez **"New +"** → **"PostgreSQL"**
- Remplissez :
  - **Name**: `congostream-db`
  - **Database**: `congostream`
  - **User**: `congostream`
  - **Region**: `Ohio` (gratuit)
  - **Plan**: `Free`
- Cliquez **"Create Database"**
- ⏳ Attendez 1-2 minutes que la DB soit active
- 📋 **Copier la chaîne `DATABASE_URL`** (vous en aurez besoin)

### 3. **Créer un Web Service**
- Cliquez **"New +"** → **"Web Service"**
- Sélectionnez votre dépôt : `muishamaster/CongoStream`
- Remplissez :
  - **Name**: `congostream-api`
  - **Root Directory**: `server`
  - **Runtime**: `Node`
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
  - **Instance Type**: `Free`
- Cliquez **"Create Web Service"**

### 4. **Ajouter les variables d'environnement**
- Dans le service Web Service (pendant/après création), allez à **Settings** → **Environment**
- Ajouter :
  ```
  DATABASE_URL=<copier-coller la chaîne de la DB PostgreSQL>
  JWT_SECRET=your-super-secure-random-secret-here-use-openssl-rand-hex-32
  PORT=10000
  NODE_ENV=production
  ```
- Cliquez **"Save"**

### 5. **Déclencher le déploiement**
- Cliquez **"Deploy"** en haut du dashboard
- Attendez 3-5 minutes
- Une fois fait, vous verrez l'URL : `https://congostream-api.onrender.com`

---

## Option 2 : Déploiement Automatisé via Script (Avancé)

Si vous avez une **Render API Key**, vous pouvez automatiser le processus :

### 1. **Obtenir votre Render API Key**
- Allez sur https://dashboard.render.com/api-tokens
- Cliquez **"Create API Token"**
- Donnez un nom : `congostream-deploy`
- Copiez le token généré

### 2. **Définir l'API Key dans PowerShell**
```powershell
$env:RENDER_API_KEY = "rnd_votre_cle_ici"
```

Ou la sauvegarder de manière persistante :
```powershell
[System.Environment]::SetEnvironmentVariable("RENDER_API_KEY", "rnd_votre_cle_ici", "User")
```

### 3. **Lancer le script d'automatisation**
```powershell
cd C:\spofix
node deploy-render.js
```

Le script :
- ✅ Crée une DB PostgreSQL managée
- ✅ Crée un Web Service
- ✅ Configure les env vars automatiquement
- ✅ Lance le déploiement

---

## Tester votre API après déploiement

Une fois deployé, testez les endpoints :

```powershell
# Lister les films
$response = Invoke-RestMethod -Uri 'https://congostream-api.onrender.com/api/films'
$response | ConvertTo-Json

# Enregistrer un utilisateur
$body = @{username="alice"; password="pass123"} | ConvertTo-Json
Invoke-RestMethod -Uri 'https://congostream-api.onrender.com/auth/register' `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body

# Se connecter
$loginBody = @{username="alice"; password="pass123"} | ConvertTo-Json
$token = (Invoke-RestMethod -Uri 'https://congostream-api.onrender.com/auth/login' `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $loginBody).token
Write-Host "Token: $token"
```

---

## Configurer le domaine personnalisé

Une fois le service live :

1. Dans Render, allez à votre Web Service → **Settings** → **Custom Domain**
2. Entrez votre domaine (ex: `api.congostream.com`)
3. Suivez les instructions DNS (ajoutez un CNAME chez votre registraire)
4. Render provisionne le certificat TLS automatiquement

---

## Troubleshooting

| Problème | Solution |
|----------|----------|
| Service s'arrête | Vérifier les logs → **Logs** dans le dashboard |
| Erreur DB connection | Vérifier `DATABASE_URL` est complète et valide |
| Port issue | Render gère le port automatiquement ; ne pas le changer |
| 404 sur `/api/films` | Attendre que le service redémarre (~1 min) |

---

## Résumé des URLs importantes

- 📊 **Dashboard Render** : https://dashboard.render.com
- 🔑 **API Tokens** : https://dashboard.render.com/api-tokens
- 🌐 **Votre API** : https://congostream-api.onrender.com
- 📄 **Logs en temps réel** : Dans le dashboard du service

---

**Besoin d'aide ?** Consultez la doc Render : https://render.com/docs
