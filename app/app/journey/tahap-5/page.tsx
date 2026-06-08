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
    <div className="min-h-[calc(100vh-88px)] bg-[#060F1E]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#0D1F35] border border-[#1E3A5F] rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[200px]">edit_document</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#060F1E] border border-[#1E3A5F] px-3 py-1 rounded-full mb-3">
            <span className="text-[#94A3B8] text-xs font-[family-name:var(--font-mono)]">TAHAP 5 · VERIFICATION</span>
          </div>
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold mb-1">E-LKPD Lengkap</h2>
          <p className="text-[#94A3B8] text-sm">Review seluruh jawabanmu dan kirim ke guru.</p>
          {!isRegisteredStudent && (
            <div className="mt-4 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-4">
              <p className="text-[#F59E0B] text-sm font-bold">Mode tamu: belum masuk penilaian</p>
              <p className="text-[#94A3B8] text-xs mt-1">
                Kamu tetap bisa menyelesaikan perjalanan. Jika ingin jawaban masuk dashboard guru, login dulu dengan akun siswa yang didaftarkan guru.
              </p>
              <Link href="/login" className="inline-flex items-center gap-1 text-[#3B82F6] text-xs font-bold mt-3">
                Login siswa <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          )}
          {studentName && (
            <div className="mt-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3B82F6] text-base">person</span>
              <span className="text-[#3B82F6] font-semibold text-sm">{studentName} · {studentClass}</span>
            </div>
          )}
        </div>

        {/* Previous LKPD review */}
        <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-6 mb-5">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3B82F6]">history</span>
            Jawaban Sebelumnya
          </h3>
          <div className="space-y-4">
            {PREV_LKPDS.map(item => (
              <div key={item.label} className="border-l-2 border-[#1E3A5F] pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-[family-name:var(--font-mono)] bg-[#060F1E] border border-[#1E3A5F] px-2 py-0.5 rounded text-[#94A3B8]">{item.label}</span>
                  <span className="text-[#4A6080] text-xs">{item.q}</span>
                </div>
                <p className="text-[#F1F5F9] text-sm">
                  {item.a || <span className="text-[#EF4444] italic">Belum diisi</span>}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* LKPD 4 — HOTS */}
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="bg-[#0A1628] border border-[#3B82F6]/30 rounded-2xl p-6 mb-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#3B82F6] text-white text-xs font-bold px-2 py-0.5 rounded font-[family-name:var(--font-mono)]">LKPD 4 · HOTS</span>
                <span className="text-xs text-[#94A3B8]">Pertanyaan Sintesis</span>
              </div>
              <div className="bg-[#060F1E] border-l-4 border-[#F59E0B] rounded-xl p-4 mb-4">
                <p className="text-[#F1F5F9] text-sm leading-relaxed italic">
                  &ldquo;Kamu adalah pelaku SEKALIGUS korban akhir dari pencemaran plastik ini. Jelaskan maksud pernyataan tersebut berdasarkan seluruh perjalanan yang sudah kamu ikuti!&rdquo;
                </p>
              </div>
              <textarea value={lkpd4} onChange={e => setLkpd4(e.target.value)}
                className="w-full bg-[#060F1E] border border-[#1E3A5F] rounded-xl p-4 text-[#F1F5F9] placeholder-[#4A6080] text-sm resize-none h-40 focus:outline-none focus:border-[#3B82F6] transition-colors"
                placeholder="Manusia disebut pelaku karena secara sadar memproduksi dan membuang plastik ke lingkungan. Namun pada saat yang sama, melalui rantai makanan yang sudah tercemar..." />
              <div className="flex justify-between items-center mt-2">
                <p className={`text-xs font-[family-name:var(--font-mono)] ${isValid ? 'text-[#22C55E]' : 'text-[#4A6080]'}`}>
                  {wordCount} kata {!isValid && `(minimal 30 kata)`}
                </p>
                {isValid && <span className="text-[#22C55E] text-xs">✓ Cukup</span>}
              </div>
            </div>

            {error && <p className="text-[#EF4444] text-sm mb-4">{error}</p>}

            <button type="submit" disabled={submitting || !isValid}
              className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
              {submitting ? (
                <><span className="material-symbols-outlined animate-spin">progress_activity</span> Mengirim...</>
              ) : (
                <>{isRegisteredStudent ? 'Kirim ke Guru' : 'Simpan Mode Latihan'} <span className="material-symbols-outlined">send</span></>
              )}
            </button>
          </form>
        ) : (
          <div className="bg-[#0A1628] border border-[#22C55E]/30 rounded-2xl p-10 text-center">
            <span className="material-symbols-outlined text-[#22C55E] text-7xl mb-4 block">task_alt</span>
            <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-bold mb-2">{isRegisteredStudent ? 'Laporan Terkirim!' : 'Mode Latihan Tersimpan'}</h3>
            <p className="text-[#94A3B8] text-sm mb-8">
              {isRegisteredStudent
                ? 'Seluruh jawaban LKPD-mu telah tersimpan di sistem guru. Lanjutkan ke komitmen ekologi.'
                : 'Jawabanmu tersimpan di perangkat ini saja dan tidak masuk penilaian guru. Lanjutkan ke komitmen ekologi.'}
            </p>
            <button onClick={() => router.push('/journey/tahap-6')}
              className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-black font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2">
              Buat Komitmen Ekologi <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
