import type { Metadata } from "next";

import { ProductsPageContent } from "@/components/catalog/products-page-content";

export const metadata: Metadata = {
  title: "Products for buyers",
  description: "Browse export products from verified Ukrainian producers—filter by category, producer, and certifications.",
};

export default function ProductsPage() {
  return <ProductsPageContent />;
}
