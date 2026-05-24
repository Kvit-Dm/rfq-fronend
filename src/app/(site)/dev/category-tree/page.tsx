import type { Metadata } from "next";

import { CategoryTreeView } from "@/components/dev/category-tree-view";

export const metadata: Metadata = {
  title: "Category tree (dev)",
  robots: { index: false, follow: false },
};

export default function CategoryTreeDevPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">Category tree from Strapi</h1>
      <p className="mt-2 text-sm text-slate-600">
        Internal check only (not linked in nav). Confirms Strapi flat list → tree conversion and
        React Query cache. Open TanStack Query Devtools (bottom-right) to inspect the cached value.
      </p>
      <div className="mt-8">
        <CategoryTreeView />
      </div>
    </div>
  );
}
