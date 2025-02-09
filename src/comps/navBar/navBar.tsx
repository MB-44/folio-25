import React, { useState } from "react";
import styles from "./navBar.module.css";

export default function NavigationBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <header className={styles.navBar}>
            {/* Navigation Links */}
            <nav className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#stack">Stack</a>
                <a href="#services">Services</a>
                <a href="#projects">Projects</a>
                <a href="#social">Social</a>
            </nav>

            {/* Hamburger Icon  */}
            <div 
                className={styles.hamburger}
                onClick={() => setMenuOpen((prev) => !prev)}
            >
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </div>
        </header>
    )
}