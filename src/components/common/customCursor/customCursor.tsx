"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./style.module.css";

/** Linear interpolation */
const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
/** Map number x from range [a, b] to [c, d] */
const map = (x: number, a: number, b: number, c: number, d: number) =>
  ((x - a) * (d - c)) / (b - a) + c;

type RenderedStyle = { previous: number; current: number; amt: number };

type Props = {
  /** Which descendants should trigger the “enter/leave” animation on hover */
  triggerSelector?: string; // e.g., 'a' or '.cursor-target'
  /** Stroke color of the cursor circles */
  stroke?: string;
  /** Z-index for the cursor overlay within this component */
  zIndex?: number;
  /** Optional className applied to the wrapper */
  className?: string;
  /** Children you want the cursor to apply to */
  children?: React.ReactNode;
};

/**
 * CustomCursor
 * - Self-contained; scopes to its own container (relative positioning).
 * - Renders your children and mounts two SVG cursor circles on top (absolute overlay).
 * - Triggers distortion + radius/opacity changes when hovering elements that match `triggerSelector`.
 * - Motion delay matches the original Codrops sketch (two circles with different amt).
 */
const CustomCursor: React.FC<Props> = ({
  triggerSelector = "a",
  stroke = "#000",
  zIndex = 10000,
  className,
  children,
}) => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Two cursor SVG refs
  const cursor1Ref = useRef<SVGSVGElement>(null);
  const cursor2Ref = useRef<SVGSVGElement>(null);

  // track pointer relative to this component’s bounds
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const scope = scopeRef.current!;
    const rect = () => scope.getBoundingClientRect();

    const onMove = (ev: MouseEvent) => {
      const r = rect();
      cursorPos.current = { x: ev.clientX - r.left, y: ev.clientY - r.top };
    };

    scope.addEventListener("mousemove", onMove, { passive: true });
    return () => scope.removeEventListener("mousemove", onMove);
  }, []);

  /** Class representing one .cursor SVG element */
  class CursorElement {
    el: SVGSVGElement;
    inner: SVGCircleElement;
    feTurbulence: SVGFETurbulenceElement | null;

    // enter targets (can be set via data-attrs; we keep the original values)
    radiusOnEnter = 50;
    opacityOnEnter = 1;

    // base radius
    radius: number;

    // interpolated properties
    renderedStyles: Record<"tx" | "ty" | "radius" | "opacity", RenderedStyle> = {
      tx: { previous: 0, current: 0, amt: 0.15 },
      ty: { previous: 0, current: 0, amt: 0.15 },
      radius: { previous: 20, current: 20, amt: 0.15 },
      opacity: { previous: 1, current: 1, amt: 0.15 },
    };

    // element size (used for centering)
    bounds: DOMRect;

    // SVG filter id and animated value
    filterId = "#cursor-filter";
    primitiveValues = { turbulence: 0 };
    filterTimeline!: gsap.core.Timeline;
    rafId: number | null = null;

    constructor(svg: SVGSVGElement) {
      this.el = svg;
      const inner = svg.querySelector<SVGCircleElement>(".cursor__inner");
      if (!inner) throw new Error("Missing .cursor__inner");
      this.inner = inner;

      // the filter lives in the first SVG's <defs>
      this.feTurbulence = scopeRef.current!.querySelector<SVGFETurbulenceElement>(
        `${this.filterId} > feTurbulence`
      );

      // start hidden
      this.el.style.opacity = "0";

      this.bounds = this.el.getBoundingClientRect();

      // allow per-element delay via data-amt (matches original)
      const amtAttr = this.el.dataset.amt;
      if (amtAttr) {
        const amt = +amtAttr;
        this.renderedStyles.tx.amt = amt;
        this.renderedStyles.ty.amt = amt;
        this.renderedStyles.radius.amt = amt;
        this.renderedStyles.opacity.amt = amt;
      }

      // base radius from <circle r="">
      const r = this.inner.getAttribute("r") || "20";
      this.radius = +r;
      this.renderedStyles.radius.previous = this.renderedStyles.radius.current = this.radius;

      this.createFilterTimeline();

      // First pointer move inside the scope starts the loop
      const onFirstMove = () => {
        const { x, y } = cursorPos.current;
        this.renderedStyles.tx.previous = this.renderedStyles.tx.current = x - this.bounds.width / 2;
        this.renderedStyles.ty.previous = this.renderedStyles.ty.current = y - this.bounds.height / 2;
        this.el.style.opacity = "1";
        this.loop();
        scopeRef.current?.removeEventListener("mousemove", onFirstMove);
      };
      scopeRef.current?.addEventListener("mousemove", onFirstMove);
    }

    enter() {
      this.renderedStyles.opacity.current = this.opacityOnEnter;
      this.filterTimeline.restart();
    }

    leave() {
      this.inner.style.filter = "none";
      this.filterTimeline.kill();
      this.renderedStyles.radius.current = this.radius;
      this.renderedStyles.opacity.current = 1;
    }

    createFilterTimeline() {
      const turbulenceValues = { from: 0.01, to: 0.04 };

      this.filterTimeline = gsap
        .timeline({
          paused: true,
          onStart: () => {
            if (this.feTurbulence) {
              this.feTurbulence.setAttribute(
                "seed",
                String(Math.round(gsap.utils.random(1, 20)))
              );
            }
            // apply distortion filter to the inner circle while animating
            this.inner.style.filter = `url(${this.filterId})`;
            this.renderedStyles.opacity.current = 1;
          },
          onUpdate: () => {
            if (this.feTurbulence) {
              this.feTurbulence.setAttribute(
                "baseFrequency",
                String(this.primitiveValues.turbulence)
              );
            }
            // map turbulence to opacity and radius (as in original)
            this.renderedStyles.opacity.current = this.renderedStyles.opacity.previous = map(
              this.primitiveValues.turbulence,
              turbulenceValues.from,
              turbulenceValues.to,
              1,
              0
            );
            this.renderedStyles.radius.current = this.renderedStyles.radius.previous = map(
              this.primitiveValues.turbulence,
              turbulenceValues.from,
              turbulenceValues.to,
              this.radius,
              this.radiusOnEnter
            );
          },
          onComplete: () => {
            this.inner.style.filter = "none";
            this.renderedStyles.radius.current = this.renderedStyles.radius.previous = this.radius;
          },
        })
        .to(this.primitiveValues, {
          duration: 1.5,
          ease: "power1",
          startAt: { turbulence: turbulenceValues.from },
          turbulence: turbulenceValues.to,
        });
    }

    loop = () => {
      const { x, y } = cursorPos.current;
      // center the svg at the pointer
      this.renderedStyles.tx.current = x - this.bounds.width / 2;
      this.renderedStyles.ty.current = y - this.bounds.height / 2;

      // interpolate all props
      (Object.keys(this.renderedStyles) as Array<
        keyof typeof this.renderedStyles
      >).forEach((k) => {
        const s = this.renderedStyles[k];
        s.previous = lerp(s.previous, s.current, s.amt);
      });

      // apply styles
      this.el.style.transform = `translate(${this.renderedStyles.tx.previous}px, ${this.renderedStyles.ty.previous}px)`;
      this.inner.setAttribute("r", String(this.renderedStyles.radius.previous));
      this.el.style.opacity = String(this.renderedStyles.opacity.previous);

      this.rafId = requestAnimationFrame(this.loop);
    };

    destroy() {
      if (this.rafId) cancelAnimationFrame(this.rafId);
      this.filterTimeline?.kill();
    }
  }

  useEffect(() => {
    const svg1 = cursor1Ref.current;
    const svg2 = cursor2Ref.current;
    const overlay = overlayRef.current;
    const scope = scopeRef.current;

    if (!svg1 || !svg2 || !overlay || !scope) return;

    // create two cursor elements (like the original)
    const c1 = new CursorElement(svg1);
    const c2 = new CursorElement(svg2);

    // hover triggers within this component only
    const triggers = Array.from(
      scope.querySelectorAll<HTMLElement>(triggerSelector)
    );
    const onEnter = () => {
      c1.enter();
      c2.enter();
    };
    const onLeave = () => {
      c1.leave();
      c2.leave();
    };
    triggers.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      c1.destroy();
      c2.destroy();
      triggers.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [triggerSelector]);

  return (
    <div ref={scopeRef} className={className} style={{ position: "relative" }}>
      {/* Your content lives here */}
      {children}

      {/* absolute overlay that fills THIS component only */}
      <div
        ref={overlayRef}
        className={styles.overlay}
        style={{ zIndex }}
        aria-hidden
      >
        {/* First cursor (contains the <defs> with the filter) */}
        <svg
          ref={cursor1Ref}
          className={styles.cursor}
          width="140"
          height="140"
          viewBox="0 0 140 140"
        >
          <defs>
            <filter
              id="cursor-filter"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              filterUnits="objectBoundingBox"
            >
              <feTurbulence
                type="fractalNoise"
                seed="3"
                baseFrequency="0"
                numOctaves="1"
                result="warp"
              />
              <feDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                scale="15"
                in="SourceGraphic"
              />
            </filter>
          </defs>
          <circle
            className={styles.cursor__inner}
            cx="70"
            cy="70"
            r="20"
            style={{ stroke: stroke }}
          />
        </svg>

        {/* Second cursor (slightly different interpolation amt via data-amt) */}
        <svg
          ref={cursor2Ref}
          className={styles.cursor}
          width="140"
          height="140"
          viewBox="0 0 140 140"
          data-amt="0.13"
        >
          <circle
            className={styles.cursor__inner}
            cx="70"
            cy="70"
            r="24"
            style={{ stroke: stroke }}
          />
        </svg>
      </div>
    </div>
  );
};

export default CustomCursor;