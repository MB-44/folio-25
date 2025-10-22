'use client';
import Link from 'next/link';
import styles from './style.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* top row */}
        <div className={styles.top}>
          {/* brand / logo */}
          <div className={styles.brandRow}>
            <Link href="/" className={styles.logoLink} aria-label="Home">
              <span className={styles.logo} />
            </Link>
            <div className={styles.brandFill} />
          </div>

          {/* newsletter */}
          <div className={styles.newsletter}>
            <div className={styles.newsHeading}>
              <p className={styles.newsTitle}>
                <span>Stay</span>
                <span>connected</span>
              </p>
              <p className={styles.newsSub}>
                Leave your email — we’ll write back.
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
                <span className={styles.ctaArrow} aria-hidden>→</span>
              </button>
            </form>
          </div>

          {/* links */}
          <div className={styles.linksWrap}>
            <div className={styles.navCol}>
              <Link href="/about" className={styles.link}>About</Link>
              <Link href="/projects" className={styles.link}>Work</Link>
              <Link href="/contact" className={styles.link}>Contact</Link>
            </div>
            <div className={styles.socialCol}>
              <a href="https://www.instagram.com/kokto.studio/" target="_blank" rel="noopener" className={styles.link}>Instagram</a>
              <a href="https://www.behance.net/andreykokto" target="_blank" rel="noopener" className={styles.link}>Linkedin</a>
              <a href="https://www.behance.net/andreykokto" target="_blank" rel="noopener" className={styles.link}>X</a>
              <a href="https://www.behance.net/andreykokto" target="_blank" rel="noopener" className={styles.link}>FaceBook</a>
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className={styles.bottom}>
          <div className={styles.contactBlock}>
            <a href="mailto:hello@menath.b" className={styles.contactEmail}>hello@menath.b</a>
          </div>

          {/* left-aligned with the “Stay connected” column */}
          <div className={styles.bioBlock}>
            <p className={styles.bioText}>
              <span className={styles.line}>I don’t just design — I help shape brands and</span>
              <span className={styles.line}>products that feel real, work beautifully, and grow with you.</span>
              {/* I don’t just design — I help shape brands and products that feel real, work beautifully, and grow with you. */}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}