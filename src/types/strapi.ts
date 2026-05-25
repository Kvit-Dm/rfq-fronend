/** Strapi v5 REST envelope */
export type StrapiListResponse<T> = {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type StrapiSingleResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

export type StrapiProductCategoryRecord = {
  id: number;
  documentId: string;
  slug: string;
  name: string;
  description: string | null;
  level: number;
  path: string | null;
  locale: string;
  parent?: StrapiProductCategoryRecord | null;
};

export type StrapiProducerRecord = {
  id: number;
  documentId: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  hq: string | null;
  locale: string;
};

export type StrapiProductDetailRecord = {
  id: number;
  documentId: string;
  long_description: string | null;
  /** Comma-separated in CMS */
  certifications: string | null;
  locale: string;
};

export type StrapiProductRecord = {
  id: number;
  documentId: string;
  slug: string;
  name: string;
  short_description: string;
  raiting_value: number | null;
  locale: string;
  category?: StrapiProductCategoryRecord | null;
  producer?: StrapiProducerRecord | null;
  product_detail?: StrapiProductDetailRecord | null;
};
