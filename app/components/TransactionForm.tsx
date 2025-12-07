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
        className="flex flex-col gap-4 md:flex-row"
      >
        <input
          name="title"
          type="text"
          placeholder="Keterangan (cth: Gaji, Makan)"
          required
          className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          name="amount"
          type="number"
          placeholder="Rp Jumlah"
          required
          className="w-full md:w-48 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <select name="type" className="p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none">
          <option value="INCOME">Pemasukan (+)</option>
          <option value="EXPENSE">Pengeluaran (-)</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition shadow-md"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}