"use client";

import { useMemo } from "react";

import {
  getRootCategoryOptions,
  getSubcategoryOptions,
} from "@/lib/catalog/category-filter-options";
import {
  collectCategoryFilterSlugs,
  findCategoryBySlug,
  findCategoryRootSlug,
} from "@/lib/catalog/category-tree-utils";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setCategorySlugs } from "@/lib/store/slices/products-filters-slice";
import type { CategoryTreeNode } from "@/types/category-tree";

type CategoryFilterDropdownsProps = {
  categoryTree: CategoryTreeNode[];
  disabled?: boolean;
};

export function CategoryFilterDropdowns({
  categoryTree,
  disabled = false,
}: CategoryFilterDropdownsProps) {
  const dispatch = useAppDispatch();
  const categorySlugs = useAppSelector((s) => s.productsFilters.categorySlugs);

  const primarySlug = categorySlugs[0] ?? null;

  const activeNode = useMemo(
    () => (primarySlug ? findCategoryBySlug(categoryTree, primarySlug) : undefined),
    [primarySlug, categoryTree],
  );

  const rootSlug = useMemo(() => {
    if (!primarySlug) return "";
    return findCategoryRootSlug(categoryTree, primarySlug) ?? "";
  }, [primarySlug, categoryTree]);

  const subSlug = useMemo(() => {
    if (!primarySlug || !activeNode) return "";
    if (activeNode.level === 1) return "";
    return primarySlug;
  }, [primarySlug, activeNode]);

  const rootOptions = useMemo(() => getRootCategoryOptions(categoryTree), [categoryTree]);
  const subOptions = useMemo(
    () => getSubcategoryOptions(categoryTree, rootSlug || null),
    [categoryTree, rootSlug],
  );

  const applyRoot = (slug: string) => {
    if (!slug) {
      dispatch(setCategorySlugs([]));
      return;
    }
    dispatch(setCategorySlugs(collectCategoryFilterSlugs(categoryTree, slug)));
  };

  const applySub = (slug: string) => {
    if (!slug) {
      if (rootSlug) applyRoot(rootSlug);
      return;
    }
    dispatch(setCategorySlugs(collectCategoryFilterSlugs(categoryTree, slug)));
  };

  const resolvedSub =
    subSlug && subOptions.some((o) => o.slug === subSlug) ? subSlug : "";

  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="pg-cat-root" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Category
        </label>
        <select
          id="pg-cat-root"
          value={rootSlug}
          disabled={disabled}
          onChange={(e) => applyRoot(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/30 disabled:opacity-60"
        >
          <option value="">All categories</option>
          {rootOptions.map((opt) => (
            <option key={opt.slug} value={opt.slug}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>

      {rootSlug && subOptions.length > 0 ? (
        <div>
          <label htmlFor="pg-cat-sub" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Subcategory
          </label>
          <select
            id="pg-cat-sub"
            value={resolvedSub}
            disabled={disabled}
            onChange={(e) => applySub(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/30 disabled:opacity-60"
          >
            <option value="">All in {rootOptions.find((r) => r.slug === rootSlug)?.name}</option>
            {subOptions.map((opt) => (
              <option key={opt.slug} value={opt.slug}>
                {opt.level > 2 ? "— " : ""}
                {opt.name}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </div>
  );
}
