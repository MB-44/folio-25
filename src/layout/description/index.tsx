import React, { useRef } from 'react';
import styles from './style.module.css';
import { Magnetic } from '@/components';
import { Description } from '@/data';

export default function DescriptionComponent() {
    const text = Description.description;

    return (
        <div className={styles.description}>
            <div className={styles.content}>
                <div className={styles.rightContent}>
                    {text.map((paragraph, i) => (
                        <p key={i} className={styles.descriptionText}>
                            {paragraph.split(' ').map((word, index, arr) => (
                                <React.Fragment key={index}>
                                    <Magnetic>
                                        <span className={`${styles.magneticWord} ${(word === 'creative' || word === 'developer') ? styles.highlight : ''}`}>
                                            {word}
                                        </span>
                                    </Magnetic>
                                    {index < arr.length - 1 && ' '}
                                </React.Fragment>
                            ))}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}