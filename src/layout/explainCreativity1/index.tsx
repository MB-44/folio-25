import React from 'react';
import styles from './style.module.css';

export default function explainCreativity1() {
    return (
        <section id="about" className={styles.creativeSection}>
            <div className="about_p1_wrap u-width-full u-flex-horizontal-nowrap u-justify-content-center u-height-full">
                <div className="about_p1_contain u-flex-vertical-nowrap">
                    <div className="about_eyebrows u-flex-vertical-nowrap u-justify-content-between">
                        <div className="about_eyebrow_wrap u-width-full u-flex-horizontal-nowrap u-justify-content-between">
                            <p className="about_eyebrow u-mono">chapter 1: </p>
                            <p className="about_eyebrow u-mono">about</p>
                        </div>
                        <div className="about_eyebrow_wrap u-width-full u-flex-horizontal-nowrap u-justify-content-between">
                            <p className="about_eyebrow u-mono">Why creative websites?</p>
                            <p className="about_eyebrow u-mono">←</p>
                        </div>
                    </div>
                    <div className="about_p1_content u-width-full u-position-absolute u-height-full u-gap-8">
                        <div className="about_h1_c u-width-full u-flex-horizontal-nowrap">
                            <h2 data-about-heading="" className="about_p_creativity u-text-style-display u-text-trim-off">CREATIVITY
                            </h2>
                        </div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 95 95" fill="none" className="svg">
                            <rect width="94.7523" height="94.7523" rx="47.3762" fill="currentColor" className="rect"></rect>
                            <path
                                d="M45.6076 48.9678H22.8529V45.6666H45.6076L45.4897 21.8508H49.2625L49.1446 45.6666H71.8993V48.9678H49.1446L49.2625 72.9015H45.4897L45.6076 48.9678Z"
                                fill="currentColor" className="card-plus"></path>
                        </svg>
                        <div className="about_h1_t u-width-full u-flex-horizontal-nowrap u-align-items-end">
                            <h2 data-about-tech="" className="about_p_creativity u-text-style-display u-text-trim-off is-technicality">
                                &lt;_&lt;</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}