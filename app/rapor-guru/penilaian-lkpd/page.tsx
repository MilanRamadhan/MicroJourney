'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NavbarGuru from '@/components/NavbarGuru';

const rubrik = [
  { label: 'Keakuratan Data AR', max: 25, defaultVal: 25, desc: 'Siswa berhasil mengidentifikasi jenis ikan dan persentase polietilen dengan tepat sesuai AR.' },
  { label: 'Kedalaman Analisis', max: 40, defaultVal: 30, desc: 'Penjelasan logis tentang mengapa ikan memakan plastik (hubungan dengan plankton).' },
  { label: 'Kualitas Refleksi (HOTS)', max: 35, defaultVal: 30, desc: 'Kemampuan mengaitkan konsep bioakumulasi dengan dampak kesehatan manusia.' },
];

export default function PenilaianLKPDPage() {
  const router = useRouter();
  const [scores, setScores] = useState(rubrik.map(r => r.defaultVal));
  const [feedback, setFeedback] = useState('Kerja bagus, Budi! Analisismu tentang kemiripan mikroplastik dan plankton sudah sangat tepat. Untuk refleksi, coba cari tahu lagi zat kimia spesifik apa yang biasanya menempel pada plastik PET yang bisa mengganggu hormon manusia.');
  const [saved, setSaved] = useState(false);

  const total = scores.reduce((a, b) => a + b, 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => router.push('/rapor-guru/data-siswa'), 1500);
  }

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-background)] min-h-screen flex flex-col">
      {/* Custom Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b-4 border-[var(--color-primary)]">
        <nav className="flex justify-between items-center w-full px-6 max-w-7xl mx-auto h-20">
          <div className="flex items-center gap-2">
            <Link href="/rapor-guru/data-siswa" className="material-symbols-outlined p-2 hover:bg-[var(--color-surface-container)] rounded-full transition-colors text-[var(--color-on-surface-variant)] mr-2">arrow_back</Link>
            <span className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[var(--color-on-surface)] tracking-tight">Penilaian Tugas Budi Santoso</span>
          </div>
          <button
            form="form-penilaian"
            type="submit"
            className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[var(--color-primary)]/90 transition-colors shadow-md flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">save</span> Simpan & Kirim Nilai
          </button>
        </nav>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8">
        {saved && (
          <div className="mb-6 p-4 bg-[var(--color-secondary-container)]/40 border border-[var(--color-secondary)] rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-[var(--color-secondary)]">check_circle</span>
            <p className="font-semibold text-[var(--color-secondary)]">Nilai berhasil disimpan dan dikirim ke siswa! Mengalihkan...</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hasil Kerja Siswa */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-outline-variant)]/30">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--color-primary)]">image</span> Bukti Pengamatan AR
              </h3>
              <div className="rounded-xl overflow-hidden aspect-video relative">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZmvIGufJoKC7GBLRcB8jXymU2xlQSBKNw8QYLyU3colAzmLVf4jxXhbV2eK1tu9q8rTrFeiOCDcfaJeFnnoPeaB92r49GYHrycP80O_Yl9EYkcMzN3-Qg_jM3WZ1_TZn4D9VSlOleM_PSd-ArLZ12MBbblB3zWTUV7gCvDSQXh7NJPHGtaZ90weyOtdZ3LD4XgkjxmjXjPAO3usvudsBAvrNhqph3ARhfVKvMgr6DSxt5RXQbPL4GXeblLEQH9w-rT3g3XCOIbA" alt="Bukti AR siswa" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-xs">Diunggah: 2 menit yang lalu</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-outline-variant)]/30">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--color-primary)]">description</span> Lembar Analisis Siswa
              </h3>
              <div className="space-y-4">
                {[
                  { q: 'A. Jenis ikan apa yang kamu pindai dalam simulasi AR?', a: 'Ikan Sarden (Pemakan Plankton)', aClass: 'font-bold text-[var(--color-on-surface)]' },
                  { q: 'B. Persentase kandungan plastik (Polietilen) yang terdeteksi?', a: '72%', aClass: 'font-bold text-[var(--color-primary)]' },
                  { q: 'C. Menurut analisis kritismu, mengapa ikan tersebut bisa menelan plastik?', a: 'Karena plastik tersebut sudah hancur menjadi mikroplastik yang sangat kecil akibat proses pelapukan (Tahap 2). Bentuk dan warnanya mirip dengan plankton, sehingga ikan kecil secara tidak sengaja memakannya ketika mencari makan di laut.', aClass: 'text-[var(--color-on-surface)]' },
                  { q: 'Refleksi: Apa dampak jangka panjang jika manusia mengonsumsi ikan ini?', a: 'Jika kita terus makan ikan yang mengandung plastik, plastik tersebut akan menumpuk di tubuh kita (bioakumulasi). Ini bisa menyebabkan keracunan atau masalah pencernaan dalam jangka panjang karena plastik tidak bisa dicerna oleh manusia.', aClass: 'text-[var(--color-on-surface)]' },
                ].map((item, i) => (
                  <div key={i} className="bg-[var(--color-surface-container-low)] p-4 rounded-lg">
                    <p className="text-sm font-semibold text-[var(--color-on-surface-variant)] mb-1">{item.q}</p>
                    <p className={item.aClass}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel Penilaian */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-[var(--color-primary)]">
              <h3 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[var(--color-primary)] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">fact_check</span> Rubrik Penilaian Sains
              </h3>

              <form id="form-penilaian" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {rubrik.map((r, i) => (
                    <div key={r.label}>
                      <div className="flex justify-between items-end mb-2">
                        <label className="font-semibold text-[var(--color-on-surface)]">{r.label}</label>
                        <span className="font-bold text-[var(--color-primary)] text-xl">
                          {scores[i]}<span className="text-sm text-[var(--color-outline)] font-normal">/{r.max}</span>
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-on-surface-variant)] mb-2">{r.desc}</p>
                      <input
                        type="range" min="0" max={r.max} value={scores[i]}
                        onChange={e => setScores(prev => prev.map((v, idx) => idx === i ? Number(e.target.value) : v))}
                        className="w-full h-2 bg-[var(--color-surface-container)] rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-[var(--color-outline-variant)]/30 pt-6">
                  <div className="flex justify-between items-center bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-container)] p-4 rounded-xl">
                    <span className="font-bold text-lg">Total Nilai Akhir</span>
                    <span className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-black">{total}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block font-semibold text-[var(--color-on-surface)] mb-2">Umpan Balik Guru (Akan terkirim ke siswa)</label>
                  <textarea
                    rows={4}
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    className="w-full bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)] rounded-lg px-4 py-3 text-[var(--color-on-surface)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button type="button" className="px-4 py-2 border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] font-semibold rounded-lg hover:bg-[var(--color-surface-container)] transition-colors">
                    Tandai Revisi
                  </button>
                  <button type="submit" className="px-6 py-2 bg-[var(--color-primary)] text-white font-bold rounded-lg shadow-md hover:bg-[var(--color-primary)]/90 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">send</span> Publikasikan Nilai
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
