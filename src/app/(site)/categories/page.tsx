import type { Metadata } from "next";

import { CategoriesPage } from "@/app/(site)/categories/_components/categories-page";

export const metadata: Metadata = {
  title: "Product categories",
  description:
    "Browse export product categories in a nested tree. Select a category to view matching products.",
};

export default function CategoriesRoutePage() {
  return <CategoriesPage />;
}
