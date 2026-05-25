import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { fetchProductDetailByCategoryAndSlug } from "@/lib/catalog/fetch-products";
import { buildProductsPageHref } from "@/lib/catalog/products-url";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ "product-category": string; "product-id": string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { "product-category": categorySlug, "product-id": productId } = await params;
  const product = await fetchProductDetailByCategoryAndSlug(categorySlug, productId);
  if (!product) {
    return { title: "Product" };
  }
  return {
    title: `${product.name} by ${product.producerName}`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { "product-category": categorySlug, "product-id": productId } = await params;
  const product = await fetchProductDetailByCategoryAndSlug(categorySlug, productId);
  if (!product) notFound();

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
              <Link href="/products" className="hover:text-brand">
                Products
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={buildProductsPageHref(product.categorySlug)} className="hover:text-brand">
                {product.categoryName}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-slate-700">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <Link
              href={buildProductsPageHref(product.categorySlug)}
              className="text-xs font-semibold uppercase tracking-wide text-brand hover:underline"
            >
              {product.categoryName}
            </Link>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{product.name}</h1>
            <p className="mt-2 text-sm font-medium text-slate-600 sm:text-base">
              <Link href={`/producers/${product.producerSlug}`} className="hover:text-brand">
                {product.producerName}
              </Link>
            </p>
            <p className="mt-5 text-sm leading-relaxed text-slate-700 sm:text-base">
              {product.longDescription || product.shortDescription}
            </p>

            {product.certifications.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.certifications.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand"
                  >
                    {c}
                  </span>
                ))}
              </div>
            ) : null}

            {product.specs.length > 0 ? (
              <>
                <h2 className="mt-8 text-sm font-bold uppercase tracking-wide text-slate-500">Typical specs</h2>
                <dl className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200">
                  {product.specs.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[1fr_1fr] sm:items-center"
                    >
                      <dt className="text-sm font-medium text-slate-700">{row.label}</dt>
                      <dd className="text-sm text-slate-600 sm:text-right">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : null}
          </article>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Packaging & logistics</h2>
              {product.packaging.length > 0 ? (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Packaging</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {product.packaging.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-600">Contact the producer for packaging options.</p>
              )}
              {product.incoterms.length > 0 ? (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Incoterms (indicative)
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{product.incoterms.join(", ")}</p>
                </div>
              ) : null}
              <Link
                href="/#contact"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-brand px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
              >
                Request structured RFQ
              </Link>
              <Link
                href={`/producers/${product.producerSlug}`}
                className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                View producer
              </Link>
              <Link
                href={`/producers/${product.producerSlug}/products`}
                className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                More from this producer
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
