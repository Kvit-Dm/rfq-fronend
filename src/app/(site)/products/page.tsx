import type { Metadata } from "next";

import { ProductsCatalogView } from "@/components/catalog/products-catalog-view";
import { listProducts } from "@/data/catalog-dummy";

export const metadata: Metadata = {
  title: "Products for buyers",
  description: "Browse export products from verified Ukrainian producers—filter by category, producer, and certifications.",
};

export default function ProductsPage() {
  const items = listProducts();
  return (
    <ProductsCatalogView
      initialItems={items}
      title="All products"
      description="Explore export-oriented product lines from verified producers. Use filters to narrow categories, producers, and certifications."
      breadcrumbs={[{ label: "Products" }]}
    />
  );
}
