import React, { useState } from 'react';
import {Footer} from '@/layout';
import styles from './style.module.css';

const ContactPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const faqs = [
    {
      question: "What's your process for Brand Identity?",
      answer: "We start by understanding the problem and how you solve it. Then define what makes your brand unique — its values, vision, and positioning. From there, we shape the identity: voice and tone, visual direction, trademark, brand colors, and typography. After that, we design social media guidelines, identity assets, and a full design system. The result? A brandbook your whole team can use — so no one's ever guessing the logo or forgetting the brand's purpose."
    },
    {
      question: "What's included in your UX/UI process?",
      answer: "We start with research: interviews, BI data, competitor and support analysis — to define the problem and plan the project. Then we move to structure: user flows, low-fidelity wireframes, and quick sketches. From there, we build full product flows, UI in high fidelity, content guides, and run usability tests. Next comes visual design: direction, UI, animations, and a scalable design system. After launch, we don't disappear — we validate with real users, analyze feedback, test, and improve."
    },
    {
      question: "Can I come back for updates after launch?",
      answer: "Absolutely. Most clients stay in touch, and we're happy to help with iterations, improvements, and new features as your product grows."
    },
    {
      question: "What if I just need a logo?",
      answer: "We don't do \"just logos.\" We build identities that work — and that means research, context, and strategy. If you want something fast and generic, we might not be the right fit."
    },
    {
      question: "What kind of research do you use?",
      answer: "Depending on the project, we combine user interviews, competitor analysis, BI data, support insights, and testing sessions to shape the right solution."
    },
    {
      question: "Do you design fast MVPs?",
      answer: "Yes — but still with purpose. Even if we move fast, we validate core assumptions and design around real needs, not guesswork."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Let's talk</h1>
          
          <div className={styles.contentWrapper}>
            <div className={styles.leftContent}>
              <p className={styles.heroSubtitle}>
                Whether it's a new project or a quick question, I'm here to connect.
              </p>
              
              <div className={styles.profileCard}>
                <img 
                  src="images/profile/profile-img.png" 
                  alt="Menath Lakvindu"
                  className={styles.profileImage}
                />
                <div className={styles.profileInfo}>
                  <h3 className={styles.profileName}>Menath Lakvindu</h3>
                  <p className={styles.profileRole}>Creative Developer</p>
                </div>
              </div>
            </div>

            <div className={styles.rightContent}>
              <div className={styles.emailSection}>
                <h2 className={styles.emailTitle}>hello@menath</h2>
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
                    placeholder="Name *"
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
                    placeholder="E-mail *"
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
                    placeholder="Message (Tell us about your project)"
                    rows={4}
                    required
                  />
                </div>
              </form>

              <div className={styles.linksSection}>
                <a href="#" className={styles.link}>
                  <svg className={styles.arrowSvg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={styles.linkText}>Instagram</span>
                </a>
                <button type="submit" className={styles.submitLink} onClick={handleSubmit}>
                  <span className={styles.arrow}>↪</span> Get in touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      {/* <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.formLeft}>
            <h2 className={styles.formTitle}>Get in Touch</h2>
            <p className={styles.formText}>
              We'd love to hear from you. Whether you're starting a new project, need help refining an idea, or just want to say hello, we're here to help.
            </p>
            <p className={styles.formText}>
              Fill out the form or reach out via email—we'll get back to you as soon as possible. Let's create something great together.
            </p>
          </div>

          <div className={styles.formRight}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="company" className={styles.label}>Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Your company"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  placeholder="Tell us about your project..."
                  rows={5}
                  required
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      {/* <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <div className={styles.faqHeader}>
            <h2 className={styles.faqTitle}>FAQ</h2>
            <p className={styles.faqSubtitle}>
              We've heard it all. Here's everything you need to know before working with us.
            </p>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <button
                  className={styles.faqButton}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className={styles.faqQuestion}>{faq.question}</span>
                  <span className={styles.faqIcon}>
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
      </section> */}

      <Footer />
    </div>
  );
};

export default ContactPage;