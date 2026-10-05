/* print.js — E-Modul Basis Data */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const printBtn = document.getElementById('btn-print');
    if (printBtn) {
      printBtn.addEventListener('click', function () {
        window.print();
      });
    }
  });
})();
