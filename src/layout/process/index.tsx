import React from "react";
import styles from "./style.module.css";
import { Process } from "@/data";

const ProcessSection: React.FC = () => {
  if (!Process) return null;

  return (
    <section id={Process.id} className={styles.processSection}>
      <div className={styles.processInner}>
        <div className={styles.headerCol}>
          <h2 className={styles.title}>{Process.title}</h2>
          {Process.description && (
            <p className={styles.description}>{Process.description}</p>
          )}
          {Process.ctaLabel && (
            <button className={styles.ctaButton}>
              <svg className={styles.arrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L9 14C9 14.5523 9.44772 15 10 15H19" stroke="#de322c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 11L19 15L15 19" stroke="#de322c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{Process.ctaLabel}</span>
            </button>
          )}
        </div>
        <div className={styles.stepsCol}>
          {Process.steps?.map((step: any, index: number) => (
            <div key={step.id ?? step.stepNumber} className={`${styles.stepCard} ${index === 0 ? styles.firstCard : ''}`}>
              <svg className={styles.stepArrow} width="10" height="10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.5 2H13V12.5"
                  stroke="#de322c"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>{step.stepNumber}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
              </div>
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