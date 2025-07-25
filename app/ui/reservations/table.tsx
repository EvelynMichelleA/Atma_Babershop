import Image from 'next/image';
import { UpdateReservations, DeleteReservations } from '@/app/ui/reservations/buttons';
import ReservationsStatus from '@/app/ui/reservations/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredReservations } from '@/app/lib/data';

export default async function ReservationsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const reservations = await fetchFilteredReservations(query, currentPage);
  
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {reservations?.map((reservations) => (
              <div
                key={reservations.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={reservations.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${reservations.name}'s profile picture`}
                      />
                      <p>{reservations.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{reservations.email}</p>
                  </div>
                  <ReservationsStatus status={reservations.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(reservations.amount)}
                    </p>
                    <p>{formatDateToLocal(reservations.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateReservations id={reservations.id} />
                    <DeleteReservations id={reservations.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {reservations?.map((reservations) => (
                <tr
                  key={reservations.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={reservations.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${reservations.name}'s profile picture`}
                      />
                      <p>{reservations.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {reservations.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(reservations.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(reservations.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ReservationsStatus status={reservations.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateReservations id={reservations.id} />
                      <DeleteReservations id={reservations.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
