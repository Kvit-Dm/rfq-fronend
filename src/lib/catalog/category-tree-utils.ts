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

/** Child documentId → parent node */
export function buildCategoryParentMap(
  roots: CategoryTreeNode[],
): Map<string, CategoryTreeNode> {
  const parentMap = new Map<string, CategoryTreeNode>();

  function walk(node: CategoryTreeNode, parent: CategoryTreeNode | null) {
    if (parent) parentMap.set(node.documentId, parent);
    for (const child of node.children) walk(child, node);
  }

  for (const root of roots) walk(root, null);
  return parentMap;
}

export function findCategoryRootSlug(roots: CategoryTreeNode[], slug: string): string | null {
  const node = findCategoryBySlug(roots, slug);
  if (!node) return null;
  if (node.level === 1) return node.slug;

  const parentMap = buildCategoryParentMap(roots);
  let current: CategoryTreeNode = node;

  while (parentMap.has(current.documentId)) {
    current = parentMap.get(current.documentId)!;
  }

  return current.slug;
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
