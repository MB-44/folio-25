'use client'
import { useRef, useEffect } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { ScrollTrigger } from 'gsap/all';
import { motion } from 'framer-motion';
import Image from 'next/image'
import gsap from 'gsap';
import { slideUp } from './animation';
import { HackerText } from "@/components";
import  Header  from "@/components/header";
import styles from './style.module.css'

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sliderContainer = useRef<HTMLDivElement | null>(null);

  let xPercent = 0;
  let direction = -1;

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
        x: () => -window.innerWidth * 0.6, // 0.3   
        ease: 'none',
        scrollTrigger: {
          trigger: sliderContainer.current,  
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.15 // 0.5 - 1
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
    if(xPercent < -100){
      xPercent = 0;
    }
    else if(xPercent > 0){
      xPercent = -100;
    }
    gsap.set(firstText.current, {xPercent: xPercent})
    gsap.set(secondText.current, {xPercent: xPercent})
    requestAnimationFrame(animate);
      xPercent -= 0.03 * direction;
  }

  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.landing}>
      <Header />
  
      <div className={styles.bg}>
        <Image 
          src="/images/animated-wallpaper.png"
          fill={true}
          alt="background"
        />
      </div>

      <div className={styles.hangerOverlay}>
        <div className={styles.hanger}>
        <p className={styles.hangerText}>
          <span onMouseEnter={handleTextHover}><HackerText text="From"/></span><br />
          <span onMouseEnter={handleTextHover}><HackerText text="Sri Lanka"/></span>
        </p>

        <svg
          className={styles.hangerSvg}
          width="300"
          height="121"
          viewBox="0 0 300 121"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <g fill="#1C1D20">
            <path d="M239.633657,0 C272.770742,1.0182436e-15 299.633657,26.862915 299.633657,60 C299.633657,93.137085 272.770742,120 239.633657,120 L0,120 L0,0 L239.633657,0 Z M239.633657,18.7755102 C216.866,18.7755102 198.409167,37.232343 198.409167,60 C198.409167,82.767657 216.866,101.22449 239.633657,101.22449 C262.401314,101.22449 280.858147,82.767657 280.858147,60 C280.858147,37.232343 262.401314,18.7755102 239.633657,18.7755102 Z"/>
          </g>
        </svg>

        <div className={styles.digitalBall}>
          <div className={styles.digitalBallOverlay} />
            <div className={styles.globe}>
              <div className={styles.globeWrap}>
                <div className={styles.circle} />
                <div className={styles.circle} />
                <div className={styles.circle} />
                <div className={styles.circleHor} />
                <div className={styles.circleHorMiddle} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: header mini-block (arrow + h4) */}
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
            <h4 className={styles.subheading}>
              <p onMouseEnter={handleTextHover}>
                <HackerText text="Freelance" />
              </p>
              <p onMouseEnter={handleTextHover}>
                <HackerText text="Creative Developer" />
              </p>
            </h4>
          </div>
        </div>
      </div>
      {/* END NEW */}

      <div ref={sliderContainer} className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>Menath Lakvindu -</p>
          <p ref={secondText}>Menath Lakvindu -</p>
        </div>
      </div>

      {/* <div data-scroll data-scroll-speed={0.1} className={styles.description}>
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
        </svg>
        <p onMouseEnter={handleTextHover}><HackerText text='Freelance'/></p>
        <p onMouseEnter={handleTextHover}><HackerText text='Creative Developer'/></p>
      </div> */}
    </motion.main>
  )
}
