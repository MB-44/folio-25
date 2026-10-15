/* Global background audio controller with cursor prompt + status dot */
'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

declare global {
  interface Window {
    isAudioEnabled?: boolean;
  }
}

interface GlobalAudioControllerProps {
  loopAudioSrc?: string;
}

const GlobalAudioController = ({
  loopAudioSrc = "/audio/cosmic_drift.mp3",
}: GlobalAudioControllerProps) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hidePromptTimeoutRef = useRef<number | null>(null);

  /* Set up audio element once */
  useEffect(() => {
    const audio = new Audio(loopAudioSrc);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [loopAudioSrc]);

  /* Keep global flag in sync */
  useEffect(() => {
    window.isAudioEnabled = isAudioPlaying;
  }, [isAudioPlaying]);

  /* Play / pause when state changes */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio
        .play()
        .then(() => {
          // ok
        })
        .catch(() => {
          // if autoplay fails, fall back to "off"
          setIsAudioPlaying(false);
        });
    } else {
      audio.pause();
    }
  }, [isAudioPlaying]);

  /* Auto-start audio on first click anywhere */
  useEffect(() => {
    const handleFirstClick = async () => {
      if (hasUserInteracted || isAudioPlaying) return;
      setHasUserInteracted(true);
      setShowPrompt(false);

      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsAudioPlaying(true);
        } catch {
          // user can still toggle using the status control
        }
      }
    };

    window.addEventListener("click", handleFirstClick);
    return () => window.removeEventListener("click", handleFirstClick);
  }, [hasUserInteracted, isAudioPlaying]);

  /* Cursor tracking for prompt */
  useEffect(() => {
    if (!showPrompt) return;

    const handleMove = (event: MouseEvent) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [showPrompt]);

  /* Hide prompt after 30s or on scroll */
  useEffect(() => {
    if (!showPrompt) return;

    if (hidePromptTimeoutRef.current) {
      window.clearTimeout(hidePromptTimeoutRef.current);
    }

    hidePromptTimeoutRef.current = window.setTimeout(() => {
      setShowPrompt(false);
    }, 30_000);

    const handleScroll = () => {
      setShowPrompt(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (hidePromptTimeoutRef.current) {
        window.clearTimeout(hidePromptTimeoutRef.current);
        hidePromptTimeoutRef.current = null;
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showPrompt]);

  /* Pause / resume on tab visibility change */
  useEffect(() => {
    const handleVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        if (isAudioPlaying) {
          audio.pause();
        }
      } else if (isAudioPlaying) {
        audio.play().catch(() => {
          setIsAudioPlaying(false);
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isAudioPlaying]);

  const toggleAudio = () => {
    setHasUserInteracted(true);
    setShowPrompt(false);
    setIsAudioPlaying((prev) => !prev);
  };

  const isOn = isAudioPlaying;

  return (
    <>
      {/* Cursor-following helper text */}
      {showPrompt && (
        <div
          className={styles.cursorPrompt}
          style={{
            transform: `translate(${cursorPos.x}px, ${cursorPos.y - 24}px)`,
          }}
        >
          click to enable sound
        </div>
      )}

      {/* Bottom-right status dot / circle */}
      <button
        type="button"
        className={`${styles.statusRoot} ${isOn ? styles.statusOn : styles.statusOff}`}
        onClick={(event) => {
          event.stopPropagation();
          toggleAudio();
        }}
        aria-label={isOn ? "Disable sound" : "Enable sound"}
      >
        <div className={styles.iconWrapper}>
          {isOn ? <span className={styles.circleOn} /> : <span className={styles.dotOff} />}
        </div>
        <span className={styles.statusLabel}>{isOn ? "On" : "Off"}</span>
      </button>
    </>
  );
};

export default GlobalAudioController;