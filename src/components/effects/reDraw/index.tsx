import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import charming from 'charming';
import styles from './style.module.css';

interface RedrawWordProps {
    text: string;
    className?: string; // <-- allow passing existing h2 class (faqTitle)
}

const RedrawWord: React.FC<RedrawWordProps> = ({ text, className }) => {
    const wordRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        const wordEl = wordRef.current;
        if (!wordEl) return;

        wordEl.innerHTML = text;
        charming(wordEl, { classPrefix: 'letter' });

        const letterSpans = Array.from(wordEl.querySelectorAll('span')) as HTMLElement[];

        type LetterConfig = {
            origin: string;
            opts: any;
        };

        class Letter {
            DOM: {
                letter: HTMLElement;
                letterInner?: HTMLSpanElement;
                svg?: SVGSVGElement;
                path?: SVGPathElement;
            };

            CONFIG: { animations: LetterConfig[] };
            pos: number;
            letterPath?: string;
            mouseenterFn!: (ev: Event) => void;
            mouseleaveFn!: (ev: Event) => void;
            mouseTimeout?: number;
            isDrawing = false;
            isActive = false;

            constructor(letter: HTMLElement, pos: number) {
                this.DOM = { letter };
                this.CONFIG = {
                    animations: [
                        {
                            origin: '0% 0%',
                            opts: {
                                translateY: [
                                    { value: 400, duration: 400, delay: 500, easing: 'easeInSine' },
                                ],
                                rotate: [
                                    { value: 30, duration: 500, easing: 'easeOutBack' },
                                    { value: 38, duration: 200, easing: 'easeInSine' },
                                ],
                                opacity: [
                                    { value: 0, duration: 200, delay: 700, easing: 'easeInSine' },
                                ],
                            },
                        },
                        {
                            origin: '50% 50%',
                            opts: {
                                scale: { value: 0, duration: 300, easing: 'easeInBack' },
                                opacity: { value: 0, duration: 100, delay: 200, easing: 'linear' },
                            },
                        },
                        {
                            origin: '50% 100%',
                            opts: {
                                translateY: [
                                    {
                                        value: -400,
                                        duration: 800,
                                        delay: 200,
                                        elasticity: 300,
                                    },
                                ],
                                scaleY: [
                                    {
                                        value: 0.7,
                                        duration: 200,
                                        easing: 'easeOutExpo',
                                    },
                                    {
                                        value: 1,
                                        duration: 800,
                                        elasticity: 300,
                                    },
                                ],
                                scaleX: [
                                    {
                                        value: 1.2,
                                        duration: 200,
                                        easing: 'easeOutExpo',
                                    },
                                    {
                                        value: 1,
                                        duration: 800,
                                        elasticity: 300,
                                    },
                                ],
                                opacity: { value: 0, duration: 100, delay: 250, easing: 'linear' },
                            },
                        },
                        {
                            origin: '100% 0%',
                            opts: {
                                translateY: [
                                    { value: 300, duration: 300, delay: 700, easing: 'easeInSine' },
                                ],
                                rotate: [
                                    { value: -20, duration: 700, easing: 'easeOutElastic', elasticity: 400 },
                                    { value: -30, duration: 200, easing: 'easeInSine' },
                                ],
                                opacity: [
                                    { value: 0, duration: 200, delay: 800, easing: 'easeInSine' },
                                ],
                            },
                        },
                    ],
                };
                this.pos = pos;

                const parent = letter.parentNode as HTMLElement | null;
                if (parent) {
                    this.letterPath = (parent.dataset as any)[`pathChar-${this.pos + 1}`] as string;
                }

                this.layout();
                this.initEvents();
            }

            layout() {
                if (!this.letterPath) return;

                const inner = document.createElement('span');
                inner.innerHTML = this.DOM.letter.innerHTML;
                this.DOM.letter.innerHTML = '';

                const svgNS = 'http://www.w3.org/2000/svg';
                const svg = document.createElementNS(svgNS, 'svg');
                svg.setAttribute('width', '95px');
                svg.setAttribute('height', '105px');
                svg.setAttribute('viewBox', '0 0 95 105');
                svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');

                const path = document.createElementNS(svgNS, 'path');
                path.setAttribute('d', this.letterPath);

                svg.appendChild(path);
                this.DOM.letter.appendChild(svg);
                this.DOM.letter.appendChild(inner);

                this.DOM.letterInner = inner;
                this.DOM.svg = svg;
                this.DOM.path = path;
            }

            initEvents() {
                this.mouseenterFn = () => {
                    this.mouseTimeout = window.setTimeout(() => {
                        if (this.isDrawing || !this.DOM.letterInner || !this.DOM.path) return;

                        this.isDrawing = true;
                        this.isActive = true;

                        requestAnimationFrame(() => {
                            const config = this.CONFIG.animations[this.pos];
                            this.DOM.letterInner!.style.transformOrigin = config.origin;

                            anime.remove(this.DOM.letterInner);
                            const animOpts: any = { targets: this.DOM.letterInner };
                            Object.assign(animOpts, config.opts);
                            anime(animOpts);

                            anime.remove(this.DOM.path);
                            anime({
                                targets: this.DOM.path,
                                duration: 700,
                                delay: 300,
                                easing: 'easeOutQuad',
                                strokeDashoffset: [anime.setDashoffset, 0],
                                opacity: {
                                    value: 1,
                                    duration: 1,
                                },
                                complete: () => {
                                    if (!this.DOM.path || !this.DOM.letterInner) return;

                                    this.DOM.path.style.strokeDashoffset = `${this.DOM.path.getTotalLength()}`;
                                    this.DOM.letterInner.style.transformOrigin = '50% 50%';
                                    this.DOM.letterInner.style.transform =
                                        'scale(0) translateX(0) translateY(0) rotate(0)';

                                    anime({
                                        targets: this.DOM.letterInner,
                                        duration: 500,
                                        delay: 0,
                                        elasticity: 500,
                                        scale: [0.5, 1],
                                        opacity: [0, 1],
                                        complete: () => {
                                            this.isDrawing = false;
                                        },
                                    });
                                },
                            });
                        });
                    }, 50);
                };

                this.mouseleaveFn = () => {
                    if (this.mouseTimeout) {
                        window.clearTimeout(this.mouseTimeout);
                    }
                    if (!this.isActive) return;
                    this.isActive = false;
                };

                this.DOM.letter.addEventListener('mouseenter', this.mouseenterFn);
                this.DOM.letter.addEventListener('mouseleave', this.mouseleaveFn);
                this.DOM.letter.addEventListener('touchstart', this.mouseenterFn);
                this.DOM.letter.addEventListener('touchend', this.mouseleaveFn);
            }

            destroy() {
                this.DOM.letter.removeEventListener('mouseenter', this.mouseenterFn);
                this.DOM.letter.removeEventListener('mouseleave', this.mouseleaveFn);
                this.DOM.letter.removeEventListener('touchstart', this.mouseenterFn);
                this.DOM.letter.removeEventListener('touchend', this.mouseleaveFn);
            }
        }

        const letterInstances = letterSpans.map((letter, index) => new Letter(letter, index));

        return () => {
            letterInstances.forEach((l) => l.destroy());
            wordEl.innerHTML = text;
        };
    }, [text]);

    return (
        <h2
            ref={wordRef}
            className={`${className ?? ''} ${styles.redrawWord}`}
            data-path-char-1="M8.3,12.8c26.1-0.7,52.2-1.4,78.3-2.1C25.1-3.6,41,72.6,49.2,101"
            data-path-char-2="M45.7,9.2c-79.1,12.8-22.2,111.6,24.8,78.6C106.9,62.2,83.1,3.2,45.7,9.2z"
            data-path-char-3="M18.6,11.6c64.6-15.2,70.5,47.9,8,38.4c72.2-5.5,65.2,59-8.7,44.8C18.1,67.1,18.3,39.3,18.6,11.6z"
            data-path-char-4="M76.8,9.9C52.3,10.7,15-2.5,14.2,30.6c-0.9,36.5,28.7,23.7,52,23.3C42,55.7,16,46.7,20.3,78.9c3.5,26.7,39.1,16.4,60.6,17.2"
        >
            {text}
        </h2>
    );
};

export default RedrawWord;