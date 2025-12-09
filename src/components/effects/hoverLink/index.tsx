import React from 'react';
import Link from 'next/link';
import styles from './style.module.css';

interface HoverLinkProps {
    href: string;
    children: string;
    className?: string;
    onClick?: () => void;
}

export default function HoverLink({ href, children, className = '', onClick }: HoverLinkProps) {
    return (
        <Link href={href} className={`${styles.link} ${className}`} onClick={onClick}>
            {children.split('').map((char, index) => (
                <span
                    key={index}
                    className={styles.char}
                    style={{ '--index': index } as React.CSSProperties}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </Link>
    );
}
