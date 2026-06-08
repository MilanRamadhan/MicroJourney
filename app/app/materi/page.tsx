'use client';
import { useState } from 'react';
import Link from 'next/link';

const MODULES = [
  {
    id: 1,
    icon: '📡',
    tag: 'TAHAP 1',
    title: 'Scanner AR & Deteksi Plastik',
    color: '#006591',
    bgLight: '#c9e6ff',
    border: '#006591',
    desc: 'Menggunakan augmented reality berbasis TensorFlow.js dan COCO-SSD untuk mendeteksi botol plastik secara real-time melalui kamera perangkat.',
    concepts: [
      { label: 'Polimer Plastik', body: 'Plastik adalah polimer sintetis berbasis karbon — rantai panjang monomer yang terikat melalui polimerisasi. Jenis terbanyak: PET (botol minuman), HDPE (wadah), PP (kemasan makanan).' },
      { label: 'Mikroplastik < 5mm', body: 'Partikel plastik berukuran < 5mm disebut mikroplastik. Terbentuk dari pelapukan fisik dan kimia plastik berukuran besar yang terbuang ke lingkungan.' },
      { label: 'Sumber Mikroplastik', body: 'Primer: butiran microbeads produk perawatan. Sekunder: pecahan plastik besar akibat fotodegradasi + abrasi mekanis ombak/angin selama bertahun-tahun.' },
    ],
    fact: '🌊 1 botol plastik → jutaan partikel mikroplastik dalam 450 tahun',
  },
  {
    id: 2,
    icon: '⚗️',
    tag: 'TAHAP 2',
    title: 'Simulasi Pelapukan Plastik',
    color: '#0ea5e9',
    bgLight: '#e0f2fe',
    border: '#0ea5e9',
    desc: 'Simulasi interaktif proses fotodegradasi (sinar UV) dan abrasi mekanis (ombak) yang mengubah botol plastik menjadi jutaan partikel mikroplastik.',
    concepts: [
      { label: 'Fotodegradasi UV', body: 'Radiasi UV matahari memutus ikatan rantai polimer plastik (C-C dan C-H). Akibatnya plastik menjadi rapuh, berubah warna, dan mudah hancur secara mekanis.' },
      { label: 'Abrasi Mekanis', body: 'Gesekan dan hantaman fisik ombak, pasir, dan angin memecah plastik yang sudah rapuh menjadi serpihan kecil hingga berukuran < 5mm (mikroplastik).' },
      { label: 'Dua Proses Utama', body: 'FOTODEGRADASI (UV melemahkan polimer) + ABRASI MEKANIS (fisik memecah) = proses utama pembentukan mikroplastik sekunder di alam.' },
    ],
    fact: '☀️ UV + ombak = botol plastik pecah jadi jutaan partikel',
  },
  {
    id: 3,
    icon: '🍱',
    tag: 'TAHAP 3',
    title: 'Kontaminasi Pangan Sehari-hari',
    color: '#ba1a1a',
    bgLight: '#ffdad6',
    border: '#ba1a1a',
    desc: 'Investigasi kandungan mikroplastik tersembunyi dalam makanan Indonesia sehari-hari — dari garam dapur hingga udang laut.',
    concepts: [
      { label: 'Jalur Kontaminasi', body: 'Dua jalur utama: (1) Rantai makanan laut — ikan/udang makan plankton yang mengandung mikroplastik; (2) Kontaminasi langsung — air minum, garam, dan kemasan plastik melepaskan partikel ke makanan.' },
      { label: 'Bioakumulasi', body: 'Mikroplastik terakumulasi dalam jaringan hewan laut. Semakin tinggi posisi dalam rantai makanan, semakin tinggi konsentrasi mikroplastik yang terkandung (biomagnifikasi).' },
      { label: 'Indonesia #1 Dunia', body: 'Studi Orb Media (2019) menemukan Indonesia sebagai negara dengan konsumsi mikroplastik tertinggi per kapita — rata-rata menelan 15g plastik per bulan.' },
    ],
    fact: '🍽️ Rata-rata manusia menelan 5 gram plastik per minggu (setara kartu ATM)',
  },
  {
    id: 4,
    icon: '🫀',
    tag: 'TAHAP 4',
    title: 'Dampak pada Organ Pencernaan',
    color: '#ba1a1a',
    bgLight: '#ffdad6',
    border: '#ba1a1a',
    desc: 'Investigasi interaktif perjalanan mikroplastik melewati 5 organ sistem pencernaan manusia dan dampak biologisnya.',
    concepts: [
      { label: 'Mulut → Lambung', body: 'Di mulut, plastik tidak bereaksi dengan enzim saliva. Di lambung, HCl (pH 1-2) gagal mencerna polimer sintetis — plastik tetap utuh karena ikatan C-C tahan asam.' },
      { label: 'Usus Halus (KRITIS)', body: 'Organ paling kritis — partikel < 10μm dapat menembus epitel usus dan masuk ke aliran darah. Menyebabkan peradangan dan mengandung zat plastisizer berbahaya (BPA, ftalat).' },
      { label: 'Usus Besar → Darah', body: 'Sebagian besar partikel dibuang melalui feses. Namun nanopartikel (<1μm) dapat masuk ke sirkulasi darah, berpotensi mencapai organ vital termasuk hati, ginjal, dan otak.' },
    ],
    fact: '🔬 Partikel < 10μm dapat menembus dinding usus masuk ke aliran darah',
  },
  {
    id: 5,
    icon: '📋',
    tag: 'TAHAP 5',
    title: 'E-LKPD & Penyelidikan Ilmiah',
    color: '#006e2f',
    bgLight: '#dcfce7',
    border: '#006e2f',
    desc: 'Lembar Kerja Peserta Didik digital yang merekap seluruh temuan dari 4 tahap investigasi sebagai bukti penyelidikan ilmiah berbasis data.',
    concepts: [
      { label: 'LKPD 1 — Pelapukan', body: 'Mencatat proses fotodegradasi dan abrasi mekanis. Pilihan ganda: mengidentifikasi dua proses utama yang mengubah plastik menjadi mikroplastik.' },
      { label: 'LKPD 2 — Kontaminasi', body: 'Menganalisis jalur kontaminasi mikroplastik ke makanan. Pilihan ganda: memilih jalur paling tepat dari rantai makanan laut dan kontaminasi langsung.' },
      { label: 'LKPD 3 — Organ', body: 'Dua pertanyaan esai: (1) mengapa asam lambung gagal mencerna plastik; (2) organ mana yang paling berbahaya dan alasannya berdasarkan investigasi.' },
    ],
    fact: '📊 Semua data investigasi tersimpan dan dapat dilihat guru di Dashboard',
  },
  {
    id: 6,
    icon: '🌿',
    tag: 'TAHAP 6',
    title: 'Komitmen & Aksi Nyata',
    color: '#006e2f',
    bgLight: '#dcfce7',
    border: '#006e2f',
    desc: 'Membuat pledges komitmen konkret untuk mengurangi konsumsi plastik dan mengunduh rapor personal berisi rekap perjalanan belajar.',
    concepts: [
      { label: 'Eco-Pledge', body: 'Peserta memilih komitmen aksi nyata: membawa tumbler, menolak sedotan plastik, memilah sampah, memilih produk ramah lingkungan, mengurangi plastik sekali pakai.' },
      { label: 'Tanda Tangan Digital', body: 'Komitmen dikukuhkan dengan tanda tangan digital pada kanvas. Setiap pledge bersifat personal dan tercatat dalam rapor PDF yang dapat diunduh.' },
      { label: 'Rapor PDF Personal', body: 'Sistem menggenerate rapor PDF menggunakan jsPDF — berisi rekap perjalanan: jumlah plastik terdeteksi, total partikel dikonsumsi, organ terdampak, dan pledge komitmen.' },
    ],
    fact: '♻️ Satu keputusan hari ini = ratusan kg plastik lebih sedikit sepanjang hidup',
  },
];

export default function MateriPage() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#f7f9fb] relative overflow-hidden">
      <div className="absolute inset-0 adventure-map opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#006591]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#006e2f]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white border border-[#bec8d2] px-5 py-2 rounded-full mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#006591] animate-pulse" />
            <span className="text-[#006591] text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest">Modul Ajar Interaktif</span>
          </div>
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl font-extrabold text-[#191c1e] mb-4 leading-tight">
            Materi Pembelajaran<br/>
            <span className="text-[#006591]">MicroJourney AR</span>
          </h1>
          <p className="text-[#3e4850] text-lg max-w-2xl mx-auto leading-relaxed">
            6 tahap perjalanan ilmiah interaktif — dari deteksi plastik dengan AI,
            simulasi pelapukan, investigasi pangan, hingga komitmen aksi nyata.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { val:'6', label:'Tahap Modul', color:'#006591' },
              { val:'4', label:'E-LKPD Digital', color:'#ba1a1a' },
              { val:'AR', label:'Teknologi Kamera', color:'#006e2f' },
              { val:'PDF', label:'Rapor Personal', color:'#785a00' },
            ].map(s=>(
              <div key={s.label} className="bg-white border border-[#bec8d2] rounded-xl px-5 py-3 text-center shadow-sm">
                <div className="font-[family-name:var(--font-mono)] text-2xl font-bold" style={{ color: s.color }}>{s.val}</div>
                <div className="text-[#6e7881] text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Module cards */}
        <div className="space-y-4 mb-14">
          {MODULES.map(mod => {
            const isOpen = activeModule === mod.id;
            return (
              <div key={mod.id}
                className="bg-white border border-[#bec8d2] rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                style={{ borderLeft: `4px solid ${mod.border}` }}>
                <button className="w-full flex items-center gap-4 p-5 text-left hover:bg-[#f7f9fb] transition-colors"
                  onClick={() => setActiveModule(isOpen ? null : mod.id)}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: mod.bgLight }}>
                    {mod.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="mb-0.5">
                      <span className="text-xs font-[family-name:var(--font-mono)] font-bold px-2 py-0.5 rounded"
                        style={{ backgroundColor: mod.bgLight, color: mod.color }}>
                        {mod.tag}
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-[#191c1e]">{mod.title}</h3>
                    <p className="text-[#6e7881] text-xs mt-0.5 leading-relaxed">{mod.desc}</p>
                  </div>
                  <span className="material-symbols-outlined text-[#bec8d2] transition-transform flex-shrink-0"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                    expand_more
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 border-t border-[#f2f4f6]">
                    <div className="grid md:grid-cols-3 gap-3 mt-4 mb-4">
                      {mod.concepts.map((c, ci) => (
                        <div key={ci} className="bg-[#f7f9fb] border border-[#bec8d2] rounded-xl p-4">
                          <p className="font-bold text-sm mb-2" style={{ color: mod.color }}>{c.label}</p>
                          <p className="text-[#3e4850] text-xs leading-relaxed">{c.body}</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl p-4 flex items-center gap-3"
                      style={{ backgroundColor: mod.bgLight }}>
                      <p className="text-sm font-semibold" style={{ color: mod.color }}>{mod.fact}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Key concepts */}
        <div className="bg-white border border-[#bec8d2] rounded-2xl p-8 mb-10 shadow-sm">
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-[#191c1e] mb-6 text-center">Konsep Sains Utama</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon:'🔬', title:'Polimer & Mikroplastik', body:'Plastik adalah polimer sintetis yang tidak dapat dicerna oleh enzim biologis maupun asam organik, termasuk asam lambung (HCl).' },
              { icon:'☀️', title:'Fotodegradasi UV', body:'Radiasi UV memecah ikatan kimia C-C dalam polimer plastik, membuatnya rapuh sebelum abrasi mekanis mengubahnya jadi mikroplastik.' },
              { icon:'🌊', title:'Rantai Makanan Terkontaminasi', body:'Bioakumulasi mikroplastik terjadi di sepanjang rantai makanan laut — dari plankton, ikan kecil, hingga ikan besar yang kita konsumsi.' },
              { icon:'🫀', title:'Dampak Organ Pencernaan', body:'Usus halus adalah organ paling kritis — partikel < 10μm dapat menembus epitel dan masuk ke aliran darah, membawa zat kimia berbahaya.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-[#f7f9fb] border border-[#bec8d2] rounded-xl">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-bold text-[#191c1e] text-sm mb-1">{item.title}</p>
                  <p className="text-[#3e4850] text-xs leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-[#006591] to-[#006e2f] rounded-2xl p-10 text-white shadow-xl">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold mb-3">Siap Memulai Perjalanan?</h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto text-sm leading-relaxed">
            Mulai dari Tahap 1 — Scanner AR akan mendeteksi plastik di sekitarmu menggunakan kamera perangkat dan kecerdasan buatan.
          </p>
          <Link href="/journey/tahap-1"
            className="inline-flex items-center gap-2 bg-white text-[#006591] font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#f0f9ff] transition-all hover:scale-105 active:scale-95 shadow-md">
            <span className="material-symbols-outlined">play_arrow</span>
            Mulai Perjalanan Belajar
          </Link>
        </div>
      </div>
    </div>
  );
}
