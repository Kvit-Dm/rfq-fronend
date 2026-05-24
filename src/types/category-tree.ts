/** Normalized category node used in the app (flat fetch → tree build). */
export type CategoryTreeNode = {
  documentId: string;
  slug: string;
  name: string;
  description: string;
  level: number;
  children: CategoryTreeNode[];
};
