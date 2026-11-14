import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import styles from './Button.module.scss';

const SOLID = 'min-h-11 px-5 py-2.5 lg:px-6 lg:py-3';

const VARIANT = {
  /* Blanco sobre #d11e82 → #7040cc da 4.98–6.37:1. Al hover el gradiente se desplaza y pasa una franja de luz. */
  primary: `bg-gradient-marca bg-[length:150%_100%] bg-left ${SOLID} text-white shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.4)] duration-500 ease-suave hover:bg-right active:duration-150 motion-reduce:hover:bg-left ${styles.sweep}`,
  miel: `bg-gradient-miel ${SOLID} text-tinta hover:brightness-105`,
  dark: `bg-tinta ${SOLID} text-papel hover:bg-tinta-media`,
  light: `bg-papel ${SOLID} text-tinta hover:bg-papel-hueso`,
  link: 'text-tinta underline decoration-tinta/30 underline-offset-4 hover:decoration-tinta',
} as const;

export type ButtonVariant = keyof typeof VARIANT;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /* Renderiza el hijo (p. ej. un <Link>) con los estilos del botón. */
  asChild?: boolean;
  /* Anillo cónico giratorio (infinito). Solo para el CTA principal del hero: cuenta para el
     límite de 2 animaciones infinitas por pantalla. Se ignora fuera de `primary`. */
  spin?: boolean;
}

export const Button = ({ variant = 'primary', className, asChild = false, spin = false, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'inline-flex w-fit items-center justify-center gap-2 rounded-[10px] text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fucsia focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 lg:text-base',
        VARIANT[variant],
        spin && variant === 'primary' && styles.spin,
        className,
      )}
      {...props}
    />
  );
};
