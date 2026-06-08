'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { useJourneyStore } from '@/lib/journeyStore';

const STATS = [
  { icon: 'public', value: '#1 Dunia', label: 'Indonesia konsumsi mikroplastik tertinggi' },
  { icon: 'credit_card', value: '15 gram', label: 'Mikroplastik tertelan per orang per bulan' },
  { icon: 'biotech', value: '77% manusia', label: 'Darah manusia mengandung mikroplastik' },
];

export default function LandingPage() {
  const router = useRouter();
  const { currentUser, logout } = useAuthStore();
  const { setStudent, reset } = useJourneyStore();
  const [name, setName] = useState('');
  const [cls, setCls] = useState('');

  function handleStart(e: React.FormEvent) {
    e.preventDefault();
    const isRegisteredStudent = currentUser?.role === 'student';
    const finalName = isRegisteredStudent ? currentUser.name : name.trim() || 'Siswa Tamu';
    const finalClass = isRegisteredStudent ? currentUser.className || '-' : cls.trim() || 'Mode Latihan';

    reset();
    setStudent(finalName, finalClass);
    router.push('/journey/tahap-1');
  }

  return (
    <main className="min-h-screen bg-[#060F1E] flex flex-col text-[#F1F5F9]">
      <header className="h-16 bg-[#0A1628]/95 border-b border-[#1E3A5F] px-5 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="font-[family-name:var(--font-outfit)] font-extrabold text-lg">
          MICRO<span className="text-[#EF4444]">JOURNEY</span> AR
        </Link>
        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold">{currentUser.name}</p>
                <p className="text-[#94A3B8] text-xs">
                  {currentUser.role === 'student' ? `Siswa ${currentUser.className || ''}` : currentUser.role === 'teacher' ? 'Guru' : 'Super Admin'}
                </p>
              </div>
              {(currentUser.role === 'teacher' || currentUser.role === 'superadmin') && (
                <Link href="/dashboard" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-xl text-sm font-bold">
                  Dashboard
                </Link>
              )}
              <button onClick={logout} className="text-[#94A3B8] hover:text-[#F1F5F9] text-sm">
                Keluar
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-[#0D1F35] border border-[#1E3A5F] hover:border-[#3B82F6] px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-base">login</span>
              Login
            </Link>
          )}
        </div>
      </header>

      <section className="flex-grow flex flex-col items-center justify-center px-6 py-16 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(59,130,246,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#0A1628] border border-[#1E3A5F] px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
            <span className="text-[#94A3B8] text-sm font-[family-name:var(--font-mono)] tracking-wider">IPA KELAS VIII · KURIKULUM MERDEKA</span>
          </div>

          <h1 className="font-[family-name:var(--font-outfit)] text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            MICRO<span className="text-[#EF4444]" style={{ textShadow: '0 0 30px rgba(239,68,68,0.5)' }}>JOURNEY</span> AR
          </h1>
          <p className="text-[#94A3B8] text-lg md:text-xl max-w-xl mx-auto mb-3 leading-relaxed">
            Apa yang terjadi pada plastik yang kamu buang?
          </p>
          <p className="text-[#4A6080] text-base max-w-lg mx-auto mb-12">
            Ikuti perjalanan 6 tahap: dari botol plastik yang kamu pegang, hingga partikel mikroplastiknya masuk ke organ pencernaanmu.
          </p>

          <form onSubmit={handleStart} className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-8 max-w-md mx-auto text-left">
            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold mb-3">Mulai Perjalanan</h2>
            {currentUser?.role === 'student' ? (
              <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl p-4 mb-6">
                <p className="text-[#22C55E] text-sm font-bold">Masuk sebagai siswa terdaftar</p>
                <p className="text-[#94A3B8] text-sm mt-1">{currentUser.name} · {currentUser.className || '-'}</p>
                <p className="text-[#94A3B8] text-xs mt-2">Hasil E-LKPD akan masuk ke penilaian guru.</p>
              </div>
            ) : (
              <>
                <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-4 mb-5">
                  <p className="text-[#F59E0B] text-sm font-bold">Mode tamu tersedia</p>
                  <p className="text-[#94A3B8] text-xs mt-1">
                    Kamu bisa langsung mulai tanpa login. Untuk masuk penilaian guru, login memakai akun siswa yang sudah didaftarkan guru.
                  </p>
                  <Link href="/login" className="inline-flex items-center gap-1 text-[#3B82F6] text-xs font-bold mt-3">
                    Login siswa dulu <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-[#94A3B8] text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider block mb-2">Nama Tampilan</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-[#060F1E] border border-[#1E3A5F] rounded-xl px-4 py-3 placeholder-[#4A6080] focus:outline-none focus:border-[#3B82F6]"
                      placeholder="Opsional, contoh: Kelompok 1"
                    />
                  </div>
                  <div>
                    <label className="text-[#94A3B8] text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider block mb-2">Kelas</label>
                    <input
                      type="text"
                      value={cls}
                      onChange={e => setCls(e.target.value)}
                      className="w-full bg-[#060F1E] border border-[#1E3A5F] rounded-xl px-4 py-3 placeholder-[#4A6080] focus:outline-none focus:border-[#3B82F6]"
                      placeholder="Opsional, contoh: VIII-A"
                    />
                  </div>
                </div>
              </>
            )}
            <button type="submit" className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2">
              Mulai Perjalanan <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>
        </div>
      </section>

      <section className="border-t border-[#1E3A5F] px-6 py-10">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map(s => (
            <div key={s.label} className="text-center p-6 rounded-2xl bg-[#0A1628] border border-[#1E3A5F]">
              <span className="material-symbols-outlined text-3xl mb-3 block text-[#3B82F6]">{s.icon}</span>
              <div className="font-[family-name:var(--font-mono)] text-xl font-bold text-[#EF4444] mb-1">{s.value}</div>
              <div className="text-[#94A3B8] text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center py-4 border-t border-[#1E3A5F]">
        <Link href="/login" className="text-[#4A6080] text-sm hover:text-[#94A3B8] transition-colors">Login Guru / Siswa →</Link>
      </div>
    </main>
  );
}
