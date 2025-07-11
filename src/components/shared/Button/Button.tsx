'use client';

import clsx from 'clsx';
import { ButtonSize, ButtonTheme } from './types/button.types';

interface ButtonProps {
  className?: string;
  icon?: JSX.Element;
  size: ButtonSize;
  text?: string;
  theme: ButtonTheme;
  onClick?: () => void;
}

const themeClass: Partial<Record<ButtonTheme, string>> = {
  primary: 'bg-black text-white',
  secondary: 'bg-green-500 text-white',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'text-xs px-1 py-1',
  md: 'text-sm p-2 md:p-3 lg:px-4',
  lg: 'text-base px-3 py-3',
};

export const Button = ({
  size = 'lg',
  text = 'Más información',
  theme = 'primary',
  onClick = () => {},
}: ButtonProps) => {
  const base = 'text-center font-semibold rounded-lg order-3';

  return (
    <button className={clsx(base, themeClass[theme], sizeClass[size])} onClick={onClick}>
      {text}
    </button>
  );
};
