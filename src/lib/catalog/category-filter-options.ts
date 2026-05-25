import type { CategoryTreeNode } from "@/types/category-tree";

export type CategoryFilterOption = {
  slug: string;
  name: string;
  level: number;
};

/** Level-1 roots for the primary category dropdown. */
export function getRootCategoryOptions(roots: CategoryTreeNode[]): CategoryFilterOption[] {
  return roots.map((n) => ({ slug: n.slug, name: n.name, level: n.level }));
}

/** All descendants under a root (excludes the root), sorted by level then name. */
export function getSubcategoryOptions(
  roots: CategoryTreeNode[],
  rootSlug: string | null,
): CategoryFilterOption[] {
  if (!rootSlug) return [];

  const root = roots.find((r) => r.slug === rootSlug);
  if (!root) return [];

  const options: CategoryFilterOption[] = [];

  function walk(node: CategoryTreeNode) {
    for (const child of node.children) {
      options.push({ slug: child.slug, name: child.name, level: child.level });
      walk(child);
    }
  }

  walk(root);
  return options.sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
}
