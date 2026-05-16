"use client";

import { useMemo } from "react";
import { Provider } from "react-redux";

import { makeStore } from "@/lib/store/store";

type ReduxStoreProviderProps = {
  children: React.ReactNode;
};

/**
 * One store instance per provider mount (Next.js App Router + client islands).
 * Add redux-persist here later if you need rehydration—gate rendering until rehydrated.
 */
export function ReduxStoreProvider({ children }: ReduxStoreProviderProps) {
  const store = useMemo(() => makeStore(), []);
  return <Provider store={store}>{children}</Provider>;
}
