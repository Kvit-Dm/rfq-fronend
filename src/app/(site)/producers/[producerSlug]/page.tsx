import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { fetchAllProducts } from "@/lib/catalog/fetch-products";
import { fetchProducerBySlug } from "@/lib/catalog/fetch-producers";
import { fetchCategoryTree } from "@/lib/catalog/fetch-category-tree";
import { findCategoryBySlug } from "@/lib/catalog/category-tree-utils";
import { productHref } from "@/lib/catalog/product-path";
import { buildProductsPageHref } from "@/lib/catalog/products-url";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ producerSlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { producerSlug } = await params;
  const producer = await fetchProducerBySlug(producerSlug);
  if (!producer) {
    return { title: "Producer" };
  }
  return {
    title: `${producer.name} — verified producer`,
    description: producer.description,
  };
}

export default async function ProducerPage({ params }: PageProps) {
  const { producerSlug } = await params;
  const [producer, products, categoryTree] = await Promise.all([
    fetchProducerBySlug(producerSlug),
    fetchAllProducts(),
    fetchCategoryTree(),
  ]);

  if (!producer) notFound();

  const producerProducts = products.filter((p) => p.producerSlug === producerSlug);
  const categoryNames = producer.categorySlugs
    .map((slug) => findCategoryBySlug(categoryTree, slug)?.name)
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="border-b border-slate-200/80 bg-[var(--page-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <nav className="text-xs text-slate-500" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/producers" className="hover:text-brand">
                Producers
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-slate-700">{producer.name}</li>
          </ol>
        </nav>

        <header className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">Producer</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{producer.name}</h1>
          <p className="mt-2 text-base font-medium text-slate-700">{producer.tagline}</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">{producer.description}</p>
          <dl className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Headquarters</dt>
              <dd className="mt-1 font-medium text-slate-900">{producer.hq}</dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Focus categories</dt>
              <dd className="mt-1 font-medium text-slate-900">{categoryNames || "—"}</dd>
            </div>
          </dl>
          <Link
            href={`/producers/${producerSlug}/products`}
            className="mt-6 inline-flex rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
          >
            View all products
          </Link>
        </header>

        <section className="mt-10" aria-labelledby="lines-heading">
          <div className="flex items-end justify-between gap-4">
            <h2 id="lines-heading" className="text-xl font-bold text-slate-900 sm:text-2xl">
              Product lines
            </h2>
            <Link href="/products" className="text-sm font-semibold text-brand hover:underline">
              Browse all products
            </Link>
          </div>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {producerProducts.map((g) => (
              <li key={g.id}>
                <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand/30 hover:shadow-md">
                  <Link
                    href={buildProductsPageHref(g.categorySlug)}
                    className="text-xs font-semibold uppercase tracking-wide text-brand hover:underline"
                  >
                    {g.categoryName}
                  </Link>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">{g.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{g.shortDescription}</p>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      href={productHref(g)}
                      className="inline-flex w-full items-center justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
                    >
                      View product
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
