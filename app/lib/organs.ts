export interface Organ {
  id: string;
  name: string;
  healthPct: number;
  healthColor: string;
  impact: string;
  sciNote: string;
  particles: number;
  isKeyOrgan?: boolean;
}

export const ORGANS: Organ[] = [
  {
    id: 'mouth',
    name: 'Mulut & Kerongkongan',
    healthPct: 80,
    healthColor: '#22C55E',
    particles: 100,
    impact: 'Partikel mikroplastik masuk bersama makanan. Partikel terkecil (<1μm) dapat menembus lapisan mukosa mulut. Tidak ada enzim air liur yang mampu memecah rantai polimer plastik.',
    sciNote: 'Polimer plastik memiliki ikatan C-C sintetis yang sangat kuat. Enzim manusia hanya bisa memecah ikatan biologis seperti protein dan karbohidrat.',
  },
  {
    id: 'stomach',
    name: 'Lambung',
    healthPct: 55,
    healthColor: '#F59E0B',
    particles: 350,
    isKeyOrgan: true,
    impact: 'INI JAWABANNYA: Asam lambung (HCl, pH 1–2) GAGAL mendegradasi plastik — persis seperti yang kamu lihat di Gelas B tadi. Partikel plastik bertahan utuh. Gesekan partikel tajam dengan dinding lambung menyebabkan iritasi dan peradangan kronis.',
    sciNote: 'Cuka di eksperimen (pH ≈3) lebih lemah dari HCl lambung (pH 1–2), namun keduanya sama-sama tidak bisa memecah ikatan polimer sintetik plastik.',
  },
  {
    id: 'smallIntestine',
    name: 'Usus Halus',
    healthPct: 35,
    healthColor: '#EF4444',
    particles: 520,
    impact: 'ZONA KRITIS: Partikel <10μm dapat diserap melewati dinding usus dan masuk ke peredaran darah. Partikel yang menumpuk memblokir permukaan vili usus (tonjolan penyerap nutrisi), menghambat penyerapan sari makanan.',
    sciNote: 'Usus halus memiliki 70–80% sel imun tubuh. Gangguan di sini berdampak langsung pada daya tahan tubuh.',
  },
  {
    id: 'largeIntestine',
    name: 'Usus Besar',
    healthPct: 50,
    healthColor: '#F59E0B',
    particles: 280,
    impact: 'Sebagian besar mikroplastik yang tidak terserap terkumpul di sini. WHO (2023) menemukan rata-rata 10 partikel/gram feses manusia. Akumulasi memicu peradangan usus kronis.',
    sciNote: 'Penelitian Cornell University 2024: Indonesia #1 dunia konsumsi mikroplastik — 15 gram/bulan per kapita.',
  },
  {
    id: 'blood',
    name: 'Darah & Organ Lain',
    healthPct: 45,
    healthColor: '#EF4444',
    particles: 150,
    impact: 'Partikel yang berhasil diserap usus halus beredar ke seluruh tubuh melalui darah. Telah ditemukan di hati, ginjal, paru-paru, bahkan plasenta ibu hamil dan ASI.',
    sciNote: 'Akumulasi jangka panjang dan efek karsinogenik mikroplastik masih diteliti. Yang pasti: partikel ini seharusnya tidak ada di dalam tubuh.',
  },
];
