# Presentasi Demo 1 (Minggu 13) – FireBat Hybrid (Firefly × Bat)

Dokumentasi dan panduan penggunaan untuk media presentasi interaktif berbasis 3D mengenai algoritma penjadwalan *cloud* **FireBat Hybrid**.

---

## 🚀 Petunjuk Menjalankan

1. Ekstrak file `.zip` proyek ini ke folder lokal.
2. Klik ganda file `index.html` untuk membukanya langsung di peramban (**Chrome** / **Edge** / **Firefox**).
   > **Catatan:** Semua *library* 3D (`Three.js` dan `OrbitControls`) sudah disertakan secara lokal di dalam folder `lib/`. Aplikasi ini tidak memerlukan koneksi internet maupun *server* khusus (**100% offline**).

---

## 📑 Struktur Slide (Objektif & Ilmiah)

* **Slide 1:** Cover & Pengenalan FireBat *(Studi Paper Springer Nature 2026)*.
* **Slide 2:** Karakteristik Dua Metode Sebelumnya *(FA: Eksplorasi Luas vs BA: Eksploitasi Cepat)*.
* **Slide 3:** 🎮 **Skenario Alur Penjadwalan Cloud 3D (6 Langkah Faktual):**
  1. Kedatangan Task
  2. Masalah Ketimpangan Beban
  3. Eksplorasi FA
  4. Eksploitasi BA
  5. Migrasi Tugas
  6. Kondisi Akhir Beban
* **Slide 4:** 🎮 **Komparasi Hasil pada Kasus Uji Datacenter (3 Pod Side-by-Side):**
  * **Pod 1 (Firefly):** Evaluasi Makespan `19.3s` & DOI `0.185` *(Karakteristik laju konvergensi lambat)*.
  * **Pod 2 (Bat):** Evaluasi Makespan `17.8s` & DOI `0.240` *(Karakteristik konvergensi lokal minimum)*.
  * **Pod 3 (FireBat):** Evaluasi Makespan `15.4s` & DOI `0.071` *(Efek penambahan aturan migrasi beban)*.
  * *Disertai catatan kritis dan batasan algoritma secara objektif.*
* **Slide 5:** Data Evaluasi pada 10 Variasi Workload *(Data Faktual Paper Pathania et al., 2026)*.
* **Slide 6:** Skalabilitas hingga 1.000 Tugas & Keterbatasan Teknis Algoritma *(Overhead CPU, parameter tuning)*.
* **Slide 7:** Ringkasan Evaluasi & Daftar Pustaka Ilmiah *(Springer Nature 2026 & HGACO IEEE)*.

---

## ⌨️ Pintasan Keyboard & Kontrol Mouse

| Tombol / Aksi | Fungsi |
| :--- | :--- |
| `Spasi` / `Panah Kanan` | Slide berikutnya |
| `Panah Kiri` | Slide sebelumnya |
| `Angka 1–7` | Lompat langsung ke slide tertentu |
| `N` | Buka / tutup Catatan Presenter (*Speaker Notes* lengkap teks narasi bicara) |
| `F` | Mode Layar Penuh (*Fullscreen*) |
| `Drag Mouse Kiri` | Memutar panggung 3D (`OrbitControls`) |
| `Scroll Mouse` | *Zoom in* / *zoom out* kamera 3D |
