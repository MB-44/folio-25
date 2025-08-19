'use client';

import { useEffect, useRef } from 'react';
import styles from './style.module.css';

type Props = {
  headline?: string;
  subtext?: string;
  ctaHref?: string;
  ctaText?: string;
};

export default function HomeIntro({
  headline = 'Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.',
  subtext = 'The combination of my passion for design, code & interaction positions me in a unique place in the web design world.',
  ctaHref = '/about',
  ctaText = 'About me',
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add(styles.in);
      },
      { root: null, rootMargin: '-10% 0px', threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = headline.split(' ');

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.leftCol}>
            <h4 className={styles.headline}>
              {words.map((w, i) => (
                <span className={styles.mask} key={`${w}-${i}`}>
                  <span
                    className={styles.word}
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    {w}&nbsp;
                  </span>
                </span>
              ))}
            </h4>
          </div>

          <div className={styles.rightCol}>
            <p className={styles.subtext}>{subtext}</p>
            <a href={ctaHref} className={styles.btnRound} aria-label={ctaText}>
              <span className={styles.btnInner}>{ctaText}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}