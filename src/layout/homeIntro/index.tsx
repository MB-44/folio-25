'use client';

import { useEffect, useRef } from 'react';
import styles from './style.module.css';

type Props = {
  headline?: string;
  subtext?: string;
  ctaHref?: string;
  ctaText?: string;
};

function useInViewOnce<T extends Element>(margin = '-12% 0px', threshold = 0.2) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let seen = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !seen) {
          el.classList.add(styles.in);
          seen = true;
          io.disconnect();
        }
      },
      { root: null, rootMargin: margin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, threshold]);
  return ref;
}

function Magnetic({
  children,
  strength = 0.45,
  spring = 0.12,
  className = '',
}: {
  children: React.ReactNode;
  strength?: number;
  spring?: number;
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const over = useRef(false);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const onMove = (e: MouseEvent) => {
      const rect = outer.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      target.current.x = (mx - cx) * strength;
      target.current.y = (my - cy) * strength;
    };
    const onEnter = () => { over.current = true; };
    const onLeave = () => {
      over.current = false;
      target.current.x = 0;
      target.current.y = 0;
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * (over.current ? 0.18 : spring);
      current.current.y += (target.current.y - current.current.y) * (over.current ? 0.18 : spring);
      inner.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    outer.addEventListener('mousemove', onMove);
    outer.addEventListener('mouseenter', onEnter);
    outer.addEventListener('mouseleave', onLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      outer.removeEventListener('mousemove', onMove);
      outer.removeEventListener('mouseenter', onEnter);
      outer.removeEventListener('mouseleave', onLeave);
    };
  }, [spring, strength]);

  return (
    <div ref={outerRef} className={`${styles.magnet} ${className}`}>
      <div ref={innerRef} className={styles.magnetInner}>
        {children}
      </div>
    </div>
  );
}

export default function HomeIntro({
  headline = 'Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.',
  subtext = 'The combination of my passion for design, code & interaction positions me in a unique place in the web design world.',
  ctaHref = '/about',
  ctaText = 'About me',
}: Props) {
  const sectionRef = useInViewOnce<HTMLElement>();
  const btnWrapRef = useRef<HTMLDivElement | null>(null);

  // parallax (mimics data-scroll-speed="2")
  useEffect(() => {
    const el = btnWrapRef.current;
    if (!el) return;

    let raf: number | null = null;
    const speedPx = 120; // total travel range

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const h = window.innerHeight || 0;
        if (rect.bottom > 0 && rect.top < h) {
          const v = (h * 0.5 - rect.top) / h; // centered around mid viewport
          const y = v * speedPx;
          el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
        }
        raf = null;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const words = headline.split(' ');

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Intro">
      <div className={styles.containerMedium}>
        <div className={styles.row}>
          <div className={styles.leftCol}>
            <h4 className={styles.headline}>
              {words.map((w, i) => (
                <span className={styles.mask} key={`${w}-${i}`}>
                  <span
                    className={styles.word}
                    style={{ transitionDelay: `${i * 38}ms` }}
                  >
                    {w}&nbsp;
                  </span>
                </span>
              ))}
            </h4>
          </div>

          <div className={styles.rightCol}>
            <p className={styles.subtext}>{subtext}</p>

            <div className={styles.btnParallax} ref={btnWrapRef}>
              <Magnetic strength={0.5} spring={0.14}>
                <a href={ctaHref} className={styles.btnRound} aria-label={ctaText}>
                  <span className={styles.btnFill} />
                  <span className={styles.btnText}>
                    <span className={styles.btnTextInner}>{ctaText}</span>
                  </span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
