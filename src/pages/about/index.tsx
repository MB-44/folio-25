import React from 'react';
import { Footer } from '@/layout';
import styles from './style.module.css';

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>About me</h1>
          
          <div className={styles.contentWrapper}>
            <div className={styles.leftContent}>
              <h2 className={styles.sectionTitle}>Meet Menath</h2>
            </div>

            <div className={styles.middleContent}>
              <p className={styles.description}>
                I've always wanted to make work I'm proud of. Every project is a chance to do something different, something we actually care about.
              </p>
              
              <div className={styles.profileCard}>
                <img 
                  src="images/profile/profile-img.png" 
                  alt="Menath Baddegama"
                  className={styles.profileImage}
                />
                <div className={styles.profileInfo}>
                  <h3 className={styles.profileName}>Menath Baddegama</h3>
                  <p className={styles.profileRole}>Creative Developer</p>
                </div>
              </div>
            </div>

            <div className={styles.rightContent}>
              <p className={styles.mainText}>
                Koktò is a family-run studio — just the two of us, designing together and caring about every detail like it's our own. No middle layers. You talk to the people who actually do the work.
              </p>
              <p className={styles.mainText}>
                Every project starts with the same questions: What's the goal? Who is it for? Then we mix research, strategy, and a bit of taste to make it work — and make it yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      {/* <section className={styles.approachSection}>
        <div className={styles.approachContainer}>
          <div className={styles.approachContent}>
            <h2 className={styles.approachTitle}>Approach</h2>
            <div className={styles.approachText}>
              <p>
                Every project starts with listening: to the users, the business, the pain points. Then we dig in with research, ideas, and sketches — shaping thoughtful, beautiful experiences with purpose behind every pixel.
              </p>
              <p>
                We treat design like songwriting: You start with a problem, add structure, emotion, and just enough weirdness to make it memorable. No copy-paste. No templates. Just clear thinking and good taste.
              </p>
            </div>
          </div>
          <div className={styles.approachImage}>
            <img 
              src="images/profile/profile-img.png"
              alt="Team working together"
            />
          </div>
        </div>
      </section> */}

      {/* What Drives Us Section */}
      {/* <section className={styles.drivesSection}>
        <div className={styles.drivesContainer}>
          <div className={styles.drivesImage}>
            <img 
              src="images/profile/profile-img.png"
              alt="What drives us"
            />
          </div>
          <div className={styles.drivesContent}>
            <h2 className={styles.drivesTitle}>What Drives Us</h2>
            <div className={styles.drivesText}>
              <p>
                Our work is shaped by what we live and love — family, art, skateboarding, loud music, and quiet moments.
              </p>
              <p>
                We believe good taste comes from culture, curiosity, and care. That's what we bring into every project — not just design skills, but soul.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* What Shapes Us Section */}
      {/* <section className={styles.shapesSection}>
        <div className={styles.shapesContainer}>
          <div className={styles.shapesImages}>
            <img 
              src="images/profile/profile-img.png"
              alt="Studio workspace"
              className={styles.shapesImage1}
            />
            <img 
              src="images/profile/profile-img.png"
              alt="Team collaboration"
              className={styles.shapesImage2}
            />
          </div>
          <div className={styles.shapesContent}>
            <h2 className={styles.shapesTitle}>What Shapes Us</h2>
            <div className={styles.shapesText}>
              <p>
                We've worked in startups, led teams, launched platforms used by millions. But it's not just experience — it's perspective.
              </p>
              <p>
                The way we live, think, and create outside of design shapes everything we bring into it. We care deeply about what we do. And we bring all of it to the table.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact CTA Section */}
      {/* <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Let's bring your vision to life</h2>
            <p className={styles.ctaDescription}>
              Reach out anytime — I'll walk you through the process and make sure the project starts with clarity and confidence.
            </p>
            
            <div className={styles.ctaProfile}>
              <img 
                src="images/profile/profile-img.png" 
                alt="Andrew Koktò"
                className={styles.ctaImage}
              />
              <div className={styles.ctaInfo}>
                <h3 className={styles.ctaName}>Andrew Koktò</h3>
                <p className={styles.ctaRole}>Founder and Lead Designer</p>
              </div>
            </div>

            <a href="/contact" className={styles.ctaButton}>
              Contact us
            </a>
          </div>

          <div className={styles.ctaImageWrapper}>
            <img 
              src="images/profile/profile-img.png"
              alt="Eye detail"
              className={styles.ctaHeroImage}
            />
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
};

export default AboutPage;