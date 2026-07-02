/**
 * lib/api/types.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared TypeScript types untuk semua API request/response.
 * Digunakan oleh client.ts, mock.ts, dan komponen yang memanggil API.
 */

// ── LKPD ─────────────────────────────────────────────────────────────────────

/** Payload yang dikirim saat siswa submit E-LKPD (POST /api/lkpd) */
export interface LkpdSubmitPayload {
  studentName:         string;
  studentClass:        string;
  sessionId:           string;
  /** Jawaban LKPD 1: Pengamatan pelapukan plastik */
  lkpd1:               string;
  /** Jawaban LKPD 2: Biomagnifikasi (pilihan ganda) */
  lkpd2:               string;
  /** Jawaban LKPD 3 pertanyaan 1 */
  lkpd3q1:             string;
  /** Jawaban LKPD 3 pertanyaan 2 */
  lkpd3q2:             string;
  /** Jawaban LKPD 4: HOTS essay */
  lkpd4:               string;
  /** Teks sumpah komitmen tahap 6 */
  commitment:          string;
  /** Total partikel mikroplastik yang dikonsumsi (dari tahap 3) */
  totalParticles:      number;
  /** ID organ paling berbahaya yang dipilih (dari tahap 4) */
  mostDangerousOrgan:  string;
  /** Daftar ID makanan yang dipilih di tahap 3 */
  selectedFoods:       string[];
  /** Email akun siswa (untuk tracking per akun) */
  studentAccountEmail: string;
  /** Apakah siswa eligible untuk penilaian guru */
  assessmentEligible:  boolean;
}

/** Data submission LKPD yang dikembalikan dari GET /api/lkpd */
export interface LkpdSubmission extends LkpdSubmitPayload {
  _id:       string;
  createdAt: string;
}

// ── PROGRESS ──────────────────────────────────────────────────────────────────

/** Progress tahapan siswa (GET/POST /api/progress) */
export interface StudentProgress {
  studentId:       string;
  completedStages: number[];
  currentStage:    number;
  xp:              number;
  updatedAt?:      string;
}

// ── USER / AUTH ───────────────────────────────────────────────────────────────

/** Role yang tersedia dalam sistem */
export type UserRole = 'student' | 'teacher' | 'superadmin';

/** Akun pengguna (sementara disimpan di localStorage via Zustand) */
export interface AppUser {
  id:          string;
  name:        string;
  email:       string;
  password:    string;
  role:        UserRole;
  className?:  string;
  createdBy?:  string;
}

/** Payload mendaftarkan siswa baru */
export interface RegisterStudentPayload {
  name:      string;
  email:     string;
  password:  string;
  className: string;
  createdBy: string;
}
