import Link from 'next/link';
import Navbar from '@/components/Navbar';

const materiList = [
  {
    id: 1,
    category: 'Terpopuler',
    categoryColor: 'text-[var(--color-primary)] bg-[var(--color-primary-container)]/10',
    title: 'Jenis Plastik & Bahayanya',
    desc: 'Pahami perbedaan antara PET, HDPE, hingga mikroplastik yang kasat mata namun sangat berbahaya bagi kesehatan.',
    icon: 'category',
    featured: true,
  },
  {
    id: 2,
    category: 'Ekosistem',
    categoryColor: 'text-[var(--color-secondary)] bg-[var(--color-secondary-container)]/20',
    title: 'Ekosistem Laut',
    desc: 'Bagaimana laut bekerja sebagai paru-paru dunia dan rumah bagi jutaan spesies.',
    icon: 'water',
    featured: false,
  },
  {
    id: 3,
    category: 'Siklus Hidup',
    categoryColor: 'text-[var(--color-tertiary)] bg-[var(--color-tertiary-fixed)]/30',
    title: 'Rantai Makanan',
    desc: 'Aliran energi yang menjaga keseimbangan alam, dari plankton hingga paus biru.',
    icon: 'set_meal',
    featured: false,
  },
  {
    id: 4,
    category: 'Kesehatan',
    categoryColor: 'text-[var(--color-error)] bg-[var(--color-error-container)]/20',
    title: 'Dampak bagi Manusia',
    desc: 'Mengapa laut yang bersih sangat penting bagi air minum dan makanan yang kita konsumsi.',
    icon: 'person_celebrate',
    featured: false,
  },
];

export default function MateriPage() {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-background)] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-[radial-gradient(circle_at_2px_2px,#e0e3e5_1px,transparent_0)] [background-size:24px_24px] py-16 px-6 max-w-[1200px] mx-auto w-full">
        {/* Header */}
        <section className="mb-16">
          <div className="flex items-center gap-1 text-[var(--color-on-surface-variant)] text-sm font-semibold mb-3">
            <span>Perpustakaan</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-[var(--color-primary)] font-bold">Materi</span>
          </div>
          <h1 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[var(--color-on-background)] mb-3">Eksplorasi Materi</h1>
          <p className="text-lg text-[var(--color-on-surface-variant)] max-w-2xl">
            Pelajari dampak sampah plastik terhadap ekosistem laut dan diri kita melalui modul interaktif berbasis Augmented Reality.
          </p>
        </section>

        {/* Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Featured Card */}
          <div className="md:col-span-8 group relative overflow-hidden bg-[var(--color-surface-container-lowest)] rounded-3xl p-16 shadow-sm border border-white hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-primary-container)]/10 text-[var(--color-primary)] rounded-full text-sm font-semibold">
                  <span className="material-symbols-outlined text-[18px]">category</span>
                  Terpopuler
                </div>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[var(--color-on-surface)]">Jenis Plastik & Bahayanya</h2>
                <p className="text-[var(--color-on-surface-variant)]">Pahami perbedaan antara PET, HDPE, hingga mikroplastik yang kasat mata namun sangat berbahaya bagi kesehatan.</p>
                <Link href="/perjalanan-belajar/1" className="inline-flex items-center gap-2 px-10 h-12 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-full text-sm font-semibold hover:shadow-lg active:scale-95 transition-all">
                  Mulai Belajar <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
              <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-sm border border-[var(--color-surface-container)] group-hover:scale-105 transition-transform duration-500">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0Lcoyap2STuwVD4DGKl44i07aG3AYfBtgEjniNDPzSTu4cyPhBQgc8jM_GGrhsjPg_YUU31Hl-MfBI5e8amyJeT0aBApkYB4nSaoEcAvxTIpEzjXO6gIgGqXnC_AbI1SKFrGWgTyFcgvSAZBt4yMCxds4dPhbpT6GDbo-fMSnf85Ez2JKuZAW4T2BUeOtwvP39UGE7OXxuF1Ajikm89QhBLyMylm_XkIw4AXRakh2dI4Vd82_e2f9HBt1r5MUB0dz7K709GJdqw" alt="Types of plastic" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Side Card */}
          <div className="md:col-span-4 group bg-[var(--color-surface-container-lowest)] rounded-3xl p-6 shadow-sm border border-white hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="h-40 w-full rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-500">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtbzX7023RJvDt4XbR3pSJ70SOQuMRHKeELdRtKCKDcZjnxe-lWS1q47MFRN69thSLFy9SMkU6e_bhemT6ZZZbg6nq0WxdFTD_aKy0aqfynfhXBc1HrjI6H53mMvD9XC3_322nhHbejwKjun0WV2mEQEwIs8bBNOulf7XkD33L_2uzhoFw4G7ziUHyf6HLZYVVVl14Mjvngbi1ZB9OUSdUTSl0VrEJO7j-4llk3bAXMRr9lqXBWOt3tnJbwl61tNbELbUZfwrb1A" alt="Ocean ecosystem" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-3 flex-grow">
              <div className="inline-flex px-3 py-1 bg-[var(--color-secondary-container)]/20 text-[var(--color-secondary)] rounded-full text-sm font-semibold">Ekosistem</div>
              <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[var(--color-on-surface)]">Ekosistem Laut</h3>
              <p className="text-base text-[var(--color-on-surface-variant)]">Bagaimana laut bekerja sebagai paru-paru dunia dan rumah bagi jutaan spesies.</p>
            </div>
            <Link href="/perjalanan-belajar/3" className="mt-6 flex items-center justify-center gap-2 w-full h-12 border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] rounded-full text-sm font-semibold hover:bg-[var(--color-secondary)]/5 transition-all">
              Lihat Materi
            </Link>
          </div>

          {/* Bottom Cards */}
          {[
            { href: '/perjalanan-belajar/4', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRD2dtvqPsW_CzC2VGp6ildQg1cJUfAKGZhQTxmiUNd2a0O3lwS2OfltGOf9fXoYyqsfb106NDROcUPJd6st1T-x7QDc7vPyWd8DcxKBBEnA448-ZC2joQjHrIlL_FAx8VjKONLCvFErtILfsMTTBTDt9MX76JomV2fnw2xhbY1_znCUF0UO4vS57EFF3wy5253tBiQsjFQ3OKb5DsJzmryNb6VDopJEYJBGNzw5MQcf036KsDxGgLT9haKHDA55riDxhEc09LfA', cat: 'Siklus Hidup', catClass: 'bg-[var(--color-tertiary-fixed)]/30 text-[var(--color-tertiary)]', title: 'Rantai Makanan', desc: 'Aliran energi yang menjaga keseimbangan alam, dari plankton hingga paus biru.' },
            { href: '/perjalanan-belajar/6', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPu4q9I0P6tpkdDafiTJ22ZPHv2rUm54R8ZPB7GVOJWOzFx1BTNGue3k-g0Bj0GPTat7fgZBA-n8He8rgGleqURHVFKcaah3oKa6EokaK7CTLjaD1Qy2dHDRw03quogeaDtX-vXeb6wO3pFQ-TWiYsRoZKDYNw4tNuXb8HlTVDSXo7Q1ODMQy7SBFabMunAYdL0q3zBK3FR2d_NZbNDqC9glikdE18uo21HAZvQoZ33O8GgHJcDNne_VLRuGaO2CubZht1GUkIyw', cat: 'Kesehatan', catClass: 'bg-[var(--color-error-container)]/20 text-[var(--color-error)]', title: 'Dampak bagi Manusia', desc: 'Mengapa laut yang bersih sangat penting bagi air minum dan makanan yang kita konsumsi.' },
          ].map((card) => (
            <Link href={card.href} key={card.title} className="md:col-span-6 group bg-[var(--color-surface-container-lowest)] rounded-3xl p-6 shadow-sm border border-white hover:shadow-xl transition-all duration-300 flex items-start gap-6">
              <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-[var(--color-surface-container)] group-hover:scale-105 transition-transform duration-500">
                <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3">
                <div className={`inline-flex px-3 py-1 ${card.catClass} rounded-full text-sm font-semibold`}>{card.cat}</div>
                <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[var(--color-on-surface)]">{card.title}</h3>
                <p className="text-base text-[var(--color-on-surface-variant)]">{card.desc}</p>
              </div>
            </Link>
          ))}
        </section>

        {/* Progress Banner */}
        <section className="mt-16 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-3xl p-16 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-3">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold">Lanjutkan Petualanganmu!</h2>
            <p className="text-[var(--color-on-primary)]/80">Kamu telah menyelesaikan 2 dari 4 materi hari ini. Sedikit lagi!</p>
          </div>
          <div className="w-full md:w-64 space-y-3">
            <div className="flex justify-between text-sm font-semibold">
              <span>Progres Belajar</span>
              <span>50%</span>
            </div>
            <div className="h-3 w-full bg-[var(--color-on-primary)]/20 rounded-full overflow-hidden">
              <div className="h-full bg-[var(--color-secondary-fixed)] w-1/2 rounded-full shadow-[0_0_8px_rgba(107,255,143,0.5)]" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--color-surface-container)] border-t border-[var(--color-outline-variant)] mt-16">
        <div className="w-full py-16 px-6 flex flex-col md:flex-row justify-between items-center gap-6 max-w-[1200px] mx-auto">
          <span className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[var(--color-on-surface)]">MicroJourney AR</span>
          <p className="text-sm text-[var(--color-on-surface-variant)]">© 2024 MicroJourney AR. Petualangan Sains untuk Penjelajah Muda.</p>
          <div className="flex gap-6">
            {['Tentang Kami', 'Bantuan', 'Kebijakan Privasi'].map(l => (
              <a key={l} href="#" className="text-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-secondary)] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
