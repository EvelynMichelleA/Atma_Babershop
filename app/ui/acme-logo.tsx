import { kanit } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AtmaBabershop() {
  return (
    <div
      className={`${kanit.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        src="/logo_hero.png"
        width={30}
        height={30}
        className="hidden md:block mr-3"
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <Image
        src="/logo_hero.png"
        width={30}
        height={30}
        className="block md:hidden mr-3"
        alt="Screenshot of the dashboard project showing mobile version"
      />

      <p
        className={`${kanit.className} text-xl text-white md:text-3xl md:leading-normal`}
      >
        Atma Babershop

      </p>
    </div>

  );
}
