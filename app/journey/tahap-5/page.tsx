'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { useJourneyStore } from '@/lib/journeyStore';

export default function Tahap5() {
  const router = useRouter();
  const { currentUser } = useAuthStore();
  const { completeStage, setLkpdAnswer, lkpdAnswers, studentName, studentClass, sessionId, totalParticles, selectedFoods, mostDangerousOrgan } = useJourneyStore();
  const [lkpd4, setLkpd4] = useState(lkpdAnswers.lkpd4);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const wordCount = lkpd4.trim().split(/\s+/).filter(Boolean).length;
  const isValid = wordCount >= 30;
  const isRegisteredStudent = currentUser?.role === 'student';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    if (!isRegisteredStudent) {
      setLkpdAnswer('lkpd4', lkpd4);
      completeStage(5);
      setSubmitted(true);
      return;
    }
    setSubmitting(true);
    setError('');
    setLkpdAnswer('lkpd4', lkpd4);

    try {
      await fetch('/api/lkpd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName, studentClass, sessionId,
          studentAccountEmail: currentUser.email,
          assessmentEligible: true,
          lkpd1: lkpdAnswers.lkpd1,
          lkpd2: lkpdAnswers.lkpd2,
          lkpd3q1: lkpdAnswers.lkpd3q1,
          lkpd3q2: lkpdAnswers.lkpd3q2,
          lkpd4,
          commitment: lkpdAnswers.commitment,
          totalParticles,
          mostDangerousOrgan,
          selectedFoods: selectedFoods.map(f => f.name),
        }),
      });
      setSubmitted(true);
      completeStage(5);
    } catch {
      setError('Gagal mengirim. Periksa koneksi internet.');
    } finally {
      setSubmitting(false);
    }
  }

  const PREV_LKPDS = [
    { label: 'LKPD 1', q: 'Proses pelapukan plastik menjadi mikroplastik', a: lkpdAnswers.lkpd1 },
    { label: 'LKPD 2', q: 'Jalur kontaminasi mikroplastik ke makanan', a: lkpdAnswers.lkpd2 },
    { label: 'LKPD 3 — Q1', q: 'Mengapa HCl gagal mencerna plastik?', a: lkpdAnswers.lkpd3q1 },
    { label: 'LKPD 3 — Q2', q: 'Organ paling berbahaya dan alasannya', a: lkpdAnswers.lkpd3q2 },
  ];

  return (
    <div className="min-h-[calc(100vh-88px)] bg-[#f7f9fb]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-white to-[#f2f4f6] border border-[#bec8d2] rounded-2xl p-6 mb-6 relative overflow-hidden shadow-sm">
          <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[200px] text-[#006591]">edit_document</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#f7f9fb] border border-[#bec8d2] px-3 py-1 rounded-full mb-3">
            <span className="text-[#6e7881] text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider">TAHAP 5 · VERIFICATION</span>
          </div>
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold mb-1 text-[#191c1e]">E-LKPD Lengkap</h2>
          <p className="text-[#3e4850] text-sm">Review seluruh jawabanmu dan kirim ke guru.</p>
          {!isRegisteredStudent && (
            <div className="mt-4 bg-[#ffdf9a]/30 border border-[#c39400]/30 rounded-xl p-4">
              <p className="text-[#785a00] text-sm font-bold">Mode tamu: belum masuk penilaian</p>
              <p className="text-[#3e4850] text-xs mt-1">
                Kamu tetap bisa menyelesaikan perjalanan. Jika ingin jawaban masuk dashboard guru, login dulu dengan akun siswa yang didaftarkan guru.
              </p>
              <Link href="/login" className="inline-flex items-center gap-1 text-[#006591] text-xs font-bold mt-3 hover:underline">
                Login siswa <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          )}
          {studentName && (
            <div className="mt-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006591] text-base">person</span>
              <span className="text-[#006591] font-semibold text-sm">{studentName} · {studentClass}</span>
            </div>
          )}
        </div>

        {/* Previous LKPD review */}
        <div className="bg-white border border-[#bec8d2] rounded-2xl p-6 mb-5 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-[#191c1e]">
            <span className="material-symbols-outlined text-[#006591]">history</span>
            Jawaban Sebelumnya
          </h3>
          <div className="space-y-4">
            {PREV_LKPDS.map(item => (
              <div key={item.label} className="border-l-2 border-[#bec8d2] pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-[family-name:var(--font-mono)] bg-[#f2f4f6] border border-[#bec8d2] px-2 py-0.5 rounded text-[#3e4850]">{item.label}</span>
                  <span className="text-[#6e7881] text-xs">{item.q}</span>
                </div>
                <p className="text-[#191c1e] text-sm">
                  {item.a || <span className="text-[#ba1a1a] italic">Belum diisi</span>}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* LKPD 4 — HOTS */}
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="bg-white border border-[#006591]/20 rounded-2xl p-6 mb-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#006591] text-white text-xs font-bold px-2 py-0.5 rounded font-[family-name:var(--font-mono)]">LKPD 4 · HOTS</span>
                <span className="text-xs text-[#3e4850]">Pertanyaan Sintesis</span>
              </div>
              <div className="bg-[#ffdf9a]/20 border-l-4 border-[#c39400] rounded-xl p-4 mb-4">
                <p className="text-[#191c1e] text-sm leading-relaxed italic">
                  &ldquo;Kamu adalah pelaku SEKALIGUS korban akhir dari pencemaran plastik ini. Jelaskan maksud pernyataan tersebut berdasarkan seluruh perjalanan yang sudah kamu ikuti!&rdquo;
                </p>
              </div>
              <textarea value={lkpd4} onChange={e => setLkpd4(e.target.value)}
                className="w-full bg-[#f7f9fb] border border-[#bec8d2] rounded-xl p-4 text-[#191c1e] placeholder-[#6e7881] text-sm resize-none h-40 focus:outline-none focus:border-[#006591] focus:ring-1 focus:ring-[#006591] transition-colors"
                placeholder="Manusia disebut pelaku karena secara sadar memproduksi dan membuang plastik ke lingkungan. Namun pada saat yang sama, melalui rantai makanan yang sudah tercemar..." />
              <div className="flex justify-between items-center mt-2">
                <p className={`text-xs font-[family-name:var(--font-mono)] ${isValid ? 'text-[#006e2f]' : 'text-[#6e7881]'}`}>
                  {wordCount} kata {!isValid && `(minimal 30 kata)`}
                </p>
                {isValid && <span className="text-[#006e2f] text-xs font-semibold">✓ Cukup</span>}
              </div>
            </div>

            {error && <p className="text-[#ba1a1a] text-sm mb-4">{error}</p>}

            <button type="submit" disabled={submitting || !isValid}
              className="w-full bg-[#006591] hover:bg-[#004c6e] text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#006591]/20">
              {submitting ? (
                <><span className="material-symbols-outlined animate-spin">progress_activity</span> Mengirim...</>
              ) : (
                <>{isRegisteredStudent ? 'Kirim ke Guru' : 'Simpan Mode Latihan'} <span className="material-symbols-outlined">send</span></>
              )}
            </button>
          </form>
        ) : (
          <div className="bg-white border border-[#006e2f]/20 rounded-2xl p-10 text-center shadow-sm">
            <span className="material-symbols-outlined text-[#006e2f] text-7xl mb-4 block">task_alt</span>
            <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-bold mb-2 text-[#191c1e]">{isRegisteredStudent ? 'Laporan Terkirim!' : 'Mode Latihan Tersimpan'}</h3>
            <p className="text-[#3e4850] text-sm mb-8 leading-relaxed">
              {isRegisteredStudent
                ? 'Seluruh jawaban LKPD-mu telah tersimpan di sistem guru. Lanjutkan ke komitmen ekologi.'
                : 'Jawabanmu tersimpan di perangkat ini saja dan tidak masuk penilaian guru. Lanjutkan ke komitmen ekologi.'}
            </p>
            <button onClick={() => router.push('/journey/tahap-6')}
              className="w-full bg-[#006e2f] hover:bg-[#005321] text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#006e2f]/20">
              Buat Komitmen Ekologi <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
