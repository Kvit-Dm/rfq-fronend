"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { ProductsCatalogView } from "@/components/catalog/products-catalog-view";
import { ProductsUrlSync } from "@/components/catalog/products-url-sync";
import { useCategoryTree } from "@/hooks/use-category-tree";
import { useProducts } from "@/hooks/use-products";
import { findCategoryBySlug } from "@/lib/catalog/category-tree-utils";
import { parseProductsCategoryParam } from "@/lib/catalog/products-url";

function ProductsPageInner() {
  const searchParams = useSearchParams();
  const categoryParam = parseProductsCategoryParam(searchParams);
  const { data: categoryTree = [], isLoading: categoriesLoading } = useCategoryTree();
  const { data: products = [], isLoading: productsLoading, error: productsError } = useProducts();

  const categoryNode =
    categoryParam && categoryTree.length > 0
      ? findCategoryBySlug(categoryTree, categoryParam)
      : undefined;

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

  if (productsError) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-medium">Could not load products</p>
          <p className="mt-1">
            {productsError instanceof Error ? productsError.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProductsUrlSync categoryTree={categoryTree} />
      <ProductsCatalogView
        items={products}
        categoryTree={categoryTree}
        isLoading={productsLoading || categoriesLoading}
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
