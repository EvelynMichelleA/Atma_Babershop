import AcmeLogo from '@/app/ui/acme-logo';
import { UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { kanit, anton } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">

      <Image
        src="/bg_hero.png"
        layout="fill"
        objectFit="cover"
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <Image
        src="/bg_hero.png"
        layout="fill"
        objectFit="cover"
        className="block md:hidden"
        alt="Screenshots of the dashboard project showing mobile version"
      />

      <div className="z-10 flex h-20 shrink-0 items-end rounded-lg bg-white-0 p-4 md:h-15">
        <AcmeLogo />
      </div>
      <div className="z-10 mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-white-0 px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${kanit.className} text-l text-white md:text-l md:leading-normal`}
          >
            221711704 - Evelyn Michelle Aurelia
          </p>

          <p
            className={`${anton.className} text-6xl text-white md:text-6xl md:leading-normal`}
          >
            Our Babershop
          </p>
          <p
            className={`${anton.className} text-6xl text-white md:text-6xl md:leading-normal`}
          >
            Admin Dashboard
          </p>
          <header className="absolute top-5 right-5 mt-4 mr-4">
            <Link href="/login"
              className="text-white block md:hidden"
              aria-label="Login">
              <UserIcon className="h-6 w-6" />
            </Link>
          </header>
          <header className="absolute top-5 right-5 mt-4 mr-4">
            <Link
              href="/Login"
              className="flex items-center gap-5 self-start rounded-lg bg-white-0 border border-white px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-400 hidden md:block"
            >
              <span>Login</span>
            </Link>
          </header>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
        </div>
      </div>
    </main>
  );
}
