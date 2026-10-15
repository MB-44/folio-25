'use client'
import gsap from 'gsap';
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/all';
import { motion } from 'framer-motion';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import styles from './style.module.css'
import { slideUp } from './animation';


// Typewriter hook: returns the currently displayed string
function useTypewriter(fullText: string, startDelay = 0, speed = 60) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(fullText.slice(0, i));
        if (i >= fullText.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [fullText, startDelay, speed]);

  return { displayed, done };
}

// Typewriter span: types out text, then enables HackerText on hover
function TypewriterText({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  const { displayed, done } = useTypewriter(text, startDelay);
  const spanRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseOver = () => {
    if (!done || !spanRef.current) return;
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!spanRef.current) return;
      spanRef.current.innerText = text
        .split("")
        .map((letter, index) => {
          if (index < Math.floor(iteration)) return text[index];
          if (letter.match(/[a-z]/)) return charSet.toLowerCase()[Math.floor(Math.random() * charSet.length)];
          if (letter.match(/[A-Z]/)) return charSet[Math.floor(Math.random() * charSet.length)];
          return letter;
        })
        .join("");
      if (iteration >= text.length) clearInterval(intervalRef.current!);
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <span
      ref={spanRef}
      style={{ cursor: 'pointer', display: 'inline-block', minWidth: done ? undefined : '1ch' }}
      onMouseOver={handleMouseOver}
      data-value={text}
    >
      {displayed}
      {!done && <span style={{ opacity: 0.7 }}>|</span>}
    </span>
  );
}

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sliderContainer = useRef<HTMLDivElement | null>(null);

  let xPercent = 0;
  let direction = -1;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  useEffect(() => {
    audioRef.current = new Audio('/audio/ui_hover.mp3');

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleTextHover = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(slider.current, {
        x: () => -window.innerWidth * 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: sliderContainer.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 0.25,
        onUpdate: (e) => { direction = e.direction * -1; }
      });
      requestAnimationFrame(animate);
    });

    return () => {
      ctx.revert();
      ScrollTrigger.killAll();
    };
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    }
    else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent })
    gsap.set(secondText.current, { xPercent: xPercent })
    requestAnimationFrame(animate);
    xPercent -= 0.03 * direction;
  }

  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.landing}>

      <div className={styles.bg}>
        <Image
          src="/images/test_wallpaper.jpg"
          fill={true}
          alt="background"
        />
      </div>

      <div className={styles.headerContainer}>
        <div className={styles.headerRow}>
          <div className={styles.headerCol}>
            <div className={styles.headerAbove}>
              <div className={styles.arrowBig}>
                <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <g fill="none" fillRule="evenodd">
                    <g transform="translate(-1019, -279)" stroke="#FFFFFF" strokeWidth="1.5">
                      <g transform="translate(1026, 286) rotate(90) translate(-1026, -286) translate(1020, 280)">
                        <polyline points="2.76923077 0 12 0 12 9.23076923"></polyline>
                        <line x1="12" y1="0" x2="0" y2="12"></line>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <h4 className={styles.subheading} onMouseEnter={handleTextHover}>
              <p>
                <TypewriterText text="Freelance" startDelay={800} />
              </p>
              <p>
                <TypewriterText text="Creative" startDelay={1400} />{' '}
                <TypewriterText text="Developer" startDelay={1900} />
              </p>
            </h4>
          </div>
        </div>
      </div>

      <div ref={sliderContainer} className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>Menath Lakvindu -</p>
          <p ref={secondText}>Menath Lakvindu -</p>
        </div>
      </div>
    </motion.main>
  )
}

