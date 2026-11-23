/**
 * Main Controller Binding the 3D Datacenter World to Presentation Panels
 */
(function () {
  'use strict';

  const slides = window.PresentationDeck;
  const container3D = document.getElementById('canvas3d-container');
  const d3 = window.Datacenter3D.createDatacenterScene(container3D);

  const pipelineNav = document.getElementById('pipeline-nav');
  const slidePanel = document.getElementById('glass-panel');
  const counterEl = document.getElementById('current-slide-num');

  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnNotes = document.getElementById('btn-notes');
  const notesDrawer = document.getElementById('modal-notes');
  const notesContent = document.getElementById('notes-content');
  const btnCloseNotes = document.getElementById('btn-close-notes');
  const btnFs = document.getElementById('btn-fs');

  let currentIdx = 0;
  let cleanupCurrentSlide = null;

  // Build Pipeline Progress Buttons (like HMMGA)
  function buildPipeline() {
    pipelineNav.innerHTML = slides.map((s, idx) => `
      <button class="pipe-btn ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
        <span class="num">${s.num}</span>
        <span>${s.short}</span>
      </button>
    `).join('');

    pipelineNav.querySelectorAll('.pipe-btn').forEach(btn => {
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

    // Smooth camera transition to target view
    d3.setCameraView(s.cameraIndex, true);

    // Update Slide Content
    slidePanel.innerHTML = '';
    const api = {
      next: () => goTo(currentIdx + 1),
      prev: () => goTo(currentIdx - 1),
      goTo
    };

    cleanupCurrentSlide = s.render(slidePanel, api, d3);

    // Add navigation footer at the bottom of the card
    const navFooter = document.createElement('div');
    navFooter.className = 'stage-nav';
    navFooter.innerHTML = `
      <button class="btn" id="card-prev" ${currentIdx === 0 ? 'disabled style="opacity:0.4"' : ''}>
        ← Sebelumnya
      </button>
      <span style="font-family:var(--font-mono);font-size:14px;color:var(--ink-secondary);">
        ${currentIdx + 1} / ${slides.length}
      </span>
      <button class="btn btn-primary" id="card-next" ${currentIdx === slides.length - 1 ? 'disabled style="opacity:0.4"' : ''}>
        Berikutnya →
      </button>
    `;
    slidePanel.appendChild(navFooter);

    navFooter.querySelector('#card-prev').onclick = () => goTo(currentIdx - 1);
    navFooter.querySelector('#card-next').onclick = () => goTo(currentIdx + 1);

    // Update Pipeline Active State
    pipelineNav.querySelectorAll('.pipe-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === currentIdx);
    });

    // Update Counter & Notes
    counterEl.textContent = `${currentIdx + 1} / ${slides.length}`;
    notesContent.innerHTML = `<p>${s.notes || 'Tidak ada catatan.'}</p>`;
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

  buildPipeline();
  goTo(0);
})();
