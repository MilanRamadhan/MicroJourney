'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/lib/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const user = login(email, password);
    if (!user) {
      setError('Email atau password tidak sesuai.');
      return;
    }
    if (user.role === 'student') router.push('/');
    else router.push('/dashboard');
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col">
      <header className="h-20 border-b border-[#bec8d2] bg-white px-6 flex items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <Link href="/" className="font-[family-name:var(--font-outfit)] text-xl font-extrabold text-[#006591]">
          MicroJourney <span className="text-[#006e2f]">AR</span>
        </Link>
        <Link href="/" className="text-[#3e4850] hover:text-[#191c1e] text-sm flex items-center gap-1 transition-colors">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Beranda
        </Link>
      </header>

      <section className="flex-grow flex items-center justify-center px-4 py-10">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white border border-[#bec8d2] rounded-2xl p-7 shadow-sm">
          <div className="mb-7">
            <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[#006591]">login</span>
            </div>
            <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-bold mb-2 text-[#191c1e]">Masuk Akun</h1>
            <p className="text-[#3e4850] text-sm">
              Guru masuk untuk mengelola siswa. Siswa masuk agar hasil E-LKPD masuk ke penilaian.
            </p>
          </div>

          <div className="space-y-4 mb-5">
            <div>
              <label className="text-[#6e7881] text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider block mb-2">Email</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                className="w-full bg-[#f7f9fb] border border-[#bec8d2] rounded-xl px-4 py-3 text-[#191c1e] focus:outline-none focus:border-[#006591] focus:ring-1 focus:ring-[#006591] transition-colors"
                placeholder="guru1@gmail.com"
              />
            </div>
            <div>
              <label className="text-[#6e7881] text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider block mb-2">Password</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                className="w-full bg-[#f7f9fb] border border-[#bec8d2] rounded-xl px-4 py-3 text-[#191c1e] focus:outline-none focus:border-[#006591] focus:ring-1 focus:ring-[#006591] transition-colors"
                placeholder="Masukkan password"
              />
            </div>
          </div>

          {error && <p className="text-[#ba1a1a] text-sm mb-4">{error}</p>}

          <button type="submit" className="w-full bg-[#006591] hover:bg-[#004c6e] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#006591]/20">
            Masuk <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          <div className="mt-5 rounded-xl bg-[#f2f4f6] border border-[#bec8d2] p-4">
            <p className="text-[#6e7881] text-xs font-[family-name:var(--font-mono)] mb-2 uppercase tracking-wider">AKUN DEMO GURU</p>
            <p className="text-sm text-[#191c1e]">Email: <span className="text-[#006591] font-semibold">guru1@gmail.com</span></p>
            <p className="text-sm text-[#191c1e]">Password: <span className="text-[#006591] font-semibold">guruguru</span></p>
          </div>
        </form>
      </section>
    </div>
  );
}
