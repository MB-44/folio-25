import React, { useState } from 'react'
import styles from './style.module.css'
import { Contact } from '@/data'
import Reveal from '@/components/effects/reveal'
import RedrawWord from '@/components/effects/reDraw'

const Faq = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <Reveal animation="fade-up" distance={28} duration={1500} once>
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <div className={styles.faqGrid}>
            <div className={styles.faqLeft}>
              <div className={styles.faqHeader}>
                {/* <h2 className={styles.faqTitle}>{Contact.faqHeader.title}</h2> */}
                <RedrawWord
                  text={Contact.faqHeader.title as string}
                  className={styles.faqTitle}
                />
                <p className={styles.faqSubtitle}>{Contact.faqHeader.subtitle}</p>
              </div>
              <button className={styles.faqAskBtn}>
                <svg className={styles.arrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5L9 14C9 14.5523 9.44772 15 10 15H19" stroke="#de322c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 11L19 15L15 19" stroke="#de322c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
  )
}

export default Faq
