"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { getCategoryTreeColumns } from "@/lib/catalog/category-tree-utils";
import { buildProductsPageHref } from "@/lib/catalog/products-url";
import type { CategoryTreeNode } from "@/types/category-tree";

const COLUMN_WIDTH_PX = 240;

type CategoryTreeExplorerProps = {
  roots: CategoryTreeNode[];
};

export function CategoryTreeExplorer({ roots }: CategoryTreeExplorerProps) {
  const router = useRouter();
  const [trail, setTrail] = useState<CategoryTreeNode[]>([]);

  const columns = useMemo(() => getCategoryTreeColumns(roots, trail), [roots, trail]);

  const handleHover = useCallback((columnIndex: number, node: CategoryTreeNode) => {
    setTrail((prev) => {
      const next = prev.slice(0, columnIndex);
      next[columnIndex] = node;
      return next;
    });
  }, []);

  const handleSelect = useCallback(
    (node: CategoryTreeNode) => {
      router.push(buildProductsPageHref(node.slug));
    },
    [router],
  );

  return (
    <div
      className="relative overflow-x-auto overflow-y-hidden overscroll-x-contain"
      role="tree"
      aria-label="Product categories"
    >
      <div className="inline-flex min-h-[min(560px,72vh)] min-w-full">
        {columns.map((nodes, columnIndex) => (
          <CategoryTreeColumn
            key={`col-${columnIndex}-${trail[columnIndex - 1]?.documentId ?? "root"}`}
            nodes={nodes}
            columnIndex={columnIndex}
            activeSlug={trail[columnIndex]?.slug}
            onHover={handleHover}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}

type CategoryTreeColumnProps = {
  nodes: CategoryTreeNode[];
  columnIndex: number;
  activeSlug?: string;
  onHover: (columnIndex: number, node: CategoryTreeNode) => void;
  onSelect: (node: CategoryTreeNode) => void;
};

function CategoryTreeColumn({
  nodes,
  columnIndex,
  activeSlug,
  onHover,
  onSelect,
}: CategoryTreeColumnProps) {
  return (
    <div
      className="category-column-enter flex shrink-0 flex-col border-r border-slate-200/90 bg-white last:border-r-0"
      style={{ width: COLUMN_WIDTH_PX }}
      role="group"
      aria-label={`Category level ${columnIndex + 1}`}
    >
      <div className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50/95 px-3 py-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Level {columnIndex + 1}
        </p>
      </div>
      <ul className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain py-1">
        {nodes.map((node) => {
          const isActive = activeSlug === node.slug;
          const hasChildren = node.children.length > 0;

          return (
            <li key={node.documentId}>
              <button
                type="button"
                role="treeitem"
                aria-selected={isActive}
                aria-expanded={hasChildren ? isActive : undefined}
                onMouseEnter={() => onHover(columnIndex, node)}
                onFocus={() => onHover(columnIndex, node)}
                onClick={() => onSelect(node)}
                className={`group flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-brand/10 text-brand-dark"
                    : "text-slate-800 hover:bg-slate-50"
                }`}
              >
                <span className="min-w-0 flex-1 leading-snug font-medium">{node.name}</span>
                {hasChildren ? (
                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isActive ? "translate-x-0.5 text-brand" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                    aria-hidden
                  />
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
