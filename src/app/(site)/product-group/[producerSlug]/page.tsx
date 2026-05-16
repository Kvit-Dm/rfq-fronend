import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProducerBySlug, listGroupsByProducer } from "@/data/catalog-dummy";

type PageProps = {
  params: Promise<{ producerSlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { producerSlug } = await params;
  const producer = getProducerBySlug(producerSlug);
  if (!producer) {
    return { title: "Producer" };
  }
  return {
    title: `${producer.name} products & export supply`,
    description: producer.description,
  };
}

export default async function ProducerProductGroupPage({ params }: PageProps) {
  const { producerSlug } = await params;
  const producer = getProducerBySlug(producerSlug);
  if (!producer) notFound();

  const groups = listGroupsByProducer(producerSlug);

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
              <dd className="mt-1 font-medium text-slate-900">{producer.categories.join(" · ")}</dd>
            </div>
          </dl>
        </header>

        <section className="mt-10" aria-labelledby="lines-heading">
          <div className="flex items-end justify-between gap-4">
            <h2 id="lines-heading" className="text-xl font-bold text-slate-900 sm:text-2xl">
              Product lines
            </h2>
            <Link href="/product-groups" className="text-sm font-semibold text-brand hover:underline">
              Browse all groups
            </Link>
          </div>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <li key={g.id}>
                <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand/30 hover:shadow-md">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">{g.category}</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">{g.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{g.shortDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.certifications.map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      href={`/product-group/${g.producerSlug}/${g.slug}`}
                      className="inline-flex w-full items-center justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
                    >
                      Open product group
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
