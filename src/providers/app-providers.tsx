"use client";

import type { ReactNode } from "react";

import { SlidersProvider } from "@/components/sliders";
import { ReduxStoreProvider } from "@/lib/store/store-provider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ReduxStoreProvider>
      <SlidersProvider>{children}</SlidersProvider>
    </ReduxStoreProvider>
  );
}
