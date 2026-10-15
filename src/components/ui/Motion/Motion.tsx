'use client';

import { Children, isValidElement } from 'react';
import { motion, useReducedMotion, type Easing, type Variants } from 'motion/react';

/* Mismo valor que el token `ease-suave` de Tailwind. */
export const EASE_SUAVE = [0.32, 0.72, 0, 1] as const;

type StaggerOptions = {
  stagger: number;
  delay?: number;
  y: number;
  duration: number;
  ease?: Easing;
};

/* Cascada fade + desplazamiento. Con reduced motion queda solo el fundido, sin cascada. */
export const useStaggerVariants = ({ stagger, delay = 0, y, duration, ease = EASE_SUAVE }: StaggerOptions) => {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delay } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y }, visible: { opacity: 1, y: 0, transition: { duration, ease } } };

  return { container, item };
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  x?: number;
  y?: number;
  /* true = revela al entrar en viewport (una vez); false = al montar. */
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
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: EASE_SUAVE, delay } },
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
  /* true = al entrar en viewport (una vez); false = al montar. */
  inView?: boolean;
};

/* Cascada: envuelve cada hijo directo en un div y los revela en secuencia. */
export const Stagger = ({ children, className, delay = 0, inView = false }: StaggerProps) => {
  const { container, item } = useStaggerVariants({ stagger: 0.09, delay, y: 14, duration: 0.65 });

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

type StaggerListProps = {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
};

/* Lista en cascada al entrar en viewport: <ul> + un <li> por hijo. Los hijos pueden ser Server Components. */
export const StaggerList = ({ children, className, itemClassName }: StaggerListProps) => {
  const { container, item } = useStaggerVariants({ stagger: 0.1, delay: 0.06, y: 28, duration: 0.7 });

  return (
    <motion.ul
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {Children.map(children, (child) =>
        isValidElement(child) ? (
          <motion.li key={child.key} variants={item} className={itemClassName}>
            {child}
          </motion.li>
        ) : null,
      )}
    </motion.ul>
  );
};
