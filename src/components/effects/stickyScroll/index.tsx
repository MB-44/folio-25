import styles from './style.module.css';
import { ReactNode } from 'react';

interface StickyScrollProps {
  children: ReactNode;
}

export default function StickyScroll({ children }: StickyScrollProps) {
  return (
    <div className={styles.stickyContainer}>
      {children}
    </div>
  );
}
