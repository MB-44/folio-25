'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './style.module.css';
import { Magnetic } from '@/components';
import Clock from './clock';

export default function Footer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brandRow}>
            <Link href="/" className={styles.logoLink} aria-label="Home">
              <span className={styles.logo} />
            </Link>
            <div className={styles.brandFill} />
          </div>

          <div className={styles.newsletter}>
            <div className={styles.newsHeading}>
              <p className={styles.newsTitle}>
                <span>Stay</span>
                <span>connected</span>
              </p>
              <p className={styles.newsSub}>
                Leave your email — I will write back.
              </p>
            </div>
            <form className={styles.form} onSubmit={(e)=>e.preventDefault()}>
              <div className={styles.inputs}>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  required
                  className={styles.input}
                />
              </div>
              <button type="submit" className={styles.cta} aria-label="Subscribe">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>

          <div className={styles.linksWrap}>
            <div className={styles.navCol}>
              <Magnetic><Link href="/about" className={styles.link}>About</Link></Magnetic>
              <Magnetic><Link href="/projects" className={styles.link}>Work</Link></Magnetic>
              <Magnetic><Link href="/contact" className={styles.link}>Contact</Link></Magnetic>
            </div>
            <div className={styles.socialCol}>
              <a href="https://www.instagram.com/kokto.studio/" target="_blank" rel="noopener" className={styles.link}>Instagram</a>
              <a href="https://www.behance.net/andreykokto" target="_blank" rel="noopener" className={styles.link}>Linkedin</a>
              <a href="https://www.behance.net/andreykokto" target="_blank" rel="noopener" className={styles.link}>X</a>
              <a href="https://www.behance.net/andreykokto" target="_blank" rel="noopener" className={styles.link}>FaceBook</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.contactBlock}>
            <a href="mailto:hello@menath.b" className={styles.contactEmail}>hello@menath.b</a>
          </div>

          <div className={styles.bioBlock}>
            <p className={styles.bioText}>
              <span className={styles.line}>I don’t just design — I help shape brands and</span>
              <span className={styles.line}>products that feel real, work beautifully, and grow with you.</span>
            </p>
          </div>
        </div>

        <div className={styles.metaRow}>
          <p className={styles.version}>2025 © Edition</p>
          <p className={styles.localTime}>
            <Clock/>
          </p>
        </div>
      </div>
    </footer>
  );
}