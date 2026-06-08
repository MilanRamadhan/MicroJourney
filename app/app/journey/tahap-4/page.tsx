'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useJourneyStore } from '@/lib/journeyStore';
import { ORGANS, Organ } from '@/lib/organs';

type Phase = 'bridge' | 'organs' | 'lkpd';

// Floating particle dots for the body diagram
const FLOW_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${20 + Math.random() * 60}%`,
  delay: `${i * 0.4}s`,
  dur: `${2.5 + Math.random()}s`,
}));

function HealthBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="w-full bg-[#0D1F35] rounded-full h-2.5 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

export default function Tahap4() {
  const router = useRouter();
  const { completeStage, setLkpdAnswer, addOrganInteraction, setMostDangerousOrgan, organInteractions, lkpdAnswers } = useJourneyStore();
  const [phase, setPhase] = useState<Phase>('bridge');
  const [activeOrgan, setActiveOrgan] = useState<Organ | null>(null);
  const [clickedIds, setClickedIds] = useState<Set<string>>(new Set(organInteractions));
  const [lkpd3q1, setLkpd3q1] = useState(lkpdAnswers.lkpd3q1);
  const [lkpd3q2, setLkpd3q2] = useState(lkpdAnswers.lkpd3q2);

  const allOrgansDone = ORGANS.every(o => clickedIds.has(o.id));

  function handleOrganClick(organ: Organ) {
    setActiveOrgan(organ);
    if (!clickedIds.has(organ.id)) {
      addOrganInteraction(organ.id);
      setClickedIds(prev => new Set([...prev, organ.id]));
    }
  }

  function handleNext() {
    setLkpdAnswer('lkpd3q1', lkpd3q1);
    setLkpdAnswer('lkpd3q2', lkpd3q2);
    if (lkpd3q2) setMostDangerousOrgan(lkpd3q2);
    completeStage(4);
    router.push('/journey/tahap-5');
  }

  // Organ vertical positions in the SVG body diagram
  const ORGAN_POSITIONS: Record<string, { y: number; label: string }> = {
    mouth:          { y: 15,  label: 'Mulut' },
    stomach:        { y: 38,  label: 'Lambung' },
    smallIntestine: { y: 58,  label: 'Usus Halus' },
    largeIntestine: { y: 75,  label: 'Usus Besar' },
    blood:          { y: 90,  label: 'Darah' },
  };

  return (
    <div className="min-h-[calc(100vh-88px)] bg-[#060F1E] flex flex-col">

      {/* Bridge screen */}
      {phase === 'bridge' && (
        <div className="flex-grow flex items-center justify-center px-4 py-8">
          <div className="max-w-lg w-full">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[#0A1628] border border-[#1E3A5F] px-4 py-1.5 rounded-full mb-4">
                <span className="text-[#94A3B8] text-xs font-[family-name:var(--font-mono)]">JEMBATAN EKSPERIMEN</span>
              </div>
              <h2 className="font-[family-name:var(--font-outfit)] text-2xl md:text-3xl font-bold mb-4">
                Ingat Eksperimen Tadi?
              </h2>
            </div>

            {/* Lab experiment cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#0A1628] border border-[#22C55E]/30 rounded-2xl p-5 text-center">
                <div className="text-4xl mb-3">🥗</div>
                <div className="text-sm font-bold text-[#22C55E] mb-2">Gelas A</div>
                <div className="text-[#94A3B8] text-xs leading-relaxed mb-3">Cuka + daun/kerupuk</div>
                <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-lg p-2">
                  <p className="text-[#22C55E] text-xs font-bold">✓ Melunak & hancur</p>
                  <p className="text-[#94A3B8] text-[10px] mt-1">Organik = bisa dicerna</p>
                </div>
              </div>

              <div className="bg-[#0A1628] border border-[#EF4444]/30 rounded-2xl p-5 text-center">
                <div className="text-4xl mb-3">🧴</div>
                <div className="text-sm font-bold text-[#EF4444] mb-2">Gelas B</div>
                <div className="text-[#94A3B8] text-xs leading-relaxed mb-3">Cuka + potongan plastik</div>
                <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg p-2">
                  <p className="text-[#EF4444] text-xs font-bold">✗ Tetap utuh</p>
                  <p className="text-[#94A3B8] text-[10px] mt-1">Plastik = tidak bereaksi</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0A1628] border-l-4 border-[#3B82F6] rounded-xl p-5 mb-8">
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                <strong className="text-[#F1F5F9]">Pertanyaan:</strong> Mengapa plastik tidak hancur meski direndam cairan asam?
                <br /><br />
                <span className="text-[#3B82F6]">Sekarang lihat apa yang terjadi DI DALAM tubuhmu...</span>
              </p>
            </div>

            <button onClick={() => setPhase('organs')}
              className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2">
              Masuk ke Organ <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* Organ interactive */}
      {phase === 'organs' && (
        <div className="flex-grow flex flex-col md:flex-row max-w-6xl mx-auto w-full px-4 py-6 gap-6">
          {/* Left: Body diagram */}
          <div className="md:w-64 flex-shrink-0">
            <p className="text-[#94A3B8] text-xs font-[family-name:var(--font-mono)] mb-4 text-center">KLIK ORGAN UNTUK INVESTIGASI</p>

            <div className="relative bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-4 mx-auto"
              style={{ width: 220, height: 420 }}>
              {/* Body silhouette SVG */}
              <svg viewBox="0 0 100 200" width="100%" height="100%" className="absolute inset-0 p-4 opacity-20">
                <ellipse cx="50" cy="15" rx="16" ry="18" fill="#94A3B8" />
                <rect x="25" y="32" width="50" height="80" rx="10" fill="#94A3B8" />
                <rect x="15" y="34" width="12" height="55" rx="6" fill="#94A3B8" />
                <rect x="73" y="34" width="12" height="55" rx="6" fill="#94A3B8" />
                <rect x="30" y="112" width="16" height="65" rx="8" fill="#94A3B8" />
                <rect x="54" y="112" width="16" height="65" rx="8" fill="#94A3B8" />
              </svg>

              {/* Particle flow */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                {FLOW_PARTICLES.map(p => (
                  <div key={p.id}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#EF4444]"
                    style={{ left: p.left, animation: `flowDown ${p.dur} ${p.delay} linear infinite`, opacity: 0.7 }} />
                ))}
              </div>

              {/* Organ buttons */}
              {ORGANS.map(organ => {
                const pos = ORGAN_POSITIONS[organ.id];
                const isClicked = clickedIds.has(organ.id);
                const isActive = activeOrgan?.id === organ.id;
                return (
                  <button key={organ.id}
                    onClick={() => handleOrganClick(organ)}
                    className={`absolute left-1/2 -translate-x-1/2 rounded-lg px-3 py-1.5 text-xs font-bold transition-all z-10 border ${
                      isActive
                        ? 'bg-[#EF4444] border-[#EF4444] text-white'
                        : isClicked
                        ? 'bg-[#22C55E]/20 border-[#22C55E]/50 text-[#22C55E]'
                        : 'bg-[#0D1F35] border-[#1E3A5F] text-[#94A3B8] hover:border-[#3B82F6]'
                    }`}
                    style={{ top: `${pos.y}%` }}
                  >
                    {isClicked ? '✓' : '●'} {pos.label}
                    {organ.isKeyOrgan && <span className="ml-1 text-[#F59E0B]">★</span>}
                  </button>
                );
              })}
            </div>

            <p className="text-center text-[#4A6080] text-xs mt-3 font-[family-name:var(--font-mono)]">
              {clickedIds.size} / {ORGANS.length} organ
            </p>
          </div>

          {/* Right: Info panel */}
          <div className="flex-grow">
            {!activeOrgan ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-[#4A6080]">
                  <span className="material-symbols-outlined text-5xl block mb-3">touch_app</span>
                  <p className="text-sm">Klik organ di sebelah kiri untuk melihat dampak mikroplastik</p>
                </div>
              </div>
            ) : (
              <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-6 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-[family-name:var(--font-mono)] text-[#4A6080] uppercase tracking-wider mb-1">X-RAY AKTIF</p>
                    <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-bold flex items-center gap-2">
                      {activeOrgan.name}
                      {activeOrgan.isKeyOrgan && (
                        <span className="text-xs bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] px-2 py-0.5 rounded font-sans">★ KUNCI EKSPERIMEN</span>
                      )}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="font-[family-name:var(--font-mono)] text-2xl font-bold" style={{ color: activeOrgan.healthColor }}>
                      {activeOrgan.healthPct}%
                    </div>
                    <div className="text-[#4A6080] text-xs">kondisi organ</div>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between text-xs text-[#4A6080] mb-1.5">
                    <span>Kondisi Organ</span>
                    <span style={{ color: activeOrgan.healthColor }}>{activeOrgan.healthPct >= 70 ? 'Sehat' : activeOrgan.healthPct >= 45 ? 'Terancam' : 'Kritis'}</span>
                  </div>
                  <HealthBar pct={activeOrgan.healthPct} color={activeOrgan.healthColor} />
                </div>

                <div className="bg-[#060F1E] border border-[#1E3A5F] rounded-xl p-4 mb-4">
                  <p className="text-xs font-[family-name:var(--font-mono)] text-[#EF4444] uppercase tracking-wider mb-2">DAMPAK MIKROPLASTIK</p>
                  <p className="text-[#F1F5F9] text-sm leading-relaxed">{activeOrgan.impact}</p>
                </div>

                <div className="bg-[#0A1628] border-l-4 border-[#3B82F6] rounded-xl p-4 mb-4">
                  <p className="text-xs font-[family-name:var(--font-mono)] text-[#3B82F6] uppercase tracking-wider mb-1.5">CATATAN ILMIAH</p>
                  <p className="text-[#94A3B8] text-xs leading-relaxed">{activeOrgan.sciNote}</p>
                </div>

                <div className="flex items-center justify-between bg-[#060F1E] rounded-xl p-3">
                  <span className="text-[#94A3B8] text-xs">Partikel tertahan di organ ini:</span>
                  <span className="font-[family-name:var(--font-mono)] font-bold text-[#EF4444]">
                    +{activeOrgan.particles.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {allOrgansDone && (
              <button
                onClick={() => setPhase('lkpd')}
                className="w-full mt-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2">
                Semua organ terinvestigasi — Isi Laporan <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* LKPD 3 */}
      {phase === 'lkpd' && (
        <div className="flex-grow max-w-xl mx-auto w-full px-4 py-8">
          <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-6 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#EF4444] text-white text-xs font-bold px-2 py-0.5 rounded font-[family-name:var(--font-mono)]">LKPD 3</span>
              <h4 className="font-bold">Berdasarkan Eksperimen & Simulasi Organ</h4>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-[#94A3B8] text-sm mb-3">
                  <span className="text-[#F1F5F9] font-semibold">Pertanyaan 1:</span> Mengapa asam lambung (HCl) gagal mencerna plastik? Jelaskan menggunakan konsep ikatan polimer!
                </p>
                <textarea value={lkpd3q1} onChange={e => setLkpd3q1(e.target.value)}
                  className="w-full bg-[#060F1E] border border-[#1E3A5F] rounded-xl p-4 text-[#F1F5F9] placeholder-[#4A6080] text-sm resize-none h-28 focus:outline-none focus:border-[#3B82F6] transition-colors"
                  placeholder="Asam lambung (HCl) gagal mencerna plastik karena rantai polimer plastik terdiri dari ikatan C-C sintetis yang..." />
              </div>
              <div>
                <p className="text-[#94A3B8] text-sm mb-3">
                  <span className="text-[#F1F5F9] font-semibold">Pertanyaan 2:</span> Di organ mana mikroplastik paling berbahaya menurutmu? Jelaskan alasannya!
                </p>
                <textarea value={lkpd3q2} onChange={e => setLkpd3q2(e.target.value)}
                  className="w-full bg-[#060F1E] border border-[#1E3A5F] rounded-xl p-4 text-[#F1F5F9] placeholder-[#4A6080] text-sm resize-none h-28 focus:outline-none focus:border-[#3B82F6] transition-colors"
                  placeholder="Organ yang paling berbahaya adalah usus halus, karena di sinilah partikel <10μm dapat diserap langsung ke dalam darah dan..." />
              </div>
            </div>
          </div>

          <button onClick={handleNext} disabled={lkpd3q1.length < 20 || lkpd3q2.length < 20}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
            Simpan & Lanjut ke E-LKPD <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
}
