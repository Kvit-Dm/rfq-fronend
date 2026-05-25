import type { Metadata } from "next";
import Link from "next/link";

import { fetchAllProducers } from "@/lib/catalog/fetch-producers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verified producers",
  description: "Browse verified Ukrainian export producers and their product catalogs.",
};

export default async function ProducersPage() {
  const producers = await fetchAllProducers();

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
            <li className="font-medium text-slate-700">Producers</li>
          </ol>
        </nav>

        <header className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Verified producers</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Explore export-ready Ukrainian manufacturers. Each producer profile links to their product catalog.
          </p>
        </header>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {producers.map((p) => (
            <li key={p.slug}>
              <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand/30 hover:shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">Producer</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">{p.name}</h2>
                <p className="mt-2 text-sm font-medium text-slate-700">{p.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{p.description}</p>
                <p className="mt-4 text-xs text-slate-500">{p.hq}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/producers/${p.slug}`}
                    className="inline-flex rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
                  >
                    Profile
                  </Link>
                  <Link
                    href={`/producers/${p.slug}/products`}
                    className="inline-flex rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
                  >
                    Products
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
