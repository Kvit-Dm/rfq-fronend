import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductsCatalogView } from "@/components/catalog/products-catalog-view";
import { getCategoryBySlug, listProducts } from "@/data/catalog-dummy";

type PageProps = {
  params: Promise<{ categorySlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return { title: "Category" };
  }
  return {
    title: `${category.name} products`,
    description: category.description,
  };
}

export default async function CategoryProductsPage({ params }: PageProps) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  return (
    <ProductsCatalogView
      initialItems={listProducts()}
      title={`${category.name} products`}
      description={category.description}
      breadcrumbs={[
        { label: "Products", href: "/products" },
        { label: category.name },
      ]}
      lockedCategorySlug={categorySlug}
    />
  );
}
