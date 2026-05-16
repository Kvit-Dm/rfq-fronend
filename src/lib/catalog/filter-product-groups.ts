import type { ProductGroupListItem } from "@/types/catalog";

export type ProductGroupsSort = "featured" | "name-asc" | "name-desc" | "producer-asc";

export type ProductGroupsFilterInput = {
  search: string;
  categories: string[];
  producers: string[];
  certifications: string[];
  sort: ProductGroupsSort;
};

function matchesSearch(item: ProductGroupListItem, q: string): boolean {
  if (!q.trim()) return true;
  const s = q.trim().toLowerCase();
  return (
    item.name.toLowerCase().includes(s) ||
    item.shortDescription.toLowerCase().includes(s) ||
    item.producerName.toLowerCase().includes(s) ||
    item.category.toLowerCase().includes(s)
  );
}

function matchesCategories(item: ProductGroupListItem, selected: string[]): boolean {
  if (selected.length === 0) return true;
  return selected.includes(item.category);
}

function matchesProducers(item: ProductGroupListItem, selected: string[]): boolean {
  if (selected.length === 0) return true;
  return selected.includes(item.producerSlug);
}

/** Item must include every selected certification (AND). */
function matchesCertifications(item: ProductGroupListItem, selected: string[]): boolean {
  if (selected.length === 0) return true;
  return selected.every((c) => item.certifications.includes(c));
}

function sortItems(items: ProductGroupListItem[], sort: ProductGroupsSort): ProductGroupListItem[] {
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

export function filterProductGroups(
  items: ProductGroupListItem[],
  filters: ProductGroupsFilterInput,
): ProductGroupListItem[] {
  const narrowed = items.filter(
    (it) =>
      matchesSearch(it, filters.search) &&
      matchesCategories(it, filters.categories) &&
      matchesProducers(it, filters.producers) &&
      matchesCertifications(it, filters.certifications),
  );
  return sortItems(narrowed, filters.sort);
}
