'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useJourneyStore } from '@/lib/journeyStore';

type Phase = 'intro' | 'bottle' | 'uv-done' | 'shatter' | 'done';

const PARTICLES = Array.from({ length: 48 }, (_, i) => ({
  id: i,
  sx: `${(Math.random() - 0.5) * 300}px`,
  sy: `${(Math.random() - 0.5) * 300}px`,
  delay: `${Math.random() * 0.3}s`,
  size: `${Math.random() * 10 + 4}px`,
  color: ['#90CAF9','#80DEEA','#EF9A9A','#A5D6A7','#FFF176','#CE93D8'][i % 6],
}));

export default function Tahap2() {
  const router = useRouter();
  const { completeStage, setLkpdAnswer, lkpdAnswers } = useJourneyStore();
  const [phase, setPhase] = useState<Phase>('intro');
  const [uvPlaying, setUvPlaying] = useState(false);
  const [lkpd1, setLkpd1] = useState(lkpdAnswers.lkpd1);

  function applyUV() {
    setUvPlaying(true);
    setTimeout(() => setPhase('uv-done'), 1800);
  }

  function applyWave() {
    setPhase('shatter');
    setTimeout(() => setPhase('done'), 1600);
  }

  function handleNext() {
    setLkpdAnswer('lkpd1', lkpd1);
    completeStage(2);
    router.push('/journey/tahap-3');
  }

  return (
    <div className="min-h-[calc(100vh-88px)] bg-[#060F1E] flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(59,130,246,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Intro */}
      {phase === 'intro' && (
        <div className="max-w-lg w-full text-center z-10">
          <div className="inline-flex items-center gap-2 bg-[#0A1628] border border-[#1E3A5F] px-4 py-1.5 rounded-full mb-6">
            <span className="text-[#94A3B8] text-xs font-[family-name:var(--font-mono)]">SIMULASI PELAPUKAN PLASTIK</span>
          </div>
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-bold mb-4">Botol yang Dibuang</h2>
          <p className="text-[#94A3B8] mb-8">Plastik di alam mengalami dua proses pelapukan utama. Ikuti simulasinya untuk memahami bagaimana plastik berubah menjadi partikel mikro.</p>
          <button onClick={() => setPhase('bottle')}
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">
            Mulai Simulasi →
          </button>
        </div>
      )}

      {/* Bottle + interactions */}
      {(phase === 'bottle' || phase === 'uv-done') && (
        <div className="max-w-2xl w-full z-10">
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-center mb-8">Simulasi Pelapukan Plastik</h2>

          <div className="flex flex-col items-center mb-10">
            {/* Bottle SVG */}
            <div
              className="relative mb-8 transition-all duration-[1800ms]"
              style={{
                filter: phase === 'uv-done' ? 'brightness(0.55) saturate(0.2) sepia(0.65)' :
                        uvPlaying ? 'brightness(0.7) saturate(0.5) sepia(0.3)' : 'none',
              }}
            >
              <svg width="120" height="220" viewBox="0 0 120 220">
                <rect x="40" y="0" width="40" height="20" rx="6" fill="#90CAF9" />
                <rect x="30" y="20" width="60" height="180" rx="16" fill="#B3E5FC" fillOpacity="0.85"
                  stroke="#64B5F6" strokeWidth="2" />
                <rect x="38" y="40" width="10" height="120" rx="5" fill="white" fillOpacity="0.3" />
                {phase === 'uv-done' && (
                  <>
                    <line x1="50" y1="60" x2="80" y2="90" stroke="#EF9A9A" strokeWidth="1.5" opacity="0.7"/>
                    <line x1="55" y1="100" x2="90" y2="130" stroke="#EF9A9A" strokeWidth="1" opacity="0.5"/>
                    <line x1="40" y1="140" x2="75" y2="170" stroke="#EF9A9A" strokeWidth="1.5" opacity="0.6"/>
                  </>
                )}
              </svg>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              <button
                onClick={applyUV}
                disabled={uvPlaying || phase === 'uv-done'}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg border-2 transition-all ${
                  phase === 'uv-done' ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#22C55E]' :
                  'bg-[#F59E0B]/10 border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B]/20'
                }`}
              >
                ☀️ {phase === 'uv-done' ? 'UV Selesai ✓' : 'Paparan Sinar UV'}
              </button>

              <button
                onClick={applyWave}
                disabled={phase !== 'uv-done'}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg border-2 border-[#3B82F6] text-[#3B82F6] bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                🌊 Hantaman Ombak
              </button>
            </div>

            {phase === 'bottle' && (
              <p className="text-[#4A6080] text-xs mt-4 font-[family-name:var(--font-mono)]">Tekan tombol secara berurutan</p>
            )}
            {phase === 'uv-done' && (
              <p className="text-[#F59E0B] text-xs mt-4 font-[family-name:var(--font-mono)] animate-pulse">Plastik sudah rapuh — tekan Hantaman Ombak!</p>
            )}
          </div>
        </div>
      )}

      {/* Shatter animation */}
      {phase === 'shatter' && (
        <div className="relative flex items-center justify-center w-64 h-64 z-10">
          {PARTICLES.map(p => (
            <div key={p.id}
              className="absolute rounded-sm"
              style={{
                width: p.size, height: p.size,
                backgroundColor: p.color,
                '--sx': p.sx, '--sy': p.sy,
                animation: `shatter 0.8s ${p.delay} ease-out forwards`,
              } as React.CSSProperties}
            />
          ))}
          <p className="text-white font-bold text-lg z-10">💥 Pecah!</p>
        </div>
      )}

      {/* Done + LKPD */}
      {phase === 'done' && (
        <div className="max-w-xl w-full z-10">
          <div className="bg-[#0A1628] border border-[#22C55E]/30 rounded-2xl p-6 mb-6 text-center">
            <span className="text-4xl mb-3 block">🔬</span>
            <h3 className="font-[family-name:var(--font-outfit)] text-xl font-bold mb-2 text-[#22C55E]">Inilah Bagaimana Mikroplastik Terbentuk</h3>
            <p className="text-[#94A3B8] text-sm">
              Botol plastik yang dibuang di alam mengalami dua proses: <strong className="text-[#F59E0B]">fotodegradasi</strong> oleh sinar UV matahari yang membuatnya rapuh, dan <strong className="text-[#3B82F6]">abrasi mekanis</strong> oleh ombak yang memecahnya menjadi partikel kecil (&lt;5mm).
            </p>
          </div>

          {/* LKPD 1 */}
          <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-6 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#3B82F6] text-white text-xs font-bold px-2 py-0.5 rounded font-[family-name:var(--font-mono)]">LKPD 1</span>
              <h4 className="font-bold">Pertanyaan Pemahaman</h4>
            </div>
            <p className="text-[#94A3B8] text-sm mb-3">
              Jelaskan dua proses yang menyebabkan botol plastik berubah menjadi mikroplastik beserta mekanisme ilmiahnya!
            </p>
            <textarea
              value={lkpd1}
              onChange={e => setLkpd1(e.target.value)}
              className="w-full bg-[#060F1E] border border-[#1E3A5F] rounded-xl p-4 text-[#F1F5F9] placeholder-[#4A6080] text-sm resize-none h-28 focus:outline-none focus:border-[#3B82F6] transition-colors"
              placeholder="Proses pertama adalah fotodegradasi, yaitu..."
            />
            <p className={`text-xs mt-1.5 ${lkpd1.length < 15 ? 'text-[#4A6080]' : 'text-[#22C55E]'}`}>
              {lkpd1.length < 15 ? `${lkpd1.length} karakter` : '✓ Terisi'}
            </p>
          </div>

          <button onClick={handleNext}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2">
            Lanjut ke Tahap 3 <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
}
