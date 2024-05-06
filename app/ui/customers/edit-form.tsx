'use client';
import { updateCustomers } from '@/app/lib/actions';
import { CustomerField, CustomerForm} from '@/app/lib/definitions';
import {
  InboxArrowDownIcon,
  EnvelopeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function EditCustomersForm({
  customer,
  customers,
}: {
  customers: CustomerForm;
  customer: CustomerField[];
}) {
  const updateCustomersWithId = updateCustomers.bind(null, customers.id);

  return (
   <form action={updateCustomersWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
      <legend className="mb-2 block text-sm font-medium">
          Name
        </legend>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="name"
              name="name"
              type="string"
              defaultValue={customers.name}
              placeholder="Enter Name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
    {/* Customers email */}
        <div className="mb-4">
          <legend className="mb-2 block text-sm font-medium">
            Email
          </legend>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={customers.email}
                placeholder="Enter Email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
 {/* Upload */}
       < div className="mb-4">
          <legend className="mb-2 block text-sm font-medium">
            Uploade Image
          </legend>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image_url"
                name="image"
                type="file"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <InboxArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/customers"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel

          </Link>

          <Button type="submit">Create customers</Button>
        </div>
      </div>
    </form>
  );
}