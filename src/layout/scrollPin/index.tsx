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
  const parallaxTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !backgroundRef.current || !parallaxTextRef.current) return;

    const wrapper = wrapperRef.current;
    const background = backgroundRef.current;
    const parallaxText = parallaxTextRef.current;

    // Set initial state
    gsap.set(background, { y: 0 });

    // Animate the background lines (Scrolls DOWN)
    const bgTrigger = gsap.to(background, {
      y: '100vh',
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0,
        invalidateOnRefresh: true,
      },
    });

    // Animate the parallax text (Scrolls UP from bottom to top)
    // Start below the viewport and move completely through it
    const textTrigger = gsap.fromTo(parallaxText,
      {
        y: '100vh', // Start below the screen
      },
      {
        y: '-150%', // Move way up past the top
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Add some smoothing/momentum
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      bgTrigger.kill();
      textTrigger.kill();
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

        <div ref={parallaxTextRef} className={styles.parallaxContainer}>
          <span className={styles.bgText}>RESEARCH</span>
          <span className={styles.bgText}>STRATEGY</span>
          <span className={styles.bgText}>DESIGN</span>
          <span className={styles.bgText}>DEVELOP</span>
          <span className={styles.bgText}>LAUNCH</span>
          <span className={styles.bgText}>SCALE</span>
          <span className={styles.bgText}>IMPACT</span>
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