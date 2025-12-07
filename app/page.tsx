import { auth, signOut } from '@/auth';
import { prisma } from '@/app/lib/prisma';
import CardSummary from '@/app/components/CardSummary';
import TransactionForm from '@/app/components/TransactionForm';
import TransactionList from '@/app/components/TransactionList';

export default async function Home() {
  const session = await auth();
  
  // Jika tidak ada user login, kembalikan null (middleware akan otomatis redirect ke login)
  if (!session?.user?.email) return null;

  // Ambil data user & transaksi dari database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { transactions: { orderBy: { createdAt: 'desc' } } },
  });

  const transactions = user?.transactions || [];

  // Hitung Saldo
  const income = transactions.filter((t) => t.type === 'INCOME').reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions.filter((t) => t.type === 'EXPENSE').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - expense;

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Dashboard */}
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-extrabold text-blue-800 tracking-tight">DompetKu 💰</h1>
            <p className="text-gray-500">Halo, <span className="font-semibold text-gray-700">{session.user.name}</span>!</p>
          </div>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-bold transition">
              Sign Out
            </button>
          </form>
        </header>

        {/* Ringkasan Saldo (Card) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CardSummary title="Sisa Saldo" amount={balance} type="neutral" />
          <CardSummary title="Pemasukan" amount={income} type="income" />
          <CardSummary title="Pengeluaran" amount={expense} type="expense" />
        </div>

        {/* Area Transaksi (Form & List) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Input (Kiri) */}
          <div className="lg:col-span-1">
            <TransactionForm />
          </div>
          
          {/* List Riwayat (Kanan) */}
          <div className="lg:col-span-2">
            <TransactionList transactions={transactions} />
          </div>
        </div>

      </div>
    </main>
  );
}