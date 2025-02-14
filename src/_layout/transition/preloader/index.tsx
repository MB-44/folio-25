'use client';

import { useState } from "react";

import { motion } from "framer-motion";
import { Dot } from "lucide-react";

import { Center } from "@/_components";
import { preloaderWords } from "@/_data/";

import { fade, slideUp } from "./variants";

export function Preloader() {
    const [ index, setIndex ] = useState(0);
    // const { width, height } = useDimensionn
     
}