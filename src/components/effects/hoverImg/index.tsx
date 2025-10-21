'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './hoverImg.module.css';

type Props = {
  src: string;
  shape?: 'rectangle';
  effect?: 'stroke';
  layers?: number;
};

export default function HoverImage({ src, shape = 'rectangle', effect = 'stroke', layers = 10 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // remove previous children if any
    container.innerHTML = '';

    // create layered divs
    for (let i = 0; i < layers; i++) {
      const div = document.createElement('div');
      div.className = `${styles.layer} ${styles[shape]} ${i === 0 ? styles.base : ''}`;
      div.style.backgroundImage = `url(${src})`;
      div.dataset.layer = String(i);

      if (i !== 0 && effect === 'stroke') {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add(styles.outline);
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('preserveAspectRatio', 'none');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M 0 0 L 100 0 L 100 100 L 0 100 Z');
        svg.appendChild(path);
        div.appendChild(svg);
      }

      container.appendChild(div);
    }

    const layersEls = Array.from(container.querySelectorAll<HTMLElement>('[data-layer]'));
    const scaleInterval = 0.06;
    const tl = gsap.timeline({ paused: true });
    tl.to(layersEls.slice().reverse(), {
      scale: (i, t) => {
        const index = layersEls.indexOf(t as HTMLElement);
        const val = 1 - scaleInterval * index;
        return val >= 0 ? val : 0;
      },
      duration: 0.8,
      ease: 'power2.inOut',
      stagger: 0.1,
    });

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);

    return () => {
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      tl.kill();
    };
  }, [src, shape, effect, layers]);

  return <div ref={containerRef} className={styles.root}></div>;
}