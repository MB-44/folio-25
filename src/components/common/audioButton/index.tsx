import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

declare global {
  interface Window {
    isAudioEnabled: boolean;
  }
}

interface AudioControlButtonProps {
  initialPlayState?: boolean;
  onToggle?: (isPlaying: boolean) => void;
  loopAudioSrc?: string;
  uiSoundSrc?: string;
}

const AudioControlButton = ({
  initialPlayState = false,
  onToggle,
  loopAudioSrc = "/audio/loop.mp3",
  uiSoundSrc = "/audio/ui.mp3"
}: AudioControlButtonProps) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(initialPlayState);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [wasPlayingBeforeHidden, setWasPlayingBeforeHidden] = useState(false);
  const [audioData, setAudioData] = useState<number[]>([0.2, 0.2, 0.2, 0.2, 0.2]);

  const audioElementRef = useRef<HTMLAudioElement>(null);
  const uiSoundRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const setupAudioContext = () => {
    if (!audioElementRef.current) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;

    if (!sourceNodeRef.current) {
      sourceNodeRef.current = audioContext.createMediaElementSource(
        audioElementRef.current
      );
    }

    if (!analyserRef.current) {
      analyserRef.current = audioContext.createAnalyser();
      analyserRef.current.fftSize = 32;
    }

    sourceNodeRef.current.disconnect();
    analyserRef.current.disconnect();
    sourceNodeRef.current.connect(analyserRef.current);
    analyserRef.current.connect(audioContext.destination);

    startAudioVisualization();
  };

  useEffect(() => {
    window.isAudioEnabled = isAudioPlaying;

    if (isAudioPlaying && audioElementRef.current) {
      setupAudioContext();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      sourceNodeRef.current?.disconnect();
      analyserRef.current?.disconnect();
    };
  }, [isAudioPlaying]);

  const startAudioVisualization = () => {
    if (!analyserRef.current) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

    const updateVisualizer = () => {
      if (!analyserRef.current || !isAudioPlaying) return;

      analyserRef.current.getByteFrequencyData(dataArray);

      const numBars = 5;
      const sampleSize = Math.floor(dataArray.length / numBars);

      const newData = Array.from({ length: numBars }, (_, i) => {
        const startIndex = i * sampleSize;
        let sum = 0;
        for (let j = 0; j < sampleSize; j++) {
          sum += dataArray[startIndex + j] || 0;
        }
        const average = sum / sampleSize;
        // keep within [0.2, 1] like before
        return Math.max(0.2, Math.min(1, (average / 255) * 3));
      });

      setAudioData(newData);
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    };

    animationFrameRef.current = requestAnimationFrame(updateVisualizer);
  };

  const playUISound = () => {
    const ui = uiSoundRef.current;
    if (!ui) return;

    ui.currentTime = 0;
    const playPromise = ui.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          ui.pause();
          ui.currentTime = 0;
        })
        .catch(() => {});
    }
  };

  const toggleAudioIndicator = () => {
    const newState = !isAudioPlaying;
    setIsAudioPlaying(newState);
    onToggle?.(newState);

    if (!newState && animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      setAudioData([0.2, 0.2, 0.2, 0.2, 0.2]);
    }

    playUISound();
  };

  useEffect(() => {
    const handleGlobalClick = async () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        if (audioElementRef.current) {
          try {
            await audioElementRef.current.play();
            setIsAudioPlaying(true);
            onToggle?.(true);
          } catch {
            // autoplay blocked – user can press the button
          }
        }
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [hasUserInteracted, onToggle]);

  useEffect(() => {
    const handleAudio = async () => {
      if (isAudioPlaying) {
        if (audioContextRef.current?.state === "suspended") {
          try {
            await audioContextRef.current.resume();
          } catch {}
        }
        if (audioElementRef.current?.paused) {
          try {
            await audioElementRef.current.play();
          } catch {}
        }
        if (!analyserRef.current || !sourceNodeRef.current) {
          setupAudioContext();
        } else {
          startAudioVisualization();
        }
      } else {
        audioElementRef.current?.pause();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        setAudioData([0.2, 0.2, 0.2, 0.2, 0.2]);
      }
    };

    handleAudio();
  }, [isAudioPlaying]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWasPlayingBeforeHidden(isAudioPlaying);
        if (isAudioPlaying) {
          audioElementRef.current?.pause();
          setIsAudioPlaying(false);
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
        }
      } else if (wasPlayingBeforeHidden && hasUserInteracted) {
        try {
          audioElementRef.current?.play();
        } catch {}
        setIsAudioPlaying(true);
        setupAudioContext();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isAudioPlaying, wasPlayingBeforeHidden, hasUserInteracted]);

  // x positions for the 5 SVG bars, like the original HTML
  const barXPositions = [1, 5, 9, 13, 17];

  return (
    <button
      className={`${styles.audioButton} ${
        isAudioPlaying ? styles.active : styles.inactive
      }`}
      onClick={toggleAudioIndicator}
      aria-label={isAudioPlaying ? "Mute audio" : "Play audio"}
      data-cursor="hide"
    >
      <span className={styles.srOnly}>Toggle Sound</span>

      {/* background circle */}
      <div className={styles.muteBg} />

      {/* SVG icon with animated lines */}
      <svg
        className={styles.muteIcon}
        viewBox="0 0 18 16"
        aria-hidden="true"
        focusable="false"
      >
        {audioData.map((value, index) => (
          <line
            key={index}
            className={styles.muteIconLine}
            x1={barXPositions[index]}
            y1={0}
            x2={barXPositions[index]}
            y2={16}
            style={{
              transform: `scaleY(${
                isAudioPlaying ? value * 3 : 0.25 // small bars when muted
              })`,
              transitionDuration: isAudioPlaying ? "0.08s" : "0.2s"
            }}
          />
        ))}
      </svg>

      {/* inner fill overlay (for subtle effect, like original) */}
      <div className={styles.muteInner}>
        <span className={styles.muteFill} />
      </div>

      <audio
        ref={audioElementRef}
        className={styles.hidden}
        src={loopAudioSrc}
        loop
        preload="auto"
      />

      {/* uncomment if you want a UI click sound */}
      {/* <audio
        ref={uiSoundRef}
        className={styles.hidden}
        src={uiSoundSrc}
        preload="auto"
      /> */}
    </button>
  );
};

export default AudioControlButton;