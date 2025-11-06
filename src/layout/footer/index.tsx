'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Magnetic, RandomUnderline } from '@/components';
import { Footer as FooterText , socialLinks } from '@/data';
import styles from './style.module.css';
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
                <span>{FooterText.newsTitleLines[0]}</span>
                <span>{FooterText.newsTitleLines[1]}</span>
              </p>
              <p className={styles.newsSub}>
                {FooterText.newsSub}
              </p>
            </div>
            <form className={styles.form} onSubmit={(e)=>e.preventDefault()}>
              <div className={styles.inputs}>
                <input
                  type="email"
                  name="email"
                  placeholder={FooterText.form.placeholders.email}
                  required
                  className={styles.input}
                />
              </div>
              <button type="submit" className={styles.cta} aria-label={FooterText.form.submitLabel}>
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
              {socialLinks
                .filter(link => link.visible)
                .map(link => (
                    <Magnetic key={link.name}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                        aria-label={link.name}
                      >
                        {link.name}
                      </a>
                    </Magnetic>
                ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.contactBlock}>
            <a href={FooterText.contactEmail.href} className={styles.contactEmail}>
              <RandomUnderline>{FooterText.contactEmail.display}</RandomUnderline>
            </a>
          </div>

          <div className={styles.bioBlock}>
            <p className={styles.bioText}>
              <span className={styles.line}>{FooterText.bioLines[0]}</span>
              <span className={styles.line}>{FooterText.bioLines[1]}</span>
            </p>
          </div>
        </div>

        <div className={styles.metaRow}>
          <p className={styles.version}>{FooterText.version}</p>
          <p className={styles.localTime}>
            {FooterText.localTimeLabel} <Clock/>
          </p>
        </div>
      </div>
    </footer>
  );
}