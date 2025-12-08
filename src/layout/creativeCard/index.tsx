"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// @ts-ignore – SplitText is a GSAP plugin without perfect TS types
import SplitText from "gsap/SplitText";
// @ts-ignore – ScrambleText plugin
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

import styles from "./style.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

const CreativeCardSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const techRef = useRef<HTMLHeadingElement | null>(null);
    const bottomRowRef = useRef<HTMLDivElement | null>(null);
    const plusRef = useRef<SVGPathElement | null>(null);

    useEffect(() => {
        if (
            !sectionRef.current ||
            !cardRef.current ||
            !headingRef.current ||
            !techRef.current ||
            !bottomRowRef.current
        ) {
            return;
        }

        const ctx = gsap.context(() => {
            // === SplitText for "CREATIVITY" ===
            const split = new SplitText(headingRef.current!, { type: "chars" });
            const chars = split.chars as HTMLElement[];

            // Pin whole section (original .about_card_sticky)
            ScrollTrigger.create({
                trigger: sectionRef.current,
                pin: true,
                start: "top top",
                end: "bottom bottom",
            });

            // Heading reveal
            gsap.set(chars, { yPercent: -100 });

            gsap.to(chars, {
                yPercent: 0,
                duration: 0.7,
                stagger: { amount: 0.2 },
                ease: "ease-primary",
                scrollTrigger: {
                    trigger: bottomRowRef.current, // original .about_h1_t
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            });

            // Scramble text for </TECHNICALITY>
            ScrollTrigger.create({
                trigger: techRef.current,
                start: "top 40%",
                end: "bottom 50%",
                onEnter: () => {
                    gsap.to(techRef.current, {
                        duration: 1.6,
                        scrambleText: {
                            chars: "+_1x><*^0!~`",
                            text: "</TECHNICALITY>",
                            tweenLength: true,
                            revealDelay: 0.4,
                            speed: 0.1,
                        },
                    });
                },
                onLeaveBack: () => {
                    gsap.to(techRef.current, {
                        duration: 0.8,
                        scrambleText: {
                            chars: "+_1x><*^0!~`",
                            text: "</ />", // exactly like the original
                            speed: 0.2,
                        },
                    });
                },
            });

            // Card growth (width/height)
            gsap.to(cardRef.current, {
                width: "100%",
                height: "100%",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    scrub: true,
                    start: "top top",
                    end: "bottom bottom",
                },
            });

            // Plus icon rotation
            if (plusRef.current) {
                gsap.to(plusRef.current, {
                    rotation: 180,
                    transformOrigin: "50% 50%",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        scrub: true,
                        start: "top top",
                        end: "bottom bottom",
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.root}>
            <div className={styles.wrap}>
                <div ref={cardRef} className={styles.card}>
                    {/* Eyebrows */}
                    <div className={styles.eyebrows}>
                        <div className={styles.eyebrowRow}>
                            <p className={styles.mono}>chapter 1: </p>
                            <p className={styles.mono}>about</p>
                        </div>
                        <div className={styles.eyebrowRow}>
                            <p className={styles.mono}>Why creative websites?</p>
                            <p className={styles.mono}>←</p>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className={styles.content}>
                        <div className={styles.headingRow}>
                            <h2 ref={headingRef} className={styles.creativity}>
                                CREATIVITY
                            </h2>
                        </div>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            viewBox="0 0 95 95"
                            fill="none"
                        >
                            <rect
                                width="94.7523"
                                height="94.7523"
                                rx="47.3762"
                                fill="currentColor"
                            />
                            <path
                                ref={plusRef}
                                d="M45.6076 48.9678H22.8529V45.6666H45.6076L45.4897 21.8508H49.2625L49.1446 45.6666H71.8993V48.9678H49.1446L49.2625 72.9015H45.4897L45.6076 48.9678Z"
                                fill="currentColor"
                            />
                        </svg>

                        <div ref={bottomRowRef} className={styles.bottomRow}>
                            <h2
                                ref={techRef}
                                className={`${styles.creativity} ${styles.technicality}`}
                            >
                                &nbsp;&lt;_&lt;
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreativeCardSection;