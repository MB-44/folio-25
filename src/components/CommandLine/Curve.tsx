import React from 'react'
import { motion } from 'framer-motion';

export default function Curve() {

    const initialPath = `M60 0 L60 ${window.innerHeight} Q-60 ${window.innerHeight / 2} 60 0`
    const targetPath = `M60 0 L60 ${window.innerHeight} Q60 ${window.innerHeight / 2} 60 0`

    const curve = {
        initial: {
            d: initialPath
        },
        enter: {
            d: targetPath,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: initialPath,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }
    }

    return (
        <svg style={{
            position: 'absolute',
            top: 0,
            left: '-59px',
            width: '60px',
            height: '100%',
            fill: '#292929',
            stroke: 'none',
            zIndex: 1,
        }}>
            <motion.path variants={curve} initial="initial" animate="enter" exit="exit"></motion.path>
        </svg>
    )
}
