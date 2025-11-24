'use client';
import { JSX, useEffect, useRef, useState } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { AudioControlButton, Rounded, Magnetic } from "@/components";
import styles from './style.module.css';
import Nav from './nav';

interface HeaderProps {
    theme?: 'light' | 'dark';
}

export default function Header({ theme = 'dark' }: HeaderProps = {}): JSX.Element {
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
        if (isActive) setIsActive(false);
    }, [pathname]);

    useIsomorphicLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const show = () => gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" });
        const hide = () => gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" });
        const hideHeader = () => gsap.set(header.current, { y: -100 });
        const showHeader = () => gsap.set(header.current, { y: 0 });

        const st = ScrollTrigger.create({
            trigger: header.current,
            start: "bottom top",
            end: "bottom top",
            onEnter: () => {
                show();
                hideHeader();
            },
            onLeaveBack: () => {
                hide();
                showHeader();
            }
        });

        if (header.current) {
            const headerBottom = header.current.getBoundingClientRect().bottom + window.scrollY;
            if (window.scrollY >= headerBottom) { show(); hideHeader(); } else { hide(); showHeader(); }
        }

        return () => {
            st.kill();
        };
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
            <div ref={header} className={`${styles.header} ${theme === 'light' ? styles.headerLight : ''}`}>
                <Magnetic>
                    <Link href="/">
                        <div className={styles.logo}>
                            <div className={styles.name}>
                                <p className={styles.codeBy}>Code by</p>
                                <p className={styles.menath}>Menath</p>
                                {/* <p className={styles.baddegama}>Baddegama</p> */}
                            </div>
                        </div>
                    </Link>
                </Magnetic>
                <div className={styles.nav}>
                    <div className={styles.navLinks}>
                        <Magnetic>
                            <div className={styles.el} onMouseEnter={handleNavItemHover}>
                                <Link href="/work">Work</Link>
                                <div className={styles.indicator}></div>
                            </div>
                        </Magnetic>
                        <Magnetic>
                            <div className={styles.el} onMouseEnter={handleNavItemHover}>
                                <Link href="/about">About</Link>
                                <div className={styles.indicator}></div>
                            </div>
                        </Magnetic>
                        <Magnetic>
                            <div className={styles.el} onMouseEnter={handleNavItemHover}>
                                <Link href="/contact">Contact</Link>
                                <div className={styles.indicator}></div>
                            </div>
                        </Magnetic>
                    </div>
                    <div className={styles.audioButtonWrapper}>
                        <AudioControlButton
                            initialPlayState={false}
                            onToggle={handleAudioToggle}
                            loopAudioSrc="/audio/cosmic_drift.mp3"
                            uiSoundSrc="/audio/ui.mp3"
                        />
                    </div>
                </div>
            </div>
            <div ref={button} className={styles.headerButtonContainer}>
                <Rounded onClick={() => { setIsActive(!isActive) }} className={`${styles.button}`}>
                    <Magnetic>
                        <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                    </Magnetic>
                </Rounded>
            </div>
            <AnimatePresence mode="wait">
                {isActive && (
                    <>
                        <div className={styles.backdrop} onClick={() => setIsActive(false)} />
                        <Nav />
                    </>
                )}
            </AnimatePresence>
        </>
    );
}