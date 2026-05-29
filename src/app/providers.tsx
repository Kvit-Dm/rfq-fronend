"use client";

import type { ReactNode } from "react";

import { SlidersProvider } from "@/components/sliders";
import { QueryProvider } from "@/lib/query/query-provider";
import { ReduxStoreProvider } from "@/lib/store/store-provider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <ReduxStoreProvider>
        <SlidersProvider>{children}</SlidersProvider>
      </ReduxStoreProvider>
    </QueryProvider>
  );
}
