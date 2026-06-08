'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useJourneyStore } from '@/lib/journeyStore';

type Phase = 'intro' | 'bottle' | 'uv-done' | 'shatter' | 'done';

const PARTICLES = Array.from({ length: 56 }, (_, i) => ({
  id: i,
  sx: `${(Math.random() - 0.5) * 360}px`,
  sy: `${(Math.random() - 0.5) * 360}px`,
  delay: `${Math.random() * 0.4}s`,
  size: `${Math.random() * 12 + 3}px`,
  color: ['#0ea5e9','#006591','#c9e6ff','#6bff8f','#ffdf9a','#bec8d2','#006e2f','#0ea5e9'][i % 8],
}));

const LKPD_OPTIONS = [
  { id: 'a', text: 'Fotodegradasi oleh sinar UV matahari + Abrasi mekanis oleh ombak/angin' },
  { id: 'b', text: 'Pembakaran oleh panas + Biodegradasi oleh bakteri' },
  { id: 'c', text: 'Hidrolisis kimia oleh air hujan + Oksidasi oleh udara' },
  { id: 'd', text: 'Fermentasi biologis + Evaporasi akibat suhu tinggi' },
];
const CORRECT = 'a';

export default function Tahap2() {
  const router = useRouter();
  const { completeStage, setLkpdAnswer, lkpdAnswers } = useJourneyStore();
  const [phase, setPhase] = useState<Phase>('intro');
  const [uvPlaying, setUvPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(lkpdAnswers.lkpd1 || null);
  const [answered, setAnswered] = useState(!!lkpdAnswers.lkpd1);
  const isCorrect = selectedOption === CORRECT;

  function applyUV() {
    setUvPlaying(true);
    setTimeout(() => setPhase('uv-done'), 1800);
  }

  function applyWave() {
    setPhase('shatter');
    setTimeout(() => setPhase('done'), 1600);
  }

  function handleAnswer(id: string) {
    if (answered) return;
    setSelectedOption(id);
    setAnswered(true);
    setLkpdAnswer('lkpd1', id);
  }

  function handleNext() {
    completeStage(2);
    router.push('/journey/tahap-3');
  }

  return (
    <div className="min-h-[calc(100vh-88px)] bg-[#f7f9fb] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated background dots */}
      <div className="absolute inset-0 pointer-events-none adventure-map opacity-50" />
      {/* Floating blobs */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-[#006591]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#006e2f]/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── Intro ── */}
      {phase === 'intro' && (
        <div className="max-w-lg w-full text-center z-10 animate-[fadeIn_0.4s_ease]">
          <div className="w-20 h-20 rounded-full bg-[#0ea5e9]/10 border-2 border-[#0ea5e9]/30 flex items-center justify-center mx-auto mb-6 floating">
            <span className="material-symbols-outlined text-[#006591] text-4xl">wb_sunny</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white border border-[#bec8d2] px-4 py-1.5 rounded-full mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#006591] animate-pulse"></span>
            <span className="text-[#006591] text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider">SIMULASI INTERAKTIF</span>
          </div>
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-bold mb-4 text-[#191c1e]">Pelapukan Plastik di Alam</h2>
          <p className="text-[#3e4850] mb-8 leading-relaxed">
            Satu botol plastik yang dibuang butuh <strong className="text-[#ba1a1a]">450 tahun</strong> untuk terurai. Tapi sebelum itu, ia berubah jadi jutaan partikel mikro. Ikuti simulasinya!
          </p>
          <button onClick={() => setPhase('bottle')}
            className="bg-[#006591] hover:bg-[#004c6e] text-white font-bold px-10 py-4 rounded-xl text-lg transition-all shadow-lg shadow-[#006591]/20 hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto">
            <span className="material-symbols-outlined">science</span> Mulai Simulasi
          </button>
        </div>
      )}

      {/* ── Bottle Phase ── */}
      {(phase === 'bottle' || phase === 'uv-done') && (
        <div className="max-w-2xl w-full z-10">
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-center mb-2 text-[#191c1e]">Simulasi Pelapukan Plastik</h2>
          <p className="text-center text-[#6e7881] text-sm mb-8 font-[family-name:var(--font-mono)]">Lakukan kedua aksi secara berurutan</p>

          <div className="flex flex-col items-center mb-10">
            {/* Bottle */}
            <div className="relative mb-8">
              <div
                className="transition-all duration-[1800ms] drop-shadow-lg"
                style={{
                  filter: phase === 'uv-done'
                    ? 'brightness(0.5) saturate(0.15) sepia(0.7)'
                    : uvPlaying
                    ? 'brightness(0.7) saturate(0.5) sepia(0.3)'
                    : 'none',
                }}
              >
                <svg width="130" height="240" viewBox="0 0 130 240">
                  {/* Cap */}
                  <rect x="45" y="0" width="40" height="22" rx="7" fill="#64B5F6" />
                  {/* Body */}
                  <rect x="30" y="22" width="70" height="196" rx="18" fill="#B3E5FC" fillOpacity="0.9"
                    stroke="#64B5F6" strokeWidth="2" />
                  {/* Highlight */}
                  <rect x="40" y="42" width="12" height="130" rx="6" fill="white" fillOpacity="0.4" />
                  {/* Label */}
                  <rect x="35" y="80" width="60" height="70" rx="6" fill="#006591" fillOpacity="0.15" />
                  <text x="65" y="120" textAnchor="middle" fill="#006591" fontSize="9" fontWeight="bold">PLASTIK</text>
                  {/* Crack lines when degraded */}
                  {phase === 'uv-done' && (
                    <>
                      <line x1="50" y1="55" x2="82" y2="95" stroke="#ba1a1a" strokeWidth="1.5" opacity="0.8"/>
                      <line x1="55" y1="110" x2="95" y2="145" stroke="#ba1a1a" strokeWidth="1" opacity="0.6"/>
                      <line x1="38" y1="150" x2="78" y2="185" stroke="#ba1a1a" strokeWidth="1.5" opacity="0.7"/>
                      <line x1="70" y1="60" x2="50" y2="100" stroke="#ba1a1a" strokeWidth="1" opacity="0.5"/>
                    </>
                  )}
                </svg>
              </div>
              {/* UV rays when playing */}
              {uvPlaying && (
                <div className="absolute -top-4 -left-8 pointer-events-none">
                  {['-30deg','0deg','30deg','-60deg','60deg'].map((r,i)=>(
                    <div key={i} className="absolute w-1 h-16 bg-[#c39400]/40 rounded-full"
                      style={{ transform: `rotate(${r}) translateY(-50%)`, left:'50%', top:'50%',
                        animation: `float ${0.8+i*0.1}s ease-in-out infinite alternate` }} />
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <button onClick={applyUV} disabled={uvPlaying || phase === 'uv-done'}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base border-2 transition-all hover:scale-105 active:scale-95 ${
                  phase === 'uv-done'
                    ? 'bg-[#6bff8f]/20 border-[#006e2f] text-[#006e2f]'
                    : 'bg-[#ffdf9a]/30 border-[#c39400] text-[#785a00] hover:bg-[#ffdf9a]/60'
                }`}>
                <span className="material-symbols-outlined">wb_sunny</span>
                {phase === 'uv-done' ? 'Fotodegradasi ✓' : 'Sinar UV'}
              </button>

              <button onClick={applyWave} disabled={phase !== 'uv-done'}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base border-2 transition-all hover:scale-105 active:scale-95 ${
                  phase === 'uv-done'
                    ? 'border-[#006591] text-[#006591] bg-[#0ea5e9]/15 hover:bg-[#0ea5e9]/25'
                    : 'border-[#bec8d2] text-[#bec8d2] opacity-40 cursor-not-allowed'
                }`}>
                <span className="material-symbols-outlined">waves</span>
                Abrasi Ombak
              </button>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className={`flex items-center gap-1.5 text-xs font-[family-name:var(--font-mono)] px-3 py-1.5 rounded-full border ${
                phase === 'uv-done' ? 'bg-[#6bff8f]/20 border-[#006e2f] text-[#006e2f]' : 'bg-[#f2f4f6] border-[#bec8d2] text-[#6e7881]'}`}>
                <span className="material-symbols-outlined text-base">wb_sunny</span> Fotodegradasi {phase === 'uv-done' ? '✓' : '○'}
              </div>
              <span className="text-[#bec8d2]">→</span>
              <div className="flex items-center gap-1.5 text-xs font-[family-name:var(--font-mono)] px-3 py-1.5 rounded-full border bg-[#f2f4f6] border-[#bec8d2] text-[#6e7881]">
                <span className="material-symbols-outlined text-base">waves</span> Abrasi ○
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Shatter animation ── */}
      {phase === 'shatter' && (
        <div className="relative flex items-center justify-center w-72 h-72 z-10">
          {PARTICLES.map(p => (
            <div key={p.id} className="absolute rounded-sm"
              style={{
                width: p.size, height: p.size,
                backgroundColor: p.color,
                '--sx': p.sx, '--sy': p.sy,
                animation: `shatter 0.9s ${p.delay} ease-out forwards`,
              } as React.CSSProperties}
            />
          ))}
          <div className="relative z-10 text-center">
            <p className="text-3xl mb-1">💥</p>
            <p className="text-[#191c1e] font-bold text-lg drop-shadow">Pecah menjadi partikel!</p>
          </div>
        </div>
      )}

      {/* ── Done + LKPD pilihan ganda ── */}
      {phase === 'done' && (
        <div className="max-w-xl w-full z-10">
          {/* Explanation card */}
          <div className="bg-white border border-[#006e2f]/20 rounded-2xl p-6 mb-6 shadow-sm text-center">
            <div className="w-14 h-14 rounded-full bg-[#6bff8f]/20 border border-[#006e2f]/30 flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[#006e2f] text-3xl">science</span>
            </div>
            <h3 className="font-[family-name:var(--font-outfit)] text-xl font-bold mb-3 text-[#006e2f]">
              Inilah Cara Plastik Menjadi Mikroplastik!
            </h3>
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="bg-[#ffdf9a]/20 border border-[#c39400]/20 rounded-xl p-3">
                <p className="text-[#785a00] text-xs font-bold mb-1">☀️ FOTODEGRADASI</p>
                <p className="text-[#3e4850] text-xs leading-relaxed">Sinar UV memecah ikatan polimer plastik, menjadikannya rapuh dan getas.</p>
              </div>
              <div className="bg-[#c9e6ff]/30 border border-[#006591]/20 rounded-xl p-3">
                <p className="text-[#006591] text-xs font-bold mb-1">🌊 ABRASI MEKANIS</p>
                <p className="text-[#3e4850] text-xs leading-relaxed">Hantaman ombak, angin, dan gesekan fisik memecah plastik rapuh menjadi serpihan &lt;5mm.</p>
              </div>
            </div>
          </div>

          {/* LKPD 1 — Pilihan Ganda */}
          <div className="bg-white border border-[#bec8d2] rounded-2xl p-6 mb-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#006591] text-white text-xs font-bold px-2 py-0.5 rounded font-[family-name:var(--font-mono)]">LKPD 1</span>
              <h4 className="font-bold text-[#191c1e]">Pertanyaan Pilihan Ganda</h4>
            </div>
            <p className="text-[#3e4850] text-sm mb-4 leading-relaxed font-semibold">
              Dua proses utama yang menyebabkan botol plastik berubah menjadi partikel mikroplastik di alam adalah...
            </p>

            <div className="space-y-3">
              {LKPD_OPTIONS.map(opt => {
                let style = 'bg-[#f7f9fb] border-[#bec8d2] text-[#191c1e] hover:border-[#006591] hover:bg-[#c9e6ff]/10';
                if (answered && opt.id === selectedOption) {
                  style = opt.id === CORRECT
                    ? 'bg-[#6bff8f]/20 border-[#006e2f] text-[#006e2f]'
                    : 'bg-[#ffdad6] border-[#ba1a1a] text-[#ba1a1a]';
                } else if (answered && opt.id === CORRECT) {
                  style = 'bg-[#6bff8f]/10 border-[#006e2f]/50 text-[#006e2f]';
                }
                return (
                  <button key={opt.id} onClick={() => handleAnswer(opt.id)} disabled={answered}
                    className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border-2 transition-all ${style} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}>
                    <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                      answered && opt.id === CORRECT ? 'bg-[#006e2f] border-[#006e2f] text-white' :
                      answered && opt.id === selectedOption && opt.id !== CORRECT ? 'bg-[#ba1a1a] border-[#ba1a1a] text-white' :
                      'border-current'
                    }`}>
                      {answered && opt.id === CORRECT ? '✓' :
                       answered && opt.id === selectedOption && opt.id !== CORRECT ? '✗' :
                       opt.id.toUpperCase()}
                    </span>
                    <span className="text-sm leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className={`mt-4 p-4 rounded-xl border ${isCorrect ? 'bg-[#6bff8f]/10 border-[#006e2f]/30' : 'bg-[#ffdad6] border-[#ba1a1a]/30'}`}>
                {isCorrect ? (
                  <p className="text-[#006e2f] text-sm font-semibold">✓ Benar! Fotodegradasi dan abrasi mekanis adalah dua proses utama pembentukan mikroplastik di alam.</p>
                ) : (
                  <p className="text-[#ba1a1a] text-sm font-semibold">✗ Belum tepat. Jawaban yang benar: <strong>A</strong> — fotodegradasi oleh UV dan abrasi mekanis oleh ombak.</p>
                )}
              </div>
            )}
          </div>

          <button onClick={handleNext} disabled={!answered}
            className="w-full bg-[#006591] hover:bg-[#004c6e] text-white font-bold py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#006591]/20 hover:scale-[1.01] active:scale-[0.99]">
            Lanjut ke Kontaminasi Pangan <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
}
