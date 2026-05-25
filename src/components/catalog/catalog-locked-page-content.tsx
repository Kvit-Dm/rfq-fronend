"use client";

import { ProductsCatalogView } from "@/components/catalog/products-catalog-view";
import { useCategoryTree } from "@/hooks/use-category-tree";
import { useProducts } from "@/hooks/use-products";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type CatalogLockedPageContentProps = {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  lockedCategorySlug?: string;
  lockedProducerSlug?: string;
};

export function CatalogLockedPageContent({
  title,
  description,
  breadcrumbs,
  lockedCategorySlug,
  lockedProducerSlug,
}: CatalogLockedPageContentProps) {
  const { data: categoryTree = [], isLoading: categoriesLoading } = useCategoryTree();
  const { data: products = [], isLoading: productsLoading, error: productsError } = useProducts();

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
    <ProductsCatalogView
      items={products}
      categoryTree={categoryTree}
      isLoading={productsLoading || categoriesLoading}
      title={title}
      description={description}
      breadcrumbs={breadcrumbs}
      lockedCategorySlug={lockedCategorySlug}
      lockedProducerSlug={lockedProducerSlug}
    />
  );
}
