'use client';
import React, { useState } from 'react';
import styles from './style.module.css';
import { motion } from 'framer-motion';
import Curve from '@/components/header/nav/curve'; // Reusing Curve
import { menuSlide } from '@/components/header/animations';
import Image from 'next/image';

interface ContactPanelProps {
    close: () => void;
}

const servicesList = ["Web Design", "UI/UX Design", "Immersive 3D"];

export default function ContactPanel({ close }: ContactPanelProps) {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        message: ''
    });

    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const toggleService = (service: string) => {
        setSelectedServices(prev => {
            if (prev.includes(service)) {
                return prev.filter(s => s !== service);
            } else {
                return [...prev, service];
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', { ...formData, services: selectedServices });
        // Handle form submission logic here
        close();
    };

    return (
        <>
            <motion.div
                className={styles.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                onClick={close}
            />
            <motion.div
                variants={menuSlide}
                initial="initial"
                animate="enter"
                exit="exit"
                className={styles.panel}
            >
                <div className={styles.body}>
                    <div className={styles.header}>
                        <div className={styles.headerLeft}>
                            <h2>(Say hello)</h2>
                            <p>I'm always excited to connect
                                with new people and explore potential
                                collaborations. Whether you have a project
                                in mind or just want to say hi, feel free to
                                reach out!</p>
                            <div className={styles.headerLinks}>
                                <a href="https://instagram.com/menath.b" target="_blank" rel="noopener noreferrer">Instagram</a>
                                <span className={styles.separator}></span>
                                <a href="mailto:hello@menath.b">hello@menath.b</a>
                                <span className={styles.separator}></span>
                                <a href="tel:+94768146535">+94 76 8146535</a>
                            </div>
                        </div>
                        <div className={styles.headerRight}>
                            <div className={styles.closeButton} onClick={close}>Close</div>
                            <div className={styles.imageContainer}>
                                <Image
                                    src="/images/contact_poster.jpg"
                                    alt="Contact Poster"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.formSection}>
                            <h3 className={styles.sectionTitle}>Your Personal Details</h3>
                            <div className={styles.row}>
                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        name="name"
                                        className={styles.input}
                                        placeholder=" "
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label className={styles.label}>Name</label>
                                </div>
                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        name="company"
                                        className={styles.input}
                                        placeholder=" "
                                        value={formData.company}
                                        onChange={handleInputChange}
                                    />
                                    <label className={styles.label}>Company Name</label>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.formGroup}>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className={styles.input}
                                        placeholder=" "
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                    <label className={styles.label}>Phone Number</label>
                                </div>
                                <div className={styles.formGroup}>
                                    <input
                                        type="email"
                                        name="email"
                                        className={styles.input}
                                        placeholder=" "
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label className={styles.label}>Email</label>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formSection}>
                            <h3 className={styles.sectionTitle}>Project Information</h3>
                            <div className={styles.servicesContainer}>
                                {servicesList.map((service, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`${styles.serviceBtn} ${selectedServices.includes(service) ? styles.active : ''}`}
                                        onClick={() => toggleService(service)}
                                    >
                                        {service}
                                    </button>
                                ))}
                            </div>
                            <div className={styles.formGroup}>
                                <textarea
                                    name="message"
                                    className={styles.textarea}
                                    placeholder=" "
                                    rows={1}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                ></textarea>
                                <label className={styles.label}>Tell us about your project</label>
                            </div>
                        </div>

                        <div className={styles.footer}>
                            <button type="submit" className={styles.submitBtn}>
                                Get in touch
                                <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>

                <Curve />
            </motion.div>
        </>
    );
}
