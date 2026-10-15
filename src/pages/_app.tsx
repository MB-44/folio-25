import "@/styles/globals.css";
import type { AppProps } from "next/app";

import CommandLine from "@/components/CommandLine/CommandLine";
import { GlobalAudioController } from "@/components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CommandLine />
      {/* <GlobalAudioController /> -- Temporarily disabled; toggle following cursor */}
      <Component {...pageProps} />
    </>
  );
}