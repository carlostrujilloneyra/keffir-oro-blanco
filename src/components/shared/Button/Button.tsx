'use client';

import clsx from 'clsx';
import { ButtonTheme } from './types/button.types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  text?: string;
  theme: ButtonTheme;
}

const themeClass: Partial<Record<ButtonTheme, string>> = {
  primary: 'bg-black text-[#C6C6C6]',
  secondary: 'bg-[#f55947] text-[#F5F5F5]',
};

export const Button = ({ className, text = 'Más información', theme = 'primary', ...props }: ButtonProps) => {
  const base =
    'text-center font-semibold text-xs rounded-lg order-3 md:text-sm px-3 py-4 md:py-4 md:px-5 lg:py-4 lg:px-6';

  return (
    <button className={clsx(base, themeClass[theme], className)} {...props}>
      {text}
    </button>
  );
};
