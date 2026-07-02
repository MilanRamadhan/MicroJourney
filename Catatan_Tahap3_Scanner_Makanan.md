# 📝 Catatan Tugas — Tahap 3: Scanner Makanan (Deteksi Mikroplastik)

> Untuk: rekan tim yang mengerjakan model AI
> Proyek: **MicroJourney AR** (LIDM 2026 — media pembelajaran IPA SMP tentang mikroplastik)
> Status: **fitur baru, belum dibuat.** Catatan ini = brief lengkap untuk dikerjakan.

---

## 1. Gambaran Fitur

Di aplikasi MicroJourney AR ada **Tahap 3 (Kontaminasi Pangan)**. Saat ini siswa **memilih makanan dari daftar secara manual**. Kita mau menambah opsi **"Scan Makanan"**: siswa mengarahkan kamera HP ke makanan → AI mendeteksi jenis makanannya → aplikasi menampilkan **tingkat risiko kandungan mikroplastik**.

**Contoh:** scan ikan → "Risiko TINGGI (bioakumulasi laut)". Scan ayam → "Risiko RENDAH (hewan darat)".

> Catatan: **Tahap 1** sudah punya scanner untuk PLASTIK (pakai model siap-pakai COCO-SSD). Tugas ini BERBEDA — khusus MAKANAN, dan butuh model yang dilatih sendiri.

---

## 2. Aturan Penting (jangan dilanggar)

- **JANGAN binary "ada / tidak ada".** Secara ilmiah, mikroplastik ditemukan di banyak makanan. Jadi gunakan **Meter Risiko 3 level: Tinggi / Sedang / Rendah**, bukan "bebas mikroplastik".
- **Setiap hasil harus ada PENJELASAN mekanismenya** (kenapa berisiko), bukan cuma label.

---

## 3. Pendekatan Teknis

Model plastik Tahap 1 pakai **COCO-SSD** (siap pakai), tapi COCO-SSD **tidak punya kelas** ikan/ayam/udang/garam. Jadi untuk makanan **harus latih model sendiri.**

➡️ **Gunakan Google Teachable Machine** (gratis, di browser): `teachablemachine.withgoogle.com` → **Image Project → Standard image model**.
➡️ Export ke **TensorFlow.js** (supaya bisa dipasang di web, stack-nya sama dengan aplikasi).

---

## 4. Daftar Kelas yang Dilatih (target ±8 kelas + background)

| Kelas | Meter Risiko | Mekanisme (untuk ditampilkan di app) |
|-------|--------------|--------------------------------------|
| **ikan** | 🔴 Tinggi | Bioakumulasi mikroplastik dari laut |
| **seafood** (udang/kerang) | 🔴 Sangat Tinggi | *Filter feeder* — menyaring air laut |
| **garam** | 🔴 Tinggi | Berasal dari air laut tercemar |
| **minuman_kemasan** | 🔴 Tinggi | Partikel dari botol & tutup plastik |
| **mie_instan** | 🟡 Sedang | Kemasan plastik + penyajian panas |
| **sayur_buah** | 🟡 Sedang | Dari tanah / air irigasi |
| **ayam** | 🟢 Rendah | Hewan darat, paparan jauh lebih kecil |
| **nasi** (atau nasi/telur) | 🟢 Rendah | Paparan kecil |
| **background** | — | Foto BUKAN makanan (meja, tangan, dinding) → biar AI tidak asal nebak |

> Kalau akurasi susah, **boleh gabung kelas yang mirip** (mis. udang+kerang jadi satu "seafood", air+es teh jadi "minuman_kemasan"). Risikonya sama, jadi tetap valid secara pembelajaran. Target akhir bisa turun jadi ~7 kelas.

---

## 5. Dataset (sudah ditemukan di Kaggle)

Ambil **HANYA kelas relevan** dari tiap dataset, susun ke **folder per kategori** (jangan campur jadi satu tumpukan).

| Folder kategori | Sumber dataset | Kelas yang dicomot |
|-----------------|----------------|--------------------|
| ikan/ | Food-101, Padang Food | grilled_salmon, sashimi, sushi, ikan |
| seafood/ | Food-101 | oysters, mussels, scallops (+udang manual) |
| ayam/ | Food-101, Indonesian, Padang | chicken_wings, ayam goreng/pop |
| nasi/ | Indonesian, Padang | nasi (+telur) |
| mie_instan/ | Indonesian | mie/indomie (cek nama kelas; kalau tak ada → foto manual) |
| sayur_buah/ | Fruit & Vegetable Recognition | ambil subset, gabung |
| minuman_kemasan/ | Cold Drinks Inventory + Glass and Plastic Bottles | botol/produk minuman |
| garam/ | ❌ tidak ada | **FOTO MANUAL ~100** |
| background/ | ❌ | **FOTO MANUAL** (acak, bukan makanan) |

**Link dataset:**
- Food-101 — kaggle.com/datasets/crybread/food101
- Indonesian Food — kaggle.com/datasets/theresalusiana/indonesian-food
- Padang Food — kaggle.com/datasets/faldoae/padangfood
- Fruit & Vegetable — kaggle.com/datasets/kritikseth/fruit-and-vegetable-image-recognition
- Cold Drinks Inventory — kaggle.com/datasets/faseeh001/cold-drinks-inventory-dataset
- Glass and Plastic Bottles — kaggle.com/datasets/antonpivnenko/glass-and-plastic-bottles

---

## 6. Langkah Pengerjaan

**A. Siapkan data**
1. Download dataset, ekstrak.
2. Buat folder per kategori (lihat tabel #5).
3. Salin hanya kelas relevan ke folder masing-masing.
4. Seimbangkan: **~100–150 foto per kelas** (buang yang buram/aneh).
5. Foto manual yang kurang: **garam, udang, background**.
6. Utamakan foto yang mirip kondisi nyata (makanan di piring, cahaya kelas) — bukan foto studio.

**B. Latih di Teachable Machine**
1. Buka teachablemachine.withgoogle.com → Image Project → Standard.
2. Buat 1 class per folder, upload fotonya.
3. Klik **Train Model**.
4. Tes pakai webcam — arahkan ke makanan nyata, cek apakah tebakannya benar.
5. Kalau sering salah → tambah/perbaiki foto, atau gabung kelas yang mirip, latih ulang.

**C. Export**
1. Klik **Export Model → TensorFlow.js → Download**.
2. Akan dapat 3 file: **`model.json`**, **`weights.bin`** (kadang `weights.bin` beberapa file), **`metadata.json`**.
3. **Kirim ketiga file ini ke [Milan / integrator]** untuk dipasang ke aplikasi.

---

## 7. Yang Diserahkan ke Integrator

- ✅ Folder `model.json` + `weights.bin` + `metadata.json` (hasil export TF.js)
- ✅ Daftar nama kelas final (kalau ada perubahan dari tabel #4)
- ✅ Catatan akurasi: kelas mana yang sering ketuker (biar integrator siapkan fallback manual)

Integrasi ke aplikasi (load model, klasifikasi frame kamera, tampilkan Meter Risiko + estimasi partikel + tombol pilih manual) **dikerjakan oleh integrator**, bukan tugas kamu. Tugasmu = **data + model terlatih**.

---

## 8. Catatan Akurasi (wajib diperhatikan)

Makanan yang mirip secara visual gampang ketuker:
- Ikan goreng ↔ ayam goreng
- Garam ↔ gula
- Air kemasan ↔ es teh kemasan

**Solusi:** pilih kategori yang khas, perbanyak variasi foto, atau gabung yang mirip. Aplikasi tetap menyediakan tombol "pilih manual" kalau AI ragu — jadi tidak harus 100% sempurna, yang penting kelas-kelas utama (ikan, ayam, seafood, minuman kemasan) terbaca cukup akurat untuk demo.
