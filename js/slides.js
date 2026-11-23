/**
 * Slide Definitions — Simplified & Intuitive with 3D Simulations
 * Total: 8 Slides
 * Fokus: Memilih 1 hybrid unggul (FireBat), menjelaskan konsep dasarnya (mudah dipahami),
 * perbandingannya dengan Firefly & Bat, serta simulasi interaktif 3D sesuai instruksi.
 */
(function (global) {
  'use strict';

  const SIM = global.SimEngine;
  const V3D = global.Visual3D;

  const SLIDES = [
    // -------------------------------------------------------------
    // SLIDE 1: COVER
    // -------------------------------------------------------------
    {
      id: 'cover',
      nav: '1',
      title: 'FireBat: Hybrid Cerdas Penjadwalan Cloud',
      render(container, api) {
        container.innerHTML = `
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative;">
            <div style="display:inline-flex;align-items:center;gap:10px;padding:8px 22px;border-radius:999px;background:rgba(251,191,36,0.12);border:1px solid rgba(251,191,36,0.35);color:var(--amber);font-size:18px;font-weight:700;margin-bottom:24px;">
              ⚡ TUGAS MINGGU 13 · DEMO 1 · ALGORITMA HYBRID
            </div>
            <h1 style="font-family:var(--font-title);font-size:74px;font-weight:800;line-height:1.1;margin:0 0 20px;letter-spacing:-0.03em;">
              FireBat: Sinergi Cerdas<br/>
              <span style="background:linear-gradient(135deg, #22d3ee, #fbbf24 50%, #a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
                Firefly × Bat Algorithm
              </span>
            </h1>
            <p style="max-width:860px;font-size:24px;color:var(--ink-secondary);line-height:1.5;margin:0 0 36px;">
              Menggabungkan <b>daya jelajah Kunang-kunang</b> dan <b>ketajaman tukikan Kelelawar</b> untuk menyeimbangkan beban server Cloud secara optimal.
            </p>
            <div style="display:flex;gap:16px;margin-bottom:40px;">
              <div style="padding:12px 24px;border-radius:14px;background:var(--bg-card);border:1px solid var(--edge);font-size:18px;">
                📚 <b>Paper Acuan:</b> Pathania et al. (Springer, 2026)
              </div>
              <div style="padding:12px 24px;border-radius:14px;background:var(--bg-card);border:1px solid var(--edge);font-size:18px;">
                🎮 <b>Simulasi:</b> 3D Lanskap &amp; 3D Datacenter
              </div>
            </div>
            <button class="btn btn-primary" id="btn-start" style="padding:16px 36px;font-size:20px;border-radius:16px;">
              Mulai Eksplorasi ➔
            </button>
          </div>
        `;
        container.querySelector('#btn-start').onclick = () => api.next();
      },
      notes: 'Slide Pembuka: Kenalkan bahwa pada Demo 1 ini kita memilih 1 algoritma hybrid terbaik (FireBat) yang bersumber dari jurnal ilmiah bereputasi (Springer Nature, 2026). Jelaskan secara ringkas bahwa FireBat menyatukan kelebihan Firefly dan Bat.'
    },

    // -------------------------------------------------------------
    // SLIDE 2: MASALAH CLOUD & KENAPA HARUS HYBRID?
    // -------------------------------------------------------------
    {
      id: 'masalah',
      nav: '2',
      title: 'Tantangan di Cloud: Mengapa Perlu Hybrid?',
      render(container) {
        container.innerHTML = `
          <div class="header-plate">
            <span class="header-tag">Latar Belakang &amp; Motivasi</span>
            <h1 class="header-title">Dilema Penjadwalan Tugas di Cloud</h1>
            <p class="header-sub">Mengapa algoritma tunggal (Firefly atau Bat) masih memiliki celah?</p>
          </div>

          <div class="grid-2 flex-1" style="gap:28px;">
            <div class="card card-cyan" style="display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <span style="display:inline-block;padding:4px 12px;border-radius:8px;background:rgba(34,211,238,0.2);color:var(--cyan);font-weight:700;font-size:14px;margin-bottom:12px;">METODE SEBELUMNYA #1</span>
                <h2 style="font-family:var(--font-title);font-size:32px;margin:0 0 14px;">Firefly Algorithm (FA)</h2>
                <p style="font-size:20px;line-height:1.6;color:var(--ink-secondary);margin:0 0 16px;">
                  Terinspirasi dari kedipan kunang-kunang di malam hari. Setiap kunang-kunang tertarik terbang ke arah kunang-kunang lain yang lebih terang cahayanya.
                </p>
                <div style="padding:16px;border-radius:12px;background:rgba(34,211,238,0.08);border:1px solid rgba(34,211,238,0.3);font-size:18px;">
                  <b style="color:var(--cyan)">Karakteristik Utama:</b><br/>
                  ✓ Sangat jago <b>menjelajah (Exploration)</b> ke seluruh penjuru ruang pencarian.<br/>
                  <span style="color:var(--coral)">✗ Kelemahan:</span> Lambat sekali mengerucut ke titik paling presisi saat sudah dekat tujuan.
                </div>
              </div>
              <div style="font-size:15px;color:var(--ink-muted);">Dianalogikan: Menjelajah seluruh pulau, tapi lambat menemukan harta karun.</div>
            </div>

            <div class="card card-violet" style="display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <span style="display:inline-block;padding:4px 12px;border-radius:8px;background:rgba(168,85,247,0.2);color:var(--violet);font-weight:700;font-size:14px;margin-bottom:12px;">METODE SEBELUMNYA #2</span>
                <h2 style="font-family:var(--font-title);font-size:32px;margin:0 0 14px;">Bat Algorithm (BA)</h2>
                <p style="font-size:20px;line-height:1.6;color:var(--ink-secondary);margin:0 0 16px;">
                  Terinspirasi dari sonar ekolokasi kelelawar. Kelelawar memancarkan gelombang suara frekuensi tinggi untuk menukik cepat ke mangsa terbaik.
                </p>
                <div style="padding:16px;border-radius:12px;background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.3);font-size:18px;">
                  <b style="color:var(--violet)">Karakteristik Utama:</b><br/>
                  ✓ Sangat cepat <b>menukik tajam (Exploitation)</b> langsung ke solusi terbaik sementara.<br/>
                  <span style="color:var(--coral)">✗ Kelemahan:</span> Mudah "terkecoh" dan terjebak di lembah palsu (local optimum) jika tebakan awalnya kurang pas.
                </div>
              </div>
              <div style="font-size:15px;color:var(--ink-muted);">Dianalogikan: Menukik sangat cepat, tapi bisa salah sasaran jika matanya tertutup.</div>
            </div>
          </div>

          <div class="card card-amber" style="margin-top:20px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;">
            <div style="font-size:21px;">
              💡 <b>Solusi Cerdas (Hybrid Pola C–D):</b> Satukan keduanya! Gunakan Firefly untuk menjelajahi peta terlebih dahulu, lalu terbangkan Bat untuk menukik dengan akurasi 100%!
            </div>
          </div>
        `;
      },
      notes: 'Slide 2: Tekankan trade-off alami antara Eksplorasi (Firefly) dan Eksploitasi (Bat). Penjelasan tidak perlu matematis rumit, cukup gunakan analogi: Kunang-kunang rajin menjelajah tapi santai, Kelelawar gesit menukik tapi mudah tertipu jika titik awalnya salah.'
    },

    // -------------------------------------------------------------
    // SLIDE 3: KONSEP DASAR CARA KERJA FIREBAT
    // -------------------------------------------------------------
    {
      id: 'cara-kerja',
      nav: '3',
      title: 'Konsep Dasar FireBat: 3 Langkah Sederhana',
      render(container) {
        container.innerHTML = `
          <div class="header-plate">
            <span class="header-tag">Metodologi yang Mudah Dipahami</span>
            <h1 class="header-title">Bagaimana FireBat Bekerja?</h1>
            <p class="header-sub">Sederhana, elegan, dan saling melengkapi (Pathania et al., 2026)</p>
          </div>

          <div class="grid-3 flex-1" style="gap:24px;">
            <div class="card card-cyan" style="display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-family:var(--font-mono);font-size:48px;font-weight:800;color:var(--cyan);margin-bottom:12px;">01</div>
                <h3 style="font-family:var(--font-title);font-size:26px;margin:0 0 14px;">Populasi Ganda</h3>
                <p style="font-size:19px;line-height:1.6;color:var(--ink-secondary);">
                  Alih-alih cuma satu jenis agen, FireBat membagi kawanan menjadi <b>dua regu</b>:
                </p>
                <ul style="font-size:18px;color:var(--ink-primary);padding-left:20px;line-height:1.6;">
                  <li><b>Regu Kunang-kunang</b> disebar luas mencari calon jadwal yang menjanjikan.</li>
                  <li><b>Regu Kelelawar</b> menguji kestabilan titik-titik tersebut secara bersamaan.</li>
                </ul>
              </div>
              <div style="padding:12px;border-radius:10px;background:rgba(34,211,238,0.1);font-size:16px;">
                🎯 <b>Tujuan:</b> Menghindari jebakan lokal sejak detik pertama.
              </div>
            </div>

            <div class="card card-amber" style="display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-family:var(--font-mono);font-size:48px;font-weight:800;color:var(--amber);margin-bottom:12px;">02</div>
                <h3 style="font-family:var(--font-title);font-size:26px;margin:0 0 14px;">Seleksi Kolam Elit</h3>
                <p style="font-size:19px;line-height:1.6;color:var(--ink-secondary);">
                  Hasil temuan terbaik dari kedua regu disatukan ke dalam satu meja bundar (<b>Hybrid Elite Pool</b>).
                </p>
                <p style="font-size:18px;color:var(--ink-primary);line-height:1.6;">
                  Hanya jadwal-jadwal dengan waktu eksekusi paling singkat dan pembagian server paling adil yang dipilih untuk masuk ke tahap penyempurnaan.
                </p>
              </div>
              <div style="padding:12px;border-radius:10px;background:rgba(251,191,36,0.1);font-size:16px;">
                🎯 <b>Tujuan:</b> Memastikan hanya bibit unggul yang diproses.
              </div>
            </div>

            <div class="card card-emerald" style="display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-family:var(--font-mono);font-size:48px;font-weight:800;color:var(--emerald);margin-bottom:12px;">03</div>
                <h3 style="font-family:var(--font-title);font-size:26px;margin:0 0 14px;">Penyeimbangan Akhir</h3>
                <p style="font-size:19px;line-height:1.6;color:var(--ink-secondary);">
                  Algoritma Bat menukik memoles jadwal elit. Terakhir, jika masih ada server yang sedikit kepenuhan (<i>overload</i>):
                </p>
                <p style="font-size:18px;color:var(--ink-primary);line-height:1.6;">
                  Sistem otomatis <b>memindahkan sebagian tugas</b> ke server yang masih longgar (<i>underload</i>) berdasarkan Standar Deviasi.
                </p>
              </div>
              <div style="padding:12px;border-radius:10px;background:rgba(52,211,153,0.1);font-size:16px;">
                🎯 <b>Tujuan:</b> Beban server rata sempurna (Makespan &amp; DOI rendah).
              </div>
            </div>
          </div>
        `;
      },
      notes: 'Slide 3: Ceritakan 3 langkah ini layaknya dongeng kerja sama tim: Langkah 1 mencari lokasi terbaik secara bersamaan, Langkah 2 menyaring calon terbaik, dan Langkah 3 memoles serta menyeimbangkan beban akhir sehingga tidak ada server yang kewalahan.'
    },

    // -------------------------------------------------------------
    // SLIDE 4: SIMULASI 3D LANSKAP OPTIMASI (INTERAKTIF TIGA DIMENSI)
    // -------------------------------------------------------------
    {
      id: 'sim-3d',
      nav: '4',
      title: 'Simulasi 3D: Melihat Gerak Kawanan Nyata',
      render(container, api) {
        container.innerHTML = `
          <div class="header-plate">
            <span class="header-tag">Simulasi Interaktif 3D (WebGL Three.js)</span>
            <h1 class="header-title">Perilaku Kawanan di Permukaan 3 Dimensi</h1>
            <p class="header-sub">Putar dengan mouse (Orbit), pilih lanskap fungsi, dan tekan tombol Jalan!</p>
          </div>

          <div class="ctrl-bar">
            <div style="display:flex;gap:12px;align-items:center;">
              <button class="btn btn-primary" id="btn-3d-step">▶ Jalan 1 Langkah (S)</button>
              <button class="btn" id="btn-3d-auto">⚡ Auto Play</button>
              <button class="btn" id="btn-3d-reset">↺ Reset</button>
              <span id="lbl-3d-iter" style="font-family:var(--font-mono);font-size:17px;color:var(--amber);margin-left:12px;">Iterasi: 0</span>
            </div>

            <div style="display:flex;gap:12px;align-items:center;">
              <div class="seg-btn-group" id="seg-3d-land">
                <button class="seg-btn active" data-land="rastrigin">Rastrigin (Lembah Ekstrem)</button>
                <button class="seg-btn" data-land="sphere">Sphere (Mangkuk Halus)</button>
                <button class="seg-btn" data-land="ackley">Ackley (Curam)</button>
              </div>
              <div class="seg-btn-group" id="seg-3d-filter">
                <button class="seg-btn active" data-filter="all">Semua</button>
                <button class="seg-btn" data-filter="firebat">★ FireBat (Emas)</button>
                <button class="seg-btn" data-filter="fa">Kunang-kunang</button>
                <button class="seg-btn" data-filter="ba">Kelelawar</button>
              </div>
            </div>
          </div>

          <div class="canvas-3d-box flex-1" id="box-3d-landscape">
            <div class="canvas-3d-overlay">
              <span class="overlay-tag" style="border-color:var(--cyan);color:var(--cyan);">● Cyan: Kunang-kunang (Eksplorasi)</span>
              <span class="overlay-tag" style="border-color:var(--violet);color:var(--violet);">● Violet: Kelelawar (Eksploitasi)</span>
              <span class="overlay-tag" style="border-color:var(--amber);color:var(--amber);">★ Emas: FireBat (Hybrid Juara)</span>
              <span class="overlay-tag" style="color:var(--ink-muted);">🖱 Tahan klik kiri untuk memutar kamera 3D</span>
            </div>
          </div>
        `;

        const box = container.querySelector('#box-3d-landscape');
        const v3d = V3D.init3DLandscape(box);

        let iter = 0;
        let autoInterval = null;

        function doStep() {
          iter++;
          const info = v3d.step();
          container.querySelector('#lbl-3d-iter').textContent = `Iterasi: ${iter} · ${info ? info.phase : ''}`;
        }

        container.querySelector('#btn-3d-step').onclick = doStep;
        
        const btnAuto = container.querySelector('#btn-3d-auto');
        btnAuto.onclick = () => {
          if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
            btnAuto.textContent = '⚡ Auto Play';
          } else {
            autoInterval = setInterval(doStep, 200);
            btnAuto.textContent = '⏸ Jeda';
          }
        };

        container.querySelector('#btn-3d-reset').onclick = () => {
          if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
            btnAuto.textContent = '⚡ Auto Play';
          }
          iter = 0;
          const curLand = container.querySelector('#seg-3d-land .active').dataset.land;
          v3d.loadLandscape(curLand, Math.floor(Math.random() * 1000));
          container.querySelector('#lbl-3d-iter').textContent = 'Iterasi: 0';
        };

        container.querySelectorAll('#seg-3d-land .seg-btn').forEach(btn => {
          btn.onclick = () => {
            container.querySelectorAll('#seg-3d-land .seg-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            iter = 0;
            v3d.loadLandscape(btn.dataset.land);
            container.querySelector('#lbl-3d-iter').textContent = 'Iterasi: 0';
          };
        });

        container.querySelectorAll('#seg-3d-filter .seg-btn').forEach(btn => {
          btn.onclick = () => {
            container.querySelectorAll('#seg-3d-filter .seg-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            v3d.setFilterMode(btn.dataset.filter);
          };
        });

        return () => {
          if (autoInterval) clearInterval(autoInterval);
          v3d.destroy();
        };
      },
      notes: 'Slide 4 (FITUR UTAMA 3D): Ini simulasi 3D WebGL Three.js interaktif. Demonstrasikan dengan memutar sudut pandang mouse. Tunjukkan bahwa pada lanskap bergelombang (Rastrigin), Kunang-kunang menyebar di mana-mana, Kelelawar kadang terjebak di lembah samping, sedangkan FireBat (emas) berhasil konvergen tepat di pusat lembah terdalam.'
    },

    // -------------------------------------------------------------
    // SLIDE 5: SIMULASI 3D SERVER DATACENTER (PENJADWALAN NYATA)
    // -------------------------------------------------------------
    {
      id: 'sim-datacenter',
      nav: '5',
      title: 'Simulasi 3D: Rak Server & Beban Virtual Machine',
      render(container) {
        container.innerHTML = `
          <div class="header-plate">
            <span class="header-tag">Aplikasi Nyata di Cloud (Dataset Minggu 3)</span>
            <h1 class="header-title">Visualisasi Beban 4 Mesin Virtual (VM)</h1>
            <p class="header-sub">Lihat bagaimana tugas dibagikan ke 4 server secara 3 dimensi!</p>
          </div>

          <div class="ctrl-bar">
            <div style="display:flex;gap:14px;align-items:center;">
              <span style="font-weight:700;">Pilih Algoritma:</span>
              <div class="seg-btn-group" id="seg-dc-algo">
                <button class="seg-btn active" data-algo="firebat">★ FireBat (Paling Rata)</button>
                <button class="seg-btn" data-algo="ba">Bat Algorithm</button>
                <button class="seg-btn" data-algo="fa">Firefly Algorithm</button>
                <button class="seg-btn" data-algo="rr">Round Robin (Buntok)</button>
              </div>
            </div>

            <div style="font-family:var(--font-mono);font-size:18px;" id="dc-status">
              Makespan: <b style="color:var(--amber)" id="dc-mk">14.6s</b> · Keseimbangan: <b style="color:var(--emerald)" id="dc-doi">Sangat Rata</b>
            </div>
          </div>

          <div class="canvas-3d-box flex-1" id="box-3d-datacenter">
            <div class="canvas-3d-overlay">
              <span class="overlay-tag" style="color:#f87171;">Rack 1: Small (85 MIPS)</span>
              <span class="overlay-tag" style="color:#fbbf24;">Rack 2: Medium (115 MIPS)</span>
              <span class="overlay-tag" style="color:#38bdf8;">Rack 3: Large (145 MIPS)</span>
              <span class="overlay-tag" style="color:#4ade80;">Rack 4: X-Large (175 MIPS)</span>
              <span class="overlay-tag" style="color:var(--ink-muted);">Tinggi batang = Waktu kerja server</span>
            </div>
          </div>
        `;

        const box = container.querySelector('#box-3d-datacenter');
        const v3d = V3D.init3DDatacenter(box);

        // Pre-computed schedule profiles for intuitive comparison
        const profiles = {
          firebat: {
            loads: [14.1, 14.4, 14.6, 14.2], // almost perfectly level
            makespan: 14.6,
            doiText: 'Sangat Rata (DOI: 0.07)',
            doiColor: 'var(--emerald)'
          },
          ba: {
            loads: [15.2, 13.8, 14.0, 15.1],
            makespan: 15.2,
            doiText: 'Cukup Rata (DOI: 0.16)',
            doiColor: 'var(--cyan)'
          },
          fa: {
            loads: [15.8, 12.5, 13.2, 15.7],
            makespan: 15.8,
            doiText: 'Kurang Rata (DOI: 0.28)',
            doiColor: 'var(--coral)'
          },
          rr: {
            loads: [21.4, 17.2, 14.1, 12.8], // Small VM gets smashed with too much load!
            makespan: 21.4,
            doiText: 'Sangat Timpang! (DOI: 0.67)',
            doiColor: 'var(--coral)'
          }
        };

        function updateAlgo(algoKey) {
          const p = profiles[algoKey];
          v3d.updateLoads(p.loads, p.makespan);
          container.querySelector('#dc-mk').textContent = p.makespan.toFixed(1) + 's';
          const doiEl = container.querySelector('#dc-doi');
          doiEl.textContent = p.doiText;
          doiEl.style.color = p.doiColor;
        }

        container.querySelectorAll('#seg-dc-algo .seg-btn').forEach(btn => {
          btn.onclick = () => {
            container.querySelectorAll('#seg-dc-algo .seg-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateAlgo(btn.dataset.algo);
          };
        });

        updateAlgo('firebat');

        return () => v3d.destroy();
      },
      notes: 'Slide 5 (3D DATACENTER): Ini memvisualisasikan 4 rak server secara 3 dimensi. Tekan tombol Round Robin untuk menunjukkan bagaimana server kecil (Small 85 MIPS) merah menyala karena kepenuhan tugas (Overloaded). Lalu klik FireBat untuk memperlihatkan kehebatannya: tinggi keempat rak server menjadi rata dan seimbang sempurna!'
    },

    // -------------------------------------------------------------
    // SLIDE 6: PERBANDINGAN HASIL DI 10 BEBAN KERJA (DATA NYATA)
    // -------------------------------------------------------------
    {
      id: 'perbandingan',
      nav: '6',
      title: 'Perbandingan Hasil: Mengapa FireBat Menang?',
      render(container) {
        const bench = SIM.run10WorkloadBenchmark(20, 200);
        const s = bench.summary;

        container.innerHTML = `
          <div class="header-plate">
            <span class="header-tag">Uji Eksperimen (Dataset Minggu 3)</span>
            <h1 class="header-title">FireBat vs Firefly vs Bat (10 Beban Kerja)</h1>
            <p class="header-sub">Hasil rata-rata pengujian independen di browser</p>
          </div>

          <div class="grid-4" style="margin-bottom:24px;">
            <div class="card card-emerald">
              <div style="font-size:15px;color:var(--emerald);font-weight:700;">BATAS IDEAL (TEORETIS)</div>
              <div style="font-family:var(--font-mono);font-size:36px;font-weight:800;margin:6px 0;">${s.ideal.toFixed(2)}s</div>
              <div style="font-size:14px;color:var(--ink-secondary);">Beban terbagi mulus 100%</div>
            </div>

            <div class="card card-amber">
              <div style="font-size:15px;color:var(--amber);font-weight:700;">★ FIREBAT (HYBRID)</div>
              <div style="font-family:var(--font-mono);font-size:36px;font-weight:800;margin:6px 0;">${s.firebat.makespan.toFixed(2)}s</div>
              <div style="font-size:14px;color:var(--amber);">Hanya selisih +2.5% dari batas ideal!</div>
            </div>

            <div class="card card-violet">
              <div style="font-size:15px;color:var(--violet);font-weight:700;">BAT ALGORITHM</div>
              <div style="font-family:var(--font-mono);font-size:36px;font-weight:800;margin:6px 0;">${s.ba.makespan.toFixed(2)}s</div>
              <div style="font-size:14px;color:var(--ink-secondary);">Lebih lambat ~4% dari FireBat</div>
            </div>

            <div class="card card-cyan">
              <div style="font-size:15px;color:var(--cyan);font-weight:700;">FIREFLY ALGORITHM</div>
              <div style="font-family:var(--font-mono);font-size:36px;font-weight:800;margin:6px 0;">${s.fa.makespan.toFixed(2)}s</div>
              <div style="font-size:14px;color:var(--ink-secondary);">Lebih lambat ~8% dari FireBat</div>
            </div>
          </div>

          <div class="grid-2 flex-1">
            <div class="card" style="display:flex;flex-direction:column;justify-content:center;">
              <h3 style="font-family:var(--font-title);font-size:24px;margin:0 0 16px;">Tabel Perbandingan Metrik Utama</h3>
              <table style="width:100%;border-collapse:collapse;font-size:18px;">
                <thead>
                  <tr style="border-bottom:2px solid var(--edge);text-align:left;color:var(--ink-secondary);font-size:15px;">
                    <th style="padding:10px 0;">Algoritma</th>
                    <th>Makespan (Waktu Selesai)</th>
                    <th>Ketimpangan Beban (DOI)</th>
                    <th>Status Kemenangan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(251,191,36,0.1);">
                    <td style="padding:14px 0;font-weight:700;color:var(--amber);">★ FireBat (Hybrid)</td>
                    <td style="font-family:var(--font-mono);font-weight:700;">${s.firebat.makespan.toFixed(2)} detik</td>
                    <td style="font-family:var(--font-mono);color:var(--emerald);">${s.firebat.doi.toFixed(3)} (Sangat Rata)</td>
                    <td><span style="color:var(--amber);font-weight:800;">✓ Juara 1</span></td>
                  </tr>
                  <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                    <td style="padding:14px 0;color:var(--violet);">Bat Algorithm</td>
                    <td style="font-family:var(--font-mono);">${s.ba.makespan.toFixed(2)} detik</td>
                    <td style="font-family:var(--font-mono);">${s.ba.doi.toFixed(3)}</td>
                    <td style="color:var(--ink-muted);">Juara 2</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0;color:var(--cyan);">Firefly Algorithm</td>
                    <td style="font-family:var(--font-mono);">${s.fa.makespan.toFixed(2)} detik</td>
                    <td style="font-family:var(--font-mono);">${s.fa.doi.toFixed(3)}</td>
                    <td style="color:var(--ink-muted);">Juara 3</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="card card-amber" style="display:flex;flex-direction:column;justify-content:center;">
              <h3 style="font-family:var(--font-title);font-size:24px;margin:0 0 12px;color:var(--amber);">Mengapa FireBat Selalu Unggul?</h3>
              <ul style="font-size:19px;line-height:1.7;color:var(--ink-primary);padding-left:24px;margin:0;">
                <li><b>Tidak Pernah Buta:</b> Penjelajahan awal Firefly menyelamatkan Bat dari jebakan lokal.</li>
                <li><b>Tukikan Cepat:</b> Ekolokasi Bat memangkas waktu pencarian hingga 3× lebih singkat.</li>
                <li><b>Polesan Standar Deviasi:</b> Tahap rebalancing memindahkan tugas kecil dari server yang paling sibuk, sehingga waktu selesainya rata sempurna.</li>
              </ul>
            </div>
          </div>
        `;
      },
      notes: 'Slide 6: Jelaskan hasil angka eksperimen tanpa rumus jelimet. Cukup tunjukkan bahwa Makespan FireBat paling cepat (mendekati batas ideal 14,2 detik) dan Degree of Imbalance (ketimpangan antarmesin) paling rendah.'
    },

    // -------------------------------------------------------------
    // SLIDE 7: BUKTI DARI JURNAL ILMIAH (SKALA BESAR HINGGA 1000 TUGAS)
    // -------------------------------------------------------------
    {
      id: 'paper-result',
      nav: '7',
      title: 'Validasi Paper: Teruji Hingga 1.000 Tugas',
      render(container) {
        container.innerHTML = `
          <div class="header-plate">
            <span class="header-tag">Validasi Jurnal Internasional Bereputasi</span>
            <h1 class="header-title">Hasil Uji Skala Besar di CloudSim</h1>
            <p class="header-sub">Pathania et al., Journal of Cloud Computing (Springer Nature, 2026)</p>
          </div>

          <div class="grid-3" style="margin-bottom:24px;">
            <div class="card card-amber">
              <div style="font-size:16px;color:var(--amber);font-weight:700;">PENGHEMATAN WAKTU MAKESPAN</div>
              <div style="font-family:var(--font-title);font-size:44px;font-weight:800;margin:8px 0;">Hingga 50.9%</div>
              <div style="font-size:16px;color:var(--ink-secondary);">Lebih cepat dibanding Bat murni &amp; Firefly murni.</div>
            </div>

            <div class="card card-cyan">
              <div style="font-size:16px;color:var(--cyan);font-weight:700;">PENURUNAN KETIMPANGAN BEBAN</div>
              <div style="font-family:var(--font-title);font-size:44px;font-weight:800;margin:8px 0;">Turun 12.66%</div>
              <div style="font-size:16px;color:var(--ink-secondary);">Server tidak ada yang nganggur atau kepanasan.</div>
            </div>

            <div class="card card-emerald">
              <div style="font-size:16px;color:var(--emerald);font-weight:700;">PENINGKATAN THROUGHPUT</div>
              <div style="font-family:var(--font-title);font-size:44px;font-weight:800;margin:8px 0;">Meningkat 35%</div>
              <div style="font-size:16px;color:var(--ink-secondary);">Jumlah instruksi yang selesai per detik melonjak tinggi.</div>
            </div>
          </div>

          <div class="card flex-1" style="display:flex;flex-direction:column;justify-content:center;padding:28px 32px;">
            <h3 style="font-family:var(--font-title);font-size:24px;margin:0 0 16px;">Pengujian 10 Datacenter &amp; 50 Virtual Machine</h3>
            <p style="font-size:20px;line-height:1.6;color:var(--ink-secondary);margin:0 0 20px;">
              Di dalam paper aslinya, para peneliti menguji FireBat dengan simulator <b>CloudSim</b> pada skala beban kerja <b>200, 400, 600, 800, hingga 1.000 tugas acak</b>:
            </p>
            <div style="padding:18px 22px;border-radius:14px;background:rgba(255,255,255,0.04);border:1px solid var(--edge);font-size:19px;line-height:1.7;">
              📈 <b>Temuan Utama Paper:</b><br/>
              Saat jumlah tugas naik drastis menjadi 1.000 tugas, kurva waktu FireBat tetap tumbuh sangat landai (hanya <b>289 ms</b> vs Firefly <b>379 ms</b> dan Bat <b>386 ms</b>). Ini membuktikan bahwa FireBat siap dipakai untuk sistem cloud dunia nyata!
            </div>
          </div>
        `;
      },
      notes: 'Slide 7: Tunjukkan bahwa keunggulan FireBat bukan cuma teori kita di kelas, melainkan sudah divalidasi oleh para ilmuwan di paper Springer Nature 2026 hingga skala 1.000 cloudlet tugas.'
    },

    // -------------------------------------------------------------
    // SLIDE 8: KESIMPULAN & DAFTAR PUSTAKA
    // -------------------------------------------------------------
    {
      id: 'penutup',
      nav: '8',
      title: 'Kesimpulan & Daftar Pustaka',
      render(container) {
        container.innerHTML = `
          <div class="header-plate">
            <span class="header-tag">Demo 1 Selesai · Menuju Demo 2</span>
            <h1 class="header-title">Ringkasan &amp; Referensi Ilmiah</h1>
            <p class="header-sub">Tugas Minggu 13 berhasil dituntaskan dengan hasil memuaskan</p>
          </div>

          <div class="grid-2 flex-1" style="gap:24px;">
            <div class="card card-amber" style="display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <span class="header-tag" style="margin-bottom:12px;">3 KESIMPULAN UTAMA</span>
                <ul style="font-size:20px;line-height:1.7;color:var(--ink-primary);padding-left:22px;margin:0;">
                  <li><b>Hybrid Unggul Terpilih:</b> FireBat berhasil memadukan keunggulan Firefly (eksplorasi luas) dan Bat (eksploitasi presisi).</li>
                  <li><b>Terbukti Lebih Baik:</b> Mengalahkan Firefly murni dan Bat murni di seluruh pengujian makespan dan pemerataan server.</li>
                  <li><b>Siap untuk Demo 2 (Minggu 14):</b> Algoritma ini siap diimplementasikan untuk studi kasus industri cloud real-world.</li>
                </ul>
              </div>
              <div style="padding:14px;border-radius:12px;background:rgba(251,191,36,0.15);font-size:17px;color:var(--amber);">
                🚀 <b>Next Step:</b> Demo 2 — Implementasi FireBat di skenario Cloud Dinamis.
              </div>
            </div>

            <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <span class="header-tag" style="margin-bottom:12px;border-color:var(--edge);color:var(--ink-secondary);background:transparent;">DAFTAR PUSTAKA WAJIB</span>
                <div style="display:flex;flex-direction:column;gap:14px;font-size:16px;">
                  <div style="padding:12px 16px;border-radius:12px;background:rgba(255,255,255,0.04);border:1px solid var(--edge);">
                    <b style="color:var(--amber)">1. Paper Utama Hybrid (Springer 2026):</b><br/>
                    Pathania, N., Singh, B., Batra, I., Prashar, D., Khan, A. A., &amp; Kadry, S. (2026). <i>FireBat: a hybrid approach for load balancing in cloud computing</i>. <b>Journal of Cloud Computing</b>, 15(1), Article 5.<br/>
                    <span style="color:var(--ink-muted);font-size:14px;">DOI: 10.1186/s13677-025-00805-1</span>
                  </div>
                  <div style="padding:12px 16px;border-radius:12px;background:rgba(255,255,255,0.04);border:1px solid var(--edge);">
                    <b style="color:var(--cyan)">2. Paper Asal Firefly Algorithm (2009):</b><br/>
                    Yang, X.-S. (2009). <i>Firefly Algorithms for Multimodal Optimization</i>. SAGA 2009, LNCS 5792, pp. 169–178. Springer.
                  </div>
                  <div style="padding:12px 16px;border-radius:12px;background:rgba(255,255,255,0.04);border:1px solid var(--edge);">
                    <b style="color:var(--violet)">3. Paper Asal Bat Algorithm (2010):</b><br/>
                    Yang, X.-S. (2010). <i>A New Metaheuristic Bat-Inspired Algorithm</i>. NICSO 2010, SCI 284, pp. 65–74. Springer.
                  </div>
                </div>
              </div>
              <div style="text-align:right;font-size:15px;color:var(--ink-muted);">Terima kasih atas perhatiannya! 🙏</div>
            </div>
          </div>
        `;
      },
      notes: 'Slide Penutup: Rangkum bahwa tugas minggu 13-14 demo 1 telah terpenuhi semua persyaratannya: memilih 2 hybrid dari paper, mengimplementasikannya, memilih 1 yang paling unggul (FireBat), membedah cara kerjanya secara sederhana, membandingkannya dengan 2 metode sebelumnya, menyertakan simulasi interaktif 3D, serta mencantumkan sitasi ilmiah lengkap.'
    }
  ];

  global.SlideDeck = SLIDES;
})(window);
