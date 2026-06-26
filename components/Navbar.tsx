'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/lib/authStore';
import BottomNav from '@/components/BottomNav';

const navLinks = [
  { href: '/',                label: 'Beranda' },
  { href: '/journey/tahap-1', label: 'Perjalanan' },
  { href: '/materi',          label: 'Materi' },
  { href: '/e-lkpd',          label: 'E-LKPD' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuthStore();
  const isTeacher = currentUser?.role === 'teacher' || currentUser?.role === 'superadmin';

  const [avatarOpen, setAvatarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      {/* ── Top bar (fixed) — mobile: simple bar · desktop: banner pita ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 md:h-[112px] flex items-center pointer-events-none">
        <div className="relative flex items-center justify-between w-full px-4 md:px-8 max-w-[1280px] mx-auto">

          {/* Logo */}
          <Link href="/" className="pointer-events-auto z-10 font-[family-name:var(--font-outfit)] text-[17px] md:text-2xl font-extrabold text-[#006591] tracking-tight"
            style={{ textShadow: '0 1px 8px rgba(255,255,255,0.75)' }}>
            MicroJourney <span className="text-[#006e2f]">AR</span>
          </Link>

          {/* Desktop banner papan kayu + menu (centered) */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[118px] pointer-events-none">
            <img src="/navbar-banner.png" alt="" className="absolute inset-0 w-full h-full object-contain" draggable={false}
              style={{ filter: 'drop-shadow(0 8px 10px rgba(70,40,10,0.25))' }} />
            <svg viewBox="0 0 1534 256" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
              <defs>
                <path id="navcurve" fill="none" d="M 278.5 119 C 278.5 119 383.9 109.5 451.5 105.5 C 525.2 101.1 566.7 100.1 640.5 98 C 720 95.7 764.5 94.1 844 94.5 C 904.4 94.8 938.2 95.6 998.5 98 C 1080.6 101.3 1126.7 103.4 1208.5 111.5 C 1235.1 114.1 1276.5 119 1276.5 119" />
              </defs>
              {navLinks.map((link, idx) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                const offset = ['12%', '38%', '62%', '88%'][idx] ?? '50%';
                return (
                  <text key={link.href} onClick={() => router.push(link.href)}
                    className="pointer-events-auto cursor-pointer"
                    fill={isActive ? '#ffffff' : '#5b3a14'}
                    stroke={isActive ? 'rgba(45,22,0,0.5)' : 'rgba(255,247,222,0.55)'}
                    strokeWidth={isActive ? 3 : 2}
                    style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 800, fontSize: 33, letterSpacing: '1.5px', paintOrder: 'stroke' }}>
                    <textPath href="#navcurve" startOffset={offset} textAnchor="middle">{link.label.toUpperCase()}</textPath>
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Right actions */}
          <div className="pointer-events-auto z-10 flex items-center gap-2">
            {isTeacher && (
              <Link href="/dashboard"
                className="hidden md:flex p-2 text-[#006591] hover:bg-white/40 rounded-lg transition-all active:scale-95" title="Dashboard">
                <span className="material-symbols-outlined text-xl">dashboard</span>
              </Link>
            )}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAvatarOpen(v => !v)}
                className={`w-9 h-9 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center transition-all active:scale-95 select-none shadow-sm ${
                  currentUser
                    ? 'bg-[#006591] border-white text-white font-bold text-[13px]'
                    : 'bg-white border-[#006591]/40 text-[#006591]'
                }`}
                aria-label="Menu profil"
              >
                {initials
                  ? <span className="leading-none">{initials}</span>
                  : <span className="material-symbols-outlined text-[18px]">person</span>
                }
              </button>

              {avatarOpen && (
                <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-[#eceef0] py-2 z-50 overflow-hidden">
                  {currentUser ? (
                    <>
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
                      {isTeacher && (
                        <Link href="/dashboard"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#3e4850] hover:bg-[#f7f9fb] transition-colors"
                          onClick={() => setAvatarOpen(false)}>
                          <span className="material-symbols-outlined text-base text-[#006591]">dashboard</span>
                          Dashboard Guru
                        </Link>
                      )}
                      {currentUser.role === 'superadmin' && (
                        <Link href="/superadmin"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#3e4850] hover:bg-[#f7f9fb] transition-colors"
                          onClick={() => setAvatarOpen(false)}>
                          <span className="material-symbols-outlined text-base text-[#785a00]">admin_panel_settings</span>
                          Kelola Guru
                        </Link>
                      )}
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
      <div className="h-14 md:h-[112px]" />

      {/* ── Mobile bottom nav ── */}
      <BottomNav />
    </>
  );
}
