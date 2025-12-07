'use client';

import { authenticate } from '@/app/actions/auth-actions';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';

// Komponen Tombol Submit Terpisah (untuk handle status loading otomatis)
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition duration-300 shadow-md ${pending ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {pending ? 'Masuk...' : 'Masuk ke Akun'}
    </button>
  );
}

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    // Background gradien biru-abu elegan
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">
          Selamat Datang Kembali
        </h1>
        
        <form action={dispatch} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              id="email"
              name="email" 
              type="email" 
              placeholder="nama@email.com" 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              id="password"
              name="password" 
              type="password" 
              placeholder="Masukkan password Anda" 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" 
            />
          </div>
          
          {/* Pesan Error Login */}
          <div className="text-red-500 text-sm min-h-[24px] text-center font-medium">
            {errorMessage && <p>{errorMessage}</p>}
          </div>

          <SubmitButton />
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-600">
          Belum punya akun? <Link href="/register" className="font-medium text-blue-600 hover:text-blue-800 transition">Buat akun baru</Link>
        </p>
      </div>
    </div>
  );
}