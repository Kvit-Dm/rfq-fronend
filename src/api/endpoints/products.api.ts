import { axiosClient } from "@/api/client/axiosClient";
import { APP_LOCALE } from "@/constants/locale";
import type { StrapiListResponse, StrapiProductRecord } from "@/types/strapi";

const MAX_PAGE_SIZE = 100;

export type GetProductsParams = {
  locale?: string;
  page?: number;
  pageSize?: number;
};

const PRODUCT_POPULATE_PARAMS = {
  "populate[category]": true,
  "populate[producer]": true,
  "populate[product_detail]": true,
} as const;

export async function getProducts(
  params: GetProductsParams = {},
): Promise<StrapiListResponse<StrapiProductRecord>> {
  const locale = params.locale ?? APP_LOCALE;
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? MAX_PAGE_SIZE;

  const res = await axiosClient.get<StrapiListResponse<StrapiProductRecord>>("/api/products", {
    params: {
      locale,
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
      ...PRODUCT_POPULATE_PARAMS,
    },
  });

  return res.data;
}

export async function getProductBySlug(
  slug: string,
  locale = APP_LOCALE,
): Promise<StrapiListResponse<StrapiProductRecord>> {
  const res = await axiosClient.get<StrapiListResponse<StrapiProductRecord>>("/api/products", {
    params: {
      locale,
      "filters[slug][$eq]": slug,
      ...PRODUCT_POPULATE_PARAMS,
    },
  });

  return res.data;
}
