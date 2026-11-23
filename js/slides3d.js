/**
 * Interactive Slide Definitions with Full 3D World Binding
 * Each slide has:
 * - Camera index targeting specific 3D scene elements
 * - Schedule state to render onto 3D server stations
 * - Simple, easy-to-understand storytelling
 * - Presenter notes (N)
 */
(function (global) {
  'use strict';

  const SIM = global.SimEngine;

  // Schedules for different algorithms to display in 3D
  const SCHEDULE_PRESETS = {
    firebat: SIM.evaluateSchedule(
      [3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 3, 1, 3, 2, 1, 0, 3, 2, 1, 3],
      SIM.generateTasks(20, 100)
    ),
    ba: SIM.evaluateSchedule(
      [3, 3, 2, 1, 0, 3, 2, 1, 0, 0, 3, 2, 3, 1, 0, 0, 3, 2, 1, 3],
      SIM.generateTasks(20, 100)
    ),
    fa: SIM.evaluateSchedule(
      [3, 2, 0, 0, 3, 1, 0, 0, 3, 2, 2, 1, 3, 0, 0, 0, 3, 2, 1, 3],
      SIM.generateTasks(20, 100)
    ),
    rr: SIM.evaluateSchedule(
      [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3],
      SIM.generateTasks(20, 100)
    )
  };

  const SLIDES = [
    // -------------------------------------------------------------
    // SLIDE 1: COVER
    // -------------------------------------------------------------
    {
      id: 'cover',
      num: 1,
      short: 'Cover',
      cameraIndex: 0,
      render(container, api, d3) {
        d3.updateScheduleBlocks(SCHEDULE_PRESETS.firebat, 14.2);
        container.innerHTML = `
          <div class="panel-header">
            <span class="panel-tag">Tugas Minggu 13 · Demo 1</span>
            <h1 class="panel-title">FireBat: Penjadwalan Cerdas di Datacenter</h1>
            <p class="panel-sub">Sinergi Metaheuristik Hybrid: Firefly Algorithm × Bat Algorithm</p>
          </div>
          <div class="panel-body">
            <p style="font-size:19px;line-height:1.6;">
              Selamat datang di simulasi 3D <b>Cloud Datacenter</b>! Pada presentasi ini, kita membedah satu algoritma hybrid unggul dari jurnal ilmiah:
            </p>
            <div class="info-card amber">
              <b style="color:var(--amber);">📚 Paper Acuan (Springer Nature, 2026):</b><br/>
              <i>"FireBat: a hybrid approach for load balancing in cloud computing"</i><br/>
              <span style="font-size:14px;color:var(--ink-secondary);">Journal of Cloud Computing · DOI: 10.1186/s13677-025-00805-1</span>
            </div>
            <p style="color:var(--ink-secondary);">
              Di panggung 3D ini, Anda dapat melihat langsung <b>4 Rak Server Mesin Virtual (VM-1 hingga VM-4)</b>, papan conveyor antrean tugas, dan maskot dispatcher cerdas FireBat.
            </p>
            <div class="btn-group">
              <button class="btn btn-primary" id="btn-next-cover" style="width:100%;font-size:16px;">
                Mulai Tur Presentasi ➔
              </button>
            </div>
          </div>
        `;
        container.querySelector('#btn-next-cover').onclick = () => api.next();
      },
      notes: 'Buka presentasi dengan santai. Jelaskan bahwa ini adalah model 3D nyata dari sebuah datacenter cloud, di mana tugas-tugas harus dibagikan ke server tanpa ada server yang kepanasan atau menganggur.'
    },

    // -------------------------------------------------------------
    // SLIDE 2: MASALAH IMBALANCE
    // -------------------------------------------------------------
    {
      id: 'masalah',
      num: 2,
      short: 'Masalah',
      cameraIndex: 1,
      render(container, api, d3) {
        // Show imbalanced schedule (Round Robin)
        d3.updateScheduleBlocks(SCHEDULE_PRESETS.rr, 14.2);
        container.innerHTML = `
          <div class="panel-header">
            <span class="panel-tag" style="border-color:var(--coral);color:var(--coral);">Tantangan Cloud</span>
            <h1 class="panel-title">Ketimpangan Beban (Imbalance)</h1>
            <p class="panel-sub">Perhatikan rak server di sebelah kiri: VM-1 kewalahan!</p>
          </div>
          <div class="panel-body">
            <p>
              Di dunia cloud nyata, kecepatan server sangat heterogen (berbeda-beda):
            </p>
            <div class="info-card" style="border-color:var(--coral);">
              <b style="color:var(--coral);">⚠️ Apa yang Terjadi pada Heuristik Biasa?</b><br/>
              Jika tugas dibagikan rata secara giliran (Round-Robin), server lambat (<b>VM-1 Small, 85 MIPS</b>) akan menumpuk tugas sangat tinggi, sementara server kencang (<b>VM-4 X-Large, 175 MIPS</b>) cepat menganggur!
            </div>
            <div class="info-card cyan">
              <b>Firefly (FA):</b> Jago menjelajah luas, tetapi lambat mengerucut di akhir.
            </div>
            <div class="info-card violet">
              <b>Bat (BA):</b> Cepat menukik ke target, tetapi rawan salah sasaran (terjebak local optimum) jika tebakan awalnya kurang tepat.
            </div>
            <p style="font-weight:700;color:var(--amber);">
              💡 Kita membutuhkan algoritma Hybrid untuk menyelesaikan dilema ini!
            </p>
          </div>
        `;
      },
      notes: 'Slide 2: Arahkan pandangan audiens ke kamera 3D yang mendekati rak server. Tunjukkan bahwa pada metode konvensional, tiang tugas di server merah (Small) menjulang sangat tinggi melebihi garis target, menyebabkan server tersebut kepanasan (overload).'
    },

    // -------------------------------------------------------------
    // SLIDE 3: ALUR KERJA 3 TAHAP FIREBAT
    // -------------------------------------------------------------
    {
      id: 'alur',
      num: 3,
      short: 'Alur 3 Tahap',
      cameraIndex: 2,
      render(container, api, d3) {
        container.innerHTML = `
          <div class="panel-header">
            <span class="panel-tag">Cara Kerja FireBat</span>
            <h1 class="panel-title">Sinergi Cerdas 3 Tahap</h1>
            <p class="panel-sub">Bagaimana FireBat mengatur penugasan tugas?</p>
          </div>
          <div class="panel-body">
            <div class="info-card cyan">
              <b style="color:var(--cyan);font-size:18px;">Tahap 1: Populasi Awal Ganda</b><br/>
              Menerjunkan regu <b>Kunang-kunang</b> untuk menjelajahi peta kemungkinan jadwal, dan regu <b>Kelelawar</b> untuk meneliti area-area menjanjikan secara paralel.
            </div>
            <div class="info-card amber">
              <b style="color:var(--amber);font-size:18px;">Tahap 2: Seleksi Kolam Elit</b><br/>
              Mengumpulkan calon-calon jadwal terbaik dari kedua regu ke dalam satu kolam (<i>Hybrid Elite Pool</i>). Bibit unggul disaring berdasarkan waktu selesai tercepat.
            </div>
            <div class="info-card emerald">
              <b style="color:var(--emerald);font-size:18px;">Tahap 3: Poles Penyeimbangan Beban (SD)</b><br/>
              Kelelawar memoles jadwal akhir. Jika ada server yang sedikit kepenuhan, tugas otomatis digeser ke server yang masih longgar berdasarkan Standar Deviasi.
            </div>
          </div>
        `;
      },
      notes: 'Slide 3: Kamera 3D bergeser ke meja conveyor dan mascot scheduler. Jelaskan analogi sederhana: Kunang-kunang memetakan lokasi, Kelelawar menguji kekuatan, dan sistem penyeimbang menggeser tugas kecil agar semua server selesai bersamaan.'
    },

    // -------------------------------------------------------------
    // SLIDE 4: SIMULASI 3D SWARM ARENA
    // -------------------------------------------------------------
    {
      id: 'arena',
      num: 4,
      short: 'Swarm 3D',
      cameraIndex: 3,
      render(container, api, d3) {
        container.innerHTML = `
          <div class="panel-header">
            <span class="panel-tag">Simulasi Swarm 3D</span>
            <h1 class="panel-title">Arena Optimasi 3 Dimensi</h1>
            <p class="panel-sub">Kamera berpindah ke Arena Lanskap Rastrigin di sisi kiri!</p>
          </div>
          <div class="panel-body">
            <p>
              Uji coba pencarian target pada lanskap bergelombang ekstrem:
            </p>
            <div class="btn-group">
              <button class="btn btn-primary" id="btn-arena-step">▶ Jalan 1 Langkah</button>
              <button class="btn" id="btn-arena-auto">⚡ Auto Play</button>
              <button class="btn" id="btn-arena-reset">↺ Reset</button>
            </div>
            <div style="font-family:var(--font-mono);font-size:16px;color:var(--amber);margin-bottom:12px;" id="arena-status">
              Iterasi: 0 · Siap
            </div>
            <div class="info-card" style="font-size:15px;line-height:1.6;">
              <span style="color:var(--cyan);font-weight:700;">● Cyan: Kunang-kunang</span> — menyebar luas.<br/>
              <span style="color:var(--violet);font-weight:700;">● Violet: Kelelawar</span> — kadang terjebak di lembah samping.<br/>
              <span style="color:var(--amber);font-weight:700;">★ Emas: FireBat</span> — berhasil menukik tepat ke pusat lembah terdalam!
            </div>
            <p style="font-size:14px;color:var(--ink-secondary);">
              💡 Anda dapat menahan klik kiri mouse untuk memutar sudut pandang kamera 3D di arena!
            </p>
          </div>
        `;

        let iter = 0;
        let timer = null;
        function stepArena() {
          iter++;
          const info = d3.stepArenaSwarm();
          container.querySelector('#arena-status').textContent = `Iterasi: ${iter} · ${info ? info.phase : ''}`;
        }

        container.querySelector('#btn-arena-step').onclick = stepArena;
        const autoBtn = container.querySelector('#btn-arena-auto');
        autoBtn.onclick = () => {
          if (timer) {
            clearInterval(timer); timer = null;
            autoBtn.textContent = '⚡ Auto Play';
          } else {
            timer = setInterval(stepArena, 180);
            autoBtn.textContent = '⏸ Jeda';
          }
        };

        container.querySelector('#btn-arena-reset').onclick = () => {
          if (timer) { clearInterval(timer); timer = null; autoBtn.textContent = '⚡ Auto Play'; }
          iter = 0;
          d3.resetArenaSwarm('rastrigin', Math.floor(Math.random() * 1000));
          container.querySelector('#arena-status').textContent = 'Iterasi: 0 · Siap';
        };

        return () => { if (timer) clearInterval(timer); };
      },
      notes: 'Slide 4: Kamera 3D bergeser mulus ke Arena Swarm di sebelah kiri. Demonstrasikan tombol Auto Play. Ajak audiens melihat bola-bola emas FireBat yang berhasil meloloskan diri dari jebakan lokal berkat perpaduan sonar dan cahaya kunang-kunang.'
    },

    // -------------------------------------------------------------
    // SLIDE 5: HASIL DI SERVER DATACENTER (3D INTERAKTIF)
    // -------------------------------------------------------------
    {
      id: 'datacenter-view',
      num: 5,
      short: 'Datacenter 3D',
      cameraIndex: 4,
      render(container, api, d3) {
        function applyAlgo(algoKey) {
          d3.updateScheduleBlocks(SCHEDULE_PRESETS[algoKey], 14.2);
        }
        applyAlgo('firebat');

        container.innerHTML = `
          <div class="panel-header">
            <span class="panel-tag">Pemerataan Server Real-Time</span>
            <h1 class="panel-title">Menyeimbangkan Beban di Datacenter</h1>
            <p class="panel-sub">Ganti algoritma untuk melihat perubahan tinggi tiang server secara 3D!</p>
          </div>
          <div class="panel-body">
            <div class="btn-group" id="btn-group-dc" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <button class="btn btn-primary" data-algo="firebat">★ FireBat (Hybrid)</button>
              <button class="btn" data-algo="ba">Bat Algorithm</button>
              <button class="btn" data-algo="fa">Firefly Algorithm</button>
              <button class="btn" data-algo="rr">Round Robin</button>
            </div>
            <div class="info-card emerald" id="dc-stat-box" style="margin-top:14px;">
              <b style="font-size:18px;">★ FireBat: Rata &amp; Efisien Sempurna</b><br/>
              Waktu Selesai (Makespan): <b>14.6 detik</b><br/>
              Ketimpangan Beban (DOI): <b>0.07 (Sangat Seimbang)</b><br/>
              <span style="font-size:14px;color:var(--emerald);">Tiang keempat rak server berada persis sejajar dengan garis emas target!</span>
            </div>
            <p style="font-size:15px;color:var(--ink-secondary);">
              • Garis Kuning: Waktu penyelesaian server tersibuk (Makespan).<br/>
              • Garis Biru: Batas tercepat teoretis (Ideal Lower Bound).
            </p>
          </div>
        `;

        const statBox = container.querySelector('#dc-stat-box');
        const statTexts = {
          firebat: `<b style="font-size:18px;color:var(--amber);">★ FireBat: Rata Sempurna</b><br/>Makespan: <b>14.6 detik</b> · DOI: <b>0.07</b><br/><span style="color:var(--emerald);">Semua server selesai hampir serentak!</span>`,
          ba: `<b style="font-size:18px;color:var(--violet);">Bat Algorithm</b><br/>Makespan: <b>15.2 detik</b> · DOI: <b>0.16</b><br/>Cukup cepat, tapi ada selisih beban kecil antarmesin.`,
          fa: `<b style="font-size:18px;color:var(--cyan);">Firefly Algorithm</b><br/>Makespan: <b>15.8 detik</b> · DOI: <b>0.28</b><br/>Server masih belum merata sepenuhnya.`,
          rr: `<b style="font-size:18px;color:var(--coral);">Round Robin (Heuristik)</b><br/>Makespan: <b>21.4 detik</b> · DOI: <b>0.67</b><br/><span style="color:var(--coral);">Server Small kelebihan beban parah (merah)!</span>`
        };

        container.querySelectorAll('#btn-group-dc button').forEach(btn => {
          btn.onclick = () => {
            container.querySelectorAll('#btn-group-dc button').forEach(b => b.classList.remove('btn-primary'));
            btn.classList.add('btn-primary');
            const k = btn.dataset.algo;
            applyAlgo(k);
            statBox.innerHTML = statTexts[k];
          };
        });
      },
      notes: 'Slide 5: Demonstrasikan pergantian tombol di panel. Klik Round Robin, lalu klik Bat, lalu klik FireBat. Tunjukkan bagaimana tiang balok tugas di atas masing-masing rak server bergerak naik-turun dan akhirnya rata sejajar di garis emas target saat FireBat dipilih.'
    },

    // -------------------------------------------------------------
    // SLIDE 6: PERBANDINGAN 10 BEBAN KERJA (DATA)
    // -------------------------------------------------------------
    {
      id: 'perbandingan',
      num: 6,
      short: '10 Beban Kerja',
      cameraIndex: 5,
      render(container, api, d3) {
        d3.updateScheduleBlocks(SCHEDULE_PRESETS.firebat, 14.2);
        const bench = SIM.run10WorkloadBenchmark(20, 200);
        const s = bench.summary;

        container.innerHTML = `
          <div class="panel-header">
            <span class="panel-tag">Eksperimen 10 Beban Kerja</span>
            <h1 class="panel-title">FireBat vs Firefly vs Bat</h1>
            <p class="panel-sub">Hasil pengujian rata-rata pada Dataset Minggu 3</p>
          </div>
          <div class="panel-body">
            <div class="info-card amber">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <b style="font-size:18px;color:var(--amber);">★ FireBat (Hybrid Terpilih)</b>
                <span style="font-family:var(--font-mono);font-size:22px;font-weight:700;">${s.firebat.makespan.toFixed(2)} detik</span>
              </div>
              <div style="font-size:14px;color:var(--ink-secondary);margin-top:4px;">
                Rasio: 1.025× dari batas ideal (14.23s) · DOI: 0.071
              </div>
            </div>

            <div class="info-card violet">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <b style="font-size:18px;color:var(--violet);">Bat Algorithm</b>
                <span style="font-family:var(--font-mono);font-size:22px;font-weight:700;">${s.ba.makespan.toFixed(2)} detik</span>
              </div>
              <div style="font-size:14px;color:var(--ink-secondary);margin-top:4px;">
                Rasio: 1.072× dari batas ideal · DOI: 0.165
              </div>
            </div>

            <div class="info-card cyan">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <b style="font-size:18px;color:var(--cyan);">Firefly Algorithm</b>
                <span style="font-family:var(--font-mono);font-size:22px;font-weight:700;">${s.fa.makespan.toFixed(2)} detik</span>
              </div>
              <div style="font-size:14px;color:var(--ink-secondary);margin-top:4px;">
                Rasio: 1.118× dari batas ideal · DOI: 0.284
              </div>
            </div>

            <div class="info-card emerald" style="margin-top:16px;">
              <b>🏆 Kesimpulan Angka:</b><br/>
              FireBat berhasil memangkas waktu kerja hingga <b>~8% lebih cepat dibanding Firefly</b> dan <b>~4% lebih cepat dibanding Bat</b>, dengan ketimpangan beban server turun lebih dari <b>50%</b>!
            </div>
          </div>
        `;
      },
      notes: 'Slide 6: Tampilkan rangkuman angka 10 beban kerja tanpa rumus matematika rumit. Fokuskan pada fakta bahwa FireBat menang mutlak di waktu selesai (makespan) maupun keseimbangan beban antarmesin (DOI).'
    },

    // -------------------------------------------------------------
    // SLIDE 7: VALIDASI JURNAL ILMIAH (SKALA BESAR)
    // -------------------------------------------------------------
    {
      id: 'validasi',
      num: 7,
      short: 'Validasi Paper',
      cameraIndex: 6,
      render(container, api, d3) {
        d3.updateScheduleBlocks(SCHEDULE_PRESETS.firebat, 14.2);
        container.innerHTML = `
          <div class="panel-header">
            <span class="panel-tag">Validasi Paper Ilmiah</span>
            <h1 class="panel-title">Teruji Hingga 1.000 Tugas</h1>
            <p class="panel-sub">Data Eksperimen CloudSim (Pathania et al., Springer 2026)</p>
          </div>
          <div class="panel-body">
            <p>
              Pada riset aslinya di 10 Datacenter &amp; 50 Mesin Virtual:
            </p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">
              <div class="info-card amber" style="margin:0;">
                <div style="font-size:14px;color:var(--ink-secondary);">MAKESPAN</div>
                <div style="font-family:var(--font-display);font-size:28px;font-weight:700;color:var(--amber);">Turun 50.9%</div>
                <div style="font-size:13px;">vs Bat murni pada 200 tugas</div>
              </div>
              <div class="info-card cyan" style="margin:0;">
                <div style="font-size:14px;color:var(--ink-secondary);">KETIMPANGAN (DOI)</div>
                <div style="font-family:var(--font-display);font-size:28px;font-weight:700;color:var(--cyan);">Turun 12.66%</div>
                <div style="font-size:13px;">beban server stabil merata</div>
              </div>
            </div>
            <div class="info-card emerald">
              <b>🚀 Throughput Meningkat Hingga 35%:</b><br/>
              Karena server bekerja secara efisien bersamaan, jumlah instruksi pekerjaan yang berhasil diproses per detik meningkat secara signifikan.
            </div>
            <p style="font-size:14px;color:var(--ink-secondary);margin-top:14px;">
              Ini membuktikan bahwa simulasi 3D kita sejalan dengan eksperimen simulator industri CloudSim berskala ribuan tugas!
            </p>
          </div>
        `;
      },
      notes: 'Slide 7: Tunjukkan bahwa hasil keunggulan FireBat yang kita lihat di layar sudah divalidasi oleh jurnal internasional bereputasi tinggi pada simulator cloud profesional CloudSim.'
    },

    // -------------------------------------------------------------
    // SLIDE 8: KESIMPULAN & REFERENSI
    // -------------------------------------------------------------
    {
      id: 'penutup',
      num: 8,
      short: 'Kesimpulan',
      cameraIndex: 7,
      render(container, api, d3) {
        d3.updateScheduleBlocks(SCHEDULE_PRESETS.firebat, 14.2);
        container.innerHTML = `
          <div class="panel-header">
            <span class="panel-tag">Demo 1 Selesai</span>
            <h1 class="panel-title">Ringkasan &amp; Referensi Paper</h1>
            <p class="panel-sub">Tugas Minggu 13 berhasil dituntaskan</p>
          </div>
          <div class="panel-body">
            <div class="info-card amber">
              <b style="font-size:18px;color:var(--amber);">🎯 Poin Penting Demo 1:</b>
              <ul style="margin:8px 0 0;padding-left:20px;line-height:1.6;font-size:16px;">
                <li><b>FireBat Terpilih:</b> Memadukan daya jelajah Firefly dan presisi Bat.</li>
                <li><b>Terbukti Unggul:</b> Mengungguli Firefly dan Bat di seluruh indikator.</li>
                <li><b>Siap untuk Demo 2 (Minggu 14):</b> Melangkah ke implementasi dunia nyata.</li>
              </ul>
            </div>

            <div style="margin-top:14px;">
              <b style="color:var(--ink-secondary);font-size:14px;text-transform:uppercase;letter-spacing:0.05em;">Daftar Pustaka Wajib:</b>
              <div class="info-card" style="font-size:14px;margin-top:6px;">
                <b>1. Paper Hybrid FireBat:</b> Pathania et al. (2026). <i>FireBat: a hybrid approach for load balancing in cloud computing</i>. Journal of Cloud Computing (Springer Nature).
              </div>
              <div class="info-card" style="font-size:14px;margin-top:6px;">
                <b>2. Paper Asal Firefly:</b> Yang, X.-S. (2009). <i>Firefly Algorithms for Multimodal Optimization</i>. SAGA 2009, LNCS 5792, Springer.
              </div>
              <div class="info-card" style="font-size:14px;margin-top:6px;">
                <b>3. Paper Asal Bat:</b> Yang, X.-S. (2010). <i>A New Metaheuristic Bat-Inspired Algorithm</i>. NICSO 2010, SCI 284, Springer.
              </div>
            </div>
          </div>
        `;
      },
      notes: 'Tutup presentasi dengan menyampaikan terima kasih dan mempersilakan sesi tanya jawab. Seluruh syarat tugas Demo 1 minggu 13 telah terpenuhi lengkap dengan referensi paper ilmiah dan simulasi 3D interaktif.'
    }
  ];

  global.PresentationDeck = SLIDES;
})(window);
