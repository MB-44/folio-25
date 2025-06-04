'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

const fade: Variants = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: { duration: 0.75 },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export const reveal: Variants = {
  initial: {
    y: '100%',
  },
  open: (i: number) => ({
    y: '0%',
    transition: { duration: 0.5, delay: 0.01 * i },
  }),
  closed: {
    y: '100%',
    transition: { duration: 0.5 },
  },
};

interface ParallaxFadeProps {
  children: ReactNode;
}

export function ParallaxReveal({ children }: ParallaxFadeProps) {
  return (
    <motion.div variants={fade} initial="initial" whileInView="open">
      {children}
    </motion.div>
  );
}