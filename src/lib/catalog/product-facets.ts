import type { ProductListItem } from "@/types/catalog";

/** Producer and certification facets derived from the loaded product list. */
export function productFacetValues(items: ProductListItem[]) {
  const producers = new Map<string, string>();
  const certifications = new Set<string>();

  for (const it of items) {
    producers.set(it.producerSlug, it.producerName);
    it.certifications.forEach((c) => certifications.add(c));
  }

  return {
    producers: [...producers.entries()]
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    certifications: [...certifications].sort((a, b) => a.localeCompare(b)),
  };
}
