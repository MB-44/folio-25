'use client';

import { useRef } from "react";
import { motion } from "framer-motion";

import { MagneticItem } from "./index.styled";
import { MagneticVariance } from "./index.variance";

import { useMagnetic } from "@/_hooks/use-magnetic";
import { cn } from "@/_utils";

/** @param {import('react').ButtonHTMLAttributes<HTMLButtonElement> & { variant: 'default' | 'primary' | 'destructive' | 'secondary' | 'ghost' | 'outline'; size: 'default' | 'md' | 'lg' | 'xl';}} */
import { ReactNode } from 'react';

export function MagneticButton({
    children,
    className,
    variant,
    size,
    ...props
  }: {
    children: ReactNode;
    className?: string;
    variant: 'default' | 'primary' | 'destructive' | 'secondary' | 'ghost' | 'outline';
    size: 'default' | 'md' | 'lg' | 'xl';
    [key: string]: any;
  }) {
    /** @type {import('react').MutableRefObject<HTMLButtonElement | null>} */
    const elementRef = useRef<HTMLButtonElement>(null as any);
    const {
      position: { x, y },
      handleMagneticMove,
      handleMagneticOut,
    } = useMagnetic(elementRef);
  
    return (
      <motion.button
        ref={elementRef}
        className={cn(MagneticVariance({ variant, size, className }))}
        animate={{ x, y }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 150,
          mass: 0.1,
        }}
        onPointerMove={handleMagneticMove}
        onPointerOut={handleMagneticOut}
        whileHover={{ scale: 1.1 }}
        {...props}
      >
        <MagneticItem>{children}</MagneticItem>
      </motion.button>
    );
  }