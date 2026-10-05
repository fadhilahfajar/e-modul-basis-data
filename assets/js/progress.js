/* progress.js — E-Modul Basis Data */
(function () {
  const KEY = 'emodul_basdat_progress';
  const TOTAL_BABS = 7;

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch { return {}; }
  }

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function markBabSelesai(babId) {
    const data = load();
    if (!data[babId]) data[babId] = {};
    data[babId].selesai = true;
    data[babId].last_visited = new Date().toISOString().split('T')[0];
    save(data);
    updateSidebarUI();
    updateMarkDoneButton(babId);
  }

  function getBabProgress(babId) {
    const data = load();
    return data[babId] || { selesai: false, quiz_score: null, last_visited: null };
  }

  function saveQuizScore(babId, score) {
    const data = load();
    if (!data[babId]) data[babId] = {};
    data[babId].quiz_score = score;
    data[babId].last_visited = new Date().toISOString().split('T')[0];
    // auto-mark selesai if score >= 60
    if (score >= 60) data[babId].selesai = true;
    save(data);
    updateSidebarUI();
  }

  function getOverallProgress() {
    const data = load();
    let done = 0;
    for (let i = 1; i <= TOTAL_BABS; i++) {
      if (data['bab' + i] && data['bab' + i].selesai) done++;
    }
    return { done, total: TOTAL_BABS, pct: Math.round((done / TOTAL_BABS) * 100) };
  }

  function resetAllProgress() {
    if (confirm('Reset semua progress? Data quiz dan bab selesai akan dihapus.')) {
      localStorage.removeItem(KEY);
      location.reload();
    }
  }

  function updateSidebarUI() {
    const { done, total, pct } = getOverallProgress();
    const fillEl = document.getElementById('sidebar-progress-fill');
    const textEl = document.getElementById('sidebar-progress-text');
    if (fillEl) fillEl.style.width = pct + '%';
    if (textEl) textEl.textContent = done + ' dari ' + total + ' Bab Selesai';

    // update each nav item
    for (let i = 1; i <= total; i++) {
      const p = getBabProgress('bab' + i);
      const el = document.getElementById('sidebar-bab-' + i);
      if (!el) continue;
      el.classList.toggle('done', !!p.selesai);
      const statusEl = el.querySelector('.sidebar-bab-status');
      if (statusEl) statusEl.textContent = p.selesai ? '✓ Selesai' : p.last_visited ? 'Sedang belajar' : 'Belum dibuka';
    }

    // update bab-card statuses on index
    for (let i = 1; i <= total; i++) {
      const p = getBabProgress('bab' + i);
      const cardEl = document.getElementById('bab-card-' + i);
      if (!cardEl) continue;
      const statusBadge = cardEl.querySelector('.bab-card-status');
      if (statusBadge) {
        if (p.selesai) {
          statusBadge.textContent = '✓ Selesai';
          statusBadge.className = 'bab-card-status done';
          cardEl.classList.add('done');
        } else if (p.last_visited) {
          statusBadge.textContent = '● Sedang';
          statusBadge.className = 'bab-card-status active';
        }
      }
    }

    // overall progress on index
    const overallNum = document.getElementById('overall-num');
    const overallFill = document.getElementById('overall-fill');
    const overallLabel = document.getElementById('overall-label');
    if (overallNum)   overallNum.textContent = pct + '%';
    if (overallFill)  overallFill.style.width = pct + '%';
    if (overallLabel) overallLabel.textContent = done + ' dari ' + total + ' bab telah diselesaikan';
  }

  function updateMarkDoneButton(babId) {
    const btn = document.getElementById('btn-mark-done');
    if (!btn) return;
    btn.classList.add('done');
    btn.innerHTML = '<i class="fa-solid fa-check-circle"></i> Bab Selesai!';
  }

  // Track visit
  function trackVisit(babId) {
    const data = load();
    if (!data[babId]) data[babId] = {};
    data[babId].last_visited = new Date().toISOString().split('T')[0];
    save(data);
  }

  // Expose globally
  window.Progress = {
    markBabSelesai,
    getBabProgress,
    saveQuizScore,
    getOverallProgress,
    resetAllProgress,
    updateSidebarUI,
    trackVisit
  };
})();
