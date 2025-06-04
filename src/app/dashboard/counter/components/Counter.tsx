'use client';

import { useState } from 'react';

export const Counter = () => {
  const [counter, setCounter] = useState<number>(0);

  const handleDecrement = () => setCounter((c) => c - 1);
  const handleIncrement = () => setCounter((c) => c + 1);

  return (
    <div className='mt-3 flex items-center'>
      <button
        className='flex w-[50px] items-center justify-center rounded-xl bg-gray-900 p-2 text-white transition-all hover:bg-gray-600'
        onClick={handleDecrement}
      >
        -1
      </button>

      <span className='m-3 text-4xl'>{counter}</span>

      <button
        className='flex w-[50px] items-center justify-center rounded-xl bg-gray-900 p-2 text-white transition-all hover:bg-gray-600'
        onClick={handleIncrement}
      >
        +1
      </button>
    </div>
  );
};
