'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useJourneyStore } from '@/lib/journeyStore';

const QUICK_PLEDGES = [
  'Bawa tumbler sendiri ke sekolah setiap hari',
  'Tolak kantong plastik di kantin sekolah',
  'Ingatkan teman untuk kurangi plastik sekali pakai',
  'Tidak beli minuman kemasan plastik selama seminggu',
];

export default function Tahap6() {
  const router = useRouter();
  const { completeStage, setLkpdAnswer, lkpdAnswers, studentName, studentClass } = useJourneyStore();
  const [commitment, setCommitment] = useState(lkpdAnswers.commitment);
  const [selectedPledges, setSelectedPledges] = useState<Set<string>>(new Set());
  const [pdfDone, setPdfDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const drawing = useRef(false);
  const [hasSig, setHasSig] = useState(false);
  const isReady = commitment.trim().length > 10 && hasSig;

  function togglePledge(p: string) {
    const s = new Set(selectedPledges);
    if (s.has(p)) { s.delete(p); setCommitment(prev => prev.replace('\n' + p, '').replace(p, '')); }
    else { s.add(p); setCommitment(prev => prev ? prev + '\n' + p : p); }
    setSelectedPledges(s);
  }

  function getPos(e: React.MouseEvent | React.TouchEvent, cv: HTMLCanvasElement) {
    const r = cv.getBoundingClientRect();
    if ('touches' in e) return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault(); drawing.current = true; lastPos.current = getPos(e, canvasRef.current!);
  }
  function draw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    if (!drawing.current || !canvasRef.current || !lastPos.current) return;
    const ctx = canvasRef.current.getContext('2d')!;
    const pos = getPos(e, canvasRef.current);
    ctx.beginPath(); ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y); ctx.strokeStyle = '#3B82F6'; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.stroke();
    lastPos.current = pos; setHasSig(true);
  }
  function stopDraw() { drawing.current = false; lastPos.current = null; }
  function clearSig() {
    const cv = canvasRef.current!; const ctx = cv.getContext('2d')!;
    ctx.clearRect(0, 0, cv.width, cv.height); setHasSig(false);
  }

  async function generatePDF() {
    setLkpdAnswer('commitment', commitment);
    completeStage(6);

    const { default: jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    // Header block
    doc.setFillColor(6, 15, 30);
    doc.rect(0, 0, 210, 42, 'F');
    doc.setTextColor(241, 245, 249);
    doc.setFontSize(22); doc.setFont('helvetica', 'bold');
    doc.text('MICROJOURNEY AR', 15, 18);
    doc.setFontSize(10); doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text('Rapor Jurnal Investigasi Mikroplastik — IPA Kelas VIII / Kurikulum Merdeka', 15, 28);
    doc.text(`Nama: ${studentName || '-'}    Kelas: ${studentClass || '-'}    Tanggal: ${new Date().toLocaleDateString('id-ID', { day:'numeric',month:'long',year:'numeric' })}`, 15, 36);

    doc.setTextColor(0, 0, 0);

    // Summary stats
    const { totalParticles, selectedFoods, mostDangerousOrgan, lkpdAnswers: answers } = useJourneyStore.getState();
    let y = 52;
    doc.setFontSize(13); doc.setFont('helvetica', 'bold');
    doc.setTextColor(239, 68, 68);
    doc.text('HASIL EKSPLORASI', 15, y); y += 8;
    doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(0);
    doc.text(`Total mikroplastik tertelan hari ini: ${totalParticles.toLocaleString('id-ID')} partikel`, 15, y); y += 6;
    doc.text(`Organ paling terdampak (menurut siswa): ${mostDangerousOrgan || 'Usus Halus'}`, 15, y); y += 6;
    doc.text(`Makanan yang dianalisis: ${selectedFoods.map(f=>f.name).join(', ') || '-'}`, 15, y); y += 12;

    const sections = [
      { label: 'LKPD 1 — Proses Pelapukan Plastik', text: answers.lkpd1 },
      { label: 'LKPD 2 — Kontaminasi Pangan', text: answers.lkpd2 },
      { label: 'LKPD 3 Q1 — Mengapa HCl Gagal Mencerna Plastik', text: answers.lkpd3q1 },
      { label: 'LKPD 3 Q2 — Organ Paling Berbahaya', text: answers.lkpd3q2 },
      { label: 'LKPD 4 — Sintesis (HOTS)', text: answers.lkpd4 },
    ];

    sections.forEach(s => {
      if (y > 255) { doc.addPage(); y = 20; }
      doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(59, 130, 246);
      doc.text(s.label, 15, y); y += 6;
      doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(0);
      const lines = doc.splitTextToSize(s.text || '(tidak diisi)', 180);
      doc.text(lines, 15, y); y += lines.length * 5 + 6;
    });

    // Commitment
    if (y > 240) { doc.addPage(); y = 20; }
    doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(34, 197, 94);
    doc.text('KOMITMEN EKOLOGI', 15, y); y += 7;
    doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(0);
    const clines = doc.splitTextToSize(commitment || '-', 180);
    doc.text(clines, 15, y); y += clines.length * 5 + 8;

    // Signature
    if (canvasRef.current && hasSig) {
      doc.text('Tanda Tangan Digital:', 15, y); y += 5;
      doc.addImage(canvasRef.current.toDataURL('image/png'), 'PNG', 15, y, 70, 25); y += 30;
    }

    doc.setFontSize(8); doc.setTextColor(148, 163, 184);
    doc.text('MicroJourney AR · LIDM 2026 · Kurikulum Merdeka Fase D', 15, 290);

    doc.save(`rapor-microjourney-${studentName || 'siswa'}.pdf`);
    setPdfDone(true);
  }

  return (
    <div className="min-h-[calc(100vh-88px)] bg-[#060F1E] flex flex-col">
      <div className="max-w-2xl mx-auto px-4 py-8 w-full">
        {/* Conclusion */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-5 floating">🌱</div>
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-bold mb-5">Generalisasi & Refleksi</h2>
          <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-6 max-w-lg mx-auto">
            <p className="text-[#94A3B8] leading-relaxed italic text-base">
              &ldquo;Manusia adalah pelaku utama pencemaran sekaligus korban akhir dari kecerobohannya sendiri. Setiap keputusan kecil — menolak sedotan plastik, membawa tas belanja — adalah tindakan konkret yang bermakna.&rdquo;
            </p>
            <p className="text-[#4A6080] text-xs mt-3">— Kesimpulan Kurikulum, Modul Ajar IPA Kelas VIII</p>
          </div>
        </div>

        {/* Eco-pledge */}
        <div className="bg-[#0A1628] border border-[#22C55E]/20 rounded-2xl p-6 mb-6">
          <h3 className="font-[family-name:var(--font-outfit)] font-bold text-lg mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#22C55E]">park</span>
            Eco-Pledge — Komitmen Nyata
          </h3>

          {/* Quick toggles */}
          <p className="text-[#94A3B8] text-sm mb-3">Pilih komitmen cepat atau tulis sendiri:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {QUICK_PLEDGES.map(p => (
              <button key={p} onClick={() => togglePledge(p)}
                className={`text-left text-sm px-4 py-3 rounded-xl border transition-all ${
                  selectedPledges.has(p)
                    ? 'bg-[#22C55E]/10 border-[#22C55E]/50 text-[#22C55E]'
                    : 'bg-[#060F1E] border-[#1E3A5F] text-[#94A3B8] hover:border-[#22C55E]/30'
                }`}>
                {selectedPledges.has(p) ? '✓ ' : '□ '}{p}
              </button>
            ))}
          </div>

          <textarea value={commitment} onChange={e => setCommitment(e.target.value)}
            className="w-full bg-[#060F1E] border border-[#1E3A5F] rounded-xl p-4 text-[#F1F5F9] placeholder-[#4A6080] text-sm resize-none h-24 focus:outline-none focus:border-[#22C55E] transition-colors"
            placeholder="Tulis komitmenmu sendiri di sini, atau edit pilihan di atas..." />
        </div>

        {/* Signature */}
        <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-6 mb-6">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3B82F6]">draw</span>
            Tanda Tangan Digital
          </h3>
          <p className="text-[#94A3B8] text-sm mb-3">Tandatangani komitmenmu:</p>
          <div className="bg-white rounded-xl overflow-hidden border border-[#1E3A5F]">
            <canvas ref={canvasRef} width={500} height={110} className="w-full touch-none cursor-crosshair block"
              onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
              onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw} />
          </div>
          {hasSig && (
            <button onClick={clearSig} className="text-[#4A6080] text-xs mt-2 underline">Hapus dan ulangi</button>
          )}
          {!hasSig && <p className="text-[#4A6080] text-xs mt-2 font-[family-name:var(--font-mono)]">Tanda tangani di area putih di atas</p>}
        </div>

        {/* Generate PDF */}
        <button onClick={generatePDF} disabled={!isReady}
          className="w-full bg-gradient-to-r from-[#22C55E] to-[#3B82F6] text-white font-bold py-5 rounded-xl text-xl transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed mb-4">
          <span className="material-symbols-outlined">picture_as_pdf</span>
          {pdfDone ? 'Unduh Lagi' : 'Selesaikan & Unduh Rapor PDF'}
        </button>

        {!isReady && (
          <p className="text-center text-[#4A6080] text-xs mb-4 font-[family-name:var(--font-mono)]">
            {!commitment.trim() ? '← Isi komitmenmu dahulu' : '← Tanda tangan diperlukan'}
          </p>
        )}

        {pdfDone && (
          <div className="text-center">
            <div className="bg-[#0A1628] border border-[#22C55E]/30 rounded-xl p-5 mb-4">
              <span className="material-symbols-outlined text-[#22C55E] text-4xl block mb-2">check_circle</span>
              <p className="text-[#22C55E] font-bold">Rapor PDF berhasil diunduh!</p>
              <p className="text-[#94A3B8] text-sm mt-1">Serahkan file kepada gurumu sebagai bukti selesainya perjalanan.</p>
            </div>
            <button onClick={() => router.push('/')} className="text-[#4A6080] text-sm underline">
              Kembali ke Beranda
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
