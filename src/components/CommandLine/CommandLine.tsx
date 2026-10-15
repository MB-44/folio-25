import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { navItems } from '@/data/nav-items';
import { socialLinks } from '@/data/common';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './style.module.css';
import Curve from './Curve';

const slideUp = {
    initial: { y: "100%" },
    enter: { y: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { y: "100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
};

const CommandLine = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isInputFocused = ['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName);

            if (event.key === '/') {
                if (!isOpen) {
                    event.preventDefault();
                    setIsOpen(true);
                } else {
                    event.preventDefault();
                    setIsOpen(false);
                    setQuery('');
                }
            }

            if (event.key === 'Escape') {
                if (isOpen) {
                    setIsOpen(false);
                    setQuery('');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    const handleCommand = () => {
        const normalizedQuery = query.toLowerCase().trim();

        const navItem = navItems.find((item) => item.title.toLowerCase() === normalizedQuery);
        if (navItem) {
            setIsOpen(false);
            setQuery('');
            router.push(navItem.href);
            return;
        }

        const socialLink = socialLinks.find((link) => link.name.toLowerCase().includes(normalizedQuery) || link.name.toLowerCase() === normalizedQuery);
        if (socialLink) {
            setIsOpen(false);
            setQuery('');
            window.open(socialLink.url, '_blank');
            return;
        }

        if (normalizedQuery === 'home') {
            setIsOpen(false);
            setQuery('');
            router.push('/');
            return;
        }
    };

    const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand();
        }
    };

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    <motion.div
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        variants={slideUp}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        className={styles.panel}
                    >
                        <div className={styles.body}>
                            <div className={styles.topSection}>
                                <div className={styles.title}>
                                    Command Line
                                </div>

                                <div className={styles.inputWrapper}>
                                    <span className={styles.prefix}>menath:\</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDownInput}
                                        className={styles.input}
                                        placeholder="Enter Command"
                                        spellCheck={false}
                                    />
                                </div>
                            </div>

                            <div className={styles.footer}>
                                Esc to close
                            </div>
                        </div>
                        <Curve />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CommandLine;
