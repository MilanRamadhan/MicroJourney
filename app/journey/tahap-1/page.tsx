'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useJourneyStore } from '@/lib/journeyStore';
import StageIntro from '@/components/stages/StageIntro';
import { AnimatePresence } from 'framer-motion';

type Phase = 'init' | 'scanning' | 'detected' | 'pemantik';

const DETECTION_CLASSES = ['bottle', 'cup'];
const MIN_DRAW_SCORE = 0.25;
const MIN_LOCK_SCORE = 0.45;
const MANUAL_FALLBACK_DELAY = 8000;

export default function Tahap1() {
  const router = useRouter();
  const { completeStage } = useJourneyStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animRef = useRef<number>(0);
  const activeRef = useRef(true);

  const [phase, setPhase] = useState<Phase>('init');
  const [confidence, setConfidence] = useState(0);
  const [detectedClass, setDetectedClass] = useState('');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [modelLoading, setModelLoading] = useState(false);
  const [showManualFallback, setShowManualFallback] = useState(false);
  const [scanHint, setScanHint] = useState('Arahkan kamera ke botol plastik');

  const stopCamera = useCallback(() => {
    activeRef.current = false;
    cancelAnimationFrame(animRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  async function startCamera() {
    setCameraError(null);
    setModelLoading(true);
    setShowManualFallback(false);
    setScanHint('Menyiapkan kamera...');
    activeRef.current = true;

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Browser tidak mendukung akses kamera. Jalankan dari localhost/HTTPS dan gunakan Chrome atau Edge terbaru.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setPhase('scanning');
      setScanHint('Memuat model AI. Jika lama, cek koneksi internet.');

      const fallbackTimer = window.setTimeout(() => {
        if (activeRef.current) setShowManualFallback(true);
      }, MANUAL_FALLBACK_DELAY);

      const [tf, cocoSsd] = await Promise.all([import('@tensorflow/tfjs'), import('@tensorflow-models/coco-ssd')]);
      await tf.ready();
      const model = await cocoSsd.load();
      setModelLoading(false);
      setScanHint('Dekatkan botol/gelas plastik ke kamera sampai memenuhi sebagian layar.');

      async function detect() {
        if (!activeRef.current || !videoRef.current || !overlayRef.current) return;
        const video = videoRef.current;
        const canvas = overlayRef.current;
        const ctx = canvas.getContext('2d')!;

        if (video.readyState < 2) {
          animRef.current = requestAnimationFrame(detect);
          return;
        }

        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const preds = await model.detect(video);
        const bestPrediction = [...preds].sort((a, b) => b.score - a.score)[0];
        const plastic = preds
          .filter(p => DETECTION_CLASSES.includes(p.class) && p.score > MIN_DRAW_SCORE)
          .sort((a, b) => b.score - a.score)[0];

        if (plastic && activeRef.current) {
          const [x, y, w, h] = plastic.bbox;
          const conf = Math.round(plastic.score * 100);
          setConfidence(conf);
          setDetectedClass(plastic.class);
          setScanHint(plastic.score >= MIN_LOCK_SCORE
            ? 'Objek terkunci! Membuka pertanyaan pemantik...'
            : `Terdeteksi ${plastic.class} ${conf}%. Dekatkan lagi atau perbaiki cahaya.`);

          const color = plastic.score >= MIN_LOCK_SCORE ? '#6bff8f' : '#f0a345';
          ctx.strokeStyle = color;
          ctx.lineWidth = 3;
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';
          
          // Draw rounded detection box
          const radius = 16;
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + w - radius, y);
          ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
          ctx.lineTo(x + w, y + h - radius);
          ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
          ctx.lineTo(x + radius, y + h);
          ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
          ctx.stroke();

          // Organic Bubble for Label
          const isLocked = plastic.score >= MIN_LOCK_SCORE;
          ctx.fillStyle = isLocked ? 'rgba(0,110,47,0.9)' : 'rgba(210,123,34,0.9)';
          ctx.beginPath();
          ctx.roundRect(x + (w/2) - 80, y - 40, 160, 30, 15);
          ctx.fill();
          
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 13px var(--font-outfit), sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`${plastic.class.toUpperCase()} · ${conf}%`, x + (w/2), y - 20);
          ctx.textAlign = 'left';

          if (plastic.score >= MIN_LOCK_SCORE && activeRef.current) {
            clearTimeout(fallbackTimer);
            stopCamera();
            setPhase('detected');
            setTimeout(() => setPhase('pemantik'), 600);
            return;
          }
        } else {
          setConfidence(0);
          setDetectedClass('');
          setScanHint(bestPrediction
            ? `AI melihat "${bestPrediction.class}" (${Math.round(bestPrediction.score * 100)}%). Arahkan ke botol/gelas plastik.`
            : 'Belum ada objek terbaca. Pastikan objek terlihat jelas dan tidak backlight.');
        }
        animRef.current = requestAnimationFrame(detect);
      }
      detect();
    } catch (err: unknown) {
      setCameraError(err instanceof Error ? err.message : 'Akses kamera ditolak');
      setModelLoading(false);
      setShowManualFallback(true);
    }
  }

  function proceed() {
    completeStage(1);
    router.push('/journey/tahap-2');
  }

  return (
    <div className="relative w-full overflow-hidden min-h-[540px] h-[100vh] max-h-[820px] -mt-14 md:-mt-[112px]">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" muted playsInline />
      <canvas ref={overlayRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      {phase === 'scanning' && <div className="ar-scanline" />}

      {/* Init Phase with StageIntro */}
      <AnimatePresence>
        {phase === 'init' && !cameraError && (
          <StageIntro
            title="Tahap 1: Scanner AI Plastik"
            description="Arahkan kamera ke botol plastik atau sampah plastik di sekitarmu. AI akan mendeteksinya secara real-time."
            icon="qr_code_scanner"
            layout="centered"
            actionText="Aktifkan Kamera"
            onStart={startCamera}
          />
        )}
      </AnimatePresence>

      {/* Error */}
      {cameraError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f7f9fb] gap-5 p-8">
          <span className="material-symbols-outlined text-[#ba1a1a] text-6xl">no_photography</span>
          <p className="text-[#3e4850] text-center text-sm leading-relaxed">{cameraError}</p>
          <button onClick={startCamera} className="bg-[#006591] text-white font-bold px-6 py-3 rounded-xl">Coba Lagi</button>
          <button onClick={() => setPhase('pemantik')} className="text-[#6e7881] text-sm underline">Lanjut tanpa scan</button>
        </div>
      )}

      {/* Scanning HUD */}
      {phase === 'scanning' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Rounded Corner Brackets (Kamera) */}
          {[
            ['top-8 left-8', 'border-t-4 border-l-4 rounded-tl-3xl'],
            ['top-8 right-8', 'border-t-4 border-r-4 rounded-tr-3xl'],
            ['bottom-8 left-8', 'border-b-4 border-l-4 rounded-bl-3xl'],
            ['bottom-8 right-8', 'border-b-4 border-r-4 rounded-br-3xl']
          ].map(([pos,cls])=>(
            <div key={pos} className={`absolute ${pos} w-16 h-16 ${cls} border-[#6bff8f] opacity-80 shadow-[0_0_15px_rgba(107,255,143,0.5)]`} />
          ))}

          {/* Top Status Bubble */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#083b54]/80 backdrop-blur-md px-6 py-2.5 rounded-full border-2 border-[#6bff8f]/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <p className="text-[#6bff8f] text-sm font-[family-name:var(--font-outfit)] font-bold tracking-wider">
              {modelLoading ? 'MEMUAT ALAT...' : confidence > 0 ? `TERDETEKSI - ${confidence}%` : 'CARI OBJEK PLASTIK'}
            </p>
          </div>

          {/* Bottom Hint Bubble */}
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[min(90vw,420px)] text-center">
            <p className="bg-[#f0a345] bg-opacity-90 backdrop-blur-md border-2 border-[#8e4912] rounded-[24px] px-5 py-3.5 text-[#3b2313] text-sm font-bold shadow-[0_8px_16px_rgba(0,0,0,0.3)] font-[family-name:var(--font-inter)]">
              {scanHint}
            </p>
          </div>

          {confidence > 0 && (
            <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-64">
              <p className="text-white text-xs text-center mb-2 font-[family-name:var(--font-mono)] uppercase drop-shadow">{detectedClass}</p>
              <div className="w-full bg-white/30 h-2.5 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-200"
                  style={{ width:`${confidence}%`, background: confidence >= Math.round(MIN_LOCK_SCORE * 100) ? '#006e2f' : confidence >= 30 ? '#c39400' : '#ba1a1a' }} />
              </div>
              <p className="text-center text-white/70 text-xs mt-1 drop-shadow">{confidence}% / {Math.round(MIN_LOCK_SCORE * 100)}% untuk lock</p>
            </div>
          )}

          {showManualFallback && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto w-[min(90vw,320px)] text-center">
              <button
                onClick={() => { stopCamera(); setPhase('pemantik'); }}
                className="w-full bg-white/90 backdrop-blur-sm border border-[#bec8d2] text-[#191c1e] text-sm font-semibold px-5 py-3 rounded-xl shadow-sm"
              >
                Lanjut tanpa scan
              </button>
              <p className="text-white/70 text-[11px] mt-2 drop-shadow">
                Tips: dekatkan botol/gelas plastik ke kamera dan pastikan cahaya cukup.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Pemantik modal */}
      {phase === 'pemantik' && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white border border-[#bec8d2] rounded-2xl max-w-md w-full p-8 shadow-xl">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 bg-[#6bff8f]/20 border border-[#006e2f]/30 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[#006e2f] text-3xl">check_circle</span>
              </div>
            </div>
            <p className="text-xs font-[family-name:var(--font-mono)] text-[#006e2f] uppercase tracking-widest text-center mb-2">
              Plastik PET Terdeteksi ✓
            </p>
            <p className="text-center text-[#6e7881] text-xs mb-5 font-[family-name:var(--font-mono)]">Waktu hancur alami: 450 TAHUN</p>

            <h3 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-center mb-5 text-[#191c1e]">Pertanyaan Pemantik</h3>

            <div className="bg-[#f2f4f6] border-l-4 border-[#006591] rounded-xl p-5 mb-5">
              <p className="text-[#3e4850] text-sm leading-relaxed italic">
                &ldquo;Bagaimana mungkin benda padat sintetis ini bisa menembus dan menetap di dalam usus manusia — padahal tubuh kita dirancang untuk mencerna makanan?&rdquo;
              </p>
            </div>

            <p className="text-[#6e7881] text-xs text-center mb-6">Pikirkan jawabannya. Mulai investigasi untuk membuktikannya.</p>

            <button onClick={proceed}
              className="w-full bg-[#006591] hover:bg-[#004c6e] text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#006591]/20">
              Mulai Investigasi <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
