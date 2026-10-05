/* dark-mode.js — E-Modul Basis Data */
(function () {
  const KEY = 'emodul_theme';
  const html = document.documentElement;

  function apply(theme) {
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    const btn = document.getElementById('dark-toggle');
    if (btn) {
      btn.querySelector('i').className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      btn.title = theme === 'dark' ? 'Mode Terang' : 'Mode Gelap';
    }
  }

  function init() {
    const saved = localStorage.getItem(KEY);
    if (saved) {
      apply(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      apply('dark');
    } else {
      apply('light');
    }
  }

  function toggle() {
    const isDark = html.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    localStorage.setItem(KEY, next);
    apply(next);
  }

  // Run immediately to avoid flash
  init();

  // Expose toggle globally
  window.toggleDarkMode = toggle;

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('dark-toggle');
    if (btn) btn.addEventListener('click', toggle);
    init(); // re-apply to update icon
  });
})();
