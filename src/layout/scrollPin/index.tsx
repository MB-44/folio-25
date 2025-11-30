import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './style.module.css';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroCta = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const section = sectionRef.current;
    const text = textRef.current;

    // Pin the text in the center of the viewport
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=300%', // Scroll for 3x viewport height
      pin: text,
      pinSpacing: true, // Changed to true to prevent overlap
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      <div className={styles.background}>
        <div className={styles.verticalLine} style={{ left: '10%' }}></div>
        <div className={styles.verticalLine} style={{ right: '10%' }}></div>
      </div>

      <div ref={textRef} className={styles.textContainer}>
        <p className={styles.getStarted}>GET STARTED</p>
        <h1 className={styles.heroText}>
          Let's make<br />things happen.
        </h1>
      </div>
    </section>
  );
};

export default HeroCta;