/**
 * Presentation Controller & Navigation Shell
 */
(function () {
  'use strict';

  const slides = window.SlideDeck;
  const stage = document.getElementById('stage');
  const slidesArea = document.getElementById('slides-area');
  const spineEl = document.getElementById('spine');
  const counterEl = document.getElementById('slide-counter');

  const notesDrawer = document.getElementById('drawer-notes');
  const notesBody = document.getElementById('notes-body');
  const btnNotes = document.getElementById('btn-notes');
  const btnCloseNotes = document.getElementById('btn-close-notes');
  const btnFs = document.getElementById('btn-fs');

  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  let currentIdx = 0;
  let cleanupCurrentSlide = null;

  // Responsive Fit
  function fitStage() {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }
  window.addEventListener('resize', fitStage);
  fitStage();

  // Build Spine
  function buildSpine() {
    spineEl.innerHTML = slides.map((s, idx) => `
      <button class="spine-btn ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
        ${s.nav}
        <span class="spine-tip">${s.nav}. ${s.title}</span>
      </button>
    `).join('');

    spineEl.querySelectorAll('.spine-btn').forEach(btn => {
      btn.onclick = () => goTo(Number(btn.dataset.idx));
    });
  }

  function goTo(idx) {
    if (idx < 0 || idx >= slides.length) return;

    if (typeof cleanupCurrentSlide === 'function') {
      cleanupCurrentSlide();
      cleanupCurrentSlide = null;
    }

    currentIdx = idx;
    const s = slides[currentIdx];

    // Update Slide Content
    slidesArea.innerHTML = '';
    const slideWrapper = document.createElement('div');
    slideWrapper.className = 'slide';
    slidesArea.appendChild(slideWrapper);

    const api = {
      next: () => goTo(currentIdx + 1),
      prev: () => goTo(currentIdx - 1),
      goTo
    };

    cleanupCurrentSlide = s.render(slideWrapper, api);

    // Update Counter & Spine
    counterEl.textContent = `${String(currentIdx + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    spineEl.querySelectorAll('.spine-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === currentIdx);
    });

    // Update Notes
    notesBody.innerHTML = `<p>${s.notes || 'Tidak ada catatan.'}</p>`;

    btnPrev.style.visibility = currentIdx === 0 ? 'hidden' : 'visible';
    btnNext.style.visibility = currentIdx === slides.length - 1 ? 'hidden' : 'visible';
  }

  btnPrev.onclick = () => goTo(currentIdx - 1);
  btnNext.onclick = () => goTo(currentIdx + 1);

  btnNotes.onclick = () => notesDrawer.classList.toggle('hidden');
  btnCloseNotes.onclick = () => notesDrawer.classList.add('hidden');

  btnFs.onclick = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // Keyboard navigation
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
      notesDrawer.classList.add('hidden');
    } else if (e.key >= '1' && e.key <= '8') {
      goTo(Number(e.key) - 1);
    }
  });

  buildSpine();
  goTo(0);
})();
