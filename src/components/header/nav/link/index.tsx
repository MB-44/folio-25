import { motion } from 'framer-motion';
import NextLink from 'next/link';
import styles from './style.module.css';
import { slide, scale } from '../../animations';
import { forwardRef } from 'react';

interface Data {
  title: string;
  href: string;
  index: number;
}

interface Props {
  data: Data;
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
}

const LinkItem = ({ data, isActive, setSelectedIndicator }: Props, ref: React.Ref<HTMLDivElement>) => {
  const { title, href, index } = data;

  return (
    <motion.div
      ref={ref}
      className={styles.link}
      onMouseEnter={() => { setSelectedIndicator(href); }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className={styles.indicator}
      />
      <NextLink href={href}>{title}</NextLink>
    </motion.div>
  );
};

export default forwardRef<HTMLDivElement, Props>(LinkItem);