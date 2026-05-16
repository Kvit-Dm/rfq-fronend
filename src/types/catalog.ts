export type ProductGroupListItem = {
  id: string;
  /** URL segment under /product-group/[producerSlug]/ */
  slug: string;
  producerSlug: string;
  producerName: string;
  name: string;
  category: string;
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
  categories: string[];
};

export type ProductGroupDetail = ProductGroupListItem & {
  longDescription: string;
  packaging: string[];
  specs: { label: string; value: string }[];
  incoterms: string[];
};
