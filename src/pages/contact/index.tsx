import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Footer } from '@/layout'
import { ParallaxEffect, RandomUnderline, Magnetic, PagePreLoader } from '@/components'
import Reveal from '@/components/effects/reveal'
import { Contact } from '@/data'
import styles from './style.module.css'

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PagePreLoader pageName="Contact" />}
      </AnimatePresence>
      <ParallaxEffect>
    <div className={styles.contactPage}>
    {/* Hero Section  */}
    <Reveal animation="fade-up" distance={28} duration={1500} once>
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            <RandomUnderline color="#de322c">{Contact.heroTitle}</RandomUnderline>
            {/* {Contact.heroTitle} */}
          </h1>
          <div className={styles.contentWrapper}>
            <div className={styles.leftContent}>
              <p className={styles.heroSubtitle}>{Contact.heroSubtitle}</p>
              <div className={styles.profileCard}>
                <img
                  src={Contact.profile.imageSrc}
                  alt={Contact.profile.imageAlt}
                  className={styles.profileImage}
                />
                <div className={styles.profileInfo}>
                  <h3 className={styles.profileName}>{Contact.profile.name}</h3>
                  <p className={styles.profileRole}>{Contact.profile.role}</p>
                </div>
              </div>
            </div>
            <div className={styles.rightContent}>
              <div className={styles.emailSection}>
                <div>
                  <h2 className={styles.emailTitle}>{Contact.email.display}</h2>
                  <a href={Contact.email.href} className={styles.link}>
                    <svg className={styles.arrowSvg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={styles.linkText}>{Contact.email.ctaLabel}</span>
                  </a>
                </div>
              </div>
              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder={Contact.form.placeholders.name}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder={Contact.form.placeholders.email}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.textarea}
                    placeholder={Contact.form.placeholders.message}
                    rows={4}
                    required
                  />
                </div>
              </form>
              <div className={styles.linksSection}>
                {Contact.links.map((l: { href: string | undefined; label: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }, i: React.Key | null | undefined) => (
                  <a
                    key={i}
                    href={l.href}
                    className={`${styles.link} ${/instagram/i.test(l?.href || '') ? styles.instagramLink : ''}`}
                  >
                    <svg className={styles.arrowSvg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={styles.linkText}>{l.label}</span>
                  </a>
                ))}
                <button type="submit" className={styles.submitLink} onClick={handleSubmit}>
                  <svg className={styles.arrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L9 14C9 14.5523 9.44772 15 10 15H19" stroke="#de322c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 11L19 15L15 19" stroke="#de322c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{Contact.form.submitLabel}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
    {/* Get In touch section */}
    <Reveal animation="fade-up" distance={28} duration={1500} once>
      <section className={styles.getInTouchSection}>
        <div className={styles.getInTouchContainer}>
          <div className={styles.getInTouchLeft}>
            <h2 className={styles.getInTouchTitle}>{Contact.getInTouch.title}</h2>
          </div>
          <div className={styles.getInTouchMiddle}>
            <div className={styles.getInTouchText}>
              <p><WordMagnet text={Contact.getInTouch.paragraphs[0]} /></p>
              <p><WordMagnet text={Contact.getInTouch.paragraphs[1]} /></p>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
    {/* FAQ Section */}
    <Reveal animation="fade-up" distance={28} duration={1500} once>
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <div className={styles.faqGrid}>
            <div className={styles.faqLeft}>
              <div className={styles.faqHeader}>
                <h2 className={styles.faqTitle}>{Contact.faqHeader.title}</h2>
                <p className={styles.faqSubtitle}>{Contact.faqHeader.subtitle}</p>
              </div>
              <button className={styles.faqAskBtn}>
                <svg className={styles.arrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5L9 14C9 14.5523 9.44772 15 10 15H19" stroke="#de322c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 11L19 15L15 19" stroke="#de322c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{Contact.faqHeader.askLabel}</span>
              </button>
            </div>
            <div className={styles.faqRight}>
              <div className={styles.faqList}>
                {Contact.faq.map((faq: { question: React.ReactNode; answer: React.ReactNode }, index: number) => (
                  <div key={index} className={styles.faqItem}>
                    <button
                      className={styles.faqButton}
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <span className={styles.faqQuestion}>{faq.question}</span>
                      <span className={`${styles.faqIcon} ${openFaq === index ? styles.open : ''}`}>
                        {openFaq === index ? '−' : '+'}
                      </span>
                    </button>
                    <div className={`${styles.faqAnswer} ${openFaq === index ? styles.open : ''}`}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>

    <Reveal animation="fade-up" distance={28} duration={1500} once>
      <Footer />
    </Reveal>
    </div>
      </ParallaxEffect>
    </>
  )
}

export default ContactPage