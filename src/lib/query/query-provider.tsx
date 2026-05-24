"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useMemo } from "react";

import { makeQueryClient } from "@/lib/query/query-client";

type QueryProviderProps = {
  children: React.ReactNode;
};

/**
 * One QueryClient per provider mount (Next.js App Router + client islands).
 * Keeps server/async state separate from Redux (UI filters, etc.).
 */
export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = useMemo(() => makeQueryClient(), []);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
    </QueryClientProvider>
  );
}
