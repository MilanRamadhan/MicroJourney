'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/lib/authStore';
import BottomNav from '@/components/BottomNav';

const navLinks = [
  { href: '/',                label: 'Beranda' },
  { href: '/journey/tahap-1', label: 'Perjalanan Belajar' },
  { href: '/materi',          label: 'Materi' },
  { href: '/e-lkpd',         label: 'E-LKPD' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuthStore();
  const isTeacher = currentUser?.role === 'teacher' || currentUser?.role === 'superadmin';

  const [avatarOpen, setAvatarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleLogout() {
    logout();
    setAvatarOpen(false);
    router.push('/');
  }

  const initials = currentUser?.name
    ? currentUser.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : null;

  return (
    <>
      {/* ── Top bar (fixed to top always) ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#eceef0] shadow-[0_2px_8px_rgba(0,0,0,0.07)] h-14 md:h-16 flex items-center">
        <div className="flex justify-between items-center w-full px-4 md:px-6 max-w-[1200px] mx-auto">

          {/* Logo */}
          <Link href="/" className="font-[family-name:var(--font-outfit)] text-[17px] md:text-xl font-extrabold text-[#006591] tracking-tight">
            MicroJourney <span className="text-[#006e2f]">AR</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href}
                  className={`text-sm pb-1 transition-colors ${
                    isActive ? 'text-[#006e2f] border-b-2 border-[#006e2f] font-bold' : 'text-[#3e4850] hover:text-[#006591]'
                  }`}>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Dashboard icon (teacher only, desktop) */}
            {isTeacher && (
              <Link href="/dashboard"
                className="hidden md:flex p-2 text-[#006591] hover:bg-[#f2f4f6] rounded-lg transition-all active:scale-95" title="Dashboard">
                <span className="material-symbols-outlined text-xl">dashboard</span>
              </Link>
            )}

            {/* Avatar / profile button — works on both mobile & desktop */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAvatarOpen(v => !v)}
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all active:scale-95 select-none ${
                  currentUser
                    ? 'bg-[#006591] border-[#004c6e] text-white font-bold text-[13px]'
                    : 'bg-[#c9e6ff]/60 border-[#006591]/30 text-[#006591]'
                }`}
                aria-label="Menu profil"
              >
                {initials
                  ? <span className="leading-none">{initials}</span>
                  : <span className="material-symbols-outlined text-[18px]">person</span>
                }
              </button>

              {/* Dropdown */}
              {avatarOpen && (
                <div className="absolute right-0 top-11 w-56 bg-white rounded-2xl shadow-xl border border-[#eceef0] py-2 z-50 overflow-hidden">
                  {currentUser ? (
                    <>
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-[#eceef0]">
                        <p className="text-[13px] font-bold text-[#191c1e] truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-[#6e7881] truncate">{currentUser.email}</p>
                        <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          currentUser.role === 'superadmin' ? 'bg-[#ba1a1a]/10 text-[#ba1a1a]' :
                          currentUser.role === 'teacher'    ? 'bg-[#006591]/10 text-[#006591]' :
                          'bg-[#006e2f]/10 text-[#006e2f]'
                        }`}>
                          {currentUser.role === 'superadmin' ? 'Super Admin' :
                           currentUser.role === 'teacher'    ? 'Guru' : 'Siswa'}
                        </span>
                      </div>
                      {/* Dashboard link for teacher */}
                      {isTeacher && (
                        <Link href="/dashboard"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#3e4850] hover:bg-[#f7f9fb] transition-colors"
                          onClick={() => setAvatarOpen(false)}>
                          <span className="material-symbols-outlined text-base text-[#006591]">dashboard</span>
                          Dashboard Guru
                        </Link>
                      )}
                      {/* Superadmin link */}
                      {currentUser.role === 'superadmin' && (
                        <Link href="/superadmin"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#3e4850] hover:bg-[#f7f9fb] transition-colors"
                          onClick={() => setAvatarOpen(false)}>
                          <span className="material-symbols-outlined text-base text-[#785a00]">admin_panel_settings</span>
                          Kelola Guru
                        </Link>
                      )}
                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#ba1a1a] hover:bg-[#ba1a1a]/5 transition-colors border-t border-[#eceef0] mt-1">
                        <span className="material-symbols-outlined text-base">logout</span>
                        Keluar
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 border-b border-[#eceef0]">
                        <p className="text-[12px] text-[#6e7881]">Belum masuk akun</p>
                      </div>
                      <Link href="/login"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#006591] font-semibold hover:bg-[#f7f9fb] transition-colors"
                        onClick={() => setAvatarOpen(false)}>
                        <span className="material-symbols-outlined text-base">login</span>
                        Login
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-14 md:h-16" />

      {/* ── Mobile bottom nav ── */}
      <BottomNav />
    </>
  );
}
