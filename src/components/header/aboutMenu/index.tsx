import { motion, AnimatePresence } from 'framer-motion';
import styles from './style.module.css';
import Link from 'next/link';
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

const textSwap = {
    initial: {
        opacity: 0,
        y: 20,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] }
    }
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
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <motion.div
                            custom={index}
                            variants={slideUp}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            style={{ display: 'flex', alignItems: 'baseline' }}
                        >
                            <Link href={item.href} className={styles.link}>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={hoveredIndex === index ? "desc" : "title"}
                                        variants={textSwap}
                                        initial="initial"
                                        animate="enter"
                                        exit="exit"
                                        style={{ display: "inline-block" }}
                                    >
                                        {hoveredIndex === index ? item.description : item.title}
                                    </motion.span>
                                </AnimatePresence>
                            </Link>
                            <span className={styles.exploreHint}>click to explore</span>
                        </motion.div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
