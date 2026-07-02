// template.tsx di-remount setiap kali pindah halaman → animasi fade halus
// otomatis berjalan tiap navigasi (Beranda → Peta, dst). Opacity-only agar
// navbar `fixed` tidak terpengaruh containing-block dari transform.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
