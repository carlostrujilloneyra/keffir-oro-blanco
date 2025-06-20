'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <p>
        Visita mi Linkedin{' '}
        <Link className='font-bold underline' href='https://www.linkedin.com/in/carlostrujillo21/'>
          ir a perfil.
        </Link>
      </p>
    </>
  );
}
