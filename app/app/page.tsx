'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

const bentoCardClass = 'transition-all duration-300 hover:-translate-y-2';

export default function LandingPage() {
  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-on-background)] overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />

      <main className="mt-0 flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-gradient-to-br from-[var(--color-surface-container-lowest)] to-[var(--color-primary-fixed)]/20">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10 py-16">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] text-sm font-semibold">
                <span className="material-symbols-outlined text-[18px]">explore</span> Misi Baru Tersedia!
              </span>
              <h1 className="font-[family-name:var(--font-plus-jakarta)] text-5xl font-extrabold text-[var(--color-on-background)] leading-tight tracking-tight">
                Mulai <span className="text-[var(--color-primary)]">Petualangan</span> Mikroplastikmu!
              </h1>
              <p className="text-lg text-[var(--color-on-surface-variant)] max-w-xl leading-relaxed">
                Selami dunia yang tak terlihat di sekitarmu. Temukan bagaimana partikel kecil mengubah ekosistem kita melalui teknologi Augmented Reality yang memukau.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/perjalanan-belajar" className="h-12 px-8 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-xl font-semibold text-sm shadow-lg hover:scale-105 transition-transform active:scale-95 flex items-center justify-center gap-2">
                  Mulai Belajar Sekarang <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <button className="h-12 px-8 border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] rounded-xl font-semibold text-sm hover:bg-[var(--color-secondary)]/5 transition-colors flex items-center justify-center gap-2">
                  Lihat Demo AR <span className="material-symbols-outlined">play_circle</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-6 relative">
              <div className="relative w-full aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-[var(--color-secondary)]/5 rounded-full scale-110 blur-3xl" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="floating w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu8MT8Kl3twc8c-SpOs1J12T3-QANAeqhSe5B6kwiPjP4hezUKiqDCjJQMbex8izzEG7s-hjtt9Z6XYOs-94zEZe7RH7eX5kWtDKor7xYqjLfLhCavIQ836xRPGyGVlN30bNgwmW1vN98eDA4alT65brZ7LBjBiLNRJPhnke1G1FqypNBrtZXV2N8sqVTZTnZwzJ1o1WRLAg8_x8jMlUz1RAK2KN7nAVm5TiqtQ2xXx3NqzTf66oYxSW_v_ktuWUfyf9Taz3_JTA" alt="Petualangan AR" className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute top-10 right-0 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl z-20" style={{ animation: 'floating 3s ease-in-out infinite' }}>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[var(--color-tertiary)] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                    <div>
                      <p className="text-xs text-[var(--color-on-surface-variant)]">Lencana Baru</p>
                      <p className="text-sm font-bold">Penjaga Sungai</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[var(--color-primary)]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[var(--color-secondary)]/10 rounded-full blur-3xl" />
        </section>

        {/* VAK Section */}
        <section className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold mb-4">
                Cara Belajar yang Lebih <span className="text-[var(--color-secondary)]">Seru</span>
              </h2>
              <p className="text-base text-[var(--color-on-surface-variant)]">
                Kami menggabungkan metode pembelajaran VAK (Visual, Auditory, Kinesthetic) agar setiap petualanganmu meninggalkan kesan yang mendalam.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: 'visibility', title: 'Visual', desc: 'Lihat partikel mikroplastik dalam resolusi tinggi yang seolah-olah nyata berada di depan matamu.', bg: 'bg-[var(--color-primary-container)]', color: 'text-[var(--color-on-primary-container)]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATyH4L-6f6DZ6yvhAfB16A27o3YN5uglyxoW6yIR22w26Rx4OY0EMVuOCer3medrrk6yOMJsA89JgzGw-ZeoKirbIwvYivlomDM8B810hLKOZvkXaTum3fgfTRllg3HhFVbMpDypdBLzxNfQRmTYxLRpN7fBCOfpDB0mPXzn7THhsL_6JQKPWUNwry1AgRwXo4L3R-phxEVYRgk__7KFrsY3is9aPYrPeCjlWLeB4TQMjKIH5uuwN_VuaEfOl5JZRt7B_yN3kbBw' },
                { icon: 'headphones', title: 'Auditory', desc: 'Dengarkan narasi petualangan interaktif yang menuntunmu memahami setiap detail ekosistem.', bg: 'bg-[var(--color-tertiary-fixed)]', color: 'text-[var(--color-on-tertiary-fixed)]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY7A11o6_1qzCJskYmPtZ2IBgY7pN7b_MKHJCVANFE5z_EF4O5VQoT2euARwXfbJimeET2L2zlBcEBGDyadGfY-IN7FFXRddGj_gN1I3jBHt3AFWpj5fFnslPchSeyUw9rWqB7KRqjeRXj3S3HBOWAgfGIlc6UQTJL3A6L_mNv9gCK6b60PirY7UptEHDY8W4_Gv_CEtlEBVQDS7m5JAGsgRos0VL3ZAEPeJy3NlIKs6J5taJ_TQeXMTwH8gtfPTWoYI0ZuKiY5Q' },
                { icon: 'touch_app', title: 'Kinesthetic', desc: 'Interaksi langsung dengan objek AR, geser, perbesar, dan kumpulkan sampel secara virtual.', bg: 'bg-[var(--color-secondary-container)]', color: 'text-[var(--color-on-secondary-container)]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhwT9YBpI_t1m7KzaK0dsnL90OjOSfEGzwJvscaiylMV8yTq5p0kQTCI6bePT14FVeeJhyaBSIZXCBz99WA1pmPPfVONdF6IOX4NeDYNOyRaESJrC5JA762q-Cf_CFRftxVTaUvpNm2NtNyn2pP2qpfqzqJZiwjvnZwmfoQG6ie3KazKIhzT7bp2vyOnHU_B8aZ7iMUf-5U0oq91wh6pTsiCxkcE0xRtXby9sgGW0HS8CUojtGdLbVBngt_87kJhlR65FQRLi_wA' },
              ].map((item) => (
                <div key={item.title} className={`${bentoCardClass} p-6 rounded-3xl bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/30 flex flex-col gap-3`}>
                  <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center ${item.color}`}>
                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold">{item.title}</h3>
                  <p className="text-base text-[var(--color-on-surface-variant)]">{item.desc}</p>
                  <div className="mt-auto pt-4 overflow-hidden rounded-xl h-32">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 Langkah Section */}
        <section className="py-16 bg-[var(--color-surface-container-low)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-4 bg-[var(--color-primary)]/10 rounded-3xl transform -rotate-3" />
                <div className="relative z-10 w-full rounded-3xl shadow-2xl overflow-hidden aspect-video">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdnia95Pt0jxkJgIWwd12VwohQlo8DZ78ED8OZm9SVquvdWm4UM3gi6uaVW0-NoBmJnnas3rzJRWuYBM6nZ2R25WKSmXXczRHWfonoVVlwc5d1ADxWX_4L8YVd2liizJxaK89opi1BD3PfMyciMHLytVrL8HjaZXdrwIXTXx0wLBWfJd_jX164ozdRZdeAJpEP58FPPTmtx4LYv8k3iavqpkUxgajb93RmKG7ZCvpfdz8KfQHFTTaK-7FOPQ4PL8VnyAzecDIKFg" alt="Cara Kerja AR" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-10">
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold">
                  Tiga Langkah <span className="text-[var(--color-primary)]">Eksplorasi</span>
                </h2>
                <div className="space-y-6">
                  {[
                    { num: '1', title: 'Scan Lingkunganmu', desc: 'Arahkan kameramu ke objek di sekitar—air, tanah, atau bahkan produk harianmu.' },
                    { num: '2', title: 'Visualisasi Mikro', desc: 'Lihat keajaiban AR saat partikel mikroplastik muncul dan teridentifikasi secara otomatis.' },
                    { num: '3', title: 'Observasi & Analisis', desc: 'Pelajari dampaknya dan selesaikan misi untuk mendapatkan poin pengetahuan.' },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-6 group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                        {step.num}
                      </div>
                      <div>
                        <h4 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-bold mb-1">{step.title}</h4>
                        <p className="text-base text-[var(--color-on-surface-variant)]">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fitur Bento Grid */}
        <section className="py-16 bg-white overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-center mb-16">Fitur Unggulan Kamu</h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* AR Tech */}
              <div className="md:col-span-8 group relative rounded-3xl overflow-hidden bg-[var(--color-primary)] h-[400px]">
                <div className="absolute inset-0">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxrt_7rcJ-0GVieY-RTZrIsykmkX7RUFKgQWvzoXezgAhxKxyUygKVmRrTIFI4XbBAHzLtzcdAuChZo0ecFVn9YDaQOrs3NqwpUerzJxqOuTaMdnUfCY2-K8BWRDVc02HOqq0_X4_zwCi2fXM13RiUr8r7MVQ0KijWoZs_wny1JXZGINUsqQ0M-DCu6H3SxZcRvrvcxErKymkm1muMUs_0lqnQDwzy2Kkjrm2IomkqN7fpyKxZU8lRhfw5almQvZOefD9koKwZAA" alt="AR Technology" className="w-full h-full object-cover brightness-50" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/90 to-transparent flex flex-col justify-end p-10">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white mb-6">
                    <span className="material-symbols-outlined">biotech</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-white mb-2">Teknologi AR Tercanggih</h3>
                  <p className="text-white/80 text-base max-w-lg">Deteksi partikel polutan secara real-time dengan akurasi tinggi menggunakan sensor canggih perangkatmu.</p>
                </div>
              </div>
              {/* Misi */}
              <div className={`${bentoCardClass} md:col-span-4 bg-[var(--color-tertiary-container)] rounded-3xl p-10 flex flex-col text-[var(--color-on-tertiary-container)]`}>
                <div className="w-12 h-12 rounded-xl bg-[var(--color-on-tertiary-container)]/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">assignment_turned_in</span>
                </div>
                <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold mb-2">Misi Seru Harian</h3>
                <p className="text-base opacity-90 mb-10">Tantang dirimu dengan misi penyelamatan lingkungan di setiap level petualangan.</p>
                <div className="mt-auto bg-white/30 rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-sm font-semibold">Misi Hari Ini</span>
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-bold">2/5</span>
                </div>
              </div>
              {/* Lencana */}
              <div className={`${bentoCardClass} md:col-span-4 bg-[var(--color-secondary-container)] rounded-3xl p-10 flex flex-col text-[var(--color-on-secondary-container)]`}>
                <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold mb-4">Lencana Digital</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: 'eco', label: 'Eco Warrior', active: true },
                    { icon: 'water_drop', label: 'Water Hero', active: false },
                    { icon: 'workspace_premium', label: 'Master AR', active: true },
                    { icon: 'science', label: 'Scientist', active: true },
                  ].map((b) => (
                    <div key={b.label} className={`aspect-square bg-white/40 rounded-2xl flex flex-col items-center justify-center p-2 text-center ${!b.active ? 'opacity-40' : ''}`}>
                      <span className="material-symbols-outlined text-4xl mb-1">{b.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{b.label}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-base opacity-80">Koleksi semua lencana langka untuk naik ke level Grand Explorer!</p>
              </div>
              {/* Progress */}
              <div className={`${bentoCardClass} md:col-span-8 bg-[var(--color-surface-container-high)] rounded-3xl p-10 flex flex-col md:flex-row gap-10 items-center`}>
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold mb-2">Pantau Progress Belajarmu</h3>
                  <p className="text-base text-[var(--color-on-surface-variant)] mb-6">Lihat seberapa jauh kamu sudah melangkah dan bandingkan skor petualanganmu dengan teman sekolah.</p>
                  <div className="h-3 w-full bg-[var(--color-outline-variant)]/30 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-secondary)] w-3/4 rounded-full" />
                  </div>
                  <div className="mt-2 flex justify-between text-xs font-bold text-[var(--color-on-surface-variant)]">
                    <span>Level 12: Junior Explorer</span>
                    <span>750 / 1000 XP</span>
                  </div>
                </div>
                <div className="flex-shrink-0 flex -space-x-4">
                  {[
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDuCge-rPrht317EmEdOWmp-YVm8hMagtzGV2y4J3Q8kV_PCQ5tk044yB8bzqM4VYYb1oL8YUar2SLhIuNVi3_oDIlxXyH1YN7dRwrCLGq81VS78nNe3hFh4QuVbvCwuT9rhcHF-RZgLCMhNChP4OpyMmSYzwBk6nzjisn3NMe6YXuSqzey6d5Y3MfyG9YuC_PkK8xZWxPyqfGmap9kmEyIQCOTj6FPe7ACfzS0kRd9CO8H8adumYKrCmQMJivQl6OcGBWn5bIqeQ',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-QodboRdigx2a5zasNfzgaEWVbpgdCBxXTswqBr7YXOfhcfFDUwYXmCJhJ8R3dO2249W6lSkjLq3CorB7MQM9HcexjNru40QSPf2VX_hNDE-Kw64Ca7UxtSAjnt8r9OCkB1RnWglHzGc6jZ9MVszU6S4KyBdlUKr0xIxZsTkSjnn53kH17k7FC2BPlEILe9n3Ruv4qH_mDNRWWo8xuQLIhA23pu_ZK2zoqsB3Y-N4r_ESRlR7XTutR979G8oiuzJJpYXZPl2Ng',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBXYaAtF23ZJAqlrARuHO5BCfpToON0j0Q3URAbI5YxF6YKuVG6Tx_4feyyyloS0O_YV3NBB2yhkcyXfZXFd98-P1QE_GTecRN_R8-aBb5zBPnKwpH_syLUcZpG0gvJSZJTEFJ4r7LkdEZA86C_HxoeNbiVwrLgRGac_RtGg6hiCMA6_vq_tKj_5f9ieCcTZXX3iCuSiI83MjidYvIO6EWOhnTN5vx5pjf9Mw53GP5CGugLTNPWtIiGbNZgEKfv2kt6J9tD6BT9CA',
                  ].map((src, i) => (
                    <div key={i} className="w-14 h-14 rounded-full border-4 border-white overflow-hidden bg-[var(--color-surface-container)]">
                      <img src={src} alt={`User ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-14 h-14 rounded-full border-4 border-white bg-[var(--color-surface-container)] flex items-center justify-center text-sm font-bold text-[var(--color-on-surface-variant)]">+12</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="bg-[var(--color-primary)] rounded-[40px] p-10 md:p-16 text-center text-[var(--color-on-primary)] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-secondary)]/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-5xl font-extrabold mb-4 text-white">
                Siap Menjadi Pahlawan <span className="text-[var(--color-secondary-fixed)]">Lingkungan?</span>
              </h2>
              <p className="text-lg text-white/90 mb-16 max-w-2xl mx-auto">
                Gabung bersama ribuan pelajar lainnya dan jadilah bagian dari perubahan besar untuk bumi kita.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/perjalanan-belajar" className="h-16 px-12 bg-white text-[var(--color-primary)] rounded-2xl font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold hover:scale-105 transition-transform active:scale-95 shadow-xl flex items-center justify-center">
                  Mulai Belajar
                </Link>
                <Link href="/rapor-guru" className="h-16 px-12 bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] rounded-2xl font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold border border-white/20 hover:bg-white/10 transition-colors flex items-center justify-center">
                  Bantuan Guru
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--color-surface-container)] border-t border-[var(--color-outline-variant)]">
        <div className="w-full py-16 px-6 flex flex-col md:flex-row justify-between items-center gap-6 max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[var(--color-on-surface)]">MicroJourney AR</span>
            <p className="text-sm text-[var(--color-on-surface-variant)]">© 2024 MicroJourney AR. Petualangan Sains untuk Penjelajah Muda.</p>
          </div>
          <div className="flex gap-10 flex-wrap justify-center">
            {['Tentang Kami', 'Bantuan', 'Kebijakan Privasi', 'Panduan Guru'].map(l => (
              <a key={l} href="#" className="text-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-secondary)] transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex gap-4">
            {['language', 'forum'].map(icon => (
              <a key={icon} href="#" className="w-10 h-10 rounded-full bg-[var(--color-surface-container-high)] flex items-center justify-center text-[var(--color-on-surface-variant)] hover:bg-[var(--color-primary)] hover:text-white transition-all">
                <span className="material-symbols-outlined">{icon}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
