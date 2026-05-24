import { axiosClient } from "@/api/client/axiosClient";
import { APP_LOCALE } from "@/constants/locale";
import type { StrapiListResponse, StrapiProductCategoryRecord } from "@/types/strapi";

const MAX_PAGE_SIZE = 200;

export type GetProductCategoriesParams = {
  locale?: string;
};

/**
 * Fetches all product categories as a flat list (Strapi returns parent on each row).
 */
export async function getProductCategories(
  params: GetProductCategoriesParams = {},
): Promise<StrapiListResponse<StrapiProductCategoryRecord>> {
  const locale = params.locale ?? APP_LOCALE;

  const res = await axiosClient.get<StrapiListResponse<StrapiProductCategoryRecord>>(
    "/api/product-categories",
    {
      params: {
        locale,
        populate: "parent",
        "pagination[pageSize]": MAX_PAGE_SIZE,
        sort: "level:asc,name:asc",
      },
    },
  );

  return res.data;
}
