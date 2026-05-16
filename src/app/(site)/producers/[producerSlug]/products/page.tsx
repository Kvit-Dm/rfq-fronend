import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductsCatalogView } from "@/components/catalog/products-catalog-view";
import { getProducerBySlug, listProducts } from "@/data/catalog-dummy";

type PageProps = {
  params: Promise<{ producerSlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { producerSlug } = await params;
  const producer = getProducerBySlug(producerSlug);
  if (!producer) {
    return { title: "Producer products" };
  }
  return {
    title: `${producer.name} products`,
    description: `Browse export products from ${producer.name}.`,
  };
}

export default async function ProducerProductsPage({ params }: PageProps) {
  const { producerSlug } = await params;
  const producer = getProducerBySlug(producerSlug);
  if (!producer) notFound();

  return (
    <ProductsCatalogView
      initialItems={listProducts()}
      title={`${producer.name} products`}
      description={`Product lines from ${producer.name}. Filter by category and certifications within this producer's catalog.`}
      breadcrumbs={[
        { label: "Producers", href: "/producers" },
        { label: producer.name, href: `/producers/${producerSlug}` },
        { label: "Products" },
      ]}
      lockedProducerSlug={producerSlug}
    />
  );
}
