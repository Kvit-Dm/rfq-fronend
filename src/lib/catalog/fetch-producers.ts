import { getProducerBySlug, getProducers } from "@/api/endpoints/producers.api";
import { fetchAllProducts } from "@/lib/catalog/fetch-products";
import { APP_LOCALE, type AppLocale } from "@/constants/locale";
import {
  attachProducerCategorySlugs,
  mapStrapiProducer,
} from "@/lib/strapi/map-catalog";
import type { ProducerProfile } from "@/types/catalog";

export async function fetchAllProducers(locale: AppLocale = APP_LOCALE): Promise<ProducerProfile[]> {
  const pageSize = 100;
  let page = 1;
  let pageCount = 1;
  const producers: ProducerProfile[] = [];

  do {
    const response = await getProducers({ locale, page, pageSize });
    producers.push(...response.data.map(mapStrapiProducer));
    pageCount = response.meta.pagination.pageCount;
    page += 1;
  } while (page <= pageCount);

  const products = await fetchAllProducts(locale);
  return attachProducerCategorySlugs(producers, products);
}

export async function fetchProducerBySlug(
  slug: string,
  locale: AppLocale = APP_LOCALE,
): Promise<ProducerProfile | null> {
  const response = await getProducerBySlug(slug, locale);
  const record = response.data[0];
  if (!record) return null;

  const products = await fetchAllProducts(locale);
  const [producer] = attachProducerCategorySlugs([mapStrapiProducer(record)], products);
  return producer ?? null;
}
