'use client';

import { authenticate } from '@/app/actions/auth-actions';
import { useFormState } from 'react-dom';
import Link from 'next/link';

export default function LoginPage() {
  // Hook ini menangani state error dari server action
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Login DompetKu</h1>
        
        <form action={dispatch} className="flex flex-col gap-4">
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            required 
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            required 
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          
          {/* Tempat muncul pesan error login */}
          <div className="text-red-500 text-sm min-h-[20px] text-center">
            {errorMessage && <p>{errorMessage}</p>}
          </div>

          <button 
            type="submit" 
            className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-bold"
          >
            Masuk
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun? <Link href="/register" className="text-blue-600 hover:underline">Daftar dulu</Link>
        </p>
      </div>
    </div>
  );
}