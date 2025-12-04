# Script de déploiement interactif Render pour Windows PowerShell
# Usage: .\deploy-render.ps1

Write-Host "`n>>> Render Deployment Wizard for CongoStream`n" -ForegroundColor Cyan

# Verifier si le depot est pousse
Write-Host "Verification du depot GitHub..." -ForegroundColor Yellow
$gitStatus = & git -C "C:\spofix" log -1 --oneline 2>$null
if ($gitStatus) {
    Write-Host "[OK] Depot trouve: $gitStatus" -ForegroundColor Green
} else {
    Write-Host "[ERREUR] depot non trouve. Assurez-vous d'etre dans le dossier spofix." -ForegroundColor Red
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
        Write-Host "`nGuide de deploiement MANUEL:" -ForegroundColor Cyan
        Write-Host "1. Allez sur https://dashboard.render.com" -ForegroundColor Green
        Write-Host "2. Connectez-vous avec GitHub" -ForegroundColor Green
        Write-Host "3. Cliquez 'New +' puis 'PostgreSQL':" -ForegroundColor Yellow
        Write-Host "   - Name: congostream-db" -ForegroundColor Gray
        Write-Host "   - Database: congostream" -ForegroundColor Gray
        Write-Host "   - User: congostream" -ForegroundColor Gray
        Write-Host "   - Plan: Free, Region: Ohio" -ForegroundColor Gray
        Write-Host "4. Attendez 1-2 min, COPIEZ la DATABASE_URL" -ForegroundColor Green
        Write-Host "5. Cliquez 'New +' puis 'Web Service':" -ForegroundColor Yellow
        Write-Host "   - Repository: muishamaster/CongoStream" -ForegroundColor Gray
        Write-Host "   - Root Directory: server" -ForegroundColor Gray
        Write-Host "   - Build: npm install, Start: npm start" -ForegroundColor Gray
        Write-Host "6. Settings >> Environment, ajoutez:" -ForegroundColor Yellow
        Write-Host "   - DATABASE_URL=<valeur copiee>" -ForegroundColor Gray
        Write-Host "   - JWT_SECRET=secret-aleatoire-ici" -ForegroundColor Gray
        Write-Host "   - PORT=10000" -ForegroundColor Gray
        Write-Host "   - NODE_ENV=production" -ForegroundColor Gray
        Write-Host "7. Cliquez 'Deploy' et attendez 3-5 minutes" -ForegroundColor Green
        Write-Host "8. URL finale: https://congostream-api.onrender.com" -ForegroundColor Green
        Write-Host "`nAppuyez sur ENTREE pour ouvrir le dashboard..." -ForegroundColor Yellow
        Read-Host
        Start-Process "https://dashboard.render.com"
    }

    "2" {
        Write-Host "`nDeploiement AUTOMATISE" -ForegroundColor Cyan
        Write-Host "Vous avez besoin d'une Render API Key`n" -ForegroundColor Yellow
        
        $apiKey = Read-Host "Entrez votre Render API Key (ou tapez 'skip')"
        
        if ($apiKey -eq "skip") {
            Write-Host "`nPour obtenir une API Key:" -ForegroundColor Yellow
            Write-Host "1. Allez sur https://dashboard.render.com/api-tokens" -ForegroundColor Gray
            Write-Host "2. Cliquez 'Create API Token'" -ForegroundColor Gray
            Write-Host "3. Copiez le token" -ForegroundColor Gray
            Write-Host "4. Reexecutez ce script et entrez le token`n" -ForegroundColor Gray
        } else {
            Write-Host "`nLancement du deploiement automatise..." -ForegroundColor Cyan
            $env:RENDER_API_KEY = $apiKey
            & node "C:\spofix\deploy-render.js"
        }
    }

    "3" {
        Write-Host "`nInstructions Detaillees:" -ForegroundColor Cyan
        Get-Content "C:\spofix\RENDER_DEPLOY_GUIDE.md" | Write-Host
    }

    "4" {
        Write-Host "Au revoir!`n" -ForegroundColor Gray
        exit 0
    }

    default {
        Write-Host "Option invalide`n" -ForegroundColor Red
    }
}

Write-Host "`nPour plus d'aide, consultez RENDER_DEPLOY_GUIDE.md`n" -ForegroundColor Cyan
