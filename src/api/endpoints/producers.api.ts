import { axiosClient } from "@/api/client/axiosClient";
import { APP_LOCALE } from "@/constants/locale";
import type { StrapiListResponse, StrapiProducerRecord } from "@/types/strapi";

const MAX_PAGE_SIZE = 100;

export type GetProducersParams = {
  locale?: string;
  page?: number;
  pageSize?: number;
};

export async function getProducers(
  params: GetProducersParams = {},
): Promise<StrapiListResponse<StrapiProducerRecord>> {
  const locale = params.locale ?? APP_LOCALE;
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? MAX_PAGE_SIZE;

  const res = await axiosClient.get<StrapiListResponse<StrapiProducerRecord>>("/api/producers", {
    params: {
      locale,
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
      sort: "name:asc",
    },
  });

  return res.data;
}

export async function getProducerBySlug(
  slug: string,
  locale = APP_LOCALE,
): Promise<StrapiListResponse<StrapiProducerRecord>> {
  const res = await axiosClient.get<StrapiListResponse<StrapiProducerRecord>>("/api/producers", {
    params: {
      locale,
      "filters[slug][$eq]": slug,
    },
  });

  return res.data;
}
