"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

const STORAGE_KEY = "bfriends-sound-preference";
const AMBIENCE_SRC = "/audio/main.mp3";

type SoundContextValue = {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  /** Call from a user gesture (e.g. floater toggle) to start background audio */
  playAmbience: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabledState] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setSoundEnabledState(enabled);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, String(enabled));
    }
    if (!enabled) {
      audioRef.current?.pause();
    }
  }, []);

  const playAmbience = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.loop = true;
    el.play().catch(() => {});
  }, []);

  return (
    <SoundContext.Provider
      value={{ soundEnabled, setSoundEnabled, playAmbience }}
    >
      <audio
        ref={audioRef}
        src={AMBIENCE_SRC}
        loop
        preload="auto"
        playsInline
        aria-hidden
        className="sr-only"
      />
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return ctx;
}
