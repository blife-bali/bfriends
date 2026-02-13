"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "bfriends-sound-preference";

type SoundContextValue = {
  soundEnabled: boolean | null;
  setSoundEnabled: (enabled: boolean) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabledState] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) setSoundEnabledState(stored === "true");
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setSoundEnabledState(enabled);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, String(enabled));
    }
  }, []);

  return (
    <SoundContext.Provider value={{ soundEnabled, setSoundEnabled }}>
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
