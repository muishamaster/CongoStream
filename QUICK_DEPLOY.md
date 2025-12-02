# ⚡ DÉPLOIEMENT EN 2 MINUTES

## Solution ultra-rapide : Netlify Drop

### 1️⃣ Ouvrir Netlify Drop
Allez sur : **https://app.netlify.com/drop**

### 2️⃣ Drag & Drop
- Ouvrir l'Explorateur Windows
- Aller à `C:\spofix`
- **Glisser-déposer** le dossier entier dans la page Netlify

### 3️⃣ Attendre 5 secondes
✅ Votre site est live !

```
URL générée : https://xxx-yyy-123.netlify.app
```

---

## Partager le lien
Copier l'URL et l'envoyer à vos amis ! 🎉

---

## Pour production (avec domaine personnalisé)

### Étape A : Push sur GitHub (2 min)
```powershell
cd C:\spofix
git remote add origin https://github.com/VOTRE_USERNAME/CongoStream.git
git branch -M main
git push -u origin main
```

### Étape B : Deploy sur Netlify (1 min)
1. https://app.netlify.com
2. "New site from Git"
3. Choisir GitHub
4. Sélectionner "CongoStream"
5. Cliquer "Deploy"

### Étape C : Domaine personnalisé (5 min)
1. Settings → Domain management
2. Ajouter domaine
3. Configurer DNS

---

**C'est tout ! Votre site est maintenant live.** 🚀

Pour plus de détails, lire `DEPLOYMENT.md`
