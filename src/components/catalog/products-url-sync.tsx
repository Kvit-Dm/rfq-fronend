"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { collectCategoryFilterSlugs } from "@/lib/catalog/category-tree-utils";
import {
  PRODUCTS_CATEGORY_PARAM,
  parseProductsCategoryParam,
} from "@/lib/catalog/products-url";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setCategorySlugs } from "@/lib/store/slices/products-filters-slice";
import type { CategoryTreeNode } from "@/types/category-tree";

type ProductsUrlSyncProps = {
  categoryTree?: CategoryTreeNode[];
};

/**
 * Keeps ?category=slug in the URL aligned with Redux category filters.
 */
export function ProductsUrlSync({ categoryTree }: ProductsUrlSyncProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categorySlugs = useAppSelector((s) => s.productsFilters.categorySlugs);

  const categoryParam = parseProductsCategoryParam(searchParams);
  const hydratedFromUrl = useRef(false);

  useEffect(() => {
    if (!categoryParam) {
      hydratedFromUrl.current = true;
      return;
    }

    const slugs = categoryTree
      ? collectCategoryFilterSlugs(categoryTree, categoryParam)
      : [categoryParam];
    dispatch(setCategorySlugs(slugs));
    hydratedFromUrl.current = true;
  }, [categoryParam, categoryTree, dispatch]);

  useEffect(() => {
    if (!hydratedFromUrl.current || pathname !== "/products") return;

    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(PRODUCTS_CATEGORY_PARAM);
    const primary = categorySlugs[0] ?? null;

    if (!primary) {
      if (!current) return;
      params.delete(PRODUCTS_CATEGORY_PARAM);
      const q = params.toString();
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
      return;
    }

    if (current === primary) return;

    params.set(PRODUCTS_CATEGORY_PARAM, primary);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [categorySlugs, categoryParam, pathname, router, searchParams]);

  return null;
}
