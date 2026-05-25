import type { CategoryTreeNode } from "@/types/category-tree";

/** Slug → node index for O(1) lookup in large trees. */
export function buildCategorySlugIndex(
  roots: CategoryTreeNode[],
): Map<string, CategoryTreeNode> {
  const index = new Map<string, CategoryTreeNode>();

  function walk(node: CategoryTreeNode) {
    index.set(node.slug, node);
    for (const child of node.children) walk(child);
  }

  for (const root of roots) walk(root);
  return index;
}

export function findCategoryBySlug(
  roots: CategoryTreeNode[],
  slug: string,
): CategoryTreeNode | undefined {
  return buildCategorySlugIndex(roots).get(slug);
}

/** Category slug plus every descendant slug (for product filtering). */
export function collectCategoryFilterSlugs(
  roots: CategoryTreeNode[],
  slug: string,
): string[] {
  const node = findCategoryBySlug(roots, slug);
  if (!node) return [slug];

  const slugs: string[] = [];
  function walk(n: CategoryTreeNode) {
    slugs.push(n.slug);
    for (const child of n.children) walk(child);
  }
  walk(node);
  return slugs;
}

/** Columns for horizontal explorer: roots, then each opened branch. */
export function getCategoryTreeColumns(
  roots: CategoryTreeNode[],
  trail: CategoryTreeNode[],
): CategoryTreeNode[][] {
  const columns: CategoryTreeNode[][] = [roots];
  for (const node of trail) {
    if (node.children.length > 0) columns.push(node.children);
  }
  return columns;
}
