'use client';

import { useEffect, useRef } from 'react';
import styles from './style.module.css';

export default function Footer() {
  const timeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    });
    const setTime = () => {
      if (timeRef.current) timeRef.current.textContent = fmt.format(new Date());
    };
    setTime();
    const id = setInterval(setTime, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className={styles['footer-rounded-div']} data-scroll-section>
        <div className={styles['rounded-div-wrap']}>
          <div className={styles['rounded-div']} />
        </div>
      </div>

      <div className={`${styles['footer-wrap']} ${styles['footer-footer-wrap']} ${styles['theme-dark']}`} data-scroll-section>
        <footer className={`${styles['section']} ${styles['footer']}`} data-scroll data-scroll-speed="-4" data-scroll-position="bottom">
          <div className={`${styles['container']} ${styles['medium']}`}>
            <div className={styles['row']}>
              <div className={styles['flex-col']}>
                <div className={styles['arrow']}>
                  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <g fill="none" fillRule="evenodd">
                      <g transform="translate(-1019, -279)" stroke="#FFFFFF" strokeWidth="1.5">
                        <g transform="translate(1026, 286) rotate(90) translate(-1026, -286) translate(1020, 280)">
                          <polyline points="2.76923077 0 12 0 12 9.23076923"></polyline>
                          <line x1="12" y1="0" x2="0" y2="12"></line>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>

                <h2 className={styles['footer-title']}>
                  <span>
                    <div className={styles['profile-picture']} />
                    Let’s work
                  </span>
                  <span>together</span>
                </h2>
              </div>
            </div>

            <div className={styles['row']}>
              <div className={styles['flex-col']}>
                <div className={styles['stripe']} />
                <div className={styles['btn-fixed']}>
                  <div
                    className={`${styles['btn']} ${styles['btn-round']}`}
                    data-scroll
                    data-scroll-speed="-1"
                    data-scroll-direction="horizontal"
                    data-scroll-position="bottom"
                    data-scroll-offset="-50%, 0"
                  >
                    <a
                      href="/contact"
                      className={`${styles['btn-click']} ${styles['magnetic']}`}
                      data-strength="100"
                      data-strength-text="50"
                    >
                      <div className={styles['btn-fill']} />
                      <span className={styles['btn-text']}>
                        <span className={styles['btn-text-inner']}>Get in touch</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles['row']}>
              <div className={styles['flex-col']}>
                <div className={`${styles['btn']} ${styles['btn-normal']}`}>
                  <a href="mailto:info@example.com" className={`${styles['btn-click']} ${styles['magnetic']}`} data-strength="25" data-strength-text="15">
                    <div className={styles['btn-fill']} />
                    <span className={styles['btn-text']}>
                      <span className={`${styles['btn-text-inner']} ${styles['change']}`}>info@example.com</span>
                    </span>
                  </a>
                </div>

                <div className={`${styles['btn']} ${styles['btn-normal']}`}>
                  <a href="tel:+0000000000" className={`${styles['btn-click']} ${styles['magnetic']}`} data-strength="25" data-strength-text="15">
                    <div className={styles['btn-fill']} />
                    <span className={styles['btn-text']}>
                      <span className={`${styles['btn-text-inner']} ${styles['change']}`}>+00 00 00 00 00</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles['container']} ${styles['no-padding']}`}>
            <div className={`${styles['row']} ${styles['bottom-footer']}`}>
              <div className={styles['flex-col']}>
                <div className={styles['credits']}>
                  <h5>Version</h5>
                  <p>2025 © Edition</p>
                </div>
                <div className={styles['time']}>
                  <h5>Local time</h5>
                  <p><span ref={timeRef} id="timeSpan">--:-- --</span></p>
                </div>
              </div>

              <div className={styles['flex-col']}>
                <div className={styles['socials']}>
                  <h5>Socials</h5>
                  <ul>
                    <li className={`${styles['btn']} ${styles['btn-link']} ${styles['btn-link-external']}`}>
                      <a href="https://www.awwwards.com/" target="_blank" rel="noreferrer" className={`${styles['btn-click']} ${styles['magnetic']}`} data-strength="20" data-strength-text="10">
                        <span className={styles['btn-text']}><span className={styles['btn-text-inner']}>Awwwards</span></span>
                      </a>
                    </li>
                    <li className={`${styles['btn']} ${styles['btn-link']} ${styles['btn-link-external']}`}>
                      <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className={`${styles['btn-click']} ${styles['magnetic']}`} data-strength="20" data-strength-text="10">
                        <span className={styles['btn-text']}><span className={styles['btn-text-inner']}>Instagram</span></span>
                      </a>
                    </li>
                    <li className={`${styles['btn']} ${styles['btn-link']} ${styles['btn-link-external']}`}>
                      <a href="https://twitter.com/" target="_blank" rel="noreferrer" className={`${styles['btn-click']} ${styles['magnetic']}`} data-strength="20" data-strength-text="10">
                        <span className={styles['btn-text']}><span className={styles['btn-text-inner']}>Twitter</span></span>
                      </a>
                    </li>
                    <li className={`${styles['btn']} ${styles['btn-link']} ${styles['btn-link-external']}`}>
                      <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className={`${styles['btn-click']} ${styles['magnetic']}`} data-strength="20" data-strength-text="10">
                        <span className={styles['btn-text']}><span className={styles['btn-text-inner']}>LinkedIn</span></span>
                      </a>
                    </li>
                  </ul>
                  <div className={styles['stripe']} />
                </div>
              </div>
            </div>
          </div>
        </footer>

        <div className={`${styles['overlay']} ${styles['overlay-gradient']}`} />
      </div>
    </>
  );
}