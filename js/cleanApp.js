/**
 * Clean Deck Application Controller
 * Handles dot navigation, arrow keys, 3D background camera panning,
 * dedicated 3D slide simulator lifecycles, and speaker notes
 */
(function () {
  'use strict';

  const slides = window.CleanDeck;
  const bg3dContainer = document.getElementById('bg-3d');
  const bg3d = window.Background3D.initBackground3D(bg3dContainer);

  const mainArea = document.getElementById('deck-main');
  const dotsContainer = document.getElementById('nav-dots');
  const counterEl = document.getElementById('deck-counter');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnNotes = document.getElementById('btn-notes');
  const notesModal = document.getElementById('notes-modal');
  const notesText = document.getElementById('notes-text');
  const btnCloseNotes = document.getElementById('btn-close-notes');
  const btnFs = document.getElementById('btn-fs');

  let currentIdx = 0;
  let currentSlideCleanup = null;

  // Build Top Navigation Dots
  function buildDots() {
    dotsContainer.innerHTML = slides.map((s, idx) => `
      <button class="dot-btn ${idx === 0 ? 'active' : ''}" data-idx="${idx}" title="${s.title}"></button>
    `).join('');

    dotsContainer.querySelectorAll('.dot-btn').forEach(btn => {
      btn.onclick = () => goTo(Number(btn.dataset.idx));
    });
  }

  function goTo(idx) {
    if (idx < 0 || idx >= slides.length) return;

    if (typeof currentSlideCleanup === 'function') {
      currentSlideCleanup();
      currentSlideCleanup = null;
    }

    currentIdx = idx;
    const s = slides[currentIdx];

    // Pan 3D background camera
    bg3d.setSlideIndex(currentIdx);

    // Render Slide
    mainArea.innerHTML = '';
    const api = {
      next: () => goTo(currentIdx + 1),
      prev: () => goTo(currentIdx - 1),
      goTo
    };
    currentSlideCleanup = s.render(mainArea, api);

    // Update Dots & Counter
    dotsContainer.querySelectorAll('.dot-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === currentIdx);
    });

    counterEl.textContent = `${String(currentIdx + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    btnPrev.disabled = currentIdx === 0;
    btnNext.disabled = currentIdx === slides.length - 1;

    // Update Notes
    notesText.textContent = s.notes || 'Tidak ada catatan khusus.';
  }

  btnPrev.onclick = () => goTo(currentIdx - 1);
  btnNext.onclick = () => goTo(currentIdx + 1);

  btnNotes.onclick = () => notesModal.classList.toggle('hidden');
  btnCloseNotes.onclick = () => notesModal.classList.add('hidden');

  btnFs.onclick = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      goTo(currentIdx + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
      goTo(currentIdx - 1);
    } else if (e.key === 'n' || e.key === 'N') {
      btnNotes.click();
    } else if (e.key === 'f' || e.key === 'F') {
      btnFs.click();
    } else if (e.key === 'Escape') {
      notesModal.classList.add('hidden');
    } else if (e.key >= '1' && e.key <= '7') {
      goTo(Number(e.key) - 1);
    }
  });

  buildDots();
  goTo(0);
})();
