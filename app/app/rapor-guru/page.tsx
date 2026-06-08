'use client';

import Link from 'next/link';
import NavbarGuru from '@/components/NavbarGuru';

const metrics = [
  { label: 'Total Siswa Aktif', value: '32', badge: '+2 minggu ini', badgeColor: 'text-[var(--color-secondary)] bg-[var(--color-secondary)]/10', borderColor: 'border-l-[var(--color-primary)]' },
  { label: 'Rata-rata Kelas', value: '85', suffix: '/100', badge: '↑5%', badgeColor: 'text-[var(--color-secondary)] font-bold', borderColor: 'border-l-[var(--color-secondary)]' },
  { label: 'Penyelesaian Misi AR', value: '78%', sub: 'dari total modul', borderColor: 'border-l-[var(--color-tertiary)]' },
  { label: 'Perlu Penilaian (LKPD)', value: '12', valueColor: 'text-orange-600', link: '/rapor-guru/data-siswa', borderColor: 'border-l-orange-500' },
];

const tpData = [
  { label: 'TP 1: Mengidentifikasi Jenis Plastik (Tahap 1-2)', pct: 90, color: 'bg-[var(--color-secondary)]', text: '90% Tuntas', textColor: 'text-[var(--color-secondary)]' },
  { label: 'TP 2: Analisis Rantai Makanan (Tahap 3-4)', pct: 75, color: 'bg-[var(--color-tertiary)]', text: '75% Tuntas', textColor: 'text-[var(--color-tertiary)]' },
  { label: 'TP 3: Dampak Bioakumulasi (Tahap 5-6)', pct: 45, color: 'bg-orange-500', text: '45% Tuntas', textColor: 'text-orange-500', warning: 'Titik Kritis: Banyak siswa kesulitan pada konsep ini.' },
];

export default function DashboardGuru() {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-background)] min-h-screen flex flex-col">
      <NavbarGuru />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[var(--color-on-background)]">Overview Kelas VII-A</h1>
            <p className="text-[var(--color-on-surface-variant)] mt-1">Materi: Pencemaran Mikroplastik & Rantai Makanan</p>
          </div>
          <button className="bg-white border border-[var(--color-outline-variant)] text-[var(--color-primary)] font-semibold px-4 py-2 rounded-lg hover:bg-[var(--color-surface-container)] transition-colors flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">download</span> Unduh Laporan PDF
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((m) => (
            <div key={m.label} className={`bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-outline-variant)]/30 border-l-4 ${m.borderColor}`}>
              <p className="text-sm text-[var(--color-on-surface-variant)] font-semibold mb-1">{m.label}</p>
              <div className="flex items-end gap-3">
                <h3 className={`font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold ${m.valueColor ?? 'text-[var(--color-on-surface)]'}`}>
                  {m.value}{m.suffix && <span className="text-lg text-[var(--color-outline)]">{m.suffix}</span>}
                </h3>
                {m.badge && (
                  <span className={`text-xs px-2 py-1 rounded font-bold mb-1 ${m.badgeColor}`}>{m.badge}</span>
                )}
                {m.sub && <p className="text-xs text-[var(--color-on-surface-variant)] mb-1 ml-1">{m.sub}</p>}
                {m.link && (
                  <Link href={m.link} className="text-xs text-[var(--color-primary)] font-bold mb-1 hover:underline cursor-pointer flex items-center">
                    Lihat<span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Grafik KKTP */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-outline-variant)]/30">
            <h3 className="font-bold text-lg text-[var(--color-on-surface)] flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-[var(--color-primary)]">bar_chart</span>
              Grafik Ketercapaian Tujuan Pembelajaran (KKTP)
            </h3>
            <div className="space-y-6">
              {tpData.map((tp) => (
                <div key={tp.label}>
                  <div className={`flex justify-between text-sm mb-2 font-semibold`}>
                    <span>{tp.label}</span>
                    <span className={tp.textColor}>{tp.text}</span>
                  </div>
                  <div className="w-full bg-[var(--color-surface-container)] h-3 rounded-full overflow-hidden flex">
                    <div className={`${tp.color} h-full`} style={{ width: `${tp.pct}%` }} />
                    <div className="bg-red-400 h-full" style={{ width: `${100 - tp.pct}%` }} />
                  </div>
                  {tp.warning && (
                    <p className="text-xs mt-2 text-red-600 font-medium bg-red-50 p-2 rounded">
                      <span className="material-symbols-outlined text-[12px] inline-block mr-1">warning</span>
                      {tp.warning}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Aktivitas Terkini */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-outline-variant)]/30">
            <h3 className="font-bold text-lg text-[var(--color-on-surface)] flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-[var(--color-primary)]">history</span>
              Notifikasi & Aktivitas Terbaru
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Budi Santoso', time: '2 menit yang lalu', sub: 'Butuh Penilaian', link: '/rapor-guru/penilaian-lkpd', icon: 'assignment_turned_in', iconColor: 'text-[var(--color-primary)] bg-[var(--color-primary)]/10' },
                { name: 'Siti Aminah', time: '15 menit yang lalu', sub: 'Butuh Penilaian', link: '/rapor-guru/penilaian-lkpd', icon: 'assignment_turned_in', iconColor: 'text-[var(--color-primary)] bg-[var(--color-primary)]/10' },
                { name: 'Kelas VII-A mencapai milestone "Pengamat Lingkungan"', time: '1 hari yang lalu', sub: 'Otomatis dari Sistem AR', icon: 'emoji_events', iconColor: 'text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10' },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-4 p-3 hover:bg-[var(--color-surface-container-low)] rounded-lg transition-colors border border-transparent hover:border-[var(--color-outline-variant)]/30 ${item.link ? 'cursor-pointer' : ''}`} onClick={() => item.link && (window.location.href = item.link)}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.iconColor}`}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-on-surface)]">
                      {i < 2 ? `${item.name} telah mengumpulkan E-LKPD Tahap 4` : item.name}
                    </p>
                    <p className="text-xs text-[var(--color-on-surface-variant)]">{item.time} · {item.sub}</p>
                  </div>
                  {item.link && <span className="ml-auto material-symbols-outlined text-[var(--color-outline)] text-sm">chevron_right</span>}
                </div>
              ))}
            </div>
            <Link href="/rapor-guru/data-siswa" className="block w-full mt-4 text-[var(--color-primary)] font-semibold text-sm hover:underline text-center">
              Lihat Semua Aktivitas Siswa
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
