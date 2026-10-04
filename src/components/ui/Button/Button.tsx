'use client';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

type ActionButton = 'info' | 'promocional' | 'submit';

/* Variantes del sistema de diseño ("Fermento vivo").
 * Gradientes de marca con motivo (líquido del fermento / etiquetas). */
const variantClass = {
  primary: 'bg-gradient-verde text-papel hover:brightness-110',
  outline: 'border border-bosque bg-transparent text-bosque hover:bg-bosque hover:text-papel',
  ghost: 'bg-transparent text-bosque hover:bg-papel-hueso',
  special: 'bg-gradient-fucsia text-white hover:brightness-110',
} as const;

export type ButtonVariant = keyof typeof variantClass;

const themeClass = {
  primary: variantClass.primary,
  secondary: 'bg-bosque text-papel hover:bg-tinta',
  promotional: variantClass.special,
} as const;

export type ButtonTheme = keyof typeof themeClass;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  action?: ActionButton;
  /** Sistema nuevo: primary | outline | ghost. Tiene prioridad sobre `theme`. */
  variant?: ButtonVariant;
  /** @deprecated Usa `variant`. Se mantiene por compatibilidad con secciones sin migrar. */
  theme?: ButtonTheme;
  asChild?: boolean;
}

export const Button = ({ variant, theme = 'primary', className, asChild = false, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  const base =
    'inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.08em] tablet:text-[13px] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde focus-visible:ring-offset-2 focus-visible:ring-offset-papel active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

  const look = variant ? variantClass[variant] : themeClass[theme];

  return <Comp className={cn(base, look, className)} {...props} />;
};
