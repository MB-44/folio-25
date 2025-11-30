import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './style.module.css';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroCta = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !backgroundRef.current) return;

    const wrapper = wrapperRef.current;
    const background = backgroundRef.current;

    // Set initial state
    gsap.set(background, { y: 0 });

    // Animate the background scrolling relative to the wrapper's scroll
    // We don't need to pin via GSAP anymore because we're using CSS sticky
    const scrollTrigger = gsap.fromTo(background,
      {
        y: 0,
      },
      {
        y: '100vh',
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0, // Instant scrubbing for direct control
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <section className={styles.heroSection}>
        <div ref={backgroundRef} className={styles.background}>
          <div className={styles.verticalLine} style={{ left: '10%' }}></div>
          <div className={styles.verticalLine} style={{ right: '10%' }}></div>
        </div>

        <div className={styles.textContainer}>
          <p className={styles.getStarted}>GET STARTED</p>
          <h1 className={styles.heroText}>
            Let's make<br />things happen.
          </h1>
        </div>
      </section>
    </div>
  );
};

export default HeroCta;