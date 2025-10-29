import React, { useEffect, useRef, useState, forwardRef, JSX } from "react";
import styles from "./style.module.css";

type Animation =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out";

type RevealProps<T extends keyof JSX.IntrinsicElements = "div"> = {
  /** Element tag to render (div, section, li, etc.) */
  as?: T;
  /** Extra classNames */
  className?: string;
  /** Children content */
  children: React.ReactNode;
  /** IntersectionObserver threshold */
  threshold?: number | number[];
  /** IntersectionObserver rootMargin */
  rootMargin?: string;
  /** If true, reveals once and stays shown */
  once?: boolean;
  /** Animation variant */
  animation?: Animation;
  /** Transition duration in ms */
  duration?: number;
  /** Transition delay in ms */
  delay?: number;
  /** Translate/scale distance in px (or unitless for zoom) */
  distance?: number;
} & Omit<JSX.IntrinsicElements[T], "ref" | "children" | "className">;

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

const Reveal = forwardRef<HTMLElement, RevealProps>((props, refFromParent) => {
  const {
    as,
    className,
    children,
    threshold = 0.1,
    rootMargin = "0px 0px -5% 0px",
    once = false, 
    animation = "fade-up",
    duration = 700,
    delay = 0,
    distance = 40,
    ...rest
  } = props as RevealProps;

  const Tag = (as || "div") as any;

  const localRef = useRef<HTMLElement | null>(null);
  const mergedRef = (node: HTMLElement | null) => {
    localRef.current = node;
    if (typeof refFromParent === "function") refFromParent(node as HTMLElement);
    else if (refFromParent && typeof refFromParent === "object") {
      (refFromParent as React.MutableRefObject<HTMLElement | null>).current = node;
    }
  };

  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = localRef.current;
    if (!el || typeof window === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  const styleVars: React.CSSProperties = {
    // ms → s in CSS
    ["--reveal-duration" as any]: `${duration}ms`,
    ["--reveal-delay" as any]: `${delay}ms`,
    ["--reveal-distance" as any]: `${distance}px`,
  };

  return (
    <Tag
      ref={mergedRef}
      className={cx(
        styles.reveal,
        styles[animation.replace("-", "")],
        inView && styles.inView,
        className
      )}
      style={styleVars}
      {...rest}
    >
      {children}
    </Tag>
  );
});

Reveal.displayName = "Reveal";
export default Reveal;