export interface Food {
  id: number;
  name: string;
  icon: string;
  particles: number;
  source: string;
  detail: string;
}

export const FOODS: Food[] = [
  {
    id: 1, name: 'Ikan goreng', icon: '🐟', particles: 2400,
    source: 'Bioakumulasi di laut',
    detail: 'Ikan menelan mikroplastik sepanjang hidupnya. Semakin besar ikan, semakin tinggi konsentrasinya.',
  },
  {
    id: 2, name: 'Air mineral kemasan', icon: '🧴', particles: 900,
    source: 'Pelepasan dari kemasan PET',
    detail: 'Botol PET melepas nanopartikel plastik ke dalam air, terutama saat terpapar panas.',
  },
  {
    id: 3, name: 'Mie instan', icon: '🍜', particles: 1200,
    source: 'Kemasan styrofoam/plastik',
    detail: 'Styrofoam menyerap senyawa berbahaya & melepas partikel saat terkena air panas.',
  },
  {
    id: 4, name: 'Garam dapur', icon: '🧂', particles: 1800,
    source: 'Sedimentasi laut',
    detail: 'Garam laut mengandung rata-rata 600 partikel mikroplastik per sendok teh.',
  },
  {
    id: 5, name: 'Cilok / bakso', icon: '🍡', particles: 600,
    source: 'Kemasan plastik & air proses',
    detail: 'Air yang digunakan dalam proses produksi dan penyajian mengandung kontaminasi mikroplastik.',
  },
  {
    id: 6, name: 'Es teh kemasan', icon: '🧋', particles: 750,
    source: 'Botol PET + tutup plastik',
    detail: 'Tutup plastik dan leher botol adalah titik pelepasan partikel utama saat dibuka.',
  },
  {
    id: 7, name: 'Kerupuk', icon: '🍟', particles: 300,
    source: 'Kemasan plastik',
    detail: 'Kemasan plastik tipis pada kerupuk melepas partikel micro saat bergesekan dengan produk.',
  },
  {
    id: 8, name: 'Udang / seafood', icon: '🦐', particles: 2100,
    source: 'Bioakumulasi tertinggi',
    detail: 'Udang dan kerang adalah filter feeder — mereka menyaring air laut beserta seluruh kontaminannya.',
  },
];
