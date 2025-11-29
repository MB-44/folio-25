import React from "react";
import styles from "./style.module.css";
import { Process } from "@/data";

const ProcessSection: React.FC = () => {
  if (!Process) return null;

  return (
    <section id={Process.id} className={styles.processSection}>
      <div className={styles.processInner}>
        <div className={styles.headerCol}>
          {Process.eyebrow && (
            <p className={styles.eyebrow}>{Process.eyebrow}</p>
          )}
          <h2 className={styles.title}>{Process.title}</h2>
          {Process.description && (
            <p className={styles.description}>{Process.description}</p>
          )}
          {Process.ctaLabel && (
            <button className={styles.ctaButton}>
              {Process.ctaLabel}
            </button>
          )}
        </div>
        <div className={styles.stepsCol}>
          {Process.steps?.map((step: any) => (
            <div key={step.id ?? step.stepNumber} className={styles.stepCard}>
              <span className={styles.stepNumber}>{step.stepNumber}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              {step.description && (
                <p className={styles.stepDescription}>{step.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;