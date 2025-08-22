"use client";

import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  smoothing?: number;     // 0–1 (higher = snappier)
  dotSize?: number;       // px
  ringSize?: number;      // px
  hideNativeCursor?: boolean;
};

const CursorFlow: React.FC<Props> = ({
  smoothing = 0.12,
  dotSize = 8,
  ringSize = 28,
  hideNativeCursor = false,
}) => {
  const [mounted, setMounted] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mx = useRef(0);
  const my = useRef(0);

  const vx = useRef(0);
  const vy = useRef(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    if (hideNativeCursor) {
      const prev = document.body.style.cursor;
      document.body.style.cursor = "none";
      return () => { document.body.style.cursor = prev; };
    }
  }, [hideNativeCursor]);

  useEffect(() => {
    if (!mounted) return;

    // Start visible immediately, position at center
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mx.current = cx; my.current = cy; vx.current = cx; vy.current = cy;

    const setTransforms = () => {
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mx.current - dotSize / 2}px, ${my.current - dotSize / 2}px)`;
        dotRef.current.style.opacity = "1";
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${vx.current - ringSize / 2}px, ${vy.current - ringSize / 2}px)`;
        ringRef.current.style.opacity = "1";
      }
    };
    setTransforms();

    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const loop = () => {
      // lerp the ring
      vx.current += (mx.current - vx.current) * smoothing;
      vy.current += (my.current - vy.current) * smoothing;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mx.current - dotSize / 2}px, ${my.current - dotSize / 2}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${vx.current - ringSize / 2}px, ${vy.current - ringSize / 2}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    // magnet hover (optional)
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cursor="magnet"]');
      if (!dotRef.current || !ringRef.current) return;
      ringRef.current.style.transition = "transform 0.18s ease, opacity 0.2s ease";
      dotRef.current.style.transition  = "transform 0.18s ease, opacity 0.2s ease";
      if (el) {
        ringRef.current.style.transform += " scale(1.35)";
        dotRef.current.style.transform  += " scale(0.82)";
      }
    };
    const onOut = () => {
      if (!dotRef.current || !ringRef.current) return;
      ringRef.current.style.transition = "transform 0.25s ease, opacity 0.2s ease";
      dotRef.current.style.transition  = "transform 0.25s ease, opacity 0.2s ease";
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    // keep centered on resize
    const onResize = () => {
      const nx = window.innerWidth / 2;
      const ny = window.innerHeight / 2;
      mx.current = nx; my.current = ny; vx.current = nx; vy.current = ny;
      setTransforms();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [mounted, smoothing, dotSize, ringSize]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* trailing ring (lerped) */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.45)",
          // If your background is very light, try "normal" instead of "difference".
          mixBlendMode: "difference",
          pointerEvents: "none",
          // put this above any preloader/header
          zIndex: 2147483646,
          opacity: 0,
          willChange: "transform",
          transition: "opacity 0.25s ease",
        }}
      />
      {/* crisp dot at true mouse pos */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          background: "#ffffff",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 2147483647,
          opacity: 0,
          willChange: "transform",
          transition: "opacity 0.25s ease",
        }}
      />
    </>,
    document.body
  );
};

export default CursorFlow;