'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useJourneyStore } from '@/lib/journeyStore';
import BottomNav from '@/components/BottomNav';

const STAGES = [
  { id: 1, label: 'Scanner AI',         path: '/journey/tahap-1' },
  { id: 2, label: 'Pelapukan',           path: '/journey/tahap-2' },
  { id: 3, label: 'Kontaminasi Pangan',  path: '/journey/tahap-3' },
  { id: 4, label: 'Organ Pencernaan',    path: '/journey/tahap-4' },
  { id: 5, label: 'E-LKPD',             path: '/journey/tahap-5' },
  { id: 6, label: 'Komitmen',            path: '/journey/tahap-6' },
];

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { studentName, completedStages } = useJourneyStore();
  const currentId = STAGES.find(s => pathname.startsWith(s.path))?.id ?? 1;

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-[#eceef0] px-4 h-14 flex items-center justify-between fixed top-0 left-0 right-0 z-50 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <button
          onClick={() => router.push('/')}
          className="text-[#3e4850] hover:text-[#191c1e] transition-colors flex items-center gap-1 text-sm"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span className="hidden sm:inline">Beranda</span>
        </button>

        {/* Step indicators */}
        <div className="flex items-center gap-1">
          {STAGES.map(s => {
            const done = completedStages.includes(s.id);
            const active = s.id === currentId;
            return (
              <div
                key={s.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  active ? 'bg-[#006591] text-white ring-2 ring-[#006591]/30' :
                  done   ? 'bg-[#006e2f] text-white' :
                  'bg-[#eceef0] border border-[#bec8d2] text-[#6e7881]'
                }`}
                title={s.label}
              >
                {done && !active ? '✓' : s.id}
              </div>
            );
          })}
        </div>

        <div className="text-[#3e4850] text-sm hidden sm:block">
          {studentName
            ? <span className="text-[#191c1e] font-semibold">{studentName}</span>
            : <Link href="/login" className="text-[#006591] font-semibold">Login dulu</Link>
          }
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-14" />

      {/* Stage label */}
      <div className="bg-white border-b border-[#eceef0] px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <span className="text-[#6e7881] text-xs font-[family-name:var(--font-mono)]">TAHAP {currentId} / 6</span>
          <span className="text-[#bec8d2]">·</span>
          <span className="text-[#3e4850] text-xs">{STAGES[currentId - 1]?.label}</span>
        </div>
      </div>

      {/* Content */}
      <main className="flex-grow">{children}</main>

      {/* Mobile bottom nav */}
      <BottomNav />
    </div>
  );
}
