'use client';

import { register } from '@/app/actions/auth-actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false); // Tambah loading state

  async function handleSubmit(formData: FormData) {
    setIsLoading(true); // Mulai loading
    setError('');
    
    const result = await register(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsLoading(false); // Stop loading jika error
    } else {
      // Jika sukses, arahkan ke login
      router.push('/login');
    }
  }

  return (
    // Background gradien biru-abu elegan
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">
          Buat Akun Baru
        </h1>
        
        {/* Pesan Error Modern */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 text-sm">
            <p className="font-medium">Terjadi Kesalahan</p>
            <p>{error}</p>
          </div>
        )}

        <form action={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input 
              id="name"
              name="name" 
              type="text" 
              placeholder="Contoh: Budi Santoso" 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
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
              placeholder="Minimal 6 karakter" 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition duration-300 shadow-md ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-600">
          Sudah punya akun? <Link href="/login" className="font-medium text-blue-600 hover:text-blue-800 transition">Login di sini</Link>
        </p>
      </div>
    </div>
  );
}