import type { ProducerProfile, ProductGroupDetail, ProductGroupListItem } from "@/types/catalog";

/**
 * Stand-in for DB/API. Replace imports with `fetch` / server loaders later.
 */
export const DUMMY_PRODUCERS: ProducerProfile[] = [
  {
    slug: "ukroliya",
    name: "Ukroliya",
    tagline: "Oils, meals, and export-ready agro supply",
    description:
      "Ukroliya focuses on refined and crude sunflower oil, related meals, and structured export documentation for EU and MENA buyers.",
    hq: "Poltava region, Ukraine",
    categories: ["Oils", "Meals"],
  },
  {
    slug: "grainline",
    name: "Grainline Export",
    tagline: "Grains and oilseeds with aligned logistics parameters",
    description:
      "Grainline coordinates corn, wheat, and barley offers with consistent quality declarations and loading windows.",
    hq: "Odesa Oblast, Ukraine",
    categories: ["Grains", "Oilseeds"],
  },
];

const groups: ProductGroupDetail[] = [
  {
    id: "pg-ukroliya-sunflower-oil",
    slug: "sunflower-oil",
    producerSlug: "ukroliya",
    producerName: "Ukroliya",
    name: "Sunflower oil",
    category: "Oils",
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
    name: "Corn oil",
    category: "Oils",
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
    name: "Sunflower meal",
    category: "Meals",
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
    name: "Corn (maize)",
    category: "Grains",
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
    name: "Milling wheat",
    category: "Grains",
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

export function listProductGroups(): ProductGroupListItem[] {
  return groups.map(
    ({
      id,
      slug,
      producerSlug,
      producerName,
      name,
      category,
      shortDescription,
      certifications,
      featuredRank,
    }) => ({
      id,
      slug,
      producerSlug,
      producerName,
      name,
      category,
      shortDescription,
      certifications,
      featuredRank,
    }),
  );
}

export function getProducerBySlug(slug: string): ProducerProfile | undefined {
  return DUMMY_PRODUCERS.find((p) => p.slug === slug);
}

export function getProductGroupDetail(
  producerSlug: string,
  productSlug: string,
): ProductGroupDetail | undefined {
  return groups.find((g) => g.producerSlug === producerSlug && g.slug === productSlug);
}

export function listGroupsByProducer(producerSlug: string): ProductGroupListItem[] {
  return listProductGroups().filter((g) => g.producerSlug === producerSlug);
}

export function catalogFacetValues(items: ProductGroupListItem[]) {
  const categories = new Set<string>();
  const producers = new Map<string, string>();
  const certifications = new Set<string>();
  for (const it of items) {
    categories.add(it.category);
    producers.set(it.producerSlug, it.producerName);
    it.certifications.forEach((c) => certifications.add(c));
  }
  return {
    categories: [...categories].sort((a, b) => a.localeCompare(b)),
    producers: [...producers.entries()]
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    certifications: [...certifications].sort((a, b) => a.localeCompare(b)),
  };
}
