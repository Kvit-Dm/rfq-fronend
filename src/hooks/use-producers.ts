"use client";

import { useQuery } from "@tanstack/react-query";

import { APP_LOCALE, type AppLocale } from "@/constants/locale";
import { fetchAllProducers } from "@/lib/catalog/fetch-producers";
import { queryKeys } from "@/lib/query/query-keys";

const PRODUCERS_STALE_MS = 5 * 60 * 1000;

export function useProducers(locale: AppLocale = APP_LOCALE) {
  return useQuery({
    queryKey: queryKeys.producers(locale),
    queryFn: () => fetchAllProducers(locale),
    staleTime: PRODUCERS_STALE_MS,
  });
}
