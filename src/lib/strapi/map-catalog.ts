import type {
  ProducerProfile,
  ProductDetail,
  ProductListItem,
} from "@/types/catalog";
import type {
  StrapiProducerRecord,
  StrapiProductDetailRecord,
  StrapiProductRecord,
} from "@/types/strapi";

export function parseCertifications(value: string | null | undefined): string[] {
  if (!value?.trim()) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function mapStrapiProductToListItem(record: StrapiProductRecord): ProductListItem | null {
  const category = record.category;
  const producer = record.producer;
  if (!category?.slug || !producer?.slug) return null;

  const detail = record.product_detail;

  return {
    id: record.documentId,
    slug: record.slug,
    producerSlug: producer.slug,
    producerName: producer.name,
    categorySlug: category.slug,
    categoryName: category.name,
    name: record.name,
    shortDescription: record.short_description,
    certifications: parseCertifications(detail?.certifications),
    featuredRank: record.raiting_value ?? 100,
  };
}

export function mapStrapiProductToDetail(record: StrapiProductRecord): ProductDetail | null {
  const base = mapStrapiProductToListItem(record);
  if (!base) return null;

  const detail = record.product_detail;

  return {
    ...base,
    longDescription: detail?.long_description ?? "",
    packaging: [],
    specs: [],
    incoterms: [],
  };
}

export function mapStrapiProducer(record: StrapiProducerRecord): ProducerProfile {
  return {
    slug: record.slug,
    name: record.name,
    tagline: record.tagline ?? "",
    description: record.description ?? "",
    hq: record.hq ?? "",
    categorySlugs: [],
  };
}

export function attachProducerCategorySlugs(
  producers: ProducerProfile[],
  products: ProductListItem[],
): ProducerProfile[] {
  const byProducer = new Map<string, Set<string>>();

  for (const product of products) {
    if (!byProducer.has(product.producerSlug)) {
      byProducer.set(product.producerSlug, new Set());
    }
    byProducer.get(product.producerSlug)!.add(product.categorySlug);
  }

  return producers.map((p) => ({
    ...p,
    categorySlugs: [...(byProducer.get(p.slug) ?? [])],
  }));
}

export function mapStrapiProductDetailRecord(
  record: StrapiProductDetailRecord,
  product?: StrapiProductRecord,
): Partial<ProductDetail> {
  return {
    longDescription: record.long_description ?? "",
    certifications: parseCertifications(record.certifications),
    ...(product ? (mapStrapiProductToDetail(product) ?? {}) : {}),
  };
}
