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
    <main className="min-h-screen bg-[#060F1E] text-[#F1F5F9] flex flex-col">
      <header className="h-16 border-b border-[#1E3A5F] bg-[#0A1628] px-6 flex items-center justify-between">
        <Link href="/" className="font-[family-name:var(--font-outfit)] text-xl font-extrabold">
          MICRO<span className="text-[#EF4444]">JOURNEY</span> AR
        </Link>
        <Link href="/" className="text-[#94A3B8] hover:text-[#F1F5F9] text-sm flex items-center gap-1">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Beranda
        </Link>
      </header>

      <section className="flex-grow flex items-center justify-center px-4 py-10">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-7">
          <div className="mb-7">
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[#3B82F6]">login</span>
            </div>
            <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-bold mb-2">Masuk Akun</h1>
            <p className="text-[#94A3B8] text-sm">
              Guru masuk untuk mengelola siswa. Siswa masuk agar hasil E-LKPD masuk ke penilaian.
            </p>
          </div>

          <div className="space-y-4 mb-5">
            <div>
              <label className="text-[#94A3B8] text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider block mb-2">Email</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                className="w-full bg-[#060F1E] border border-[#1E3A5F] rounded-xl px-4 py-3 text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                placeholder="guru1@gmail.com"
              />
            </div>
            <div>
              <label className="text-[#94A3B8] text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider block mb-2">Password</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                className="w-full bg-[#060F1E] border border-[#1E3A5F] rounded-xl px-4 py-3 text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                placeholder="Masukkan password"
              />
            </div>
          </div>

          {error && <p className="text-[#EF4444] text-sm mb-4">{error}</p>}

          <button type="submit" className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
            Masuk <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          <div className="mt-5 rounded-xl bg-[#060F1E] border border-[#1E3A5F] p-4">
            <p className="text-[#94A3B8] text-xs font-[family-name:var(--font-mono)] mb-2">AKUN DEMO GURU</p>
            <p className="text-sm">Email: <span className="text-[#3B82F6]">guru1@gmail.com</span></p>
            <p className="text-sm">Password: <span className="text-[#3B82F6]">guruguru</span></p>
          </div>
        </form>
      </section>
    </main>
  );
}
