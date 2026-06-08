'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useJourneyStore } from '@/lib/journeyStore';

const STAGES = [
  { id: 1, label: 'Scanner AI',       path: '/journey/tahap-1' },
  { id: 2, label: 'Pelapukan',         path: '/journey/tahap-2' },
  { id: 3, label: 'Kontaminasi Pangan',path: '/journey/tahap-3' },
  { id: 4, label: 'Organ Pencernaan',  path: '/journey/tahap-4' },
  { id: 5, label: 'E-LKPD',           path: '/journey/tahap-5' },
  { id: 6, label: 'Komitmen',          path: '/journey/tahap-6' },
];

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { studentName, completedStages } = useJourneyStore();
  const currentId = STAGES.find(s => pathname.startsWith(s.path))?.id ?? 1;

  return (
    <div className="min-h-screen bg-[#060F1E] flex flex-col">
      {/* Top bar */}
      <header className="bg-[#0A1628] border-b border-[#1E3A5F] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => router.push('/')} className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors flex items-center gap-1 text-sm">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span className="hidden sm:inline">Beranda</span>
        </button>

        {/* Step indicators */}
        <div className="flex items-center gap-1">
          {STAGES.map(s => {
            const done = completedStages.includes(s.id);
            const active = s.id === currentId;
            return (
              <div key={s.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  active  ? 'bg-[#3B82F6] text-white ring-2 ring-[#3B82F6]/40' :
                  done    ? 'bg-[#22C55E] text-white' :
                  'bg-[#0D1F35] border border-[#1E3A5F] text-[#4A6080]'
                }`}
                title={s.label}
              >
                {done && !active ? '✓' : s.id}
              </div>
            );
          })}
        </div>

        <div className="text-[#94A3B8] text-sm hidden sm:block">
          {studentName ? <span className="text-[#F1F5F9] font-medium">{studentName}</span> : <Link href="/login" className="text-[#3B82F6]">Login dulu</Link>}
        </div>
      </header>

      {/* Stage label */}
      <div className="bg-[#0A1628] border-b border-[#122540] px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <span className="text-[#4A6080] text-xs font-[family-name:var(--font-mono)]">TAHAP {currentId} / 6</span>
          <span className="text-[#1E3A5F]">·</span>
          <span className="text-[#94A3B8] text-xs">{STAGES[currentId - 1]?.label}</span>
        </div>
      </div>

      {/* Content */}
      <main className="flex-grow">{children}</main>
    </div>
  );
}
