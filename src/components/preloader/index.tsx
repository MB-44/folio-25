'use client';
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { opacity, slideUp } from "./animation";
import { preloaderWords } from "@/data";
import styles from "./style.module.css";

const BRAND_NAME = "menath.b";

interface PreLoaderProps {
    onComplete?: () => void;
}

export default function PreLoader({ onComplete }: PreLoaderProps) {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const [phase, setPhase] = useState<'greet' | 'brand' | 'morph'>('greet');
    const [curtainOut, setCurtainOut] = useState(false);
    const brandRef = useRef<HTMLParagraphElement>(null);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    useEffect(() => {
        if (phase !== 'greet') return;

        if (index < preloaderWords.length - 1) {
            const timeout = setTimeout(() => {
                setIndex((current) => current + 1);
            }, index === 0 ? 1000 : 150);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => setPhase('brand'), 420);
        return () => clearTimeout(timeout);
    }, [index, phase]);

    useEffect(() => {
        if (phase !== 'brand') return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const timeout = setTimeout(() => setPhase('morph'), reduced ? 80 : 700);
        return () => clearTimeout(timeout);
    }, [phase]);

    useEffect(() => {
        if (phase !== 'morph') return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setCurtainOut(true);

        const finish = () => {
            if (brandRef.current) brandRef.current.style.opacity = '0';
            onCompleteRef.current?.();
        };

        if (reduced) {
            finish();
            return;
        }

        let ctx: gsap.Context | undefined;
        const frame = requestAnimationFrame(() => {
            const brand = brandRef.current;
            const target = document.querySelector('[data-brand-logo]') as HTMLElement | null;

            if (!brand || !target) {
                finish();
                return;
            }

            const from = brand.getBoundingClientRect();
            gsap.set(brand, {
                x: 0,
                y: 0,
                xPercent: 0,
                yPercent: 0,
                left: from.left,
                top: from.top,
                transform: 'none',
            });

            const fromBox = brand.getBoundingClientRect();
            const toBox = target.getBoundingClientRect();
            const fromSize = parseFloat(window.getComputedStyle(brand).fontSize);
            const toSize = parseFloat(window.getComputedStyle(target).fontSize);
            const scale = toSize / fromSize;

            ctx = gsap.context(() => {
                gsap.to(brand, {
                    x: toBox.left - fromBox.left,
                    y: toBox.top - fromBox.top,
                    scale,
                    transformOrigin: '0 0',
                    duration: 1.15,
                    ease: 'power3.inOut',
                    onComplete: finish,
                });
            });
        });

        return () => {
            cancelAnimationFrame(frame);
            ctx?.revert();
        };
    }, [phase]);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.15 }
        }
    };

    return (
        <motion.div className={styles.root} exit={{ opacity: 0, transition: { duration: 0 } }}>
            {dimension.width > 0 && (
                <>
                    <motion.div
                        className={styles.introduction}
                        variants={slideUp}
                        initial="initial"
                        animate={curtainOut ? "exit" : "initial"}
                    >
                        {phase === 'greet' && (
                            <motion.p variants={opacity} initial="initial" animate="enter">
                                <span></span>{preloaderWords[index]}
                            </motion.p>
                        )}
                        <svg>
                            <motion.path variants={curve} initial="initial" animate={curtainOut ? "exit" : "initial"}></motion.path>
                        </svg>
                    </motion.div>
                    {phase !== 'greet' && (
                        <p ref={brandRef} className={styles.brandFly}>
                            {BRAND_NAME}
                        </p>
                    )}
                </>
            )}
        </motion.div>
    );
}
