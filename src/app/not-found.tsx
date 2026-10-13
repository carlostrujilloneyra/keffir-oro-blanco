import { NotFound } from '@/components/sections/NotFound/NotFound';

export default function GlobalNotFound() {
  return (
    <NotFound
      title='Esta página no existe'
      description='Puede que el enlace esté mal escrito o que la página se haya movido.'
    />
  );
}
