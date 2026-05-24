"use client";

import type { CategoryTreeNode } from "@/types/category-tree";

import { APP_LOCALE } from "@/constants/locale";
import { useCategoryTree } from "@/hooks/use-category-tree";

function TreeList({ nodes, depth = 0 }: { nodes: CategoryTreeNode[]; depth?: number }) {
  if (nodes.length === 0) return null;

  return (
    <ul className={depth === 0 ? "space-y-1" : "mt-1 space-y-1 border-l border-slate-200 pl-4"}>
      {nodes.map((node) => (
        <li key={node.documentId}>
          <div className="text-sm">
            <span className="font-medium text-slate-900">{node.name}</span>
            <span className="ml-2 text-slate-500">
              /{node.slug} · L{node.level}
            </span>
          </div>
          <TreeList nodes={node.children} depth={depth + 1} />
        </li>
      ))}
    </ul>
  );
}

export function CategoryTreeView() {
  const { data, error, isLoading, isFetching, dataUpdatedAt } = useCategoryTree(APP_LOCALE);

  if (isLoading) {
    return <p className="text-sm text-slate-600">Loading category tree from Strapi…</p>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        <p className="font-medium">Request failed</p>
        <p className="mt-1">{error instanceof Error ? error.message : "Unknown error"}</p>
        <p className="mt-2 text-red-700">
          Check that Strapi is running at{" "}
          <code className="rounded bg-red-100 px-1">
            {process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"}
          </code>{" "}
          and Public role can read <code className="rounded bg-red-100 px-1">product-categories</code>.
        </p>
      </div>
    );
  }

  const roots = data ?? [];
  const totalNodes = countNodes(roots);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        <p>
          <span className="font-medium">{roots.length}</span> root categories ·{" "}
          <span className="font-medium">{totalNodes}</span> nodes total
          {isFetching ? " · refreshing…" : null}
        </p>
        <p className="mt-1 text-slate-500">
          Cached in React Query (key: <code className="rounded bg-white px-1">category-tree/en</code>
          ). Last fetch: {new Date(dataUpdatedAt).toLocaleTimeString()}
        </p>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Tree (UI)
        </h2>
        <TreeList nodes={roots} />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          JSON (debug)
        </h2>
        <pre className="max-h-96 overflow-auto rounded-lg border border-slate-200 bg-white p-4 text-xs text-slate-800">
          {JSON.stringify(roots, null, 2)}
        </pre>
      </section>
    </div>
  );
}

function countNodes(nodes: CategoryTreeNode[]): number {
  return nodes.reduce((sum, n) => sum + 1 + countNodes(n.children), 0);
}
