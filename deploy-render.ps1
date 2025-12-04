# Script de déploiement interactif Render pour Windows PowerShell
# Usage: .\deploy-render.ps1

Write-Host "`n🚀 Render Deployment Wizard for CongoStream`n" -ForegroundColor Cyan

# Vérifier si le dépôt est poussé
Write-Host "📋 Vérification du dépôt GitHub..." -ForegroundColor Yellow
$gitStatus = & git -C "C:\spofix" log -1 --oneline 2>$null
if ($gitStatus) {
    Write-Host "✅ Dépôt trouvé: $gitStatus" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur: dépôt non trouvé. Assurez-vous d'être dans le dossier spofix." -ForegroundColor Red
    exit 1
}

# Menu de choix
Write-Host "`nChoisissez une option:" -ForegroundColor Cyan
Write-Host "1. Déploiement MANUEL (interface visuelle Render) - Recommandé" -ForegroundColor Yellow
Write-Host "2. Déploiement AUTOMATISÉ (script API) - Avancé" -ForegroundColor Yellow
Write-Host "3. Afficher les instructions" -ForegroundColor Yellow
Write-Host "4. Quitter" -ForegroundColor Gray

$choice = Read-Host "`nVotre choix (1-4)"

switch ($choice) {
    "1" {
        Write-Host "`n📖 Guide de déploiement MANUEL:" -ForegroundColor Cyan
        Write-Host @"
1️⃣  Allez sur https://dashboard.render.com
2️⃣  Connectez-vous avec GitHub (ou créez un compte)
3️⃣  Cliquez "New +" → "PostgreSQL"
    - Name: congostream-db
    - Database: congostream
    - User: congostream
    - Plan: Free
    - Region: Ohio
4️⃣  Attendez 1-2 minutes, puis COPIER la DATABASE_URL
5️⃣  Cliquez "New +" → "Web Service"
    - Repository: muishamaster/CongoStream
    - Root Directory: server
    - Build: npm install
    - Start: npm start
    - Plan: Free
    - Region: Ohio
6️⃣  Pendant/après création, allez à Settings → Environment
    - DATABASE_URL=<PASTE_HERE>
    - JWT_SECRET=your-random-secret-here
    - PORT=10000
    - NODE_ENV=production
7️⃣  Cliquez "Deploy" et attendez 3-5 minutes
8️⃣  L'URL finale: https://congostream-api.onrender.com ✅

"@ -ForegroundColor Green
        Write-Host "Press ENTER pour ouvrir le dashboard Render..." -ForegroundColor Gray
        Read-Host
        Start-Process "https://dashboard.render.com"
    }

    "2" {
        Write-Host "`n🔐 Déploiement AUTOMATISÉ" -ForegroundColor Cyan
        Write-Host "Vous avez besoin d'une Render API Key`n" -ForegroundColor Yellow
        
        $apiKey = Read-Host "Entrez votre Render API Key (ou tapez 'skip')"
        
        if ($apiKey -eq "skip") {
            Write-Host "`n📚 Pour obtenir une API Key:" -ForegroundColor Yellow
            Write-Host "1. Allez sur https://dashboard.render.com/api-tokens" -ForegroundColor Gray
            Write-Host "2. Cliquez 'Create API Token'" -ForegroundColor Gray
            Write-Host "3. Copiez le token" -ForegroundColor Gray
            Write-Host "4. Réexécutez ce script et entrez le token`n" -ForegroundColor Gray
        } else {
            Write-Host "`n⏳ Lancement du déploiement automatisé..." -ForegroundColor Cyan
            $env:RENDER_API_KEY = $apiKey
            & node "C:\spofix\deploy-render.js"
        }
    }

    "3" {
        Write-Host "`n📖 Instructions Détaillées:" -ForegroundColor Cyan
        Get-Content "C:\spofix\RENDER_DEPLOY_GUIDE.md" | Write-Host
    }

    "4" {
        Write-Host "👋 Au revoir!" -ForegroundColor Gray
        exit 0
    }

    default {
        Write-Host "❌ Option invalide" -ForegroundColor Red
    }
}

Write-Host "`n✨ Pour plus d'aide, consultez RENDER_DEPLOY_GUIDE.md`n" -ForegroundColor Cyan
