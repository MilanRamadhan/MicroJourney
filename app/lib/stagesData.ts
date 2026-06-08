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
    title: 'Botol Plastik',
    subtitle: 'Asal Mula Masalah',
    icon: 'domain_disabled',
    description: 'Plastik terbuang ke lingkungan dan memulai perjalanan panjangnya.',
    xpReward: 200,
    quiz: {
      question: 'AI mendeteksi ini plastik PET. Berapa lama botol ini hancur di tanah?',
      options: [
        { text: '10 - 20 Tahun', isCorrect: false },
        { text: '450 Tahun', isCorrect: true },
        { text: 'Tidak akan hancur', isCorrect: false },
      ],
      explanation: 'Plastik PET membutuhkan sekitar 450 tahun untuk terurai di lingkungan alami karena struktur polimer yang sangat stabil.',
    },
    scientificFacts: [
      'Polietilena tereftalat (PET) adalah jenis plastik paling umum digunakan untuk botol minuman.',
      'Hanya 9% dari seluruh plastik yang pernah diproduksi telah didaur ulang.',
      'Setiap tahun, 8 juta ton plastik masuk ke lautan.',
    ],
    imageAlt: 'Botol plastik PET di lingkungan',
  },
  {
    id: 2,
    title: 'Pelapukan',
    subtitle: 'Hancur Oleh Matahari & Air',
    icon: 'wb_sunny',
    description: 'Sinar UV dan gelombang air memecah plastik menjadi partikel yang lebih kecil.',
    xpReward: 200,
    quiz: {
      question: 'Proses apa yang paling berperan dalam memecah plastik di lingkungan?',
      options: [
        { text: 'Fotodegradasi oleh sinar UV', isCorrect: true },
        { text: 'Dilarutkan oleh air hujan', isCorrect: false },
        { text: 'Dimakan oleh jamur', isCorrect: false },
      ],
      explanation: 'Fotodegradasi adalah proses utama di mana sinar UV dari matahari memecah rantai polimer plastik menjadi fragmen yang lebih kecil.',
    },
    scientificFacts: [
      'Fotodegradasi memecah plastik menjadi mikroplastik berukuran < 5 mm.',
      'Suhu tinggi mempercepat proses pelapukan plastik.',
      'Plastik di pantai lapuk 10x lebih cepat dari di lautan dalam.',
    ],
    imageAlt: 'Plastik yang lapuk terkena sinar matahari di pantai',
  },
  {
    id: 3,
    title: 'Masuk Samudra',
    subtitle: 'Terbawa ke Laut',
    icon: 'water_drop',
    description: 'Partikel mikroplastik kecil terbawa aliran sungai dan masuk ke samudra.',
    xpReward: 250,
    quiz: {
      question: 'Berapa persen sampah plastik di lautan berasal dari daratan?',
      options: [
        { text: '30%', isCorrect: false },
        { text: '80%', isCorrect: true },
        { text: '50%', isCorrect: false },
      ],
      explanation: '80% plastik di lautan berasal dari daratan, dibawa oleh sungai, angin, dan aktivitas manusia di pesisir.',
    },
    scientificFacts: [
      '80% sampah plastik laut berasal dari daratan melalui sungai.',
      'Terdapat 5 pusaran sampah plastik besar di samudra dunia.',
      'Mikroplastik telah ditemukan di lautan terdalam — Palung Mariana.',
    ],
    imageAlt: 'Mikroplastik mengapung di permukaan laut',
  },
  {
    id: 4,
    title: 'Masuk Rantai Makanan',
    subtitle: 'Tertelan Makhluk Laut',
    icon: 'set_meal',
    description: 'Hewan laut mengira partikel plastik adalah plankton dan menelannya.',
    xpReward: 300,
    quiz: {
      question: 'Mengapa ikan dan hewan laut sering memakan mikroplastik?',
      options: [
        { text: 'Karena plastik terasa manis bagi mereka', isCorrect: false },
        { text: 'Karena ukuran dan penampilannya mirip plankton', isCorrect: true },
        { text: 'Karena mereka tidak bisa melihat dengan baik', isCorrect: false },
      ],
      explanation: 'Mikroplastik berukuran serupa dengan zooplankton dan phytoplankton, sehingga hewan laut tidak bisa membedakannya secara visual.',
    },
    scientificFacts: [
      '700 spesies hewan laut telah terpengaruh oleh sampah plastik.',
      'Mikroplastik ditemukan di 90% burung laut yang diteliti.',
      'Ikan yang kita makan kemungkinan mengandung mikroplastik.',
    ],
    imageAlt: 'Ikan laut berenang di sekitar partikel mikroplastik',
  },
  {
    id: 5,
    title: 'Bioakumulasi',
    subtitle: 'Penumpukan Racun',
    icon: 'vital_signs',
    description: 'Konsentrasi mikroplastik dan racun meningkat di setiap tingkat rantai makanan.',
    xpReward: 300,
    quiz: {
      question: 'Apa yang dimaksud dengan biomagnifikasi dalam konteks mikroplastik?',
      options: [
        { text: 'Plastik yang membesar di dalam tubuh hewan', isCorrect: false },
        { text: 'Peningkatan konsentrasi racun di setiap tingkat rantai makanan', isCorrect: true },
        { text: 'Proses daur ulang alami plastik', isCorrect: false },
      ],
      explanation: 'Biomagnifikasi adalah peningkatan konsentrasi zat beracun (termasuk yang menempel pada mikroplastik) saat berpindah ke predator yang lebih tinggi dalam rantai makanan.',
    },
    scientificFacts: [
      'Konsentrasi racun bisa meningkat 10.000x dari plankton hingga predator puncak.',
      'Bahan kimia berbahaya seperti PCB dan DDT menempel pada permukaan mikroplastik.',
      'Hiu dan paus memiliki konsentrasi racun tertinggi akibat biomagnifikasi.',
    ],
    imageAlt: 'Visualisasi rantai makanan laut dengan bioakumulasi',
  },
  {
    id: 6,
    title: 'Dampak Manusia',
    subtitle: 'Kembali ke Meja Makan',
    icon: 'person_celebrate',
    description: 'Mikroplastik akhirnya kembali ke tubuh manusia melalui makanan yang kita konsumsi.',
    xpReward: 400,
    quiz: {
      question: 'Di mana saja mikroplastik telah ditemukan di dalam tubuh manusia?',
      options: [
        { text: 'Hanya di sistem pencernaan', isCorrect: false },
        { text: 'Di darah, paru-paru, dan plasenta', isCorrect: true },
        { text: 'Belum pernah ditemukan di tubuh manusia', isCorrect: false },
      ],
      explanation: 'Penelitian terbaru menemukan mikroplastik di darah, paru-paru, dan bahkan plasenta manusia, menunjukkan betapa luasnya penetrasi partikel ini ke tubuh kita.',
    },
    scientificFacts: [
      'Rata-rata manusia mengonsumsi 5 gram plastik per minggu — setara kartu kredit.',
      'Mikroplastik telah ditemukan di darah 77% orang yang diteliti.',
      'Paparan bahan kimia plastik dikaitkan dengan gangguan hormon dan kanker.',
    ],
    imageAlt: 'Visualisasi dampak mikroplastik pada tubuh manusia',
  },
];

export function getStageById(id: number): Stage | undefined {
  return stages.find(s => s.id === id);
}
