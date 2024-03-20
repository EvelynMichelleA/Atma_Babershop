import { fetchLatestReservations } from "@/app/lib/data";
import LatestReservations from '@/app/ui/dashboard/latest-reservations';
import ReservationsTable from '@/app/ui/reservations/table';
import Search from '@/app/ui/search';
import Table from '@/app/ui/reservations/table';
import { lusitana } from '@/app/ui/fonts';
import { CreateReservations } from '@/app/ui/reservations/buttons';

export default function Page() {
    return (
        <div className="flex min-h-screen flex-col">
            <p>
                Reservations Page
            </p>
            <p>
                221711704
            </p>
            <p>
                Evelyn Michelle Aurelia
            </p>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search reservations..." />
                <CreateReservations />
            </div>
            {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
      
      </Suspense> */}
            <div className="mt-5 flex w-full justify-center">
                {/* <Pagination totalPages={totalPages} /> */}
            </div>
            <Table query="" currentPage={1} />
        </div>
    )

}
