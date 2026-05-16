import type { ProductListItem } from "@/types/catalog";

/** Canonical product URL: /products/[categorySlug]/[productSlug] */
export function productHref(item: Pick<ProductListItem, "categorySlug" | "slug">): string {
  return `/products/${item.categorySlug}/${item.slug}`;
}
