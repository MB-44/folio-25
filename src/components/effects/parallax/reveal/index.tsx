'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

const fade: Variants = {
  initial: { opacity: 0 },
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
  initial: { y: '100%', opacity: 0 },
  open: (i: number = 0) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.1 * i,
      ease: 'easeOut',
    },
  }),
  closed: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

interface ParallaxRevealProps {
  children: ReactNode;
  index?: number;
}

export function ParallaxReveal({ children, index = 0 }: ParallaxRevealProps) {
  return (
    <motion.div
      variants={reveal}
      initial="initial"
      whileInView="open"
      custom={index}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}