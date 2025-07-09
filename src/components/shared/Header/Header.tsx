import { Logo } from './components/Logo';

export const Header = () => {
  return (
    <header className='grid h-[100px] w-full grid-cols-[min-content_1fr_min-content] items-center border-b-[0.2rem] border-gray-700 bg-black px-6 py-8 md:px-10 md:py-9 lg:grid-cols-[120px_1fr_min-content] lg:px-20'>
      <p className='text-white'>Logo</p>

      {/* <Logo /> */}
      <span>aua</span>

      {/* NavBar */}

      {/* Botón de Más información que te manda al wspp de Oro Blanco - SN */}
      <span>button</span>
    </header>
  );
};
