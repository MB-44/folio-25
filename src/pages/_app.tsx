import "@/styles/globals.css";
import type { AppProps } from "next/app";

import CommandLine from "@/components/CommandLine/CommandLine";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CommandLine />
      <Component {...pageProps} />
    </>
  );
}