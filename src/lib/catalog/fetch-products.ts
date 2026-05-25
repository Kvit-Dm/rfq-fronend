import { getProductBySlug, getProducts } from "@/api/endpoints/products.api";
import { APP_LOCALE, type AppLocale } from "@/constants/locale";
import {
  mapStrapiProductToDetail,
  mapStrapiProductToListItem,
} from "@/lib/strapi/map-catalog";
import type { ProductDetail, ProductListItem } from "@/types/catalog";

export async function fetchAllProducts(locale: AppLocale = APP_LOCALE): Promise<ProductListItem[]> {
  const pageSize = 100;
  let page = 1;
  let pageCount = 1;
  const items: ProductListItem[] = [];

  do {
    const response = await getProducts({ locale, page, pageSize });
    for (const record of response.data) {
      const mapped = mapStrapiProductToListItem(record);
      if (mapped) items.push(mapped);
    }
    pageCount = response.meta.pagination.pageCount;
    page += 1;
  } while (page <= pageCount);

  return items;
}

export async function fetchProductDetail(
  slug: string,
  locale: AppLocale = APP_LOCALE,
): Promise<ProductDetail | null> {
  const response = await getProductBySlug(slug, locale);
  const record = response.data[0];
  if (!record) return null;
  return mapStrapiProductToDetail(record);
}

export async function fetchProductDetailByCategoryAndSlug(
  categorySlug: string,
  productSlug: string,
  locale: AppLocale = APP_LOCALE,
): Promise<ProductDetail | null> {
  const product = await fetchProductDetail(productSlug, locale);
  if (!product || product.categorySlug !== categorySlug) return null;
  return product;
}
