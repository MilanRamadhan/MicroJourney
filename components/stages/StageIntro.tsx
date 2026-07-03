import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface StageIntroProps {
  title: string;
  description: string;
  icon?: string;
  actionText?: string;
  illustration?: React.ReactNode;
  layout?: 'centered' | 'split';
  onStart: () => void;
}

export default function StageIntro({
  title,
  description,
  icon,
  actionText = 'Mulai Investigasi',
  illustration,
  layout = 'split',
  onStart
}: StageIntroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center font-[family-name:var(--font-inter)] overflow-hidden py-10 overflow-y-auto"
    >
      {/* Soften vividness + lift text contrast */}
      <div className="absolute inset-0 bg-white/10" />
      
      {/* Shadow top */}
      <div className="absolute inset-x-0 top-0 h-1/3 md:h-2/5 bg-gradient-to-b from-[#f7f9fb] to-transparent pointer-events-none z-10" />

      {/* Overlay Tipis agar teks bisa terbaca */}
      <div className="absolute inset-0 bg-[#083b54]/60 mix-blend-multiply pointer-events-none z-10" />

      {/* Shadow bottom */}
      <div className="absolute inset-x-0 bottom-0 h-15 sm:h-10 md:h-22 lg:h-30 pointer-events-none z-30" style={{ background: "linear-gradient(to bottom, rgba(247,249,251,0) 0%, rgba(247,249,251,0.5) 50%, #f7f9fb 86%)" }} />

      {/* Gelembung Animasi Bawah Air */}
      <motion.div 
        className="absolute bottom-[-10%] left-[10%] w-64 h-64 rounded-full bg-white/10 blur-2xl mix-blend-overlay pointer-events-none"
        animate={{ y: [0, -800], opacity: [0, 0.5, 0], scale: [1, 1.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div 
        className="absolute bottom-[-20%] right-[20%] w-48 h-48 rounded-full bg-[#6bff8f]/10 blur-2xl mix-blend-overlay pointer-events-none"
        animate={{ y: [0, -900], opacity: [0, 0.4, 0], scale: [1, 2] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: 3 }}
      />

      {layout === 'split' ? (
        /* Kontainer Utama 2-Kolom (Untuk Tahap 2 dst) */
        <div className="relative z-10 w-full max-w-6xl px-4 md:px-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 md:gap-10 mt-8 md:mt-0">
          
          {/* Kolom Kiri: Ilustrasi / Mika */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            className="w-full md:w-1/2 flex items-center justify-center"
          >
            {illustration ? (
              illustration
            ) : (
              // Default Illustration (Mika)
              <div className="relative w-40 sm:w-56 md:w-full max-w-sm aspect-square drop-shadow-2xl">
                <Image 
                  src="/mika.png" 
                  alt="Penjelajah" 
                  fill
                  className="object-contain animate-[float_4s_ease-in-out_infinite]"
                />
              </div>
            )}
          </motion.div>

          {/* Kolom Kanan: Teks & Tombol */}
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.3 }}
            className="w-full md:w-1/2 bg-white/10 backdrop-blur-md border border-white/30 p-6 sm:p-12 text-center md:text-left shadow-[0_32px_64px_rgba(0,0,0,0.4)] flex flex-col items-center md:items-start"
            style={{ 
              // Bentuk Gelembung Organik
              borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%'
            }}
          >
            {/* Ikon Mengambang (Opsional) */}
            {icon && (
              <motion.div 
                className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 flex items-center justify-center rounded-full bg-[#006591]/40 border-2 border-[#6bff8f]/60 backdrop-blur-sm shadow-[0_0_20px_rgba(107,255,143,0.3)]"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="material-symbols-outlined text-4xl md:text-5xl text-[#6bff8f] drop-shadow-md">
                  {icon}
                </span>
              </motion.div>
            )}

            {/* Label Pill */}
            <div className="inline-flex items-center gap-2 bg-[#006591]/60 backdrop-blur-sm border border-[#6bff8f]/40 px-3 py-1 md:px-4 md:py-1.5 rounded-full mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#6bff8f] animate-pulse" />
              <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-outfit)]">MISI AKTIF</span>
            </div>

            {/* Judul & Deskripsi */}
            <h1 className="text-3xl sm:text-5xl font-extrabold font-[family-name:var(--font-outfit)] text-white mb-3 md:mb-4 drop-shadow-[0_2px_4px_rgba(0,101,145,0.8)] leading-tight">
              {title}
            </h1>
            <p className="text-white/90 text-sm md:text-lg mb-6 md:mb-10 max-w-xl drop-shadow-sm font-medium leading-relaxed">
              {description}
            </p>

            {/* Tombol Papan Kayu */}
            <WoodenButton onClick={onStart} text={actionText} />
          </motion.div>
        </div>
      ) : (
        /* Kontainer Utama Terpusat (Untuk Tahap 1 Scanner) */
        <motion.div 
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="relative z-10 w-[90%] max-w-2xl bg-white/20 backdrop-blur-xl border border-white/40 p-8 sm:p-12 text-center shadow-[0_32px_64px_rgba(0,101,145,0.4)] flex flex-col items-center"
          style={{ 
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%'
          }}
        >
          {icon && (
            <motion.div 
              className="w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-[#006591]/40 border-2 border-[#6bff8f]/60 backdrop-blur-sm shadow-[0_0_20px_rgba(107,255,143,0.3)]"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="material-symbols-outlined text-6xl text-[#6bff8f] drop-shadow-md">
                {icon}
              </span>
            </motion.div>
          )}

          <h1 className="text-4xl sm:text-5xl font-extrabold font-[family-name:var(--font-outfit)] text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,101,145,0.8)]">
            {title}
          </h1>
          <p className="text-white/90 text-lg mb-10 max-w-xl mx-auto drop-shadow-sm font-medium leading-relaxed">
            {description}
          </p>

          <WoodenButton onClick={onStart} text={actionText} />
        </motion.div>
      )}

      {/* Global Style for Floating Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
      `}} />
    </motion.div>
  );
}

// Reusable Wooden Button
function WoodenButton({ onClick, text }: { onClick: () => void, text: string }) {
  return (
    <motion.button 
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative inline-flex items-center justify-center gap-3 px-10 py-4 font-extrabold text-[#3b2313] text-xl font-[family-name:var(--font-outfit)] shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all"
      style={{
        background: 'linear-gradient(to bottom, #f0a345, #d27b22)',
        border: '2px solid #8e4912',
        borderRadius: '16px',
        boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.2), inset 0 -4px 0 rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.3)',
      }}
    >
      <span className="absolute left-3 w-2 h-2 rounded-full bg-[#5a2e0a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.3)]" />
      <span className="absolute right-3 w-2 h-2 rounded-full bg-[#5a2e0a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.3)]" />
      
      <span className="material-symbols-outlined text-2xl font-bold">explore</span>
      {text}
    </motion.button>
  );
}
