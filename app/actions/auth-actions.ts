'use server';

import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import { signIn } from '@/auth'; // Import dari file auth.ts di root
import { AuthError } from 'next-auth';

// --- FUNGSI REGISTER USER BARU ---
export async function register(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validasi sederhana
  if (!name || !email || !password) {
    return { error: 'Semua kolom harus diisi!' };
  }

  // Enkripsi password biar aman di database
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Simpan ke database
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    
    // Kalau sukses, return null (artinya tidak ada error)
    return { success: true };
    
  } catch (err) {
    // Kalau error (misal email sudah ada)
    return { error: 'Email sudah terdaftar!' };
  }
}

// --- FUNGSI LOGIN USER ---
export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    // Panggil fungsi signIn bawaan NextAuth
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Email atau Password salah.';
        default:
          return 'Terjadi kesalahan sistem.';
      }
    }
    throw error;
  }
}