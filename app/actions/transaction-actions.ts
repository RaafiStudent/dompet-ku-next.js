'use server';

import { prisma } from '@/app/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function addTransaction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) return;

  // Cari user berdasarkan email login
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return;

  const title = formData.get('title') as string;
  const amount = parseFloat(formData.get('amount') as string);
  const type = formData.get('type') as string; // INCOME atau EXPENSE

  await prisma.transaction.create({
    data: {
      title,
      amount,
      type,
      userId: user.id,
    },
  });

  // Refresh halaman agar data baru langsung muncul
  revalidatePath('/');
}

export async function deleteTransaction(id: string) {
  await prisma.transaction.delete({ where: { id } });
  revalidatePath('/');
}