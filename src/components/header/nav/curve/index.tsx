import React from 'react'
import { motion } from 'framer-motion';
import styles from './style.module.css';

export default function Index() {

  const initialPath = `M60 0 L60 ${window.innerHeight} Q-60 ${window.innerHeight / 2} 60 0`
  const targetPath = `M60 0 L60 ${window.innerHeight} Q60 ${window.innerHeight / 2} 60 0`

  const curve = {
    initial: {
      d: initialPath
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  }

  return (
    <svg className={styles.svgCurve}>
      <motion.path variants={curve} initial="initial" animate="enter" exit="exit"></motion.path>
    </svg>
  )
}