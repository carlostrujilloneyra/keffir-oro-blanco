import { cn } from '@/lib/utils';
import { type Product } from '../types/product.type';
import { accentFor, tonePanelBackground } from '../lib/productAccent';
import { ToneHalo } from './ToneHalo';
import styles from './ComingSoonArt.module.scss';

/*
  PROVISIONAL: los productos "Próximamente" aún no tienen foto propia (hoy heredan la
  botella de la kombucha natural). Hasta que la tengan, en vez de la botella se muestra
  el color de su sabor: resplandor del acento sobre su tono oscuro. Quitar cuando haya fotos.
*/
export const isPhotoPending = (product: Product) => product.availability === 'coming-soon';

/* Sello de precio sobre este panel oscuro: vidrio con texto papel (el color, borde y desenfoque van en el módulo). */
export const COMING_SOON_PRICE_CLASS = cn(styles.price, 'text-papel');

export const ComingSoonArt = ({ product, className }: { product: Product; className?: string }) => {
  const tone = accentFor(product);

  return (
    <div aria-hidden className={cn('absolute inset-0', className)} style={{ background: tonePanelBackground[tone] }}>
      <ToneHalo tone={tone} />
    </div>
  );
};
