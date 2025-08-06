'use client';

import { cn } from '@/lib/utils';

type ActionButton = 'info' | 'promocional' | 'submit';

const themeClass = {
  primary: 'bg-primary text-gray-100 hover:bg-primary-hover',
  secondary: 'bg-[#f55947] text-[#F5F5F5]',
  promotional: 'bg-green-500 text-white',
} as const;

export type ButtonTheme = keyof typeof themeClass;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  action?: ActionButton;
  theme: ButtonTheme;
}

/* const themeClass: Partial<Record<ButtonTheme, string>> = {
  primary: 'bg-black text-[#C6C6C6]',
  secondary: 'bg-[#f55947] text-[#F5F5F5]',
}; */

export const Button = ({ theme = 'primary', className, children, ...props }: ButtonProps) => {
  const base =
    'text-center font-semibold text-xs rounded-lg order-3 md:text-sm px-6 py-4 md:py-4 md:px-5 lg:py-4 lg:px-6 transition-all duration-300 ease-in-out tablet:text-[13px]';

  return (
    <button className={cn(base, themeClass[theme], className)} {...props}>
      {children}
    </button>
  );
};
