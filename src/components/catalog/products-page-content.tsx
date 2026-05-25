"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { ProductsCatalogView } from "@/components/catalog/products-catalog-view";
import { ProductsUrlSync } from "@/components/catalog/products-url-sync";
import { listProducts } from "@/data/catalog-dummy";
import { useCategoryTree } from "@/hooks/use-category-tree";
import { findCategoryBySlug } from "@/lib/catalog/category-tree-utils";
import { parseProductsCategoryParam } from "@/lib/catalog/products-url";

function ProductsPageInner() {
  const searchParams = useSearchParams();
  const categoryParam = parseProductsCategoryParam(searchParams);
  const { data: categoryTree } = useCategoryTree();

  const items = listProducts();
  const categoryNode =
    categoryParam && categoryTree ? findCategoryBySlug(categoryTree, categoryParam) : undefined;

  const title = categoryNode ? `${categoryNode.name} products` : "All products";
  const description = categoryNode?.description
    ? categoryNode.description
    : "Explore export-oriented product lines from verified producers. Use filters to narrow categories, producers, and certifications.";

  const breadcrumbs = categoryNode
    ? [
        { label: "Categories", href: "/categories" },
        { label: categoryNode.name },
      ]
    : [{ label: "Products" }];

  return (
    <>
      <ProductsUrlSync categoryTree={categoryTree} />
      <ProductsCatalogView
        initialItems={items}
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
      />
    </>
  );
}

export function ProductsPageContent() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-16 text-sm text-slate-600">Loading products…</div>
      }
    >
      <ProductsPageInner />
    </Suspense>
  );
}
