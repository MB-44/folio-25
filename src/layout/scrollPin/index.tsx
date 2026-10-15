import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './style.module.css';
import { useRouter } from 'next/router';
import { ScrollPin } from '@/data';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroCta = () => {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const parallaxTextRef = useRef<HTMLDivElement>(null);
  const floatingLabelRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!wrapperRef.current || !backgroundRef.current || !parallaxTextRef.current) return;

    const wrapper = wrapperRef.current;
    const background = backgroundRef.current;
    const parallaxText = parallaxTextRef.current;
    const words = wordRefs.current;

    // Set initial state
    gsap.set(background, { y: 0 });
    if (floatingLabelRef.current) {
      gsap.set(floatingLabelRef.current, { scale: 0, opacity: 0 });
    }

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
          onUpdate: () => {
            // Active word highlight logic
            const centerY = window.innerHeight / 2;
            words.forEach((word) => {
              if (!word) return;
              const rect = word.getBoundingClientRect();
              const wordCenter = rect.top + rect.height / 2;
              const distance = Math.abs(centerY - wordCenter);
              const maxDistance = 250; // Range to be considered "active"

              if (distance < maxDistance) {
                // Calculate intensity based on distance (0 to 1)
                const intensity = 1 - (distance / maxDistance);

                gsap.to(word, {
                  scale: 1 + (0.1 * intensity), // Scale up slightly
                  opacity: 0.1 + (0.9 * intensity), // Opacity from 0.1 to 1
                  filter: `blur(${5 * (1 - intensity)}px)`, // Blur from 5px to 0px
                  color: `rgba(0, 0, 0, ${intensity})`, // Fade in fill color
                  duration: 0.2,
                  overwrite: 'auto'
                });
              } else {
                gsap.to(word, {
                  scale: 1,
                  opacity: 0.1,
                  filter: 'blur(5px)',
                  color: 'rgba(0, 0, 0, 0)',
                  duration: 0.2,
                  overwrite: 'auto'
                });
              }
            });
          }
        },
      }
    );

    // Mouse Parallax Effect for background words
    const handleParallaxMouseMove = (e: MouseEvent) => {
      // Animate the words individually for a cooler effect
      words.forEach((word, i) => {
        if (!word) return;
        const depth = (i % 2 === 0 ? 1 : -1) * 30; // Alternate directions
        const x = (e.clientX / window.innerWidth - 0.5) * depth;

        gsap.to(word, {
          x: x,
          duration: 1,
          ease: 'power2.out'
        });
      });
    };

    window.addEventListener('mousemove', handleParallaxMouseMove);

    return () => {
      bgTrigger.kill();
      textTrigger.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('mousemove', handleParallaxMouseMove);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (floatingLabelRef.current) {
      // Get the bounding rectangle of the container
      const rect = e.currentTarget.getBoundingClientRect();
      // Calculate x and y relative to the container with an offset
      const x = e.clientX - rect.left + 20;
      const y = e.clientY - rect.top + 20;

      gsap.to(floatingLabelRef.current, {
        x: x,
        y: y,
        duration: 0.1,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseEnter = () => {
    if (floatingLabelRef.current) {
      gsap.to(floatingLabelRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    }
  };

  const handleMouseLeave = () => {
    if (floatingLabelRef.current) {
      gsap.to(floatingLabelRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  };

  const handleClick = () => {
    router.push('/contact');
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <section className={styles.heroSection}>
        <div ref={backgroundRef} className={styles.background}>
          <div className={styles.verticalLine} style={{ left: '10%' }}></div>
          <div className={styles.verticalLine} style={{ right: '10%' }}></div>
        </div>

        <div ref={parallaxTextRef} className={styles.parallaxContainer}>
          {ScrollPin.backgroundText.map((text, i) => (
            <span
              key={text}
              ref={(el) => { wordRefs.current[i] = el; }}
              className={styles.bgText}
            >
              {text}
            </span>
          ))}
        </div>

        <div
          className={styles.textContainer}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <div ref={floatingLabelRef} className={styles.floatingLabel}>
            {ScrollPin.floatingLabel}
          </div>
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