'use client';
import { JSX, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../common/rounded';
import Magnetic from '../common/magnetic';
import AudioControlButton from '@/_components/common/audioButton';
import { Copyright } from 'lucide-react';

export default function Header(): JSX.Element {
    const header = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const pathname = usePathname();
    const button = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio('/audio/ui_magbutton.mp3'); 
        
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if(isActive) setIsActive(false);
    }, [pathname]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(button.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                onLeave: () => {gsap.to(button.current, {scale: 1, duration: 0.25, ease: "power1.out"})},
                onEnterBack: () => {
                    gsap.to(button.current, {scale: 0, duration: 0.25, ease: "power1.out"});
                    setIsActive(false);
                }
            }
        });
    }, []);

    const handleNavItemHover = (): void => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };

    const handleAudioToggle = (isPlaying: boolean): void => {
        console.log("Background audio is now:", isPlaying ? "playing" : "paused");
    };

    return (
        <>
        <div ref={header} className={styles.header}>
            <div className={styles.logo}>
                <p className={styles.copyright}>©</p>
                <div className={styles.name}>
                    <p className={styles.codeBy}>Code by</p>
                    <p className={styles.menath}>Menath</p>
                    <p className={styles.baddegama}>Baddegama</p>
                </div>
            </div>
            <div className={styles.nav}>
                <Magnetic>
                    <div className={styles.el} onMouseEnter={handleNavItemHover}>
                        <a>Work</a>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
                <Magnetic>
                    <div className={styles.el} onMouseEnter={handleNavItemHover}>
                        <a>About</a>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
                <Magnetic>
                    <div className={styles.el} onMouseEnter={handleNavItemHover}>
                        <a>Contact</a>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
                <div className={styles.audioButtonWrapper}>
                    <AudioControlButton 
                        initialPlayState={false}
                        onToggle={handleAudioToggle}
                        loopAudioSrc="/audio/loop.mp3"
                        uiSoundSrc="/audio/ui.mp3"
                    />
                </div>
            </div>
        </div>
        <div ref={button} className={styles.headerButtonContainer}>
            <Rounded onClick={() => {setIsActive(!isActive)}} className={`${styles.button}`}>
                <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
            </Rounded>
        </div>
        <AnimatePresence mode="wait">
            {isActive && <Nav />}
        </AnimatePresence>
        </>
    );
}