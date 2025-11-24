import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { About } from '@/data'
import { Footer } from '@/layout'
import { Magnetic, RandomUnderline, PagePreLoader } from '@/components'
import styles from './style.module.css'

const WordMagnet = ({ text }: { text: string }) => {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <Magnetic>
            <span className={styles.magneticWord}>{word}</span>
          </Magnetic>
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </>
  )
}

const AboutPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PagePreLoader pageName="About Me" />}
      </AnimatePresence>
      <div className={styles.aboutPage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <h1 className={styles.heroTitle}>
              <RandomUnderline color="#de322c">{About.hero.title}</RandomUnderline>
              {/* {About.hero.title} */}
            </h1>

            <div className={styles.contentWrapper}>
              <div className={styles.leftContent}>
                <h2 className={styles.sectionTitle}>{About.hero.leftTitle}</h2>
              </div>

              <div className={styles.middleContent}>
                <p className={styles.description}>
                  <WordMagnet text={About.hero.middleDescription} />
                </p>

                <div className={styles.profileCard}>
                  <img
                    src={About.hero.profile.src}
                    alt={About.hero.profile.alt}
                    className={styles.profileImage}
                  />
                  <div className={styles.profileInfo}>
                    <h3 className={styles.profileName}>{About.hero.profile.name}</h3>
                    <p className={styles.profileRole}>{About.hero.profile.role}</p>
                  </div>
                </div>
              </div>

              <div className={styles.rightContent}>
                <p className={styles.mainText}><WordMagnet text={About.hero.rightTexts[0]} /></p>
                <p className={styles.mainText}><WordMagnet text={About.hero.rightTexts[1]} /></p>
              </div>
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className={styles.approachSection}>
          <div className={styles.approachContainer}>
            <div className={styles.approachLeft}>
              <h2 className={styles.approachTitle}>{About.approach.title}</h2>
            </div>
            <div className={styles.approachMiddle}>
              <div className={styles.approachText}>
                <p><WordMagnet text={About.approach.paragraphs[0]} /></p>
                <p><WordMagnet text={About.approach.paragraphs[1]} /></p>
              </div>
            </div>
          </div>
        </section>

        {/* Drives Section */}
        <section className={styles.drivesSection}>
          <div className={styles.drivesContainer}>
            <div className={styles.drivesLeft}>
              <h2 className={styles.drivesTitle}>{About.drives.title}</h2>
            </div>

            <div className={styles.drivesMiddle}>
              <div className={styles.drivesText}>
                <p><WordMagnet text={About.drives.paragraphs[0]} /></p>
                <p><WordMagnet text={About.drives.paragraphs[1]} /></p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}

export default AboutPage