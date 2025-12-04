"use strict";
/**
 * Initializes the spofix mini-app
 * Handles: dynamic playlist, Congolese quotes, and theme customization
 */
function init_index() {
    // 🎵 Playlist dynamique
    const playlist = [];
    const playlistEl = document.getElementById('playlist');
    const songInput = document.getElementById('songInput');
    const addSongBtn = document.getElementById('addSong');
    if (addSongBtn && songInput) {
        addSongBtn.addEventListener('click', () => {
            const song = songInput.value.trim();
            if (song) {
                playlist.push(song);
                renderPlaylist();
                songInput.value = '';
            }
        });
    }
    function renderPlaylist() {
        if (!playlistEl)
            return;
        playlistEl.innerHTML = '';
        playlist.forEach((song) => {
            const li = document.createElement('li');
            li.textContent = song;
            playlistEl.appendChild(li);
        });
    }
    // 💬 Citations congolaises
    const citations = [
        "Le fleuve ne refuse pas l'eau sale.",
        "Le léopard ne se gratte pas contre un arbre sec.",
        "Celui qui veut du miel doit avoir le courage d'affronter les abeilles.",
        "Même la plus petite rivière a sa source.",
        "La patience est une clé qui ouvre toutes les portes."
    ];
    const quoteText = document.getElementById('quoteText');
    const newQuoteBtn = document.getElementById('newQuote');
    if (newQuoteBtn && quoteText) {
        newQuoteBtn.addEventListener('click', () => {
            const random = Math.floor(Math.random() * citations.length);
            quoteText.textContent = citations[random];
        });
    }
    // 🎨 Thème personnalisable
    const toggleThemeBtn = document.getElementById('toggleTheme');
    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
        });
    }
}
// Expose function for global access
window.init_index = init_index;
