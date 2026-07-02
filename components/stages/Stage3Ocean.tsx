'use client';
import { useEffect, useRef, useState } from 'react';

interface Props {
  onComplete: () => void;
  bg: string;
}

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; color: string; opacity: number; eaten: boolean;
}

export default function Stage3Ocean({ onComplete, bg }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'intro' | 'animation' | 'complete'>('intro');
  const [eatenCount, setEatenCount] = useState(0);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    if (phase !== 'animation') return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#90caf9', '#80deea', '#e0f7fa', '#b2dfdb', '#fff9c4', '#ffccbc'];
    let particles: Particle[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.3) * 1.2,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 5 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.6 + 0.4,
      eaten: false,
    }));

    let eatenRef = 0;
    let tick = 0;
    let animFrame: number;
    let done = false;

    function drawFish(cx: number, cy: number, t: number) {
      const bobY = cy + Math.sin(t * 0.04) * 10;

      // Body
      ctx.fillStyle = '#ff8f00';
      ctx.beginPath();
      ctx.ellipse(cx, bobY, 55, 30, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tail
      ctx.beginPath();
      ctx.moveTo(cx + 50, bobY);
      ctx.lineTo(cx + 80, bobY - 22);
      ctx.lineTo(cx + 80, bobY + 22);
      ctx.closePath();
      ctx.fill();

      // Fin
      ctx.fillStyle = '#e65100';
      ctx.beginPath();
      ctx.ellipse(cx + 10, bobY - 28, 20, 10, -0.3, 0, Math.PI * 2);
      ctx.fill();

      // Eye white
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(cx - 28, bobY - 6, 9, 0, Math.PI * 2);
      ctx.fill();

      // Pupil
      ctx.fillStyle = '#1a1a2e';
      ctx.beginPath();
      ctx.arc(cx - 30, bobY - 6, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Mouth (open, eating)
      ctx.fillStyle = '#b71c1c';
      ctx.beginPath();
      ctx.arc(cx - 53, bobY + 8, 11, 0, Math.PI);
      ctx.fill();

      return { mouthX: cx - 53, mouthY: bobY + 8 };
    }

    function animate() {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ocean gradient overlay
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, 'rgba(0, 60, 140, 0.5)');
      grad.addColorStop(1, 'rgba(0, 15, 50, 0.7)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Bubbles
      for (let i = 0; i < 8; i++) {
        const bx = ((i * 137 + tick * 0.3) % canvas.width);
        const by = canvas.height - ((tick * 0.4 + i * 80) % canvas.height);
        ctx.strokeStyle = `rgba(150, 220, 255, ${0.1 + (i % 3) * 0.05})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(bx, by, 3 + i % 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Fish
      const fishX = canvas.width * 0.72;
      const fishY = canvas.height * 0.5;
      const { mouthX, mouthY } = drawFish(fishX, fishY, tick);

      // Update + draw particles
      particles = particles.map(p => {
        if (p.eaten) return p;

        const dist = Math.sqrt((p.x - mouthX) ** 2 + (p.y - mouthY) ** 2);
        if (dist < 16 && !done) {
          eatenRef++;
          setEatenCount(eatenRef);
          if (eatenRef >= 50 && !done) {
            done = true;
            setTimeout(() => setPhase('complete'), 1800);
          }
          return { ...p, eaten: true };
        }

        // Pull toward mouth
        const pullX = (mouthX - p.x) * 0.0008;
        const pullY = (mouthY - p.y) * 0.0008;
        const newVx = (p.vx + pullX) * 0.99;
        const newVy = (p.vy + pullY) * 0.99;

        return {
          ...p,
          x: (p.x + newVx + canvas.width) % canvas.width,
          y: Math.max(0, Math.min(canvas.height, p.y + newVy)),
          vx: newVx,
          vy: newVy,
        };
      });

      // Draw particles
      particles.filter(p => !p.eaten).forEach(p => {
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      });
      ctx.globalAlpha = 1;

      // Legend
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('■ PARTIKEL MIKROPLASTIK', 16, 30);

      animFrame = requestAnimationFrame(animate);
    }

    animate();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, [phase]);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {phase === 'intro' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="bg-[#001433]/85 backdrop-blur-sm p-8 rounded-2xl max-w-sm text-center mx-4">
            <span className="material-symbols-outlined text-blue-400 text-5xl mb-4 block">water_full</span>
            <h3 className="text-white font-bold text-xl mb-3">Lautan yang Tercemar</h3>
            <p className="text-white/70 text-sm mb-2">
              Partikel mikroplastik tersebar di seluruh lautan, mengapung bersama plankton. Ikan dan hewan filter feeder tidak bisa membedakannya.
            </p>
            <p className="text-blue-300 text-xs mb-6">Saksikan bagaimana mikroplastik masuk ke dalam rantai makanan laut.</p>
            <button
              onClick={() => setPhase('animation')}
              className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl"
            >
              Mulai Simulasi
            </button>
          </div>
        </div>
      )}

      {phase === 'animation' && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-5 py-2 rounded-full">
          <p className="text-blue-300 text-sm font-mono font-bold">
            PARTIKEL TERTELAN: {eatenCount} / 50
          </p>
        </div>
      )}

      {phase === 'complete' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="bg-[#001433]/90 backdrop-blur-sm p-8 rounded-2xl max-w-sm text-center mx-4">
            <span className="material-symbols-outlined text-orange-400 text-5xl mb-4 block">set_meal</span>
            <h3 className="text-white font-bold text-xl mb-3">Rantai Makanan Terkontaminasi!</h3>
            <p className="text-white/70 text-sm mb-2">
              Ikan telah menelan <strong className="text-blue-300">{eatenCount} partikel</strong> mikroplastik.
              Saat manusia mengonsumsi ikan ini, partikel berpindah ke tubuh kita.
            </p>
            <p className="text-blue-300/70 text-xs mb-6">Inilah proses bioakumulasi dalam rantai makanan laut.</p>
            <button
              onClick={onComplete}
              className="w-full bg-[var(--color-primary)] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              Investigasi Dalam Tubuh Manusia <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
