// components/Header.tsx

import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-linear-to-r from-college-blue-600 via-college-blue-500 to-college-blue-600 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center gap-3 md:gap-4 justify-center">
          <div className="flex-1 min-w-0 text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight font-serif">
              St Joseph&apos;s College, Darjeeling
            </h1>
            <p className="text-blue-100 text-sm md:text-base lg:text-lg mt-1 md:mt-2">
              Economics Honours • Alumni Directory
            </p>
            <p className="text-blue-200 text-xs md:text-sm italic mt-1">
              ✦ Sursum Corda ✦
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}