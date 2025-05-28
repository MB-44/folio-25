import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

declare global { interface Window { isAudioEnabled: boolean; } }

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
  const [audioData, setAudioData] = useState<number[]>([0.2, 0.2, 0.2, 0.2]);

  const audioElementRef = useRef<HTMLAudioElement>(null);
  const uiSoundRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const setupAudioContext = () => {
    if (!audioElementRef.current) return;
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const audioContext = audioContextRef.current;
    if (!sourceNodeRef.current) {
      sourceNodeRef.current = audioContext.createMediaElementSource(audioElementRef.current);
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
      const numBars = 4;
      const sampleSize = Math.floor(dataArray.length / numBars);
      const newData = Array.from({ length: numBars }, (_, i) => {
        const startIndex = i * sampleSize;
        let sum = 0;
        for (let j = 0; j < sampleSize; j++) {
          sum += dataArray[startIndex + j] || 0;
        }
        const average = sum / sampleSize;
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
      playPromise.then(() => {
        ui.pause();
        ui.currentTime = 0;
      }).catch(() => {});
    }
  };

  const toggleAudioIndicator = () => {
    const newState = !isAudioPlaying;
    setIsAudioPlaying(newState);
    onToggle?.(newState);
    if (!newState && animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      setAudioData([0.2, 0.2, 0.2, 0.2]);
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
          } catch {}
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
          try { await audioContextRef.current.resume(); } catch {}
        }
        if (audioElementRef.current?.paused) {
          try { await audioElementRef.current.play(); } catch {}
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
        setAudioData([0.2, 0.2, 0.2, 0.2]);
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
        try { audioElementRef.current?.play(); } catch {}
        setIsAudioPlaying(true);
        setupAudioContext();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isAudioPlaying, wasPlayingBeforeHidden, hasUserInteracted]);

  return (
    <button className={styles.audioButton} onClick={toggleAudioIndicator} aria-label={isAudioPlaying ? "Mute audio" : "Play audio"}>
      <audio ref={audioElementRef} className="hidden" src={loopAudioSrc} loop preload="auto" />
      <audio ref={uiSoundRef} className="hidden" src={uiSoundSrc} preload="auto" />
      <div className={styles.linesContainer}>
        {audioData.map((value, index) => (
          <div key={index} className={styles.lineWrapper}>
            <div
              className={styles["indicator-line"]}
              style={{ transform: `scaleY(${value * 3})`, transitionDuration: isAudioPlaying ? "0.05s" : "0.2s" }}
            />
          </div>
        ))}
      </div>
    </button>
  );
};

export default AudioControlButton;