'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { stages } from '@/lib/stagesData';

interface Progress {
  completedStages: number[];
  currentStage: number;
  xp: number;
}

function StageStatus({ stageId, progress }: { stageId: number; progress: Progress | null }) {
  if (!progress) return null;
  if (progress.completedStages.includes(stageId)) return 'completed';
  if (stageId === progress.currentStage) return 'current';
  return 'locked';
}

const stagePositions = [
  { top: '80px', left: '50px' },
  { top: '280px', left: '250px' },
  { top: '80px', left: '450px' },
  { top: '280px', left: '600px' },
  { top: '80px', left: '780px' },
  { top: '280px', left: '950px' },
];

export default function PerjalananBelajarPage() {
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    fetch('/api/progress?studentId=student_001')
      .then(r => r.json())
      .then(setProgress)
      .catch(() => setProgress({ completedStages: [1, 2, 3, 4, 5, 6], currentStage: 6, xp: 1650 }));
  }, []);

  const completedCount = progress?.completedStages?.length ?? 0;
  const totalXP = progress?.xp ?? 0;
  const progressPercent = Math.round((completedCount / stages.length) * 100);

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-background)] min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-6 py-16 adventure-map min-h-[calc(100vh-80px)] w-full">
        {/* Header */}
        <header className="mb-16 text-center max-w-2xl mx-auto">
          <h1 className="font-[family-name:var(--font-plus-jakarta)] text-5xl font-extrabold text-[var(--color-primary)] mb-3 tracking-tight">
            Ekspedisi Microplastics
          </h1>
          <p className="text-lg text-[var(--color-on-surface-variant)]">
            Ikuti jejak perjalanan plastik dari tangan kita hingga kembali ke meja makan. Selesaikan setiap misi untuk menjadi Penjaga Samudra!
          </p>
        </header>

        {/* Journey Map */}
        <div className="relative w-full overflow-x-auto pb-20 pt-10 no-scrollbar">
          <div className="min-w-[1100px] relative h-[500px]">
            {/* SVG Path */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" fill="none" viewBox="0 0 1100 500">
              <path
                d="M100,150 C250,150 250,350 400,350 C550,350 550,150 700,150 C850,150 850,350 1050,350"
                fill="none" stroke="#cbd5e1" strokeLinecap="round" strokeWidth="8"
              />
              {completedCount > 0 && (
                <path
                  className="path-dash-animation"
                  d={completedCount >= 6
                    ? "M100,150 C250,150 250,350 400,350 C550,350 550,150 700,150 C850,150 850,350 1050,350"
                    : completedCount >= 3
                    ? "M100,150 C250,150 250,350 400,350 C550,350 550,150 700,150"
                    : "M100,150 C250,150 250,350 400,350"}
                  fill="none" stroke="#6bff8f" strokeLinecap="round" strokeWidth="8"
                />
              )}
            </svg>

            {/* Stage Cards */}
            {stages.map((stage, idx) => {
              const status = progress
                ? ((progress.completedStages ?? []).includes(stage.id) ? 'completed'
                  : stage.id === progress.currentStage ? 'current'
                  : 'locked')
                : (idx < 3 ? 'completed' : idx === 3 ? 'current' : 'locked');
              const pos = stagePositions[idx];

              return (
                <div
                  key={stage.id}
                  className={`absolute ${status === 'current' ? 'z-10 floating' : 'group'} ${status === 'locked' ? 'opacity-60 grayscale cursor-not-allowed' : ''}`}
                  style={{ top: pos.top, left: pos.left }}
                >
                  {status === 'current' ? (
                    <div className="relative bg-[var(--color-primary)] p-6 rounded-xl shadow-xl border-4 border-[var(--color-primary-container)] w-56 transform scale-110">
                      <div className="absolute -top-5 -left-5 w-12 h-12 bg-[var(--color-tertiary-fixed)] text-[var(--color-on-tertiary-fixed)] rounded-full flex items-center justify-center font-extrabold shadow-lg border-2 border-[var(--color-primary)] ring-4 ring-white text-lg">
                        {stage.id}
                      </div>
                      <div className="mb-4 text-white">
                        <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>{stage.icon}</span>
                      </div>
                      <h3 className="font-[family-name:var(--font-plus-jakarta)] text-[18px] text-white mb-2 leading-tight font-bold">{stage.title}</h3>
                      <p className="text-[13px] text-[var(--color-primary-fixed)] leading-tight mb-4">{stage.description}</p>
                      <Link
                        href={`/perjalanan-belajar/${stage.id}`}
                        className="block w-full bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] font-bold py-2 rounded-lg text-sm text-center hover:bg-[var(--color-secondary-fixed)] transition-colors active:scale-95"
                      >
                        MULAI MISI AR
                      </Link>
                    </div>
                  ) : (
                    <div className={`relative p-6 rounded-xl shadow-md border-2 w-48 transition-all ${
                      status === 'completed'
                        ? 'bg-[var(--color-surface-container-lowest)] border-[var(--color-secondary-container)] hover:-translate-y-2 cursor-pointer'
                        : 'bg-[var(--color-surface-container-low)] border-[var(--color-outline-variant)]'
                    }`}>
                      <div className={`absolute -top-4 -left-4 w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg text-sm ${
                        status === 'completed'
                          ? 'bg-[var(--color-secondary)] text-[var(--color-on-secondary)]'
                          : 'bg-[var(--color-outline)] text-white'
                      }`}>
                        {stage.id}
                      </div>
                      <div className={`mb-4 text-4xl ${status === 'completed' ? 'text-[var(--color-secondary)]' : 'text-[var(--color-outline)]'}`}>
                        <span className="material-symbols-outlined text-[48px]">{stage.icon}</span>
                      </div>
                      <h3 className="font-semibold text-sm text-[var(--color-on-surface)] mb-1">{stage.title}</h3>
                      <p className="text-[12px] text-[var(--color-on-surface-variant)] leading-tight">{stage.description}</p>
                      {status === 'completed' ? (
                        <div className="mt-3 flex items-center text-[var(--color-secondary)] text-[10px] font-bold">
                          <span className="material-symbols-outlined text-[14px] mr-1">check_circle</span> SELESAI
                        </div>
                      ) : (
                        <div className="mt-3 flex items-center text-[var(--color-outline)] text-[10px] font-bold">
                          <span className="material-symbols-outlined text-[14px] mr-1">lock</span> TERKUNCI
                        </div>
                      )}
                      {status === 'completed' && (
                        <Link href={`/perjalanan-belajar/${stage.id}`} className="absolute inset-0 rounded-xl" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bento Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-8 bg-[var(--color-surface-container-lowest)] rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row border border-[var(--color-outline-variant)]/30">
            <div className="md:w-2/5 min-h-[200px] overflow-hidden">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4-qOh4PW3i_HREpNrdpKeTq73PJdIWeLyC5aRDkyPNOH1FKO19rXEi1z0NkcN_NbpYwxTE5GvyFYI_e8fZltGT-gOqBcUTKRj1zG_L9tYRqGLn46mDQHMg2PQjxHLXnKdpbkqdQ4GY7Au3PelNanoHqxJb34NS7z6rsKpwUtt5bxCYThg1EBa-BL-DavYakstN5MR6nNZ1w9BUCBtaCMgaM2mzkYfJCJbYHlmkGiMuFbKySLWDtqq3mq1htwJLTi7CTEPBRU9-g" alt="Marine life visualization" className="w-full h-full object-cover" />
            </div>
            <div className="md:w-3/5 p-6 flex flex-col justify-center">
              <span className="inline-block bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">MISI AKTIF</span>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[var(--color-on-background)] mb-3">Analisis Rantai Makanan</h2>
              <p className="text-base text-[var(--color-on-surface-variant)] mb-6">Gunakan kamera AR-mu untuk memindai spesimen laut dan temukan bagaimana mikroplastik menyusup ke sistem mereka.</p>
              <div className="flex gap-3">
                <Link
                  href="/perjalanan-belajar/4"
                  className="bg-[var(--color-primary)] text-[var(--color-on-primary)] font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-md hover:bg-[var(--color-surface-tint)] transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined">qr_code_scanner</span>
                  Pindai Objek
                </Link>
                <button className="border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] font-bold px-6 py-3 rounded-xl hover:bg-[var(--color-secondary-container)]/20 transition-all">
                  Lihat Panduan
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-[var(--color-tertiary-container)] text-[var(--color-on-tertiary-container)] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold mb-1">Statistik Kamu</h3>
              <p className="text-sm font-semibold opacity-90">Progress Petualangan Minggu Ini</p>
            </div>
            <div className="my-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-5xl font-extrabold">{progressPercent}%</span>
                <span className="text-sm font-semibold mb-2">{completedCount}/{stages.length} Tahap</span>
              </div>
              <div className="w-full h-4 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-on-tertiary-container)] rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
            <div className="bg-white/20 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-tertiary-fixed)] text-[var(--color-on-tertiary-fixed)] rounded-lg flex items-center justify-center font-bold">
                <span className="material-symbols-outlined">star</span>
              </div>
              <div>
                <p className="text-sm font-semibold">{totalXP.toLocaleString('id')} XP Terkumpul</p>
                <p className="text-[12px] opacity-80">
                  {1500 - totalXP > 0 ? `${(1500 - totalXP).toLocaleString('id')} XP lagi untuk naik level!` : 'Level maksimum tercapai!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[var(--color-surface-container)] border-t border-[var(--color-outline-variant)]">
        <div className="w-full py-16 px-6 flex flex-col md:flex-row justify-between items-center gap-6 max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[var(--color-on-surface)] mb-1">MicroJourney AR</span>
            <p className="text-sm text-[var(--color-on-surface-variant)]">© 2024 MicroJourney AR. Petualangan Sains untuk Penjelajah Muda.</p>
          </div>
          <div className="flex gap-10">
            {['Tentang Kami', 'Bantuan', 'Kebijakan Privasi', 'Panduan Guru'].map(l => (
              <a key={l} href="#" className="text-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-secondary)] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
