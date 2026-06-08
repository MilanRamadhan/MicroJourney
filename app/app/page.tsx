'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { useJourneyStore } from '@/lib/journeyStore';

export default function LandingPage() {
  const router = useRouter();
  const { currentUser, logout } = useAuthStore();
  const { setStudent, reset } = useJourneyStore();
  const [name, setName] = useState('');
  const [cls, setCls] = useState('');

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="bg-[#f7f9fb] font-[family-name:var(--font-inter)] text-[#191c1e] overflow-x-hidden min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-[#ffffff] transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-[0_4px_12px_rgba(0,0,0,0.05)]'}`}>
        <nav className="flex justify-between items-center w-full px-[24px] max-w-[1200px] mx-auto h-20">
          <div className="flex items-center gap-2">
            <span className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-outfit)] font-extrabold text-[#006591] tracking-tight">
              MicroJourney AR
            </span>
          </div>
          <div className="hidden md:flex items-center gap-[40px]">
            <Link className="text-[#006e2f] border-b-4 border-[#006e2f] pb-2 font-bold text-[16px] leading-[24px] font-[family-name:var(--font-inter)]" href="/">
              Beranda
            </Link>
            <Link className="text-[#3e4850] hover:text-[#006591] pb-2 transition-colors text-[16px] leading-[24px] font-[family-name:var(--font-inter)]" href="/journey/tahap-1">
              Perjalanan Belajar
            </Link>
            <Link className="text-[#3e4850] hover:text-[#006591] pb-2 transition-colors text-[16px] leading-[24px] font-[family-name:var(--font-inter)]" href="/materi">
              Materi
            </Link>
            <Link className="text-[#3e4850] hover:text-[#006591] pb-2 transition-colors text-[16px] leading-[24px] font-[family-name:var(--font-inter)]" href="/e-lkpd">
              E-LKPD
            </Link>
          </div>
          <div className="flex items-center gap-[24px]">
            {currentUser ? (
              <>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold">{currentUser.name}</p>
                  <p className="text-[#3e4850] text-xs">
                    {currentUser.role === 'student' ? `Siswa ${currentUser.className || ''}` : currentUser.role === 'teacher' ? 'Guru' : 'Super Admin'}
                  </p>
                </div>
                {(currentUser.role === 'teacher' || currentUser.role === 'superadmin') && (
                  <Link href="/dashboard" className="bg-[#006591] hover:bg-[#004c6e] text-white px-4 py-2 rounded-xl text-sm font-bold">
                    Dashboard
                  </Link>
                )}
                <button onClick={logout} className="text-[#3e4850] hover:text-[#191c1e] text-sm font-bold">
                  Keluar
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-[#006591] hover:bg-[#004c6e] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-base">login</span>
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>

      <main className="mt-20 flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[870px] flex items-center overflow-hidden bg-gradient-to-br from-[#ffffff] to-[#c9e6ff]/20">
          <div className="max-w-[1200px] mx-auto px-[24px] grid grid-cols-1 lg:grid-cols-12 gap-[40px] items-center relative z-10 py-16">
            <div className="lg:col-span-6 space-y-[24px]">
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#6bff8f] text-[#007432] text-[14px] leading-[20px] font-semibold font-[family-name:var(--font-inter)]">
                <span className="material-symbols-outlined text-[18px]">explore</span> Misi Baru Tersedia!
              </span>
              <h1 className="text-[48px] leading-[56px] tracking-[-0.02em] font-extrabold font-[family-name:var(--font-outfit)] text-[#191c1e]">
                Mulai <span className="text-[#006591]">Petualangan</span> Mikroplastikmu!
              </h1>
              <p className="text-[18px] leading-[28px] font-normal font-[family-name:var(--font-inter)] text-[#3e4850] max-w-xl">
                Selami dunia yang tak terlihat di sekitarmu. Temukan bagaimana partikel kecil mengubah ekosistem kita melalui teknologi Augmented Reality yang memukau.
              </p>
              
              {/* Form integrated from Next.js feature */}
              <form onSubmit={handleStart} className="bg-white border border-[#bec8d2]/50 shadow-xl rounded-2xl p-6 md:p-8 max-w-md text-left z-20 relative">
                <h2 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-outfit)] mb-3 text-[#191c1e]">Mulai Perjalanan</h2>
                {currentUser?.role === 'student' ? (
                  <div className="bg-[#6bff8f]/20 border border-[#6bff8f]/50 rounded-xl p-4 mb-6">
                    <p className="text-[#007432] text-sm font-bold">Masuk sebagai siswa terdaftar</p>
                    <p className="text-[#3e4850] text-sm mt-1">{currentUser.name} · {currentUser.className || '-'}</p>
                    <p className="text-[#3e4850] text-xs mt-2">Hasil E-LKPD akan masuk ke penilaian guru.</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-[#ffdf9a]/30 border border-[#c39400]/30 rounded-xl p-4 mb-5">
                      <p className="text-[#c39400] text-sm font-bold">Mode tamu tersedia</p>
                      <p className="text-[#3e4850] text-xs mt-1">
                        Kamu bisa langsung mulai tanpa login. Untuk masuk penilaian guru, login memakai akun siswa yang sudah didaftarkan guru.
                      </p>
                      <Link href="/login" className="inline-flex items-center gap-1 text-[#006591] text-xs font-bold mt-3">
                        Login siswa dulu <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="text-[#3e4850] text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider block mb-2">Nama Tampilan</label>
                        <input
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="w-full bg-[#f7f9fb] border border-[#bec8d2] rounded-xl px-4 py-3 placeholder-[#6e7881] focus:outline-none focus:border-[#006591] focus:ring-1 focus:ring-[#006591]"
                          placeholder="Opsional, contoh: Kelompok 1"
                        />
                      </div>
                      <div>
                        <label className="text-[#3e4850] text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider block mb-2">Kelas</label>
                        <input
                          type="text"
                          value={cls}
                          onChange={e => setCls(e.target.value)}
                          className="w-full bg-[#f7f9fb] border border-[#bec8d2] rounded-xl px-4 py-3 placeholder-[#6e7881] focus:outline-none focus:border-[#006591] focus:ring-1 focus:ring-[#006591]"
                          placeholder="Opsional, contoh: VIII-A"
                        />
                      </div>
                    </div>
                  </>
                )}
                <button type="submit" className="w-full bg-[#006591] hover:bg-[#004c6e] text-white font-bold py-4 rounded-xl text-[16px] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#006591]/20">
                  Mulai Sekarang <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </form>
            </div>
            
            <div className="lg:col-span-6 relative hidden md:block">
              <div className="relative w-full aspect-square md:aspect-video lg:aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-[#006e2f]/5 rounded-full scale-110 blur-3xl"></div>
                <img alt="Petualangan AR" className="w-full h-full object-contain z-10 rounded-3xl"
                  style={{ animation: 'float 4s ease-in-out infinite' }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu8MT8Kl3twc8c-SpOs1J12T3-QANAeqhSe5B6kwiPjP4hezUKiqDCjJQMbex8izzEG7s-hjtt9Z6XYOs-94zEZe7RH7eX5kWtDKor7xYqjLfLhCavIQ836xRPGyGVlN30bNgwmW1vN98eDA4alT65brZ7LBjBiLNRJPhnke1G1FqypNBrtZXV2N8sqVTZTnZwzJ1o1WRLAg8_x8jMlUz1RAK2KN7nAVm5TiqtQ2xXx3NqzTf66oYxSW_v_ktuWUfyf9Taz3_JTA" />
                
                <div className="absolute top-10 right-0 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl z-20"
                  style={{ animation: 'bounce 3s infinite' }}>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#785a00] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                    <div>
                      <p className="text-[12px] leading-[16px] font-medium font-[family-name:var(--font-inter)] text-[#3e4850]">Lencana Baru</p>
                      <p className="text-[14px] leading-[20px] font-semibold font-[family-name:var(--font-inter)]">Penjaga Sungai</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#006591]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#006e2f]/10 rounded-full blur-3xl"></div>
        </section>
        
        {/* Tentang Section */}
        <section className="py-[64px] bg-white">
          <div className="max-w-[1200px] mx-auto px-[24px]">
            <div className="text-center max-w-3xl mx-auto mb-[64px]">
              <h2 className="text-[32px] leading-[40px] font-bold font-[family-name:var(--font-outfit)] mb-4">
                Cara Belajar yang Lebih <span className="text-[#006e2f]">Seru</span>
              </h2>
              <p className="text-[16px] leading-[24px] font-[family-name:var(--font-inter)] text-[#3e4850]">
                Kami menggabungkan metode pembelajaran VAK (Visual, Auditory, Kinesthetic) agar setiap petualanganmu meninggalkan kesan yang mendalam.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
              <div className="p-[24px] rounded-[24px] bg-[#f2f4f6] border border-[#bec8d2]/30 flex flex-col gap-[12px] hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 rounded-2xl bg-[#0ea5e9] flex items-center justify-center text-[#003751]">
                  <span className="material-symbols-outlined text-3xl">visibility</span>
                </div>
                <h3 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-outfit)]">Visual</h3>
                <p className="text-[16px] leading-[24px] font-[family-name:var(--font-inter)] text-[#3e4850]">
                  Lihat partikel mikroplastik dalam resolusi tinggi yang seolah-olah nyata berada di depan matamu.
                </p>
                <div className="mt-auto pt-[24px] overflow-hidden rounded-xl">
                  <img alt="Visual Learning" className="w-full h-32 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATyH4L-6f6DZ6yvhAfB16A27o3YN5uglyxoW6yIR22w26Rx4OY0EMVuOCer3medrrk6yOMJsA89JgzGw-ZeoKirbIwvYivlomDM8B810hLKOZvkXaTum3fgfTRllg3HhFVbMpDypdBLzxNfQRmTYxLRpN7fBCOfpDB0mPXzn7THhsL_6JQKPWUNwry1AgRwXo4L3R-phxEVYRgk__7KFrsY3is9aPYrPeCjlWLeB4TQMjKIH5uuwN_VuaEfOl5JZRt7B_yN3kbBw" />
                </div>
              </div>
              <div className="p-[24px] rounded-[24px] bg-[#f2f4f6] border border-[#bec8d2]/30 flex flex-col gap-[12px] hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 rounded-2xl bg-[#ffdf9a] flex items-center justify-center text-[#251a00]">
                  <span className="material-symbols-outlined text-3xl">headphones</span>
                </div>
                <h3 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-outfit)]">Auditory</h3>
                <p className="text-[16px] leading-[24px] font-[family-name:var(--font-inter)] text-[#3e4850]">
                  Dengarkan narasi petualangan interaktif yang menuntunmu memahami setiap detail ekosistem.
                </p>
                <div className="mt-auto pt-[24px] overflow-hidden rounded-xl">
                  <img alt="Auditory Learning" className="w-full h-32 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCY7A11o6_1qzCJskYmPtZ2IBgY7pN7b_MKHJCVANFE5z_EF4O5VQoT2euARwXfbJimeET2L2zlBcEBGDyadGfY-IN7FFXRddGj_gN1I3jBHt3AFWpj5fFnslPchSeyUw9rWqB7KRqjeRXj3S3HBOWAgfGIlc6UQTJL3A6L_mNv9gCK6b60PirY7UptEHDY8W4_Gv_CEtlEBVQDS7m5JAGsgRos0VL3ZAEPeJy3NlIKs6J5taJ_TQeXMTwH8gtfPTWoYI0ZuKiY5Q" />
                </div>
              </div>
              <div className="p-[24px] rounded-[24px] bg-[#f2f4f6] border border-[#bec8d2]/30 flex flex-col gap-[12px] hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 rounded-2xl bg-[#6bff8f] flex items-center justify-center text-[#007432]">
                  <span className="material-symbols-outlined text-3xl">touch_app</span>
                </div>
                <h3 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-outfit)]">Kinesthetic</h3>
                <p className="text-[16px] leading-[24px] font-[family-name:var(--font-inter)] text-[#3e4850]">
                  Interaksi langsung dengan objek AR, geser, perbesar, dan kumpulkan sampel secara virtual.
                </p>
                <div className="mt-auto pt-[24px] overflow-hidden rounded-xl">
                  <img alt="Kinesthetic Learning" className="w-full h-32 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhwT9YBpI_t1m7KzaK0dsnL90OjOSfEGzwJvscaiylMV8yTq5p0kQTCI6bePT14FVeeJhyaBSIZXCBz99WA1pmPPfVONdF6IOX4NeDYNOyRaESJrC5JA762q-Cf_CFRftxVTaUvpNm2NtNyn2pP2qpfqzqJZiwjvnZwmfoQG6ie3KazKIhzT7bp2vyOnHU_B8aZ7iMUf-5U0oq91wh6pTsiCxkcE0xRtXby9sgGW0HS8CUojtGdLbVBngt_87kJhlR65FQRLi_wA" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cara Kerja Section */}
        <section className="py-[64px] bg-[#f2f4f6]">
          <div className="max-w-[1200px] mx-auto px-[24px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-center">
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#006591]/10 rounded-[32px] transform -rotate-3"></div>
                  <img alt="Cara Kerja AR" className="relative z-10 w-full rounded-[24px] shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdnia95Pt0jxkJgIWwd12VwohQlo8DZ78ED8OZm9SVquvdWm4UM3gi6uaVW0-NoBmJnnas3rzJRWuYBM6nZ2R25WKSmXXczRHWfonoVVlwc5d1ADxWX_4L8YVd2liizJxaK89opi1BD3PfMyciMHLytVrL8HjaZXdrwIXTXx0wLBWfJd_jX164ozdRZdeAJpEP58FPPTmtx4LYv8k3iavqpkUxgajb93RmKG7ZCvpfdz8KfQHFTTaK-7FOPQ4PL8VnyAzecDIKFg" />
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-[40px]">
                <h2 className="text-[32px] leading-[40px] font-bold font-[family-name:var(--font-outfit)]">Tiga Langkah <span className="text-[#006591]">Eksplorasi</span></h2>
                <div className="space-y-[24px]">
                  <div className="flex gap-[24px] group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-[#006591] group-hover:bg-[#006591] group-hover:text-white transition-colors duration-300">1</div>
                    <div>
                      <h4 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-outfit)] mb-1">Scan Lingkunganmu</h4>
                      <p className="text-[16px] leading-[24px] font-[family-name:var(--font-inter)] text-[#3e4850]">Arahkan kameramu ke objek di sekitar—air, tanah, atau bahkan produk harianmu.</p>
                    </div>
                  </div>
                  <div className="flex gap-[24px] group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-[#006591] group-hover:bg-[#006591] group-hover:text-white transition-colors duration-300">2</div>
                    <div>
                      <h4 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-outfit)] mb-1">Visualisasi Mikro</h4>
                      <p className="text-[16px] leading-[24px] font-[family-name:var(--font-inter)] text-[#3e4850]">Lihat keajaiban AR saat partikel mikroplastik muncul dan teridentifikasi secara otomatis.</p>
                    </div>
                  </div>
                  <div className="flex gap-[24px] group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-[#006591] group-hover:bg-[#006591] group-hover:text-white transition-colors duration-300">3</div>
                    <div>
                      <h4 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-outfit)] mb-1">Observasi & Analisis</h4>
                      <p className="text-[16px] leading-[24px] font-[family-name:var(--font-inter)] text-[#3e4850]">Pelajari dampaknya dan selesaikan misi untuk mendapatkan poin pengetahuan.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fitur Unggulan */}
        <section className="py-[64px] bg-white overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-[24px]">
            <h2 className="text-[32px] leading-[40px] font-bold font-[family-name:var(--font-outfit)] text-center mb-[64px]">Fitur Unggulan Kamu</h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px]">
              <div className="md:col-span-8 group relative rounded-[32px] overflow-hidden bg-[#006591] min-h-[300px] h-full">
                <img alt="AR Technology" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxrt_7rcJ-0GVieY-RTZrIsykmkX7RUFKgQWvzoXezgAhxKxyUygKVmRrTIFI4XbBAHzLtzcdAuChZo0ecFVn9YDaQOrs3NqwpUerzJxqOuTaMdnUfCY2-K8BWRDVc02HOqq0_X4_zwCi2fXM13RiUr8r7MVQ0KijWoZs_wny1JXZGINUsqQ0M-DCu6H3SxZcRvrvcxErKymkm1muMUs_0lqnQDwzy2Kkjrm2IomkqN7fpyKxZU8lRhfw5almQvZOefD9koKwZAA" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#006591]/90 to-transparent flex flex-col justify-end p-[40px]">
                  <span className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white mb-[24px]">
                    <span className="material-symbols-outlined">biotech</span>
                  </span>
                  <h3 className="text-[32px] leading-[40px] font-bold font-[family-name:var(--font-outfit)] text-white mb-2">Teknologi AR Tercanggih</h3>
                  <p className="text-white/80 text-[16px] leading-[24px] font-[family-name:var(--font-inter)] max-w-[400px]">Deteksi partikel polutan secara real-time dengan akurasi tinggi menggunakan sensor canggih perangkatmu.</p>
                </div>
              </div>
              <div className="md:col-span-4 bg-[#c39400] rounded-[32px] p-[40px] flex flex-col text-[#423000] hover:shadow-xl transition-all">
                <span className="w-12 h-12 rounded-xl bg-[#423000]/10 flex items-center justify-center mb-[24px]">
                  <span className="material-symbols-outlined text-3xl">assignment_turned_in</span>
                </span>
                <h3 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-outfit)] mb-2">Misi Seru Harian</h3>
                <p className="text-[16px] leading-[24px] font-[family-name:var(--font-inter)] opacity-90 mb-[40px]">Tantang dirimu dengan misi penyelamatan lingkungan di setiap level petualangan.</p>
                <div className="mt-auto bg-white/30 rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-[14px] leading-[20px] font-semibold">Misi Hari Ini</span>
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-bold">2/5</span>
                </div>
              </div>
              
              <div className="md:col-span-4 bg-[#6bff8f] rounded-[32px] p-[40px] flex flex-col text-[#007432] order-4 md:order-3">
                <h3 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-outfit)] mb-4">Lencana Digital</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-white/40 rounded-2xl flex flex-col items-center justify-center p-2 text-center">
                    <span className="material-symbols-outlined text-4xl mb-1">eco</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Eco Warrior</span>
                  </div>
                  <div className="aspect-square bg-white/40 rounded-2xl flex flex-col items-center justify-center p-2 text-center opacity-40">
                    <span className="material-symbols-outlined text-4xl mb-1">water_drop</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Water Hero</span>
                  </div>
                  <div className="aspect-square bg-white/40 rounded-2xl flex flex-col items-center justify-center p-2 text-center">
                    <span className="material-symbols-outlined text-4xl mb-1">workspace_premium</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Master AR</span>
                  </div>
                  <div className="aspect-square bg-white/40 rounded-2xl flex flex-col items-center justify-center p-2 text-center">
                    <span className="material-symbols-outlined text-4xl mb-1">science</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Scientist</span>
                  </div>
                </div>
                <p className="mt-[24px] text-[16px] leading-[24px] font-[family-name:var(--font-inter)] text-[#007432]/80">Koleksi semua lencana langka untuk naik ke level Grand Explorer!</p>
              </div>
              
              <div className="md:col-span-8 bg-[#e6e8ea] rounded-[32px] p-[40px] flex flex-col md:flex-row gap-[40px] items-center order-3 md:order-4">
                <div className="flex-1 w-full">
                  <h3 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-outfit)] mb-2">Pantau Progress Belajarmu</h3>
                  <p className="text-[16px] leading-[24px] font-[family-name:var(--font-inter)] text-[#3e4850]">Lihat seberapa jauh kamu sudah melangkah dan bandingkan skor petualanganmu dengan teman sekolah.</p>
                  <div className="mt-[24px] h-3 w-full bg-[#bec8d2]/30 rounded-full overflow-hidden">
                    <div className="h-full bg-[#006e2f] w-3/4 rounded-full"></div>
                  </div>
                  <div className="mt-2 flex justify-between text-[12px] font-bold text-[#3e4850]">
                    <span>Level 12: Junior Explorer</span>
                    <span>750 / 1000 XP</span>
                  </div>
                </div>
                <div className="flex-shrink-0 flex -space-x-4">
                  <div className="w-14 h-14 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center overflow-hidden">
                    <img alt="User 1" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuCge-rPrht317EmEdOWmp-YVm8hMagtzGV2y4J3Q8kV_PCQ5tk044yB8bzqM4VYYb1oL8YUar2SLhIuNVi3_oDIlxXyH1YN7dRwrCLGq81VS78nNe3hFh4QuVbvCwuT9rhcHF-RZgLCMhNChP4OpyMmSYzwBk6nzjisn3NMe6YXuSqzey6d5Y3MfyG9YuC_PkK8xZWxPyqfGmap9kmEyIQCOTj6FPe7ACfzS0kRd9CO8H8adumYKrCmQMJivQl6OcGBWn5bIqeQ" />
                  </div>
                  <div className="w-14 h-14 rounded-full border-4 border-white bg-green-100 flex items-center justify-center overflow-hidden">
                    <img alt="User 2" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-QodboRdigx2a5zasNfzgaEWVbpgdCBxXTswqBr7YXOfhcfFDUwYXmCJhJ8R3dO2249W6lSkjLq3CorB7MQM9HcexjNru40QSPf2VX_hNDE-Kw64Ca7UxtSAjnt8r9OCkB1RnWglHzGc6jZ9MVszU6S4KyBdlUKr0xIxZsTkSjnn53kH17k7FC2BPlEILe9n3Ruv4qH_mDNRWWo8xuQLIhA23pu_ZK2zoqsB3Y-N4r_ESRlR7XTutR979G8oiuzJJpYXZPl2Ng" />
                  </div>
                  <div className="w-14 h-14 rounded-full border-4 border-white bg-[#eceef0] flex items-center justify-center font-bold text-xs text-[#3e4850]">
                    +12
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#eceef0] border-t border-[#bec8d2]">
        <div className="w-full py-[64px] px-[24px] flex flex-col md:flex-row justify-between items-center gap-[24px] max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-outfit)] font-bold text-[#191c1e]">
              MicroJourney AR
            </span>
            <p className="text-[14px] leading-[20px] font-semibold font-[family-name:var(--font-inter)] text-[#3e4850] text-center md:text-left">
              © 2024 MicroJourney AR. Petualangan Sains untuk Penjelajah Muda.
            </p>
          </div>
          <div className="flex gap-[40px] flex-wrap justify-center">
            <Link className="text-[14px] leading-[20px] font-semibold font-[family-name:var(--font-inter)] text-[#3e4850] hover:text-[#006e2f] transition-colors" href="#">Tentang Kami</Link>
            <Link className="text-[14px] leading-[20px] font-semibold font-[family-name:var(--font-inter)] text-[#3e4850] hover:text-[#006e2f] transition-colors" href="#">Bantuan</Link>
            <Link className="text-[14px] leading-[20px] font-semibold font-[family-name:var(--font-inter)] text-[#3e4850] hover:text-[#006e2f] transition-colors" href="#">Kebijakan Privasi</Link>
            <Link className="text-[14px] leading-[20px] font-semibold font-[family-name:var(--font-inter)] text-[#3e4850] hover:text-[#006e2f] transition-colors" href="#">Panduan Guru</Link>
          </div>
          <div className="flex gap-[24px]">
            <a className="w-10 h-10 rounded-full bg-[#e6e8ea] flex items-center justify-center text-[#3e4850] hover:bg-[#006591] hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined">language</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-[#e6e8ea] flex items-center justify-center text-[#3e4850] hover:bg-[#006591] hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined">forum</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
