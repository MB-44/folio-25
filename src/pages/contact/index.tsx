'use client';
import Link from 'next/link';
import { Footer } from '@/layout';
import styles from './style.module.css';

export default function Contact() {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Contact</h1>
            <p className={styles.subtitle}>
              Let’s build something meaningful together.
            </p>
          </div>

          <div className={styles.grid}>
            <div className={styles.left}>
              <div className={styles.block}>
                <p className={styles.label}>Email</p>
                <a href="mailto:hello@kokto.studio" className={styles.primaryLink}>
                  hello@kokto.studio
                </a>
              </div>

              <div className={styles.block}>
                <p className={styles.label}>Social</p>
                <div className={styles.links}>
                  <a href="https://www.instagram.com/kokto.studio/" target="_blank" rel="noopener" className={styles.link}>Instagram</a>
                  <a href="https://www.behance.net/andreykokto" target="_blank" rel="noopener" className={styles.link}>Behance</a>
                </div>
              </div>

              <div className={styles.block}>
                <p className={styles.label}>Studio</p>
                <address className={styles.address}>
                  Koktò Studio<br/>
                  123 Market Street<br/>
                  Amsterdam, NL
                </address>
              </div>
            </div>

            <div className={styles.right}>
              <form className={styles.form} onSubmit={(e)=>e.preventDefault()}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Name</label>
                  <input className={styles.input} type="text" name="name" placeholder="Your name" />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Email</label>
                  <input className={styles.input} type="email" name="email" placeholder="name@email.com" />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Message</label>
                  <textarea className={styles.textarea} name="message" placeholder="Tell us about your project" rows={5} />
                </div>
                <button className={styles.cta} type="submit" aria-label="Send">
                  <span className={styles.ctaArrow}>→</span>
                </button>
              </form>
            </div>
          </div>

          <div className={styles.note}>
            For new business, partnerships, or press inquiries, please use the form or email us directly.
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
}