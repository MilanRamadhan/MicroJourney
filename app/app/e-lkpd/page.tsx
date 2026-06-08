'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useJourneyStore } from '@/lib/journeyStore';
import { useAuthStore } from '@/lib/authStore';

const LKPD_DEFS = [
  {
    id: 'lkpd1',
    num: 1,
    icon: '⚗️',
    title: 'Pelapukan Plastik',
    tahap: 'Tahap 2',
    type: 'Pilihan Ganda',
    color: '#0ea5e9',
    bgLight: '#e0f2fe',
    question: 'Dua proses utama yang menyebabkan botol plastik berubah menjadi partikel mikroplastik di alam adalah...',
    options: [
      { id: 'a', text: 'Fotodegradasi oleh sinar UV matahari + Abrasi mekanis oleh ombak/angin' },
      { id: 'b', text: 'Pembakaran oleh panas + Biodegradasi oleh bakteri' },
      { id: 'c', text: 'Hidrolisis kimia oleh air hujan + Oksidasi oleh udara' },
      { id: 'd', text: 'Fermentasi biologis + Evaporasi akibat suhu tinggi' },
    ],
    correct: 'a',
    explanation: 'Fotodegradasi (UV melemahkan polimer) + Abrasi mekanis (fisik memecah) adalah dua proses utama pembentukan mikroplastik sekunder di alam.',
  },
  {
    id: 'lkpd2',
    num: 2,
    icon: '🍱',
    title: 'Kontaminasi Pangan',
    tahap: 'Tahap 3',
    type: 'Pilihan Ganda',
    color: '#ba1a1a',
    bgLight: '#ffdad6',
    question: 'Bagaimana mikroplastik bisa masuk ke dalam makanan yang kita konsumsi setiap hari?',
    options: [
      { id: 'a', text: 'Melalui rantai makanan laut (ikan makan plankton yang mengandung mikroplastik) + tertelan saat makan garam/air yang terkontaminasi' },
      { id: 'b', text: 'Hanya melalui udara yang kita hirup saat tidur di malam hari' },
      { id: 'c', text: 'Hanya melalui kulit yang menyerap plastik saat menyentuh kemasan makanan' },
      { id: 'd', text: 'Melalui proses memasak saja, bukan dari bahan makanan itu sendiri' },
    ],
    correct: 'a',
    explanation: 'Mikroplastik masuk melalui rantai makanan laut (bioakumulasi) dan kontaminasi langsung air, garam, serta kemasan plastik.',
  },
  {
    id: 'lkpd3q1',
    num: '3A',
    icon: '🫀',
    title: 'Organ — Pertanyaan 1',
    tahap: 'Tahap 4',
    type: 'Esai',
    color: '#ba1a1a',
    bgLight: '#ffdad6',
    question: 'Mengapa asam lambung (HCl) gagal mencerna plastik? Jelaskan menggunakan konsep ikatan polimer!',
    options: [],
    correct: '',
    explanation: 'Plastik terdiri dari rantai polimer sintetis dengan ikatan C-C yang sangat kuat dan stabil terhadap asam. Berbeda dengan protein (terurai oleh pepsin) atau karbohidrat (dihidrolisis amilase), polimer plastik tidak memiliki gugus fungsional yang dikenali enzim pencernaan.',
  },
  {
    id: 'lkpd3q2',
    num: '3B',
    icon: '🔬',
    title: 'Organ — Pertanyaan 2',
    tahap: 'Tahap 4',
    type: 'Esai',
    color: '#ba1a1a',
    bgLight: '#ffdad6',
    question: 'Di organ mana mikroplastik paling berbahaya? Jelaskan alasannya berdasarkan investigasi organ!',
    options: [],
    correct: '',
    explanation: 'Usus halus adalah organ paling kritis — vili usus halus memiliki luas permukaan besar untuk absorpsi, dan partikel < 10μm dapat menembus epitel dan masuk ke aliran darah, menyebarkan zat kimia plastisizer (BPA, ftalat) ke seluruh tubuh.',
  },
];

export default function ELKPDPage() {
  const { lkpdAnswers, completedStages } = useJourneyStore();
  const { currentUser } = useAuthStore();
  const [expanded, setExpanded] = useState<string | null>(null);

  const answered = {
    lkpd1: lkpdAnswers.lkpd1,
    lkpd2: lkpdAnswers.lkpd2,
    lkpd3q1: lkpdAnswers.lkpd3q1,
    lkpd3q2: lkpdAnswers.lkpd3q2,
  } as Record<string, string>;

  const answeredCount = Object.values(answered).filter(v => v && v.length > 0).length;
  const progressPct = Math.round((answeredCount / 4) * 100);

  return (
    <div className="min-h-screen bg-[#f7f9fb] relative overflow-hidden">
      <div className="absolute inset-0 adventure-map opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#006591]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-[#bec8d2] px-5 py-2 rounded-full mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#006e2f] animate-pulse" />
            <span className="text-[#006e2f] text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest">Lembar Kerja Peserta Didik Digital</span>
          </div>
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-extrabold text-[#191c1e] mb-3">E-LKPD</h1>
          <p className="text-[#3e4850] max-w-xl mx-auto text-sm leading-relaxed">
            Kumpulan lembar kerja digital dari seluruh tahap perjalanan investigasi mikroplastik.
            Jawaban tersimpan otomatis saat kamu mengerjakan setiap tahap.
          </p>
        </div>

        {/* Progress bar */}
        <div className="bg-white border border-[#bec8d2] rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-[#191c1e] text-sm">Progress LKPD</span>
            <span className="font-[family-name:var(--font-mono)] text-[#006e2f] font-bold text-sm">{answeredCount}/4 terjawab</span>
          </div>
          <div className="w-full bg-[#eceef0] rounded-full h-3 overflow-hidden mb-3">
            <div className="h-full bg-[#006e2f] rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }} />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {['LKPD 1','LKPD 2','LKPD 3A','LKPD 3B'].map((label, i) => {
              const keys = ['lkpd1','lkpd2','lkpd3q1','lkpd3q2'];
              const done = !!(answered[keys[i]] && answered[keys[i]].length > 0);
              return (
                <div key={label} className={`text-center text-xs font-[family-name:var(--font-mono)] py-1.5 rounded-lg border ${
                  done ? 'bg-[#6bff8f]/20 border-[#006e2f]/30 text-[#006e2f] font-bold' : 'bg-[#f2f4f6] border-[#bec8d2] text-[#6e7881]'
                }`}>
                  {done ? '✓' : '○'} {label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Guest warning */}
        {!currentUser && (
          <div className="bg-[#ffdf9a]/30 border border-[#c39400]/30 rounded-2xl p-5 mb-6 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#785a00] mt-0.5">warning</span>
            <div>
              <p className="text-[#785a00] font-semibold text-sm mb-1">Login untuk menyimpan ke server</p>
              <p className="text-[#785a00]/80 text-xs leading-relaxed">
                Jawaban tersimpan di browser lokal. <Link href="/login" className="underline font-bold">Login di sini</Link> agar guru dapat melihat progress-mu di dashboard.
              </p>
            </div>
          </div>
        )}

        {/* LKPD cards */}
        <div className="space-y-4 mb-10">
          {LKPD_DEFS.map(lkpd => {
            const userAnswer = answered[lkpd.id] || '';
            const hasAnswer = userAnswer.length > 0;
            const isCorrect = lkpd.type === 'Pilihan Ganda' ? userAnswer === lkpd.correct : null;
            const isOpen = expanded === lkpd.id;
            const matchedOption = lkpd.options.find(o => o.id === userAnswer);

            return (
              <div key={lkpd.id}
                className="bg-white border border-[#bec8d2] rounded-2xl shadow-sm overflow-hidden"
                style={{ borderLeft: `4px solid ${hasAnswer ? '#006e2f' : lkpd.color}` }}>

                <button className="w-full flex items-center gap-4 p-5 text-left hover:bg-[#f7f9fb] transition-colors"
                  onClick={() => setExpanded(isOpen ? null : lkpd.id)}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: lkpd.bgLight }}>
                    {hasAnswer ? '✅' : lkpd.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-xs font-[family-name:var(--font-mono)] font-bold px-2 py-0.5 rounded"
                        style={{ backgroundColor: lkpd.bgLight, color: lkpd.color }}>
                        LKPD {lkpd.num}
                      </span>
                      <span className="text-xs text-[#6e7881] font-[family-name:var(--font-mono)]">{lkpd.tahap}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${
                        lkpd.type === 'Pilihan Ganda' ? 'bg-[#c9e6ff]/30 border-[#006591]/20 text-[#006591]' : 'bg-[#ffdf9a]/30 border-[#c39400]/20 text-[#785a00]'
                      }`}>{lkpd.type}</span>
                    </div>
                    <h3 className="font-[family-name:var(--font-outfit)] text-base font-bold text-[#191c1e]">{lkpd.title}</h3>
                    <p className="text-[#6e7881] text-xs mt-0.5">
                      {hasAnswer ? (
                        lkpd.type === 'Pilihan Ganda'
                          ? `Jawaban: ${userAnswer.toUpperCase()} — ${isCorrect ? '✓ Benar' : '✗ Salah'}`
                          : `Dijawab — ${userAnswer.length} karakter`
                      ) : 'Belum dijawab — selesaikan tahapnya terlebih dahulu'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {hasAnswer && (
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                        isCorrect === true ? 'bg-[#6bff8f]/20 border-[#006e2f] text-[#006e2f]' :
                        isCorrect === false ? 'bg-[#ffdad6] border-[#ba1a1a] text-[#ba1a1a]' :
                        'bg-[#c9e6ff]/30 border-[#006591] text-[#006591]'
                      }`}>
                        {isCorrect === true ? '✓' : isCorrect === false ? '✗' : '✎'}
                      </span>
                    )}
                    <span className="material-symbols-outlined text-[#bec8d2] transition-transform"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                      expand_more
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 border-t border-[#f2f4f6]">
                    <div className="mt-4 mb-4 bg-[#f7f9fb] border border-[#bec8d2] rounded-xl p-4">
                      <p className="text-xs font-[family-name:var(--font-mono)] text-[#6e7881] uppercase tracking-wider mb-2">Pertanyaan</p>
                      <p className="text-[#191c1e] text-sm font-semibold leading-relaxed">{lkpd.question}</p>
                    </div>

                    {hasAnswer ? (
                      <>
                        {/* User answer */}
                        <div className={`border rounded-xl p-4 mb-3 ${
                          isCorrect === true ? 'bg-[#6bff8f]/10 border-[#006e2f]/30' :
                          isCorrect === false ? 'bg-[#ffdad6] border-[#ba1a1a]/30' :
                          'bg-[#c9e6ff]/10 border-[#006591]/20'
                        }`}>
                          <p className="text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider mb-2" style={{ color: lkpd.color }}>Jawabanmu</p>
                          {lkpd.type === 'Pilihan Ganda' ? (
                            <div className="flex items-start gap-2">
                              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                isCorrect ? 'bg-[#006e2f] border-[#006e2f] text-white' : 'bg-[#ba1a1a] border-[#ba1a1a] text-white'
                              }`}>{userAnswer.toUpperCase()}</span>
                              <p className="text-[#191c1e] text-sm">{matchedOption?.text}</p>
                            </div>
                          ) : (
                            <p className="text-[#191c1e] text-sm leading-relaxed whitespace-pre-wrap">{userAnswer}</p>
                          )}
                        </div>

                        {/* Correct answer / explanation */}
                        {isCorrect === false && (
                          <div className="bg-[#6bff8f]/10 border border-[#006e2f]/30 rounded-xl p-4 mb-3">
                            <p className="text-xs font-[family-name:var(--font-mono)] text-[#006e2f] uppercase tracking-wider mb-2">Jawaban Benar</p>
                            <div className="flex items-start gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#006e2f] border-2 border-[#006e2f] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {lkpd.correct.toUpperCase()}
                              </span>
                              <p className="text-[#006e2f] text-sm">{lkpd.options.find(o=>o.id===lkpd.correct)?.text}</p>
                            </div>
                          </div>
                        )}

                        <div className="bg-[#c9e6ff]/20 border-l-4 border-[#006591] rounded-xl p-4">
                          <p className="text-xs font-[family-name:var(--font-mono)] text-[#006591] uppercase tracking-wider mb-1">Penjelasan Ilmiah</p>
                          <p className="text-[#3e4850] text-xs leading-relaxed">{lkpd.explanation}</p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <span className="material-symbols-outlined text-4xl text-[#bec8d2] block mb-2">lock</span>
                        <p className="text-[#6e7881] text-sm mb-3">Kerjakan {lkpd.tahap} terlebih dahulu untuk menjawab LKPD ini</p>
                        <Link href={`/journey/tahap-${lkpd.num === 1 ? 2 : lkpd.num === 2 ? 3 : 4}`}
                          className="inline-flex items-center gap-2 bg-[#006591] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#004c6e] transition-colors">
                          <span className="material-symbols-outlined text-base">play_arrow</span>
                          Ke {lkpd.tahap}
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary if all done */}
        {answeredCount === 4 && (
          <div className="bg-gradient-to-br from-[#006591] to-[#006e2f] rounded-2xl p-8 text-white text-center shadow-xl mb-6">
            <div className="text-3xl mb-3">🎓</div>
            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold mb-2">Semua LKPD Selesai!</h2>
            <p className="text-white/80 text-sm mb-5">Kamu telah menyelesaikan seluruh lembar kerja investigasi. Lanjutkan ke komitmen aksi nyata!</p>
            <Link href="/journey/tahap-6"
              className="inline-flex items-center gap-2 bg-white text-[#006591] font-bold px-6 py-3 rounded-xl hover:bg-[#f0f9ff] transition-all hover:scale-105 active:scale-95">
              <span className="material-symbols-outlined">eco</span>
              Buat Komitmen Aksi Nyata
            </Link>
          </div>
        )}

        {/* Start CTA if nothing done */}
        {answeredCount === 0 && (
          <div className="bg-white border border-[#bec8d2] rounded-2xl p-8 text-center shadow-sm">
            <div className="text-3xl mb-3">🚀</div>
            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-[#191c1e] mb-2">Mulai Perjalanan Investigasi</h2>
            <p className="text-[#3e4850] text-sm mb-5">Kerjakan setiap tahap perjalanan untuk mengisi LKPD ini secara otomatis.</p>
            <Link href="/journey/tahap-1"
              className="inline-flex items-center gap-2 bg-[#006591] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#004c6e] transition-all hover:scale-105 active:scale-95 shadow-md">
              <span className="material-symbols-outlined">play_arrow</span>
              Mulai dari Tahap 1
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
