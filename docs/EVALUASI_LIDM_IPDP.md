# Hasil Evaluasi & Strategi Pengembangan MicroJourney AR (Untuk LIDM Divisi IPDP)

## 1. Analisis Kebutuhan Sistem (Dashboard Guru)
**Apakah Dashboard Guru Diperlukan?**
Sangat mutlak diperlukan. Dalam kompetisi IPDP, inovasi pembelajaran tidak hanya dinilai dari interaktivitas bagi siswa, melainkan juga seberapa besar inovasi tersebut **membantu tugas pedagogis dan administratif Guru**.

Jika data E-LKPD hanya tersimpan di perangkat siswa atau hilang setelah browser ditutup, inovasi gagal dalam aspek manajemen kelas.
**Fungsi Esensial Dashboard Guru:**
*   **Real-time Monitoring:** Memantau progres siswa per tahap secara langsung.
*   **Automated Assessment:** Merekam dan mengumpulkan kesimpulan E-LKPD siswa (Tahap 5 & 6) secara otomatis untuk dinilai.
*   **Learning Analytics:** Menampilkan analitik di area mana mayoritas siswa kesulitan atau membuat kesalahan, sebagai bahan evaluasi pembelajaran di kelas.

---

## 2. Peningkatan Interaktivitas Pembelajaran (Dari Pasif ke Aktif)
Kelemahan sistem saat ini adalah kecenderungan siswa hanya menjadi "penonton" animasi AR. Agar memenuhi standar *Discovery Learning* yang kuat, interaksi pasif harus diubah menjadi **Eksplorasi Aktif (Virtual Lab)**.

**Ide Peningkatan per Tahap:**
*   **Tahap 2 (Degradasi Plastik):** 
    Siswa diberikan kontrol (slider/tombol) untuk mensimulasikan faktor alam (Sinar UV, Ombak Laut). Siswa harus mengaktifkan faktor-faktor tersebut secara mandiri untuk melihat botol hancur menjadi mikroplastik.
*   **Tahap 3 (Rantai Makanan):**
    Diubah menjadi simulasi drag-and-drop. Siswa harus memindahkan plankton (mengandung mikroplastik) ke ikan, sehingga indikator toksisitas pada ikan naik, yang akhirnya bermuara ke manusia.
*   **Tahap 4 (Eksperimen Fisiologis - FOKUS UTAMA):**
    Siswa diberikan semacam "pipet virtual" berisi Asam Lambung (HCl) dan Enzim Protease. 
    *   Jika HCl disemprotkan ke objek daging (organik), daging akan hancur tercerna. 
    *   Jika HCl disemprotkan ke objek mikroplastik (sintetik), tidak terjadi reaksi apa-apa. 
    Siswa harus menemukan kesimpulan sendiri dari hasil uji coba ini.

---

## 3. Aspek Kritis Tambahan untuk Penilaian Juri LIDM

**A. Inklusivitas dan Aksesibilitas**
*   Aplikasi harus bisa berjalan di smartphone *low-end*. 
*   Diperlukan implementasi *Progressive Web App (PWA)* atau *Caching* agar setelah halaman terbuka, aset 3D bisa dimuat tanpa banyak menghabiskan kuota atau bisa diakses dengan sinyal minimal.
*   Menyediakan mode "Lite" (2D) jika AR di perangkat siswa tidak mendukung.

**B. Gamifikasi dan Penghargaan (Rewards)**
*   Memberikan sistem umpan balik instan (Instant Feedback). Saat bereksperimen, siswa langsung diberi tahu dampaknya.
*   Memberikan lencana digital (Badge) seperti *"Detektif Plastik"* setelah berhasil menyelesaikan semua tahap eksperimen.

**C. Social Learning (Pembelajaran Kolaboratif)**
*   Tahap 6 (Aksi Nyata) dapat dihubungkan ke fitur semacam *Digital Mading* atau *Social Wall* di dalam sistem.
*   Siswa dapat saling melihat komitmen yang dibuat temannya, mendukung nilai P5 (Projek Penguatan Profil Pelajar Pancasila), yaitu Gotong Royong dan Kepedulian Lingkungan.

---

## Kesimpulan Strategi Pitching Proposal
Untuk proposal dan penjurian, fokuskan presentasi pada transformasi dari sekadar **"Buku Teks 3D"** menjadi sebuah **"Laboratorium Virtual Biologi"**. Titik berat utama adalah inovasi yang menjembatani kelemahan pemahaman konsep abstrak dengan cara eksperimen virtual (Siswa) yang hasilnya bisa terukur dan terpantau dengan mudah (Guru).
