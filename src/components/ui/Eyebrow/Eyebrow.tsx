import { cn } from '@/lib/utils';

type Tone = 'verde' | 'miel' | 'fucsia' | 'bosque' | 'papel';

const DOT_COLOR: Record<Tone, string> = {
  verde: 'bg-verde',
  miel: 'bg-miel',
  fucsia: 'bg-fucsia',
  bosque: 'bg-bosque',
  papel: 'bg-papel',
};

interface EyebrowProps {
  children: React.ReactNode;
  /** Color del punto. */
  tone?: Tone;
  /** Ajustes de texto (tamaño/color/tracking); se fusionan con el base. */
  className?: string;
  /** Ajuste del punto (p. ej. tamaño h-2 w-2). */
  dotClassName?: string;
}

/*
  Etiqueta "eyebrow": punto de color + texto en mayúsculas con tracking.
  Patrón repetido en casi todas las secciones — centralizado aquí.
  Por defecto: 11px, tracking 0.16em, texto tinta-suave, punto verde.
*/
export const Eyebrow = ({ children, tone = 'verde', className, dotClassName }: EyebrowProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-tinta-suave',
      className,
    )}
  >
    <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', DOT_COLOR[tone], dotClassName)} />
    {children}
  </span>
);
