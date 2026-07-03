'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MICROPLASTIC_JOURNEY_ITEMS, type DragItem } from '@/lib/dragDropData';

// ─── SVG Illustrations ────────────────────────────────────────────────────────
const STEP_SVG: Record<string, React.ReactNode> = {
  'step-1': (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <circle cx="40" cy="40" r="36" fill="#fce8e6"/>
      <rect x="28" y="34" width="24" height="22" rx="3" fill="#ba1a1a"/>
      <path d="M24 34h32" stroke="#93000a" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 34v-6a2 2 0 012-2h12a2 2 0 012 2v6" stroke="#93000a" strokeWidth="2" strokeLinecap="round"/>
      <path d="M34 44c0 0 3-3 12 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <path d="M35 50c0 0 3-2 10 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
  'step-2': (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <circle cx="40" cy="40" r="36" fill="#fff8ed"/>
      <circle cx="40" cy="26" r="10" fill="#f0a345"/>
      <path d="M40 16V10M28 26L22 23M52 26L58 23M30 18L25 13M50 18L55 13" stroke="#f0a345" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M28 54 Q40 60 52 54 Q48 46 40 44 Q32 46 28 54Z" fill="#c9e6ff" opacity="0.6"/>
      <circle cx="35" cy="51" r="3" fill="#006591" opacity="0.9"/>
      <circle cx="44" cy="55" r="2" fill="#006591" opacity="0.7"/>
      <circle cx="40" cy="48" r="1.8" fill="#006591" opacity="0.6"/>
    </svg>
  ),
  'step-3': (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <circle cx="40" cy="40" r="36" fill="#e4f1f9"/>
      <path d="M12 46 Q26 34 40 46 Q54 58 68 46" stroke="#006591" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M12 55 Q26 43 40 55 Q54 67 68 55" stroke="#006591" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"/>
      <circle cx="26" cy="42" r="4" fill="#ba1a1a" opacity="0.85"/>
      <circle cx="44" cy="50" r="3" fill="#ba1a1a" opacity="0.7"/>
      <circle cx="58" cy="43" r="2.5" fill="#ba1a1a" opacity="0.6"/>
    </svg>
  ),
  'step-4': (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <circle cx="40" cy="40" r="36" fill="#e6f4ea"/>
      <path d="M16 40 Q28 26 44 33 Q62 40 64 40 Q58 50 44 50 Q28 58 16 40Z" fill="#006591" opacity="0.75"/>
      <circle cx="24" cy="39" r="3" fill="white" opacity="0.95"/>
      <circle cx="25" cy="39" r="1.2" fill="#083b54"/>
      <circle cx="38" cy="41" r="2.5" fill="#ba1a1a" opacity="0.8"/>
      <circle cx="46" cy="37" r="2" fill="#ba1a1a" opacity="0.7"/>
    </svg>
  ),
  'step-5': (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <circle cx="40" cy="40" r="36" fill="#fff8ed"/>
      <rect x="24" y="42" width="32" height="20" rx="4" fill="#f0a345" opacity="0.25" stroke="#d27b22" strokeWidth="1.5"/>
      <path d="M24 50 L56 50" stroke="#d27b22" strokeWidth="1.5"/>
      <ellipse cx="40" cy="42" rx="14" ry="6" fill="#e8d5b7" stroke="#d27b22" strokeWidth="1.5"/>
      <path d="M32 38 Q40 28 48 38" stroke="#d27b22" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="36" cy="55" r="2" fill="#ba1a1a" opacity="0.8"/>
      <circle cx="44" cy="58" r="2" fill="#ba1a1a" opacity="0.7"/>
    </svg>
  ),
};

const STEP_LABEL: Record<string, string> = {
  'step-1': 'Sampah Plastik',
  'step-2': 'Jadi Mikroplastik',
  'step-3': 'Cemari Perairan',
  'step-4': 'Dimakan Ikan',
  'step-5': 'Masuk ke Tubuh',
};

const STEP_DESC: Record<string, string> = {
  'step-1': 'Plastik dibuang sembarangan.',
  'step-2': 'UV & ombak memecah < 5mm.',
  'step-3': 'Tersebar ke sungai & lautan.',
  'step-4': 'Ikan menelan partikel plastik.',
  'step-5': 'Masuk ke tubuh lewat makanan.',
};

const STEP_BG: Record<string, string> = {
  'step-1': '#fce8e6',
  'step-2': '#fff3e0',
  'step-3': '#e4f1f9',
  'step-4': '#e6f4ea',
  'step-5': '#fff8ed',
};

const STEP_ACCENT: Record<string, string> = {
  'step-1': '#ba1a1a',
  'step-2': '#d27b22',
  'step-3': '#006591',
  'step-4': '#006e2f',
  'step-5': '#d27b22',
};

// ─── Wood Button ──────────────────────────────────────────────────────────────
function WoodButton({ onClick, children, disabled, sm }: {
  onClick: () => void; children: React.ReactNode; disabled?: boolean; sm?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick} disabled={disabled}
      whileHover={!disabled ? { scale: 1.04, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      className={`inline-flex items-center justify-center gap-2 font-extrabold text-[#3b2313] font-[family-name:var(--font-outfit)] rounded-xl disabled:opacity-40 disabled:cursor-not-allowed ${sm ? 'px-5 py-2.5 text-sm' : 'px-8 py-3 text-base'}`}
      style={{
        background: 'linear-gradient(to bottom, #f5b55a, #d27b22)',
        border: '2.5px solid #8e4912',
        boxShadow: disabled ? 'none' : 'inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -3px 0 rgba(0,0,0,0.15), 0 6px 16px rgba(142,73,18,0.3)',
      }}
    >{children}</motion.button>
  );
}

// ─── Drag Card ────────────────────────────────────────────────────────────────
function DragCard({ item, index, isDragging, isOver, onDragStart, onDragEnter, onDragEnd }: {
  item: DragItem; index: number; isDragging: boolean; isOver: boolean;
  onDragStart: (i: number) => void; onDragEnter: (i: number) => void; onDragEnd: () => void;
}) {
  const accent = STEP_ACCENT[item.id];
  return (
    <motion.div
      layout
      draggable
      onDragStart={() => onDragStart(index)}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      animate={{ scale: isDragging ? 0.95 : isOver ? 1.02 : 1, opacity: isDragging ? 0.35 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="select-none cursor-grab active:cursor-grabbing flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 bg-white transition-colors"
      style={{
        borderColor: isOver ? accent : 'transparent',
        boxShadow: isOver ? `0 6px 20px ${accent}33` : '0 2px 8px rgba(0,0,0,0.07)',
      }}
    >
      <div className="flex-shrink-0 w-7 h-7 rounded-full text-white text-xs font-extrabold font-[family-name:var(--font-outfit)] flex items-center justify-center"
        style={{ background: accent }}>
        {index + 1}
      </div>
      <div className="w-9 h-9 flex-shrink-0" style={{ background: STEP_BG[item.id], borderRadius: 10, padding: 2 }}>
        {STEP_SVG[item.id]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[#083b54] text-sm font-[family-name:var(--font-outfit)] leading-none">
          {STEP_LABEL[item.id]}
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">{STEP_DESC[item.id]}</p>
      </div>
      <div className="flex-shrink-0 flex flex-col gap-0.5 opacity-25">
        {[0, 1, 2].map(i => (
          <div key={i} className="flex gap-0.5">
            <div className="w-1 h-1 rounded-full bg-slate-500" />
            <div className="w-1 h-1 rounded-full bg-slate-500" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Stage3MaterialIntro({ onComplete }: { onComplete: () => void }) {
  const [view, setView] = useState<'learn' | 'drag'>('learn');
  const [items, setItems] = useState<DragItem[]>(() => {
    const arr = [...MICROPLASTIC_JOURNEY_ITEMS];
    do {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    } while (arr.every((x, i) => x.correctOrder === i + 1));
    return arr;
  });

  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [attempts, setAttempts] = useState(0);
  const dragIdx = useRef<number | null>(null);
  const dropIdx = useRef<number | null>(null);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const onDragStart = useCallback((i: number) => { dragIdx.current = i; setDraggingIdx(i); setFeedback('idle'); }, []);
  const onDragEnter = useCallback((i: number) => { dropIdx.current = i; setOverIdx(i); }, []);
  const onDragEnd = useCallback(() => {
    const from = dragIdx.current, to = dropIdx.current;
    if (from !== null && to !== null && from !== to) {
      setItems(prev => {
        const next = [...prev];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        return next;
      });
    }
    dragIdx.current = null; dropIdx.current = null;
    setDraggingIdx(null); setOverIdx(null);
  }, []);

  function checkOrder() {
    const ok = items.every((x, i) => x.correctOrder === i + 1);
    setAttempts(a => a + 1);
    setFeedback(ok ? 'correct' : 'wrong');
    if (!ok) setTimeout(() => setFeedback('idle'), 1800);
  }

  const ordered = [...MICROPLASTIC_JOURNEY_ITEMS].sort((a, b) => a.correctOrder - b.correctOrder);

  // The journey layout has a fixed header of h-28 (112px). 
  // We fill exactly the remaining viewport height with overflow-hidden.
  return (
    <div
      className="flex flex-col overflow-hidden relative font-[family-name:var(--font-inter)]"
      style={{
        height: 'calc(100vh - 7rem)',  // 7rem = h-28 (journey navbar)
        background: 'linear-gradient(160deg, #083b54 0%, #006591 45%, #004c6e 100%)',
      }}
    >
      {/* Background blobs */}
      <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: '#6bff8f' }} />
      <div className="absolute bottom-[-80px] left-[-60px] w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: '#f0a345' }} />
      {/* Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: 3 + (i % 4), height: 3 + (i % 4),
            background: ['#6bff8f55', '#f0a34555', '#ffffff22', '#c9e6ff44'][i % 4],
            left: `${(i * 43 + 9) % 100}%`, top: `${(i * 61 + 15) % 100}%`,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
        />
      ))}

      {/* Content — fills remaining height, no scroll */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 overflow-hidden">
        <AnimatePresence mode="wait">

          {/* ═══ VIEW 1: MATERI ═══ */}
          {view === 'learn' && (
            <motion.div key="learn"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-4xl flex flex-col items-center gap-4"
            >
              {/* Badge + Title */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ background: 'rgba(107,255,143,0.12)', border: '1px solid rgba(107,255,143,0.35)', color: '#6bff8f' }}>
                  <motion.span className="w-1.5 h-1.5 rounded-full bg-[#6bff8f]"
                    animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                  Tahap 3 · Penguatan Materi
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight font-[family-name:var(--font-outfit)]">
                  Dari Sampah{' '}
                  <span className="text-[#6bff8f]">ke Piringmu</span>
                </h1>
              </div>

              {/* Flow — 5 cards horizontal */}
              <div className="w-full flex items-start justify-center gap-2">
                {ordered.map((item, i) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ scale: 1.07, y: -4 }}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-2xl w-[110px] sm:w-[128px] cursor-default"
                      style={{ background: STEP_BG[item.id], boxShadow: `0 4px 16px ${STEP_ACCENT[item.id]}22` }}
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14">{STEP_SVG[item.id]}</div>
                      <p className="text-[11px] sm:text-xs font-bold text-center text-[#083b54] leading-tight font-[family-name:var(--font-outfit)]">
                        {STEP_LABEL[item.id]}
                      </p>
                      <p className="text-[10px] text-slate-500 text-center leading-tight hidden sm:block">
                        {STEP_DESC[item.id]}
                      </p>
                    </motion.div>
                    {i < ordered.length - 1 && (
                      <motion.svg width="20" height="14" viewBox="0 0 20 14" fill="none" className="flex-shrink-0 mb-4"
                        animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}>
                        <path d="M1 7 H16 M11 2 L16 7 L11 12" stroke="#6bff8f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                    )}
                  </div>
                ))}
              </div>

              {/* Stats pills */}
              <div className="flex gap-3 flex-wrap justify-center">
                {[
                  { val: '< 5 mm', sub: 'Ukuran Mikroplastik' },
                  { val: '94%', sub: 'Lautan Tercemar' },
                  { val: '28–90', sub: 'Partikel/100g Kerang' },
                ].map(f => (
                  <div key={f.sub} className="px-4 py-2 rounded-full text-center"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <p className="text-white font-extrabold text-lg leading-none font-[family-name:var(--font-outfit)]">{f.val}</p>
                    <p className="text-blue-200 text-[11px]">{f.sub}</p>
                  </div>
                ))}
              </div>

              <WoodButton onClick={() => setView('drag')}>
                Siap Tantangan?
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9 H15 M10 4 L15 9 L10 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </WoodButton>
            </motion.div>
          )}

          {/* ═══ VIEW 2: DRAG & DROP ═══ */}
          {view === 'drag' && (
            <motion.div key="drag"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-lg flex flex-col items-center gap-3"
            >
              {/* Title */}
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white font-[family-name:var(--font-outfit)] mb-1">
                  Susun Urutannya! 🧩
                </h2>
                <p className="text-blue-200 text-sm">
                  <span className="text-[#6bff8f] font-bold">Seret & lepas</span> kartu ke posisi yang benar.
                </p>
              </div>

              {/* Drag area */}
              <div className="w-full p-3 rounded-2xl flex flex-col gap-2 transition-all"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: `2px solid ${feedback === 'correct' ? '#6bff8f' : feedback === 'wrong' ? '#ff6b6b' : 'rgba(255,255,255,0.12)'}`,
                  backdropFilter: 'blur(16px)',
                  boxShadow: feedback === 'correct' ? '0 0 40px rgba(107,255,143,0.2)' : 'none',
                }}>
                {items.map((item, index) => (
                  <DragCard
                    key={item.id} item={item} index={index}
                    isDragging={draggingIdx === index}
                    isOver={overIdx === index && draggingIdx !== index}
                    onDragStart={onDragStart} onDragEnter={onDragEnter} onDragEnd={onDragEnd}
                  />
                ))}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {feedback === 'correct' && (
                  <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="w-full py-3 px-5 rounded-xl text-center"
                    style={{ background: 'rgba(107,255,143,0.12)', border: '1.5px solid rgba(107,255,143,0.45)' }}>
                    <p className="text-[#6bff8f] font-extrabold font-[family-name:var(--font-outfit)]">
                      🎉 Tepat Sekali! Urutan sudah benar.
                    </p>
                  </motion.div>
                )}
                {feedback === 'wrong' && (
                  <motion.div initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: [0, -8, 8, -5, 5, 0] }}
                    exit={{ opacity: 0 }}
                    className="w-full py-3 px-5 rounded-xl text-center"
                    style={{ background: 'rgba(186,26,26,0.15)', border: '1.5px solid rgba(186,26,26,0.4)' }}>
                    <p className="text-[#ff8c8c] font-bold font-[family-name:var(--font-outfit)]">
                      Belum tepat — yuk coba lagi! 💪
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {attempts > 0 && feedback === 'idle' && (
                <p className="text-blue-300 text-xs">Percobaan ke-{attempts} — jangan menyerah!</p>
              )}

              {/* Actions */}
              <div className="flex gap-3 justify-center">
                {feedback !== 'correct' ? (
                  <WoodButton onClick={checkOrder}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8 L6 12 L14 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Cek Urutan
                  </WoodButton>
                ) : (
                  <WoodButton onClick={onComplete}>
                    Mulai Uji Makananku!
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9 H15 M10 4 L15 9 L10 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </WoodButton>
                )}
                <motion.button
                  onClick={() => setView('learn')}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-blue-200 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  ← Materi
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
