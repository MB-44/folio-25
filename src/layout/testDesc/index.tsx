import React, { useEffect, useRef } from "react";
import styles from "./style.module.css";

type Props = {
  scrollerRef?: React.RefObject<HTMLElement>; // pass the locomotive container
  animate?: boolean;
};

const AboutSection: React.FC<Props> = ({ scrollerRef, animate = true }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!animate) return;

    let gsap: any, ScrollTrigger: any, SplitText: any, ScrambleText: any;
    let ctx: any;

    (async () => {
      try {
        gsap = (await import("gsap")).default;
        ScrollTrigger = (await import("gsap/dist/ScrollTrigger")).default;
        gsap.registerPlugin(ScrollTrigger);

        // Optional: Club plugins (if present). If not, we gracefully fall back.
        try {
          SplitText = (await import("gsap/SplitText")).default;
          ScrambleText = (await import("gsap/ScrambleTextPlugin")).default;
          gsap.registerPlugin(SplitText, ScrambleText);
        } catch {
          // plugins not available; we'll run a basic fade instead
        }

        ctx = gsap.context(() => {
          const scroller = scrollerRef?.current || undefined;

          // If SplitText is available, do the original-style char reveal
          if (SplitText) {
            const split = new SplitText(pRef.current!, {
              type: "words,chars",
              reduceWhiteSpace: false,
            });

            const highlights = gsap.utils.toArray(
              pRef.current!.querySelectorAll("span")
            );

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: rootRef.current,
                scroller,                 // CRUCIAL: use same scroller
                start: "top 85%",
                end: "bottom 10%",
                once: true,
              },
            });

            if (ScrambleText && highlights.length) {
              tl.from(highlights, {
                duration: 0.7,
                scrambleText: { text: (i: number, el: HTMLElement) => el.innerText, chars: "upperAndLowerCase" },
                ease: "power2.out",
                stagger: 0.1,
              });
            }

            tl.from(
              split.chars,
              {
                opacity: 0,
                yPercent: 20,
                duration: 0.6,
                ease: "power3.out",
                stagger: { each: 0.006, from: "start" },
                clearProps: "all",
              },
              ScrambleText ? "-=0.25" : 0
            );
          } else {
            // Fallback: simple fade/slide of the whole paragraph
            gsap.from(pRef.current!, {
              opacity: 0,
              y: 20,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: rootRef.current,
                scroller,
                start: "top 85%",
                once: true,
              },
            });
          }
        }, rootRef);
      } catch {
        /* no-op */
      }
    })();

    return () => ctx?.revert?.();
  }, [animate, scrollerRef]);

  return (
    <div ref={rootRef} className={styles.aboutWrap} aria-labelledby="about-title">
      <p ref={pRef} className={styles.aboutText}>
        I’m Stas Bondar, a <span>Creative Developer</span> with a passion for bringing ideas to life through design and technology. My journey as a <span>Creative Developer</span> started after a career as a professional athlete. Competing taught me discipline, focus, and how to handle challenges. These are skills I use every day as a <span>Creative Developer</span>. Whether on the tennis court or in web development, precision and attention to detail are key. Every move counts, just like every line of code or design element. When I was a child, I dreamed of becoming an Olympic champion. I also wanted to be a professional cyber sportsman and win an international championship. Gaming has always been a big part of my life. I’ve spent over 4,000 hours playing Dota 2, perfecting strategies and learning teamwork. Now, I enjoy exploring immersive worlds like Cyberpunk 2077, where creativity and technology come together in extraordinary ways. I’m also a huge fan of Harry Potter and The Witcher, which inspire me with their rich storytelling and imagination.
        I’m an open-minded person who thrives on new experiences, meeting people from different walks of life, and traveling the globe. Every new place I visit and every new person I meet broadens my perspective and sparks fresh ideas that I bring into my work as a <span>Creative Developer</span>. One of my dreams is to own a German Shepherd one day, a loyal companion to join me on my adventures.
        As a <span>Creative Developer</span>, I’ve had the privilege of working with creatives from all over the world, collaborating with individuals and studios alike. I believe the best ideas come from combining diverse perspectives and approaches. Whether it’s brainstorming innovative solutions or refining the smallest details, I love the energy and creativity that comes from teamwork.
        I channel my determination into creating smooth and engaging digital experiences. Transitioning from an athlete to a <span>Creative Developer</span> felt natural because both fields require adaptability, precision, and a willingness to constantly improve. Like sports, web development is always evolving, presenting new challenges and opportunities. That’s what excites me and motivates me to stay ahead of trends and technologies as a <span>Creative Developer</span>.
        My love for tennis and Formula 1 also fuels my creativity. There is something amazing about the speed, strategy, and precision of Formula 1, and I bring that same energy to my work as a <span>Creative Developer</span>. Whether it’s crafting a stunning website, coding an interactive feature, or optimizing a digital experience, I approach every project with passion and focus.
        As a <span>Creative Developer</span>, my goal is to create digital solutions that stand out. I’m passionate about blending creativity with technical skill to design websites that are not only visually stunning but also highly functional. I believe every project has the potential to tell a story, solve a problem, or create an impact. From crafting a compelling narrative through design to optimizing user experience for engagement, I strive to deliver work that exceeds expectations.
        Being a <span>Creative Developer</span> means more than just writing code or designing interfaces. It’s about solving problems, collaborating with clients, and delivering results that make a difference. I draw on my background as an athlete, where I learned the value of teamwork, resilience, and the drive to keep improving. These traits now shape how I tackle challenges, manage projects, and push boundaries to create something truly impactful.
        If you’re looking for a <span>Creative Developer</span> who is passionate, open-minded, and committed to excellence, we’re a great match. Let’s bring your ideas to life. Whether you’re an individual or a studio, I’m here to turn your vision into reality, blending creativity and technology to create something extraordinary. Together, we can push the boundaries of what’s possible and create digital experiences that leave a lasting impression.
      </p>
    </div>
  );
};

export default AboutSection;
