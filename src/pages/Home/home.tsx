import React from "react"
import styles from "@/pages/Home/home.module.css";
import {useState } from "react";
import SiteInfo from "@/config/siteInfo";

export default function HomePage() {
    const [scatter, setScatter] = useState(false);
    const [translateValues, setTranslateValues] = useState<{ x: number; y: number }[]>([]);
    const [buttonText, setButtonText] = useState("Do not press this!")

    const handleButtonClick = () => {
        const newTranslateValues = Array.from({length: "It's Menath".length}, () => ({
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
        })); 
        setTranslateValues(newTranslateValues);
        setScatter(true);
        setButtonText("Dammit! Now Scroll Down!");
    };

    return (
    <div className={styles.nameContainer}>
            <h1 className={scatter ? styles.scatterText : ""}>
              {SiteInfo.description.split("").map((char, index) => (
                <span
                  key={index}
                  className={scatter ? styles.scatterLetter : ""}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    "--translate-x-start": `${translateValues[index]?.x || 0}vw`,
                    "--translate-y-start": `${translateValues[index]?.y || 0}vh`,
                    "--translate-x-end": `${Math.random() * 100 - 50}vw`,
                    "--translate-y-end": `${Math.random() * 100 - 50}vh`,
                  } as React.CSSProperties}
                >
                  {char}
                </span>
              ))}
            </h1>
            <p className={styles.desc}>{SiteInfo.title}</p>
            <button className={styles.button1} onClick={handleButtonClick}>
              {buttonText}
            </button>
          </div>
    );
}