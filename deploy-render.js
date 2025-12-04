#!/usr/bin/env node

/**
 * Script d'automatisation du déploiement sur Render
 * Usage: node deploy-render.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const RENDER_API_KEY = process.env.RENDER_API_KEY;
const GITHUB_REPO = 'muishamaster/CongoStream';

if (!RENDER_API_KEY) {
  console.error('❌ RENDER_API_KEY non définie. Définissez-la:');
  console.error('   $env:RENDER_API_KEY = "rnd_your_key_here"');
  console.error('   ou allez sur https://dashboard.render.com/api-tokens');
  process.exit(1);
}

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.render.com',
      port: 443,
      path: `/v1${path}`,
      method,
      headers: {
        'Authorization': `Bearer ${RENDER_API_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(new Error(`${res.statusCode}: ${data}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error(`Parse error: ${data}`));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function createPostgresDB() {
  console.log('📦 Créating PostgreSQL database...');
  try {
    const response = await makeRequest('POST', '/databases', {
      name: 'congostream-db',
      plan: 'free',
      postgresVersion: '15',
      region: 'ohio',
    });
    console.log('✅ PostgreSQL DB créée:', response.id);
    return response;
  } catch (err) {
    console.error('❌ Erreur création DB:', err.message);
    throw err;
  }
}

async function createWebService(dbConnectionString) {
  console.log('🚀 Créating Web Service...');
  try {
    const response = await makeRequest('POST', '/services', {
      type: 'web_service',
      name: 'congostream-api',
      ownerId: null, // Utiliser votre ID de propriétaire ou null pour default
      repoUrl: `https://github.com/${GITHUB_REPO}`,
      branch: 'main',
      buildCommand: 'cd server && npm install',
      startCommand: 'cd server && npm start',
      envVars: [
        { key: 'DATABASE_URL', value: dbConnectionString },
        { key: 'JWT_SECRET', value: 'change-me-to-secure-secret-' + Math.random().toString(36).slice(2) },
        { key: 'PORT', value: '10000' },
        { key: 'NODE_ENV', value: 'production' },
      ],
      region: 'ohio',
      plan: 'free',
      rootDir: 'server',
    });
    console.log('✅ Web Service créé:', response.id);
    console.log('🔗 URL:', response.serviceDetails?.url || 'En attente...');
    return response;
  } catch (err) {
    console.error('❌ Erreur création service:', err.message);
    throw err;
  }
}

async function main() {
  console.log('🔐 Render Deployment Automation\n');
  
  try {
    // Étape 1: Créer la DB
    const db = await createPostgresDB();
    const dbUrl = db.connectionString || `postgresql://...`; // Attendre la connexion
    
    console.log('⏳ Attente 10 secondes pour que la DB soit prête...');
    await new Promise(r => setTimeout(r, 10000));

    // Étape 2: Créer le service web
    const service = await createWebService(dbUrl);
    
    console.log('\n✨ Déploiement initié!');
    console.log('📊 Suivez l\'état sur: https://dashboard.render.com');
    console.log('🔗 API endpoint: ' + (service.serviceDetails?.url || 'https://congostream-api.onrender.com'));
  } catch (err) {
    console.error('\n❌ Erreur:', err.message);
    process.exit(1);
  }
}

main();
