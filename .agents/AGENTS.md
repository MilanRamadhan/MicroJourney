# Aturan Desain Visual: Tema Petualangan (Adventure/Ocean Theme)

Dokumen ini berisi panduan desain visual wajib untuk proyek *MicroJourney AR*. Semua pengembangan antarmuka (UI) di masa mendatang **WAJIB** mematuhi panduan ini agar tidak melenceng menjadi desain *corporate/template* yang kaku.

## 1. Palet Warna Wajib
*   **Biru Laut (Primer):** `#006591`
*   **Biru Laut Gelap:** `#004c6e` / `#083b54`
*   **Hijau Alam (Selesai/Sukses):** `#006e2f`
*   **Hijau Neon (Aksi/Fokus/Glow):** `#6bff8f`
*   **Kayu (Tombol Utama):** Gradasi vertikal `#f0a345` ke `#d27b22` dengan border `#8e4912`.

## 2. Tipografi Wajib
*   **Heading/Judul:** `var(--font-outfit)` - Selalu gunakan ketebalan *Bold* (700) atau *ExtraBold* (800).
*   **Body/Isi Teks:** `var(--font-inter)` - Gunakan ketebalan *Medium* (500) atau *Regular* (400).

## 3. Bentuk & Komposisi (Shapes)
*   **DILARANG KERAS** menggunakan kotak bersudut tajam (`rounded-none`).
*   Selalu gunakan bentuk lengkung (*rounded*), pil (*full rounded*), atau bentuk abstrak tak beraturan (seperti tetesan air/pulau menggunakan `border-radius` majemuk, misal: `40% 60% 70% 30% / 40% 50% 60% 50%`).
*   Untuk HUD/Panel, gunakan gaya *Glassmorphism* (gelembung transparan) dengan `backdrop-blur`.

## 4. Tombol Utama (Call to Action)
Tombol untuk melanjutkan/memulai (seperti "Mulai Investigasi") harus mengadopsi gaya **Papan Kayu** layaknya petunjuk arah di alam liar. 
*   **Styling Utama:** `background: linear-gradient(to bottom, #f0a345, #d27b22)`, border tebal, tulisan tebal, dan efek bayangan dalam/luar untuk menciptakan ilusi 3D (paku di pinggirnya).

## 5. Ilustrasi & Latar Belakang
*   Gunakan `bg-[url('/hero-bg.png')]` untuk halaman pembuka (Stage Intro) guna menyelaraskan *vibes* dengan *landing page*.
*   Gunakan aset karakter maskot (`/mika.png` atau ikon grafis lainnya) agar halaman tidak sepi.

---
*Aturan ini dibuat secara otomatis melalui persetujuan pengguna untuk menjaga konsistensi identitas visual MicroJourney AR sebagai "Game Petualangan Edukasi", bukan aplikasi kuesioner kaku.*
