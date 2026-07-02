'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';


export default function MateriPage() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col">
      <Navbar />
      <div className="relative overflow-hidden flex-grow">
        <div className="absolute inset-0 adventure-map opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#006591]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#006e2f]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-[#bec8d2] px-5 py-2 rounded-full mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#006591] animate-pulse" />
            <span className="text-[#006591] text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest">Modul Ajar</span>
          </div>
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl font-extrabold text-[#191c1e] mb-4 leading-tight">
            Modul Pembelajaran<br/>
            <span className="text-[#006591]">MicroJourney AR</span>
          </h1>
          <p className="text-[#3e4850] text-lg max-w-2xl mx-auto leading-relaxed">
            Pelajari semua tentang bahaya mikroplastik melalui modul lengkap di bawah ini.
          </p>
        </div>

        {/* Preview PDF Modul */}
        <div className="bg-white rounded-3xl p-4 md:p-6 mb-14 shadow-xl border-[6px] border-[#e4f1f9] flex flex-col">
          {/* Controls / Info Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 pb-4 border-b-2 border-[#f2f4f6]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ffdad6] rounded-xl flex items-center justify-center flex-shrink-0 text-[#ba1a1a]">
                <span className="material-symbols-outlined text-2xl">menu_book</span>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-[#191c1e] text-lg font-[family-name:var(--font-outfit)]">Modul Sampah Plastik</h3>
                <p className="text-[#6e7881] text-xs font-semibold">Tampil Otomatis</p>
              </div>
            </div>
            
            <a 
              href="/docs/Modul_Sampah_Plastik.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#006591] hover:bg-[#004c6e] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-transform active:scale-95 shadow-md flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Unduh Modul PDF
            </a>
          </div>

          {/* Iframe Preview */}
          <div className="w-full h-[600px] md:h-[800px] bg-[#f7f9fb] rounded-2xl overflow-hidden shadow-inner relative">
            <iframe 
              src="/docs/Modul_Sampah_Plastik.pdf#toolbar=0" 
              className="absolute top-0 left-0 w-full h-full border-none"
              title="Preview Modul"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-[#006591] to-[#006e2f] rounded-2xl p-10 text-white shadow-xl">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold mb-3">Siap Memulai Perjalanan?</h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto text-sm leading-relaxed">
            Mulai dari Tahap 1 — Scanner AR akan mendeteksi plastik di sekitarmu menggunakan kamera perangkat dan kecerdasan buatan.
          </p>
          <Link href="/journey/tahap-1"
            className="inline-flex items-center gap-2 bg-white text-[#006591] font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#f0f9ff] transition-all hover:scale-105 active:scale-95 shadow-md">
            <span className="material-symbols-outlined">play_arrow</span>
            Mulai Perjalanan Belajar
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
