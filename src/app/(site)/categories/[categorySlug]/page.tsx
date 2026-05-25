import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CatalogLockedPageContent } from "@/components/catalog/catalog-locked-page-content";
import { findCategoryBySlug } from "@/lib/catalog/category-tree-utils";
import { fetchCategoryTree } from "@/lib/catalog/fetch-category-tree";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ categorySlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const tree = await fetchCategoryTree();
  const category = findCategoryBySlug(tree, categorySlug);
  if (!category) {
    return { title: "Category" };
  }
  return {
    title: `${category.name} products`,
    description: category.description || undefined,
  };
}

export default async function CategoryProductsPage({ params }: PageProps) {
  const { categorySlug } = await params;
  const tree = await fetchCategoryTree();
  const category = findCategoryBySlug(tree, categorySlug);
  if (!category) notFound();

  return (
    <CatalogLockedPageContent
      title={`${category.name} products`}
      description={
        category.description ||
        `Products in ${category.name} and related export lines from verified Ukrainian producers.`
      }
      breadcrumbs={[
        { label: "Categories", href: "/categories" },
        { label: category.name },
      ]}
      lockedCategorySlug={categorySlug}
    />
  );
}
