/*
  JavaScript partagé pour l'ensemble du site
  - Instancie `init_<pagename>()` si défini (p.ex. `init_accueil`, `init_compte`, `init_index`)
  - Contient utilitaires et quelques fonctions d'initialisation centralisées
*/
// Fichier JS commun pour CongoStream
document.addEventListener('DOMContentLoaded', function () {
  // Utilitaires simples
  window.utils = {
    qs: function (selector, root) { return (root || document).querySelector(selector); },
    qsa: function (selector, root) { return (root || document).querySelectorAll(selector); }
  };

  // Exemple d'initialisation par page : on cherche `data-page`, `id` ou le nom du fichier
  var page = document.body.getAttribute('data-page') || document.body.id;
  if (!page) {
    var p = location.pathname.split('/').pop();
    page = p ? p.replace('.html', '') : '';
  }

  // Appelle une fonction d'initialisation spécifique si elle existe (ex: window.init_accueil)
  if (page) {
    var fnName = 'init_' + page;
    if (typeof window[fnName] === 'function') {
      try { window[fnName](); } catch (e) { console.error('init error', e); }
    }
  }

  // Exemple : améliore les formulaires pour submit via Enter proprement
  Array.prototype.forEach.call(document.querySelectorAll('form'), function (form) {
    form.addEventListener('submit', function (e) {
      // Réduit comportement par défaut pour éviter rechargements inutiles en développement
    }, false);
  });
});

// Fonctions d'initialisation spécifiques aux pages
// Accueil: affiche un message selon l'heure
function init_accueil() {
  try {
    var target = document.getElementById('message-accueil');
    if (!target) return;
    var heure = new Date().getHours();
    var message = '';
    if (heure < 12) message = '☀️ Un matin à Kinshasa commence avec un bon son.';
    else if (heure < 18) message = '🎬 Besoin d'une pause culturelle ? CongoStream est là.';
    else message = '🌙 La nuit tombe, les histoires commencent.';
    target.innerText = message;
  } catch (e) { console.error('init_accueil error', e); }
}

// Compte: récupère l'abonnement (garde gestion d'erreur)
function init_compte() {
  try {
    var target = document.getElementById('abonnement-utilisateur');
    if (!target) return;
    // Tente l'API distante d'abord, puis bascule sur un mock local si échec
    fetch('http://localhost:3000/mon-compte/1')
      .then(function (res) { if (!res.ok) throw new Error('bad response'); return res.json(); })
      .then(function (data) {
        target.innerText = data && data.abonnement ? data.abonnement : 'Aucun abonnement';
      })
      .catch(function () {
        // Fallback vers mock local dans le projet
        fetch('../assets/data/mock-api/mon-compte-1.json')
          .then(function (r) { return r.json(); })
          .then(function (d) { target.innerText = d && d.abonnement ? d.abonnement : 'Aucun abonnement (mock)'; })
          .catch(function () { target.innerText = 'Erreur de chargement'; });
      });
  } catch (e) { console.error('init_compte error', e); }
}

// Expose pour compatibilité globale
window.init_accueil = init_accueil;
window.init_compte = init_compte;
