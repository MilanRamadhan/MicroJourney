import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function DashboardLKPD() {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-background)] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8">
        {/* Header */}
        <div className="bg-[var(--color-primary)] text-white rounded-2xl p-8 mb-8 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined" style={{ fontSize: '200px' }}>science</span>
          </div>
          <h1 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold mb-2">Lembar Kerja Peserta Didik (E-LKPD)</h1>
          <p className="text-[var(--color-primary-fixed)] mb-4 max-w-2xl">Modul Pembelajaran: Mikroplastik dan Pencemaran Lingkungan — IPA Kelas VIII / Fase D</p>
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 mt-6 max-w-3xl">
            <h3 className="font-bold flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined">flag</span> Tujuan Pembelajaran
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Peserta didik mampu mengidentifikasi jenis sampah serta membedakan bagaimana plastik besar dapat berubah menjadi partikel mikroplastik akibat fotodegradasi dan abrasi mekanis.</li>
              <li>Peserta didik mampu menjelaskan perjalanan mikroplastik di lingkungan hingga mencemari bahan pangan melalui rantai makanan.</li>
              <li>Peserta didik mampu menganalisis peran manusia sebagai pelaku utama pencemaran plastik serta merumuskan solusi konkret untuk mengatasinya.</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daftar Tugas */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-bold text-[var(--color-on-surface)] mb-4">Daftar Misi Pengamatan</h2>

            {/* Selesai */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-outline-variant)]/30 flex items-start gap-4 opacity-80">
              <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">Tahap 1-3: Asal Usul Plastik</h3>
                  <span className="bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs px-2 py-1 rounded font-bold">DINILAI: 95/100</span>
                </div>
                <p className="text-sm text-[var(--color-on-surface-variant)] mb-3">Pengamatan botol PET dan proses pelapukan mikroplastik.</p>
                <button className="text-[var(--color-primary)] text-sm font-semibold flex items-center gap-1 hover:underline">
                  Lihat Hasil <span className="material-symbols-outlined text-[16px]">visibility</span>
                </button>
              </div>
            </div>

            {/* Aktif */}
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[var(--color-primary)] flex items-start gap-4 transition hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0 shadow-lg">
                <span className="material-symbols-outlined">edit_document</span>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-lg text-[var(--color-primary)]">Tahap 4: Analisis Rantai Makanan</h3>
                  <span className="bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] text-xs px-2 py-1 rounded font-bold">AKTIF</span>
                </div>
                <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">Menganalisis pencernaan hewan laut (Ikan) menggunakan Augmented Reality untuk menemukan jejak mikroplastik.</p>
                <div className="flex gap-3">
                  <Link href="/perjalanan-belajar/4" className="bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--color-surface-container)] transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">view_in_ar</span> Buka AR
                  </Link>
                  <Link href="/e-lkpd/form-pengamatan" className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-[var(--color-primary)]/90 transition-colors flex items-center gap-2">
                    Isi Laporan <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Terkunci */}
            <div className="bg-[var(--color-surface-container-low)] p-6 rounded-2xl border border-[var(--color-outline-variant)]/30 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-outline-variant)] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">lock</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-[var(--color-outline)]">Tahap 5-6: Bioakumulasi & Dampak Manusia</h3>
                <p className="text-sm text-[var(--color-outline)] mb-2">Selesaikan laporan Tahap 4 untuk membuka materi ini.</p>
              </div>
            </div>
          </div>

          {/* Panel Kanan */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-outline-variant)]/30">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--color-secondary)]">trending_up</span> Progres Kompetensi
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Observasi Saintifik', val: 75, color: 'bg-[var(--color-primary)]', textColor: 'text-[var(--color-primary)]' },
                  { label: 'Pemecahan Masalah', val: 50, color: 'bg-[var(--color-secondary)]', textColor: 'text-[var(--color-secondary)]' },
                  { label: 'Literasi Lingkungan', val: 90, color: 'bg-[var(--color-tertiary)]', textColor: 'text-[var(--color-tertiary)]' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.label}</span>
                      <span className={`font-bold ${item.textColor}`}>{item.val}%</span>
                    </div>
                    <div className="w-full bg-[var(--color-surface-container)] h-2 rounded-full overflow-hidden">
                      <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--color-secondary-container)]/20 p-6 rounded-2xl border border-[var(--color-secondary)]/20">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[var(--color-secondary)] mt-1">lightbulb</span>
                <div>
                  <h4 className="font-bold text-[var(--color-secondary)]">Tips Guru</h4>
                  <p className="text-sm mt-1 text-[var(--color-on-surface-variant)]">Saat mengisi form Tahap 4, pastikan kamu menggunakan fitur X-Ray di dalam AR untuk melihat jelas ke dalam sistem pencernaan ikan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[var(--color-surface-container)] border-t border-[var(--color-outline-variant)] mt-10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-[var(--color-on-surface-variant)]">
          © 2024 MicroJourney AR - Sistem Manajemen Pembelajaran Terpadu
        </div>
      </footer>
    </div>
  );
}
