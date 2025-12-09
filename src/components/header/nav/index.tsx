import React, { useState } from 'react';
import styles from './style.module.css';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../animations';
import Link from './link';
import Curve from './curve';
import Footer from './footer';
import Magnetic from '@/components/common/magnetic';

const navItems = [
  { title: "Main", href: "/" },
  { title: "About", href: "/about" },
  { title: "Work", href: "/work" },

];

export default function Index() {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div onMouseLeave={() => { setSelectedIndicator(pathname); }} className={styles.nav}>

          {navItems.map((data, i) => (
            <Magnetic key={i}>
              <Link
                data={{ ...data, index: i }}
                isActive={selectedIndicator === data.href}
                setSelectedIndicator={setSelectedIndicator}
              />
            </Magnetic>
          ))}
        </div>
        <Footer />
      </div>
      <Curve />
    </motion.div>
  );
}