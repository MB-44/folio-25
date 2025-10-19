import { useEffect, useRef, useState } from "react";
import styles from "./scanner.module.css";

type CardStreamState = {
  position: number;
  velocity: number;
  direction: number;
  isAnimating: boolean;
  isDragging: boolean;
  lastTime: number;
  lastMouseX: number;
  mouseVelocity: number;
  friction: number;
  minVelocity: number;
  containerWidth: number;
  cardLineWidth: number;
};

function generateAscii(width: number, height: number) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";
  const rand = () => chars[Math.floor(Math.random() * chars.length)];
  let out = "";
  for (let r = 0; r < height; r++) {
    let line = "";
    for (let c = 0; c < width; c++) line += rand();
    out += line + (r < height - 1 ? "\n" : "");
  }
  return out;
}

function calcAsciiDims(cardW: number, cardH: number) {
  const fontSize = 11;
  const lineHeight = 13;
  const charW = 6;
  return {
    width: Math.floor(cardW / charW),
    height: Math.floor(cardH / lineHeight),
    fontSize,
    lineHeight,
  };
}

export default function ScannerDemo() {
  const speedRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [state, setState] = useState<CardStreamState>({
    position: 0,
    velocity: 120,
    direction: -1,
    isAnimating: true,
    isDragging: false,
    lastTime: 0,
    lastMouseX: 0,
    mouseVelocity: 0,
    friction: 0.95,
    minVelocity: 30,
    containerWidth: 0,
    cardLineWidth: 0,
  });

  useEffect(() => {
    const container = containerRef.current!;
    const line = lineRef.current!;
    const updateDims = () => {
      const cardW = 400;
      const gap = 60;
      const count = line.children.length;
      setState((s) => ({
        ...s,
        containerWidth: container.offsetWidth,
        cardLineWidth: (cardW + gap) * count,
      }));
    };
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const animate = (t: number) => {
      setState((s) => {
        let { lastTime } = s;
        if (!lastTime) lastTime = t;
        const dt = (t - lastTime) / 1000;

        let { position, velocity, direction } = s;
        if (s.isAnimating && !s.isDragging) {
          if (velocity > s.minVelocity) velocity *= s.friction;
          else velocity = Math.max(s.minVelocity, velocity);
          position += velocity * direction * dt;
        }

        const line = lineRef.current!;
        const containerW = s.containerWidth;
        const lineW = s.cardLineWidth;

        if (position < -lineW) position = containerW;
        else if (position > containerW) position = -lineW;

        line.style.transform = `translateX(${position}px)`;
        if (speedRef.current) speedRef.current.textContent = String(Math.round(velocity));

        updateCardClipping();

        return { ...s, position, velocity, lastTime: t };
      });
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const line = lineRef.current!;
    const onDown = (e: MouseEvent | Touch) => {
      const clientX = "clientX" in e ? e.clientX : 0;
      setState((s) => {
        let position = s.position;
        const matrix = getComputedStyle(line).transform;
        if (matrix !== "none") {
          const m = new DOMMatrix(matrix);
          position = m.m41;
        }
        line.style.animation = "none";
        line.classList.add(styles.dragging);
        document.body.style.userSelect = "none";
        document.body.style.cursor = "grabbing";
        return { ...s, isDragging: true, isAnimating: false, lastMouseX: clientX, mouseVelocity: 0, position };
      });
    };
    const onMove = (e: MouseEvent | Touch) => {
      setState((s) => {
        if (!s.isDragging) return s;
        const clientX = "clientX" in e ? e.clientX : 0;
        const dx = clientX - s.lastMouseX;
        const position = s.position + dx;
        const mouseVelocity = dx * 60;
        line.style.transform = `translateX(${position}px)`;
        updateCardClipping();
        return { ...s, position, lastMouseX: clientX, mouseVelocity };
      });
    };
    const onUp = () => {
      setState((s) => {
        if (!s.isDragging) return s;
        const big = Math.abs(s.mouseVelocity) > s.minVelocity;
        const velocity = big ? Math.abs(s.mouseVelocity) : 120;
        const direction = big ? (s.mouseVelocity > 0 ? 1 : -1) : s.direction;
        line.classList.remove(styles.dragging);
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
        if (speedRef.current) speedRef.current.textContent = String(Math.round(velocity));
        return { ...s, isDragging: false, isAnimating: true, velocity, direction };
      });
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setState((s) => {
        const position = s.position + (e.deltaY > 0 ? 20 : -20);
        line.style.transform = `translateX(${position}px)`;
        updateCardClipping();
        return { ...s, position };
      });
    };

    const onMouseDown = (e: MouseEvent) => onDown(e);
    const onMouseMove = (e: MouseEvent) => onMove(e);
    const onTouchStart = (e: TouchEvent) => onDown(e.touches[0]);
    const onTouchMove = (e: TouchEvent) => onMove(e.touches[0]);
    const onMouseUp = () => onUp();
    const onTouchEnd = () => onUp();

    line.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    line.addEventListener("wheel", onWheel, { passive: false });

    line.addEventListener("touchstart", onTouchStart, { passive: false });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);

    line.addEventListener("selectstart", (e) => e.preventDefault());
    line.addEventListener("dragstart", (e) => e.preventDefault());

    return () => {
      line.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      line.removeEventListener("wheel", onWheel);
      line.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useEffect(() => {
    const c = scannerCanvasRef.current!;
    const ctx = c.getContext("2d")!;
    let w = window.innerWidth;
    let h = 300;
    let animId: number | null = null;
    let fadeZone = 60;
    let barX = w / 2;
    let lineWidth = 3;
    c.width = w;
    c.height = h;

    const onResize = () => {
      w = window.innerWidth;
      c.width = w;
      c.height = h;
      barX = w / 2;
    };
    window.addEventListener("resize", onResize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const gradCore = ctx.createLinearGradient(barX - lineWidth / 2, 0, barX + lineWidth / 2, 0);
      gradCore.addColorStop(0, "rgba(255,255,255,0)");
      gradCore.addColorStop(0.5, "rgba(255,255,255,1)");
      gradCore.addColorStop(1, "rgba(255,255,255,0)");

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = gradCore;
      ctx.beginPath();
      roundRect(ctx, barX - lineWidth / 2, 0, lineWidth, h, 15);
      ctx.fill();

      const vGrad = ctx.createLinearGradient(0, 0, 0, h);
      vGrad.addColorStop(0, "rgba(255,255,255,0)");
      vGrad.addColorStop(fadeZone / h, "rgba(255,255,255,1)");
      vGrad.addColorStop(1 - fadeZone / h, "rgba(255,255,255,1)");
      vGrad.addColorStop(1, "rgba(255,255,255,0)");

      ctx.globalCompositeOperation = "destination-in";
      ctx.globalAlpha = 1;
      ctx.fillStyle = vGrad;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const updateCardClipping = () => {
    const line = lineRef.current!;
    const scannerX = window.innerWidth / 2;
    const scannerWidth = 8;
    const left = scannerX - scannerWidth / 2;
    const right = scannerX + scannerWidth / 2;
    const wrappers = Array.from(line.querySelectorAll<HTMLElement>("[data-card-wrapper]"));
    wrappers.forEach((wrap) => {
      const rect = wrap.getBoundingClientRect();
      const cardLeft = rect.left;
      const cardRight = rect.right;
      const cardWidth = rect.width;

      const normal = wrap.querySelector<HTMLElement>("[data-card-normal]")!;
      const ascii = wrap.querySelector<HTMLElement>("[data-card-ascii]")!;

      if (cardLeft < right && cardRight > left) {
        const interLeft = Math.max(left - cardLeft, 0);
        const interRight = Math.min(right - cardLeft, cardWidth);
        const normalClipRight = (interLeft / cardWidth) * 100;
        const asciiClipLeft = (interRight / cardWidth) * 100;
        normal.style.setProperty("--clip-right", `${normalClipRight}%`);
        ascii.style.setProperty("--clip-left", `${asciiClipLeft}%`);
      } else {
        if (cardRight < left) {
          normal.style.setProperty("--clip-right", "100%");
          ascii.style.setProperty("--clip-left", "100%");
        } else if (cardLeft > right) {
          normal.style.setProperty("--clip-right", "0%");
          ascii.style.setProperty("--clip-left", "0%");
        }
      }
    });
  };

  const toggleAnimation = () =>
    setState((s) => ({ ...s, isAnimating: !s.isAnimating }));

  const resetPosition = () =>
    setState((s) => {
      const pos = s.containerWidth;
      const v = 120;
      const d = -1;
      if (lineRef.current) {
        lineRef.current.style.animation = "none";
        lineRef.current.style.transform = `translateX(${pos}px)`;
        lineRef.current.classList.remove(styles.dragging);
      }
      if (speedRef.current) speedRef.current.textContent = String(v);
      return { ...s, position: pos, velocity: v, direction: d, isAnimating: true, isDragging: false };
    });

  const changeDirection = () =>
    setState((s) => ({ ...s, direction: s.direction * -1 }));

  const cardsCount = 30;
  const cardImages = [
    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b55e654d1341fb06f8_4.1.png",
    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5a080a31ee7154b19_1.png",
    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5c1e4919fd69672b8_3.png",
    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5f6a5e232e7beb4be_2.png",
    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5bea2f1b07392d936_4.png",
  ];

  const renderCard = (i: number) => {
    const w = 400;
    const h = 250;
    const { width, height, fontSize, lineHeight } = calcAsciiDims(w, h);
    return (
      <div className={styles.cardWrapper} data-card-wrapper key={i}>
        <div className={`${styles.card} ${styles.cardNormal}`} data-card-normal>
          <img
            className={styles.cardImage}
            src={cardImages[i % cardImages.length]}
            alt="Credit Card"
            onError={(e) => {
              const canvas = document.createElement("canvas");
              canvas.width = w;
              canvas.height = h;
              const ctx = canvas.getContext("2d")!;
              const grd = ctx.createLinearGradient(0, 0, w, h);
              grd.addColorStop(0, "#667eea");
              grd.addColorStop(1, "#764ba2");
              ctx.fillStyle = grd;
              ctx.fillRect(0, 0, w, h);
              (e.currentTarget as HTMLImageElement).src = canvas.toDataURL();
            }}
          />
        </div>
        <div className={`${styles.card} ${styles.cardAscii}`} data-card-ascii>
          <pre
            className={styles.asciiContent}
            style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px` }}
          >
            {generateAscii(width, height)}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={toggleAnimation}>
          ⏸️ Pause
        </button>
        <button className={styles.controlBtn} onClick={resetPosition}>
          🔄 Reset
        </button>
        <button className={styles.controlBtn} onClick={changeDirection}>
          ↔️ Direction
        </button>
      </div>

      <div className={styles.speedIndicator}>
        Speed: <span ref={speedRef}>120</span> px/s
      </div>

      <div className={styles.container} ref={containerRef}>
        <canvas className={styles.scannerCanvas} ref={scannerCanvasRef} />
        <div className={styles.cardStream}>
          <div className={styles.cardLine} ref={lineRef}>
            {Array.from({ length: cardsCount }).map((_, i) => renderCard(i))}
          </div>
        </div>
      </div>

      <div className={styles.credit}>
        Inspired by <a href="https://evervault.com/" target="_blank">@evervault.com</a>
      </div>
    </div>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}