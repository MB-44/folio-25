import { HackerText } from "@/components";
import styles from './style.module.css';

export default function index() {
  return (
    <div className={styles.footer}>
      <p className={styles.footerHeading}>Socials</p>
      <div className={styles.footerLinks}>
          <a>Instagram</a>
          <a>Linkedin</a>
          <a>X</a>
          <a>FaceBook</a>
      </div>
    </div>
  )
}