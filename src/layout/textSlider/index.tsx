// components/TextSlider/index.tsx
'use client';

import { useEffect, useRef } from 'react';
import styles from './style.module.css';

interface TextSliderProps {
    text?: string;
    className?: string;
}

export default function TextSlider({
    text = "Let's work together!",
    className = ''
}: TextSliderProps) {
    const firstRef = useRef<HTMLHeadingElement>(null);
    const secondRef = useRef<HTMLHeadingElement>(null);
    const tickingRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log('🎯 TextSlider mounted');
        console.log('📦 First element:', firstRef.current);
        console.log('📦 Second element:', secondRef.current);
        console.log('📦 Container:', containerRef.current);

        const animateText = (element: HTMLElement | null, position: number) => {
            if (element) {
                console.log(`✨ Animating ${element.id || 'element'} to position: ${position}px`);
                element.style.transform = `translateX(${position}px)`;
            } else {
                console.warn('⚠️ Element is null, cannot animate');
            }
        };

        const handleScroll = () => {
            const lastKnownScrollPosition = window.scrollY;
            console.log(`📜 Scroll event fired! Position: ${lastKnownScrollPosition}px`);

            if (!tickingRef.current) {
                console.log('🎬 Requesting animation frame...');
                window.requestAnimationFrame(() => {
                    const pos1 = lastKnownScrollPosition * 0.2;
                    const pos2 = lastKnownScrollPosition * -0.2;

                    console.log(`➡️ Moving first element to: ${pos1}px`);
                    console.log(`⬅️ Moving second element to: ${pos2}px`);

                    animateText(firstRef.current, pos1);
                    animateText(secondRef.current, pos2);

                    tickingRef.current = false;
                    console.log('✅ Animation frame completed');
                });

                tickingRef.current = true;
            } else {
                console.log('⏸️ Animation frame already scheduled, skipping...');
            }
        };

        // Initial call to set position on mount
        console.log('🚀 Calling initial handleScroll...');
        handleScroll();

        console.log('👂 Adding scroll event listener...');
        document.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            console.log('🧹 Cleaning up scroll listener...');
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={containerRef} className={`${styles.textSliderWrap} ${className}`}>
            <h1 ref={firstRef} id="ts-first" className={styles.tsFirst}>
                {text} <span></span> {text}
            </h1>
            <h1 ref={secondRef} id="ts-second" className={styles.tsSecond}>
                {text} <span></span> {text}
            </h1>
        </div>
    );
}