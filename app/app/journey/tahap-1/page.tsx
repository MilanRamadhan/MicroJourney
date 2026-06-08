'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useJourneyStore } from '@/lib/journeyStore';

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
            ? 'Objek terkunci. Membuka pertanyaan pemantik...'
            : `Terdeteksi ${plastic.class} ${conf}%. Dekatkan lagi atau perbaiki cahaya.`);

          const color = plastic.score >= MIN_LOCK_SCORE ? '#22C55E' : '#F59E0B';
          ctx.strokeStyle = color;
          ctx.lineWidth = 2.5;
          ctx.strokeRect(x, y, w, h);

          // Corner marks
          const cl = 18;
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 3;
          [[x,y+cl,x,y,x+cl,y],[x+w-cl,y,x+w,y,x+w,y+cl],
           [x,y+h-cl,x,y+h,x+cl,y+h],[x+w-cl,y+h,x+w,y+h,x+w,y+h-cl]].forEach(([x1,y1,x2,y2,x3,y3])=>{
            ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.lineTo(x3,y3); ctx.stroke();
          });

          ctx.fillStyle = plastic.score >= MIN_LOCK_SCORE ? 'rgba(34,197,94,0.85)' : 'rgba(245,158,11,0.85)';
          ctx.fillRect(x, y - 28, 190, 26);
          ctx.fillStyle = '#000';
          ctx.font = 'bold 12px monospace';
          ctx.fillText(`${plastic.class.toUpperCase()} · ${conf}%`, x + 6, y - 10);

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
    <div className="relative w-full h-[calc(100vh-88px)] bg-black overflow-hidden">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" muted playsInline />
      <canvas ref={overlayRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      {phase === 'scanning' && <div className="ar-scanline" />}

      {/* Init */}
      {phase === 'init' && !cameraError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#060F1E]">
          <div className="text-center p-8 max-w-sm">
            <div className="w-20 h-20 rounded-full bg-[#0A1628] border border-[#1E3A5F] flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[#3B82F6] text-4xl">photo_camera</span>
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold mb-3">Scanner AI Plastik</h2>
            <p className="text-[#94A3B8] text-sm mb-8">Arahkan kamera ke botol plastik atau sampah plastik di sekitarmu. AI akan mendeteksinya secara real-time.</p>
            <button onClick={startCamera}
              className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-black font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">qr_code_scanner</span> Aktifkan Kamera
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {cameraError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#060F1E] gap-5 p-8">
          <span className="material-symbols-outlined text-[#EF4444] text-6xl">no_photography</span>
          <p className="text-[#94A3B8] text-center text-sm">{cameraError}</p>
          <button onClick={startCamera} className="bg-[#3B82F6] text-white font-bold px-6 py-3 rounded-xl">Coba Lagi</button>
          <button onClick={() => setPhase('pemantik')} className="text-[#4A6080] text-sm underline">Lanjut tanpa scan</button>
        </div>
      )}

      {/* Scanning HUD */}
      {phase === 'scanning' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Corners */}
          {[['top-6 left-6','border-t-4 border-l-4'],['top-6 right-6','border-t-4 border-r-4'],
            ['bottom-6 left-6','border-b-4 border-l-4'],['bottom-6 right-6','border-b-4 border-r-4']].map(([pos,cls])=>(
            <div key={pos} className={`absolute ${pos} w-12 h-12 ${cls} border-[#22C55E] opacity-60`} />
          ))}

          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-5 py-2 rounded-full border border-[#22C55E]/30">
            <p className="text-[#22C55E] text-sm font-[family-name:var(--font-mono)] font-bold tracking-widest">
              {modelLoading ? 'MEMUAT MODEL AI...' : confidence > 0 ? `TERDETEKSI - ${confidence}%` : 'ARAHKAN KE BOTOL / GELAS PLASTIK'}
            </p>
          </div>

          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[min(90vw,420px)] text-center">
            <p className="bg-black/65 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white/80 text-sm">
              {scanHint}
            </p>
          </div>

          {confidence > 0 && (
            <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-64">
              <p className="text-white text-xs text-center mb-2 font-[family-name:var(--font-mono)] uppercase">{detectedClass}</p>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-200"
                  style={{ width:`${confidence}%`, background: confidence >= Math.round(MIN_LOCK_SCORE * 100) ? '#22C55E' : confidence >= 30 ? '#F59E0B' : '#EF4444' }} />
              </div>
              <p className="text-center text-white/40 text-xs mt-1">{confidence}% / {Math.round(MIN_LOCK_SCORE * 100)}% untuk lock</p>
            </div>
          )}

          {showManualFallback && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto w-[min(90vw,320px)] text-center">
              <button
                onClick={() => {
                  stopCamera();
                  setPhase('pemantik');
                }}
                className="w-full bg-black/75 backdrop-blur-sm border border-[#1E3A5F] text-[#F1F5F9] text-sm font-semibold px-5 py-3 rounded-xl"
              >
                Lanjut tanpa scan
              </button>
              <p className="text-white/45 text-[11px] mt-2">
                Tips: dekatkan botol/gelas plastik ke kamera dan pastikan cahaya cukup.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Pemantik modal */}
      {phase === 'pemantik' && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl max-w-md w-full p-8">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[#22C55E] text-3xl">check_circle</span>
              </div>
            </div>
            <p className="text-xs font-[family-name:var(--font-mono)] text-[#22C55E] uppercase tracking-widest text-center mb-2">
              Plastik PET Terdeteksi ✓
            </p>
            <p className="text-center text-[#94A3B8] text-xs mb-5 font-[family-name:var(--font-mono)]">Waktu hancur alami: 450 TAHUN</p>

            <h3 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-center mb-5">Pertanyaan Pemantik</h3>

            <div className="bg-[#060F1E] border-l-4 border-[#3B82F6] rounded-xl p-5 mb-5">
              <p className="text-[#94A3B8] text-sm leading-relaxed italic">
                &ldquo;Bagaimana mungkin benda padat sintetis ini bisa menembus dan menetap di dalam usus manusia — padahal tubuh kita dirancang untuk mencerna makanan?&rdquo;
              </p>
            </div>

            <p className="text-[#4A6080] text-xs text-center mb-6">Pikirkan jawabannya. Mulai investigasi untuk membuktikannya.</p>

            <button onClick={proceed}
              className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2">
              Mulai Investigasi <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
