'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import styles from './style.module.css';
import SvgContent from './SvgContent';

const explainCreativity2: React.FC = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    useIsomorphicLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const section = sectionRef.current;
        const container = containerRef.current;
        const svg = svgRef.current;

        if (!section || !container) return;

        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                if (svg) {
                    svg.style.setProperty('--scroll-progress', self.progress.toString());
                }
            }
        });
    }, []);

    return (
        <section className={styles.root} ref={sectionRef}>
            <div className={styles.container} ref={containerRef}>
                <SvgContent ref={svgRef} />
                <div className={styles.textWrap}>
                    <h2 className={styles.heading}>
                        Creative websites are the<br />
                        intersection of creativity<br />
                        and technicality to form<br />
                        bespoke digital experiences<br />
                        that spark <span className={styles.highlight}>emotion</span>.
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default explainCreativity2;