'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

type Phase = 'intro' | 'uv' | 'shake' | 'breaking' | 'complete';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  w: number; h: number; opacity: number; color: string;
}

interface Props {
  onComplete: () => void;
  bg: string;
  arObject: string;
  arObjectAlt: string;
}

export default function Stage2Weathering({ onComplete, bg, arObject, arObjectAlt }: Props) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [uvLevel, setUvLevel] = useState(0);
  const [shakeCount, setShakeCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const lastShakeTime = useRef(0);
  const shakeCountRef = useRef(0);
  const swipePosRef = useRef<{ x: number; y: number } | null>(null);
  const mouseDownRef = useRef(false);
  const uvRef = useRef(0);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  // Sync uvRef with state
  useEffect(() => { uvRef.current = uvLevel; }, [uvLevel]);

  function addUV(delta: number) {
    if (phaseRef.current !== 'uv') return;
    setUvLevel(prev => {
      const next = Math.min(100, prev + delta);
      uvRef.current = next;
      if (next >= 100) setTimeout(() => setPhase('shake'), 600);
      return next;
    });
  }

  // Touch handlers
  function onTouchStart(e: React.TouchEvent) {
    swipePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  function onTouchMove(e: React.TouchEvent) {
    if (!swipePosRef.current) return;
    const dx = e.touches[0].clientX - swipePosRef.current.x;
    const dy = e.touches[0].clientY - swipePosRef.current.y;
    addUV(Math.sqrt(dx * dx + dy * dy) * 0.4);
    swipePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  // Mouse handlers
  function onMouseDown(e: React.MouseEvent) {
    mouseDownRef.current = true;
    swipePosRef.current = { x: e.clientX, y: e.clientY };
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!mouseDownRef.current || !swipePosRef.current) return;
    const dx = e.clientX - swipePosRef.current.x;
    const dy = e.clientY - swipePosRef.current.y;
    addUV(Math.sqrt(dx * dx + dy * dy) * 0.4);
    swipePosRef.current = { x: e.clientX, y: e.clientY };
  }
  function onMouseUp() { mouseDownRef.current = false; }

  // DeviceMotion shake
  useEffect(() => {
    if (phase !== 'shake') return;

    async function requestPermission() {
      if (typeof DeviceMotionEvent !== 'undefined' && typeof (DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
        try {
          const permission = await (DeviceMotionEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
          if (permission !== 'granted') return;
        } catch { /* ignored */ }
      }
    }
    requestPermission();

    function onMotion(e: DeviceMotionEvent) {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const mag = Math.sqrt((acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2);
      const now = Date.now();
      if (mag > 15 && now - lastShakeTime.current > 250) {
        lastShakeTime.current = now;
        shakeCountRef.current++;
        setShakeCount(shakeCountRef.current);
        if (shakeCountRef.current >= 3) triggerBreak();
      }
    }

    window.addEventListener('devicemotion', onMotion);
    return () => window.removeEventListener('devicemotion', onMotion);
  }, [phase]);

  const triggerBreak = useCallback(() => {
    if (phaseRef.current === 'breaking' || phaseRef.current === 'complete') return;
    setPhase('breaking');
    const colors = ['#90caf9', '#80cbc4', '#ce93d8', '#fff176', '#ef9a9a', '#a5d6a7'];
    particlesRef.current = Array.from({ length: 120 }, () => ({
      x: 0.5,
      y: 0.45,
      vx: (Math.random() - 0.5) * 0.012,
      vy: (Math.random() - 0.5) * 0.012 - 0.005,
      w: Math.random() * 0.015 + 0.005,
      h: Math.random() * 0.015 + 0.005,
      opacity: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  // Particle animation
  useEffect(() => {
    if (phase !== 'breaking') return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
    resize();

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy + 0.001,
        vy: p.vy + 0.0003,
        opacity: p.opacity - 0.007,
      })).filter(p => p.opacity > 0);

      particlesRef.current.forEach(p => {
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x * canvas.width, p.y * canvas.height, p.w * canvas.width, p.h * canvas.height);
      });
      ctx.globalAlpha = 1;

      if (particlesRef.current.length > 0) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setPhase('complete'), 500);
      }
    }
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase]);

  const crackOpacity = Math.max(0, (uvLevel - 30) / 70);
  const bottleFilter = `brightness(${1 - uvLevel * 0.004}) sepia(${uvLevel * 0.9}%) saturate(${Math.max(0.1, 1 - uvLevel * 0.009)})`;

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div className="absolute inset-0 bg-black/40" />

      {/* AR Object - bottle with UV degradation */}
      {phase !== 'complete' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative" style={{ filter: bottleFilter }}>
            <img
              src={arObject}
              alt={arObjectAlt}
              className="max-h-[55vh] max-w-[45vw] object-contain"
              style={{
                opacity: phase === 'shake' || phase === 'breaking' ? 0.5 : 1,
                transform: phase === 'shake' ? `rotate(${Math.sin(Date.now() * 0.01) * 3}deg) scale(0.95)` : 'none',
                transition: 'transform 0.1s',
              }}
            />
            {/* Crack overlay */}
            {crackOpacity > 0 && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(${45}deg, transparent, transparent 15px, rgba(255,255,255,${crackOpacity * 0.15}) 15px, rgba(255,255,255,${crackOpacity * 0.15}) 16px),
                    repeating-linear-gradient(${-30}deg, transparent, transparent 25px, rgba(200,200,255,${crackOpacity * 0.1}) 25px, rgba(200,200,255,${crackOpacity * 0.1}) 26px)`,
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* UV info panel */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm p-3 rounded-xl pointer-events-none">
        <p className="text-[10px] text-yellow-400 font-mono font-bold tracking-widest">UV EXPOSURE</p>
        <p className="text-white text-xs mt-0.5">
          {uvLevel < 30 ? 'Mild Sunlight' : uvLevel < 70 ? 'Moderate UV' : 'Extreme UV'}
        </p>
        <div className="w-28 bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{ width: `${uvLevel}%`, background: `hsl(${60 - uvLevel * 0.6}, 100%, 50%)` }}
          />
        </div>
      </div>

      {/* Intro overlay */}
      {phase === 'intro' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="bg-black/80 backdrop-blur-sm p-8 rounded-2xl max-w-sm text-center mx-4">
            <span className="material-symbols-outlined text-yellow-400 text-5xl mb-4 block">wb_sunny</span>
            <h3 className="text-white font-bold text-xl mb-3">Simulasi Fotodegradasi UV</h3>
            <p className="text-white/70 text-sm mb-2">
              Plastik terpapar sinar UV matahari selama bertahun-tahun. Usap layar berulang kali untuk mensimulasikan degradasi.
            </p>
            <p className="text-yellow-400/70 text-xs mb-6">Setelah UV 100%, goyang perangkat 3x untuk memecah plastik (abrasi mekanis ombak).</p>
            <button
              onClick={() => setPhase('uv')}
              className="bg-yellow-500 text-black font-bold px-8 py-3 rounded-xl"
            >
              Mulai Simulasi
            </button>
          </div>
        </div>
      )}

      {/* UV phase HUD */}
      {phase === 'uv' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-5 py-2 rounded-full border border-yellow-400/40">
            <p className="text-yellow-400 text-sm font-mono font-bold">☀ USAP LAYAR UNTUK DEGRADASI UV — {Math.round(uvLevel)}%</p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-72">
            <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{ width: `${uvLevel}%`, background: `hsl(${60 - uvLevel * 0.6}, 100%, 50%)` }}
              />
            </div>
            <p className="text-white/60 text-xs text-center mt-2">
              {uvLevel < 100 ? `${Math.round(100 - uvLevel)}% lagi untuk selesai` : 'Siap! Goyang perangkat!'}
            </p>
          </div>
        </div>
      )}

      {/* Shake phase HUD */}
      {phase === 'shake' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-20">
          <div className="bg-black/80 backdrop-blur-sm p-6 rounded-2xl text-center max-w-xs mx-4">
            <span className="material-symbols-outlined text-blue-400 text-4xl mb-2 block animate-bounce">waves</span>
            <h3 className="text-white font-bold mb-2">Simulasi Abrasi Mekanis Ombak</h3>
            <p className="text-white/70 text-sm mb-4">Goyang perangkat kamu <strong className="text-white">3 kali</strong> untuk memecah plastik seperti gelombang laut!</p>
            <div className="flex justify-center gap-3 mb-4">
              {[0, 1, 2].map(i => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${shakeCount > i ? 'bg-blue-400 border-blue-400' : 'border-white/30'}`}>
                  {shakeCount > i && <span className="material-symbols-outlined text-white text-lg">check</span>}
                </div>
              ))}
            </div>
            <button
              onClick={triggerBreak}
              className="text-white/50 text-xs underline"
            >
              Desktop: klik di sini sebagai pengganti guncangan
            </button>
          </div>
        </div>
      )}

      {/* Complete */}
      {phase === 'complete' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="bg-black/85 backdrop-blur-sm p-8 rounded-2xl max-w-sm text-center mx-4">
            <span className="material-symbols-outlined text-blue-400 text-5xl mb-4 block">grain</span>
            <h3 className="text-white font-bold text-xl mb-3">Plastik Hancur Menjadi Mikroplastik!</h3>
            <p className="text-white/70 text-sm mb-2">
              Botol plastik telah terpecah menjadi ratusan partikel &lt;5mm. Inilah yang disebut <em>mikroplastik</em>.
            </p>
            <p className="text-blue-300 text-xs mb-6">Partikel-partikel ini terbawa arus sungai menuju lautan dan memasuki rantai makanan.</p>
            <button
              onClick={onComplete}
              className="w-full bg-[var(--color-primary)] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              Ikuti Partikel ke Lautan <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
