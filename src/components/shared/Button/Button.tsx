'use client';

import clsx from 'clsx';
import { ButtonTheme } from './types/button.types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  text?: string;
  theme: ButtonTheme;
}

const themeClass: Partial<Record<ButtonTheme, string>> = {
  primary: 'bg-black text-white',
  secondary: 'bg-[#f55947] text-white',
};

export const Button = ({ className, text = 'Más información', theme = 'primary', ...props }: ButtonProps) => {
  const base = 'text-center font-semibold rounded-lg order-3 text-[13px] md:text-sm px-6 py-4 md:p-3 lg:py-4 lg:px-6';

  return (
    <button className={clsx(base, themeClass[theme], className)} {...props}>
      {text}
    </button>
  );
};
