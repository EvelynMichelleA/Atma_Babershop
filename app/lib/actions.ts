'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
const CreateReservations = FormSchema.omit({ id: true, date: true });
const UpdateReservations = FormSchema.omit({ id: true, date: true }); 

export async function createReservations(formData: FormData) {
    const { customerId, amount, status } = CreateReservations.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO reservations (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath('/dashboard/reservations');
  redirect('/dashboard/reservations');
}
 
export async function updateReservations(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateReservations.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE reservations
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/reservations');
  redirect('/dashboard/reservations');
}

export async function deleteReservations(id: string) {
    await sql`DELETE FROM reservations WHERE id = ${id}`;
    revalidatePath('/dashboard/reservations');
  }