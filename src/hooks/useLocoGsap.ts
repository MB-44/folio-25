import { useEffect } from "react";

export default function useLocoGsap(container: React.RefObject<HTMLElement>) {
  useEffect(() => {
    let loco: any;
    let ScrollTrigger: any;
    let gsap: any;

    (async () => {
      const [{ default: LocomotiveScroll }, g] = await Promise.all([
        import("locomotive-scroll"),
        import("gsap/dist/ScrollTrigger"),
      ]);

      // gsap is ESM in Next env – import it here to avoid SSR hiccups
      gsap = (await import("gsap")).default;
      ScrollTrigger = g.default || g;

      gsap.registerPlugin(ScrollTrigger);

      // create locomotive on the container
      loco = new LocomotiveScroll({
        el: container.current!,
        smooth: true,
        lerp: 0.09,
      });

      // tie locomotive to ScrollTrigger
      ScrollTrigger.scrollerProxy(container.current!, {
        scrollTop(value?: number) {
          if (arguments.length) {
            loco.scrollTo(value!, { duration: 0, disableLerp: true });
            return null;
          }
          return (loco?.scroll?.instance?.scroll?.y) || 0;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // pinType must be 'transform' when a custom scroller transforms the container
        pinType: container.current!.style.transform ? "transform" : "fixed",
      });

      // each locomotive scroll -> update ScrollTrigger
      loco.on("scroll", ScrollTrigger.update);

      // refresh after layout / images
      ScrollTrigger.addEventListener("refresh", () => loco.update());
      ScrollTrigger.refresh();
    })();

    return () => {
      (async () => {
        try {
          const ScrollTrigger = (await import("gsap/dist/ScrollTrigger")).default;
          ScrollTrigger?.clearMatchMedia();
        } catch {}
      })();
      // destroy locomotive last
      // NOTE: we can't await here, but loco will be closed on GC
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (loco && typeof loco.destroy === "function") && loco.destroy();
    };
  }, [container]);
}