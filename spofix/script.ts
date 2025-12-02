/**
 * Initializes the congostream mini-app
 * Handles: dynamic playlist, Congolese quotes, and theme customization
 */

function init_index(): void {
  // 🎵 Playlist dynamique
  const playlist: string[] = [];
  const playlistEl = document.getElementById('playlist') as HTMLUListElement | null;
  const songInput = document.getElementById('songInput') as HTMLInputElement | null;
  const addSongBtn = document.getElementById('addSong') as HTMLButtonElement | null;

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
    if (!playlistEl) return;
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

  const quoteText = document.getElementById('quoteText') as HTMLElement | null;
  const newQuoteBtn = document.getElementById('newQuote') as HTMLButtonElement | null;

  if (newQuoteBtn && quoteText) {
    newQuoteBtn.addEventListener('click', () => {
      const random = Math.floor(Math.random() * citations.length);
      quoteText.textContent = citations[random];
    });
  }

  // 🎨 Thème personnalisable
  const toggleThemeBtn = document.getElementById('toggleTheme') as HTMLButtonElement | null;

  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
  }
}

// Expose function for global access
(window as any).init_index = init_index;
