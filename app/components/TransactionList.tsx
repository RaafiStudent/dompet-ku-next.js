'use client';
import { deleteTransaction } from '@/app/actions/transaction-actions';
import { FaTrash } from 'react-icons/fa';

export default function TransactionList({ transactions }: { transactions: any[] }) {
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="font-bold text-gray-700">Riwayat Transaksi</h2>
      </div>
      <ul className="divide-y divide-gray-100">
        {transactions.length === 0 ? (
          <p className="p-8 text-center text-gray-400 italic">Belum ada transaksi.</p>
        ) : (
          transactions.map((t) => (
            <li key={t.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition">
              <div>
                <p className="font-bold text-gray-800">{t.title}</p>
                <p className="text-xs text-gray-500">{new Date(t.createdAt).toLocaleDateString('id-ID')}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-bold ${t.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'INCOME' ? '+' : '-'} {formatRupiah(t.amount)}
                </span>
                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition rounded-full hover:bg-red-50"
                  title="Hapus"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}