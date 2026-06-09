'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';

const ALL_ITEMS = [
  { href: '/',                label: 'Home',     icon: 'home',           teacherOnly: false, guestOnly: false },
  { href: '/journey/tahap-1', label: 'Misi',      icon: 'deployed_code',  teacherOnly: false, guestOnly: false },
  { href: '/materi',          label: 'Materi',    icon: 'menu_book',      teacherOnly: false, guestOnly: false },
  { href: '/e-lkpd',          label: 'Progress',  icon: 'emoji_events',   teacherOnly: false, guestOnly: false },
  { href: '/dashboard',       label: 'Laporan',   icon: 'bar_chart',      teacherOnly: true,  guestOnly: false },
  { href: '/login',           label: 'Login',     icon: 'person',         teacherOnly: false, guestOnly: true  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { currentUser } = useAuthStore();
  const isTeacher = currentUser?.role === 'teacher' || currentUser?.role === 'superadmin';

  const items = ALL_ITEMS.filter(item => {
    if (item.teacherOnly && !isTeacher) return false;
    if (item.guestOnly && currentUser) return false;
    return true;
  });

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#bec8d2] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-stretch justify-around h-16">
          {items.map(item => {
            const isActive = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 gap-0.5 transition-all active:scale-95 relative select-none"
              >
                {/* Active pill indicator */}
                {isActive && (
                  <span className="absolute top-1.5 w-8 h-1 rounded-full bg-[#006591]" />
                )}
                {/* Icon pill */}
                <div className={`w-10 h-8 rounded-2xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-[#006591] shadow-md shadow-[#006591]/25' : ''
                }`}>
                  <span
                    className={`material-symbols-outlined text-[20px] transition-colors ${
                      isActive ? 'text-white' : 'text-[#6e7881]'
                    }`}
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                </div>
                <span className={`text-[10px] font-semibold leading-none transition-colors ${
                  isActive ? 'text-[#006591]' : 'text-[#6e7881]'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer so content is not hidden behind bottom nav */}
      <div className="md:hidden h-[68px]" />
    </>
  );
}
