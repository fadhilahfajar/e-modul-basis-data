/* quiz.js — E-Modul Basis Data */
(function () {

  function initQuiz(quizData, babId, containerId) {
    const container = document.getElementById(containerId || 'quiz-container');
    if (!container || !quizData || !quizData.length) return;

    let current = 0;
    let score = 0;
    let answered = false;

    function render() {
      if (current >= quizData.length) { showResult(); return; }
      const q = quizData[current];
      answered = false;

      const pct = Math.round((current / quizData.length) * 100);
      container.innerHTML = `
        <div class="quiz-question-num">Soal ${current + 1} dari ${quizData.length}</div>
        <div class="quiz-progress-bar-wrap">
          <div class="quiz-progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <div class="quiz-question-text" style="margin-top:1rem">${q.question}</div>
        ${q.type === 'multiple_choice' ? renderMC(q) : renderFill(q)}
        <div class="quiz-feedback" id="quiz-feedback"></div>
        <div class="quiz-actions" id="quiz-actions" style="display:none">
          <button class="btn btn-primary btn-sm" id="quiz-next">
            ${current + 1 < quizData.length ? 'Soal Berikutnya →' : 'Lihat Hasil'}
          </button>
        </div>
      `;

      if (q.type === 'multiple_choice') {
        container.querySelectorAll('.quiz-option').forEach(btn => {
          btn.addEventListener('click', function () {
            if (answered) return;
            answered = true;
            const idx = parseInt(this.dataset.idx);
            handleMC(q, idx);
          });
        });
      } else {
        const submitBtn = container.querySelector('#quiz-submit');
        const input = container.querySelector('.quiz-input');
        if (submitBtn) submitBtn.addEventListener('click', () => handleFill(q, input));
        if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') handleFill(q, input); });
      }

      const nextBtn = container.querySelector('#quiz-next');
      if (nextBtn) nextBtn.addEventListener('click', () => { current++; render(); });
    }

    function renderMC(q) {
      return `<div class="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" data-idx="${i}">${opt}</button>
        `).join('')}
      </div>`;
    }

    function renderFill(q) {
      return `<div class="quiz-input-wrap">
        <input type="text" class="quiz-input" placeholder="Ketik jawaban SQL di sini..." autocomplete="off" spellcheck="false">
        <button class="btn btn-primary btn-sm" id="quiz-submit">Jawab</button>
      </div>`;
    }

    function handleMC(q, selectedIdx) {
      const isCorrect = selectedIdx === q.correct;
      if (isCorrect) score++;

      container.querySelectorAll('.quiz-option').forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) btn.classList.add('correct');
        else if (i === selectedIdx && !isCorrect) btn.classList.add('wrong');
      });

      showFeedback(isCorrect, q.explanation);
      container.querySelector('#quiz-actions').style.display = 'flex';
    }

    function handleFill(q, input) {
      if (answered) return;
      answered = true;
      const val = input.value.trim();
      if (!val) return;
      input.disabled = true;

      const correct = q.correct.toLowerCase().replace(/\s+/g, ' ').replace(/;$/, '').trim();
      const given   = val.toLowerCase().replace(/\s+/g, ' ').replace(/;$/, '').trim();
      const alts    = (q.alternatives || []).map(a => a.toLowerCase().replace(/\s+/g, ' ').replace(/;$/, '').trim());
      const isCorrect = given === correct || alts.includes(given);

      if (isCorrect) {
        score++;
        input.style.borderColor = 'var(--c-success)';
      } else {
        input.style.borderColor = 'var(--c-danger)';
      }

      showFeedback(isCorrect, q.explanation, q.correct);
      container.querySelector('#quiz-actions').style.display = 'flex';
    }

    function showFeedback(isCorrect, explanation, correct) {
      const fb = container.querySelector('#quiz-feedback');
      fb.className = 'quiz-feedback show ' + (isCorrect ? 'correct' : 'wrong');
      fb.innerHTML = `
        <strong>${isCorrect ? '✅ Benar!' : '❌ Kurang tepat'}</strong>
        ${!isCorrect && correct ? `<div>Jawaban: <code>${correct}</code></div>` : ''}
        <div>${explanation}</div>
      `;
    }

    function showResult() {
      const pct = Math.round((score / quizData.length) * 100);
      let emoji, msg;
      if (pct === 100)     { emoji = '🎉'; msg = 'Sempurna! Kamu menguasai materi ini!'; }
      else if (pct >= 80)  { emoji = '👏'; msg = 'Hampir sempurna! Sedikit lagi!'; }
      else if (pct >= 60)  { emoji = '💪'; msg = 'Cukup baik! Ulangi bagian yang kurang.'; }
      else                  { emoji = '📖'; msg = 'Pelajari lagi materinya, kamu pasti bisa!'; }

      container.innerHTML = `
        <div class="quiz-result show">
          <div style="font-size:3rem;margin-bottom:.5rem">${emoji}</div>
          <div class="quiz-score-big" style="color:${pct>=60?'var(--c-success)':'var(--c-danger)'}">${pct}%</div>
          <div style="font-size:.9rem;color:var(--c-text-2);margin-bottom:.25rem">${score} dari ${quizData.length} soal benar</div>
          <div class="quiz-score-msg">${msg}</div>
          <div class="quiz-actions" style="justify-content:center">
            <button class="btn btn-outline btn-sm" id="quiz-retry">↩ Ulangi Quiz</button>
            ${babId ? `<button class="btn btn-primary btn-sm" id="quiz-done">✓ Tandai Selesai</button>` : ''}
          </div>
        </div>
      `;

      if (babId && window.Progress) {
        window.Progress.saveQuizScore(babId, pct);
      }

      const retryBtn = container.querySelector('#quiz-retry');
      if (retryBtn) retryBtn.addEventListener('click', () => { current = 0; score = 0; render(); });

      const doneBtn = container.querySelector('#quiz-done');
      if (doneBtn && babId && window.Progress) {
        doneBtn.addEventListener('click', () => {
          window.Progress.markBabSelesai(babId);
          doneBtn.textContent = '✓ Selesai!';
          doneBtn.disabled = true;
        });
      }
    }

    render();
  }

  window.Quiz = { init: initQuiz };
})();
