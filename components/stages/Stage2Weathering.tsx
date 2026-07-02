'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, PanInfo, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────
type LabPhase = 'lab' | 'breaking' | 'complete';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  w: number; h: number; opacity: number; color: string;
}

// ─── Plastic Objects Data ─────────────────────────────────────────────────────
const PLASTIC_OBJECTS = [
  { id: 'bottle', emoji: '🍶', label: 'Botol Minum', type: 'PET', years: 450, color: '#B3E5FC', strokeColor: '#64B5F6' },
  { id: 'bag', emoji: '🛍️', label: 'Kantong Kresek', type: 'LDPE', years: 1000, color: '#E1BEE7', strokeColor: '#AB47BC' },
  { id: 'cap', emoji: '🧴', label: 'Tutup Botol', type: 'PP', years: 400, color: '#FFCCBC', strokeColor: '#FF7043' },
  { id: 'straw', emoji: '🥤', label: 'Sedotan', type: 'PP', years: 200, color: '#F8BBD0', strokeColor: '#E91E63' },
  { id: 'jug', emoji: '🫙', label: 'Jerigen', type: 'HDPE', years: 500, color: '#C8E6C9', strokeColor: '#43A047' },
];

// ─── Pertanyaan Evaluasi (LKPD) ───────────────────────────────────────────────
const EVALUATION_QUESTIONS = [
  {
    id: 1,
    text: "Berdasarkan eksperimen tadi, proses utama apa yang menyebabkan plastik akhirnya hancur berkeping-keping?",
    options: [
      { id: 'a', text: 'Fotodegradasi (UV) + Abrasi Mekanis (Ombak)' },
      { id: 'b', text: 'Pembakaran oleh panas + Biodegradasi bakteri' },
      { id: 'c', text: 'Hidrolisis air hujan + Oksidasi udara' }
    ],
    correct: 'a'
  },
  {
    id: 2,
    text: "Mengapa alat 'Bakteri' gagal menghancurkan plastik pada simulasi tadi?",
    options: [
      { id: 'a', text: 'Karena bakteri laut tidak bisa menempel pada permukaan yang licin' },
      { id: 'b', text: 'Karena plastik adalah polimer buatan (sintetis) yang tidak dikenali enzim bakteri alami' },
      { id: 'c', text: 'Karena air laut terlalu asin sehingga bakteri mati' }
    ],
    correct: 'b'
  },
  {
    id: 3,
    text: "Setelah hancur berkeping-keping, disebut apakah serpihan plastik tak kasat mata tersebut?",
    options: [
      { id: 'a', text: 'Bioplastik' },
      { id: 'b', text: 'Mikroplastik' },
      { id: 'c', text: 'Makroplastik' }
    ],
    correct: 'c'
  }
];

// ─── SVG Shapes per Object ────────────────────────────────────────────────────
function PlasticSVG({ objectId, uvExposure, breaking }: { objectId: string, uvExposure: number, breaking: boolean }) {
  const filter = `brightness(${1 - uvExposure * 0.003}) sepia(${uvExposure * 0.6}%) saturate(${Math.max(0.2, 1 - uvExposure * 0.008)})`;
  const obj = PLASTIC_OBJECTS.find(o => o.id === objectId)!;
  const crackOpacity = (threshold: number) => Math.max(0, (uvExposure - threshold) / (100 - threshold));

  const cls = `transition-all duration-500 drop-shadow-2xl mx-auto block ${breaking ? 'opacity-0 scale-50' : 'opacity-100 scale-150'}`;

  if (objectId === 'bottle') {
    return (
      <svg width="100" height="200" viewBox="0 0 130 240" className={cls} style={{ filter }}>
        <rect x="45" y="0" width="40" height="22" rx="7" fill={obj.strokeColor} />
        <rect x="30" y="22" width="70" height="196" rx="18" fill={obj.color} fillOpacity="0.9" stroke={obj.strokeColor} strokeWidth="2" />
        <rect x="40" y="42" width="12" height="130" rx="6" fill="white" fillOpacity="0.4" />
        <rect x="35" y="80" width="60" height="70" rx="6" fill="#006591" fillOpacity="0.15" />
        <text x="65" y="118" textAnchor="middle" fill="#006591" fontSize="10" fontWeight="bold">PET</text>
        {uvExposure > 25 && <line x1="50" y1="55" x2="82" y2="95" stroke="#ba1a1a" strokeWidth="1.5" opacity={crackOpacity(25)} />}
        {uvExposure > 50 && <line x1="55" y1="110" x2="95" y2="145" stroke="#ba1a1a" strokeWidth="1" opacity={crackOpacity(50)} />}
        {uvExposure > 70 && <line x1="38" y1="150" x2="78" y2="185" stroke="#ba1a1a" strokeWidth="1.5" opacity={crackOpacity(70)} />}
      </svg>
    );
  }

  if (objectId === 'bag') {
    return (
      <svg width="100" height="140" viewBox="0 0 130 180" className={cls} style={{ filter }}>
        <path d="M20 30 Q65 10 110 30 L100 160 Q65 175 30 160 Z" fill={obj.color} fillOpacity="0.9" stroke={obj.strokeColor} strokeWidth="2" />
        <path d="M50 30 Q65 15 80 30" fill="none" stroke={obj.strokeColor} strokeWidth="3" strokeLinecap="round" />
        <path d="M45 30 Q65 12 85 30" fill="none" stroke={obj.strokeColor} strokeWidth="2" strokeLinecap="round" />
        <rect x="40" y="55" width="55" height="35" rx="5" fill="#fff" fillOpacity="0.15" />
        <text x="65" y="78" textAnchor="middle" fill="#5c2666" fontSize="10" fontWeight="bold">LDPE</text>
        {uvExposure > 30 && <line x1="45" y1="80" x2="90" y2="110" stroke="#ba1a1a" strokeWidth="1.5" opacity={crackOpacity(30)} />}
        {uvExposure > 60 && <line x1="70" y1="50" x2="50" y2="130" stroke="#ba1a1a" strokeWidth="1" opacity={crackOpacity(60)} />}
      </svg>
    );
  }

  if (objectId === 'cap') {
    return (
      <svg width="100" height="100" viewBox="0 0 130 130" className={cls} style={{ filter }}>
        <ellipse cx="65" cy="65" rx="52" ry="52" fill={obj.color} fillOpacity="0.9" stroke={obj.strokeColor} strokeWidth="2.5" />
        <ellipse cx="65" cy="65" rx="40" ry="40" fill="none" stroke={obj.strokeColor} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
        <ellipse cx="52" cy="52" rx="12" ry="8" fill="white" fillOpacity="0.3" />
        <text x="65" y="70" textAnchor="middle" fill="#5d4037" fontSize="12" fontWeight="bold">PP</text>
        {uvExposure > 35 && <line x1="30" y1="40" x2="90" y2="100" stroke="#ba1a1a" strokeWidth="2" opacity={crackOpacity(35)} />}
        {uvExposure > 65 && <line x1="90" y1="30" x2="30" y2="90" stroke="#ba1a1a" strokeWidth="1.5" opacity={crackOpacity(65)} />}
      </svg>
    );
  }

  if (objectId === 'straw') {
    return (
      <svg width="50" height="200" viewBox="0 0 60 260" className={cls} style={{ filter }}>
        <rect x="15" y="10" width="30" height="240" rx="15" fill={obj.color} fillOpacity="0.9" stroke={obj.strokeColor} strokeWidth="2" />
        <rect x="22" y="20" width="8" height="200" rx="4" fill="white" fillOpacity="0.3" />
        {uvExposure > 20 && <line x1="18" y1="80" x2="42" y2="120" stroke="#ba1a1a" strokeWidth="1.5" opacity={crackOpacity(20)} />}
        {uvExposure > 55 && <line x1="18" y1="150" x2="42" y2="190" stroke="#ba1a1a" strokeWidth="1" opacity={crackOpacity(55)} />}
      </svg>
    );
  }

  if (objectId === 'jug') {
    return (
      <svg width="110" height="160" viewBox="0 0 140 200" className={cls} style={{ filter }}>
        <rect x="30" y="20" width="80" height="160" rx="14" fill={obj.color} fillOpacity="0.9" stroke={obj.strokeColor} strokeWidth="2.5" />
        <rect x="30" y="10" width="50" height="20" rx="8" fill={obj.strokeColor} />
        <path d="M110 50 Q135 70 110 110" fill="none" stroke={obj.strokeColor} strokeWidth="8" strokeLinecap="round" />
        <rect x="42" y="40" width="16" height="100" rx="8" fill="white" fillOpacity="0.3" />
        <text x="70" y="115" textAnchor="middle" fill="#1b5e20" fontSize="10" fontWeight="bold">HDPE</text>
        {uvExposure > 40 && <line x1="45" y1="60" x2="95" y2="100" stroke="#ba1a1a" strokeWidth="2" opacity={crackOpacity(40)} />}
        {uvExposure > 75 && <line x1="95" y1="130" x2="45" y2="170" stroke="#ba1a1a" strokeWidth="1.5" opacity={crackOpacity(75)} />}
      </svg>
    );
  }

  return null;
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface Props {
  onComplete: () => void;
  videoUrl?: string;
}

export default function Stage2Weathering({ onComplete, videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ' }: Props) {
  const [hasWatched, setHasWatched] = useState(false);
  const [labPhase, setLabPhase] = useState<LabPhase>('lab');
  const [selectedObject, setSelectedObject] = useState('bottle');
  const [uvExposure, setUvExposure] = useState(0);
  const [bottleIntegrity, setBottleIntegrity] = useState(100);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'info' | 'error' | 'success'>('info');
  
  // State for evaluation questions
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const phaseRef = useRef(labPhase);
  phaseRef.current = labPhase;

  const showMessage = (text: string, type: 'info' | 'error' | 'success' = 'info') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSelectObject = (id: string) => {
    if (labPhase === 'breaking' || labPhase === 'complete') return;
    setSelectedObject(id);
    setUvExposure(0);
    setBottleIntegrity(100);
    setMessage('');
  };

  const handleDragEnd = (tool: 'uv' | 'wave' | 'bacteria', info: PanInfo) => {
    if (info.offset.y > -20) return;

    if (tool === 'bacteria') {
      showMessage('❌ Bakteri: "Plastik ini sintetis, aku tidak bisa memakannya!"', 'error');
    } else if (tool === 'uv') {
      if (uvExposure < 100) {
        setUvExposure(prev => Math.min(100, prev + 35));
        showMessage('☀️ Sinar UV memutus ikatan polimer, plastik mulai melemah.', 'info');
      } else {
        showMessage('Objek sudah mencapai batas kerapuhan dari UV!', 'info');
      }
    } else if (tool === 'wave') {
      if (uvExposure < 50) {
        showMessage('🌊 Ombak menerjang, tapi plastiknya masih terlalu kuat!', 'error');
      } else {
        const damage = uvExposure >= 100 ? 50 : 25;
        setBottleIntegrity(prev => {
          const next = Math.max(0, prev - damage);
          if (next <= 0) triggerBreak();
          else showMessage('💥 Ombak meretakkan plastik yang getas.', 'success');
          return next;
        });
      }
    }
  };

  const triggerBreak = useCallback(() => {
    if (phaseRef.current === 'breaking' || phaseRef.current === 'complete') return;
    setLabPhase('breaking');
    showMessage('💥 Hancur menjadi jutaan mikroplastik!', 'success');
    const colors = ['#90caf9', '#80cbc4', '#ce93d8', '#fff176', '#ef9a9a', '#a5d6a7'];
    particlesRef.current = Array.from({ length: 150 }, () => ({
      x: 0.5, y: 0.5,
      vx: (Math.random() - 0.5) * 0.018,
      vy: (Math.random() - 0.5) * 0.018 - 0.01,
      w: Math.random() * 0.025 + 0.01,
      h: Math.random() * 0.025 + 0.01,
      opacity: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  useEffect(() => {
    if (labPhase !== 'breaking') return;
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.map(p => ({
        ...p,
        x: p.x + p.vx, y: p.y + p.vy + 0.0015,
        vy: p.vy + 0.0004, opacity: p.opacity - 0.006,
      })).filter(p => p.opacity > 0);

      particlesRef.current.forEach(p => {
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.roundRect(p.x * canvas.width, p.y * canvas.height, p.w * canvas.width, p.h * canvas.height, 4);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      if (particlesRef.current.length > 0) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setLabPhase('complete');
          // Smooth scroll down to evaluation after lab breaks
          setTimeout(() => {
            window.scrollBy({ top: 400, behavior: 'smooth' });
          }, 300);
        }, 400);
      }
    }
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [labPhase]);

  const obj = PLASTIC_OBJECTS.find(o => o.id === selectedObject)!;

  // Check if all questions are answered and correct
  const allAnswered = EVALUATION_QUESTIONS.every(q => answers[q.id]);
  const allCorrect = EVALUATION_QUESTIONS.every(q => answers[q.id] === q.correct);

  const handleSubmitEvaluation = () => {
    if (allCorrect) {
      onComplete();
    } else {
      setShowErrors(true);
      showMessage('❌ Masih ada jawaban yang belum tepat. Silakan periksa kembali!', 'error');
    }
  };

  return (
    <div className="w-full h-full font-[family-name:var(--font-inter)] relative flex flex-col items-center justify-start max-w-5xl mx-auto py-6">

      {/* ── PHASE 1: VIDEO TAYANGAN AWAL ── */}
      <AnimatePresence mode="wait">
        {!hasWatched && (
          <motion.div 
            key="video-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-3xl mx-auto flex flex-col gap-6 mt-10"
          >
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-[#083b54] font-[family-name:var(--font-outfit)] leading-tight mb-2">
                Tahap 2: Pelapukan Plastik
              </h1>
              <p className="text-[#3e4850] text-base">
                Tonton penjelasan singkat di bawah ini sebelum kamu memulai uji laboratorium.
              </p>
            </div>

            {/* Video Player - Soft Glass Frame */}
            <div className="rounded-[32px] overflow-hidden shadow-2xl bg-white border-[6px] border-white">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-[24px]"
                  src={videoUrl}
                  title="Video Pelapukan"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Button Lanjut */}
            <div className="flex justify-center mt-4 mb-20">
              <motion.button
                onClick={() => setHasWatched(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center justify-center gap-2 px-10 py-5 font-extrabold text-[#3b2313] text-xl font-[family-name:var(--font-outfit)] transition-all"
                style={{
                  background: 'linear-gradient(to bottom, #f0a345, #d27b22)',
                  border: '3px solid #8e4912',
                  borderRadius: '24px',
                  boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.2), inset 0 -4px 0 rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.2)',
                }}
              >
                <span className="absolute left-4 w-3 h-3 rounded-full bg-[#5a2e0a] shadow-inner" />
                <span className="absolute right-4 w-3 h-3 rounded-full bg-[#5a2e0a] shadow-inner" />
                <span className="material-symbols-outlined text-2xl">science</span>
                Mulai Virtual Lab
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── PHASE 2: VIRTUAL LAB ── */}
        {hasWatched && (
          <motion.div 
            key="lab-phase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col gap-6"
          >
            {/* Object Selection Tabs (Soft, Not Boxy) */}
            <div className="flex flex-wrap gap-4 justify-center">
              {PLASTIC_OBJECTS.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelectObject(item.id)}
                  className={`flex flex-col items-center gap-1 px-6 py-3 rounded-[24px] transition-all border-2 ${
                    selectedObject === item.id 
                      ? 'bg-white border-[#006591] text-[#006591] shadow-lg scale-110 z-10' 
                      : 'bg-white/60 border-transparent text-[#6e7881] hover:bg-white/90 hover:scale-105'
                  }`}
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <span className="text-sm font-extrabold font-[family-name:var(--font-outfit)]">{item.label}</span>
                </button>
              ))}
            </div>

            {/* The Lab Area - Soft Water Gradient (Fixed Height to not jump around) */}
            <div className="w-full h-[500px] rounded-[40px] overflow-hidden shadow-xl relative flex flex-col border-[4px] border-white bg-gradient-to-b from-[#e4f1f9] to-[#c9e6ff] transition-all duration-700">
              
              {/* Subtle water waves decoration */}
              <div className="absolute inset-0 pointer-events-none opacity-50">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bottom-0 left-0 right-0 h-48"
                    style={{ background: `linear-gradient(to top, #ffffff, transparent)` }}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i }}
                  />
                ))}
              </div>

              {/* Notifikasi Pop-up Lembut */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    key={message}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 z-50 w-max max-w-md"
                  >
                    <div className={`px-6 py-3 rounded-full shadow-lg backdrop-blur-md border-2 text-center text-sm font-bold ${
                      messageType === 'error' ? 'bg-white/90 border-[#ba1a1a] text-[#ba1a1a]' :
                      messageType === 'success' ? 'bg-white/90 border-[#006e2f] text-[#006e2f]' :
                      'bg-white/90 border-[#006591] text-[#006591]'
                    }`}>
                      {message}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* HUD Indicators */}
              <div className="absolute top-8 right-8 flex flex-col gap-3 z-20">
                <div className="bg-white/70 backdrop-blur-sm border-2 border-white rounded-2xl px-5 py-3 w-40 shadow-sm">
                  <p className="text-[#006591] text-xs font-bold uppercase tracking-widest mb-2 flex justify-between">
                    <span>Sinar UV</span> <span>{uvExposure}%</span>
                  </p>
                  <div className="w-full bg-[#c9e6ff] h-3 rounded-full overflow-hidden shadow-inner">
                    <motion.div className="h-full bg-[#f0a345]" animate={{ width: `${uvExposure}%` }} />
                  </div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm border-2 border-white rounded-2xl px-5 py-3 w-40 shadow-sm">
                  <p className="text-[#006e2f] text-xs font-bold uppercase tracking-widest mb-2 flex justify-between">
                    <span>Fisik</span> <span>{bottleIntegrity}%</span>
                  </p>
                  <div className="w-full bg-[#c9e6ff] h-3 rounded-full overflow-hidden shadow-inner">
                    <motion.div className="h-full bg-[#6bff8f]" animate={{ width: `${bottleIntegrity}%` }} />
                  </div>
                </div>
              </div>

              {/* Canvas Area (Central Focus) */}
              <div className="flex-1 relative flex items-center justify-center">
                {labPhase !== 'complete' && (
                  <motion.div animate={labPhase === 'lab' ? { y: [0, -15, 0] } : {}} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                    <PlasticSVG objectId={selectedObject} uvExposure={uvExposure} breaking={labPhase === 'breaking'} />
                  </motion.div>
                )}
                {labPhase === 'complete' && (
                  <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                     <div className="w-20 h-20 rounded-full bg-white/50 flex items-center justify-center text-5xl mb-4 shadow-xl border-4 border-white">🎉</div>
                     <h3 className="font-extrabold font-[family-name:var(--font-outfit)] text-[#083b54] text-3xl">Berhasil Hancur!</h3>
                     <p className="text-[#006591] font-bold mt-2">Plastik telah menjadi mikroplastik di lautan.</p>
                  </motion.div>
                )}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
              </div>

              {/* Draggable Tools Desk (Bottom) - Only show if not complete */}
              <AnimatePresence>
                {labPhase === 'lab' && (
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
                    className="relative z-20 p-6 flex justify-center gap-8 bg-white/10 backdrop-blur-sm border-t border-white/40"
                  >
                    <ToolTile id="uv" icon="wb_sunny" label="Panas Matahari" desc="(UV)" color="from-[#fff3d4] to-[#fde08b]" textColor="text-[#b27b00]" onDragEnd={handleDragEnd} />
                    <ToolTile id="wave" icon="waves" label="Abrasi Pantai" desc="(Ombak)" color="from-[#e4f1f9] to-[#c9e6ff]" textColor="text-[#006591]" onDragEnd={handleDragEnd} />
                    <ToolTile id="bacteria" icon="coronavirus" label="Biodegradasi" desc="(Bakteri)" color="from-[#e6f4ea] to-[#c8e6c9]" textColor="text-[#006e2f]" onDragEnd={handleDragEnd} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* ── PHASE 3: EVALUATION LKPD (Muncul di bawah lab) ── */}
            <AnimatePresence>
              {labPhase === 'complete' && (
                <motion.div 
                  initial={{ opacity: 0, y: 50, height: 0 }} 
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  className="w-full flex flex-col gap-6 mt-4 mb-20"
                >
                  <div className="bg-white rounded-[32px] p-8 shadow-xl border-4 border-[#e4f1f9]">
                    <div className="flex items-center gap-4 mb-8 border-b-2 border-[#e4f1f9] pb-6">
                      <span className="material-symbols-outlined text-4xl text-[#006591]">assignment</span>
                      <div>
                        <h2 className="text-2xl font-extrabold text-[#083b54] font-[family-name:var(--font-outfit)]">Evaluasi Eksperimen</h2>
                        <p className="text-[#6e7881] text-sm">Jawab 3 pertanyaan berikut berdasarkan hasil uji laboratorium virtual tadi.</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-8">
                      {EVALUATION_QUESTIONS.map((q, index) => {
                        const isAnswered = !!answers[q.id];
                        const isCorrect = answers[q.id] === q.correct;
                        const showError = showErrors && isAnswered && !isCorrect;

                        return (
                          <div key={q.id} className="flex flex-col gap-3">
                            <h3 className="font-bold text-[#083b54] text-base flex gap-2">
                              <span className="text-[#006591]">{index + 1}.</span> {q.text}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {q.options.map(opt => (
                                <button
                                  key={opt.id}
                                  onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                                  className={`p-4 rounded-2xl border-2 text-left transition-all text-sm font-semibold flex items-start gap-3 ${
                                    answers[q.id] === opt.id
                                      ? (showErrors && !isCorrect 
                                          ? 'bg-[#fce8e6] border-[#ba1a1a] text-[#ba1a1a] shadow-sm' 
                                          : 'bg-[#e4f1f9] border-[#006591] text-[#006591] shadow-md scale-[1.02]')
                                      : 'bg-white border-[#eceef0] hover:border-[#006591]/50 text-[#3e4850] hover:bg-[#f7f9fb]'
                                  }`}
                                >
                                  <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {answers[q.id] === opt.id && <span className="w-2.5 h-2.5 rounded-full bg-current" />}
                                  </span>
                                  {opt.text}
                                </button>
                              ))}
                            </div>
                            {showError && (
                              <p className="text-[#ba1a1a] text-xs font-bold italic mt-1">Jawaban ini kurang tepat, coba pikirkan lagi peristiwa di lab tadi.</p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-10 pt-6 border-t-2 border-[#e4f1f9] flex justify-end">
                      <motion.button
                        onClick={handleSubmitEvaluation}
                        disabled={!allAnswered}
                        whileHover={allAnswered ? { scale: 1.05 } : {}}
                        whileTap={allAnswered ? { scale: 0.95 } : {}}
                        className="relative inline-flex items-center justify-center gap-3 px-10 py-4 font-extrabold text-[#3b2313] text-lg font-[family-name:var(--font-outfit)] transition-all disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed"
                        style={{
                          background: 'linear-gradient(to bottom, #f0a345, #d27b22)',
                          border: '3px solid #8e4912',
                          borderRadius: '20px',
                          boxShadow: allAnswered ? 'inset 0 4px 0 rgba(255,255,255,0.2), inset 0 -4px 0 rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.2)' : 'none',
                        }}
                      >
                        <span className="absolute left-4 w-2 h-2 rounded-full bg-[#5a2e0a]" />
                        <span className="absolute right-4 w-2 h-2 rounded-full bg-[#5a2e0a]" />
                        Selesai & Lanjut Tahap 3 <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Helper component for Draggable Tools (Bigger Soft Tiles for full screen)
function ToolTile({ id, icon, label, desc, color, textColor, onDragEnd }: { id: any, icon: string, label: string, desc: string, color: string, textColor: string, onDragEnd: any }) {
  return (
    <motion.div
      drag dragSnapToOrigin
      onDragEnd={(_, info) => onDragEnd(id, info)}
      whileDrag={{ scale: 1.15, zIndex: 50, rotate: id === 'uv' ? -5 : 5 }}
      className={`w-32 h-32 rounded-3xl flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing shadow-sm bg-gradient-to-br ${color} border-[3px] border-white hover:shadow-lg transition-shadow`}
    >
      <span className={`material-symbols-outlined ${textColor} text-4xl`}>{icon}</span>
      <div className="text-center">
        <div className={`text-xs font-extrabold ${textColor}`}>{label}</div>
        <div className={`text-[10px] font-bold ${textColor} opacity-70`}>{desc}</div>
      </div>
    </motion.div>
  );
}
