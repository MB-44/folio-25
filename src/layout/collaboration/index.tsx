'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Collaboration as CollaborationData } from '@/data';
import styles from './style.module.css';

export default function Collaboration() {
    const containerRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const xRow1 = useTransform(scrollYProgress, [0, 1], ['-40%', '40%']);
    const xRow2 = useTransform(scrollYProgress, [0, 1], ['40%', '-40%']);

    const repeatCount = 4;

    return (
        <section ref={containerRef} className={styles.collaboration}>
            <div className={styles.content}>
                <motion.div className={styles.row} style={{ x: xRow1 }}>
                    {Array.from({ length: repeatCount }).map((_, i) => (
                        <div key={`row1-${i}`} className={styles.itemGroup}>
                            <h2 className={styles.text}>
                                {CollaborationData.text}
                            </h2>
                            <div className={styles.dot} />
                        </div>
                    ))}
                </motion.div>

                <motion.div className={styles.row} style={{ x: xRow2 }}>
                    {Array.from({ length: repeatCount }).map((_, i) => (
                        <div key={`row2-${i}`} className={styles.itemGroup}>
                            <div className={styles.dot} />
                            <h2 className={styles.text}>
                                {CollaborationData.text2}
                            </h2>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}