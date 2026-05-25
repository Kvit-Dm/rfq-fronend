"use client";

import Link from "next/link";

import { CategoryTreeExplorer } from "./category-tree-explorer";
import { useCategoryTree } from "@/hooks/use-category-tree";

const contentWidthClass = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

export function CategoriesPage() {
  const { data: roots, error, isLoading } = useCategoryTree();

  return (
    <div className="border-b border-slate-200/80 bg-[var(--page-bg)]">
      <div className={`${contentWidthClass} py-10 lg:py-12`}>
        <nav className="text-xs text-slate-500" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden>/</span>
              <span className="font-medium text-slate-700">Categories</span>
            </li>
          </ol>
        </nav>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Product categories
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Hover a category to open the next level. Click any category to view matching products.
          Open levels stay visible until you hover another branch.
        </p>
      </div>

      <div className={`${contentWidthClass} pb-10 lg:pb-14`}>
        {isLoading ? (
          <p className="py-16 text-sm text-slate-600">Loading categories…</p>
        ) : null}

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-medium">Could not load categories</p>
            <p className="mt-1">{error instanceof Error ? error.message : "Unknown error"}</p>
          </div>
        ) : null}

        {!isLoading && !error && roots && roots.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <CategoryTreeExplorer roots={roots} />
          </div>
        ) : null}

        {!isLoading && !error && roots?.length === 0 ? (
          <p className="py-16 text-sm text-slate-600">No categories published yet.</p>
        ) : null}
      </div>
    </div>
  );
}
