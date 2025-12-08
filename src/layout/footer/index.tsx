'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Magnetic } from '@/components';
import { Footer as FooterText, socialLinks } from '@/data';
import styles from './style.module.css';
import Clock from './clock';

interface WeatherData {
  temperature: number;
  condition: string;
}

export default function Footer() {
  const [location, setLocation] = useState<string>('Searching ...');
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.city && data.country_name) {
          setLocation(`${data.city}, ${data.country_name}`);

          if (data.latitude && data.longitude) {
            fetchWeather(data.latitude, data.longitude);
          }
        } else {
          setLocation('Location Unavailable');
        }
      })
      .catch(() => {
        setLocation('Location Unavailable');
      });
  }, []);

  const fetchWeather = (lat: number, lon: number) => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`)
      .then(res => res.json())
      .then(data => {
        if (data.current) {
          setWeather({
            temperature: data.current.temperature_2m,
            condition: getWeatherCondition(data.current.weather_code)
          });
        }
      })
      .catch(err => console.error("Weather fetch failed", err));
  };

  function getWeatherCondition(code: number): string {
    if (code === 0) return 'Clear sky';
    if (code >= 1 && code <= 3) return 'Partly cloudy';
    if (code >= 45 && code <= 48) return 'Fog';
    if (code >= 51 && code <= 55) return 'Drizzle';
    if (code >= 61 && code <= 65) return 'Rain';
    if (code >= 71 && code <= 77) return 'Snow';
    if (code >= 80 && code <= 82) return 'Showers';
    if (code >= 95) return 'Thunderstorm';
    return 'Clear sky';
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* TOP SECTION */}
        <div className={styles.topSection}>
          <div className={styles.bio}>
            {FooterText.bioLines.map((line, i) => (
              <span key={i} className={styles.bioLine}>
                {line.split(/(straight lines)/gi).map((part, j) =>
                  part.toLowerCase() === 'straight lines' ? (
                    <span key={j} className={styles.straightLinesEffect}>{part}</span>
                  ) : part
                )}
              </span>
            ))}
          </div>

          <div className={styles.navigation}>
            <div className={styles.navGroup}>
              <Magnetic><Link href="/about" className={styles.navLink}>About</Link></Magnetic>
              <Magnetic><Link href="/work" className={styles.navLink}>Work</Link></Magnetic>
              <Magnetic><Link href="/contact" className={styles.navLink}>Contact</Link></Magnetic>
            </div>
            <div className={styles.navGroup}>
              {socialLinks.filter(l => l.visible).map(link => (
                <Magnetic key={link.name}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.navLink}>
                    {link.name}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>

        {/* CONTEXT SECTION */}
        <div className={styles.contextSection}>
          <div>Local Time : <Clock /></div>
          <div>{location}</div>
          {weather && (
            <div>{weather.condition} {weather.temperature}°C</div>
          )}
        </div>

        {/* LOGO SECTION */}
        <div className={styles.logoSection}>
          <svg className={styles.largeLogo} viewBox="0 0 137 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <image href="/images/svg/test_logo.svg" width="100%" height="100%" />
          </svg>
        </div>

        {/* BOTTOM SECTION */}
        <div className={styles.bottomSection}>
          <div className={styles.bottomLeft}>
            <span>{new Date().getFullYear()}</span>
            <span className={styles.copyrightIcon}>©</span>
            <span>All right reserved</span>
          </div>

          <div className={styles.bottomCenter}>
            <Link href="/privacy" className={styles.legalLink}>Privacy</Link>
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 8px' }}>
              <circle cx="2" cy="2" r="2" fill="currentColor" fillOpacity="0.6" />
            </svg>
            <Link href="/terms" className={styles.legalLink}>Terms & Conditions</Link>
          </div>

          <div className={styles.bottomRight}>
            <div className={styles.codeByContainer}>
              <span className={styles.codeByText}>Code by</span>
              <span className={styles.menathText}>Menath</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}