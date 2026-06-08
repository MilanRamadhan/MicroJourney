'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavbarGuru from '@/components/NavbarGuru';

const siswaData = [
  { no: 1, nama: 'Budi Santoso', nis: '10293', tahap: 4, pct: 66, status: 'needsGrading', skor: '88 / 100' },
  { no: 2, nama: 'Siti Aminah', nis: '10294', tahap: 6, pct: 100, status: 'graded', skor: '95 / 100' },
  { no: 3, nama: 'Andi Wijaya', nis: '10295', tahap: 1, pct: 16, status: 'notSubmitted', skor: '-' },
  { no: 4, nama: 'Dewi Rahayu', nis: '10296', tahap: 3, pct: 50, status: 'graded', skor: '82 / 100' },
  { no: 5, nama: 'Fajar Nugroho', nis: '10297', tahap: 5, pct: 83, status: 'needsGrading', skor: '90 / 100' },
];

const statusConfig = {
  needsGrading: { label: 'Perlu Penilaian', icon: 'warning', cls: 'bg-orange-100 text-orange-700 border-orange-200', rowCls: 'bg-orange-50/50' },
  graded: { label: 'Sudah Dinilai', icon: 'check_circle', cls: 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border-[var(--color-secondary)]/20', rowCls: '' },
  notSubmitted: { label: 'Belum Mengumpulkan', icon: 'schedule', cls: 'bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)] border-[var(--color-outline-variant)]/30', rowCls: '' },
};

export default function DataSiswaPage() {
  const [search, setSearch] = useState('');

  const filtered = siswaData.filter(s =>
    s.nama.toLowerCase().includes(search.toLowerCase()) ||
    s.nis.includes(search)
  );

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-background)] min-h-screen flex flex-col">
      <NavbarGuru />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[var(--color-on-background)]">Manajemen Penilaian Kelas</h1>
            <p className="text-[var(--color-on-surface-variant)] mt-1">Daftar siswa dan status penyelesaian Modul Pembelajaran AR.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-outline)]">search</span>
              <input
                type="text"
                placeholder="Cari nama siswa..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-[var(--color-outline-variant)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
              />
            </div>
            <button className="bg-white border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] p-2 rounded-lg hover:bg-[var(--color-surface-container)] transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-outline-variant)]/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] text-sm border-b border-[var(--color-outline-variant)]/30">
                  <th className="p-4 font-semibold w-12 text-center">No</th>
                  <th className="p-4 font-semibold">Nama Siswa</th>
                  <th className="p-4 font-semibold">Progres AR</th>
                  <th className="p-4 font-semibold">Tugas Terakhir (LKPD)</th>
                  <th className="p-4 font-semibold">Skor Rata-rata</th>
                  <th className="p-4 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filtered.map((s) => {
                  const cfg = statusConfig[s.status as keyof typeof statusConfig];
                  return (
                    <tr key={s.no} className={`border-b border-[var(--color-outline-variant)]/20 hover:bg-[var(--color-surface-container-low)] transition-colors ${cfg.rowCls}`}>
                      <td className="p-4 text-center text-[var(--color-on-surface-variant)]">{s.no}</td>
                      <td className="p-4">
                        <div className="font-bold text-[var(--color-on-surface)]">{s.nama}</div>
                        <div className="text-xs text-[var(--color-on-surface-variant)]">NIS: {s.nis}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-[var(--color-surface-container)] h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${s.pct === 100 ? 'bg-[var(--color-secondary)]' : 'bg-[var(--color-primary)]'}`} style={{ width: `${s.pct}%` }} />
                          </div>
                          <span className={`text-xs font-semibold ${s.pct === 100 ? 'text-[var(--color-secondary)]' : ''}`}>
                            {s.pct === 100 ? 'Selesai (T6)' : `Tahap ${s.tahap}`}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`border px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 w-max ${cfg.cls}`}>
                          <span className="material-symbols-outlined text-[14px]">{cfg.icon}</span>
                          {cfg.label}{s.status === 'needsGrading' ? ` (Tahap ${s.tahap})` : ''}
                        </span>
                      </td>
                      <td className={`p-4 font-semibold ${s.status === 'graded' ? 'text-[var(--color-secondary)]' : 'text-[var(--color-on-surface)]'}`}>{s.skor}</td>
                      <td className="p-4 text-center">
                        {s.status === 'needsGrading' ? (
                          <Link href="/rapor-guru/penilaian-lkpd" className="inline-block bg-[var(--color-primary)] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[var(--color-primary)]/90 transition-colors shadow-sm">
                            Beri Nilai
                          </Link>
                        ) : s.status === 'graded' ? (
                          <button className="inline-block border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[var(--color-surface-container)] transition-colors">
                            Lihat Detail
                          </button>
                        ) : (
                          <button disabled className="inline-block border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] px-3 py-1.5 rounded-lg text-xs font-semibold opacity-50 cursor-not-allowed">
                            Belum Ada Data
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-[var(--color-outline-variant)]/30 flex justify-between items-center text-sm text-[var(--color-on-surface-variant)]">
            <span>Menampilkan {filtered.length} dari {siswaData.length} siswa</span>
            <div className="flex gap-1">
              <button className="p-1 border border-[var(--color-outline-variant)] rounded hover:bg-[var(--color-surface-container)]">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="p-1 px-3 border border-[var(--color-outline-variant)] rounded bg-[var(--color-primary)] text-white font-bold">1</button>
              <button className="p-1 border border-[var(--color-outline-variant)] rounded hover:bg-[var(--color-surface-container)]">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
