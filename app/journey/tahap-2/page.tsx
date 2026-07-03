'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useJourneyStore } from '@/lib/journeyStore';
import Stage2Weathering from '@/components/stages/Stage2Weathering';
import StageIntro from '@/components/stages/StageIntro';
import { AnimatePresence } from 'framer-motion';

type Phase = 'intro' | 'main';

export default function Tahap2() {
  const router = useRouter();
  const { completeStage, setLkpdAnswer, lkpdAnswers } = useJourneyStore();
  const [phase, setPhase] = useState<Phase>('intro');
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/3D6tIkBV2RM');

  function handleComplete() {
    completeStage(2);
    router.push('/journey/tahap-3');
  }

  return (
    <div className="w-full">
      {/* Intro Phase (takes full screen with hero-bg) */}
      <AnimatePresence>
        {phase === 'intro' && (
          <div className="relative w-full overflow-hidden min-h-[540px] h-[100vh] max-h-[820px] -mt-14 md:-mt-[112px]">
            <StageIntro
              title="Pelapukan Plastik di Alam"
              description="Satu botol plastik butuh 450 tahun untuk terurai. Tapi sebelum itu, ia hancur menjadi jutaan partikel mikro yang mencemari laut. Ikuti simulasi interaktifnya!"
              icon="wb_sunny"
              layout="split"
              actionText="Mulai Simulasi"
              onStart={() => setPhase('main')}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Main Lab Phase (clean bg, no hero-bg) */}
      {phase === 'main' && (
        <div className="relative px-4 py-4 bg-[#f7f9fb] min-h-[calc(100vh-88px)]">
          <Stage2Weathering
            onComplete={handleComplete}
            videoUrl={videoUrl}
          />
        </div>
      )}
    </div>
  );
}
