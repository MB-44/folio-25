"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  smoothing?: number;   // how laggy the trail is (0–1)
  lineWidth?: number;   // stroke thickness
  glow?: number;        // glow softness
  color?: string;       // trail color
  hideNativeCursor?: boolean;
};

const FlowCursor: React.FC<Props> = ({
  smoothing = 0.18,
  lineWidth = 3,
  glow = 18,
  color = "rgba(255, 80, 80, 0.9)", // light red default
  hideNativeCursor = false,
}) => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const dprRef = useRef<number>(1);

  const mx = useRef(0), my = useRef(0);   // real mouse
  const vx = useRef(0), vy = useRef(0);   // virtual smoothed
  const pmx = useRef(0), pmy = useRef(0); // previous virtual

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
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let w = 0, h = 0;

    const resize = () => {
      dprRef.current = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dprRef.current);
      canvas.height = Math.floor(h * dprRef.current);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // initialize positions
    const cx = w / 2, cy = h / 2;
    mx.current = cx; my.current = cy;
    vx.current = cx; vy.current = cy;
    pmx.current = cx; pmy.current = cy;

    const loop = () => {
      ctx.clearRect(0, 0, w, h); // clear every frame

      // smooth lerp
      vx.current += (mx.current - vx.current) * smoothing;
      vy.current += (my.current - vy.current) * smoothing;

      // glowing stroke
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = glow;
      ctx.lineWidth = lineWidth;

      const midX = (pmx.current + vx.current) / 2;
      const midY = (pmy.current + vy.current) / 2;

      ctx.beginPath();
      ctx.moveTo(pmx.current, pmy.current);
      ctx.quadraticCurveTo(pmx.current, pmy.current, midX, midY);
      ctx.quadraticCurveTo(midX, midY, vx.current, vy.current);
      ctx.stroke();

      pmx.current = vx.current;
      pmy.current = vy.current;

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, color, glow, lineWidth, smoothing]);

  if (!mounted) return null;

  return createPortal(
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        pointerEvents: "none",
      }}
    />,
    document.body
  );
};

export default FlowCursor;