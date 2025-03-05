'use client';

import { useState } from "react";

import { AnimatePresence, useTime } from "framer-motion";
import { usePathname } from "next/navigation";

import { useTimeOut, useLenis } from "@/_hooks";

import { Preloader } from "./preloader";

/** @param {import('react').PropsWithChildren<unknown>} */
import { ReactNode } from "react";

export function Transition({ children }: { children: ReactNode }) {
    const [isLoading, setLoading] = useState(true);
    const pathName = usePathname();

    useLenis();
    useTimeOut({
        callback: () => {
            setLoading(false);
            window.scrollTo(0, 0);
        },
        duration: 2000,
        deps: [],
    });

    return (
        <div key={pathName} className='overflow-hidden'>
            <AnimatePresence mode="wait">
                {isLoading ? <Preloader/> : null};
            </AnimatePresence>
            {children};
        </div>
    )
}