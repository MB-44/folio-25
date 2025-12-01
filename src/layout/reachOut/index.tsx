import React, { useState } from 'react'
import { ReachOut as ReachOutData } from '@/data'
import styles from './style.module.css'

const ReachOut = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
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

    return (
        <section className={styles.homeContactSection}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.leftContent}>
                        <h2 className={styles.title}>{ReachOutData.title}</h2>
                        <p className={styles.subtitle}>{ReachOutData.subtitle}</p>
                    </div>

                    <div className={styles.rightContent}>
                        <form className={styles.contactForm} onSubmit={handleSubmit}>
                            <div className={styles.row}>
                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={styles.input}
                                        placeholder={ReachOutData.form.placeholders.firstName}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={styles.input}
                                        placeholder={ReachOutData.form.placeholders.lastName}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.formGroup}>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={styles.input}
                                        placeholder={ReachOutData.form.placeholders.email}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={styles.input}
                                        placeholder={ReachOutData.form.placeholders.phone}
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className={styles.textarea}
                                    placeholder={ReachOutData.form.placeholders.message}
                                    rows={1}
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.submitLink} onClick={handleSubmit}>
                                <svg className={styles.arrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 5L9 14C9 14.5523 9.44772 15 10 15H19" stroke="#de322c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15 11L19 15L15 19" stroke="#de322c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{ReachOutData.form.submitLabel}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReachOut
