// PAGE: Login
// Template halaman login — hanya komposisi organism HeroPanel + LoginForm.
// Semua logika dan UI sudah terdelegasi ke component masing-masing.
import HeroPanel from '@/components/login/HeroPanel';
import LoginForm from '@/components/login/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'var(--font-inter)' }}>
      <HeroPanel />
      <LoginForm />
    </div>
  );
}
