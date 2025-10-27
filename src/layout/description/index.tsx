import React from 'react';
import styles from './style.module.css';

export default function Description() {
    return (
        <div className={styles.description}>
            <div className={styles.content}>
                <div className={styles.leftContent}>
                    <button className={styles.talkButton}>
                        <svg className={styles.arrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M9 5L9 14C9 14.5523 9.44772 15 10 15H19" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                            <path 
                                d="M15 11L19 15L15 19" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>Let's talk</span>
                    </button>
                </div>
                
                <div className={styles.rightContent}>
                    <p className={styles.descriptionText}>
                        I'm a creative developer passionate about building beautiful 
                        and functional web experiences. I specialize in crafting 
                        intuitive interfaces that bring ideas to life.
                    </p>
                </div>
            </div>
        </div>
    );
}