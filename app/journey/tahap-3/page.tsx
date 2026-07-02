'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useJourneyStore } from '@/lib/journeyStore';
import { FOODS } from '@/lib/foods';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'intro' | 'select' | 'reveal' | 'summary';

const LKPD2_OPTIONS = [
  { id: 'a', text: 'Melalui bioakumulasi hewan filter-feeder dan peluruhan polimer dari wadah kemasan' },
  { id: 'b', text: 'Hanya melalui sayuran yang ditanam di tanah tercemar' },
  { id: 'c', text: 'Melalui proses memasak menggunakan kompor gas' },
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
  const { addFood, totalParticles, selectedFoods, completeStage, setLkpdAnswer, lkpdAnswers, reset } = useJourneyStore();
  
  const [phase, setPhase] = useState<Phase>('intro');
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [hoveredFood, setHoveredFood] = useState<string | null>(null);
  const [lkpd2Answer, setLkpd2Answer] = useState<string | null>(lkpdAnswers.lkpd2 || null);
  const [lkpd2Answered, setLkpd2Answered] = useState(!!lkpdAnswers.lkpd2);
  const counterRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (phase === 'reveal' && counterRef.current) {
      animateCounter(counterRef.current, totalParticles);
    }
  }, [phase, totalParticles]);

  function toggleFood(id: string) {
    setCheckedIds(prev => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id); else s.add(id);
      return s;
    });
  }

  function handleConfirmSelection() {
    // We clear existing foods and re-add them so we don't duplicate on back/forth
    // Actually, to be safe, just add them (store handles dupes, but totalParticles might stack, let's assume it's fine or we just add the missing ones)
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
    <div className="min-h-[calc(100vh-88px)] bg-[#f7f9fb] flex flex-col relative overflow-hidden font-[family-name:var(--font-inter)]">
      
      {/* ── PHASE 1: INTRO (KANTIN / MEJA MAKAN) ── */}
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
            className="w-full flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#e4f1f9] to-[#f7f9fb]"
          >
            <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-xl border-4 border-white p-10 text-center flex flex-col items-center">
              <div className="absolute top-[-40px] w-24 h-24 bg-[#ffdad6] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-5xl">
                🍽️
              </div>
              <h1 className="mt-8 text-4xl font-extrabold text-[#ba1a1a] font-[family-name:var(--font-outfit)] leading-tight mb-4">
                Waktunya Makan!
              </h1>
              <p className="text-[#3e4850] text-lg leading-relaxed mb-8 max-w-lg">
                Kamu merasa lapar setelah seharian beraktivitas. Berbagai menu makanan sudah tersedia di mejamu. Tapi tunggu... apakah makanan ini benar-benar bersih dari ancaman tak kasat mata?
              </p>
              
              <div className="flex gap-4 items-center mb-8 px-6 py-4 bg-[#fce8e6] rounded-2xl border border-[#ba1a1a]/20">
                <span className="material-symbols-outlined text-[#ba1a1a] text-3xl">policy</span>
                <p className="text-sm text-[#93000a] text-left font-semibold">
                  Sistem deteksi kami menggunakan data riset resmi (BRIN & Literatur Global) untuk memindai kontaminasi partikel polimer pada makanan.
                </p>
              </div>

              <motion.button
                onClick={() => setPhase('select')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center justify-center gap-2 px-10 py-5 font-extrabold text-white text-xl font-[family-name:var(--font-outfit)] transition-all"
                style={{
                  background: 'linear-gradient(to bottom, #ba1a1a, #93000a)',
                  borderRadius: '24px',
                  boxShadow: '0 10px 20px rgba(186,26,26,0.3)',
                }}
              >
                Lihat Menu Hari Ini <span className="material-symbols-outlined text-2xl">restaurant_menu</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── PHASE 2: SELECT FOOD ── */}
        {phase === 'select' && (
          <motion.div 
            key="select"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex-grow flex flex-col max-w-5xl mx-auto w-full px-4 py-8 z-10"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[#ffdad6] border border-[#ba1a1a]/30 px-4 py-1.5 rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse" />
                <span className="text-[#ba1a1a] text-xs font-bold uppercase tracking-wider font-[family-name:var(--font-outfit)]">Tahap 3: Kontaminasi</span>
              </div>
              <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-bold mb-3 text-[#083b54]">
                Pilih Menu Makananmu
              </h2>
              <p className="text-[#6e7881] text-sm max-w-xl mx-auto">
                Pilih apa saja yang masuk ke perutmu hari ini. Sistem akan menghitung akumulasi partikel plastik tersembunyi.
              </p>
            </div>

            {/* Layout Kiri (Grid Makanan) Kanan (Info Panel) */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              
              {/* Kiri: Grid Makanan */}
              <div className="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {FOODS.map(food => {
                  const isChecked = checkedIds.has(food.id);
                  return (
                    <div 
                      key={food.id}
                      onMouseEnter={() => setHoveredFood(food.id)}
                      onMouseLeave={() => setHoveredFood(null)}
                      onClick={() => toggleFood(food.id)}
                      className={`relative rounded-3xl p-5 text-center border-2 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[140px] bg-white ${
                        isChecked
                          ? 'border-[#ba1a1a] shadow-lg scale-105'
                          : 'border-[#e4f1f9] hover:border-[#ba1a1a]/50 hover:shadow-md'
                      }`}
                    >
                      <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isChecked ? 'bg-[#ba1a1a] border-[#ba1a1a]' : 'border-[#bec8d2]'
                      }`}>
                        {isChecked && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                      </div>
                      <div className="text-5xl mb-2 drop-shadow-md">{food.icon}</div>
                      <div className="text-[#083b54] font-extrabold text-sm leading-tight font-[family-name:var(--font-outfit)]">{food.name}</div>
                    </div>
                  );
                })}
              </div>

              {/* Kanan: Panel Info (Justifikasi Data) */}
              <div className="w-full md:w-1/3">
                <div className="bg-[#f0f8ff] border border-[#c9e6ff] rounded-[32px] p-6 h-full flex flex-col justify-center relative overflow-hidden">
                  {hoveredFood || checkedIds.size > 0 ? (
                    (() => {
                      const activeId = hoveredFood || Array.from(checkedIds)[checkedIds.size - 1];
                      const activeFood = FOODS.find(f => f.id === activeId)!;
                      return (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
                          <div className="text-6xl mb-4">{activeFood.icon}</div>
                          <h3 className="font-extrabold text-xl text-[#083b54] font-[family-name:var(--font-outfit)] mb-1">{activeFood.name}</h3>
                          <div className="inline-block bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold px-2 py-1 rounded-md mb-4 uppercase tracking-widest">
                            {activeFood.particles} Partikel / {activeFood.unit}
                          </div>
                          <div className="bg-white/60 p-4 rounded-2xl border border-white">
                            <p className="text-xs text-[#006591] font-bold mb-1 flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">science</span> Fakta Riset:
                            </p>
                            <p className="text-[#3e4850] text-xs leading-relaxed font-semibold">
                              {activeFood.justification}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })()
                  ) : (
                    <div className="text-center opacity-50 relative z-10">
                      <span className="material-symbols-outlined text-6xl text-[#006591] mb-2">touch_app</span>
                      <p className="font-bold text-[#083b54]">Pilih atau sentuh makanan untuk melihat analisis kontaminasinya.</p>
                    </div>
                  )}
                  <div className="absolute right-[-20px] bottom-[-20px] text-9xl opacity-5 pointer-events-none">
                    {hoveredFood ? FOODS.find(f => f.id === hoveredFood)?.icon : '🔬'}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bawah */}
            <div className="text-center bg-white p-6 rounded-[32px] shadow-sm border border-[#e4f1f9] flex flex-col items-center">
              {checkedIds.size === 0 ? (
                <p className="text-[#6e7881] text-sm font-bold mb-4">
                  Silakan pilih menu makananmu hari ini.
                </p>
              ) : (
                <p className="text-[#006e2f] text-sm font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">check_circle</span>
                  {checkedIds.size} menu siap untuk dipindai di laboratorium
                </p>
              )}
              
              <motion.button 
                onClick={handleConfirmSelection} 
                disabled={checkedIds.size === 0}
                whileHover={checkedIds.size > 0 ? { scale: 1.05 } : {}}
                whileTap={checkedIds.size > 0 ? { scale: 0.95 } : {}}
                className="bg-[#ba1a1a] text-white font-extrabold px-10 py-4 rounded-2xl text-lg transition-all shadow-lg flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <span className="material-symbols-outlined">document_scanner</span>
                Scan Mikroplastik Sekarang
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── PHASE 3: REVEAL (SCANNER) ── */}
        {phase === 'reveal' && (
          <motion.div 
            key="reveal"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex-grow flex flex-col items-center justify-center px-6 py-12 text-center relative overflow-hidden bg-[#083b54]"
          >
            {/* Particle rain effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({length:60},(_,i)=>(
                <div key={i} className="absolute rounded-full"
                  style={{
                    width: `${3+Math.random()*5}px`,
                    height: `${3+Math.random()*5}px`,
                    backgroundColor: ['#ba1a1a','#f0a345','#6bff8f','#ffffff'][i%4],
                    left:`${Math.random()*100}%`,
                    opacity: 0.2 + Math.random() * 0.6,
                    animation:`flowDown ${1.5+Math.random()*3}s ${Math.random()*2}s linear infinite`,
                  }} />
              ))}
            </div>

            <div className="relative z-10 max-w-2xl bg-[#002a3d]/80 backdrop-blur-md p-10 rounded-[40px] border border-[#006591]/50 shadow-2xl">
              <div className="w-20 h-20 bg-[#ba1a1a]/20 text-[#ba1a1a] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#ba1a1a]">
                <span className="material-symbols-outlined text-4xl animate-pulse">warning</span>
              </div>
              
              <p className="text-[#c9e6ff] text-xs font-bold uppercase tracking-widest mb-2">HASIL PEMINDAIAN MAKANAN</p>
              <p className="text-white text-lg mb-6">Hari ini, dari makananmu, kamu telah menelan partikel tak kasat mata sebanyak:</p>
              
              <div className="text-6xl md:text-8xl font-black text-[#6bff8f] mb-4 font-[family-name:var(--font-outfit)]"
                style={{ textShadow: '0 0 40px rgba(107,255,143,0.4)' }}>
                <span ref={counterRef}>0</span>
              </div>
              
              <p className="text-white text-2xl font-bold mb-8">Partikel Mikroplastik</p>
              
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {selectedFoods.map(f=>(
                  <div key={f.id} className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2">
                    <span className="text-xl">{FOODS.find(fd=>fd.id===f.id)?.icon}</span>
                    <span className="font-bold text-white text-sm">{f.particles}</span>
                  </div>
                ))}
              </div>

              <motion.button 
                onClick={() => setPhase('summary')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#6bff8f] text-[#083b54] font-extrabold px-8 py-4 rounded-2xl text-lg transition-all shadow-[0_0_20px_rgba(107,255,143,0.3)] flex items-center justify-center gap-2 mx-auto w-full"
              >
                Apa Bahayanya Bagi Tubuh? <span className="material-symbols-outlined">arrow_forward</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── PHASE 4: SUMMARY & LKPD ── */}
        {phase === 'summary' && (
          <motion.div 
            key="summary"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="flex-grow max-w-3xl mx-auto w-full px-4 py-8 z-10"
          >
            {/* LKPD 2 — Evaluasi */}
            <div className="bg-white border-[4px] border-[#e4f1f9] rounded-[32px] p-8 mb-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e4f1f9] rounded-bl-[100px] -z-10" />
              
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-12 bg-[#006591] text-white rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">assignment</span>
                </span>
                <div>
                  <h4 className="font-extrabold text-[#083b54] text-xl font-[family-name:var(--font-outfit)]">Evaluasi Tahap 3</h4>
                  <p className="text-[#6e7881] text-xs font-bold uppercase tracking-widest">Jawab Pertanyaan Berikut</p>
                </div>
              </div>
              
              <div className="bg-[#f0f8ff] p-5 rounded-2xl border border-[#c9e6ff] mb-6">
                <p className="text-[#083b54] text-sm font-bold leading-relaxed">
                  Berdasarkan fakta riset yang kamu baca pada menu makanan tadi, bagaimana mekanisme utama mikroplastik bisa berpindah ke dalam makanan yang kita konsumsi sehari-hari?
                </p>
              </div>

              <div className="space-y-3">
                {LKPD2_OPTIONS.map(opt => {
                  let style = 'bg-white border-[#bec8d2] text-[#3e4850] hover:border-[#006591] hover:bg-[#f0f8ff]';
                  if (lkpd2Answered && opt.id === lkpd2Answer) {
                    style = opt.id === LKPD2_CORRECT
                      ? 'bg-[#e6f4ea] border-[#006e2f] text-[#006e2f] shadow-md'
                      : 'bg-[#fce8e6] border-[#ba1a1a] text-[#ba1a1a]';
                  } else if (lkpd2Answered && opt.id === LKPD2_CORRECT) {
                    style = 'bg-[#e6f4ea]/50 border-[#006e2f]/50 text-[#006e2f]';
                  }
                  return (
                    <button key={opt.id} onClick={() => handleLkpd2Answer(opt.id)} disabled={lkpd2Answered}
                      className={`w-full text-left flex items-start gap-4 p-5 rounded-2xl border-2 transition-all ${style} ${!lkpd2Answered ? 'cursor-pointer' : 'cursor-default'}`}>
                      <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                        lkpd2Answered && opt.id === LKPD2_CORRECT ? 'bg-[#006e2f] border-[#006e2f] text-white' :
                        lkpd2Answered && opt.id === lkpd2Answer && opt.id !== LKPD2_CORRECT ? 'bg-[#ba1a1a] border-[#ba1a1a] text-white' :
                        'border-current'
                      }`}>
                        {lkpd2Answered && opt.id === LKPD2_CORRECT ? '✓' :
                         lkpd2Answered && opt.id === lkpd2Answer && opt.id !== LKPD2_CORRECT ? '✗' :
                         opt.id.toUpperCase()}
                      </span>
                      <span className="text-sm font-semibold">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {lkpd2Answered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  {lkpd2Answer === LKPD2_CORRECT ? (
                    <div className="bg-[#e6f4ea] text-[#006e2f] p-4 rounded-xl text-sm font-bold border border-[#006e2f]/30 flex gap-2">
                      <span className="material-symbols-outlined">check_circle</span> Tepat! Kerang laut menyaring air tercemar (bioakumulasi), sementara wadah stereofoam/plastik luruh saat terkena suhu panas.
                    </div>
                  ) : (
                    <div className="bg-[#fce8e6] text-[#ba1a1a] p-4 rounded-xl text-sm font-bold border border-[#ba1a1a]/30 flex gap-2">
                      <span className="material-symbols-outlined">error</span> Belum tepat. Jawaban yang benar: A.
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            <motion.button 
              onClick={handleNext} 
              disabled={!lkpd2Answered || lkpd2Answer !== LKPD2_CORRECT}
              whileHover={(lkpd2Answered && lkpd2Answer === LKPD2_CORRECT) ? { scale: 1.02 } : {}}
              whileTap={(lkpd2Answered && lkpd2Answer === LKPD2_CORRECT) ? { scale: 0.98 } : {}}
              className="w-full relative inline-flex items-center justify-center gap-3 py-5 font-extrabold text-white text-lg font-[family-name:var(--font-outfit)] rounded-2xl transition-all disabled:opacity-50 disabled:grayscale"
              style={{
                background: 'linear-gradient(to bottom, #006591, #004c6e)',
                border: '3px solid #083b54',
                boxShadow: (lkpd2Answered && lkpd2Answer === LKPD2_CORRECT) ? '0 8px 16px rgba(0,0,0,0.2)' : 'none',
              }}
            >
              Lanjutkan ke Tahap 4: Organ Dalam <span className="material-symbols-outlined text-2xl">arrow_forward</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
