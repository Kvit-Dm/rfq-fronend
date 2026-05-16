import type { Metadata } from "next";

import { ProductGroupsView } from "@/app/(site)/product-groups/product-groups-view";
import { listProductGroups } from "@/data/catalog-dummy";

export const metadata: Metadata = {
  title: "Product groups for buyers",
  description: "Browse verified Ukrainian producer product groups—filter by category, producer, and certifications.",
};

export default function ProductGroupsPage() {
  const items = listProductGroups();
  return <ProductGroupsView initialItems={items} />;
}
