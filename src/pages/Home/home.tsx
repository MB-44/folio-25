import React, { useEffect } from "react"
import {useState } from "react";
import SiteInfo  from "@/config/siteInfo";
import styles from "./home.module.css"

export default function HomePage() {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % SiteInfo.titles.length);
      }, 5000)
      return () => clearInterval(interval);
    }, [SiteInfo.titles.length]);

    return (
      <>
      <div className={styles.nameContainer}>
            <div className={styles.scrollText}>
              <span>{SiteInfo.home_title}</span>
            </div>
            <p key={currentTitleIndex} className={`${styles.desc} ${styles.slideInDown}`}>
              {SiteInfo.titles[currentTitleIndex]}
            </p>
            <button className={styles.button1}>
              Hey
            </button>
          </div>
      </>
    );
}