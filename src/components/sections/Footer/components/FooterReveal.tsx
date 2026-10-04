'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export const FooterReveal = ({ children, className, delay = 0 }: Props) => {
  const reduce = useReducedMotion();

  /*
    Con reduce se quitan las dos formas de movimiento, igual que en
    MainSection: el desplazamiento (y) y la cascada (delay → 0). Queda solo el
    fundido, que no dispara el reflejo vestibular.
  */
  const variants: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4, delay: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut', delay } },
      };

  return (
    <motion.div
      variants={variants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
