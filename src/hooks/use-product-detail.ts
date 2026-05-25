"use client";

import { useQuery } from "@tanstack/react-query";

import { APP_LOCALE, type AppLocale } from "@/constants/locale";
import { fetchProductDetail } from "@/lib/catalog/fetch-products";
import { queryKeys } from "@/lib/query/query-keys";

const PRODUCT_DETAIL_STALE_MS = 5 * 60 * 1000;

export function useProductDetail(slug: string, locale: AppLocale = APP_LOCALE) {
  return useQuery({
    queryKey: queryKeys.productDetail(locale, slug),
    queryFn: () => fetchProductDetail(slug, locale),
    enabled: Boolean(slug),
    staleTime: PRODUCT_DETAIL_STALE_MS,
  });
}
