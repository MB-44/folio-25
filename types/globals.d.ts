/// <reference types="react-scripts" />

declare module '*.glb' {
  const src: string;
  export default src;
}

declare module 'animejs' {
  const anime: any;
  export default anime;
}

declare module 'charming' {
  interface CharmingOptions {
    tagName?: string;
    classPrefix?: string;
  }

  export default function charming(
    element: Element | HTMLElement | string,
    options?: CharmingOptions
  ): void;
}

