import React from 'react';
import styles from './style.module.css';
import { Process } from '@/data';
import Reveal from '@/components/effects/reveal';

const ProcessNew: React.FC = () => {
    return (
        <Reveal animation="fade-up" distance={28} duration={1500} once>
            <section className={styles.processSection}>
                <div className={styles.processContainer}>
                    {/* Left Column */}
                    <div className={styles.leftCol}>
                        <h4 className={styles.smallTitle}>My Approach For creativity</h4>
                        <img
                            src="/images/ds-wallpaper.jpg" // Using a placeholder from existing images
                            alt="Process Approach"
                            className={styles.processImage}
                        />
                        <div className={styles.stepsList}>
                            {Process.steps?.map((step: any, index: number) => (
                                <div key={step.id ?? index} className={styles.stepItem}>
                                    <span className={styles.stepNumber}>{`(0${index + 1})`}</span>
                                    <h3 className={styles.stepTitle}>{step.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className={styles.rightCol}>
                        <h2 className={styles.largeDescription}>
                            Our approach at OH Architecture is designed to make your journey from concept to completion as smooth and enjoyable as possible.
                            <br /><br />
                            With our 6-stage process, we prioritise clarity, collaboration, and your unique vision. At every step, we'll keep you informed, inspired, and involved.
                        </h2>
                        <button className={styles.ctaButton}>
                            <span>Get To Know Approach</span>
                        </button>
                    </div>
                </div>
            </section>
        </Reveal>
    );
};

export default ProcessNew;
