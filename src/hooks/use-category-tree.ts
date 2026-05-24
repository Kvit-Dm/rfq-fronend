"use client";

import { useQuery } from "@tanstack/react-query";

import { APP_LOCALE, type AppLocale } from "@/constants/locale";
import { fetchCategoryTree } from "@/lib/catalog/fetch-category-tree";
import { queryKeys } from "@/lib/query/query-keys";

const CATEGORY_TREE_STALE_MS = 5 * 60 * 1000;

export function useCategoryTree(locale: AppLocale = APP_LOCALE) {
  return useQuery({
    queryKey: queryKeys.categoryTree(locale),
    queryFn: () => fetchCategoryTree(locale),
    staleTime: CATEGORY_TREE_STALE_MS,
  });
}
