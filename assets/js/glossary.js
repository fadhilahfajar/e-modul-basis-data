/* glossary.js — E-Modul Basis Data */
(function () {
  const glossaryData = [
    { term: 'Anomali', definition: 'Ketidakkonsistenan atau masalah yang muncul saat operasi INSERT, UPDATE, atau DELETE pada database yang tidak dinormalisasi.', category: 'Normalisasi' },
    { term: 'Atribut', definition: 'Properti atau karakteristik dari suatu entitas. Contoh: entitas Siswa memiliki atribut Nama, NIS, dan Kelas.', category: 'ERD' },
    { term: 'AUTO_INCREMENT', definition: 'Constraint MySQL yang secara otomatis menambah nilai kolom integer (biasanya Primary Key) setiap kali baris baru ditambahkan.', category: 'DDL' },
    { term: 'BCNF', definition: 'Boyce-Codd Normal Form. Bentuk normal yang lebih ketat dari 3NF, memastikan setiap determinan adalah kandidat kunci.', category: 'Normalisasi' },
    { term: 'Basis Data', definition: 'Kumpulan data yang terorganisir secara sistematis dan dapat diakses, dikelola, serta diperbarui dengan efisien.', category: 'Konsep Dasar' },
    { term: 'Kandidat Kunci', definition: 'Kolom atau kombinasi kolom yang dapat secara unik mengidentifikasi setiap baris dalam tabel. Salah satunya dipilih sebagai Primary Key.', category: 'ERD' },
    { term: 'Kardinalitas', definition: 'Menggambarkan jumlah entitas yang dapat berelasi dengan entitas lain. Jenisnya: One-to-One, One-to-Many, Many-to-Many.', category: 'ERD' },
    { term: 'CHECK', definition: 'Constraint yang memvalidasi nilai kolom berdasarkan kondisi tertentu. Contoh: CHECK (stok >= 0).', category: 'DDL' },
    { term: 'COMMIT', definition: 'Perintah dalam transaksi yang menyimpan semua perubahan secara permanen ke database.', category: 'Transaksi' },
    { term: 'Correlated Subquery', definition: 'Subquery yang mereferensikan kolom dari query luar (outer query). Dieksekusi sekali untuk setiap baris query luar.', category: 'DML Lanjutan' },
    { term: 'CROSS JOIN', definition: 'Jenis JOIN yang menghasilkan Cartesian product dari dua tabel — setiap baris tabel pertama dikombinasikan dengan setiap baris tabel kedua.', category: 'JOIN' },
    { term: 'DDL', definition: 'Data Definition Language. Perintah SQL untuk mendefinisikan dan memodifikasi struktur database: CREATE, ALTER, DROP, TRUNCATE.', category: 'SQL' },
    { term: 'DEFAULT', definition: 'Constraint yang memberikan nilai awal otomatis pada kolom jika tidak ada nilai yang dimasukkan saat INSERT.', category: 'DDL' },
    { term: 'DELETE', definition: 'Perintah DML untuk menghapus satu atau lebih baris dari tabel. Selalu gunakan klausa WHERE untuk menghindari penghapusan semua data.', category: 'DML' },
    { term: 'Derived Attribute', definition: 'Atribut yang nilainya dihitung dari atribut lain. Contoh: Usia dihitung dari Tanggal Lahir.', category: 'ERD' },
    { term: 'Derived Table', definition: 'Subquery yang digunakan di klausa FROM, seolah-olah menjadi tabel sementara. Juga disebut Inline View.', category: 'DML Lanjutan' },
    { term: 'DISTINCT', definition: 'Klausa SELECT yang menghilangkan baris duplikat dari hasil query.', category: 'DML' },
    { term: 'DML', definition: 'Data Manipulation Language. Perintah SQL untuk memanipulasi data: SELECT, INSERT, UPDATE, DELETE.', category: 'SQL' },
    { term: 'DROP', definition: 'Perintah DDL untuk menghapus objek database (tabel, database, view, dll.) secara permanen beserta seluruh datanya.', category: 'DDL' },
    { term: 'Entitas', definition: 'Objek atau konsep di dunia nyata yang memiliki data yang perlu disimpan. Contoh: Siswa, Buku, Pegawai.', category: 'ERD' },
    { term: 'ERD', definition: 'Entity-Relationship Diagram. Diagram yang menggambarkan entitas, atribut, dan relasi antar entitas dalam sebuah sistem basis data.', category: 'ERD' },
    { term: 'EXISTS', definition: 'Operator subquery yang mengembalikan TRUE jika subquery menghasilkan setidaknya satu baris.', category: 'DML Lanjutan' },
    { term: 'Foreign Key', definition: 'Kolom yang merujuk ke Primary Key di tabel lain. Digunakan untuk menjaga integritas referensial antar tabel.', category: 'DDL' },
    { term: 'Fungsi Agregat', definition: 'Fungsi yang melakukan perhitungan pada sekumpulan nilai: COUNT(), SUM(), AVG(), MAX(), MIN().', category: 'DML' },
    { term: 'GROUP BY', definition: 'Klausa yang mengelompokkan baris dengan nilai yang sama pada kolom tertentu, biasanya digunakan bersama fungsi agregat.', category: 'DML' },
    { term: 'HAVING', definition: 'Klausa filter yang digunakan setelah GROUP BY untuk memfilter kelompok data (berbeda dengan WHERE yang memfilter baris).', category: 'DML' },
    { term: 'INDEX', definition: 'Struktur data yang mempercepat pencarian data pada kolom tertentu. Bekerja seperti indeks buku untuk menemukan data dengan cepat.', category: 'Objek Lanjutan' },
    { term: 'INNER JOIN', definition: 'Jenis JOIN yang hanya mengembalikan baris yang memiliki nilai cocok di kedua tabel.', category: 'JOIN' },
    { term: 'INSERT', definition: 'Perintah DML untuk menambahkan satu atau lebih baris baru ke dalam tabel.', category: 'DML' },
    { term: 'Integritas Referensial', definition: 'Aturan yang memastikan setiap Foreign Key selalu merujuk ke nilai Primary Key yang valid di tabel induk.', category: 'DDL' },
    { term: 'JOIN', definition: 'Operasi SQL untuk menggabungkan baris dari dua atau lebih tabel berdasarkan kondisi relasi antar kolom.', category: 'JOIN' },
    { term: 'Ketergantungan Fungsional', definition: 'Hubungan di mana nilai satu kolom (determinan) secara unik menentukan nilai kolom lain. Notasi: A → B.', category: 'Normalisasi' },
    { term: 'LEFT JOIN', definition: 'Jenis JOIN yang mengembalikan semua baris dari tabel kiri, plus baris yang cocok dari tabel kanan (NULL jika tidak ada kecocokan).', category: 'JOIN' },
    { term: 'LIKE', definition: 'Operator perbandingan untuk pencocokan pola string. Wildcard % berarti nol atau lebih karakter, _ berarti satu karakter.', category: 'DML' },
    { term: 'LIMIT', definition: 'Klausa yang membatasi jumlah baris yang dikembalikan oleh query SELECT.', category: 'DML' },
    { term: 'Multi-value Attribute', definition: 'Atribut yang dapat memiliki lebih dari satu nilai untuk satu entitas. Contoh: nomor telepon seseorang bisa lebih dari satu.', category: 'ERD' },
    { term: 'MySQL', definition: 'Sistem manajemen basis data relasional (RDBMS) open-source yang populer, dikembangkan oleh Oracle Corporation.', category: 'Konsep Dasar' },
    { term: 'Normalisasi', definition: 'Proses pengorganisasian tabel dalam database untuk mengurangi redundansi data dan meningkatkan integritas data.', category: 'Normalisasi' },
    { term: 'NOT NULL', definition: 'Constraint yang memastikan kolom tidak boleh berisi nilai NULL — kolom harus selalu terisi.', category: 'DDL' },
    { term: 'NULL', definition: 'Nilai khusus dalam SQL yang merepresentasikan data yang tidak diketahui atau tidak ada. Berbeda dengan nol atau string kosong.', category: 'Konsep Dasar' },
    { term: 'ORDER BY', definition: 'Klausa yang mengurutkan hasil query berdasarkan satu atau lebih kolom, secara ASC (naik) atau DESC (turun).', category: 'DML' },
    { term: 'Partial Dependency', definition: 'Ketergantungan di mana atribut non-kunci hanya bergantung pada sebagian dari composite primary key. Dilanggar di 2NF.', category: 'Normalisasi' },
    { term: 'Primary Key', definition: 'Kolom atau kombinasi kolom yang secara unik mengidentifikasi setiap baris dalam tabel. Nilainya harus unik dan tidak boleh NULL.', category: 'DDL' },
    { term: 'RDBMS', definition: 'Relational Database Management System. Sistem manajemen database yang menggunakan model relasional (tabel, baris, kolom).', category: 'Konsep Dasar' },
    { term: 'Relasi', definition: 'Hubungan antara dua atau lebih entitas dalam database. Digambarkan dalam ERD dengan garis dan simbol kardinalitas.', category: 'ERD' },
    { term: 'RIGHT JOIN', definition: 'Jenis JOIN yang mengembalikan semua baris dari tabel kanan, plus baris yang cocok dari tabel kiri.', category: 'JOIN' },
    { term: 'ROLLBACK', definition: 'Perintah transaksi yang membatalkan semua perubahan yang dibuat sejak transaksi dimulai.', category: 'Transaksi' },
    { term: 'SELECT', definition: 'Perintah DML untuk membaca dan menampilkan data dari satu atau lebih tabel.', category: 'DML' },
    { term: 'SELF JOIN', definition: 'Teknik JOIN di mana sebuah tabel digabungkan dengan dirinya sendiri, berguna untuk data hierarkis.', category: 'JOIN' },
    { term: 'Stored Procedure', definition: 'Blok kode SQL yang tersimpan di database dan dapat dipanggil dengan perintah CALL. Mendukung parameter dan logika kontrol.', category: 'Objek Lanjutan' },
    { term: 'Subquery', definition: 'Query yang tersarang di dalam query lain (SELECT, INSERT, UPDATE, DELETE). Juga disebut nested query atau inner query.', category: 'DML Lanjutan' },
    { term: 'Transaksi', definition: 'Serangkaian operasi database yang diperlakukan sebagai satu unit kerja. Harus memenuhi sifat ACID.', category: 'Transaksi' },
    { term: 'Transitive Dependency', definition: 'Ketergantungan di mana atribut non-kunci bergantung pada atribut non-kunci lainnya. Dilanggar di 3NF.', category: 'Normalisasi' },
    { term: 'Trigger', definition: 'Objek database yang secara otomatis dieksekusi (BEFORE atau AFTER) ketika terjadi operasi INSERT, UPDATE, atau DELETE pada tabel.', category: 'Objek Lanjutan' },
    { term: 'TRUNCATE', definition: 'Perintah DDL yang menghapus semua baris dalam tabel dengan cepat tanpa mencatat setiap penghapusan. Lebih cepat dari DELETE tanpa WHERE.', category: 'DDL' },
    { term: 'UNIQUE', definition: 'Constraint yang memastikan semua nilai dalam kolom berbeda satu sama lain. Berbeda dengan Primary Key, kolom UNIQUE boleh NULL.', category: 'DDL' },
    { term: 'UPDATE', definition: 'Perintah DML untuk mengubah nilai kolom pada baris yang sudah ada. Selalu gunakan WHERE agar tidak mengubah semua baris!', category: 'DML' },
    { term: 'VIEW', definition: 'Tabel virtual yang dibuat dari hasil query SELECT. Menyimpan definisi query, bukan datanya. Berguna untuk penyederhanaan dan keamanan.', category: 'Objek Lanjutan' },
    { term: 'WHERE', definition: 'Klausa filter dalam SELECT, UPDATE, DELETE yang menentukan kondisi baris mana yang akan diproses.', category: 'DML' },
    { term: '1NF', definition: 'Bentuk Normal Pertama. Syarat: setiap sel berisi nilai atomik (tunggal), tidak ada repeating group, dan ada primary key.', category: 'Normalisasi' },
    { term: '2NF', definition: 'Bentuk Normal Kedua. Syarat: memenuhi 1NF dan tidak ada partial dependency (setiap non-key attr bergantung penuh pada primary key).', category: 'Normalisasi' },
    { term: '3NF', definition: 'Bentuk Normal Ketiga. Syarat: memenuhi 2NF dan tidak ada transitive dependency (non-key attr tidak bergantung pada non-key attr lain).', category: 'Normalisasi' },
    { term: 'ACID', definition: 'Sifat transaksi database: Atomicity (semua atau tidak ada), Consistency (data tetap valid), Isolation (transaksi tidak saling mengganggu), Durability (perubahan permanen).', category: 'Transaksi' },
  ];

  function init() {
    const searchEl  = document.getElementById('gloss-search');
    const countEl   = document.getElementById('gloss-count');
    const listEl    = document.getElementById('gloss-list');
    const alphaNav  = document.getElementById('gloss-alpha-nav');
    if (!listEl) return;

    let activeAlpha = null;

    function render(filtered) {
      if (!filtered.length) {
        listEl.innerHTML = '<div class="gloss-empty"><i class="fa-solid fa-magnifying-glass" style="font-size:2rem;opacity:.3;display:block;margin-bottom:.5rem"></i>Istilah tidak ditemukan</div>';
        if (countEl) countEl.textContent = 'Menampilkan 0 dari ' + glossaryData.length + ' istilah';
        return;
      }
      if (countEl) countEl.textContent = 'Menampilkan ' + filtered.length + ' dari ' + glossaryData.length + ' istilah';

      const groups = {};
      filtered.forEach(item => {
        const letter = item.term[0].toUpperCase();
        if (!groups[letter]) groups[letter] = [];
        groups[letter].push(item);
      });

      listEl.innerHTML = Object.keys(groups).sort().map(letter => `
        <div class="gloss-group" id="gloss-group-${letter}">
          <div class="gloss-group-label">${letter}</div>
          ${groups[letter].sort((a,b) => a.term.localeCompare(b.term)).map(item => `
            <div class="gloss-item">
              <div class="gloss-term">${item.term}</div>
              <div class="gloss-category">${item.category}</div>
              <div class="gloss-def">${item.definition}</div>
            </div>
          `).join('')}
        </div>
      `).join('');
    }

    function filter() {
      const q = (searchEl?.value || '').toLowerCase().trim();
      let data = glossaryData;
      if (activeAlpha) data = data.filter(i => i.term[0].toUpperCase() === activeAlpha);
      if (q) data = data.filter(i => i.term.toLowerCase().includes(q) || i.definition.toLowerCase().includes(q));
      render(data);
    }

    // Alpha nav
    if (alphaNav) {
      const letters = [...new Set(glossaryData.map(i => i.term[0].toUpperCase()))].sort();
      alphaNav.innerHTML = letters.map(l =>
        `<button class="gloss-alpha-btn" data-alpha="${l}">${l}</button>`
      ).join('');
      alphaNav.querySelectorAll('.gloss-alpha-btn').forEach(btn => {
        btn.addEventListener('click', function () {
          if (activeAlpha === this.dataset.alpha) {
            activeAlpha = null;
            this.classList.remove('active');
          } else {
            alphaNav.querySelectorAll('.gloss-alpha-btn').forEach(b => b.classList.remove('active'));
            activeAlpha = this.dataset.alpha;
            this.classList.add('active');
          }
          filter();
        });
      });
    }

    if (searchEl) searchEl.addEventListener('input', filter);
    render(glossaryData);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
