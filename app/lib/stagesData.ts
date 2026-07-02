export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface Stage {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  xpReward: number;
  pemantik: string;
  quiz: {
    question: string;
    options: QuizOption[];
    explanation: string;
  };
  scientificFacts: string[];
  imageAlt: string;
}

export const stages: Stage[] = [
  {
    id: 1,
    title: 'Scanner AR Plastik',
    subtitle: 'Stimulation',
    icon: 'qr_code_scanner',
    description: 'Pindai objek plastik di sekitarmu dengan kamera AR untuk memulai investigasi.',
    xpReward: 200,
    pemantik: 'Bagaimana mungkin benda padat sintetis ini menembus dan menetap di usus manusia?',
    quiz: {
      question: 'AI mendeteksi plastik PET. Berapa lama botol ini hancur di tanah?',
      options: [
        { text: '10 - 20 Tahun', isCorrect: false },
        { text: '450 Tahun', isCorrect: true },
        { text: 'Tidak akan hancur', isCorrect: false },
      ],
      explanation: 'Plastik PET membutuhkan sekitar 450 tahun untuk terurai di lingkungan alami karena struktur polimer yang sangat stabil.',
    },
    scientificFacts: [
      'Plastik adalah polimer sintetis berbasis karbon — rantai panjang monomer.',
      'Sistem tubuh dirancang untuk mencerna zat organik, bukan polimer sintetis.',
      'Botol plastik yang kita buang tidak pernah benar-benar hilang.'
    ],
    imageAlt: 'Mendeteksi botol plastik',
  },
  {
    id: 2,
    title: 'Simulasi Pelapukan',
    subtitle: 'Data Collection',
    icon: 'wb_sunny',
    description: 'Amati proses fotodegradasi dan abrasi mekanis yang mengubah botol menjadi mikroplastik.',
    xpReward: 200,
    pemantik: 'Bagaimana botol sebesar ini bisa menjadi partikel yang tak kasat mata?',
    quiz: {
      question: 'Proses apa yang memecah plastik menjadi mikroplastik di alam?',
      options: [
        { text: 'Fotodegradasi UV dan abrasi mekanis', isCorrect: true },
        { text: 'Dilarutkan oleh air laut murni', isCorrect: false },
        { text: 'Dicerna oleh bakteri pengurai', isCorrect: false },
      ],
      explanation: 'Fotodegradasi oleh sinar UV dan hantaman ombak memecah plastik besar menjadi serpihan berukuran < 5mm.',
    },
    scientificFacts: [
      'Radiasi UV matahari memutus ikatan rantai polimer plastik (C-C dan C-H).',
      'Gesekan dan hantaman ombak memecah plastik menjadi serpihan mikroskopis.',
      'Mikroplastik adalah partikel plastik yang berukuran kurang dari 5mm.'
    ],
    imageAlt: 'Simulasi pelapukan plastik',
  },
  {
    id: 3,
    title: 'Kontaminasi Pangan',
    subtitle: 'Data Collection',
    icon: 'set_meal',
    description: 'Lacak bagaimana partikel mikroplastik masuk ke rantai makanan laut dan sampai ke piring kita.',
    xpReward: 250,
    pemantik: 'Jika mikroplastik mengapung di lautan, bagaimana cara ia sampai ke makanan yang kita makan?',
    quiz: {
      question: 'Bagaimana mikroplastik bisa masuk ke makanan laut kita?',
      options: [
        { text: 'Ikan memakan plastik karena rasanya manis', isCorrect: false },
        { text: 'Hewan penyaring mengira mikroplastik sebagai plankton', isCorrect: true },
        { text: 'Plastik menyerap langsung ke kulit ikan', isCorrect: false },
      ],
      explanation: 'Hewan laut penyaring (seperti kerang) dan plankton memakan mikroplastik karena ukuran dan bentuknya yang mirip makanan asli mereka.',
    },
    scientificFacts: [
      'Mikroplastik terakumulasi dalam jaringan hewan laut (bioakumulasi).',
      'Semakin tinggi posisi di rantai makanan, konsentrasi mikroplastik semakin tinggi.',
      'Rata-rata manusia tanpa sadar menelan mikroplastik setiap minggunya.'
    ],
    imageAlt: 'Kontaminasi mikroplastik pada makanan',
  },
  {
    id: 4,
    title: 'Dampak Organ Pencernaan',
    subtitle: 'Data Processing',
    icon: 'pulmonology',
    description: 'Investigasi fisiologis pada lambung dan usus halus saat berhadapan dengan mikroplastik.',
    xpReward: 300,
    pemantik: 'Mengapa asam lambung kita yang sangat kuat gagal menghancurkan partikel mikroplastik?',
    quiz: {
      question: 'Mengapa asam lambung (HCl) gagal mendegradasi mikroplastik?',
      options: [
        { text: 'Karena lambung tidak cukup asam', isCorrect: false },
        { text: 'Ikatan rantai karbon polimer sintetik tahan terhadap asam lambung', isCorrect: true },
        { text: 'Karena mikroplastik bergerak terlalu cepat', isCorrect: false },
      ],
      explanation: 'Ikatan karbon pada polimer sintetis tidak bereaksi dengan enzim pencernaan atau asam lambung, sehingga plastik tidak dapat dicerna (indigestible).',
    },
    scientificFacts: [
      'Lambung gagal mendegradasi rantai karbon polimer sintetik.',
      'Partikel mikroplastik menutupi vili-vili usus secara mekanis.',
      'Tumpukan mikroplastik di usus halus menghalangi penyerapan nutrisi.'
    ],
    imageAlt: 'Investigasi organ pencernaan',
  },
  {
    id: 5,
    title: 'E-LKPD & Penyelidikan',
    subtitle: 'Verification',
    icon: 'assignment',
    description: 'Verifikasi hipotesis awalmu bahwa mikroplastik bersifat toksik dan indigestible.',
    xpReward: 300,
    pemantik: 'Dari seluruh bukti investigasi yang telah kita kumpulkan, kesimpulan apa yang bisa kita ambil?',
    quiz: {
      question: 'Sifat utama mikroplastik di dalam sistem pencernaan manusia adalah?',
      options: [
        { text: 'Mudah diserap sebagai energi', isCorrect: false },
        { text: 'Toksik dan indigestible (tidak dapat dicerna)', isCorrect: true },
        { text: 'Larut oleh air putih', isCorrect: false },
      ],
      explanation: 'Mikroplastik bersifat toksik karena membawa zat kimia berbahaya dan indigestible karena sistem tubuh kita tidak memiliki enzim untuk memecah polimer.',
    },
    scientificFacts: [
      'Data E-LKPD menunjukkan korelasi antara mikroplastik dan masalah pencernaan.',
      'Sistem biologi manusia tidak dirancang untuk menangani polimer.',
      'Hasil penyelidikan membuktikan hipotesis awal tentang bahaya mikroplastik.'
    ],
    imageAlt: 'Pengisian E-LKPD',
  },
  {
    id: 6,
    title: 'Komitmen & Aksi Nyata',
    subtitle: 'Generalization',
    icon: 'eco',
    description: 'Rumuskan aksi nyata untuk mengurangi penggunaan plastik dan peroleh rapor AR-mu.',
    xpReward: 400,
    pemantik: 'Setelah menyadari peran manusia sebagai pelaku dan korban, apa yang akan kamu lakukan sekarang?',
    quiz: {
      question: 'Aksi nyata apa yang paling efektif mengurangi sumber mikroplastik di sekolah?',
      options: [
        { text: 'Membakar sampah plastik di halaman', isCorrect: false },
        { text: 'Mengurangi plastik sekali pakai dan membawa tumbler', isCorrect: true },
        { text: 'Membuang plastik ke selokan', isCorrect: false },
      ],
      explanation: 'Mengurangi penggunaan plastik sekali pakai di hulu (seperti membawa tumbler) adalah cara paling efektif untuk mencegah terbentuknya mikroplastik baru.',
    },
    scientificFacts: [
      'Menolak penggunaan sedotan plastik membantu memutus rantai mikroplastik.',
      'Membawa botol minum sendiri mencegah ratusan botol masuk ke lingkungan.',
      'Setiap tindakan kecil memiliki dampak besar pada pengurangan mikroplastik.'
    ],
    imageAlt: 'Aksi nyata lingkungan',
  },
];

export function getStageById(id: number): Stage | undefined {
  return stages.find(s => s.id === id);
}
