import { fetchLatestReservations } from "@/app/lib/data";
import LatestReservations from '@/app/ui/dashboard/latest-reservations';
import ReservationsTable from '@/app/ui/reservations/table';
import Search from '@/app/ui/search';
import Table from '@/app/ui/reservations/table';
import { lusitana } from '@/app/ui/fonts';
import { CreateReservations } from '@/app/ui/reservations/buttons';
import { Suspense } from 'react';
import CardWrapper from '@/app/ui/dashboard/cards';
import { ReservationsSkeleton, ReservationsTableSkeleton, CardsSkeleton, DashboardReservationsSekeleton, SearchSekeletion, CreateSekeletion } from "@/app/ui/skeletons";
import Loading from "./loading";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { fetchReservationsPages } from '@/app/lib/data';
import Pagination from "@/app/ui/reservations/pagination";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Reservations',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchReservationsPages(query);

    return (
        <div className="flex min-h-screen flex-col">
            <h1 className={`${lusitana.className} mb-4 text-2l md:text-2l`}>
                Reservations Page <br />
                221711704<br />
                Evelyn Michelle Aurelia
            </h1>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Suspense fallback={<SearchSekeletion />}>
                    <Search placeholder="Search reservations..." />
                </Suspense>
                <Suspense fallback={<CreateSekeletion />}>
                    <CreateReservations />
                </Suspense>
            </div>
            <Suspense key={query + currentPage} fallback={<ReservationsTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>

        </div>
    )
}
