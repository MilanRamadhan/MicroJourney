'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { stages } from '@/lib/stagesData';
import { useJourneyStore } from '@/lib/journeyStore';

const STAGE_ICONS: Record<number, string> = {
  1: 'qr_code_scanner',
  2: 'wb_sunny',
  3: 'set_meal',
  4: 'pulmonology',
  5: 'assignment',
  6: 'eco',
};

const stagePositions = [
  { top: '80px',  left: '50px'  },
  { top: '280px', left: '250px' },
  { top: '80px',  left: '450px' },
  { top: '280px', left: '600px' },
  { top: '80px',  left: '780px' },
  { top: '280px', left: '950px' },
];

export default function PerjalananBelajarPage() {
  const { completedStages } = useJourneyStore();

  const completedCount = completedStages.length;
  const progressPercent = Math.round((completedCount / stages.length) * 100);

  // Stage berikutnya setelah yang terakhir selesai = current
  // Jika belum ada yang selesai, stage 1 = current
  const nextStageId = completedCount === 0
    ? 1
    : completedCount >= stages.length
    ? stages.length  // semua selesai, tetap tunjuk yang terakhir sebagai current
    : Math.max(...completedStages) + 1;

  function getStatus(stageId: number) {
    if (completedStages.includes(stageId)) return 'completed';
    if (stageId === nextStageId) return 'current';
    return 'locked';
  }

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">

        {/* ── Page header ── */}
        <header className="bg-white border-b border-[#eceef0] px-5 py-6 text-center">
          <h1 className="text-[22px] sm:text-[28px] md:text-[36px] font-extrabold font-[family-name:var(--font-outfit)] text-[#006591] tracking-tight leading-tight">
            Ekspedisi Microplastics
          </h1>
          <p className="text-[13px] sm:text-[15px] text-[#6e7881] mt-1.5 max-w-md mx-auto leading-relaxed">
            Ikuti jejak perjalanan plastik dari tangan kita hingga kembali ke meja makan.
          </p>

          {/* Progress bar */}
          <div className="max-w-xs mx-auto mt-4">
            <div className="flex justify-between text-[11px] text-[#6e7881] font-semibold mb-1.5">
              <span>{completedCount} / {stages.length} Misi Selesai</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-2 bg-[#eceef0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#006e2f] rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════
            MOBILE: Vertical snake map (< lg)
        ══════════════════════════════════════ */}
        <style>{`
          @keyframes marchingAnts {
            from { stroke-dashoffset: 40; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes glowPulse {
            0%, 100% { filter: drop-shadow(0 0 3px #6bff8f); }
            50%       { filter: drop-shadow(0 0 8px #6bff8f); }
          }
          .path-march {
            stroke-dasharray: 24 16;
            animation: marchingAnts 0.8s linear infinite, glowPulse 2s ease-in-out infinite;
          }
          .path-dot {
            animation: glowPulse 1.8s ease-in-out infinite;
          }
        `}</style>

        <div className="lg:hidden relative px-4 py-6">
          {/* SVG snake path behind cards */}
          <svg
            className="absolute left-0 top-0 w-full pointer-events-none"
            style={{ height: stages.length * 148 + 60 }}
            viewBox={`0 0 360 ${stages.length * 148 + 60}`}
            preserveAspectRatio="none"
          >
            <defs>
              {/* Gradient hijau untuk path */}
              <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6bff8f" />
                <stop offset="100%" stopColor="#00b359" />
              </linearGradient>
            </defs>

            {/* Background path (grey dotted) */}
            <path
              d="M90,60 C90,130 270,130 270,200 C270,270 90,270 90,340 C90,410 270,410 270,480 C270,550 90,550 90,620 C90,690 270,690 270,760"
              fill="none" stroke="#dde3ea" strokeWidth="7" strokeLinecap="round"
              strokeDasharray="12 8"
            />

            {/* Progress path (green looping march) */}
            {completedCount > 0 && (() => {
              // Total path length ≈ 1200. Each stage = 200 units.
              const totalLen = 1200;
              const progressLen = (completedCount / stages.length) * totalLen;
              return (
                <>
                  {/* Solid base — shows filled progress */}
                  <path
                    d="M90,60 C90,130 270,130 270,200 C270,270 90,270 90,340 C90,410 270,410 270,480 C270,550 90,550 90,620 C90,690 270,690 270,760"
                    fill="none"
                    stroke="#6bff8f"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={`${progressLen} ${totalLen}`}
                    strokeDashoffset="0"
                    opacity="0.35"
                  />
                  {/* Marching dashes on top — loops continuously */}
                  <path
                    className="path-march"
                    d="M90,60 C90,130 270,130 270,200 C270,270 90,270 90,340 C90,410 270,410 270,480 C270,550 90,550 90,620 C90,690 270,690 270,760"
                    fill="none"
                    stroke="url(#greenGrad)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={`20 ${totalLen - progressLen + 20}`}
                  />
                  {/* Glowing dot at tip */}
                  {completedCount < stages.length && (() => {
                    const dotPositions = [
                      { cx: 270, cy: 200 },
                      { cx: 90,  cy: 340 },
                      { cx: 270, cy: 480 },
                      { cx: 90,  cy: 620 },
                      { cx: 270, cy: 760 },
                    ];
                    const pos = dotPositions[completedCount - 1] ?? dotPositions[0];
                    return (
                      <g className="path-dot">
                        <circle cx={pos.cx} cy={pos.cy} r="12" fill="#6bff8f" opacity="0.2" />
                        <circle cx={pos.cx} cy={pos.cy} r="7"  fill="#6bff8f" opacity="0.5" />
                        <circle cx={pos.cx} cy={pos.cy} r="4"  fill="#00c853" />
                      </g>
                    );
                  })()}
                </>
              );
            })()}
          </svg>

          {/* Stage cards — alternating left / right */}
          <div className="relative space-y-10">
            {stages.map((stage, idx) => {
              const status = getStatus(stage.id);
              const isLeft = idx % 2 === 0; // even → left side, odd → right side

              return (
                <div key={stage.id} className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                  {status === 'current' ? (
                    <div
                      className="relative w-[68%] bg-[#006591] rounded-3xl shadow-2xl shadow-[#006591]/30 p-4 border-4 border-white"
                      style={{ animation: 'float 4s ease-in-out infinite' }}
                    >
                      {/* Stage number badge */}
                      <div className={`absolute -top-4 ${isLeft ? '-left-3' : '-right-3'} w-9 h-9 bg-[#c39400] text-[#251a00] rounded-full flex items-center justify-center font-extrabold text-sm shadow-lg border-2 border-white`}>
                        {stage.id}
                      </div>
                      <div className="flex items-start gap-3 mb-2">
                        <span className="material-symbols-outlined text-white/80 text-3xl flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {STAGE_ICONS[stage.id]}
                        </span>
                        <div>
                          <p className="text-[10px] font-bold text-[#93c5fd] uppercase tracking-wider">Tahap {stage.id} · Aktif</p>
                          <h3 className="text-[15px] font-bold text-white leading-tight">{stage.title}</h3>
                        </div>
                      </div>
                      <p className="text-[11px] text-white/70 leading-relaxed mb-3">{stage.description}</p>
                      <Link href={`/journey/tahap-${stage.id}`}
                        className="inline-flex items-center gap-1.5 bg-white text-[#006591] font-bold text-[12px] px-4 py-2 rounded-xl active:scale-95 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-sm">play_arrow</span>
                        Mulai Misi
                      </Link>
                    </div>

                  ) : status === 'completed' ? (
                    <Link href={`/journey/tahap-${stage.id}`}
                      className="relative w-[60%] bg-white rounded-2xl shadow-md border border-[#bec8d2]/60 p-4 active:scale-95 transition-all hover:shadow-lg">
                      <div className={`absolute -top-3 ${isLeft ? '-left-2' : '-right-2'} w-7 h-7 bg-[#006e2f] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-md border-2 border-white`}>
                        {stage.id}
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-[#006e2f]/10 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-[#006e2f] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {STAGE_ICONS[stage.id]}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[13px] font-semibold text-[#191c1e] leading-tight">{stage.title}</h3>
                          <div className="flex items-center gap-1 mt-0.5 text-[#006e2f]">
                            <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            <span className="text-[10px] font-bold">Selesai</span>
                          </div>
                        </div>
                      </div>
                    </Link>

                  ) : (
                    <div className="relative w-[60%] bg-[#f2f4f6] rounded-2xl border border-[#eceef0] p-4 opacity-50">
                      <div className={`absolute -top-3 ${isLeft ? '-left-2' : '-right-2'} w-7 h-7 bg-[#bec8d2] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm border-2 border-white`}>
                        {stage.id}
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-[#eceef0] flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-[#bec8d2] text-xl">{STAGE_ICONS[stage.id]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[13px] font-semibold text-[#6e7881] leading-tight">{stage.title}</h3>
                          <div className="flex items-center gap-1 mt-0.5 text-[#bec8d2]">
                            <span className="material-symbols-outlined text-[12px]">lock</span>
                            <span className="text-[10px] font-bold">Terkunci</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════
            DESKTOP: Snake map (≥ lg)
        ══════════════════════════════════════ */}
        <div className="hidden lg:block px-6 py-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="relative w-full overflow-x-auto pb-12 pt-6">
              <div className="min-w-[1100px] relative h-[480px]">
                {/* SVG path */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" fill="none" viewBox="0 0 1100 500">
                  <defs>
                    <linearGradient id="greenGradDesktop" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6bff8f" />
                      <stop offset="100%" stopColor="#00b359" />
                    </linearGradient>
                  </defs>
                  {/* Background path dotted */}
                  <path
                    d="M100,150 C250,150 250,350 400,350 C550,350 550,150 700,150 C850,150 850,350 1050,350"
                    fill="none" stroke="#dde3ea" strokeLinecap="round" strokeWidth="8"
                    strokeDasharray="14 8"
                  />
                  {completedCount > 0 && (() => {
                    const totalLen = 1400;
                    const progressLen = (completedCount / stages.length) * totalLen;
                    return (
                      <>
                        {/* Solid base */}
                        <path
                          d="M100,150 C250,150 250,350 400,350 C550,350 550,150 700,150 C850,150 850,350 1050,350"
                          fill="none" stroke="#6bff8f" strokeLinecap="round" strokeWidth="8"
                          strokeDasharray={`${progressLen} ${totalLen}`}
                          opacity="0.35"
                        />
                        {/* Marching dashes */}
                        <path
                          className="path-march"
                          d="M100,150 C250,150 250,350 400,350 C550,350 550,150 700,150 C850,150 850,350 1050,350"
                          fill="none" stroke="url(#greenGradDesktop)" strokeLinecap="round" strokeWidth="8"
                          strokeDasharray={`22 ${totalLen - progressLen + 22}`}
                        />
                      </>
                    );
                  })()}
                </svg>

                {stages.map((stage, idx) => {
                  const status = getStatus(stage.id);
                  const pos = stagePositions[idx];
                  return (
                    <div
                      key={stage.id}
                      className={`absolute ${status === 'current' ? 'z-10' : 'group'} ${status === 'locked' ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                      style={{ top: pos.top, left: pos.left }}
                    >
                      {status === 'current' ? (
                        <div className="relative bg-[#006591] p-5 rounded-2xl shadow-2xl shadow-[#006591]/30 border-4 border-white w-52"
                          style={{ animation: 'float 4s ease-in-out infinite' }}>
                          <div className="absolute -top-5 -left-5 w-11 h-11 bg-[#c39400] text-[#251a00] rounded-full flex items-center justify-center font-extrabold shadow-lg border-2 border-white ring-4 ring-white/50 text-base">
                            {stage.id}
                          </div>
                          <span className="material-symbols-outlined text-white/80 text-4xl mb-3 block" style={{ fontVariationSettings: "'FILL' 1" }}>{STAGE_ICONS[stage.id]}</span>
                          <h3 className="text-[15px] text-white font-bold mb-1.5 leading-tight">{stage.title}</h3>
                          <p className="text-[11px] text-white/70 leading-tight mb-4">{stage.description}</p>
                          <Link href={`/journey/tahap-${stage.id}`}
                            className="block w-full bg-white text-[#006591] font-bold py-2 rounded-xl text-sm text-center hover:bg-[#c9e6ff] transition-colors active:scale-95">
                            MULAI MISI ▶
                          </Link>
                        </div>
                      ) : (
                        <div className={`relative p-5 rounded-2xl shadow-md border-2 w-44 transition-all duration-300 ${
                          status === 'completed'
                            ? 'bg-white border-[#006e2f]/30 hover:-translate-y-2 hover:shadow-xl cursor-pointer'
                            : 'bg-[#f2f4f6] border-[#eceef0]'
                        }`}>
                          <div className={`absolute -top-4 -left-4 w-9 h-9 rounded-full flex items-center justify-center font-bold shadow-md text-sm ${
                            status === 'completed' ? 'bg-[#006e2f] text-white' : 'bg-[#bec8d2] text-white'
                          }`}>{stage.id}</div>
                          <span className={`material-symbols-outlined text-[40px] mb-3 block ${
                            status === 'completed' ? 'text-[#006e2f]' : 'text-[#bec8d2]'
                          }`} style={{ fontVariationSettings: status === 'completed' ? "'FILL' 1" : "'FILL' 0" }}>
                            {STAGE_ICONS[stage.id]}
                          </span>
                          <h3 className="font-semibold text-sm text-[#191c1e] mb-1 leading-tight">{stage.title}</h3>
                          <p className="text-[11px] text-[#6e7881] leading-tight">{stage.description}</p>
                          {status === 'completed' ? (
                            <div className="mt-2 flex items-center text-[#006e2f] text-[10px] font-bold gap-0.5">
                              <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> SELESAI
                            </div>
                          ) : (
                            <div className="mt-2 flex items-center text-[#bec8d2] text-[10px] font-bold gap-0.5">
                              <span className="material-symbols-outlined text-[13px]">lock</span> TERKUNCI
                            </div>
                          )}
                          {status === 'completed' && (
                            <Link href={`/journey/tahap-${stage.id}`} className="absolute inset-0 rounded-2xl" />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
