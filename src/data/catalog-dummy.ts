import type { Category, ProducerProfile, ProductDetail, ProductListItem } from "@/types/catalog";

/**
 * Stand-in for DB/API. Replace imports with `fetch` / server loaders later.
 */
export const DUMMY_CATEGORIES: Category[] = [
  {
    slug: "oils",
    name: "Oils",
    description: "Refined and crude vegetable oils for food manufacturing and retail.",
  },
  {
    slug: "meals",
    name: "Meals",
    description: "Protein meals and by-products for feed and nutrition formulations.",
  },
  {
    slug: "grains",
    name: "Grains",
    description: "Cereal grains for milling, feed, and processing export channels.",
  },
  {
    slug: "oilseeds",
    name: "Oilseeds",
    description: "Oilseed crops with aligned quality and logistics parameters.",
  },
];

export const DUMMY_PRODUCERS: ProducerProfile[] = [
  {
    slug: "ukroliya",
    name: "Ukroliya",
    tagline: "Oils, meals, and export-ready agro supply",
    description:
      "Ukroliya focuses on refined and crude sunflower oil, related meals, and structured export documentation for EU and MENA buyers.",
    hq: "Poltava region, Ukraine",
    categorySlugs: ["oils", "meals"],
  },
  {
    slug: "grainline",
    name: "Grainline Export",
    tagline: "Grains and oilseeds with aligned logistics parameters",
    description:
      "Grainline coordinates corn, wheat, and barley offers with consistent quality declarations and loading windows.",
    hq: "Odesa Oblast, Ukraine",
    categorySlugs: ["grains", "oilseeds"],
  },
];

const products: ProductDetail[] = [
  {
    id: "pg-ukroliya-sunflower-oil",
    slug: "sunflower-oil",
    producerSlug: "ukroliya",
    producerName: "Ukroliya",
    categorySlug: "oils",
    categoryName: "Oils",
    name: "Sunflower oil",
    shortDescription: "Refined and crude sunflower oil for foodservice and retail bottlers.",
    longDescription:
      "Sunflower oil grades aligned to buyer specifications: cold-pressed and refined deodorized options, with clear fatty acid profiles and shelf-life parameters for export.",
    certifications: ["ISO 22000", "HALAL", "GMP"],
    featuredRank: 10,
    packaging: ["Flexitank", "PET 1L–5L", "Bulk road tanker", "ISO tank"],
    specs: [
      { label: "Acid value (max)", value: "0.6 mg KOH/g (refined, indicative)" },
      { label: "Peroxide (at dispatch)", value: "≤ 10.0 meq/kg (indicative)" },
      { label: "Moisture & impurities", value: "≤ 0.10% (indicative)" },
    ],
    incoterms: ["FOB", "CIF", "DAP"],
  },
  {
    id: "pg-ukroliya-corn-oil",
    slug: "corn-oil",
    producerSlug: "ukroliya",
    producerName: "Ukroliya",
    categorySlug: "oils",
    categoryName: "Oils",
    name: "Corn oil",
    shortDescription: "Refined corn oil for food manufacturing and private label.",
    certifications: ["ISO 22000", "Kosher"],
    featuredRank: 40,
    longDescription:
      "Corn oil suitable for frying and baking applications, with export-oriented certificates and repeatable batch documentation.",
    packaging: ["Flexitank", "Bulk road tanker", "Drums"],
    specs: [
      { label: "Smoke point (refined, indicative)", value: "≈ 230 °C" },
      { label: "Color (51/4\")", value: "R ≤ 3.0 (typical refined)" },
    ],
    incoterms: ["FOB", "CFR"],
  },
  {
    id: "pg-ukroliya-sunflower-meal",
    slug: "sunflower-meal",
    producerSlug: "ukroliya",
    producerName: "Ukroliya",
    categorySlug: "meals",
    categoryName: "Meals",
    name: "Sunflower meal",
    shortDescription: "High-protein meal for compound feed and nutrition formulations.",
    certifications: ["GMP"],
    featuredRank: 60,
    longDescription:
      "Sunflower meal with protein declarations suited for feed mills; logistics parameters aligned to port and inland delivery.",
    packaging: ["Bulk vessel", "Container bulk bags"],
    specs: [
      { label: "Protein (as fed, indicative)", value: "32–36%" },
      { label: "Fiber (indicative)", value: "≤ 17%" },
    ],
    incoterms: ["FOB", "CIF"],
  },
  {
    id: "pg-grainline-corn",
    slug: "corn",
    producerSlug: "grainline",
    producerName: "Grainline Export",
    categorySlug: "grains",
    categoryName: "Grains",
    name: "Corn (maize)",
    shortDescription: "Yellow corn for feed and processing channels with clear grade parameters.",
    certifications: ["GAP"],
    featuredRank: 20,
    longDescription:
      "Export corn with defined moisture and admixture bands, suitable for feed and processing buyers requiring consistent declarations.",
    packaging: ["Bulk vessel", "Hopper barges"],
    specs: [
      { label: "Moisture (max, indicative)", value: "14.0%" },
      { label: "Admixture (max, indicative)", value: "5.0%" },
    ],
    incoterms: ["FOB", "CIF"],
  },
  {
    id: "pg-grainline-wheat",
    slug: "wheat",
    producerSlug: "grainline",
    producerName: "Grainline Export",
    categorySlug: "grains",
    categoryName: "Grains",
    name: "Milling wheat",
    shortDescription: "Food-grade wheat for millers with test weight and protein bands.",
    certifications: ["GAP", "ISO 9001"],
    featuredRank: 30,
    longDescription:
      "Milling wheat offers with transparent quality parameters for export contracts and repeatable loading schedules.",
    packaging: ["Bulk vessel", "Containers"],
    specs: [
      { label: "Test weight (indicative)", value: "≥ 76 kg/hl" },
      { label: "Protein (dry basis, indicative)", value: "11.5–13.5%" },
    ],
    incoterms: ["FOB", "DAP"],
  },
];

function toListItem({
  id,
  slug,
  producerSlug,
  producerName,
  categorySlug,
  categoryName,
  name,
  shortDescription,
  certifications,
  featuredRank,
}: ProductDetail): ProductListItem {
  return {
    id,
    slug,
    producerSlug,
    producerName,
    categorySlug,
    categoryName,
    name,
    shortDescription,
    certifications,
    featuredRank,
  };
}

export function listProducts(): ProductListItem[] {
  return products.map(toListItem);
}

export function listCategories(): Category[] {
  return DUMMY_CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return DUMMY_CATEGORIES.find((c) => c.slug === slug);
}

export function listProducers(): ProducerProfile[] {
  return DUMMY_PRODUCERS;
}

export function getProducerBySlug(slug: string): ProducerProfile | undefined {
  return DUMMY_PRODUCERS.find((p) => p.slug === slug);
}

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProduct(categorySlug: string, productId: string): ProductDetail | undefined {
  return products.find((p) => p.categorySlug === categorySlug && p.slug === productId);
}

export function listProductsByCategory(categorySlug: string): ProductListItem[] {
  return listProducts().filter((p) => p.categorySlug === categorySlug);
}

export function listProductsByProducer(producerSlug: string): ProductListItem[] {
  return listProducts().filter((p) => p.producerSlug === producerSlug);
}

export function catalogFacetValues(items: ProductListItem[]) {
  const categories = new Map<string, string>();
  const producers = new Map<string, string>();
  const certifications = new Set<string>();
  for (const it of items) {
    categories.set(it.categorySlug, it.categoryName);
    producers.set(it.producerSlug, it.producerName);
    it.certifications.forEach((c) => certifications.add(c));
  }
  return {
    categories: [...categories.entries()]
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    producers: [...producers.entries()]
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    certifications: [...certifications].sort((a, b) => a.localeCompare(b)),
  };
}
