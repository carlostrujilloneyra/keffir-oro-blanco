import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

const VARIANT = {
  primary: 'bg-gradient-verde px-5 py-2.5 text-papel hover:brightness-110',
  dark: 'bg-tinta px-5 py-2.5 text-papel hover:bg-bosque',
  light: 'bg-papel px-5 py-2.5 text-bosque hover:bg-papel-hueso',
  link: 'text-tinta underline decoration-tinta/30 underline-offset-4 hover:decoration-tinta',
} as const;

export type ButtonVariant = keyof typeof VARIANT;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Renderiza el hijo (p. ej. un <Link>) con los estilos del botón. */
  asChild?: boolean;
}

export const Button = ({ variant = 'primary', className, asChild = false, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'inline-flex w-fit items-center justify-center gap-2 rounded-[10px] text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
        VARIANT[variant],
        className,
      )}
      {...props}
    />
  );
};
