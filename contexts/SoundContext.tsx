"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const STORAGE_KEY = "bfriends-sound-preference";
const AMBIENCE_SRC = "/audio/main.mp3";

type SoundContextValue = {
  soundEnabled: boolean | null;
  setSoundEnabled: (enabled: boolean) => void;
  /** Call from user gesture (e.g. Startup "With Ambience") to start background audio */
  playAmbience: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabledState] = useState<boolean | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) setSoundEnabledState(stored === "true");
  }, []);

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
