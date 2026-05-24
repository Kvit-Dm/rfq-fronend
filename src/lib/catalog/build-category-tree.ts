import type { CategoryTreeNode } from "@/types/category-tree";
import type { StrapiProductCategoryRecord } from "@/types/strapi";

export type CategoryFlatRow = {
  documentId: string;
  slug: string;
  name: string;
  description: string | null;
  level: number;
  parentDocumentId: string | null;
};

export function normalizeCategoryRows(
  records: StrapiProductCategoryRecord[],
): CategoryFlatRow[] {
  return records.map((record) => ({
    documentId: record.documentId,
    slug: record.slug,
    name: record.name,
    description: record.description,
    level: record.level,
    parentDocumentId: record.parent?.documentId ?? null,
  }));
}

function sortNodes(nodes: CategoryTreeNode[]): CategoryTreeNode[] {
  nodes.sort((a, b) => a.name.localeCompare(b.name));
  for (const node of nodes) {
    sortNodes(node.children);
  }
  return nodes;
}

/**
 * Builds a forest of roots from a flat list (parent pointers from Strapi populate).
 */
export function buildCategoryTree(rows: CategoryFlatRow[]): CategoryTreeNode[] {
  const nodeMap = new Map<string, CategoryTreeNode>();

  for (const row of rows) {
    nodeMap.set(row.documentId, {
      documentId: row.documentId,
      slug: row.slug,
      name: row.name,
      description: row.description ?? "",
      level: row.level,
      children: [],
    });
  }

  const roots: CategoryTreeNode[] = [];

  for (const row of rows) {
    const node = nodeMap.get(row.documentId);
    if (!node) continue;

    if (row.parentDocumentId) {
      const parent = nodeMap.get(row.parentDocumentId);
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    } else {
      roots.push(node);
    }
  }

  return sortNodes(roots);
}
