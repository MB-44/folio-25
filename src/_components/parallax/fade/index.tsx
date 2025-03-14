'use client';

import { motion } from 'framer-motion';

import { fade } from './variants';

/** @param {import('react').PropsWithChildren<unknown>} */
import { ReactNode } from 'react';

export function ParallaxFade({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={fade} initial='initial' whileInView='open'>
      {children}
    </motion.div>
  );
}