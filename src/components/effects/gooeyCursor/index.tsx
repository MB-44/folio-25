// GooeyCursor.tsx (only the relevant changes shown)
import React, { useEffect, useRef } from "react";

type Props = {
  count?: number;
  radius?: number;
  color?: string;
  blendMode?: "plus-lighter" | "screen" | "normal" | "lighten";
  blur?: number;
  threshold?: number;
  ease?: number;
  zIndex?: number;
  /** Pass a container to scope the overlay to (e.g. your Landing section) */
  scopeRef?: React.RefObject<HTMLElement>;
};

const GooeyCursor: React.FC<Props> = ({
  count = 20,
  radius = 22,
  color = "#8a5cf6",
  blendMode = "plus-lighter",
  blur = 16,
  threshold = 0.9,
  ease = 0.22,
  zIndex = 9998,
  scopeRef,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // positions for dots
  const ptsRef = useRef(
    Array.from({ length: count }, () => ({ x: 0, y: 0, tx: 0, ty: 0 }))
  );

  // track mouse/touch relative to the scoped container
  useEffect(() => {
    const getRel = (clientX: number, clientY: number) => {
      const host = scopeRef?.current ?? document.documentElement;
      const rect = host.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const onMove = (e: MouseEvent) => {
      const { x, y } = getRel(e.clientX, e.clientY);
      const p0 = ptsRef.current[0];
      p0.tx = x;
      p0.ty = y;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches[0];
      if (!t) return;
      const { x, y } = getRel(t.clientX, t.clientY);
      const p0 = ptsRef.current[0];
      p0.tx = x;
      p0.ty = y;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [scopeRef]);

  // animation & write transforms
  useEffect(() => {
    const el = containerRef.current!;
    const dots = Array.from(el.querySelectorAll<HTMLSpanElement>(".gc-dot"));

    const loop = () => {
      const pts = ptsRef.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const target = i === 0 ? p : pts[i - 1];
        const tx = i === 0 ? p.tx : target.x;
        const ty = i === 0 ? p.ty : target.y;
        p.x += (tx - p.x) * (i === 0 ? ease : ease * 0.9);
        p.y += (ty - p.y) * (i === 0 ? ease : ease * 0.9);
      }
      for (let i = 0; i < dots.length; i++) {
        dots[i].style.transform = `translate(${pts[i].x}px, ${pts[i].y}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [ease]);

  // container is ABSOLUTE so it stays inside the scoped element
  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden>
        <defs>
          <filter id="gc-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="b" />
            <feColorMatrix
              in="b"
              mode="matrix"
              values={`
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 ${1 / (1 - threshold)} ${-threshold / (1 - threshold)}
              `}
              result="g"
            />
            <feBlend in="SourceGraphic" in2="g" />
          </filter>
        </defs>
      </svg>

      <div
        ref={containerRef}
        className="gc-wrap"
        style={{
          position: "absolute",
          inset: 0,
          zIndex,
          pointerEvents: "none",
          mixBlendMode: blendMode as any,
        }}
      >
        {Array.from({ length: count }).map((_, i) => {
          const scale = 1 - i / (count * 1.2);
          const r = Math.max(2, radius * scale);
          const opacity = 0.9 - i / (count * 1.1);
          return (
            <span
              key={i}
              className="gc-dot"
              style={{
                position: "absolute",
                left: -r,
                top: -r,
                width: r * 2,
                height: r * 2,
                borderRadius: "50%",
                background: color,
                opacity,
                filter: "url(#gc-goo)",
                willChange: "transform",
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default GooeyCursor;