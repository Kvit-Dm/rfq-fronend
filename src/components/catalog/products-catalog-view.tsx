"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, ChevronDown, Filter, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { CategoryFilterDropdowns } from "@/components/catalog/category-filter-dropdowns";
import { collectCategoryFilterSlugs } from "@/lib/catalog/category-tree-utils";
import type { ProductsSort } from "@/lib/catalog/filter-products";
import { filterProducts } from "@/lib/catalog/filter-products";
import { productHref } from "@/lib/catalog/product-path";
import { buildProductsPageHref } from "@/lib/catalog/products-url";
import { productFacetValues } from "@/lib/catalog/product-facets";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  resetFilters,
  setCategorySlugs,
  setSearch,
  setSort,
  toggleCertification,
  toggleProducer,
} from "@/lib/store/slices/products-filters-slice";
import type { AppDispatch } from "@/lib/store/store";
import type { CategoryTreeNode } from "@/types/category-tree";
import type { ProductListItem } from "@/types/catalog";

const PRODUCTS_PAGE_SIZE = 12;

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type ProductsCatalogViewProps = {
  items: ProductListItem[];
  categoryTree: CategoryTreeNode[];
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  lockedCategorySlug?: string;
  lockedProducerSlug?: string;
  isLoading?: boolean;
};

function applyLockedFilters(
  dispatch: AppDispatch,
  categoryTree: CategoryTreeNode[],
  lockedCategorySlug?: string,
  lockedProducerSlug?: string,
) {
  dispatch(resetFilters());
  if (lockedCategorySlug) {
    dispatch(
      setCategorySlugs(collectCategoryFilterSlugs(categoryTree, lockedCategorySlug)),
    );
  }
  if (lockedProducerSlug) dispatch(toggleProducer(lockedProducerSlug));
}

function FacetCheckboxRow({
  id,
  label,
  checked,
  onCheckedChange,
  count,
  disabled,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  count?: number;
  disabled?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex items-start gap-3 rounded-lg border border-transparent px-2 py-2 text-sm text-slate-700 ${
        disabled ? "cursor-default opacity-70" : "cursor-pointer hover:border-slate-200 hover:bg-slate-50"
      }`}
    >
      <Checkbox.Root
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={(v) => onCheckedChange(v === true)}
        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-slate-300 bg-white data-[state=checked]:border-brand data-[state=checked]:bg-brand disabled:opacity-60"
      >
        <Checkbox.Indicator>
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span className="flex-1 leading-snug">{label}</span>
      {count != null ? <span className="text-xs tabular-nums text-slate-400">{count}</span> : null}
    </label>
  );
}

/** Counts from the full catalog (not narrowed by other facets), so counts stay stable while filtering. */
function facetCounts(items: ProductListItem[]) {
  const byCategory = new Map<string, number>();
  const byProducer = new Map<string, number>();
  const byCert = new Map<string, number>();
  for (const it of items) {
    byCategory.set(it.categorySlug, (byCategory.get(it.categorySlug) ?? 0) + 1);
    byProducer.set(it.producerSlug, (byProducer.get(it.producerSlug) ?? 0) + 1);
    for (const c of it.certifications) {
      byCert.set(c, (byCert.get(c) ?? 0) + 1);
    }
  }
  return { byCategory, byProducer, byCert };
}

export function ProductsCatalogView({
  items,
  categoryTree,
  title,
  description,
  breadcrumbs = [{ label: "Products" }],
  lockedCategorySlug,
  lockedProducerSlug,
  isLoading = false,
}: ProductsCatalogViewProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.productsFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [pagination, setPagination] = useState({ filterKey: "", page: 1 });

  useEffect(() => {
    if (categoryTree.length === 0) return;
    applyLockedFilters(dispatch, categoryTree, lockedCategorySlug, lockedProducerSlug);
  }, [dispatch, categoryTree, lockedCategorySlug, lockedProducerSlug]);

  const facets = useMemo(() => productFacetValues(items), [items]);
  const counts = useMemo(() => facetCounts(items), [items]);

  const filtered = useMemo(
    () =>
      filterProducts(items, {
        search: filters.search,
        categorySlugs: filters.categorySlugs,
        producerSlugs: filters.producerSlugs,
        certifications: filters.certifications,
        sort: filters.sort,
      }),
    [items, filters],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PAGE_SIZE));

  const filterKey = useMemo(
    () =>
      [
        filters.search,
        filters.categorySlugs.join(","),
        filters.producerSlugs.join(","),
        filters.certifications.join(","),
        filters.sort,
      ].join("|"),
    [filters],
  );

  const page =
    pagination.filterKey === filterKey
      ? Math.min(pagination.page, totalPages)
      : 1;

  const setPage = (next: number) => {
    setPagination({
      filterKey,
      page: Math.max(1, Math.min(next, totalPages)),
    });
  };

  const pageItems = useMemo(() => {
    const start = (page - 1) * PRODUCTS_PAGE_SIZE;
    return filtered.slice(start, start + PRODUCTS_PAGE_SIZE);
  }, [filtered, page]);

  const activeFilterCount =
    (lockedCategorySlug ? 0 : filters.categorySlugs.length > 0 ? 1 : 0) +
    (lockedProducerSlug ? 0 : filters.producerSlugs.length) +
    filters.certifications.length +
    (filters.search.trim() ? 1 : 0);

  const clearFilters = () =>
    applyLockedFilters(dispatch, categoryTree, lockedCategorySlug, lockedProducerSlug);

  return (
    <div className="border-b border-slate-200/80 bg-[var(--page-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <nav className="text-xs text-slate-500" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb, i) => (
              <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                <span aria-hidden>/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-brand">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-slate-700">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">{description}</p>
          </div>
          <p className="text-sm text-slate-500">
            <span className="font-semibold tabular-nums text-slate-800">{filtered.length}</span> of{" "}
            <span className="tabular-nums">{items.length}</span> products match
            {isLoading ? " · loading…" : null}
          </p>
        </div>

        <div className="mt-6 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm"
          >
            <span className="inline-flex items-center gap-2">
              <Filter className="h-4 w-4 text-brand" aria-hidden />
              Filters
              {activeFilterCount > 0 ? (
                <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-bold text-brand">
                  {activeFilterCount}
                </span>
              ) : null}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-slate-500 transition ${mobileFiltersOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside
            className={`space-y-6 lg:block ${mobileFiltersOpen ? "block" : "hidden"}`}
            aria-label="Filters"
          >
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-24">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900">Refine results</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                  Clear
                </button>
              </div>

              <div className="mt-4">
                <label htmlFor="pg-search" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Search
                </label>
                <div className="relative mt-1.5">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="pg-search"
                    value={filters.search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    placeholder="Name, producer, category…"
                    className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none ring-brand/30 placeholder:text-slate-400 focus:border-brand focus:ring-4"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="pg-sort" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Sort
                </label>
                <select
                  id="pg-sort"
                  value={filters.sort}
                  onChange={(e) => dispatch(setSort(e.target.value as ProductsSort))}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/30"
                >
                  <option value="featured">Featured</option>
                  <option value="name-asc">Name (A–Z)</option>
                  <option value="name-desc">Name (Z–A)</option>
                  <option value="producer-asc">Producer (A–Z)</option>
                </select>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <CategoryFilterDropdowns
                  categoryTree={categoryTree}
                  disabled={!!lockedCategorySlug || categoryTree.length === 0}
                />
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Producer</p>
                <div className="mt-2 space-y-1">
                  {facets.producers.map(({ slug, name }) => {
                    const has = filters.producerSlugs.includes(slug);
                    return (
                      <FacetCheckboxRow
                        key={slug}
                        id={`prod-${slug}`}
                        label={name}
                        checked={has}
                        disabled={!!lockedProducerSlug}
                        onCheckedChange={(on) => {
                          if (on !== has) dispatch(toggleProducer(slug));
                        }}
                        count={counts.byProducer.get(slug)}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Certifications</p>
                <p className="mt-1 text-[11px] leading-snug text-slate-500">
                  Match <span className="font-semibold">all</span> selected labels.
                </p>
                <div className="mt-2 space-y-1">
                  {facets.certifications.map((c) => {
                    const has = filters.certifications.includes(c);
                    return (
                      <FacetCheckboxRow
                        key={c}
                        id={`cert-${c}`}
                        label={c}
                        checked={has}
                        onCheckedChange={(on) => {
                          if (on !== has) dispatch(toggleCertification(c));
                        }}
                        count={counts.byCert.get(c)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          <section aria-label="Products">
            {isLoading ? (
              <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-600 shadow-sm">
                Loading products from catalog…
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
                <p className="text-base font-semibold text-slate-900">No products match these filters</p>
                <p className="mt-2 text-sm text-slate-600">Try clearing certifications or widening your search.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <>
              <ul className="grid gap-5 sm:grid-cols-2">
                {pageItems.map((it) => (
                  <li key={it.id}>
                    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand/30 hover:shadow-md">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            href={buildProductsPageHref(it.categorySlug)}
                            className="text-xs font-semibold uppercase tracking-wide text-brand hover:underline"
                          >
                            {it.categoryName}
                          </Link>
                          <h2 className="mt-1 text-lg font-semibold text-slate-900">{it.name}</h2>
                          <p className="mt-1 text-sm text-slate-500">{it.producerName}</p>
                        </div>
                      </div>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{it.shortDescription}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {it.certifications.slice(0, 3).map((c) => (
                          <span
                            key={c}
                            className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                        <Link
                          href={`/producers/${it.producerSlug}`}
                          className="text-sm font-semibold text-slate-700 hover:text-brand"
                        >
                          Producer profile
                        </Link>
                        <Link
                          href={productHref(it)}
                          className="inline-flex items-center gap-1 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
                        >
                          View product
                        </Link>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>

              {totalPages > 1 ? (
                <nav
                  className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                  aria-label="Products pagination"
                >
                  <p className="text-sm text-slate-600">
                    Page <span className="font-semibold text-slate-900">{page}</span> of{" "}
                    <span className="font-semibold text-slate-900">{totalPages}</span>
                    <span className="text-slate-400">
                      {" "}
                      · showing {(page - 1) * PRODUCTS_PAGE_SIZE + 1}–
                      {Math.min(page * PRODUCTS_PAGE_SIZE, filtered.length)} of {filtered.length}
                    </span>
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => setPage(page - 1)}
                      className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => setPage(page + 1)}
                      className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </nav>
              ) : null}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
