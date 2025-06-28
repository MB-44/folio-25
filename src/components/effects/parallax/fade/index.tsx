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

interface ParallaxFadeProps {
  children: ReactNode;
}

export function ParallaxFade({ children }: ParallaxFadeProps) {
  return (
    <motion.div variants={fade} initial="initial" whileInView="open">
      {children}
    </motion.div>
  );
}