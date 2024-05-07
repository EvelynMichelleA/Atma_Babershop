'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// import { UpdateCustomers} from '../ui/customers/buttons';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
const FormSchemaCustomers = z.object({
  id: z.string(),
  image_url: z.string(),
  email: z.string(),
  name: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const CreateReservations = FormSchema.omit({ id: true, date: true });
const UpdateReservations = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const CreateCustomers = FormSchemaCustomers.omit( {id: true} );
const UpdateCustomers = FormSchemaCustomers.omit({ id: true});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function createCustomers(formData: FormData) {
  const img = formData.get('image') ;
  console.log(img);

  let fileName = '';
  if (img instanceof File) {
    fileName =  '/customers/'+ img.name; 
    console.log(fileName);
  };
  const { name, email, image_url} = CreateCustomers.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: fileName,
  });

  await sql`
  INSERT INTO customers (name, email, image_url)
  VALUES ( ${name}, ${email}, ${image_url})
`
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}
export async function updateCustomers(id: string, formData: FormData) {
  const img = formData.get('image') ;
  console.log(img);

  let fileName = '';
  if (img instanceof File) {
    fileName =  '/customers/'+ img.name; 
    console.log(fileName);
  };

  const { name, email, image_url } = UpdateCustomers.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: fileName,
  });

  try {
    await sql`
        UPDATE customers
        SET name = ${name}, email = ${email}, image_url = ${image_url}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Customers.' };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomers(id: string) {
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
    revalidatePath('/dashboard/customers');
    return { message: 'Deleted Customers.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete customers.' };
  }
}
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function createReservations(formData: FormData) {
  const { customerId, amount, status } = CreateReservations.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO reservations (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Reservations.',
    };
  }

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

  try {
    await sql`
        UPDATE reservations
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Reservations.' };
  }

  revalidatePath('/dashboard/reservations');
  redirect('/dashboard/reservations');
}
export async function deleteReservations(id: string) {
  throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM reservations WHERE id = ${id}`;
    revalidatePath('/dashboard/reservations');
    return { message: 'Deleted Reservations.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Reservations.' };
  }
}