import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/models/User';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, mode } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Harap masukkan email dan password' }, { status: 400 });
    }

    let isDbConnected = false;
    try {
      await connectDB();
      isDbConnected = true;
    } catch (dbErr) {
      console.warn('[MongoDB Offline] Menggunakan fallback autentikasi lokal:', dbErr);
    }

    if (isDbConnected) {
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ success: false, message: 'Kredensial salah atau pengguna tidak ditemukan' }, { status: 401 });
      }

      // Validasi kecocokan role (misalnya mode siswa tidak bisa login sebagai guru)
      if (mode === 'student' && user.role !== 'student') {
        return NextResponse.json({ success: false, message: 'Akun ini bukan akun siswa.' }, { status: 403 });
      }
      if (mode === 'teacher' && user.role === 'student') {
        return NextResponse.json({ success: false, message: 'Akun siswa tidak dapat mengakses Dashboard Guru.' }, { status: 403 });
      }

      const isMatch = (password === user.password);
      if (!isMatch) {
        return NextResponse.json({ success: false, message: 'Kredensial salah (password tidak cocok)' }, { status: 401 });
      }

      const token = `mj_token_${user._id}_${Date.now()}`;
      const response = NextResponse.json({
        success: true,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          school: user.school,
          phoneNumber: user.phoneNumber,
        }
      }, { status: 200 });

      response.cookies.set({
        name: 'auth_token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 // 7 Hari
      });

      return response;
    } else {
      // Fallback jika MongoDB tidak terjangkau (offline / network error)
      const role = mode === 'teacher' ? 'teacher' : 'student';
      const fallbackUser = {
        id: `${role}-${Date.now()}`,
        name: email.split('@')[0] || 'Pengguna',
        email,
        role,
      };

      const token = `mj_token_local_${Date.now()}`;
      const response = NextResponse.json({
        success: true,
        user: fallbackUser
      }, { status: 200 });

      response.cookies.set({
        name: 'auth_token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60
      });

      return response;
    }

  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
