import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MagneticWrapper({ children }: { children: React.ReactElement<any> }) {
  const magnetic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = magnetic.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(element, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!React.isValidElement(children)) {
    console.error("MagneticWrapper expects a single React element as a child.");
    return children;
  }

  const childWithRef = children as React.ReactElement<any>;

  return React.cloneElement(childWithRef, { ref: magnetic });
}