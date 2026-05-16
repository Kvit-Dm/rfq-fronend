import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProductGroupDetail } from "@/data/catalog-dummy";

type PageProps = {
  params: Promise<{ producerSlug: string; productSlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { producerSlug, productSlug } = await params;
  const detail = getProductGroupDetail(producerSlug, productSlug);
  if (!detail) {
    return { title: "Product group" };
  }
  return {
    title: `${detail.name} by ${detail.producerName}`,
    description: detail.shortDescription,
  };
}

export default async function ProductGroupDetailPage({ params }: PageProps) {
  const { producerSlug, productSlug } = await params;
  const detail = getProductGroupDetail(producerSlug, productSlug);
  if (!detail) notFound();

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
              <Link href="/product-groups" className="hover:text-brand">
                Product groups
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`/product-group/${detail.producerSlug}`} className="hover:text-brand">
                {detail.producerName}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-slate-700">{detail.name}</li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">{detail.category}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{detail.name}</h1>
            <p className="mt-2 text-sm font-medium text-slate-600 sm:text-base">{detail.producerName}</p>
            <p className="mt-5 text-sm leading-relaxed text-slate-700 sm:text-base">{detail.longDescription}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {detail.certifications.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand"
                >
                  {c}
                </span>
              ))}
            </div>

            <h2 className="mt-8 text-sm font-bold uppercase tracking-wide text-slate-500">Typical specs</h2>
            <dl className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200">
              {detail.specs.map((row) => (
                <div key={row.label} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[1fr_1fr] sm:items-center">
                  <dt className="text-sm font-medium text-slate-700">{row.label}</dt>
                  <dd className="text-sm text-slate-600 sm:text-right">{row.value}</dd>
                </div>
              ))}
            </dl>
          </article>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Packaging & logistics</h2>
              <p className="mt-2 text-sm text-slate-600">
                Parameters below mirror how buyers compare offers on export catalogs—replace with live DB fields when
                integrated.
              </p>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Packaging</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {detail.packaging.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Incoterms (indicative)</p>
                <p className="mt-2 text-sm font-medium text-slate-900">{detail.incoterms.join(", ")}</p>
              </div>
              <Link
                href="/#contact"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-brand px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
              >
                Request structured RFQ
              </Link>
              <Link
                href={`/product-group/${detail.producerSlug}`}
                className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                Back to producer
              </Link>
            </div>

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">About this page</p>
              <p className="mt-2 leading-relaxed">
                Modeled after public catalog flows such as{" "}
                <a
                  href="https://agroexport-ua.com/product-group/ukroliya/sunflower-oil"
                  className="font-semibold text-brand hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  AGROEXPORT UA — sunflower oil (Ukroliya)
                </a>
                . Content here is placeholder until your API supplies real offers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
