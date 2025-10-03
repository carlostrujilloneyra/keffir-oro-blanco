'use client';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

type ActionButton = 'info' | 'promocional' | 'submit';

const themeClass = {
  primary: 'bg-primary text-light-50 hover:bg-primary-hover',
  secondary: 'bg-[#f55947] text-[#F5F5F5]',
  promotional: 'bg-green-500 text-white',
} as const;

export type ButtonTheme = keyof typeof themeClass;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  action?: ActionButton;
  theme: ButtonTheme;
  asChild?: boolean;
}

/* const themeClass: Partial<Record<ButtonTheme, string>> = {
  primary: 'bg-black text-[#C6C6C6]',
  secondary: 'bg-[#f55947] text-[#F5F5F5]',
}; */

export const Button = ({ theme = 'primary', className, asChild = false, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  const base =
    'text-center font-semibold text-xs rounded-lg order-3 tablet:text-sm transition-all duration-300 ease-in-out tablet:text-[13px] uppercase';

  return <Comp className={cn(base, themeClass[theme], className)} {...props} />;
};
