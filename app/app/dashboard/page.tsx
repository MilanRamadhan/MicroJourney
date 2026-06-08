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
      <div className="min-h-screen bg-[#060F1E] text-[#F1F5F9] flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-[#3B82F6] text-5xl animate-pulse">lock</span>
          <p className="text-[#94A3B8] mt-3">Mengalihkan ke halaman login...</p>
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
    const student = registerStudent({
      ...studentForm,
      createdBy: adminUser.email,
    });
    setStudentMessage(`Akun ${student.name} berhasil disimpan. Siswa bisa login memakai ${student.email}.`);
    setStudentForm({ name: '', email: '', password: '', className: '' });
  }

  return (
    <div className="min-h-screen bg-[#060F1E] text-[#F1F5F9]">
      <header className="bg-[#0A1628] border-b border-[#1E3A5F] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div>
            <h1 className="font-[family-name:var(--font-outfit)] font-bold text-lg">Dashboard Guru - MicroJourney AR</h1>
            <p className="text-[#94A3B8] text-xs">{adminUser.name} · {adminUser.role === 'superadmin' ? 'Super Admin' : 'Guru'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refreshSubmissions} className="text-[#94A3B8] hover:text-[#F1F5F9] flex items-center gap-1 text-sm">
            <span className="material-symbols-outlined text-base">refresh</span> Refresh
          </button>
          <button onClick={() => { logout(); router.push('/'); }} className="text-[#94A3B8] hover:text-[#F1F5F9] flex items-center gap-1 text-sm">
            <span className="material-symbols-outlined text-base">logout</span> Keluar
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Siswa Submit', value: filtered.length, color: '#3B82F6' },
            { label: 'Rata-rata Partikel', value: avgParticles.toLocaleString('id-ID'), color: '#EF4444' },
            { label: 'Organ Paling Dipilih', value: topOrgan, color: '#F59E0B', small: true },
            { label: 'Akun Siswa', value: registeredStudents.length, color: '#22C55E' },
          ].map(s => (
            <div key={s.label} className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-5">
              <p className="text-[#94A3B8] text-xs font-[family-name:var(--font-mono)] uppercase mb-2">{s.label}</p>
              <p className={`font-[family-name:var(--font-mono)] font-bold ${s.small ? 'text-lg' : 'text-3xl'}`} style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6 mb-8">
          <form onSubmit={handleRegisterStudent} className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#22C55E]">person_add</span>
              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-lg">Daftarkan Siswa</h2>
            </div>
            <div className="space-y-3">
              <input value={studentForm.name} onChange={e => setStudentForm(s => ({ ...s, name: e.target.value }))}
                className="w-full bg-[#060F1E] border border-[#1E3A5F] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3B82F6]" placeholder="Nama siswa" />
              <input value={studentForm.className} onChange={e => setStudentForm(s => ({ ...s, className: e.target.value }))}
                className="w-full bg-[#060F1E] border border-[#1E3A5F] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3B82F6]" placeholder="Kelas, contoh: VIII-A" />
              <input value={studentForm.email} onChange={e => setStudentForm(s => ({ ...s, email: e.target.value }))} type="email"
                className="w-full bg-[#060F1E] border border-[#1E3A5F] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3B82F6]" placeholder="Email siswa" />
              <input value={studentForm.password} onChange={e => setStudentForm(s => ({ ...s, password: e.target.value }))} type="text"
                className="w-full bg-[#060F1E] border border-[#1E3A5F] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3B82F6]" placeholder="Password siswa" />
            </div>
            {studentMessage && <p className="text-[#94A3B8] text-xs mt-3">{studentMessage}</p>}
            <button type="submit" className="w-full mt-4 bg-[#22C55E] hover:bg-[#16A34A] text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2">
              Simpan Akun Siswa <span className="material-symbols-outlined text-base">save</span>
            </button>
          </form>

          <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#1E3A5F] flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-outfit)] font-bold">Akun Siswa Terdaftar</h2>
              <span className="text-[#94A3B8] text-xs font-[family-name:var(--font-mono)]">{registeredStudents.length} akun</span>
            </div>
            {registeredStudents.length === 0 ? (
              <div className="p-6 text-[#4A6080] text-sm">Belum ada siswa terdaftar.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1E3A5F] text-[#4A6080] text-xs font-[family-name:var(--font-mono)] uppercase">
                      <th className="text-left px-4 py-3">Nama</th>
                      <th className="text-left px-4 py-3">Kelas</th>
                      <th className="text-left px-4 py-3">Email</th>
                      <th className="text-left px-4 py-3">Password</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredStudents.map(student => (
                      <tr key={student.id} className="border-b border-[#122540]">
                        <td className="px-4 py-3 font-semibold">{student.name}</td>
                        <td className="px-4 py-3 text-[#94A3B8]">{student.className || '-'}</td>
                        <td className="px-4 py-3 text-[#3B82F6]">{student.email}</td>
                        <td className="px-4 py-3 font-[family-name:var(--font-mono)] text-[#F59E0B]">{student.password}</td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => deleteStudent(student.id)} className="text-[#EF4444] hover:text-red-300 text-xs font-bold">Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {adminUser.role === 'superadmin' && (
          <div className="bg-[#0A1628] border border-[#F59E0B]/40 rounded-2xl p-5 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#F59E0B]">admin_panel_settings</span>
              <h2 className="font-[family-name:var(--font-outfit)] font-bold">Panel Super Admin</h2>
            </div>
            <p className="text-[#94A3B8] text-sm">Super admin dapat melihat seluruh akun demo dan data kelas. Akun default: superadmin@gmail.com / superadmin.</p>
          </div>
        )}

        <div className="flex items-center gap-3 mb-5 overflow-x-auto">
          <span className="text-[#94A3B8] text-sm whitespace-nowrap">Filter kelas:</span>
          <button onClick={() => setFilterClass('')}
            className={`px-4 py-1.5 rounded-lg text-sm border transition-colors ${!filterClass ? 'bg-[#3B82F6] border-[#3B82F6] text-white' : 'bg-[#0A1628] border-[#1E3A5F] text-[#94A3B8]'}`}>
            Semua
          </button>
          {classes.map(c => (
            <button key={c} onClick={() => setFilterClass(c)}
              className={`px-4 py-1.5 rounded-lg text-sm border transition-colors whitespace-nowrap ${filterClass === c ? 'bg-[#3B82F6] border-[#3B82F6] text-white' : 'bg-[#0A1628] border-[#1E3A5F] text-[#94A3B8]'}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-grow bg-[#0A1628] border border-[#1E3A5F] rounded-2xl overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-40 text-[#4A6080]">
                <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span> Memuat data...
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-[#4A6080]">
                <span className="material-symbols-outlined text-5xl mb-2">inbox</span>
                <p className="text-sm">Belum ada data penilaian dari siswa login.</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1E3A5F] text-[#4A6080] text-xs font-[family-name:var(--font-mono)] uppercase">
                    <th className="text-left px-4 py-3">Nama</th>
                    <th className="text-left px-4 py-3">Kelas</th>
                    <th className="text-left px-4 py-3">Partikel</th>
                    <th className="text-left px-4 py-3">Waktu</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(row => (
                    <tr key={row._id} className={`border-b border-[#122540] hover:bg-[#0D1F35] cursor-pointer transition-colors ${selected?._id === row._id ? 'bg-[#0D1F35]' : ''}`} onClick={() => setSelected(row)}>
                      <td className="px-4 py-3 font-semibold">{row.studentName}</td>
                      <td className="px-4 py-3 text-[#94A3B8]">{row.studentClass}</td>
                      <td className="px-4 py-3 font-[family-name:var(--font-mono)] text-[#EF4444]">{row.totalParticles.toLocaleString('id-ID')}</td>
                      <td className="px-4 py-3 text-[#4A6080] text-xs">
                        {new Date(row.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-4 py-3 text-[#3B82F6] text-xs">Lihat →</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {selected && (
            <div className="lg:w-96 bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-5 overflow-y-auto max-h-[600px]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-[family-name:var(--font-outfit)] font-bold text-lg">{selected.studentName}</h3>
                  <p className="text-[#94A3B8] text-sm">{selected.studentClass}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-[#4A6080] hover:text-[#94A3B8]">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex gap-3 mb-5">
                <div className="bg-[#060F1E] rounded-xl p-3 flex-1 text-center">
                  <p className="font-[family-name:var(--font-mono)] text-xl font-bold text-[#EF4444]">{selected.totalParticles.toLocaleString('id-ID')}</p>
                  <p className="text-[#4A6080] text-xs">partikel</p>
                </div>
                <div className="bg-[#060F1E] rounded-xl p-3 flex-1 text-center">
                  <p className="font-semibold text-sm text-[#F59E0B]">{selected.mostDangerousOrgan || '-'}</p>
                  <p className="text-[#4A6080] text-xs">organ kritis</p>
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
                  <p className="text-xs font-[family-name:var(--font-mono)] text-[#3B82F6] mb-1">{item.l}</p>
                  <p className="text-[#94A3B8] text-sm bg-[#060F1E] rounded-xl p-3 leading-relaxed">
                    {item.t || <span className="text-[#EF4444] italic">Belum diisi</span>}
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
