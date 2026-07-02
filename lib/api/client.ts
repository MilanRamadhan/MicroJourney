/**
 * lib/api/client.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralized API client untuk MicroJourney AR.
 *
 * ARSITEKTUR:
 *   - Semua panggilan API melewati file ini, bukan fetch() langsung di komponen.
 *   - Flag USE_MOCK mengontrol apakah pakai mock lokal atau real backend.
 *   - Saat backend siap, cukup set USE_MOCK=false (atau lewat env var).
 *
 * CARA PAKAI:
 *   import { api } from '@/lib/api/client';
 *   const data = await api.lkpd.getAll();
 *   await api.lkpd.submit(payload);
 */

import type { LkpdSubmitPayload, LkpdSubmission } from '@/lib/api/types';
import { MOCK_LKPD, MOCK_PROGRESS } from '@/lib/api/mock';

// ── Kontrol mock vs real ──────────────────────────────────────────────────────
// Set env var NEXT_PUBLIC_USE_MOCK=false saat backend siap
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

// ── Helper fetch ──────────────────────────────────────────────────────────────
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }
  return res.json() as T;
}

// ── Simulasi delay jaringan untuk mock ───────────────────────────────────────
function delay(ms = 300) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ═════════════════════════════════════════════════════════════════════════════
// API: LKPD (Lembar Kerja Peserta Didik)
// Endpoint nyata: POST /api/lkpd  |  GET /api/lkpd
// ═════════════════════════════════════════════════════════════════════════════
const lkpd = {
  /** Ambil semua submission LKPD (untuk dashboard guru) */
  getAll: async (): Promise<LkpdSubmission[]> => {
    if (USE_MOCK) {
      await delay();
      return MOCK_LKPD;
    }
    const res = await apiFetch<{ ok: boolean; data: LkpdSubmission[] }>('/api/lkpd');
    return res.data;
  },

  /** Submit hasil LKPD siswa (dipanggil saat siswa selesai tahap 6) */
  submit: async (payload: LkpdSubmitPayload): Promise<{ ok: boolean; id: string }> => {
    if (USE_MOCK) {
      await delay(500);
      console.info('[MOCK] lkpd.submit', payload);
      return { ok: true, id: `mock-${Date.now()}` };
    }
    return apiFetch('/api/lkpd', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

// ═════════════════════════════════════════════════════════════════════════════
// API: PROGRESS (Tahap yang sudah diselesaikan siswa)
// Endpoint nyata: GET /api/progress?studentId=X  |  POST /api/progress
// ═════════════════════════════════════════════════════════════════════════════
const progress = {
  /** Ambil progress siswa berdasarkan studentId */
  get: async (studentId: string): Promise<typeof MOCK_PROGRESS> => {
    if (USE_MOCK) {
      await delay();
      return { ...MOCK_PROGRESS, studentId };
    }
    return apiFetch(`/api/progress?studentId=${studentId}`);
  },

  /** Update progress setelah siswa menyelesaikan tahap */
  complete: async (studentId: string, completedStage: number, xpEarned = 100): Promise<void> => {
    if (USE_MOCK) {
      await delay(400);
      console.info(`[MOCK] progress.complete stage=${completedStage} xp=${xpEarned}`);
      return;
    }
    await apiFetch('/api/progress', {
      method: 'POST',
      body: JSON.stringify({ studentId, completedStage, xpEarned }),
    });
  },
};

// ═════════════════════════════════════════════════════════════════════════════
// API: USERS (Manajemen akun — sementara disimpan di Zustand/localStorage)
// TODO: Endpoint nyata belum dibuat. Perlu dibuat di backend:
//   POST /api/users/students  → daftarkan siswa
//   GET  /api/users/students  → ambil daftar siswa (per guru)
//   DELETE /api/users/:id     → hapus akun
// ═════════════════════════════════════════════════════════════════════════════
const users = {
  /** [TODO] Daftarkan satu siswa ke backend */
  registerStudent: async (_payload: {
    name: string; email: string; password: string;
    className: string; createdBy: string;
  }): Promise<{ ok: boolean; id: string }> => {
    if (USE_MOCK) {
      await delay(300);
      console.info('[MOCK] users.registerStudent', _payload);
      return { ok: true, id: `mock-student-${Date.now()}` };
    }
    // TODO: ganti dengan endpoint nyata
    throw new Error('Backend endpoint users belum tersedia.');
  },

  /** [TODO] Ambil daftar siswa milik guru tertentu */
  getStudentsByTeacher: async (_teacherEmail: string): Promise<unknown[]> => {
    if (USE_MOCK) {
      await delay();
      return [];
    }
    throw new Error('Backend endpoint users belum tersedia.');
  },
};

// ── Ekspor terpusat ───────────────────────────────────────────────────────────
export const api = { lkpd, progress, users };
