'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useJourneyStore } from '@/lib/journeyStore';
import { FOODS } from '@/lib/foods';

type Phase = 'select' | 'reveal' | 'summary';

const LKPD2_OPTIONS = [
  { id: 'a', text: 'Melalui rantai makanan laut (ikan makan plankton yang mengandung mikroplastik) + tertelan saat makan garam/air yang terkontaminasi' },
  { id: 'b', text: 'Hanya melalui udara yang kita hirup saat tidur di malam hari' },
  { id: 'c', text: 'Hanya melalui kulit yang menyerap plastik saat menyentuh kemasan makanan' },
  { id: 'd', text: 'Melalui proses memasak saja, bukan dari bahan makanan itu sendiri' },
];
const LKPD2_CORRECT = 'a';

function animateCounter(el: HTMLElement | null, target: number, ms = 2200) {
  if (!el) return;
  const step = target / (ms / 16);
  let val = 0;
  const t = setInterval(() => {
    val = Math.min(val + step, target);
    el.textContent = Math.floor(val).toLocaleString('id-ID');
    if (val >= target) clearInterval(t);
  }, 16);
}

export default function Tahap3() {
  const router = useRouter();
  const { addFood, totalParticles, selectedFoods, completeStage, setLkpdAnswer, lkpdAnswers } = useJourneyStore();
  const [phase, setPhase] = useState<Phase>('select');
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());
  const [lkpd2Answer, setLkpd2Answer] = useState<string | null>(lkpdAnswers.lkpd2 || null);
  const [lkpd2Answered, setLkpd2Answered] = useState(!!lkpdAnswers.lkpd2);
  const counterRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (phase === 'reveal' && counterRef.current) {
      animateCounter(counterRef.current, totalParticles);
    }
  }, [phase, totalParticles]);

  function toggleFood(id: number) {
    setCheckedIds(prev => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id); else s.add(id);
      return s;
    });
  }

  function handleConfirmSelection() {
    // Add only selected foods
    checkedIds.forEach(id => {
      const food = FOODS.find(f => f.id === id)!;
      if (!selectedFoods.find(f => f.id === id)) {
        addFood({ id, name: food.name, particles: food.particles });
      }
    });
    setPhase('reveal');
  }

  function handleLkpd2Answer(id: string) {
    if (lkpd2Answered) return;
    setLkpd2Answer(id);
    setLkpd2Answered(true);
    setLkpdAnswer('lkpd2', id);
  }

  function handleNext() {
    completeStage(3);
    router.push('/journey/tahap-4');
  }

  return (
    <div className="min-h-[calc(100vh-88px)] bg-[#f7f9fb] flex flex-col relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 adventure-map opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#ba1a1a]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#006591]/4 rounded-full blur-3xl pointer-events-none" />

      {/* ── SELECT PHASE ── */}
      {phase === 'select' && (
        <div className="flex-grow flex flex-col max-w-3xl mx-auto w-full px-4 py-8 z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#ffdad6] border-2 border-[#ba1a1a]/30 flex items-center justify-center mx-auto mb-4 floating">
              <span className="material-symbols-outlined text-[#ba1a1a] text-3xl">restaurant</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#ffdad6] border border-[#ba1a1a]/30 px-4 py-1.5 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse" />
              <span className="text-[#ba1a1a] text-xs font-[family-name:var(--font-mono)] font-bold uppercase tracking-wider">Deteksi Kontaminasi</span>
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl md:text-3xl font-bold mb-3 text-[#191c1e]">
              Makanan yang Kamu Makan Hari Ini
            </h2>
            <p className="text-[#3e4850] text-sm max-w-lg mx-auto leading-relaxed">
              Pilih <strong>semua makanan yang kamu makan hari ini</strong>. Setiap makanan mungkin mengandung mikroplastik yang tidak terlihat. Pilih yang sesuai!
            </p>
          </div>

          {/* Selection counter */}
          <div className="bg-white border border-[#bec8d2] rounded-xl px-5 py-3 flex items-center justify-between mb-6 shadow-sm">
            <span className="text-[#3e4850] text-sm font-[family-name:var(--font-mono)]">
              Makanan dipilih: <strong className="text-[#006591]">{checkedIds.size}</strong> dari {FOODS.length}
            </span>
            {checkedIds.size > 0 && (
              <span className="text-xs text-[#006e2f] font-[family-name:var(--font-mono)] font-semibold animate-[fadeIn_0.3s_ease]">
                ✓ {checkedIds.size} dipilih
              </span>
            )}
          </div>

          {/* Food grid — checkboxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {FOODS.map(food => {
              const isChecked = checkedIds.has(food.id);
              return (
                <button key={food.id} onClick={() => toggleFood(food.id)}
                  className={`relative rounded-2xl p-5 text-center border-2 transition-all duration-200 hover:scale-105 active:scale-95 bento-card ${
                    isChecked
                      ? 'bg-[#c9e6ff]/40 border-[#006591] shadow-md shadow-[#006591]/10'
                      : 'bg-white border-[#bec8d2] hover:border-[#006591] hover:shadow-md'
                  }`}
                >
                  {/* Checkmark badge */}
                  <div className={`absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isChecked ? 'bg-[#006591] border-[#006591]' : 'border-[#bec8d2]'
                  }`}>
                    {isChecked && <span className="material-symbols-outlined text-white text-[12px]">check</span>}
                  </div>
                  <div className="text-3xl mb-2">{food.icon}</div>
                  <div className="text-[#191c1e] font-semibold text-sm mb-2 leading-tight">{food.name}</div>
                  <div className="bg-[#f7f9fb] rounded-lg px-2 py-1 border border-[#bec8d2]">
                    <span className="text-[#6e7881] text-[10px] font-[family-name:var(--font-mono)]">
                      {isChecked ? `${food.particles.toLocaleString()} partikel` : '? partikel'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-center">
            {checkedIds.size === 0 ? (
              <p className="text-[#6e7881] text-sm font-[family-name:var(--font-mono)] mb-4">
                ← Pilih setidaknya satu makanan yang kamu makan hari ini
              </p>
            ) : (
              <p className="text-[#006e2f] text-sm font-[family-name:var(--font-mono)] mb-4 font-semibold">
                ✓ {checkedIds.size} makanan dipilih — total perkiraan: {
                  FOODS.filter(f=>checkedIds.has(f.id)).reduce((s,f)=>s+f.particles,0).toLocaleString('id-ID')
                } partikel
              </p>
            )}
            <button onClick={handleConfirmSelection} disabled={checkedIds.size === 0}
              className="bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold px-10 py-4 rounded-xl text-lg transition-all shadow-lg shadow-[#ba1a1a]/20 flex items-center gap-2 mx-auto disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95">
              <span className="material-symbols-outlined">search</span>
              Ungkap Kandungan Mikroplastik
            </button>
          </div>
        </div>
      )}

      {/* ── DRAMATIC REVEAL ── */}
      {phase === 'reveal' && (
        <div className="flex-grow flex flex-col items-center justify-center px-6 text-center relative overflow-hidden bg-[#191c1e]">
          {/* Particle rain */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({length:50},(_,i)=>(
              <div key={i} className="absolute rounded-full"
                style={{
                  width: `${2+Math.random()*4}px`,
                  height: `${2+Math.random()*4}px`,
                  backgroundColor: ['#ba1a1a','#006591','#c39400','#006e2f','#bec8d2'][i%5],
                  left:`${Math.random()*100}%`,
                  opacity: 0.3 + Math.random() * 0.5,
                  animation:`flowDown ${1.5+Math.random()*2.5}s ${Math.random()*4}s linear infinite`,
                }} />
            ))}
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="text-4xl mb-4">⚗️</div>
            <p className="text-white/60 text-base mb-3 font-[family-name:var(--font-mono)] uppercase tracking-widest text-xs">HASIL ANALISIS MIKROPLASTIK</p>
            <p className="text-white/80 text-lg mb-4">Dari {checkedIds.size} makanan yang kamu pilih, hari ini kamu menelan</p>
            <div className="font-[family-name:var(--font-mono)] text-6xl md:text-8xl font-bold text-[#ba1a1a] mb-4"
              style={{ textShadow: '0 0 40px rgba(186,26,26,0.5), 0 0 80px rgba(186,26,26,0.2)' }}>
              <span ref={counterRef}>0</span>
            </div>
            <p className="text-white text-2xl font-bold mb-2">partikel mikroplastik</p>
            <p className="text-white/40 text-xs mb-8 font-[family-name:var(--font-mono)]">
              setara {Math.ceil(totalParticles/10000)} µg plastik masuk ke tubuhmu hari ini
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto mb-10">
              {selectedFoods.slice(0,3).map(f=>(
                <div key={f.id} className="bg-white/8 border border-white/15 rounded-xl p-3">
                  <div className="text-2xl mb-1">{FOODS.find(fd=>fd.id===f.id)?.icon}</div>
                  <div className="font-[family-name:var(--font-mono)] text-sm font-bold text-[#c39400]">{f.particles.toLocaleString()}</div>
                  <div className="text-white/50 text-[10px]">{f.name}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-10">
              <div className="bg-white/10 border border-white/20 rounded-xl p-3">
                <div className="font-[family-name:var(--font-mono)] text-lg font-bold text-[#c39400] mb-1">15g/bulan</div>
                <div className="text-white/50 text-xs">≈ satu kartu ATM plastik</div>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-xl p-3">
                <div className="font-[family-name:var(--font-mono)] text-lg font-bold text-[#ba1a1a] mb-1">#1 Dunia</div>
                <div className="text-white/50 text-xs">Indonesia konsumsi terbanyak</div>
              </div>
            </div>

            <button onClick={() => setPhase('summary')}
              className="bg-[#006591] hover:bg-[#004c6e] text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto">
              Investigasi Perjalanan di Dalam Tubuh
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* ── SUMMARY + LKPD ── */}
      {phase === 'summary' && (
        <div className="flex-grow max-w-xl mx-auto w-full px-4 py-8 z-10">
          {/* Summary card */}
          <div className="bg-white border border-[#ba1a1a]/20 rounded-2xl p-5 mb-5 shadow-sm">
            <p className="text-xs font-[family-name:var(--font-mono)] text-[#ba1a1a] mb-3 font-semibold uppercase tracking-wider">Ringkasan Kontaminasi Hari Ini</p>
            <div className="space-y-2 max-h-44 overflow-y-auto">
              {selectedFoods.map(f => (
                <div key={f.id} className="flex justify-between items-center text-sm py-1 border-b border-[#f2f4f6] last:border-0">
                  <span className="text-[#3e4850]">{FOODS.find(fd=>fd.id===f.id)?.icon} {f.name}</span>
                  <span className="font-[family-name:var(--font-mono)] text-[#ba1a1a] font-bold">{f.particles.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#bec8d2] mt-3 pt-3 flex justify-between font-bold">
              <span className="text-[#191c1e]">Total ({selectedFoods.length} makanan)</span>
              <span className="font-[family-name:var(--font-mono)] text-[#ba1a1a] text-lg">{totalParticles.toLocaleString()}</span>
            </div>
          </div>

          {/* LKPD 2 — Pilihan Ganda */}
          <div className="bg-white border border-[#bec8d2] rounded-2xl p-6 mb-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#006591] text-white text-xs font-bold px-2 py-0.5 rounded font-[family-name:var(--font-mono)]">LKPD 2</span>
              <h4 className="font-bold text-[#191c1e]">Pertanyaan Pilihan Ganda</h4>
            </div>
            <p className="text-[#3e4850] text-sm mb-4 leading-relaxed font-semibold">
              Bagaimana mikroplastik bisa masuk ke dalam makanan yang kita konsumsi setiap hari? Pilih pernyataan yang paling tepat!
            </p>

            <div className="space-y-3">
              {LKPD2_OPTIONS.map(opt => {
                let style = 'bg-[#f7f9fb] border-[#bec8d2] text-[#191c1e] hover:border-[#006591] hover:bg-[#c9e6ff]/10';
                if (lkpd2Answered && opt.id === lkpd2Answer) {
                  style = opt.id === LKPD2_CORRECT
                    ? 'bg-[#6bff8f]/20 border-[#006e2f] text-[#006e2f]'
                    : 'bg-[#ffdad6] border-[#ba1a1a] text-[#ba1a1a]';
                } else if (lkpd2Answered && opt.id === LKPD2_CORRECT) {
                  style = 'bg-[#6bff8f]/10 border-[#006e2f]/50 text-[#006e2f]';
                }
                return (
                  <button key={opt.id} onClick={() => handleLkpd2Answer(opt.id)} disabled={lkpd2Answered}
                    className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border-2 transition-all ${style} ${!lkpd2Answered ? 'cursor-pointer' : 'cursor-default'}`}>
                    <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                      lkpd2Answered && opt.id === LKPD2_CORRECT ? 'bg-[#006e2f] border-[#006e2f] text-white' :
                      lkpd2Answered && opt.id === lkpd2Answer && opt.id !== LKPD2_CORRECT ? 'bg-[#ba1a1a] border-[#ba1a1a] text-white' :
                      'border-current'
                    }`}>
                      {lkpd2Answered && opt.id === LKPD2_CORRECT ? '✓' :
                       lkpd2Answered && opt.id === lkpd2Answer && opt.id !== LKPD2_CORRECT ? '✗' :
                       opt.id.toUpperCase()}
                    </span>
                    <span className="text-sm leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {lkpd2Answered && (
              <div className={`mt-4 p-4 rounded-xl border ${lkpd2Answer === LKPD2_CORRECT ? 'bg-[#6bff8f]/10 border-[#006e2f]/30' : 'bg-[#ffdad6] border-[#ba1a1a]/30'}`}>
                {lkpd2Answer === LKPD2_CORRECT ? (
                  <p className="text-[#006e2f] text-sm font-semibold">✓ Tepat! Mikroplastik masuk ke makanan melalui rantai makanan laut dan kontaminasi air/garam.</p>
                ) : (
                  <p className="text-[#ba1a1a] text-sm font-semibold">✗ Belum tepat. Jawaban yang benar: <strong>A</strong> — melalui rantai makanan laut dan kontaminasi langsung air/garam.</p>
                )}
              </div>
            )}
          </div>

          <button onClick={handleNext} disabled={!lkpd2Answered}
            className="w-full bg-[#006591] hover:bg-[#004c6e] text-white font-bold py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#006591]/20 hover:scale-[1.01] active:scale-[0.99]">
            Investigasi Organ Pencernaan <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
}
