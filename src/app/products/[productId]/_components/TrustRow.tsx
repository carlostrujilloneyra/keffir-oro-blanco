import { Leaf, MapPin, ShieldCheck } from 'lucide-react';

const items = [
  { icon: Leaf, label: 'Artesanal' },
  { icon: ShieldCheck, label: 'Sin conservantes' },
  { icon: MapPin, label: 'Ingredientes con origen' },
];

/*
  Fila de confianza: refuerza los atributos de marca bajo el CTA. Sin caja
  (solo divisores) para no sumar otro panel cream a la columna.
*/
export const TrustRow = () => (
  <div className='flex items-stretch divide-x divide-papel-sombra border-t border-papel-sombra pt-6'>
    {items.map(({ icon: Icon, label }) => (
      <div key={label} className='flex flex-1 flex-col items-center gap-2 px-2 text-center'>
        <span className='flex h-9 w-9 items-center justify-center rounded-full bg-verde/10 text-verde'>
          <Icon className='h-[18px] w-[18px]' />
        </span>
        <span className='text-xs font-medium leading-tight text-tinta-media'>{label}</span>
      </div>
    ))}
  </div>
);
