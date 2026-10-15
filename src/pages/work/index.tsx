import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Footer } from '@/layout'
import { ParallaxEffect, RandomUnderline, PagePreLoader } from '@/components'
import Reveal from '@/components/effects/reveal'
import { Work } from '@/data'
import Header from '@/components/header'
import styles from './style.module.css'

const PlusIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.plusIcon}
    >
        <path d="M12 5V19" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round" />
        <path d="M5 12H19" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round" />
    </svg>
)

const WorkPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isPreloaderFinished, setIsPreloaderFinished] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const renderTitle = (title: string) => {
        if (title.includes(' x ')) {
            const parts = title.split(' x ');
            return (
                <>
                    {parts.map((part, index) => (
                        <React.Fragment key={index}>
                            {part}
                            {index < parts.length - 1 && <PlusIcon />}
                        </React.Fragment>
                    ))}
                </>
            );
        }
        return title;
    };

    return (
        <>
            <AnimatePresence mode="wait" onExitComplete={() => setIsPreloaderFinished(true)}>
                {isLoading && <PagePreLoader pageName="Work" />}
            </AnimatePresence>

            <Header theme="light" isLoading={!isPreloaderFinished} />

            <ParallaxEffect>
                <div className={styles.workPage}>
                    {/* Hero Section  */}
                    <Reveal animation="fade-up" distance={28} duration={1500} once>
                        <section className={styles.heroSection}>
                            <div className={styles.heroContainer}>
                                <h1 className={styles.heroTitle}>
                                    <RandomUnderline color="#de322c">
                                        {renderTitle(Work.heroTitle) as any}
                                    </RandomUnderline>
                                </h1>
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

export default WorkPage
