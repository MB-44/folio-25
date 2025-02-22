'use client';

import { useState } from "react";

import { useServerInsertedHTML } from "next/navigation";
import { 
    ServerStyleSheet, 
    StyleSheetManager,
    ThemeProvider,
} from "styled-components";

import { theme } from "./theme";

/** @param {import('react').PropsWithChildren<unknown>} */
import { ReactNode } from "react";

export function StyledComponentsRegistry({ children }: { children: ReactNode }) {
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement();
        styledComponentsStyleSheet.instance.clearTag();
        return <>{styles}</>;
    });

    if (typeof window === 'undefined') return <>{children}</>;
        
    return (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </StyleSheetManager>
    );
}