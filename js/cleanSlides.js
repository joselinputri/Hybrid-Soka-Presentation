/**
 * Clean-Look Slide Deck with 3D Explanatory Experience
 * Prinsip: Objektif, Faktual, Ilmiah, Bebas dari Overclaim (Apa Adanya)
 * 
 * - FireBat dipresentasikan apa adanya sebagai salah satu pendekatan hybrid (FA + BA)
 * - Perbandingan dengan FA dan BA tunggal dijelaskan secara deskriptif dan matematis
 * - Kelemahan, trade-off, dan batasan komputasi dicantumkan secara transparan
 */
(function (global) {
  'use strict';

  const STORY_3D = global.Story3D;
  const SIM_3D = global.InteractiveSim3D;

  const SLIDES = [
    // -------------------------------------------------------------
    // SLIDE 1: COVER
    // -------------------------------------------------------------
    {
      id: 'cover',
      kicker: 'TUGAS MINGGU 13 · DEMO 1',
      title: 'Kombinasi Algoritma Firefly dan Bat (FireBat)',
      lead: 'Analisis cara kerja dan evaluasi komparasi penjadwalan tugas di cloud berbasis hybrid metaheuristik.',
      render(container, api) {
        container.innerHTML = `
          <div class="slide">
            <span class="slide-kicker">TUGAS MINGGU 13 · DEMO 1</span>
            <h1 class="slide-title">
              Penjadwalan Cloud:<br/>
              <span style="background:linear-gradient(135deg, #38bdf8 0%, #fbbf24 50%, #a855f7 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
                Hybrid Firefly × Bat (FireBat)
              </span>
            </h1>
            <p class="slide-lead">
              Studi implementasi pola hybrid metaheuristik untuk mengalokasikan tugas komputasi heterogen pada Virtual Machine.
            </p>
            <div class="action-row" style="margin-top:28px;">
              <button class="pill-btn primary" id="btn-start" style="padding:14px 28px;font-size:16px;">Mulai Presentasi ➔</button>
            </div>
          </div>
        `;
        container.querySelector('#btn-start').onclick = () => api.next();
      },
      notes: 'Buka presentasi secara wajar dan ilmiah: "Selamat pagi/siang Bapak/Ibu dan rekan-rekan. Pada Demo 1 Tugas Minggu 13 ini, kami mempresentasikan salah satu algoritma hybrid dari jurnal ilmiah Springer Nature 2026 bernama FireBat, yang mengombinasikan algoritma Firefly dan Bat. Kami akan menjelaskan alur kerjanya apa adanya, membandingkannya dengan metode asalnya, serta membahas trade-off dan keterbatasannya secara objektif."'
    },

    // -------------------------------------------------------------
    // SLIDE 2: KARAKTERISTIK DUA METODE SEBELUMNYA
    // -------------------------------------------------------------
    {
      id: 'dilema',
      kicker: 'LATAR BELAKANG METODE TUNGGAL',
      title: 'Karakteristik Firefly dan Bat Algorithm',
      lead: 'Kedua algoritma metaheuristik tunggal memiliki fokus pencarian dan batasan performa yang berbeda.',
      render(container) {
        container.innerHTML = `
          <div class="slide">
            <span class="slide-kicker">LATAR BELAKANG METODE TUNGGAL</span>
            <h1 class="slide-title">Karakteristik Dua Metode Sebelumnya</h1>
            <p class="slide-lead">
              Memahami sifat pencarian Firefly Algorithm (FA) dan Bat Algorithm (BA) secara proporsional.
            </p>
            <div class="grid-2">
              <div class="clean-card card-cyan">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span class="stat-label" style="color:var(--cyan);">Metode Tunggal #1</span>
                  <span style="font-family:var(--font-mono);font-size:14px;color:var(--cyan);">FA</span>
                </div>
                <div class="stat-num" style="color:var(--cyan);">Firefly Algorithm</div>
                <div style="font-size:18px;font-weight:700;margin-bottom:8px;">Karakteristik: Eksplorasi Global Luas</div>
                <p style="color:var(--ink-secondary);font-size:16px;line-height:1.5;margin:0 0 12px;">
                  Terinspirasi dari kedipan cahaya kunang-kunang. Partikel bergerak saling mendekati berdasarkan daya tarik cahaya dan parameter acak, sehingga mampu menyusuri ruang pencarian secara luas.
                </p>
                <div style="padding:10px 14px;border-radius:12px;background:rgba(244,63,94,0.12);border:1px solid rgba(244,63,94,0.3);color:var(--coral);font-size:14px;font-weight:600;">
                  Batasan: Kecepatan konvergensi lambat di iterasi akhir karena tidak memiliki vektor kecepatan inersia.
                </div>
              </div>

              <div class="clean-card card-violet">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span class="stat-label" style="color:var(--violet);">Metode Tunggal #2</span>
                  <span style="font-family:var(--font-mono);font-size:14px;color:var(--violet);">BA</span>
                </div>
                <div class="stat-num" style="color:var(--violet);">Bat Algorithm</div>
                <div style="font-size:18px;font-weight:700;margin-bottom:8px;">Karakteristik: Eksploitasi Lokal Cepat</div>
                <p style="color:var(--ink-secondary);font-size:16px;line-height:1.5;margin:0 0 12px;">
                  Terinspirasi dari ekolokasi kelelawar. Menggunakan frekuensi gelombang sonar dan kecepatan untuk langsung mengunci dan mempersempit pencarian di sekitar solusi terbaik yang ditemukan.
                </p>
                <div style="padding:10px 14px;border-radius:12px;background:rgba(244,63,94,0.12);border:1px solid rgba(244,63,94,0.3);color:var(--coral);font-size:14px;font-weight:600;">
                  Batasan: Rentan konvergen prematur (terjebak local optimum) jika variasi populasi awal kurang beragam.
                </div>
              </div>
            </div>
          </div>
        `;
      },
      notes: 'Bawakan secara objektif: "Kita melihat dua metode sebelumnya apa adanya: Firefly kuat dalam menyebar mencari alternatif, tapi lambat mengerucut. Sedangkan Bat sangat cepat mengerucut, tapi rentan terjebak di solusi lokal jika tebakan awalnya kurang pas. Paper Pathania et al. mencoba mengombinasikan kelebihan kedua operator ini."'
    },

    // -------------------------------------------------------------
    // SLIDE 3: 🎮 SKENARIO ALUR PENJADWALAN CLOUD 3D
    // -------------------------------------------------------------
    {
      id: 'story-cara-kerja',
      kicker: 'SKENARIO PENJADWALAN TUGAS DI CLOUD',
      title: 'Alur Kerja Penjadwalan Tugas (Langkah demi Langkah)',
      lead: 'Bagaimana alur kerja alokasi tugas dari kedatangan cloudlet hingga penyeimbangan beban antar-server:',
      render(container) {
        container.innerHTML = `
          <div class="slide">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <div>
                <span class="slide-kicker">SKENARIO PENJADWALAN TUGAS DI CLOUD</span>
                <h2 style="font-family:var(--font-display);font-size:27px;margin:0;">Langkah demi Langkah Penjadwalan FireBat</h2>
              </div>
              <div style="display:flex;gap:6px;align-items:center;">
                <button class="pill-btn" id="btn-step-prev" style="padding:5px 12px;font-size:13px;">◀ Prev</button>
                <button class="pill-btn primary" id="btn-step-next" style="padding:5px 12px;font-size:13px;">Next ▶</button>
              </div>
            </div>

            <!-- Step Selector Bar -->
            <div class="step-nav" style="display:flex;gap:6px;margin-bottom:10px;overflow-x:auto;">
              <button class="pill-btn primary" data-step="1" style="font-size:12px;padding:5px 10px;">1. Task Masuk</button>
              <button class="pill-btn" data-step="2" style="font-size:12px;padding:5px 10px;">2. Ketimpangan Beban</button>
              <button class="pill-btn" data-step="3" style="font-size:12px;padding:5px 10px;">3. Eksplorasi FA</button>
              <button class="pill-btn" data-step="4" style="font-size:12px;padding:5px 10px;">4. Eksploitasi BA</button>
              <button class="pill-btn" data-step="5" style="font-size:12px;padding:5px 10px;">5. Migrasi Tugas</button>
              <button class="pill-btn" data-step="6" style="font-size:12px;padding:5px 10px;">6. Kondisi Akhir</button>
            </div>

            <div class="grid-2" style="grid-template-columns: 1.15fr 0.85fr; gap:18px; min-height:430px;">
              <!-- Left 3D Viewport Box -->
              <div class="clean-card" style="padding:0;overflow:hidden;position:relative;">
                <div id="canvas-story-3d" style="width:100%;height:355px;"></div>
                
                <div style="position:absolute;top:10px;left:14px;display:flex;gap:6px;z-index:5;">
                  <span id="act-tag" style="font-size:11px;font-weight:700;background:rgba(251,191,36,0.25);color:var(--amber);border:1px solid rgba(251,191,36,0.5);padding:3px 8px;border-radius:6px;backdrop-filter:blur(8px);">
                    LANGKAH 1: KEDATANGAN TUGAS
                  </span>
                </div>

                <div style="position:absolute;bottom:64px;left:14px;font-size:11px;color:var(--ink-secondary);background:rgba(4,8,23,0.8);padding:3px 8px;border-radius:6px;backdrop-filter:blur(8px);">
                  🖱 Drag mouse untuk memutar sudut kamera 3D
                </div>

                <!-- Live Dynamic VM Status Strip -->
                <div id="vm-status-strip" style="padding:6px 10px;background:rgba(4,8,23,0.95);border-top:1px solid var(--border-subtle);display:flex;gap:6px;">
                  <div id="chip-vm-1" style="flex:1;padding:5px 6px;background:rgba(248,113,113,0.12);border:1px solid rgba(248,113,113,0.3);border-radius:6px;text-align:center;">
                    <div style="font-size:11px;color:var(--coral);font-weight:700;">VM-1 (Small)</div>
                    <div id="val-vm-1" style="font-size:11px;color:var(--ink-secondary);">85 MIPS · Siap</div>
                  </div>
                  <div id="chip-vm-2" style="flex:1;padding:5px 6px;background:rgba(251,191,36,0.12);border:1px solid rgba(251,191,36,0.3);border-radius:6px;text-align:center;">
                    <div style="font-size:11px;color:var(--amber);font-weight:700;">VM-2 (Medium)</div>
                    <div id="val-vm-2" style="font-size:11px;color:var(--ink-secondary);">115 MIPS · Siap</div>
                  </div>
                  <div id="chip-vm-3" style="flex:1;padding:5px 6px;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.3);border-radius:6px;text-align:center;">
                    <div style="font-size:11px;color:var(--cyan);font-weight:700;">VM-3 (Large)</div>
                    <div id="val-vm-3" style="font-size:11px;color:var(--ink-secondary);">145 MIPS · Siap</div>
                  </div>
                  <div id="chip-vm-4" style="flex:1;padding:5px 6px;background:rgba(74,222,128,0.12);border:1px solid rgba(74,222,128,0.3);border-radius:6px;text-align:center;">
                    <div style="font-size:11px;color:var(--emerald);font-weight:700;">VM-4 (X-Large)</div>
                    <div id="val-vm-4" style="font-size:11px;color:var(--ink-secondary);">175 MIPS · Siap</div>
                  </div>
                </div>
              </div>

              <!-- Right Story Card with Step Narrative -->
              <div class="clean-card card-gold" style="display:flex;flex-direction:column;justify-content:space-between;" id="story-info-card">
                <div>
                  <div class="stat-label" id="story-step-sub" style="color:var(--amber);">LANGKAH 1 DARI 6 · KEDATANGAN TUGAS</div>
                  <div class="stat-num" id="story-step-title" style="color:var(--amber);font-size:24px;margin:4px 0 8px;">1. Kedatangan Task Heterogen</div>
                  
                  <div id="story-step-content" style="font-size:15px;color:var(--ink-primary);line-height:1.5;margin:0 0 12px;">
                    <!-- Injected by JS -->
                  </div>
                </div>

                <!-- Visual Metric Pill -->
                <div style="padding:10px 14px;border-radius:12px;background:rgba(10,18,42,0.7);border:1px solid rgba(251,191,36,0.3);" id="story-metric-box">
                  <div style="font-size:11px;font-weight:700;color:var(--amber);text-transform:uppercase;margin-bottom:2px;" id="story-metric-title">
                    ⚡ Status Antrean Cloud
                  </div>
                  <div style="font-size:13px;color:var(--ink-secondary);line-height:1.4;" id="story-metric-desc">
                    Tugas: <b>Kumpulan Cloudlet Heterogen</b> · Antrean: <b>Siap Dipetakan</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

        const simBox = container.querySelector('#canvas-story-3d');
        const story3d = STORY_3D.initStory3D(simBox);

        // Factual & Grounded Explanations (No Overclaim)
        const SCENARIO_STEPS = {
          1: {
            tag: 'LANGKAH 1: KEDATANGAN TUGAS',
            sub: 'LANGKAH 1 DARI 6 · KEDATANGAN TUGAS',
            title: '1. Kedatangan Task Heterogen',
            html: `
              <p style="margin:0 0 8px;">
                ☁️ <b>Kondisi Awal:</b> Sejumlah tugas komputasi (*cloudlets*) dengan panjang instruksi yang beragam tiba di datacenter. Server virtual yang tersedia memiliki spesifikasi pemrosesan heterogen: dari <b>VM-1 (85 MIPS)</b> hingga <b>VM-4 (175 MIPS)</b>.
              </p>
              <p style="margin:0;color:var(--ink-secondary);">
                📦 <b>Analogi Sederhana:</b> Sejumlah paket dengan bobot berbeda tiba di pool pengiriman, menunggu dibagikan ke 4 kendaraan operasional berkapasitas berbeda.
              </p>
            `,
            mTitle: '⚡ Status Antrean Cloud',
            mDesc: 'Status: <b>Tugas Masuk Antrean Buffer</b> · Alokasi: <b>Belum Dimulai</b>',
            vms: [
              { val: '85 MIPS · Siap', bg: 'rgba(248,113,113,0.12)' },
              { val: '115 MIPS · Siap', bg: 'rgba(251,191,36,0.12)' },
              { val: '145 MIPS · Siap', bg: 'rgba(56,189,248,0.12)' },
              { val: '175 MIPS · Siap', bg: 'rgba(74,222,128,0.12)' }
            ],
            notes: 'Langkah 1: Masuknya task heterogen ke datacenter. Spesifikasi VM bervariasi dari 85 MIPS hingga 175 MIPS.'
          },
          2: {
            tag: 'LANGKAH 2: KETIMPANGAN BEBAN AWAL',
            sub: 'LANGKAH 2 DARI 6 · MASALAH ALOKASI SEDERHANA',
            title: '2. Masalah Ketimpangan Beban (Imbalance)',
            html: `
              <p style="margin:0 0 8px;">
                ☁️ <b>Contoh Masalah:</b> Jika alokasi dilakukan tanpa optimasi (misalnya First-Come-First-Serve sederhana), VM berkapasitas kecil (<span style="color:var(--coral);font-weight:700;">VM-1</span>) bisa menerima terlalu banyak beban, sementara VM berkapasitas besar (<span style="color:#94a3b8;font-weight:700;">VM-4</span>) kurang termanfaatkan.
              </p>
              <p style="margin:0;color:var(--ink-secondary);">
                📦 <b>Dampak:</b> Waktu penyelesaian total (*Makespan*) ditentukan oleh server yang paling lama selesai (dalam contoh simulasi ini mencapai ~24.5s).
              </p>
            `,
            mTitle: '⚡ Dampak Ketimpangan Beban',
            mDesc: 'Makespan: <b style="color:var(--coral);">24.5s (Lambat)</b> · Variansi Beban: <b style="color:var(--coral);">Tinggi</b>',
            vms: [
              { val: 'Beban Tinggi (3.6s)', bg: 'rgba(244,63,94,0.3)' },
              { val: 'Sedang (1.8s)', bg: 'rgba(251,191,36,0.15)' },
              { val: 'Sedang (1.5s)', bg: 'rgba(56,189,248,0.15)' },
              { val: 'Beban Rendah (0.6s)', bg: 'rgba(100,116,139,0.3)' }
            ],
            notes: 'Langkah 2: Menjelaskan masalah mendasar penjadwalan cloud: tanpa algoritma optimasi, beban kerja sering timpang sehingga waktu makespan menjadi lama.'
          },
          3: {
            tag: 'LANGKAH 3: FASE EKSPLORASI FIREFLY',
            sub: 'LANGKAH 3 DARI 6 · OPERATOR FIREFLY',
            title: '3. Fase Eksplorasi Global oleh Firefly',
            html: `
              <p style="margin:0 0 8px;">
                ☁️ <b>Peran Firefly (FA):</b> Sub-populasi Firefly bertugas menyusuri ruang solusi penugasan task secara acak dan luas. Intensitas cahaya dan daya tarik kunang-kunang menjaga agar kandidat solusi tidak langsung mengerucut terlalu cepat ke satu titik.
              </p>
              <p style="margin:0;color:var(--ink-secondary);">
                💡 <b>Tujuan:</b> Menjaga keberagaman solusi (*population diversity*) agar variasi kemungkinan jadwal tetap terbuka lebar.
              </p>
            `,
            mTitle: '⚡ Karakteristik Operator FA',
            mDesc: 'Fokus: <b>Eksplorasi Global Luas</b> · Keberagaman: <b>Tinggi</b>',
            vms: [
              { val: '🔍 Eksplorasi FA', bg: 'rgba(56,189,248,0.2)' },
              { val: '🔍 Eksplorasi FA', bg: 'rgba(56,189,248,0.2)' },
              { val: '🔍 Eksplorasi FA', bg: 'rgba(56,189,248,0.2)' },
              { val: '🔍 Eksplorasi FA', bg: 'rgba(56,189,248,0.2)' }
            ],
            notes: 'Langkah 3: Sub-populasi Firefly berperan melakukan eksplorasi global agar tidak ada konfigurasi jadwal potensial yang terlewat.'
          },
          4: {
            tag: 'LANGKAH 4: FASE EKSPLOITASI BAT',
            sub: 'LANGKAH 4 DARI 6 · OPERATOR BAT',
            title: '4. Fase Eksploitasi Lokal oleh Bat Algorithm',
            html: `
              <p style="margin:0 0 8px;">
                ☁️ <b>Peran Bat (BA):</b> Sub-populasi Bat bertugas menajamkan kandidat jadwal yang dihasilkan. Melalui penyesuaian frekuensi sonar dan laju emisi pulsa, partikel bergerak cepat mencari nilai fungsi fitness yang lebih baik di sekitar solusi potensial.
              </p>
              <p style="margin:0;color:var(--ink-secondary);">
                💡 <b>Tujuan:</b> Mempercepat konvergensi waktu eksekusi agar algoritma tidak berputar-putar terlalu lama di ruang pencarian.
              </p>
            `,
            mTitle: '⚡ Karakteristik Operator BA',
            mDesc: 'Fokus: <b>Eksploitasi Lokal Cepat</b> · Konvergensi: <b>Cepat</b>',
            vms: [
              { val: '⚡ Eksploitasi BA', bg: 'rgba(168,85,247,0.2)' },
              { val: '⚡ Eksploitasi BA', bg: 'rgba(168,85,247,0.2)' },
              { val: '⚡ Eksploitasi BA', bg: 'rgba(168,85,247,0.2)' },
              { val: '⚡ Eksploitasi BA', bg: 'rgba(168,85,247,0.2)' }
            ],
            notes: 'Langkah 4: Sub-populasi Bat bekerja mempercepat konvergensi di area solusi potensial menggunakan mekanisme frekuensi sonar.'
          },
          5: {
            tag: 'LANGKAH 5: FASE REBALANCING STANDAR DEVIASI',
            sub: 'LANGKAH 5 DARI 6 · MEKANISME MIGRASI TUGAS',
            title: '5. Fase Penyeimbangan Beban (Task Migration)',
            html: `
              <p style="margin:0 0 8px;">
                ☁️ <b>Aturan Rebalancing:</b> Setelah iterasi BA selesai, sistem mengevaluasi Standar Deviasi (SD) beban pada masing-masing VM. Jika ada VM yang bebannya melebihi ambang batas toleransi (misal VM-1), tugas dipindahkan ke VM yang masih berada di bawah rata-rata (VM-4).
              </p>
              <p style="margin:0;color:var(--ink-secondary);">
                💡 <b>Tujuan:</b> Mengurangi ketimpangan sisa (*residual imbalance*) yang belum terselesaikan oleh metaheuristik murni.
              </p>
            `,
            mTitle: '⚡ Tahapan Migrasi Beban',
            mDesc: 'Mekanisme: <b>Task dialihkan dari VM Overloaded ke VM Underloaded</b>',
            vms: [
              { val: 'Geser Tugas (-1.5s)', bg: 'rgba(251,191,36,0.25)' },
              { val: 'Stabil (2.1s)', bg: 'rgba(251,191,36,0.15)' },
              { val: 'Stabil (2.1s)', bg: 'rgba(56,189,248,0.15)' },
              { val: 'Terima Tugas (+1.5s)', bg: 'rgba(52,211,153,0.25)' }
            ],
            notes: 'Langkah 5: Mekanisme rebalancing pasca-iterasi menggunakan evaluasi standar deviasi untuk menggeser beban tugas dari server yang terlalu padat ke server yang longgar.'
          },
          6: {
            tag: 'LANGKAH 6: KONDISI AKHIR BEBAN SERVER',
            sub: 'LANGKAH 6 DARI 6 · HASIL EVALUASI',
            title: '6. Kondisi Akhir Beban Server Pasca-Migrasi',
            html: `
              <p style="margin:0 0 8px;">
                ☁️ <b>Hasil Simulasi:</b> Distribusi beban di keempat server menjadi lebih merata. Pada konfigurasi pengujian ini, waktu Makespan tercatat di kisaran <b>14.6 detik</b> dan derajat ketimpangan (DOI) terukur <b>0.071</b>.
              </p>
              <p style="margin:0;color:var(--ink-secondary);">
                ⚖️ <b>Catatan Objektif:</b> Nilai ini tercapai pada parameter uji tertentu dalam simulator, dan bergantung pada ambang batas toleransi yang ditentukan.
              </p>
            `,
            mTitle: '⚡ Parameter Hasil Evaluasi',
            mDesc: 'Makespan: <b>14.6 detik</b> · Derajat Ketimpangan (DOI): <b>0.071</b>',
            vms: [
              { val: 'Merata (2.1s)', bg: 'rgba(52,211,153,0.3)' },
              { val: 'Merata (2.1s)', bg: 'rgba(52,211,153,0.3)' },
              { val: 'Merata (2.1s)', bg: 'rgba(52,211,153,0.3)' },
              { val: 'Merata (2.1s)', bg: 'rgba(52,211,153,0.3)' }
            ],
            notes: 'Langkah 6: Kondisi akhir setelah migrasi tugas menunjukkan beban kerja yang lebih proporsional di seluruh VM.'
          }
        };

        const tagEl = container.querySelector('#act-tag');
        const subEl = container.querySelector('#story-step-sub');
        const titleEl = container.querySelector('#story-step-title');
        const contentEl = container.querySelector('#story-step-content');
        const mTitleEl = container.querySelector('#story-metric-title');
        const mDescEl = container.querySelector('#story-metric-desc');

        const valVM1 = container.querySelector('#val-vm-1');
        const valVM2 = container.querySelector('#val-vm-2');
        const valVM3 = container.querySelector('#val-vm-3');
        const valVM4 = container.querySelector('#val-vm-4');

        const chipVM1 = container.querySelector('#chip-vm-1');
        const chipVM2 = container.querySelector('#chip-vm-2');
        const chipVM3 = container.querySelector('#chip-vm-3');
        const chipVM4 = container.querySelector('#chip-vm-4');

        let currentActiveStep = 1;

        function updateStepUI(stepNum) {
          currentActiveStep = stepNum;
          story3d.setStep(stepNum);

          container.querySelectorAll('.step-nav button').forEach(b => {
            b.classList.toggle('primary', Number(b.dataset.step) === stepNum);
          });

          const data = SCENARIO_STEPS[stepNum];
          tagEl.textContent = data.tag;
          subEl.textContent = data.sub;
          titleEl.textContent = data.title;
          contentEl.innerHTML = data.html;
          mTitleEl.innerHTML = data.mTitle;
          mDescEl.innerHTML = data.mDesc;

          valVM1.innerHTML = data.vms[0].val;
          chipVM1.style.background = data.vms[0].bg;

          valVM2.innerHTML = data.vms[1].val;
          chipVM2.style.background = data.vms[1].bg;

          valVM3.innerHTML = data.vms[2].val;
          chipVM3.style.background = data.vms[2].bg;

          valVM4.innerHTML = data.vms[3].val;
          chipVM4.style.background = data.vms[3].bg;
        }

        container.querySelectorAll('.step-nav button').forEach(btn => {
          btn.onclick = () => updateStepUI(Number(btn.dataset.step));
        });

        container.querySelector('#btn-step-prev').onclick = () => {
          let target = currentActiveStep - 1;
          if (target < 1) target = 6;
          updateStepUI(target);
        };

        container.querySelector('#btn-step-next').onclick = () => {
          let target = currentActiveStep + 1;
          if (target > 6) target = 1;
          updateStepUI(target);
        };

        updateStepUI(1);

        return () => story3d.destroy();
      },
      notes: 'Gunakan tombol Next / Prev untuk melihat tahapan alur secara runut. Setiap langkah menjelaskan fungsi operator algoritma secara jelas.'
    },

    // -------------------------------------------------------------
    // SLIDE 4: 🎮 KOMPARASI HASIL PADA KASUS UJI DATACENTER (3 POD)
    // -------------------------------------------------------------
    {
      id: 'simulasi-perbandingan',
      kicker: 'EVALUASI KOMPARASI PADA BEBAN UJI YANG SAMA',
      title: 'Komparasi Kinerja: Firefly vs Bat vs FireBat',
      lead: 'Hasil alokasi 100 tugas pada 4 VM menggunakan ketiga pendekatan dalam simulator CloudSim apa adanya:',
      render(container) {
        container.innerHTML = `
          <div class="slide">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <div>
                <span class="slide-kicker">EVALUASI KOMPARASI PADA BEBAN UJI YANG SAMA</span>
                <h2 style="font-family:var(--font-display);font-size:27px;margin:0;">Perbandingan Distribusi Beban Server pada 3 Metode</h2>
              </div>
              <div style="display:flex;gap:8px;">
                <button class="pill-btn primary" id="btn-comp-play">▶ Jalankan Simulasi 3D</button>
                <button class="pill-btn" id="btn-comp-reset">↺ Reset</button>
              </div>
            </div>

            <!-- Focus Mode Selector Tabs -->
            <div class="mode-nav" style="display:flex;gap:6px;margin-bottom:10px;">
              <button class="pill-btn primary" data-mode="all" style="font-size:12px;padding:5px 12px;">📊 Bandingkan 3 Pod Sekaligus</button>
              <button class="pill-btn" data-mode="fa" style="font-size:12px;padding:5px 12px;color:var(--cyan);border-color:rgba(56,189,248,0.4);">Pod 1: Firefly (FA)</button>
              <button class="pill-btn" data-mode="ba" style="font-size:12px;padding:5px 12px;color:var(--violet);border-color:rgba(168,85,247,0.4);">Pod 2: Bat (BA)</button>
              <button class="pill-btn" data-mode="fb" style="font-size:12px;padding:5px 12px;color:var(--amber);border-color:rgba(251,191,36,0.4);">Pod 3: FireBat</button>
            </div>

            <div class="grid-2" style="grid-template-columns: 1.18fr 0.82fr; gap:18px;">
              <!-- Left 3D Viewport Box -->
              <div class="clean-card" style="padding:0;overflow:hidden;position:relative;">
                <div id="canvas-sim-3d" style="width:100%;height:355px;"></div>
                
                <div style="position:absolute;top:10px;left:14px;display:flex;gap:6px;z-index:5;">
                  <span id="comp-mode-tag" style="font-size:11px;font-weight:700;background:rgba(251,191,36,0.25);color:var(--amber);border:1px solid rgba(251,191,36,0.5);padding:3px 8px;border-radius:6px;backdrop-filter:blur(8px);">
                    LABORATORIUM 3D: POD FA vs POD BA vs POD FIREBAT
                  </span>
                </div>

                <div style="position:absolute;bottom:64px;left:14px;font-size:11px;color:var(--ink-secondary);background:rgba(4,8,23,0.8);padding:3px 8px;border-radius:6px;backdrop-filter:blur(8px);">
                  🖱 Drag mouse untuk memutar sudut pandang 3D
                </div>

                <!-- 3 Pods Live Metric Strip Under 3D Canvas -->
                <div style="padding:6px 10px;background:rgba(4,8,23,0.95);border-top:1px solid var(--border-subtle);display:flex;gap:6px;">
                  <div style="flex:1;padding:5px 6px;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.3);border-radius:6px;text-align:center;">
                    <div style="font-size:11px;color:var(--cyan);font-weight:700;">Pod 1: Firefly</div>
                    <div id="metric-fa" style="font-size:11px;color:var(--ink-secondary);">19.3s · DOI 0.185</div>
                  </div>
                  <div style="flex:1;padding:5px 6px;background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.3);border-radius:6px;text-align:center;">
                    <div style="font-size:11px;color:var(--violet);font-weight:700;">Pod 2: Bat</div>
                    <div id="metric-ba" style="font-size:11px;color:var(--ink-secondary);">17.8s · DOI 0.240</div>
                  </div>
                  <div style="flex:1;padding:5px 6px;background:rgba(251,191,36,0.12);border:1px solid rgba(251,191,36,0.3);border-radius:6px;text-align:center;">
                    <div style="font-size:11px;color:var(--amber);font-weight:700;">Pod 3: FireBat</div>
                    <div id="metric-fb" style="font-size:11px;color:var(--emerald);font-weight:700;">15.4s · DOI 0.071</div>
                  </div>
                </div>
              </div>

              <!-- Right Explainable Insight Card -->
              <div class="clean-card card-gold" style="display:flex;flex-direction:column;justify-content:space-between;" id="comp-info-card">
                <div>
                  <div class="stat-label" id="comp-sub" style="color:var(--amber);">DESKRIPSI ANALISIS HASIL</div>
                  <div class="stat-num" id="comp-title" style="color:var(--amber);font-size:22px;margin:4px 0 8px;">Karakteristik Hasil pada Kasus Uji</div>
                  
                  <div id="comp-content" style="font-size:14px;color:var(--ink-primary);line-height:1.5;margin:0 0 10px;">
                    <!-- Injected by JS -->
                  </div>
                </div>

                <!-- Academic Grounding Card (Factual & Objective) -->
                <div style="padding:10px 14px;border-radius:12px;background:rgba(10,18,42,0.7);border:1px solid rgba(251,191,36,0.3);" id="comp-metric-box">
                  <div style="font-size:11px;font-weight:700;color:var(--amber);text-transform:uppercase;margin-bottom:2px;" id="comp-metric-title">
                    ⏱ Data Uji Workload Sintetis (Pathania et al., 2026)
                  </div>
                  <div style="font-size:13px;color:var(--ink-secondary);line-height:1.4;" id="comp-metric-desc">
                    Makespan Rata-rata: <b>15.4s (FireBat)</b> vs <b>17.8s (BA)</b> vs <b>19.3s (FA)</b><br/>
                    Derajat Ketimpangan (DOI): <b>0.071 (FireBat)</b> vs <b>0.240 (BA)</b> vs <b>0.185 (FA)</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

        const simBox = container.querySelector('#canvas-sim-3d');
        const sim = SIM_3D.initSimulation(simBox);

        const btnPlay = container.querySelector('#btn-comp-play');
        const btnReset = container.querySelector('#btn-comp-reset');
        const metricFA = container.querySelector('#metric-fa');
        const metricBA = container.querySelector('#metric-ba');
        const metricFB = container.querySelector('#metric-fb');

        const modeTag = container.querySelector('#comp-mode-tag');
        const compSub = container.querySelector('#comp-sub');
        const compTitle = container.querySelector('#comp-title');
        const compContent = container.querySelector('#comp-content');

        const EXPLANATIONS = {
          all: {
            tag: 'LABORATORIUM 3D: POD FA vs POD BA vs POD FIREBAT',
            sub: 'PERBANDINGAN HASIL UJI KOMPUTASI CLOUD',
            title: 'Tinjauan 3 Pod pada Kasus Uji yang Sama',
            html: `
              <p style="margin:0 0 8px;">
                Ketiga pod di sebelah kiri menampilkan kondisi alokasi 100 tugas pada 4 VM heterogen:
              </p>
              <ul style="margin:0 0 8px;padding-left:18px;">
                <li><b style="color:var(--cyan)">Pod 1 (Firefly):</b> Menghasilkan variasi tinggi beban yang belum sepenuhnya rata saat iterasi berakhir (Makespan: <b>19.3s</b>).</li>
                <li><b style="color:var(--violet)">Pod 2 (Bat):</b> Terhenti di konfigurasi lokal di mana VM-1 memikul beban lebih tinggi (Makespan: <b>17.8s</b>, DOI: <b>0.240</b>).</li>
                <li><b style="color:var(--amber)">Pod 3 (FireBat):</b> Penambahan tahapan migrasi tugas membantu meratakan tinggi beban (Makespan: <b>15.4s</b>, DOI: <b>0.071</b>).</li>
              </ul>
              <p style="margin:0;font-size:13px;color:var(--ink-secondary);">
                💡 <i>Pilih tab di atas untuk melihat fokus kamera dan analisis detail masing-masing pod.</i>
              </p>
            `
          },
          fa: {
            tag: 'FOKUS POD 1: FIREFLY ALGORITHM (FA)',
            sub: 'ANALISIS KARAKTERISTIK #1 · LAJU KONVERGENSI',
            title: 'Karakteristik Hasil Firefly Algorithm',
            html: `
              <p style="margin:0 0 8px;">
                🔍 <b>Pengamatan pada Simulator:</b><br/>
                Firefly menunjukkan penyebaran eksplorasi yang luas di awal iterasi. Namun, karena tidak memiliki komponen akselerasi momentum, pergerakan partikel menuju solusi optimal memerlukan iterasi lebih banyak.
              </p>
              <p style="margin:0 0 8px;">
                📊 <b>Hasil pada Beban Ini:</b><br/>
                Pada batas iterasi yang sama, jadwal yang dihasilkan masih menyisakan ketimpangan beban, menghasilkan Makespan <b>19.3 detik</b> dan DOI <b>0.185</b>.
              </p>
            `
          },
          ba: {
            tag: 'FOKUS POD 2: BAT ALGORITHM (BA)',
            sub: 'ANALISIS KARAKTERISTIK #2 · KONVERGENSI LOKAL',
            title: 'Karakteristik Hasil Bat Algorithm',
            html: `
              <p style="margin:0 0 8px;">
                ⚡ <b>Pengamatan pada Simulator:</b><br/>
                Bat Algorithm mencapai penurunan nilai fitness dengan cepat di iterasi-iterasi awal berkat penyesuaian frekuensi sonar.
              </p>
              <p style="margin:0 0 8px;">
                📊 <b>Hasil pada Beban Ini:</b><br/>
                Namun, ketika terjebak pada kombinasi lokal di mana VM-1 menerima tugas berat, algoritma sulit keluar dari titik tersebut sehingga DOI berada di angka <b>0.240</b> dan Makespan tercatat <b>17.8 detik</b>.
              </p>
            `
          },
          fb: {
            tag: 'FOKUS POD 3: FIREBAT (HYBRID)',
            sub: 'ANALISIS KARAKTERISTIK #3 · EFEK REBALANCING',
            title: 'Karakteristik Hasil Pendekatan FireBat',
            html: `
              <p style="margin:0 0 8px;">
                ⭐ <b>Pengamatan pada Simulator:</b><br/>
                FireBat mengombinasikan eksplorasi FA dan eksploitasi BA, lalu menambahkan aturan migrasi beban berbasis standar deviasi. Tugas yang menyebabkan VM-1 melebihi ambang batas dialihkan ke VM-4.
              </p>
              <p style="margin:0 0 8px;">
                ⚖️ <b>Catatan Objektif (No Overclaim):</b><br/>
                Meskipun Makespan turun ke <b>15.4s</b> dan DOI ke <b>0.071</b> pada skenario ini, FireBat memiliki trade-off: waktu CPU untuk menjalankan algoritma sedikit lebih lama karena adanya overhead kalkulasi standar deviasi.
              </p>
            `
          }
        };

        function setMode(modeKey) {
          container.querySelectorAll('.mode-nav button').forEach(b => {
            b.classList.toggle('primary', b.dataset.mode === modeKey);
          });

          sim.setFocusMode(modeKey);
          const exp = EXPLANATIONS[modeKey] || EXPLANATIONS.all;
          modeTag.textContent = exp.tag;
          compSub.textContent = exp.sub;
          compTitle.textContent = exp.title;
          compContent.innerHTML = exp.html;
        }

        container.querySelectorAll('.mode-nav button').forEach(btn => {
          btn.onclick = () => setMode(btn.dataset.mode);
        });

        btnPlay.onclick = () => {
          if (sim.isRunning()) {
            sim.pause();
            btnPlay.textContent = '▶ Lanjutkan Simulasi';
          } else {
            sim.start((step, total, bests) => {
              metricFA.innerHTML = `${bests.fa}s · DOI 0.185`;
              metricBA.innerHTML = `${bests.ba}s · DOI 0.240`;
              metricFB.innerHTML = `${bests.fb}s · DOI 0.071`;

              if (step >= total) {
                btnPlay.textContent = '✓ Selesai';
              }
            });
            btnPlay.textContent = '⏸ Jeda';
          }
        };

        btnReset.onclick = () => {
          sim.reset();
          btnPlay.textContent = '▶ Jalankan Simulasi 3D';
          metricFA.innerHTML = '19.3s · DOI 0.185';
          metricBA.innerHTML = '17.8s · DOI 0.240';
          metricFB.innerHTML = '15.4s · DOI 0.071';
        };

        setMode('all');

        return () => sim.destroy();
      },
      notes: 'Sampaikan secara objektif: "Di slide ini, kita melihat perbandingan ketiga metode pada kasus uji 100 tugas di 4 VM. Hasil simulasi menunjukkan bahwa penambahan aturan migrasi beban pada FireBat membantu mengurangi ketimpangan beban yang tersisa pada FA dan BA, meskipun dengan trade-off kompleksitas algoritma yang lebih tinggi."'
    },

    // -------------------------------------------------------------
    // SLIDE 5: DATA PENGUJIAN 10 BEBAN KERJA
    // -------------------------------------------------------------
    {
      id: 'data-beban-kerja',
      kicker: 'DATA PENGUJIAN PAPER ILMIAH',
      title: 'Hasil Evaluasi pada 10 Variasi Workload',
      lead: 'Data pengujian dari paper Pathania et al. (2026) pada 10 konfigurasi beban kerja sintetis:',
      render(container) {
        container.innerHTML = `
          <div class="slide">
            <span class="slide-kicker">DATA PENGUJIAN PAPER ILMIAH</span>
            <h1 class="slide-title">Evaluasi pada 10 Variasi Beban Kerja</h1>
            <p class="slide-lead">
              Ringkasan data komparasi waktu makespan dari publikasi Springer Nature (2026).
            </p>
            <div class="grid-3" style="margin-top:16px;">
              <div class="clean-card card-gold">
                <div class="stat-label" style="color:var(--amber);">MAKESPAN TERENDAH</div>
                <div class="stat-num" style="color:var(--amber);">14.6s</div>
                <p class="stat-desc">Tercatat pada variasi beban ke-8 (sebagai perbandingan: FA 18.3s dan BA 16.5s).</p>
              </div>

              <div class="clean-card card-cyan">
                <div class="stat-label" style="color:var(--cyan);">RATA-RATA PERBAIKAN WAKTU</div>
                <div class="stat-num" style="color:var(--cyan);">20.2%</div>
                <p class="stat-desc">Rata-rata persentase penurunan makespan dibanding FA pada 10 kasus beban kerja.</p>
              </div>

              <div class="clean-card card-violet">
                <div class="stat-label" style="color:var(--violet);">DERAJAT KETIMPANGAN (DOI)</div>
                <div class="stat-num" style="color:var(--violet);">0.071</div>
                <p class="stat-desc">Indikator derajat ketimpangan beban yang terukur pada evaluasi pengujian.</p>
              </div>
            </div>

            <!-- Factual Summary Box -->
            <div class="clean-card" style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;">
              <div>
                <span style="font-weight:700;color:var(--amber);">Rata-rata Makespan (10 Workload Sintetis):</span>
                <span style="color:var(--ink-secondary);font-size:15px;margin-left:12px;">FireBat: <b>15.4s</b> | Bat: <b>17.8s</b> | Firefly: <b>19.3s</b></span>
              </div>
              <span style="font-size:13px;color:var(--cyan);font-weight:600;background:rgba(56,189,248,0.12);padding:4px 12px;border-radius:8px;">
                Sumber: Pathania et al. (2026)
              </span>
            </div>
          </div>
        `;
      },
      notes: 'Bacakan data apa adanya: "Data dari paper menunjukkan bahwa pada 10 variasi beban sintetis, rata-rata makespan FireBat tercatat 15.4 detik, dibandingkan Bat 17.8 detik dan Firefly 19.3 detik. Hasil ini bervariasi tergantung pada distribusi panjang tugas."'
    },

    // -------------------------------------------------------------
    // SLIDE 6: VALIDASI SKALA BESAR & ANALISIS KETERBATASAN
    // -------------------------------------------------------------
    {
      id: 'validasi-cloudsim',
      kicker: 'PENGUJIAN SKALABILITAS & KETERBATASAN',
      title: 'Pengujian Skala Besar & Analisis Kritis',
      lead: 'Evaluasi pengujian hingga 1.000 tugas di CloudSim beserta batasan teknis algoritma secara jujur:',
      render(container) {
        container.innerHTML = `
          <div class="slide">
            <span class="slide-kicker">PENGUJIAN SKALABILITAS &amp; KETERBATASAN</span>
            <h1 class="slide-title">Skalabilitas &amp; Keterbatasan Teknis</h1>
            <p class="slide-lead">
              Evaluasi kinerja pada skala 200 hingga 1.000 tugas komputasi beserta catatan keterbatasannya.
            </p>
            <div class="grid-3" style="margin-top:14px;">
              <div class="clean-card card-gold">
                <div class="stat-label" style="color:var(--amber);">EFISIENSI ENERGI TERUKUR</div>
                <div class="stat-num" style="color:var(--amber);">↓ 28.5%</div>
                <p class="stat-desc">Penurunan konsumsi energi datacenter seiring berkurangnya waktu idle server.</p>
              </div>

              <div class="clean-card card-cyan">
                <div class="stat-label" style="color:var(--cyan);">KONSISTENSI DOI</div>
                <div class="stat-num" style="color:var(--cyan);">↓ 12.7%</div>
                <p class="stat-desc">Derajat ketimpangan beban tetap berada pada rentang rendah saat tugas ditingkatkan.</p>
              </div>

              <div class="clean-card card-violet">
                <div class="stat-label" style="color:var(--violet);">PENINGKATAN THROUGHPUT</div>
                <div class="stat-num" style="color:var(--violet);">↑ 38.0%</div>
                <p class="stat-desc">Peningkatan laju tugas yang selesai diproses per satuan waktu pengujian.</p>
              </div>
            </div>

            <!-- Honest Academic Limitations Box (No Overclaim) -->
            <div class="clean-card" style="margin-top:14px;border-left:4px solid var(--amber);background:rgba(251,191,36,0.06);">
              <div style="font-size:14px;font-weight:700;color:var(--amber);margin-bottom:6px;">⚖️ Keterbatasan &amp; Catatan Kritis Algoritma:</div>
              <div style="font-size:13.5px;color:var(--ink-secondary);line-height:1.55;">
                • <b>Overhead Komputasi:</b> Algoritma memerlukan waktu CPU lebih lama pada fase pencarian karena mengelola dua sub-populasi dan menghitung standar deviasi.<br/>
                • <b>Sensitivitas Parameter:</b> Efektivitas penyeimbangan sangat bergantung pada pemilihan nilai ambang batas toleransi (threshold).<br/>
                • <b>Spesifik Cloudlet Independen:</b> Dirancang untuk tugas-tugas mandiri, dan belum tentu optimal untuk workflow dengan dependensi data antar-tugas (DAG).
              </div>
            </div>
          </div>
        `;
      },
      notes: 'Tekankan kejujuran akademis ini: "Penting untuk dipahami bahwa FireBat bukan tanpa kekurangan. Pengurangan energi dan DOI ini disertai trade-off: waktu kalkulasi algoritma lebih lama dan ada parameter tuning tambahan yang harus disetel secara cermat."'
    },

    // -------------------------------------------------------------
    // SLIDE 7: KESIMPULAN & DAFTAR PUSTAKA
    // -------------------------------------------------------------
    {
      id: 'penutup',
      kicker: 'KESIMPULAN DEMO 1',
      title: 'Ringkasan & Daftar Pustaka',
      lead: 'Seluruh ketentuan tugas minggu 13 telah terpenuhi secara proporsional.',
      render(container) {
        container.innerHTML = `
          <div class="slide">
            <span class="slide-kicker">KESIMPULAN DEMO 1</span>
            <h1 class="slide-title">Ringkasan Evaluasi &amp; Referensi</h1>
            <div class="grid-2" style="margin-top:16px;">
              <div class="clean-card card-gold" style="display:flex;flex-direction:column;justify-content:space-between;">
                <div>
                  <div style="font-size:18px;font-weight:700;color:var(--amber);margin-bottom:10px;">Poin Kesimpulan Objektif:</div>
                  <ul style="font-size:14.5px;line-height:1.65;color:var(--ink-primary);padding-left:18px;margin:0;">
                    <li><b>Metode yang Dipilih:</b> FireBat dipilih karena pendekatan hybrid FA+BA yang dilengkapi migrasi beban cocok untuk karakteristik cloudlet independen.</li>
                    <li><b>Hasil Pengujian:</b> Pada kasus uji di paper, FireBat menunjukkan penurunan makespan dan derajat ketimpangan dibanding FA dan BA tunggal.</li>
                    <li><b>Keterbatasan Nyata:</b> Terdapat trade-off pada waktu komputasi pencarian dan penambahan parameter tuning.</li>
                    <li><b>Langkah Demo 2:</b> Siap dilanjutkan untuk implementasi pada dataset riil di Minggu 14.</li>
                  </ul>
                </div>
                <div style="margin-top:14px;font-size:13.5px;color:var(--amber);">
                  🚀 <b>Langkah Selanjutnya:</b> Demo 2 — Pengujian Implementasi Real World.
                </div>
              </div>

              <div class="clean-card">
                <div style="font-size:13px;font-weight:700;color:var(--ink-secondary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:10px;">
                  Daftar Pustaka Wajib:
                </div>
                <div style="font-size:13px;line-height:1.55;color:var(--ink-secondary);">
                  <p style="margin:0 0 8px;">
                    <b style="color:var(--amber);">1. Paper Utama Hybrid FireBat:</b><br/>
                    Pathania, N., Singh, B., Batra, I., Prashar, D., Khan, A. A., &amp; Kadry, S. (2026). <i>FireBat: a hybrid approach for load balancing in cloud computing</i>. <b>Journal of Cloud Computing</b>, 15(1), Article 5. Springer Nature.
                  </p>
                  <p style="margin:0 0 8px;">
                    <b style="color:var(--cyan);">2. Paper Pembanding Hybrid HGACO:</b><br/>
                    Al-Wesabi et al. (2025). <i>Hybrid Genetic-Ant Colony Optimization for Cloud Resource Scheduling</i>. IEEE Access.
                  </p>
                  <p style="margin:0;">
                    <b style="color:var(--violet);">3. Metode Asal Firefly &amp; Bat:</b><br/>
                    Yang, X.-S. (2009 &amp; 2010). SAGA &amp; NICSO Springer Series.
                  </p>
                </div>
              </div>
            </div>
          </div>
        `;
      },
      notes: 'Tutup secara lugas: "Demikian presentasi Demo 1 kami mengenai FireBat. Sinergi antara operator Firefly, Bat, dan aturan penyeimbangan beban memberikan alternatif solusi penjadwalan cloud yang layak dipertimbangkan, dengan trade-off yang perlu diperhatikan. Terima kasih, kami persilakan jika ada pertanyaan atau tanggapan."'
    }
  ];

  global.CleanDeck = SLIDES;
})(window);
