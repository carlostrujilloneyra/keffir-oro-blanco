'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const Logo = () => {
  const router = useRouter();

  const handleNavigateToHome = () => router.push('/');

  return (
    <div className='relative h-[70px] w-[120px] cursor-pointer'>
      <Image
        className='object-cover'
        onClick={handleNavigateToHome}
        src='/assets/images/logo-oro-blanco-sn.png'
        sizes='(min-width: 600px) 100vw, 120px'
        alt='Logo Oro Blanco - SN'
        fill
      />
    </div>
  );
};
