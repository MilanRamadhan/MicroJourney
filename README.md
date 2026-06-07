# MICROJOURNEY AR (Fase D - Sistem Pencernaan)

## A. Ringkasan Perubahan Fokus (The Pivot)

Fokus utama aplikasi kita bergeser. Kita tidak lagi murni membuat aplikasi pencemaran lingkungan. MICROJOURNEY AR kini diposisikan sebagai **media investigasi biologi untuk materi Sistem Pencernaan Manusia (Kelas VIII)**. Isu sampah plastik digunakan sebagai pemicu (faktor lingkungan) yang mengganggu organ pencernaan.

**Nilai jual utama (killer feature)** kita sekarang adalah: Memvisualisasikan kegagalan organ lambung dan usus halus saat berhadapan dengan polimer sintetik (mikroplastik), sesuatu yang tidak bisa dijelaskan hanya dengan buku teks.

## B. Alur Aplikasi WebAR (Berdasarkan Sintaks Discovery Learning)

Alur interaksi pengguna (UI/UX) diubah agar mengikuti 6 langkah *Discovery Learning* dari modul ajar guru:

### Tahap 1: Stimulation (Kamera AR - Pemicu)
- **Aksi**: Siswa memindai botol/kemasan plastik menggunakan kamera gawai.
- **Visual**: Sistem mendeteksi objek (AI/Computer Vision).
- **Output**: Muncul pop-up pertanyaan pemantik: *"Bagaimana mungkin benda padat sintetis ini bisa menembus dan menetap di dalam usus manusia?"*.

### Tahap 2 & 3: Data Collection (Eksplorasi Degradasi & Rantai Makanan)
- **Aksi**: Siswa masuk ke mode AR.
- **Visual**: Menampilkan animasi fotodegradasi plastik (pecah oleh sinar UV/ombak) dan bagaimana partikel tersebut dimakan oleh hewan penyaring laut (ikan/kerang).

### Tahap 4: Data Processing (Investigasi Fisiologis - FOKUS UTAMA)
- **Aksi**: Siswa melakukan interaksi dengan model 3D anatomi.
- **Visual 1 (Lambung)**: Menampilkan animasi lambung transparan. Siswa melihat cairan asam lambung (HCl) dan enzim protease berhasil menghancurkan makanan organik, tetapi gagal total mendegradasi rantai karbon polimer sintetik (mikroplastik).
- **Visual 2 (Usus Halus)**: Fitur zoom-in atau mode makro ke dinding usus. Siswa melihat tumpukan mikroplastik secara mekanis memblokir permukaan vili usus halus.

### Tahap 5: Verification (Integrasi E-LKPD)
- **Aksi**: Animasi AR dijeda. Muncul antarmuka E-LKPD (overlay).
- **Output**: Siswa harus menyimpulkan dan mencocokkan data visual tadi untuk membuktikan bahwa mikroplastik bersifat toksik dan *indigestible* (tidak dapat dicerna). Data ini langsung terkirim ke Dashboard Guru.

### Tahap 6: Generalization (Aksi Nyata)
- **Aksi**: Layar penutup. Manusia ditekankan sebagai pelaku sekaligus korban akhir.
- **Output**: Siswa mengetikkan solusi taktis/komitmen untuk mengurangi plastik sekali pakai di kantin sekolah atau rumah.

## C. Daftar Kebutuhan Terbaru (To-Do List Tim)

### 1. Kebutuhan Aset 3D & Animasi (Tim Visual/Desain)
- **Model Botol/Kemasan Plastik**: Skala low-poly untuk objek scanning.
- **Model Biota Laut**: Ikan atau kerang transparan.
- **Model Anatomi (Krusial)**:
  - Lambung transparan dengan efek cairan di dalamnya.
  - Permukaan vili usus halus (bentuknya seperti jari-jari kecil/tonjolan mikroskopis).
- **Aset Partikel**: Partikel makanan organik (bisa hancur) vs Partikel mikroplastik (tidak bisa hancur).

### 2. Kebutuhan UI/UX (Tim Desain Antarmuka)
- Merancang wireframe atau mockup layar untuk 6 tahap di atas.
- Memastikan desain overlay E-LKPD tidak menutupi kanvas AR secara keseluruhan (gunakan efek semi-transparan/glassmorphism).
- Merancang Dashboard Pemantauan Guru untuk melihat jawaban siswa di Tahap 5 dan 6.

### 3. Kebutuhan Teknis Sistem (Tim Developer)
- Eksplorasi library rendering web (A-Frame atau Three.js) yang kuat untuk menangani animasi cairan/partikel di dalam model lambung 3D tanpa membuat browser lag.
- Menyiapkan logika integrasi Computer Vision (TensorFlow.js) agar setelah deteksi fisik selesai, sistem bisa langsung memicu transisi ke Tahap 1.
