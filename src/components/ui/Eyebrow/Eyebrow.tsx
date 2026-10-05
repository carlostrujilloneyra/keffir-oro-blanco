import { cn } from '@/lib/utils';

const VARIANT = {
  dark: 'bg-tinta text-papel',
  light: 'bg-papel text-tinta',
} as const;

interface EyebrowProps {
  children: React.ReactNode;
  /** `light` sobre fondos oscuros. */
  variant?: keyof typeof VARIANT;
  className?: string;
}

/* Etiqueta de sección con la forma de la cinta de la etiqueta física ("30 - 40 Probióticos"). */
export const Eyebrow = ({ children, variant = 'dark', className }: EyebrowProps) => (
  <span
    className={cn(
      'inline-flex w-fit py-1.5 pl-3 pr-6 text-xs font-semibold [clip-path:polygon(0_0,calc(100%-12px)_0,100%_50%,calc(100%-12px)_100%,0_100%)] tablet:text-[13px]',
      VARIANT[variant],
      className,
    )}
  >
    {children}
  </span>
);
