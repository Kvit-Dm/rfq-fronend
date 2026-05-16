import type { ProductListItem } from "@/types/catalog";

export type ProductsSort = "featured" | "name-asc" | "name-desc" | "producer-asc";

export type ProductsFilterInput = {
  search: string;
  categorySlugs: string[];
  producerSlugs: string[];
  certifications: string[];
  sort: ProductsSort;
};

function matchesSearch(item: ProductListItem, q: string): boolean {
  if (!q.trim()) return true;
  const s = q.trim().toLowerCase();
  return (
    item.name.toLowerCase().includes(s) ||
    item.shortDescription.toLowerCase().includes(s) ||
    item.producerName.toLowerCase().includes(s) ||
    item.categoryName.toLowerCase().includes(s)
  );
}

function matchesCategories(item: ProductListItem, selected: string[]): boolean {
  if (selected.length === 0) return true;
  return selected.includes(item.categorySlug);
}

function matchesProducers(item: ProductListItem, selected: string[]): boolean {
  if (selected.length === 0) return true;
  return selected.includes(item.producerSlug);
}

/** Item must include every selected certification (AND). */
function matchesCertifications(item: ProductListItem, selected: string[]): boolean {
  if (selected.length === 0) return true;
  return selected.every((c) => item.certifications.includes(c));
}

function sortItems(items: ProductListItem[], sort: ProductsSort): ProductListItem[] {
  const copy = [...items];
  switch (sort) {
    case "name-asc":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    case "producer-asc":
      return copy.sort((a, b) => a.producerName.localeCompare(b.producerName) || a.name.localeCompare(b.name));
    case "featured":
    default:
      return copy.sort((a, b) => a.featuredRank - b.featuredRank || a.name.localeCompare(b.name));
  }
}

export function filterProducts(items: ProductListItem[], filters: ProductsFilterInput): ProductListItem[] {
  const narrowed = items.filter(
    (it) =>
      matchesSearch(it, filters.search) &&
      matchesCategories(it, filters.categorySlugs) &&
      matchesProducers(it, filters.producerSlugs) &&
      matchesCertifications(it, filters.certifications),
  );
  return sortItems(narrowed, filters.sort);
}
