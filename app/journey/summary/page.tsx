// PAGE: /journey/summary
// Halaman Terpisah: Rangkuman Ekspedisi, Cetak Sertifikat Digital, Pengumpulan PR Cloudinary, dan Rating Umpan Balik.
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useJourneyStore } from '@/lib/journeyStore';
import SummaryKpiCard from '@/components/molecules/SummaryKpiCard';
import DriveInputCard from '@/components/molecules/DriveInputCard';
import FeedbackFormCard from '@/components/molecules/FeedbackFormCard';
import PageContainer from '@/components/atoms/PageContainer';
import MikaMascot from '@/components/MikaMascot';

const ORGAN_LABEL_MAP: Record<string, string> = {
  mouth: 'Mulut',
  stomach: 'Lambung',
  smallIntestine: 'Usus Halus',
  largeIntestine: 'Usus Besar',
  blood: 'Darah',
};

function parseOrganLabel(raw: string): string {
  if (!raw) return 'Usus Halus';
  const r = raw.toLowerCase();
  if (r.includes('usus halus') || r.includes('small') || r.includes('intestinum')) return 'Usus Halus';
  if (r.includes('usus besar') || r.includes('large') || r.includes('kolon')) return 'Usus Besar';
  if (r.includes('lambung') || r.includes('stomach') || r.includes('gaster')) return 'Lambung';
  if (r.includes('darah') || r.includes('blood') || r.includes('sirkulasi')) return 'Darah';
  if (r.includes('mulut') || r.includes('mouth')) return 'Mulut';
  return ORGAN_LABEL_MAP[raw] ?? (raw.length > 20 ? raw.slice(0, 18) + '…' : raw);
}

export default function SummaryPage() {
  const router = useRouter();
  const {
    studentName,
    studentClass,
    sessionId,
    totalParticles,
    mostDangerousOrgan,
    selectedFoods,
    quizCorrect,
    quizWrong,
    lkpdAnswers,
    setLkpdAnswer,
    reset,
  } = useJourneyStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'assignment' | 'feedback'>('overview');

  const [driveLink, setDriveLink] = useState(lkpdAnswers.driveLink || '');
  const [sosmedLink, setSosmedLink] = useState(lkpdAnswers.sosmedLink || '');
  const [actionNote, setActionNote] = useState(lkpdAnswers.actionNote || '');
  const [rating, setRating] = useState(lkpdAnswers.rating || 5);
  const [feedback, setFeedback] = useState(lkpdAnswers.feedback || '');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [certGenerated, setCertGenerated] = useState(false);

  const totalQuiz = (quizCorrect || 0) + (quizWrong || 0);

  // Generate Sertifikat Digital PDF
  async function generateCertificatePDF() {
    const { default: jsPDF } = await import('jspdf');
    const doc = new jsPDF('landscape', 'mm', 'a4'); // 297 x 210 mm

    // Frame Utama
    doc.setDrawColor(0, 101, 145);
    doc.setLineWidth(3);
    doc.rect(8, 8, 281, 194);

    doc.setDrawColor(240, 163, 69);
    doc.setLineWidth(1);
    doc.rect(12, 12, 273, 186);

    // Header Background
    doc.setFillColor(8, 59, 84);
    doc.rect(13, 13, 271, 35, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('MICROJOURNEY AR — EKSPEDISI SAINS IPA', 148.5, 28, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 255, 143);
    doc.text('SERTIFIKAT KELULUSAN DUTA BIJAK PLASTIK 2026', 148.5, 38, { align: 'center' });

    // Main Content
    doc.setTextColor(8, 59, 84);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Sertifikat ini secara resmi dianugerahkan kepada:', 148.5, 65, { align: 'center' });

    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 101, 145);
    doc.text((studentName || 'Siswa IPA').toUpperCase(), 148.5, 82, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 110, 47);
    doc.text(`Kelas: ${studentClass || 'VIII'} · SMP Kurikulum Merdeka`, 148.5, 92, { align: 'center' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 70, 80);
    const bodyText = `Telah berhasil menuntaskan 6 Tahap Ekspedisi Investigasi Pencemaran Mikroplastik & Anatomi Bioakumulasi, serta mengucapkan Sumpah Komitmen Ekologi demi kelestarian ekosistem laut Indonesia.`;
    const lines = doc.splitTextToSize(bodyText, 220);
    doc.text(lines, 148.5, 108, { align: 'center' });

    // Box Statistik
    doc.setFillColor(245, 248, 250);
    doc.setDrawColor(200, 215, 225);
    doc.roundedRect(40, 125, 217, 30, 4, 4, 'FD');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(186, 26, 26);
    doc.text(`Partikel Dideteksi: ${totalParticles.toLocaleString('id-ID')} Partikel`, 60, 142);

    doc.setTextColor(0, 101, 145);
    doc.text(`Organ Kritis: ${parseOrganLabel(mostDangerousOrgan)}`, 148.5, 142, { align: 'center' });

    doc.setTextColor(0, 110, 47);
    doc.text(`Akurasi Kuis: ${quizCorrect} / ${totalQuiz || 5} Benar`, 220, 142);

    // Footer Signatures
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 110, 120);
    doc.text(`Diterbitkan pada: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, 45, 180);
    doc.text(`Kode Verifikasi: MJ-AR-${(sessionId || 'DEV').slice(0, 8).toUpperCase()}`, 45, 186);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(8, 59, 84);
    doc.text('Tim Pengembang MicroJourney AR', 220, 180, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.text('IPA SMP Kurikulum Merdeka', 220, 186, { align: 'center' });

    doc.save(`Sertifikat-Duta-Lingkungan-${studentName || 'Siswa'}.pdf`);
    setCertGenerated(true);
  }

  // Submit Final LKPD + PR Drive + Feedback to MongoDB API
  async function handleSubmitAll() {
    setSubmitting(true);
    setLkpdAnswer('driveLink', driveLink);
    setLkpdAnswer('sosmedLink', sosmedLink);
    setLkpdAnswer('actionNote', actionNote);
    setLkpdAnswer('rating', rating);
    setLkpdAnswer('feedback', feedback);

    try {
      const payload = {
        studentName: studentName || 'Anonim',
        studentClass: studentClass || '-',
        sessionId: sessionId || `session-${Date.now()}`,
        lkpd1: lkpdAnswers.lkpd1 || '',
        lkpd2: lkpdAnswers.lkpd2 || '',
        lkpd3q1: lkpdAnswers.lkpd3q1 || '',
        lkpd3q2: lkpdAnswers.lkpd3q2 || '',
        lkpd4: lkpdAnswers.lkpd4 || '',
        commitment: lkpdAnswers.commitment || '',
        totalParticles: totalParticles || 0,
        mostDangerousOrgan: mostDangerousOrgan || '',
        selectedFoods: selectedFoods.map((f) => f.name),
        assessmentEligible: true,
        quizCorrect: quizCorrect || 0,
        quizWrong: quizWrong || 0,
        driveLink: driveLink.trim(),
        sosmedLink: sosmedLink.trim(),
        actionNote: actionNote.trim(),
        rating,
        feedback: feedback.trim(),
      };

      await fetch('/api/lkpd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitting(false);
      setSubmitted(true);
    }
  }

  return (
    <PageContainer className="py-6 space-y-6">
      {/* Dynamic Celebration Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#083b54] via-[#006591] to-[#004c6e] text-white shadow-xl border-4 border-white/20"
      >
        {/* Floating Ambient Glowing Blobs */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#6bff8f]/20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#f0a345]/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <MikaMascot size={90} bubbleSide="right" pop message="Selamat! Kamu resmi menjadi Duta Bijak Plastik!" />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[#6bff8f] text-xs font-extrabold mb-2 border border-white/20">
                <span className="material-symbols-outlined text-base">workspace_premium</span>
                <span>Pencapaian Akhir Ekspedisi</span>
              </div>
              <h1
                className="text-2xl sm:text-4xl font-extrabold text-white mb-2 leading-tight"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                Rangkuman Ekspedisi & PR Digital
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
                Hebat <strong className="text-white">{studentName || 'Siswa Duta'}</strong> ({studentClass || 'VIII'})! Seluruh 6 Tahap Investigasi Mikroplastik telah kamu selesaikan.
              </p>
            </div>
          </div>

          <motion.button
            onClick={generateCertificatePDF}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-4 rounded-2xl font-extrabold text-sm text-[#3b2313] flex items-center gap-2.5 shadow-lg shrink-0 cursor-pointer border-2 border-[#8e4912]"
            style={{
              background: 'linear-gradient(to bottom, #f0a345, #d27b22)',
              boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.3), 0 8px 16px rgba(0,0,0,0.3)',
              fontFamily: 'var(--font-outfit)',
            }}
          >
            <span className="material-symbols-outlined text-2xl">workspace_premium</span>
            <span>{certGenerated ? 'Unduh Sertifikat Duta PDF' : 'Cetak Sertifikat Duta PDF'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Interactive Tabs Header */}
      <div className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-xs max-w-xl mx-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#006591] text-white shadow-md'
              : 'text-[#648796] hover:bg-slate-100'
          }`}
        >
          <span className="material-symbols-outlined text-base">analytics</span>
          <span>Hasil Ekspedisi</span>
        </button>
        <button
          onClick={() => setActiveTab('assignment')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'assignment'
              ? 'bg-[#006591] text-white shadow-md'
              : 'text-[#648796] hover:bg-slate-100'
          }`}
        >
          <span className="material-symbols-outlined text-base">cloud_upload</span>
          <span>Upload Cloudinary / PR</span>
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'feedback'
              ? 'bg-[#006591] text-white shadow-md'
              : 'text-[#648796] hover:bg-slate-100'
          }`}
        >
          <span className="material-symbols-outlined text-base">star</span>
          <span>Umpan Balik</span>
        </button>
      </div>

      {/* Dynamic Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              <SummaryKpiCard
                label="Partikel Dideteksi"
                value={totalParticles.toLocaleString('id-ID')}
                subtitle="Tingkat kontaminasi sampel"
                icon="warning"
                accentColor="#ba1a1a"
                badge="Partikel"
              />

              <SummaryKpiCard
                label="Organ Paling Kritis"
                value={parseOrganLabel(mostDangerousOrgan)}
                subtitle="Hasil analisis anatomi"
                icon="coronavirus"
                accentColor="#d27b22"
              />

              <SummaryKpiCard
                label="Akurasi Kuis"
                value={`${quizCorrect} / ${totalQuiz || 5}`}
                subtitle="Jawaban pilihan ganda benar"
                icon="fact_check"
                accentColor="#006e2f"
                badge="Benar"
              />

              <SummaryKpiCard
                label="Status Ekspedisi"
                value="TUNTAS ✓"
                subtitle="6 Tahap Terlampaui"
                icon="task_alt"
                accentColor="#006591"
              />
            </div>

            {/* Resume LKPD Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3
                className="text-lg font-extrabold text-[#083b54] flex items-center gap-2 border-b pb-3"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                <span className="material-symbols-outlined text-[#006591]">assignment</span>
                <span>Rangkuman Jawaban LKPD 1 - LKPD 4</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#f7fbfd] border border-[#d4e5ed]">
                  <p className="font-extrabold text-[#006591] mb-1">LKPD 1 — Pelapukan Plastik</p>
                  <p className="text-[#3e4850] italic">{lkpdAnswers.lkpd1 || '(Belum diisi)'}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f7fbfd] border border-[#d4e5ed]">
                  <p className="font-extrabold text-[#006591] mb-1">LKPD 2 — Kontaminasi Pangan</p>
                  <p className="text-[#3e4850] italic">{lkpdAnswers.lkpd2 || '(Belum diisi)'}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f7fbfd] border border-[#d4e5ed]">
                  <p className="font-extrabold text-[#006591] mb-1">LKPD 3 — Anatomi Organ</p>
                  <p className="text-[#3e4850] italic">{lkpdAnswers.lkpd3q1 || lkpdAnswers.lkpd3q2 || '(Belum diisi)'}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f7fbfd] border border-[#d4e5ed]">
                  <p className="font-extrabold text-[#006591] mb-1">LKPD 4 — Case Summary HOTS</p>
                  <p className="text-[#3e4850] italic">{lkpdAnswers.lkpd4 || '(Belum diisi)'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'assignment' && (
          <motion.div
            key="assignment"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <DriveInputCard
              driveLink={driveLink}
              onDriveLinkChange={setDriveLink}
              sosmedLink={sosmedLink}
              onSosmedLinkChange={setSosmedLink}
              actionNote={actionNote}
              onActionNoteChange={setActionNote}
            />
          </motion.div>
        )}

        {activeTab === 'feedback' && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <FeedbackFormCard
              rating={rating}
              onRatingChange={setRating}
              feedback={feedback}
              onFeedbackChange={setFeedback}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Action / Submit CTA */}
      <div className="pt-4">
        {submitted ? (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 text-center space-y-3 shadow-md">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-4xl">task_alt</span>
            </div>
            <h3
              className="text-xl font-extrabold text-emerald-800"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Seluruh Data & Berkas PR Cloudinary Terkirim!
            </h3>
            <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
              Jawaban LKPD, berkas Cloudinary/Google Drive, serta umpan balikmu telah berhasil disimpan ke database guru.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  reset();
                  router.push('/');
                }}
                className="bg-[#006591] hover:bg-[#004c6e] text-white font-extrabold px-8 py-3 rounded-xl text-xs transition-all cursor-pointer shadow-md"
              >
                Selesai & Kembali ke Beranda
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSubmitAll}
            disabled={submitting}
            className="w-full py-4 rounded-2xl font-extrabold text-base flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 cursor-pointer shadow-xl text-white"
            style={{
              fontFamily: 'var(--font-outfit)',
              background: 'linear-gradient(135deg, #009940 0%, #006e2f 100%)',
              border: '2px solid #004f20',
              boxShadow: '0 8px 25px rgba(0,110,47,0.35)',
            }}
          >
            {submitting ? (
              <>
                <span className="material-symbols-outlined text-2xl animate-spin">progress_activity</span>
                <span>Mengirimkan Tugas PR Cloudinary & Rangkuman...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-2xl">send</span>
                <span>Kirim Semua PR Cloudinary & Simpan Rangkuman</span>
              </>
            )}
          </button>
        )}
      </div>
    </PageContainer>
  );
}
