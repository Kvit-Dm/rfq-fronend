/** Query param for category filter on /products (single slug from tree navigation). */
export const PRODUCTS_CATEGORY_PARAM = "category";

export function buildProductsPageHref(categorySlug: string): string {
  const params = new URLSearchParams();
  params.set(PRODUCTS_CATEGORY_PARAM, categorySlug);
  return `/products?${params.toString()}`;
}

export function parseProductsCategoryParam(
  searchParams: URLSearchParams | { get: (key: string) => string | null },
): string | null {
  const value = searchParams.get(PRODUCTS_CATEGORY_PARAM)?.trim();
  return value || null;
}
