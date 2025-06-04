import { Sidebar } from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen w-screen overflow-y-scroll bg-slate-100 text-slate-300 antialiased selection:bg-blue-600 selection:text-white'>
      <div className='flex'>
        <Sidebar />
        <div className='w-full p-2 text-slate-950'>{children}</div>
      </div>
    </div>
  );
}
