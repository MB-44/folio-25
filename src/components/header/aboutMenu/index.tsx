import { motion } from 'framer-motion';
import styles from './style.module.css';
import { HoverLink } from '@/components/effects'; // Assuming this import path works based on previous file view
// If direct import is safer: import HoverLink from '../../effects/hoverLink';
import { useState } from 'react';

const menuVariants = {
    initial: {
        opacity: 0,
    },
    enter: {
        opacity: 1,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    }
}

const slideUp = {
    initial: {
        y: "100%",
        opacity: 0
    },
    enter: (i: number) => ({
        y: "0%",
        opacity: 1,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 * i }
    }),
    exit: (i: number) => ({
        y: "100%",
        opacity: 0,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 * i }
    })
}

const navItems = [
    { title: "Menath", href: "/about#intro", description: "Creative Developer" },
    { title: "Approach", href: "/about#story", description: "my singular approach for craftmanship" },
    { title: "Services", href: "/about#team", description: "services driven by purpose and vision" },
];

interface AboutMenuProps {
    close: () => void;
}

export default function AboutMenu({ close }: AboutMenuProps) {
    return (
        <motion.div
            variants={menuVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className={styles.menu}
            onClick={close}
        >
            <div className={styles.nav} onClick={(e) => e.stopPropagation()}>
                {navItems.map((item, index) => (
                    <div
                        key={index}
                        className={styles.linkContainer}
                        onClick={close}
                    >
                        <motion.div
                            custom={index}
                            variants={slideUp}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            <HoverLink href={item.href} className={styles.link}>
                                {item.title}
                            </HoverLink>
                            <span className={styles.exploreHint}>click to explore</span>
                        </motion.div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
