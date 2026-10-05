/* sidebar-template.js — generates sidebar HTML consistently */
(function() {
  const PAGES = [
    { id:'bab1', num:'1', title:'Pengenalan Database',   href:'bab-1-pengenalan-database.html' },
    { id:'bab2', num:'2', title:'ERD & Perancangan',     href:'bab-2-erd-perancangan.html' },
    { id:'bab3', num:'3', title:'DDL — Struktur DB',     href:'bab-3-ddl.html' },
    { id:'bab4', num:'4', title:'DML — Manipulasi Data', href:'bab-4-dml.html' },
    { id:'bab5', num:'5', title:'Normalisasi',           href:'bab-5-normalisasi.html' },
    { id:'bab6', num:'6', title:'JOIN & Subquery',       href:'bab-6-join-subquery.html' },
    { id:'bab7', num:'7', title:'Objek Lanjutan',        href:'bab-7-objek-lanjutan.html' },
  ];

  document.addEventListener('DOMContentLoaded', function() {
    const sb = document.getElementById('sidebar');
    if (!sb) return;
    // detect prefix (index vs modules/)
    const isModules = window.location.pathname.includes('/modules/');
    const prefix = isModules ? '' : 'modules/';
    const gamePrefix = isModules ? '../game/' : 'game/';
    const glossPrefix = isModules ? '../glossarium.html' : 'glossarium.html';

    const currentPath = window.location.pathname;

    let html = `<div class="sidebar-inner">
      <div class="sidebar-progress-wrap">
        <div class="sidebar-progress-label">Progress Belajar</div>
        <div class="sidebar-progress-text" id="sidebar-progress-text">0 dari 7 Bab Selesai</div>
        <div class="sidebar-progress-bar"><div class="sidebar-progress-fill" id="sidebar-progress-fill" style="width:0%"></div></div>
      </div>
      <div class="sidebar-section-label">Materi</div>`;

    PAGES.forEach(p => {
      const isActive = currentPath.includes(p.href);
      html += `
      <a href="${prefix}${p.href}" class="sidebar-nav-item${isActive?' active':''}" id="sidebar-${p.id}" data-page="${p.id}">
        <div class="sidebar-bab-num">${p.num}</div>
        <div class="sidebar-bab-info">
          <span class="sidebar-bab-title">${p.title}</span>
          <span class="sidebar-bab-status">Belum dibuka</span>
        </div>
      </a>`;
    });

    html += `
      <div class="sidebar-section-label" style="margin-top:.5rem">Fitur</div>
      <a href="${gamePrefix}query-ninja.html" class="sidebar-game-link">
        <span style="font-size:1.1rem">🥷</span>
        <div><div style="font-size:.82rem;font-weight:700">Query Ninja</div>
        <div style="font-size:.68rem;color:#6d28d9">Game Edukasi SQL</div></div>
      </a>
      <a href="${glossPrefix}" class="sidebar-nav-item" style="margin-top:.5rem">
        <div class="sidebar-bab-num" style="font-size:.8rem">📖</div>
        <div class="sidebar-bab-info"><span class="sidebar-bab-title">Glossarium</span><span class="sidebar-bab-status">60+ istilah</span></div>
      </a>
    </div>`;

    sb.innerHTML = html;
    if (window.Progress) window.Progress.updateSidebarUI();
  });
})();
