import React from "react";
import styles from "./style.module.css";

export default function ExplainCreativity() {
    return (
        <section id="explainCreativity" className={styles.section}>
            <div className={styles.inner}>
                {/* Decorative circle – optional, remove if you don’t want it */}
                <div className={styles.circleWrapper}>
                    <div className={styles.circle} />
                </div>

                <div className={styles.textWrapper}>
                    <h2 className={styles.line}>Creative websites are the</h2>
                    <h2 className={styles.line}>intersection of creativity</h2>
                    <h2 className={styles.line}>and technicality to form</h2>
                    <h2 className={styles.line}>bespoke digital expierences</h2>
                    <h2 className={styles.line}>
                        that spark <span className={styles.highlight}>emotion</span>.
                    </h2>
                </div>
            </div>
        </section>
    );
};