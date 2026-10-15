import React from 'react'
import { ExplainGrid as ExplainGridData } from '@/data'
import styles from './style.module.css'
import Reveal from '@/components/effects/reveal'
import { ParticleBackground } from '@/components';

const ExplainGrid = () => {
    const text = ExplainGridData.text;
    const parts = text.split('different');

    return (
        <section className={styles.explainGrid}>
            <ParticleBackground />
            <Reveal animation="fade-up" distance={20} duration={1000} once>
                <p className={styles.text}>
                    {parts[0]}
                    <span className={styles.highlight}>different</span>
                    {parts[1]}
                </p>
            </Reveal>
        </section>
    )
}

export default ExplainGrid
