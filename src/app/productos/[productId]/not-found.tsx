import { NotFound } from '@/components/sections/NotFound/NotFound';

export default function ProductNotFound() {
  return (
    <NotFound
      title='Este producto no está disponible'
      description='Puede que el enlace esté mal escrito o que el producto ya no esté en el catálogo.'
    />
  );
}
