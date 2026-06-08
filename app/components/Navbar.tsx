'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';

const navLinks = [
  { href: '/',         label: 'Beranda' },
  { href: '/perjalanan-belajar', label: 'Perjalanan Belajar' },
  { href: '/materi',   label: 'Materi' },
  { href: '/e-lkpd',  label: 'E-LKPD' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, logout } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] h-20 flex items-center">
      <div className="flex justify-between items-center w-full px-6 max-w-[1200px] mx-auto h-20">
        <div className="flex items-center gap-10">
          <Link href="/" className="font-[family-name:var(--font-outfit)] text-2xl font-extrabold text-[#006591] tracking-tight">
            MicroJourney AR
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base pb-2 transition-colors ${
                    isActive
                      ? 'text-[#006e2f] border-b-4 border-[#006e2f] font-bold'
                      : 'text-[#3e4850] hover:text-[#006591]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6e7881] text-lg">search</span>
            <input
              className="pl-10 pr-4 py-2 bg-[#f2f4f6] border-none rounded-full w-56 focus:ring-2 focus:ring-[#006591] text-sm outline-none text-[#191c1e]"
              placeholder="Cari materi..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-[#3e4850] hover:bg-[#f2f4f6] rounded-lg transition-all active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            {currentUser && (currentUser.role === 'teacher' || currentUser.role === 'superadmin') && (
              <Link href="/dashboard" className="p-2 text-[#006591] hover:bg-[#f2f4f6] rounded-lg transition-all active:scale-95" title="Dashboard Guru">
                <span className="material-symbols-outlined">dashboard</span>
              </Link>
            )}
            {currentUser ? (
              <button onClick={logout} className="px-3 py-2 text-[#006591] hover:bg-[#f2f4f6] rounded-lg transition-all active:scale-95 text-sm font-bold">
                Keluar
              </button>
            ) : (
              <Link href="/login" className="px-3 py-2 text-[#006591] hover:bg-[#f2f4f6] rounded-lg transition-all active:scale-95 text-sm font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-base">login</span>
                Login
              </Link>
            )}
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0ea5e9] ml-2 bg-[#6bff8f]/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#006e2f]">person</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
