"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import styles from "./style.module.css";

declare global {
  interface Window {
    SplitText?: any;
  }
}

type ParallaxEffectProps = {
  children: React.ReactNode;
  smooth?: number;
};

export default function ParallaxEffect({ children, smooth = 1 }: ParallaxEffectProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current as Element,
      content: contentRef.current as Element,
      smooth,
      normalizeScroll: true,
      ignoreMobileResize: true,
      effects: true
    });

    const q = gsap.utils.selector(contentRef);
    gsap.set(q(".heading"), { yPercent: -150, opacity: 1 });

    if (window.SplitText) {
      const targets = q("[data-stagger-chars]");
      targets.forEach((el) => {
        const split = new window.SplitText(el, { type: "words,chars" });
        const chars: HTMLElement[] = split.chars;
        chars.forEach((char, i) => {
          smoother.effects(char, { speed: 1, lag: (i + 1) * 0.08 });
        });
      });
    }

    return () => {
      smoother.kill();
    };
  }, [smooth]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <section ref={contentRef} className={styles.content}>
        {children}
      </section>
    </div>
  );
}