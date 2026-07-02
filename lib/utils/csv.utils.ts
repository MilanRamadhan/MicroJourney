// lib/utils/csv.utils.ts
// Utilitas untuk parsing CSV import siswa dan auto-generate kredensial.

export interface CsvStudentRow {
  name:      string;
  email:     string;
  password:  string;
  className: string;
  error?:    string;
}

export interface CsvRawRow {
  name:       string;
  className?: string;
}

// ── Credential generator ──────────────────────────────────────────────────────

/**
 * Ambil "slug" dari nama: kata terakhir yang bermakna, lowercase, hanya a-z.
 * Contoh: "Muhammad Syukri" → "syukri", "Budi" → "budi"
 */
function nameSlug(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  // Kata terakhir yang bukan gelar umum
  const ignored = new Set(['s.pd', 's.t', 's.si', 'dr', 'ir', 'm.pd', 'bin', 'binti']);
  const slug = [...words].reverse().find(w => !ignored.has(w.toLowerCase())) ?? words[0] ?? 'siswa';
  return slug.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Auto-generate password dari nama: slug + "123".
 * Contoh: "Muhammad Syukri" → "syukri123"
 */
export function generatePassword(name: string): string {
  return nameSlug(name) + '123';
}

/**
 * Auto-generate email dari nama: slug + nomor urut (jika duplicate) + "@mj.id".
 * Contoh: "Muhammad Syukri" → "syukri@mj.id"
 */
export function generateEmail(name: string, index: number, existingEmails: Set<string>): string {
  const base = nameSlug(name);
  let email  = `${base}@mj.id`;
  let n      = 1;
  while (existingEmails.has(email)) {
    email = `${base}${++n}@mj.id`;
  }
  existingEmails.add(email);
  return email;
}

// ── CSV Parser ────────────────────────────────────────────────────────────────

/**
 * Parse teks CSV yang hanya berisi kolom `nama` (dan opsional `kelas`).
 * className fallback ke parameter `defaultClass` jika kolom kelas tidak ada.
 */
export function parseCsvText(
  text: string,
  defaultClass: string,
): { rows: CsvStudentRow[]; headerError?: string } {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) {
    return { rows: [], headerError: 'File CSV kosong atau hanya berisi header.' };
  }

  const rawHeaders = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
  const namaIdx  = rawHeaders.indexOf('nama');
  const kelasIdx = rawHeaders.indexOf('kelas');

  if (namaIdx === -1) {
    return {
      rows: [],
      headerError: 'Kolom "nama" tidak ditemukan. Header minimal yang diperlukan: nama',
    };
  }

  const existingEmails = new Set<string>();
  const rows: CsvStudentRow[] = [];

  lines.slice(1).forEach((line, i) => {
    const cols      = line.split(',').map(c => c.trim().replace(/"/g, ''));
    const name      = cols[namaIdx] ?? '';
    const className = (kelasIdx !== -1 ? cols[kelasIdx] : '') || defaultClass;

    if (!name) return; // skip baris kosong

    let error: string | undefined;
    if (!className) error = `Baris ${i + 2}: Kelas belum diisi dan tidak ada default kelas.`;

    const email    = generateEmail(name, i, existingEmails);
    const password = generatePassword(name);

    rows.push({ name, email, password, className, error });
  });

  if (rows.length === 0) {
    return { rows: [], headerError: 'Tidak ada data siswa yang ditemukan di file.' };
  }

  return { rows };
}

// ── Template & Download ───────────────────────────────────────────────────────

/**
 * Buat konten CSV template minimal untuk guru.
 */
export function generateCsvTemplate(includeKelas = false): string {
  if (includeKelas) {
    return [
      'nama,kelas',
      'Muhammad Syukri,VIII-A',
      'Siti Aminah,VIII-A',
      'Budi Santoso,VIII-B',
    ].join('\n');
  }
  return [
    'nama',
    'Muhammad Syukri',
    'Siti Aminah',
    'Budi Santoso',
    'Ahmad Fauzi',
  ].join('\n');
}

/**
 * Trigger download file teks sebagai .csv
 */
export function downloadCsv(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Export daftar kredensial siswa ke CSV untuk dibagikan ke siswa.
 */
export function exportCredentialsCsv(rows: CsvStudentRow[]): string {
  const header = 'nama,kelas,email,password';
  const body   = rows.map(r => `${r.name},${r.className},${r.email},${r.password}`).join('\n');
  return `${header}\n${body}`;
}
