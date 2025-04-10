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
  const [isIndicatorActive, setIsIndicatorActive] = useState(initialPlayState);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [wasPlayingBeforeHidden, setWasPlayingBeforeHidden] = useState(false);
  
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const uiSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    window.isAudioEnabled = isAudioPlaying;
  }, [isAudioPlaying]);

  const playUISound = () => {
    if (!uiSoundRef.current || !window.isAudioEnabled) return;
    
    uiSoundRef.current.currentTime = 0;
    
    const playPromise = uiSoundRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setTimeout(() => {
          if (uiSoundRef.current) {
            uiSoundRef.current.pause();
            uiSoundRef.current.currentTime = 0;
          }
        }, 1000); // Stop after 1 second
      }).catch(error => {
        console.log("UI sound failed to play:", error);
      });
    }
  };

  const toggleAudioIndicator = () => {
    const newState = !isAudioPlaying;
    setIsAudioPlaying(newState);
    setIsIndicatorActive(newState);
    
    if (onToggle) {
      onToggle(newState);
    }
  };

  useEffect(() => {
    const handleGlobalClick = async () => {
      if (!hasUserInteracted) {
        try {
          setHasUserInteracted(true);
          if (audioElementRef.current) {
            await audioElementRef.current.play();
          }
          setIsAudioPlaying(true);
          setIsIndicatorActive(true);
          if (onToggle) {
            onToggle(true);
          }
        } catch (error) {
          console.log("Audio autoplay failed:", error);
        }
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [hasUserInteracted, onToggle]);

  useEffect(() => {
    const handleAudio = async () => {
      try {
        if (isAudioPlaying) {
          await audioElementRef.current?.play();
        } else {
          audioElementRef.current?.pause();
        }
      } catch (error) {
        console.log("Audio playback failed:", error);
        setIsAudioPlaying(false);
        setIsIndicatorActive(false);
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
          setIsIndicatorActive(false);
        }
      } else {
        if (wasPlayingBeforeHidden && hasUserInteracted) {
          audioElementRef.current?.play().catch(error => {
            console.log("Audio resume failed:", error);
          });
          setIsAudioPlaying(true);
          setIsIndicatorActive(true);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isAudioPlaying, wasPlayingBeforeHidden, hasUserInteracted]);

  return (
    <button
      className="flex items-center space-x-0.5"
      onClick={toggleAudioIndicator}
      aria-label={isAudioPlaying ? "Mute audio" : "Play audio"}
    >
      <audio
        ref={audioElementRef}
        className="hidden"
        src={loopAudioSrc}
        loop
        preload="auto"
      />
      <audio 
        ref={uiSoundRef}
        className="hidden"
        src={uiSoundSrc}
        preload="auto"
      />
      
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={`${styles['indicator-line']} ${isIndicatorActive ? styles.active : ""}`}
          style={{ animationDelay: `${bar * 0.1}s` }}
        />
      ))}
    </button>
  );
};

export default AudioControlButton;