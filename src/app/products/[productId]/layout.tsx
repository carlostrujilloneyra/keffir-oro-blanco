import { ReactNode } from 'react';

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <div className='min-h-screen w-full bg-white'>{children}</div>;
}
