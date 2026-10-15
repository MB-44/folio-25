import React from 'react';
import Link from 'next/link';
import styles from './style.module.css';

interface HoverLinkProps {
    href?: string;
    children: string;
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
    hoverColor?: string;
}

const HoverLink = React.forwardRef<HTMLDivElement | HTMLAnchorElement, HoverLinkProps>(({ href, children, className = '', onClick, style, hoverColor }, ref) => {
    // Determine the content chars
    const chars = (
        <>
            {children.split('').map((char, index) => (
                <span
                    key={index}
                    className={styles.char}
                    style={{ '--index': index } as React.CSSProperties}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </>
    );

    // Initial content wrapper with text effect styles
    const content = (
        <span className={styles.text}>
            {chars}
        </span>
    );

    // Combine default container style with passed className (which might override display etc)
    const containerClassName = `${styles.container} ${className}`;
    const mergedStyle: React.CSSProperties = {
        ...(hoverColor ? ({ '--hover-color': hoverColor } as React.CSSProperties) : {}),
        ...style,
    };

    if (href) {
        return (
            <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={containerClassName} onClick={onClick} style={mergedStyle}>
                {content}
            </Link>
        );
    }

    return (
        <div ref={ref as React.Ref<HTMLDivElement>} className={containerClassName} onClick={onClick} style={{ cursor: 'pointer', ...mergedStyle }}>
            {content}
        </div>
    );
});

HoverLink.displayName = 'HoverLink';

export default HoverLink;
