/* main.js — E-Modul Basis Data */
document.addEventListener('DOMContentLoaded', function () {

  /* ─── SIDEBAR TOGGLE ─── */
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebar-overlay');
  const hambBtn  = document.getElementById('hamburger-btn');

  function openSidebar()  { sidebar?.classList.add('open'); overlay?.classList.add('show'); }
  function closeSidebar() { sidebar?.classList.remove('open'); overlay?.classList.remove('show'); }

  hambBtn?.addEventListener('click', openSidebar);
  overlay?.addEventListener('click', closeSidebar);

  /* ─── DETECT ACTIVE BAB IN SIDEBAR ─── */
  const path = window.location.pathname;
  document.querySelectorAll('.sidebar-nav-item[data-page]').forEach(el => {
    if (path.includes(el.dataset.page)) el.classList.add('active');
  });

  /* ─── BACK TO TOP ─── */
  const backBtn = document.createElement('button');
  backBtn.className = 'back-to-top';
  backBtn.title = 'Kembali ke atas';
  backBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(backBtn);

  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.scrollY > 300);
  });

  /* ─── READING TIME ─── */
  const contentArea = document.querySelector('.content-area');
  const readTimeEl  = document.getElementById('read-time');
  if (contentArea && readTimeEl) {
    const words = contentArea.innerText.trim().split(/\s+/).length;
    readTimeEl.textContent = '⏱ ' + Math.ceil(words / 200) + ' menit';
  }

  /* ─── COPY CODE BUTTONS ─── */
  document.querySelectorAll('.code-wrap').forEach(wrap => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Salin';
    wrap.appendChild(btn);

    btn.addEventListener('click', () => {
      const code = wrap.querySelector('code');
      if (!code) return;
      navigator.clipboard.writeText(code.innerText).then(() => {
        btn.textContent = '✓ Disalin!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Salin'; btn.classList.remove('copied'); }, 2000);
      });
    });
  });

  /* ─── MARK DONE BUTTON ─── */
  const markDoneBtn = document.getElementById('btn-mark-done');
  if (markDoneBtn) {
    const babId = markDoneBtn.dataset.bab;
    // check if already done
    if (window.Progress) {
      const p = window.Progress.getBabProgress(babId);
      if (p.selesai) {
        markDoneBtn.classList.add('done');
        markDoneBtn.innerHTML = '<i class="fa-solid fa-check-circle"></i> Bab Selesai!';
      }
    }
    markDoneBtn.addEventListener('click', function () {
      if (!babId || !window.Progress) return;
      window.Progress.markBabSelesai(babId);
      markDoneBtn.classList.add('done');
      markDoneBtn.innerHTML = '<i class="fa-solid fa-check-circle"></i> Bab Selesai!';
    });
  }

  /* ─── INIT PROGRESS UI ─── */
  if (window.Progress) {
    window.Progress.updateSidebarUI();
    // track visit for current bab
    const babAttr = document.body.dataset.bab;
    if (babAttr) window.Progress.trackVisit(babAttr);
  }

  /* ─── GAME HI SCORE on index ─── */
  const hiEl = document.getElementById('game-hi-score');
  if (hiEl) {
    hiEl.textContent = localStorage.getItem('queryninja_highscore') || '0';
  }

  /* ─── OVERALL PROGRESS on index ─── */
  if (window.Progress) window.Progress.updateSidebarUI();

});
