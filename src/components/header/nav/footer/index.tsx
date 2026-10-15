import styles from './style.module.css';

export default function index() {
  return (
    <div className={styles.footer}>
      <div className={styles.contactCol}>
        <div className={styles.contactItem}>
          <svg className={styles.arrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L9 14C9 14.5523 9.44772 15 10 15H19" stroke="#b9b9b9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 11L19 15L15 19" stroke="#b9b9b9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className={styles.email}>hello@menath.b</p>
        </div>
        <div className={styles.contactItem}>
          <svg className={styles.arrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L9 14C9 14.5523 9.44772 15 10 15H19" stroke="#b9b9b9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 11L19 15L15 19" stroke="#b9b9b9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className={styles.phone}>(+94) 76 814 6535</p>
        </div>
      </div>
    </div>
  )
}