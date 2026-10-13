'use client';

import { Children, isValidElement } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

const EASE = [0.32, 0.72, 0, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  x?: number;
  y?: number;
  /** true = revela al entrar en viewport (una vez); false = al montar. */
  inView?: boolean;
};

/* Revelado simple (fade + desplazamiento). Aísla la animación en cliente para
   que las páginas y secciones sigan siendo Server Components. */
export const Reveal = ({ children, className, style, delay = 0, x = 0, y = 16, inView = false }: RevealProps) => {
  const reduce = useReducedMotion();

  const variants: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x, y },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
      };

  const trigger = inView
    ? ({ whileInView: 'visible', viewport: { once: true, margin: '-80px' } } as const)
    : ({ animate: 'visible' } as const);

  return (
    <motion.div variants={variants} initial='hidden' {...trigger} className={className} style={style}>
      {children}
    </motion.div>
  );
};

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** true = al entrar en viewport (una vez); false = al montar. */
  inView?: boolean;
};

/* Cascada: envuelve cada hijo directo en un div y los revela en secuencia. */
export const Stagger = ({ children, className, delay = 0, inView = false }: StaggerProps) => {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : delay } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } };

  const trigger = inView
    ? ({ whileInView: 'visible', viewport: { once: true, margin: '-80px' } } as const)
    : ({ animate: 'visible' } as const);

  return (
    <motion.div variants={container} initial='hidden' {...trigger} className={className}>
      {Children.map(children, (child) =>
        isValidElement(child) ? <motion.div variants={item}>{child}</motion.div> : child,
      )}
    </motion.div>
  );
};
