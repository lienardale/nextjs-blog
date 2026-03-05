import Image from 'next/image';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

const name = 'Alexandre Lienard';

export default function Header({home}: {home?: boolean}) {
  return (
    <header className="flex flex-col items-center">
      <div className="ml-auto">
        <LanguageSwitcher />
      </div>
      {home ? (
        <>
          <Image
            priority
            src="/images/profile.jpg"
            className="rounded-full"
            height={144}
            width={144}
            alt={name}
          />
          <h1 className="text-4xl font-extrabold tracking-tight my-4">{name}</h1>
        </>
      ) : (
        <>
          <Link href="/">
            <Image
              priority
              src="/images/profile.jpg"
              className="rounded-full"
              height={108}
              width={108}
              alt={name}
            />
          </Link>
          <h2 className="text-2xl my-4">
            <Link href="/" className="text-inherit">
              {name}
            </Link>
          </h2>
        </>
      )}
    </header>
  );
}
