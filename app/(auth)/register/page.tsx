'use client';

import { register } from '@/app/actions/auth-actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  async function handleSubmit(formData: FormData) {
    const result = await register(formData);
    
    if (result?.error) {
      setError(result.error);
    } else {
      // Jika sukses, arahkan ke login
      router.push('/login');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-600">Daftar Akun</h1>
        
        {/* Pesan Error jika ada */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="flex flex-col gap-4">
          <input 
            name="name" 
            type="text" 
            placeholder="Nama Lengkap" 
            required 
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            required 
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password (Min. 6 karakter)" 
            required 
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
          />
          <button 
            type="submit" 
            className="bg-green-600 text-white py-3 rounded hover:bg-green-700 transition font-bold"
          >
            Daftar Sekarang
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Sudah punya akun? <Link href="/login" className="text-blue-600 hover:underline">Login disini</Link>
        </p>
      </div>
    </div>
  );
}