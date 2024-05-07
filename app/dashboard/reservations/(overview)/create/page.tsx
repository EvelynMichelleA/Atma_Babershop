import Form from '@/app/ui/reservations/create-from';
import Breadcrumbs from '@/app/ui/reservations/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create Reservations',
};

export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Reservations', href: '/dashboard/reservations' },
          {
            label: 'Create Reservations',
            href: '/dashboard/reservations/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}