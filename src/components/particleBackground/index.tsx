"use client";

import React, { useEffect, useRef } from "react";
import styles from "./style.module.css";

const ParticlesBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (typeof window === "undefined" || typeof CSS === "undefined") return;
        if (!("paintWorklet" in CSS)) return;

        try {
            const w = window as any;
            if (!w.__ringParticlesLoaded) {
                // same worklet you used before
                // @ts-ignore
                CSS.paintWorklet.addModule(
                    "https://unpkg.com/css-houdini-ringparticles/dist/ringparticles.js"
                );
                w.__ringParticlesLoaded = true;
            }
        } catch {
            // ignore errors
        }

        const el = containerRef.current;
        if (!el) return;

        let isInteractive = false;

        const handleMove = (e: MouseEvent) => {
            if (!isInteractive) {
                el.classList.add(styles.interactive);
                isInteractive = true;
            }

            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;

            el.style.setProperty("--ring-x", String(x));
            el.style.setProperty("--ring-y", String(y));
        };

        const handleOut = () => {
            el.classList.remove(styles.interactive);
            isInteractive = false;
            el.style.setProperty("--ring-x", "50");
            el.style.setProperty("--ring-y", "50");
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseout", handleOut);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseout", handleOut);
        };
    }, []);

    return <div ref={containerRef} className={styles.particlesBackground} />;
};

export default ParticlesBackground;