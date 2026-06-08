'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useJourneyStore } from '@/lib/journeyStore';
import { FOODS } from '@/lib/foods';

type Phase = 'grid' | 'reveal' | 'summary';

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
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [flashing, setFlashing] = useState<Set<number>>(new Set());
  const [phase, setPhase] = useState<Phase>('grid');
  const [lkpd2, setLkpd2] = useState(lkpdAnswers.lkpd2);
  const counterRef = useRef<HTMLElement>(null);
  const allRevealed = revealed.size === FOODS.length;

  function revealFood(id: number) {
    if (revealed.has(id)) return;
    const food = FOODS.find(f => f.id === id)!;
    addFood({ id, name: food.name, particles: food.particles });
    setRevealed(prev => new Set([...prev, id]));
    setFlashing(prev => new Set([...prev, id]));
    setTimeout(() => setFlashing(prev => { const s = new Set(prev); s.delete(id); return s; }), 600);
  }

  useEffect(() => {
    if (phase === 'reveal' && counterRef.current) {
      animateCounter(counterRef.current, totalParticles);
    }
  }, [phase, totalParticles]);

  function handleNext() {
    setLkpdAnswer('lkpd2', lkpd2);
    completeStage(3);
    router.push('/journey/tahap-4');
  }

  return (
    <div className="min-h-[calc(100vh-88px)] bg-[#060F1E] flex flex-col">
      {/* Grid phase */}
      {phase === 'grid' && (
        <div className="flex-grow flex flex-col max-w-3xl mx-auto w-full px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#0A1628] border border-[#1E3A5F] px-4 py-1.5 rounded-full mb-4">
              <span className="text-[#EF4444] text-xs font-[family-name:var(--font-mono)]">⚠ KANDUNGAN TERSEMBUNYI</span>
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl md:text-3xl font-bold mb-3">
              Makanan yang Kamu Makan Hari Ini
            </h2>
            <p className="text-[#94A3B8] text-sm max-w-md mx-auto">
              Klik setiap makanan untuk mengungkap kandungan mikroplastik yang tersembunyi di dalamnya.
            </p>
          </div>

          {/* Counter bar */}
          <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-xl px-5 py-3 flex items-center justify-between mb-6">
            <span className="text-[#94A3B8] text-sm font-[family-name:var(--font-mono)]">Total partikel hari ini:</span>
            <span className="font-[family-name:var(--font-mono)] text-xl font-bold text-[#EF4444]">
              {totalParticles.toLocaleString('id-ID')}
            </span>
          </div>

          {/* Food grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {FOODS.map(food => {
              const isRevealed = revealed.has(food.id);
              const isFlashing = flashing.has(food.id);
              return (
                <button key={food.id} onClick={() => revealFood(food.id)}
                  className={`relative rounded-2xl p-5 text-center border-2 transition-all duration-300 ${
                    isRevealed
                      ? 'bg-[#1A0A0A] border-[#EF4444]/50'
                      : 'bg-[#0A1628] border-[#1E3A5F] hover:border-[#3B82F6] hover:bg-[#0D1F35] cursor-pointer'
                  } ${isFlashing ? 'animate-[revealFlash_0.6s_ease]' : ''}`}
                >
                  <div className="text-3xl mb-2">{food.icon}</div>
                  <div className="text-[#F1F5F9] font-semibold text-sm mb-2 leading-tight">{food.name}</div>
                  {isRevealed ? (
                    <div>
                      <div className="font-[family-name:var(--font-mono)] text-lg font-bold text-[#EF4444]">
                        {food.particles.toLocaleString()}
                      </div>
                      <div className="text-[#EF4444]/70 text-[10px]">partikel</div>
                    </div>
                  ) : (
                    <div className="bg-[#1E3A5F] rounded-lg px-2 py-1">
                      <span className="text-[#4A6080] text-xs font-[family-name:var(--font-mono)]">? partikel</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {allRevealed && (
            <div className="text-center">
              <p className="text-[#22C55E] text-sm mb-4 font-[family-name:var(--font-mono)]">
                ✓ Semua terungkap — {revealed.size} jenis makanan
              </p>
              <button onClick={() => setPhase('reveal')}
                className="bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold px-10 py-4 rounded-xl text-xl transition-colors animate-pulse">
                Lihat Total →
              </button>
            </div>
          )}
          {!allRevealed && (
            <p className="text-center text-[#4A6080] text-sm font-[family-name:var(--font-mono)]">
              {revealed.size} / {FOODS.length} makanan diklik
            </p>
          )}
        </div>
      )}

      {/* Dramatic reveal */}
      {phase === 'reveal' && (
        <div className="flex-grow flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
          {/* Particle rain */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({length:40},(_,i)=>(
              <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-[#EF4444]"
                style={{
                  left:`${Math.random()*100}%`,
                  animation:`flowDown ${1+Math.random()*2}s ${Math.random()*3}s linear infinite`,
                  opacity: 0.5 + Math.random() * 0.5,
                }} />
            ))}
          </div>

          <div className="relative z-10">
            <p className="text-[#94A3B8] text-lg mb-4">Hari ini kamu menelan</p>
            <div className="font-[family-name:var(--font-mono)] text-6xl md:text-8xl font-bold text-[#EF4444] mb-4"
              style={{ textShadow: '0 0 60px rgba(239,68,68,0.4)' }}>
              <span ref={counterRef}>0</span>
            </div>
            <p className="text-[#F1F5F9] text-2xl font-bold mb-8">partikel mikroplastik</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10">
              <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-xl p-4">
                <div className="font-[family-name:var(--font-mono)] text-xl font-bold text-[#F59E0B] mb-1">15 gram</div>
                <div className="text-[#94A3B8] text-xs">dalam 1 bulan = 💳 satu kartu ATM</div>
              </div>
              <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-xl p-4">
                <div className="font-[family-name:var(--font-mono)] text-xl font-bold text-[#EF4444] mb-1">#1 Dunia</div>
                <div className="text-[#94A3B8] text-xs">Indonesia konsumsi mikroplastik tertinggi</div>
              </div>
            </div>

            <button onClick={() => setPhase('summary')}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">
              Ikuti perjalanannya di dalam tubuhmu →
            </button>
          </div>
        </div>
      )}

      {/* LKPD summary */}
      {phase === 'summary' && (
        <div className="flex-grow max-w-xl mx-auto w-full px-4 py-8">
          <div className="bg-[#0A1628] border border-[#EF4444]/30 rounded-2xl p-6 mb-6">
            <p className="text-xs font-[family-name:var(--font-mono)] text-[#EF4444] mb-2">RINGKASAN KONTAMINASI</p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {selectedFoods.map(f => (
                <div key={f.id} className="flex justify-between items-center text-sm">
                  <span className="text-[#94A3B8]">{FOODS.find(fd=>fd.id===f.id)?.icon} {f.name}</span>
                  <span className="font-[family-name:var(--font-mono)] text-[#EF4444] font-bold">{f.particles.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#1E3A5F] mt-3 pt-3 flex justify-between font-bold">
              <span className="text-[#F1F5F9]">Total</span>
              <span className="font-[family-name:var(--font-mono)] text-[#EF4444] text-lg">{totalParticles.toLocaleString()}</span>
            </div>
          </div>

          {/* LKPD 2 */}
          <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-6 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#3B82F6] text-white text-xs font-bold px-2 py-0.5 rounded font-[family-name:var(--font-mono)]">LKPD 2</span>
              <h4 className="font-bold">Pertanyaan Pemahaman</h4>
            </div>
            <p className="text-[#94A3B8] text-sm mb-3">
              Dari data di atas, jelaskan bagaimana mikroplastik bisa masuk ke dalam makanan yang kita konsumsi setiap hari. Sebutkan minimal 2 jalur kontaminasi yang berbeda!
            </p>
            <textarea
              value={lkpd2}
              onChange={e => setLkpd2(e.target.value)}
              className="w-full bg-[#060F1E] border border-[#1E3A5F] rounded-xl p-4 text-[#F1F5F9] placeholder-[#4A6080] text-sm resize-none h-28 focus:outline-none focus:border-[#3B82F6] transition-colors"
              placeholder="Jalur pertama adalah melalui rantai makanan laut, dimana..."
            />
          </div>

          <button onClick={handleNext}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2">
            Investigasi Organ Pencernaan <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
}
