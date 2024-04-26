import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCustomers } from '@/app/lib/actions';


export default function Form({ customers }: { customers: CustomerField[] }) {
  return (
    <form action={createCustomers}>
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
              placeholder="Enter Name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>

        {/* Customers Amount */}
        <div className="mb-4">
          <legend className="mb-2 block text-sm font-medium">
            Email
          </legend>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="string"
                placeholder="Enter Email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>


        {/* Upload */}
        {/* <legend className="mb-2 block text-sm font-medium">
          Upload Image
        </legend>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="image_url"
              name="image_url"
              type="string"
            />

            <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      <UploadForm />
          </div>
        </div>
      </div> */}
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
    </form>
  );
}

