import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './style.module.css'
import AudioButton from '@/components/common/audioButton'
import Magnetic from '@/components/common/magnetic'
import { useState } from 'react'

const leftItems = [
  { title: 'Work', href: '/work' },
  { title: 'About', href: '/about' }
]

const rightItems = [
  { title: 'Contact', href: '/contact' }
]

export default function Header() {
  const pathname = usePathname()
  const [hoverHref, setHoverHref] = useState<string | null>(null)

  return (
    <header className={styles.header} onMouseLeave={() => setHoverHref(null)}>
      <div className={styles.left}>
        {leftItems.map((item) => {
          const active = (hoverHref === item.href) || (hoverHref === null && pathname === item.href)
          return (
            <Magnetic key={item.href}>
              <div
                className={`${styles.el} ${active ? styles.active : ''}`}
                onMouseEnter={() => setHoverHref(item.href)}
              >
                <Link href={item.href} className={styles.navItem}>{item.title}</Link>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
          )
        })}
      </div>

      <div className={styles.center}>
        <span className={styles.brand}>Menath</span>
      </div>

      <div className={styles.right}>
        {rightItems.map((item) => {
          const active = (hoverHref === item.href) || (hoverHref === null && pathname === item.href)
          return (
            <Magnetic key={item.href}>
              <div
                className={`${styles.el} ${active ? styles.active : ''}`}
                onMouseEnter={() => setHoverHref(item.href)}
              >
                <Link href={item.href} className={styles.navItem}>{item.title}</Link>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
          )
        })}
        <div className={styles.audioWrap}>
          <AudioButton />
        </div>
      </div>
    </header>
  )
}