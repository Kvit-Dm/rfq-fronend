import { getProductCategories } from "@/api/endpoints/product-categories.api";
import { APP_LOCALE, type AppLocale } from "@/constants/locale";
import {
  buildCategoryTree,
  normalizeCategoryRows,
} from "@/lib/catalog/build-category-tree";
import type { CategoryTreeNode } from "@/types/category-tree";

/**
 * Single entry point for category tree data (server components, queryFn, tests).
 */
export async function fetchCategoryTree(
  locale: AppLocale = APP_LOCALE,
): Promise<CategoryTreeNode[]> {
  const response = await getProductCategories({ locale });
  const rows = normalizeCategoryRows(response.data);
  return buildCategoryTree(rows);
}
