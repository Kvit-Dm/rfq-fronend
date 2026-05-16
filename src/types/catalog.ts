export type Category = {
  slug: string;
  name: string;
  description: string;
};

export type ProductListItem = {
  id: string;
  /** Product id — URL segment under /products/[categorySlug]/[slug] (unique per category). */
  slug: string;
  producerSlug: string;
  producerName: string;
  categorySlug: string;
  categoryName: string;
  name: string;
  shortDescription: string;
  certifications: string[];
  /** Lower = more prominent when sort is "featured". */
  featuredRank: number;
};

export type ProducerProfile = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  hq: string;
  categorySlugs: string[];
};

export type ProductDetail = ProductListItem & {
  longDescription: string;
  packaging: string[];
  specs: { label: string; value: string }[];
  incoterms: string[];
};
