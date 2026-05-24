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
