export const queryKeys = {
  categoryTree: (locale: string) => ["category-tree", locale] as const,
  products: (locale: string) => ["products", locale] as const,
  producers: (locale: string) => ["producers", locale] as const,
  productDetail: (locale: string, slug: string) => ["product-detail", locale, slug] as const,
};
