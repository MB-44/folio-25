'use client'
import gsap from 'gsap';
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/all';
import { motion, AnimatePresence } from 'framer-motion';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { HackerText } from "@/components";
import styles from './style.module.css'
import { slideUp } from './animation';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.landing}>

      <div className={styles.bg}>
        <Image
          src="/images/ferrari-wallpaper.jpg"
          fill={true}
          alt="background"
        />
      </div>

      <div className={styles.centerContainer}>
        <div className={styles.smallText}>
          <span onMouseEnter={handleTextHover}><HackerText text="Creative developer" /></span>
        </div>
        <h1 className={styles.largeText}>
          <span className={styles.serifText}>Creating the</span> <br />unexpected
        </h1>
        <div className={styles.commandLineTrigger}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            {isHovered ? (
              <motion.span
                key="hover"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={styles.commandLineTriggerText}
              >
                Press &quot;/&quot; for
              </motion.span>
            ) : (
              <motion.span
                key="default"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={styles.commandLineTriggerText}
              >
                ( Don&apos;t hover here )
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

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

    </motion.main>
  )
}