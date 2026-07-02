/**
 * lib/api/mock.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Data mock untuk development lokal dan demo tanpa koneksi backend/MongoDB.
 *
 * PENTING: File ini hanya dipakai saat NEXT_PUBLIC_USE_MOCK !== 'false'.
 * Jangan hapus — berguna untuk demo ke dosen/juri tanpa internet.
 */

import type { LkpdSubmission, StudentProgress } from '@/lib/api/types';

// ── Mock LKPD Submissions ─────────────────────────────────────────────────────
// Simulasi data dari 8 siswa yang sudah submit E-LKPD.
export const MOCK_LKPD: LkpdSubmission[] = [
  {
    _id:                 'mock-001',
    createdAt:           new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    studentName:         'Andi Pratama',
    studentClass:        'VIII-A',
    sessionId:           'session-001',
    lkpd1:               'Plastik yang terpapar sinar UV dan ombak laut akan mengalami fragmentasi menjadi partikel mikro yang berbahaya bagi organisme laut.',
    lkpd2:               'a',
    lkpd3q1:             'Garam dapur mengandung mikroplastik karena diproduksi dari air laut yang telah terkontaminasi limbah plastik industri.',
    lkpd3q2:             'Saya akan mengurangi penggunaan plastik sekali pakai dan mendaur ulang sampah plastik di rumah.',
    lkpd4:               'Biomagnifikasi terjadi ketika konsentrasi polutan meningkat pada setiap tingkat rantai makanan, sehingga organisme puncak seperti manusia menerima dosis tertinggi.',
    commitment:          'Saya berkomitmen untuk membawa tumbler sendiri dan menghindari plastik sekali pakai demi menjaga laut Indonesia.',
    totalParticles:      14750,
    mostDangerousOrgan:  'smallIntestine',
    selectedFoods:       ['salt', 'seafood', 'water'],
    studentAccountEmail: 'andi@mj.id',
    assessmentEligible:  true,
  },
  {
    _id:                 'mock-002',
    createdAt:           new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    studentName:         'Siti Rahayu',
    studentClass:        'VIII-A',
    sessionId:           'session-002',
    lkpd1:               'Pelapukan terjadi akibat paparan UV matahari dan mekanik gelombang air. Botol PET terfragmentasi menjadi nanoplastik.',
    lkpd2:               'a',
    lkpd3q1:             'Kerang menyaring air laut tercemar sehingga mikroplastik terakumulasi dalam jaringan tubuhnya (bioakumulasi).',
    lkpd3q2:             'Memilih produk ramah lingkungan dan mendukung program bank sampah di sekolah.',
    lkpd4:               'Sistem pencernaan manusia belum mampu mengeliminasi partikel nano sehingga bisa menembus pembuluh darah dan merusak organ.',
    commitment:          'Saya berkomitmen menjadi duta lingkungan di sekolah dan mengajak teman-teman peduli sampah plastik.',
    totalParticles:      11200,
    mostDangerousOrgan:  'blood',
    selectedFoods:       ['seafood', 'water', 'instant_noodle'],
    studentAccountEmail: 'siti@mj.id',
    assessmentEligible:  true,
  },
  {
    _id:                 'mock-003',
    createdAt:           new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    studentName:         'Budi Santoso',
    studentClass:        'VIII-B',
    sessionId:           'session-003',
    lkpd1:               'Plastik terurai secara fisik bukan kimia, menghasilkan mikroplastik yang bertahan ribuan tahun di ekosistem.',
    lkpd2:               'b',
    lkpd3q1:             'Air minum kemasan mengandung partikel PET dari botol plastiknya sendiri yang larut akibat panas dan paparan UV.',
    lkpd3q2:             'Menggunakan botol minum stainless steel dan menolak penggunaan sedotan plastik.',
    lkpd4:               'Partikel nanoplastik dapat menembus barrier usus dan masuk ke aliran darah, berpotensi menyebabkan inflamasi kronis.',
    commitment:          'Saya berkomitmen untuk selalu memilah sampah dan tidak membuang sampah ke sungai atau laut.',
    totalParticles:      9800,
    mostDangerousOrgan:  'stomach',
    selectedFoods:       ['water', 'salt'],
    studentAccountEmail: 'budi@mj.id',
    assessmentEligible:  true,
  },
  {
    _id:                 'mock-004',
    createdAt:           new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    studentName:         'Dewi Lestari',
    studentClass:        'VIII-B',
    sessionId:           'session-004',
    lkpd1:               'Fragmentasi plastik terjadi secara bertahap dari makroplastik ke mesoplastik, lalu mikroplastik hingga nanoplastik.',
    lkpd2:               'a',
    lkpd3q1:             'Makanan pedas berkemasan plastik memiliki risiko lebih tinggi karena senyawa asam meningkatkan migrasi monomer plastik.',
    lkpd3q2:             'Mendukung regulasi pemerintah tentang pelarangan plastik sekali pakai.',
    lkpd4:               'Akumulasi jangka panjang mikroplastik di organ dapat mengganggu fungsi endokrin dan sistem imun tubuh manusia.',
    commitment:          'Saya berkomitmen menggunakan tas belanja kain dan mengurangi pembelian produk berkemasan plastik berlebihan.',
    totalParticles:      18340,
    mostDangerousOrgan:  'smallIntestine',
    selectedFoods:       ['salt', 'seafood', 'water', 'instant_noodle'],
    studentAccountEmail: 'dewi@mj.id',
    assessmentEligible:  true,
  },
];

// ── Mock Student Progress ─────────────────────────────────────────────────────
export const MOCK_PROGRESS: StudentProgress = {
  studentId:       'mock-student',
  completedStages: [1, 2],
  currentStage:    3,
  xp:              200,
  updatedAt:       new Date().toISOString(),
};
