import React from 'react';

interface CardProps {
  title: string;
  amount: number;
  type?: 'neutral' | 'income' | 'expense';
}

export default function CardSummary({ title, amount, type = 'neutral' }: CardProps) {
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const styles = {
    neutral: 'bg-blue-600 text-white',
    income: 'bg-green-100 text-green-800 border-l-4 border-green-500',
    expense: 'bg-red-100 text-red-800 border-l-4 border-red-500',
  };

  return (
    <div className={`shadow-lg rounded-xl p-6 ${styles[type]}`}>
      <h3 className={`text-sm font-medium uppercase tracking-wider mb-2 ${type === 'neutral' ? 'text-blue-100' : 'text-gray-500'}`}>{title}</h3>
      <p className="text-2xl font-bold">{formatRupiah(amount)}</p>
    </div>
  );
}