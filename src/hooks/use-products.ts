"use client";

import { useQuery } from "@tanstack/react-query";

import { APP_LOCALE, type AppLocale } from "@/constants/locale";
import { fetchAllProducts } from "@/lib/catalog/fetch-products";
import { queryKeys } from "@/lib/query/query-keys";

const PRODUCTS_STALE_MS = 5 * 60 * 1000;

export function useProducts(locale: AppLocale = APP_LOCALE) {
  return useQuery({
    queryKey: queryKeys.products(locale),
    queryFn: () => fetchAllProducts(locale),
    staleTime: PRODUCTS_STALE_MS,
  });
}
