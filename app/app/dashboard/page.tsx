'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppUser, useAuthStore } from '@/lib/authStore';

interface Submission {
  _id: string;
  createdAt: string;
  studentName: string;
  studentClass: string;
  totalParticles: number;
  mostDangerousOrgan: string;
  lkpd1: string;
  lkpd2: string;
  lkpd3q1: string;
  lkpd3q2: string;
  lkpd4: string;
  commitment: string;
  selectedFoods: string[];
}

export default function Dashboard() {
  const router = useRouter();
  const { currentUser, users, logout, registerStudent, deleteStudent } = useAuthStore();
  const [data, setData] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [filterClass, setFilterClass] = useState('');
  const [studentForm, setStudentForm] = useState({ name: '', email: '', password: '', className: '' });
  const [studentMessage, setStudentMessage] = useState('');

  useEffect(() => {
    fetch('/api/lkpd')
      .then(r => r.json())
      .then(d => { setData(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!currentUser) {
      router.replace('/login');
      return;
    }
    if (currentUser.role === 'student') router.replace('/');
  }, [currentUser, router]);

  if (!currentUser || currentUser.role === 'student') {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-[#006591] text-5xl animate-pulse">lock</span>
          <p className="text-[#3e4850] mt-3">Mengalihkan ke halaman login...</p>
        </div>
      </div>
    );
  }

  const adminUser = currentUser;
  const classes = [...new Set(data.map(d => d.studentClass))].sort();
  const filtered = filterClass ? data.filter(d => d.studentClass === filterClass) : data;
  const avgParticles = filtered.length ? Math.round(filtered.reduce((s, d) => s + d.totalParticles, 0) / filtered.length) : 0;
  const organCounts: Record<string, number> = {};
  filtered.forEach(d => {
    if (d.mostDangerousOrgan) organCounts[d.mostDangerousOrgan] = (organCounts[d.mostDangerousOrgan] || 0) + 1;
  });
  const topOrgan = Object.entries(organCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
  const registeredStudents = users.filter((user): user is AppUser => user.role === 'student');

  function refreshSubmissions() {
    setLoading(true);
    fetch('/api/lkpd')
      .then(r => r.json())
      .then(d => { setData(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }

  function handleRegisterStudent(e: React.FormEvent) {
    e.preventDefault();
    if (!studentForm.name.trim() || !studentForm.email.trim() || !studentForm.password || !studentForm.className.trim()) {
      setStudentMessage('Lengkapi nama, kelas, email, dan password siswa.');
      return;
    }
    const student = registerStudent({ ...studentForm, createdBy: adminUser.email });
    setStudentMessage(`Akun ${student.name} berhasil disimpan. Siswa bisa login memakai ${student.email}.`);
    setStudentForm({ name: '', email: '', password: '', className: '' });
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e]">
      {/* Header */}
      <header className="bg-white border-b border-[#bec8d2] px-6 py-4 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[#3e4850] hover:text-[#191c1e] transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div>
            <h1 className="font-[family-name:var(--font-outfit)] font-bold text-lg text-[#191c1e]">Dashboard Guru — MicroJourney AR</h1>
            <p className="text-[#3e4850] text-xs">{adminUser.name} · {adminUser.role === 'superadmin' ? 'Super Admin' : 'Guru'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refreshSubmissions} className="text-[#3e4850] hover:text-[#191c1e] flex items-center gap-1 text-sm transition-colors">
            <span className="material-symbols-outlined text-base">refresh</span> Refresh
          </button>
          <button onClick={() => { logout(); router.push('/'); }} className="text-[#3e4850] hover:text-[#191c1e] flex items-center gap-1 text-sm transition-colors">
            <span className="material-symbols-outlined text-base">logout</span> Keluar
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Siswa Submit', value: filtered.length, color: '#006591' },
            { label: 'Rata-rata Partikel', value: avgParticles.toLocaleString('id-ID'), color: '#ba1a1a' },
            { label: 'Organ Paling Dipilih', value: topOrgan, color: '#c39400', small: true },
            { label: 'Akun Siswa', value: registeredStudents.length, color: '#006e2f' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#bec8d2] rounded-2xl p-5 shadow-sm">
              <p className="text-[#6e7881] text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider mb-2">{s.label}</p>
              <p className={`font-[family-name:var(--font-mono)] font-bold ${s.small ? 'text-lg' : 'text-3xl'}`} style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6 mb-8">
          {/* Register student form */}
          <form onSubmit={handleRegisterStudent} className="bg-white border border-[#bec8d2] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#006e2f]">person_add</span>
              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-lg text-[#191c1e]">Daftarkan Siswa</h2>
            </div>
            <div className="space-y-3">
              <input value={studentForm.name} onChange={e => setStudentForm(s => ({ ...s, name: e.target.value }))}
                className="w-full bg-[#f7f9fb] border border-[#bec8d2] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#006591] focus:ring-1 focus:ring-[#006591] transition-colors text-[#191c1e]" placeholder="Nama siswa" />
              <input value={studentForm.className} onChange={e => setStudentForm(s => ({ ...s, className: e.target.value }))}
                className="w-full bg-[#f7f9fb] border border-[#bec8d2] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#006591] focus:ring-1 focus:ring-[#006591] transition-colors text-[#191c1e]" placeholder="Kelas, contoh: VIII-A" />
              <input value={studentForm.email} onChange={e => setStudentForm(s => ({ ...s, email: e.target.value }))} type="email"
                className="w-full bg-[#f7f9fb] border border-[#bec8d2] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#006591] focus:ring-1 focus:ring-[#006591] transition-colors text-[#191c1e]" placeholder="Email siswa" />
              <input value={studentForm.password} onChange={e => setStudentForm(s => ({ ...s, password: e.target.value }))} type="text"
                className="w-full bg-[#f7f9fb] border border-[#bec8d2] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#006591] focus:ring-1 focus:ring-[#006591] transition-colors text-[#191c1e]" placeholder="Password siswa" />
            </div>
            {studentMessage && <p className="text-[#3e4850] text-xs mt-3 bg-[#6bff8f]/20 border border-[#006e2f]/20 rounded-lg px-3 py-2">{studentMessage}</p>}
            <button type="submit" className="w-full mt-4 bg-[#006e2f] hover:bg-[#005321] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#006e2f]/20">
              Simpan Akun Siswa <span className="material-symbols-outlined text-base">save</span>
            </button>
          </form>

          {/* Students table */}
          <div className="bg-white border border-[#bec8d2] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-[#eceef0] flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-[#191c1e]">Akun Siswa Terdaftar</h2>
              <span className="text-[#6e7881] text-xs font-[family-name:var(--font-mono)]">{registeredStudents.length} akun</span>
            </div>
            {registeredStudents.length === 0 ? (
              <div className="p-6 text-[#6e7881] text-sm">Belum ada siswa terdaftar.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#eceef0] text-[#6e7881] text-xs font-[family-name:var(--font-mono)] uppercase bg-[#f7f9fb]">
                      <th className="text-left px-4 py-3">Nama</th>
                      <th className="text-left px-4 py-3">Kelas</th>
                      <th className="text-left px-4 py-3">Email</th>
                      <th className="text-left px-4 py-3">Password</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredStudents.map(student => (
                      <tr key={student.id} className="border-b border-[#f2f4f6] hover:bg-[#f7f9fb] transition-colors">
                        <td className="px-4 py-3 font-semibold text-[#191c1e]">{student.name}</td>
                        <td className="px-4 py-3 text-[#3e4850]">{student.className || '-'}</td>
                        <td className="px-4 py-3 text-[#006591]">{student.email}</td>
                        <td className="px-4 py-3 font-[family-name:var(--font-mono)] text-[#785a00]">{student.password}</td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => deleteStudent(student.id)} className="text-[#ba1a1a] hover:text-[#93000a] text-xs font-bold transition-colors">Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Super admin notice */}
        {adminUser.role === 'superadmin' && (
          <div className="bg-[#ffdf9a]/20 border border-[#c39400]/30 rounded-2xl p-5 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#785a00]">admin_panel_settings</span>
              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-[#191c1e]">Panel Super Admin</h2>
            </div>
            <p className="text-[#3e4850] text-sm">Super admin dapat melihat seluruh akun demo dan data kelas. Akun default: superadmin@gmail.com / superadmin.</p>
          </div>
        )}

        {/* Class filter */}
        <div className="flex items-center gap-3 mb-5 overflow-x-auto">
          <span className="text-[#3e4850] text-sm whitespace-nowrap">Filter kelas:</span>
          <button onClick={() => setFilterClass('')}
            className={`px-4 py-1.5 rounded-lg text-sm border-2 transition-colors ${!filterClass ? 'bg-[#006591] border-[#006591] text-white' : 'bg-white border-[#bec8d2] text-[#3e4850] hover:border-[#006591]'}`}>
            Semua
          </button>
          {classes.map(c => (
            <button key={c} onClick={() => setFilterClass(c)}
              className={`px-4 py-1.5 rounded-lg text-sm border-2 transition-colors whitespace-nowrap ${filterClass === c ? 'bg-[#006591] border-[#006591] text-white' : 'bg-white border-[#bec8d2] text-[#3e4850] hover:border-[#006591]'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Submissions table */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-grow bg-white border border-[#bec8d2] rounded-2xl overflow-hidden shadow-sm">
            {loading ? (
              <div className="flex items-center justify-center h-40 text-[#6e7881]">
                <span className="material-symbols-outlined animate-spin mr-2 text-[#006591]">progress_activity</span> Memuat data...
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-[#6e7881]">
                <span className="material-symbols-outlined text-5xl mb-2 text-[#bec8d2]">inbox</span>
                <p className="text-sm">Belum ada data penilaian dari siswa login.</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#eceef0] text-[#6e7881] text-xs font-[family-name:var(--font-mono)] uppercase bg-[#f7f9fb]">
                    <th className="text-left px-4 py-3">Nama</th>
                    <th className="text-left px-4 py-3">Kelas</th>
                    <th className="text-left px-4 py-3">Partikel</th>
                    <th className="text-left px-4 py-3">Waktu</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(row => (
                    <tr key={row._id}
                      className={`border-b border-[#f2f4f6] hover:bg-[#f7f9fb] cursor-pointer transition-colors ${selected?._id === row._id ? 'bg-[#f2f4f6]' : ''}`}
                      onClick={() => setSelected(row)}>
                      <td className="px-4 py-3 font-semibold text-[#191c1e]">{row.studentName}</td>
                      <td className="px-4 py-3 text-[#3e4850]">{row.studentClass}</td>
                      <td className="px-4 py-3 font-[family-name:var(--font-mono)] text-[#ba1a1a] font-bold">{row.totalParticles.toLocaleString('id-ID')}</td>
                      <td className="px-4 py-3 text-[#6e7881] text-xs">
                        {new Date(row.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-4 py-3 text-[#006591] text-xs font-semibold">Lihat →</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="lg:w-96 bg-white border border-[#bec8d2] rounded-2xl p-5 overflow-y-auto max-h-[600px] shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-[family-name:var(--font-outfit)] font-bold text-lg text-[#191c1e]">{selected.studentName}</h3>
                  <p className="text-[#3e4850] text-sm">{selected.studentClass}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-[#6e7881] hover:text-[#3e4850] transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex gap-3 mb-5">
                <div className="bg-[#f7f9fb] border border-[#bec8d2] rounded-xl p-3 flex-1 text-center">
                  <p className="font-[family-name:var(--font-mono)] text-xl font-bold text-[#ba1a1a]">{selected.totalParticles.toLocaleString('id-ID')}</p>
                  <p className="text-[#6e7881] text-xs">partikel</p>
                </div>
                <div className="bg-[#f7f9fb] border border-[#bec8d2] rounded-xl p-3 flex-1 text-center">
                  <p className="font-semibold text-sm text-[#785a00]">{selected.mostDangerousOrgan || '-'}</p>
                  <p className="text-[#6e7881] text-xs">organ kritis</p>
                </div>
              </div>

              {[
                { l: 'LKPD 1', t: selected.lkpd1 },
                { l: 'LKPD 2', t: selected.lkpd2 },
                { l: 'LKPD 3 Q1', t: selected.lkpd3q1 },
                { l: 'LKPD 3 Q2', t: selected.lkpd3q2 },
                { l: 'LKPD 4 (HOTS)', t: selected.lkpd4 },
                { l: 'Komitmen', t: selected.commitment },
              ].map(item => (
                <div key={item.l} className="mb-4">
                  <p className="text-xs font-[family-name:var(--font-mono)] text-[#006591] mb-1 font-semibold">{item.l}</p>
                  <p className="text-[#3e4850] text-sm bg-[#f7f9fb] border border-[#bec8d2] rounded-xl p-3 leading-relaxed">
                    {item.t || <span className="text-[#ba1a1a] italic">Belum diisi</span>}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
