'use client';
import { addTransaction } from '@/app/actions/transaction-actions';
import { useRef } from 'react';

export default function TransactionForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-gray-100">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Tambah Transaksi Baru</h2>
      <form
        action={async (formData) => {
          await addTransaction(formData);
          formRef.current?.reset();
        }}
        ref={formRef}
        // PERBAIKAN DISINI: Hapus 'md:flex-row' agar form selalu vertikal (ke bawah)
        className="flex flex-col gap-4" 
      >
        {/* Input Keterangan */}
        <div className="flex flex-col gap-1">
           <label className="text-xs font-semibold text-gray-500 uppercase">Keterangan</label>
           <input
             name="title"
             type="text"
             placeholder="Contoh: Gaji, Makan Siang"
             required
             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
           />
        </div>

        {/* Input Jumlah */}
        <div className="flex flex-col gap-1">
           <label className="text-xs font-semibold text-gray-500 uppercase">Nominal (Rp)</label>
           <input
             name="amount"
             type="number"
             placeholder="0"
             required
             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
           />
        </div>

        {/* Pilihan Tipe (Pemasukan/Pengeluaran) */}
        <div className="flex flex-col gap-1">
           <label className="text-xs font-semibold text-gray-500 uppercase">Tipe Transaksi</label>
           <select 
             name="type" 
             className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
           >
             <option value="INCOME">💰 Pemasukan (+)</option>
             <option value="EXPENSE">💸 Pengeluaran (-)</option>
           </select>
        </div>

        {/* Tombol Simpan */}
        <button
          type="submit"
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition shadow-md hover:shadow-lg active:scale-95"
        >
          + Simpan Transaksi
        </button>
      </form>
    </div>
  );
}