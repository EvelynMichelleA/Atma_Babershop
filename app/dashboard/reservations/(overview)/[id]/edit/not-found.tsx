import Link from 'next/link';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
    return (
        <main className="flex h-full items-center justify-center bg-gray-200">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
                <ExclamationCircleIcon className="w-10 text-red-400" />
                <h2 className="text-l font-semibold">404 Not Found</h2>
            </div>
            <p className="text-sm"> Sorry. the page you are looking for could not be found.</p>
            <Link
                href="/dashboard/reservations"
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
            >
                Go Back to Home
            </Link>
            </div>
        </main>
    );
    

}