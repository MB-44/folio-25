import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

export default function Curve() {
    // We need to calculate width on client side or use percentage if possible.
    // SVG paths with bezier curves usually rely on absolute coordinates or viewBox.
    // A horizontal curve that flattens out:
    // Initial (Curved upwards/downwards?): When closed, it's offscreen. When opening, it should trail?
    // "same curve animations" -> Side panel trails behind.
    // So bottom sheet: Top edge should curve downwards (concave) or upwards (convex) as it moves up?
    // Usually "Curve" effect means the leading edge forms a curve.
    // Moving UP: Leading edge is TOP.
    // Initial: Top edge is curved DOWN (concave) or UP?
    // If it acts like a liquid dragging up, the center lags behind, so it curves DOWN (convex relative to movement).
    // Target: Flat.

    // Implementation detail:
    // We need window width.

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Avoid rendering with 0 width to prevent weird jumps, or just render flat initially.
    if (windowWidth === 0) return null;

    // Height of the curve wrapper: 100px?
    // The curve is on top of the panel (-100px top).
    // Path: Start at (0, 100), Line to (width, 100).
    // Control point for Q: (width/2, -100) -> This curves UP.
    // Or (width/2, 200)?
    // Let's assume the SVG is 100px height.
    // Baseline is y=100 (bottom of SVG, connecting to panel).
    // We want the edge to be at y=100 and curve UPWARDS to y=0?

    // Initial (lags behind): Flat? No, the side panel was curved initially and flattened on enter.
    // Side panel initial: `Q-100` (lagging left) -> Target `Q0` (Flat).
    // Bottom panel move UP. Edge is TOP.
    // Initial: Curve DOWN (lagging). Center is lower than sides.
    // M0,100 Lwidth,100 ... wait.
    // The shape is the "Empty space" above? No, the shape is the fill of the panel extension.
    // SVG is positioned at `top: -100px`.
    // Panel is white. SVG should be white.
    // Path should fill the area "under" the curve.
    // If lagging, the curve goes into the panel? NO.
    // If moving UP, the center lags, so it is LOWER.
    // Sides are at (0, 0) relative to panel top? No, side panel curve is an extension.
    // Side panel: `left: -99px`. It sticks out.
    // Bottom panel: Should stick out TOP. `top: -99px`.
    // Logic: Center lags. Leading edge is Top. Center is LOWER.
    // Target: Flat line at y=100 (Where 100 connects to panel top).
    // Initial: Curve at y=100 with Q(width/2, 100 + 100) = 200? (Deeper into panel?)
    // Wait, side panel: `initialPath` had Q at `window.innerHeight / 2`.
    // Side panel moves Left <- Right. Leading edge Left.
    // Center lagged Right (x=100).
    // Bottom panel moves Up ^. Leading edge Top.
    // Center lags Down (y=positive).

    // SVG Height: 100px.
    // Base line: 100 (connecting to panel).  L(width, 100) L(0, 100).
    // Curve: M0,100 Q(width/2, 100 - X) ... 
    // If center lags down: Q(width/2, 100 + X). But SVG ends at 100.
    // So the curve is INSIDE the panel visual.
    // But usually this effect adds a "blob" that leads.
    // If it leads/bulges: Center is HIGHER. Q(width/2, 0).
    // Let's assume the "Sticky" effect where it bulges OUT initially then flattens?
    // Actually the previous side panel:
    // `M60 0 L60 height Q-60 height/2 60 0`
    // `60` is right edge (or width). `0` is left edge.
    // It moves Right to Left (enter). x: 100% -> 0.
    // Start: Q -60 (Leftwards bulge? No, -60 is outside left).
    // Target: Q 60 (Flat along right edge?).
    // Wait, `left: -59px`.
    // It seems the curve is an overlay.

    // Revised Plan:
    // Simple "Bulge up" effect.
    // SVG at top: -100px. Height 100px.
    // Initial: Flat at bottom (y=100).
    // Enter: Bulge up to y=0? Q(width/2, 0).
    // Exit: Flat at bottom (y=100).
    // This looks like it "grows" or "leads".

    // User said "appear from the bottom".
    // Let's try:
    // SVG `top: -100px`.
    // Initial: M0 100 L{width} 100 Q{width/2} 100 0 100 (Flat at connection).
    // Enter: M0 100 L{width} 100 Q{width/2} 0 0 100 (Bulge Up).
    // Exit: Flat.

    const height = 100;

    const initialPath = `M0 100 Q${windowWidth / 2} 100 ${windowWidth} 100 L${windowWidth} 100 L0 100`;
    const targetPath = `M0 100 Q${windowWidth / 2} 0 ${windowWidth} 100 L${windowWidth} 100 L0 100`;
    // Note: The L commands close the shape but the Q does the work.
    // Shape: Start 0,100 (Bottom Left). Quadratic to width,100 (Bottom Right) via control.
    // We need to fill the shape between the curve and the bottom line?
    // Wait, fill is White.
    // 0,100 is connected to panel.
    // So we need the shape to be the "Mountain".

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
            top: '-99px',
            left: 0,
            width: '100%',
            height: '100px',
            fill: 'white',
            stroke: 'none',
            zIndex: 1,
            pointerEvents: 'none', // Don't block clicks if it covers something
        }}>
            <motion.path variants={curve} initial="initial" animate="enter" exit="exit"></motion.path>
        </svg>
    )
}
