'use client';
import Image from 'next/image';
import styles from './style.module.css';

export default function Intro() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.media}>
          <div className={styles.mediaInner}>
            <Image
              src="/images/profile/profileImage.png"
              alt="Studio portrait"
              fill
              sizes="(max-width: 900px) 100vw, 520px"
              priority
              className={styles.img}
            />
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.lede}>
            At Koktò, every project gets our full attention. No templates, no “good enough.” Just focus, soul, and a lot of care to make sure it’s right.
          </p>
          <p className={styles.copy}>
            I’ve spent the last 8+ years designing real products — and learned that trust, clarity, and taste matter more than buzzwords.
          </p>
          <div className={styles.person}>
            <p className={styles.name}>Menath.b</p>
            <p className={styles.role}>Creative Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}