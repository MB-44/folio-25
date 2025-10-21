import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./smileUnlock.module.css";

type SmileUnlockProps = {
  backgroundImage?: string;
  onUnlock?: () => void;
  autoShowButtonMs?: number;
};

type Point = { x: number; y: number; t: number };

const DEFAULT_BG = "/images/gray-bg.jpg";

export default function SmileUnlock({
  backgroundImage = DEFAULT_BG,
  onUnlock,
  autoShowButtonMs = 3000,
}: SmileUnlockProps) {
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const drawingRef = useRef(false);
  const trailRef = useRef<Point[]>([]);
  const lastPosRef = useRef<Point | null>(null);
  const devicePixelRatioRef = useRef<number>(1);

  const thresholds = useMemo(
    () => ({
      minSpanRatio: 0.35,
      minDepthPx: 24,
      minPoints: 30,
      maxDurationMs: 8000,
    }),
    []
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    devicePixelRatioRef.current = dpr;

    const { width, height } = container.getBoundingClientRect();
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(0,0,0,0.9)";
  }, []);

  useEffect(() => {
    resizeCanvas();
    const handle = () => resizeCanvas();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [resizeCanvas]);

  useEffect(() => {
    if (unlocked) return;
    const id = window.setTimeout(() => setShowButton(true), autoShowButtonMs);
    return () => clearTimeout(id);
  }, [autoShowButtonMs, unlocked]);

  const getPos = useCallback((e: PointerEvent): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      t: performance.now(),
    };
  }, []);

  const startDraw = useCallback((e: PointerEvent) => {
    if (unlocked) return;
    drawingRef.current = true;
    trailRef.current = [];
    lastPosRef.current = null;

    const pt = getPos(e);
    trailRef.current.push(pt);
    lastPosRef.current = pt;
  }, [getPos, unlocked]);

  const moveDraw = useCallback((e: PointerEvent) => {
    if (!drawingRef.current || unlocked) return;
    const ctx = ctxRef.current;
    const last = lastPosRef.current;
    const cur = getPos(e);

    trailRef.current.push(cur);

    if (ctx && last) {
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(cur.x, cur.y);
      ctx.stroke();
    }
    lastPosRef.current = cur;
  }, [getPos, unlocked]);

  const endDraw = useCallback(() => {
    if (!drawingRef.current || unlocked) return;
    drawingRef.current = false;
    lastPosRef.current = null;

    if (detectSmile(trailRef.current, canvasRef.current!, thresholds)) {
      doUnlock();
    }
  }, [thresholds, unlocked]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || unlocked) return;

    canvas.addEventListener("pointerdown", startDraw);
    canvas.addEventListener("pointermove", moveDraw);
    window.addEventListener("pointerup", endDraw);

    const preventScrollOnTouch = (e: TouchEvent) => {
      if (drawingRef.current) e.preventDefault();
    };
    canvas.addEventListener("touchmove", preventScrollOnTouch, { passive: false });

    return () => {
      canvas.removeEventListener("pointerdown", startDraw);
      canvas.removeEventListener("pointermove", moveDraw);
      window.removeEventListener("pointerup", endDraw);
      canvas.removeEventListener("touchmove", preventScrollOnTouch);
    };
  }, [endDraw, moveDraw, startDraw, unlocked]);

  const doUnlock = useCallback(() => {
    setUnlocked(true);
    window.setTimeout(() => onUnlock?.(), 350);
  }, [onUnlock]);

  const handleButton = useCallback(() => {
    doUnlock();
  }, [doUnlock]);

  useEffect(() => {
    if (!unlocked) return;
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [unlocked]);

  return (
    <div className={styles.root}>
      {/* Background image */}
      <div
        className={styles.background}
        style={{ backgroundImage: `url("${backgroundImage}")` }}
        aria-hidden
      />

      {/* LOCKED OVERLAY (gray scrim with two holes) */}
      {!unlocked && (
        <svg className={styles.maskSvg} aria-hidden>
          <defs>
            <mask id="eyesMask">
              <rect width="100%" height="100%" fill="white" />
              <circle cx="35%" cy="42%" r="7vmin" fill="black" />
              <circle cx="65%" cy="42%" r="7vmin" fill="black" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="rgba(28,29,32,0.92)" mask="url(#eyesMask)" />
        </svg>
      )}

      {/* Interactive lock layer (canvas + hints) */}
      {!unlocked && (
        <div className={`${styles.lock} ${styles.penActive}`} ref={containerRef}>
          <div className={styles.pen} aria-hidden>
            <div className={styles.penInner} />
          </div>
          <div className={styles.trace}>
            <canvas ref={canvasRef} className={styles.canvas} />
          </div>
          <div className={styles.mobileHint} aria-live="polite">
            Draw a smile to unlock...
          </div>
          <button
            type="button"
            className={`${styles.unlockBtn} ${showButton ? styles.show : ""}`}
            onClick={handleButton}
            aria-label="Unlock without drawing"
          >
            or, click here!
          </button>
        </div>
      )}
    </div>
  );
}

function detectSmile(points: Point[], canvas: HTMLCanvasElement, cfg: {
  minSpanRatio: number; minDepthPx: number; minPoints: number; maxDurationMs: number;
}): boolean {
  if (points.length < cfg.minPoints) return false;
  const duration = points[points.length - 1].t - points[0].t;
  if (duration > cfg.maxDurationMs) return false;

  const simplified = simplify(points, 2);
  const xs = simplified.map(p => p.x);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const spanX = maxX - minX;
  if (spanX < canvas.clientWidth * cfg.minSpanRatio) return false;

  const samples = sampleByProgress(simplified, [0.2, 0.5, 0.8]);
  if (samples.length < 3) return false;
  const [p20, p50, p80] = samples;

  const leftHigher = p20.y - p50.y >= cfg.minDepthPx;
  const rightHigher = p80.y - p50.y >= cfg.minDepthPx;
  const centerOk = Math.abs(p50.x - (minX + spanX / 2)) <= spanX * 0.25;

  return leftHigher && rightHigher && centerOk;
}

function sampleByProgress(points: Point[], progress: number[]): Point[] {
  if (points.length === 0) return [];
  const dists: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    dists.push(dists[i - 1] + Math.hypot(dx, dy));
  }
  const total = dists[dists.length - 1] || 1;

  const result: Point[] = [];
  let j = 0;
  for (const p of progress) {
    const target = p * total;
    while (j < dists.length - 1 && dists[j + 1] < target) j++;
    const t = (target - dists[j]) / Math.max(1e-6, dists[j + 1] - dists[j]);
    const a = points[j], b = points[Math.min(j + 1, points.length - 1)];
    result.push({
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
      t: a.t + (b.t - a.t) * t,
    });
  }
  return result;
}

function simplify(points: Point[], tolerance: number): Point[] {
  if (points.length <= 2) return points.slice();
  const keep = new Array(points.length).fill(false);
  keep[0] = keep[points.length - 1] = true;

  function perpendicularDistance(p: Point, a: Point, b: Point) {
    const A = p.x - a.x, B = p.y - a.y;
    const C = b.x - a.x, D = b.y - a.y;
    const dot = A * C + B * D;
    const lenSq = C * C + D * D || 1;
    const t = Math.max(0, Math.min(1, dot / lenSq));
    const x = a.x + C * t;
    const y = a.y + D * t;
    return Math.hypot(p.x - x, p.y - y);
  }

  function rdp(start: number, end: number) {
    let maxDist = 0, index = -1;
    for (let i = start + 1; i < end; i++) {
      const d = perpendicularDistance(points[i], points[start], points[end]);
      if (d > maxDist) {
        maxDist = d;
        index = i;
      }
    }
    if (maxDist > tolerance && index !== -1) {
      keep[index] = true;
      rdp(start, index);
      rdp(index, end);
    }
  }

  rdp(0, points.length - 1);
  return points.filter((_, i) => keep[i]);
}