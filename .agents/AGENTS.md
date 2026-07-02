# MicroJourney AR — Panduan Pengembangan Tim

> Dokumen ini adalah **panduan utama** untuk semua developer/agent yang melanjutkan proyek ini.
> Baca seluruh dokumen sebelum menulis satu baris kode pun.

---

## 🗺️ Gambaran Umum Proyek

**MicroJourney AR** adalah aplikasi edukasi interaktif berbasis Next.js 16 untuk mata pelajaran IPA Kelas VIII
tentang bahaya mikroplastik. Siswa menjalani 6 tahap "perjalanan" berbasis sains, mulai dari AR Scanner
hingga Sumpah Komitmen. Guru memantau rekap nilai melalui dashboard.

**Stack:**
- Framework: Next.js 16.2.7 (App Router, Turbopack)
- Styling: Tailwind CSS (utility-first, vanilla CSS untuk animasi custom)
- State Global: Zustand (`lib/authStore.ts`, `lib/journeyStore.ts`)
- Database: MongoDB Atlas via Mongoose (hanya untuk LKPD & progress)
- Deploy: Vercel (repo: `MilanRamadhan/MicroJourney` ← **Vercel membaca repo ini**)

---

## ⚠️ PENTING: Konteks Deploy

```
Developer push ke:  muhammadsyukri19/MicroJourney
Vercel membaca dari: MilanRamadhan/MicroJourney
```

> Agar perubahan masuk ke Vercel, **Milan harus sync** repo-nya dari repo utama (syukri),
> ATAU Vercel dikonfigurasi ulang ke repo syukri. Koordinasikan ini terlebih dahulu.

---

## 🎨 Aturan Desain Visual (WAJIB DIIKUTI)

### Palet Warna
| Token | Hex | Penggunaan |
|-------|-----|-----------|
| Biru Laut (Primer) | `#006591` | CTA utama, link aktif, aksen |
| Biru Laut Gelap | `#004c6e` / `#083b54` | Background gelap, heading |
| Hijau Alam | `#006e2f` | Selesai, sukses, tombol guru |
| Hijau Neon | `#6bff8f` | Glow efek, highlight aktif |
| Kayu | `#f0a345` → `#d27b22` | Tombol CTA utama siswa (kayu) |
| Merah Bahaya | `#ba1a1a` | Error, data berbahaya, top loader |

### Tipografi
- **Heading:** `var(--font-outfit)` — weight 700/800
- **Body:** `var(--font-inter)` — weight 400/500
- **Navbar Ukiran:** `var(--font-fredoka)` — weight 600

### Prinsip Desain
- ❌ DILARANG: kotak bersudut tajam (`border-radius: 0`)
- ✅ WAJIB: border-radius minimal `rounded-xl` (12px)
- ✅ Panel HUD: Glassmorphism dengan `backdrop-blur`
- ✅ Tombol CTA: gaya kayu dengan gradient + border tebal + shadow 3D
- ✅ Blob organik untuk dekorasi background (bukan lingkaran/kotak biasa)

---

## 🏗️ Struktur Folder

```
app/
  layout.tsx              ← Root layout (font, metadata, NextTopLoader)
  template.tsx            ← Page transition (fade per navigasi)
  page.tsx                ← Landing page (Beranda)
  login/
    page.tsx              ← Halaman login (hanya komposisi organism)
  journey/
    layout.tsx            ← Layout journey (Navbar + footer)
    page.tsx              ← Peta ekspedisi 6 tahap
    tahap-1/page.tsx      ← AR Scanner (simulasi)
    tahap-2/page.tsx      ← Proses Pelapukan (video + virtual lab + LKPD)
    tahap-3/page.tsx      ← Kontaminasi Pangan (scanner makanan)
    tahap-4/page.tsx      ← Organ Pencernaan (simulasi anatomi)
    tahap-5/page.tsx      ← E-LKPD Interaktif
    tahap-6/page.tsx      ← Sumpah Komitmen + submit data
  dashboard/page.tsx      ← Dashboard guru (rekap nilai + manajemen siswa)
  materi/page.tsx         ← Materi IPA
  e-lkpd/page.tsx         ← Modul E-LKPD mandiri
  api/
    lkpd/route.ts         ← POST (submit) / GET (rekap) LKPD → MongoDB
    progress/route.ts     ← GET/POST progress tahap siswa → MongoDB

components/
  Navbar.tsx              ← Navbar papan kayu (Desktop) + mobile header
  BottomNav.tsx           ← Bottom navigation bar (Mobile)
  login/                  ← Komponen login (Atomic Design)
    HeroPanel.tsx         ← Organism: panel kiri hero
    LoginForm.tsx         ← Organism: form login + logika
    ModeSwitcher.tsx      ← Molecule: tab Siswa/Guru
    ContextBanner.tsx     ← Molecule: banner info mode
    CredentialHint.tsx    ← Molecule: hint demo akun
  dashboard/
    ImportCsvModal.tsx    ← Organism: import siswa massal via CSV
  ui/
    InputField.tsx        ← Atom: input + label + icon + password toggle
  stages/
    Stage2Weathering.tsx  ← Komponen Tahap 2 (video + lab + LKPD inline)
    StageIntro.tsx        ← Intro setiap tahap (hero bergaya petualangan)

lib/
  authStore.ts            ← Zustand: auth (login/logout/register siswa/guru)
  journeyStore.ts         ← Zustand: progress perjalanan siswa
  mongodb.ts              ← Koneksi MongoDB (singleton)
  foods.ts                ← Data makanan Tahap 3 (berbasis riset BRIN)
  organs.ts               ← Data organ pencernaan Tahap 4
  stagesData.ts           ← Metadata 6 tahap perjalanan
  api/
    client.ts             ← ⭐ API client terpusat (mock/real toggle)
    types.ts              ← Shared TypeScript types API
    mock.ts               ← Mock data untuk dev/demo tanpa backend
  types/
    login.types.ts        ← Types halaman login
  utils/
    login.utils.ts        ← Utilitas validasi role & redirect
    csv.utils.ts          ← Parser CSV + auto-generate kredensial siswa
```

---

## 🔌 Sistem API

### Toggle Mock vs Real

```env
# .env.local
NEXT_PUBLIC_USE_MOCK=true   # dev / demo tanpa backend
NEXT_PUBLIC_USE_MOCK=false  # production dengan MongoDB
MONGODB_URI=mongodb+srv://...
```

### Cara Pakai API Client

```ts
import { api } from '@/lib/api/client';

// Ambil rekap LKPD (mock jika USE_MOCK=true)
const submissions = await api.lkpd.getAll();

// Submit E-LKPD siswa
await api.lkpd.submit({ studentName, studentClass, ... });

// Update progress tahap
await api.progress.complete(studentId, completedStage, xpEarned);
```

### Endpoint yang Sudah Ada

| Method | Endpoint | Fungsi | Status |
|--------|----------|--------|--------|
| POST | `/api/lkpd` | Submit E-LKPD siswa | ✅ Real (MongoDB) |
| GET | `/api/lkpd` | Ambil semua submission | ✅ Real (MongoDB) |
| GET | `/api/progress?studentId=X` | Ambil progress siswa | ✅ Real (MongoDB) |
| POST | `/api/progress` | Update progress tahap | ✅ Real (MongoDB) |

### Endpoint yang BELUM Ada (TODO Backend)

| Method | Endpoint | Fungsi | Prioritas |
|--------|----------|--------|-----------|
| POST | `/api/users/students` | Daftarkan siswa (saat ini Zustand lokal) | 🔴 Tinggi |
| GET | `/api/users/students?teacher=X` | Daftar siswa per guru | 🔴 Tinggi |
| DELETE | `/api/users/:id` | Hapus akun siswa/guru | 🟡 Sedang |
| POST | `/api/auth/login` | Login via server (saat ini Zustand) | 🟡 Sedang |
| GET | `/api/lkpd?class=VIII-A` | Filter rekap per kelas | 🟢 Rendah |

---

## 🗺️ Alur Perjalanan Siswa (6 Tahap)

```
[Beranda] → Login → [Peta Ekspedisi /journey]
  │
  ├─ Tahap 1: AR Scanner Plastik          (/journey/tahap-1)
  │   └─ Siswa "scan" kode plastik → identifikasi jenis
  │
  ├─ Tahap 2: Proses Pelapukan            (/journey/tahap-2)  
  │   ├─ Tonton video panduan (wajib selesai dulu)
  │   ├─ Virtual Lab (simulasi UV + ombak)
  │   └─ LKPD inline (muncul setelah lab selesai)
  │
  ├─ Tahap 3: Kontaminasi Pangan          (/journey/tahap-3)
  │   ├─ Intro bergaya lab (berbeda dari tahap lain)
  │   ├─ Scanner 5 makanan (data berbasis BRIN & Leslie et al. 2022)
  │   └─ Kalkulasi partikel otomatis
  │
  ├─ Tahap 4: Organ Pencernaan            (/journey/tahap-4)
  │   └─ Simulasi visual anatomi tubuh manusia
  │
  ├─ Tahap 5: E-LKPD Interaktif          (/journey/tahap-5)
  │   └─ Kuis + pertanyaan esai
  │
  └─ Tahap 6: Sumpah Komitmen            (/journey/tahap-6)
      └─ Teks sumpah + SUBMIT semua data ke MongoDB
```

---

## 👩‍🏫 Alur Guru

```
Login (tab Guru) → Dashboard Guru (/dashboard)
  ├─ Lihat rekap nilai semua siswa
  ├─ Filter per kelas
  ├─ Klik siswa → detail jawaban LKPD
  ├─ Daftarkan siswa (manual 1 per 1)
  └─ Import massal via CSV:
      ├─ Upload daftar nama saja (.csv)
      ├─ Isi kelas default sekali → apply ke semua
      ├─ Sistem auto-generate: email = slug@mj.id, password = slug123
      ├─ Preview & edit kelas per baris jika perlu
      └─ Download file kredensial → bagikan ke siswa
```

---

## 📦 State Management

### `authStore` (Zustand + localStorage)
- Menyimpan daftar user (guru + siswa) di localStorage
- Sementara tidak ada backend user — semua disimpan di browser
- **TODO**: Migrasi ke database agar data tidak hilang saat clear browser

### `journeyStore` (Zustand + localStorage)
- Menyimpan: nama siswa, tahap selesai, jawaban LKPD, makanan dipilih, organ dipilih
- Di-submit ke MongoDB hanya di Tahap 6

---

## 🚧 Yang Perlu Dilanjutkan

### Prioritas Tinggi
- [ ] **Backend user management**: Pindahkan data akun dari localStorage ke MongoDB
      agar data siswa tidak hilang saat browser di-clear
- [ ] **Sinkronisasi repo Vercel**: Konfigurasikan Vercel membaca dari repo syukri
      (bukan repo Milan) untuk deployment otomatis
- [ ] **Audio panduan Tahap 2**: Belum ada suara instruksi untuk siswa (permintaan lama)

### Prioritas Sedang
- [ ] **Fitur filter kelas** di API GET /api/lkpd (saat ini fetch semua data)
- [ ] **Halaman rapor per siswa** yang bisa diprint/export PDF oleh guru
- [ ] **Real AR integration**: Tahap 1 saat ini masih simulasi klik — integrasikan
      kamera nyata untuk scan QR/kode plastik

### Prioritas Rendah
- [ ] **Sertifikat PDF**: Di Tahap 6, siswa mendapat sertifikat digital yang bisa diunduh
- [ ] **Leaderboard kelas**: Ranking partikel per siswa untuk motivasi kompetitif
- [ ] **Notifikasi guru**: Email/push jika ada siswa baru submit LKPD

---

## 🔑 Akun Demo

| Role | Email | Password |
|------|-------|----------|
| Guru | `guru1@gmail.com` | `guruguru` |
| Super Admin | `superadmin@gmail.com` | `superadmin` |
| Siswa | Dibuat guru via dashboard | Auto-generate oleh sistem |

---

## 📚 Referensi Ilmiah (untuk data di aplikasi)

Data sains dalam aplikasi ini berbasis:
1. **Leslie et al. (2022)** — Discovery of microplastics in human blood (*Environment International*)
2. **BRIN (2023)** — Kontaminasi mikroplastik pada garam rakyat Indonesia
3. Data biomagnifikasi kerang/seafood dari literatur ekologi laut Indonesia

Jangan mengubah data `lib/foods.ts` tanpa referensi ilmiah yang valid — ini krusial untuk
presentasi ke juri/dosen yang mungkin akan menyanggah validitas data.
