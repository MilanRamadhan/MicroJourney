# Developer Guide: MICROJOURNEY AR (Fase D - Sistem Pencernaan)

Panduan teknis pengembangan aplikasi WebAR investigasi biologi untuk memvisualisasikan kegagalan organ lambung dan usus halus terhadap mikroplastik.

---

## 🗺️ Alur Sistem & Interaksi (Discovery Learning)

Aplikasi ini dibangun mengikuti 6 langkah *Discovery Learning*:

### Tahap 1: Stimulation (Kamera AR)
* **Fungsi:** Deteksi objek botol plastik sebagai pemicu.
* **Teknologi:** Computer Vision (TensorFlow.js) di *browser*.
* **Logika:** Setelah *bounding box* mendeteksi plastik, sistem memunculkan pop-up pertanyaan pemantik dan mentransisikan pengguna ke mode AR (Tahap 2).

### Tahap 2 & 3: Data Collection (Degradasi)
* **Fungsi:** Animasi pelapukan botol plastik menjadi mikroplastik dan perjalanannya ke biota laut.
* **Teknologi:** WebAR (A-Frame / Three.js).
* **Logika:** Render animasi partikel degradasi.

### Tahap 4: Data Processing (Investigasi Fisiologis - KRUSIAL)
* **Fungsi:** Fokus utama aplikasi. Simulasi kegagalan organ lambung dan usus halus.
* **Teknologi:** Three.js / WebGL.
* **Logika Visual:**
  - **Lambung:** Render model transparan dengan *shader* untuk efek cairan asam lambung. Partikel organik hancur, namun *mesh* mikroplastik tetap utuh (tidak terdegradasi).
  - **Usus Halus:** Kamera zoom-in ke mode makro (*Surface level* vili usus). Render tumpukan poligon mikroplastik yang memblokir area penyerapan. Diperlukan optimasi jumlah poligon agar browser tidak *lag*.

### Tahap 5: Verification (E-LKPD)
* **Fungsi:** Overlay UI semi-transparan (glassmorphism) di atas kanvas AR.
* **Teknologi:** React / Vue UI components.
* **Logika:** Menyimpan input kesimpulan siswa dan melakukan transmisi data ke API backend untuk Dashboard Guru.

### Tahap 6: Generalization
* **Fungsi:** Form komitmen aksi nyata siswa.
* **Teknologi:** UI standard form submission.

---

## 🎨 Kebutuhan Aset 3D Utama
Tim Visual wajib menyediakan aset `.gltf` atau `.glb` berikut:
1.  **Botol Plastik:** Low-poly.
2.  **Biota Laut:** Transparan (Ikan/Kerang).
3.  **Lambung Manusia:** Transparan untuk menunjukkan isi.
4.  **Vili Usus Halus:** Model mikroskopis bertekstur.
5.  **Partikel:** Organik (bisa dianimasikan hancur) & Mikroplastik (statis/keras).

## 📊 Optimasi Kinerja WebAR
* Gunakan model 3D yang sudah di-*bake* pencahayaannya.
* Batasi jumlah *draw calls* pada partikel cairan di dalam lambung.
* Gunakan *InstancedMesh* di Three.js jika perlu merender banyak vili usus atau partikel mikroplastik secara bersamaan untuk mencegah patah-patah di HP siswa.