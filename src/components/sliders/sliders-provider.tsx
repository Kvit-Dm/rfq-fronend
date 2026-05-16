"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SlidersContextValue = {
  /** Which slider (carousel) currently owns focus for keyboard / sync behavior. */
  activeSliderId: string | null;
  setActiveSliderId: (id: string | null) => void;
};

const SlidersContext = createContext<SlidersContextValue | null>(null);

export type SlidersProviderProps = {
  children: ReactNode;
};

export function SlidersProvider({ children }: SlidersProviderProps) {
  const [activeSliderId, setActiveSliderIdState] = useState<string | null>(null);

  const setActiveSliderId = useCallback((id: string | null) => {
    setActiveSliderIdState(id);
  }, []);

  const value = useMemo(
    () => ({
      activeSliderId,
      setActiveSliderId,
    }),
    [activeSliderId, setActiveSliderId],
  );

  return <SlidersContext.Provider value={value}>{children}</SlidersContext.Provider>;
}

export function useSliders(): SlidersContextValue {
  const ctx = useContext(SlidersContext);
  if (!ctx) {
    throw new Error("useSliders must be used within a SlidersProvider");
  }
  return ctx;
}
