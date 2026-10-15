import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import styles from './style.module.css';
import { Magnetic } from '@/components';
import { Description } from '@/data';

export default function DescriptionComponent() {
    const text = Description.description;
    const containerRef = useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        if (!container) return;

        const letters = container.querySelectorAll(`.${styles.letter}`);
        if (!letters.length) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                letters,
                { opacity: 0.2 },
                {
                    opacity: 1,
                    ease: 'none',
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 80%',
                        end: 'bottom 60%',
                        scrub: 1,
                    },
                }
            );
        }, container);

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);

        return () => {
            clearTimeout(timer);
            ctx.revert();
        };
    }, []);

    return (
        <div ref={containerRef} className={styles.description}>
            <div className={styles.content}>
                <div className={styles.rightContent}>
                    {text.map((paragraph, i) => (
                        <p key={i} className={styles.descriptionText}>
                            {paragraph.split(' ').map((word, index, arr) => (
                                <React.Fragment key={index}>
                                    <Magnetic>
                                        <span className={`${styles.magneticWord} ${(word === 'creative' || word === 'developer') ? styles.highlight : ''}`}>
                                            {word.split('').map((char, charIndex) => (
                                                <span key={charIndex} className={styles.letter}>
                                                    {char}
                                                </span>
                                            ))}
                                        </span>
                                    </Magnetic>
                                    {index < arr.length - 1 && ' '}
                                </React.Fragment>
                            ))}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}