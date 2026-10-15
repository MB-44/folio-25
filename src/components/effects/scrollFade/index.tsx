import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './style.module.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFadeTextProps {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
    startOpacity?: number;
    triggerStart?: string;
    triggerEnd?: string;
}

const ScrollFadeText: React.FC<ScrollFadeTextProps> = ({
    children,
    className = '',
    stagger = 0.05,
    startOpacity = 0.1,
    triggerStart = 'top bottom-=20%',
    triggerEnd = 'center top+=20%',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Split text into words
        const container = containerRef.current;
        const text = container.textContent || '';
        const words = text.split(/(\s+)/);

        // Clear and rebuild with wrapped words
        container.innerHTML = '';
        words.forEach((word) => {
            if (word.trim()) {
                const span = document.createElement('span');
                span.className = styles.word;
                span.textContent = word;
                container.appendChild(span);
            } else {
                // Preserve whitespace
                container.appendChild(document.createTextNode(word));
            }
        });

        const wordElements = container.querySelectorAll(`.${styles.word}`);

        // Animate words
        const animation = gsap.fromTo(
            wordElements,
            {
                opacity: startOpacity,
            },
            {
                ease: 'none',
                opacity: 1,
                stagger: stagger,
                scrollTrigger: {
                    trigger: container,
                    start: triggerStart,
                    end: triggerEnd,
                    scrub: true,
                },
            }
        );

        // Cleanup
        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, [children, stagger, startOpacity, triggerStart, triggerEnd]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
};

export default ScrollFadeText;