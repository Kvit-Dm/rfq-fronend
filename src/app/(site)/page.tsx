import {
  ArrowRight,
  Building2,
  FileText,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section
        className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50"
        aria-labelledby="hero-heading"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,61,145,0.12),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-brand">
            Export infrastructure
          </p>
          <h1
            id="hero-heading"
            className="mx-auto mt-3 max-w-4xl text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Direct access to verified Ukrainian producers
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-slate-600">
            Connect directly with verified Ukrainian producers. Structured RFQ workflow, transparent communication, no
            intermediaries and no prepayments.
          </p>
          <div
            id="rfq"
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/#contact"
              className="inline-flex w-full min-w-[200px] items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-brand-dark sm:w-auto"
            >
              Submit an RFQ
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              href="/#how"
              className="inline-flex w-full min-w-[200px] items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 sm:w-auto"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            {
              icon: ShieldCheck,
              title: "Verified producers",
              text: "Structured onboarding and documentation so you deal with real manufacturers.",
            },
            {
              icon: FileText,
              title: "Structured RFQ",
              text: "Standard parameters for products, packaging, and logistics—less back-and-forth.",
            },
            {
              icon: Globe2,
              title: "Transparent process",
              text: "Digital workflow designed for clarity: no hidden intermediaries in the chain.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="how"
        className="border-b border-slate-200/80 bg-[var(--page-bg)] py-16 sm:py-20"
        aria-labelledby="how-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2
            id="how-heading"
            className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            How it works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            From request to commercial dialogue—organized in one place.
          </p>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Define your request",
                body: "Specify product grades, volumes, packaging, and destination requirements.",
              },
              {
                step: "02",
                title: "Match with producers",
                body: "Qualified Ukrainian manufacturers review your RFQ with aligned export parameters.",
              },
              {
                step: "03",
                title: "Connect directly",
                body: "Transparent communication with producers—contracts stay between you and them.",
              },
            ].map(({ step, title, body }) => (
              <li
                key={step}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="text-3xl font-bold text-brand/25">{step}</span>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="buyers" className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              For international buyers
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Reduce chaotic export communication. Use a single, structured channel to reach verified agricultural producers
              in Ukraine—with clear logistics and product parameters from the start.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                RFQ-led workflow suited to oils, grains, and related categories
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                No platform prepayments; commercial terms with the producer
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                Support in multiple languages for EU, US, and Canadian buyers
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-inner">
            <Building2 className="h-10 w-10 text-brand" aria-hidden />
            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-brand">Buyer workspace</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              Track RFQs and producer responses in one dashboard.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              This layout mirrors the export-focused experience of platforms like AGROEXPORT UA—built for serious B2B
              procurement, not retail checkout.
            </p>
          </div>
        </div>
      </section>

      <section id="producers" className="bg-[var(--page-bg)] py-16 sm:py-20" aria-labelledby="producers-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2
            id="producers-heading"
            className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            For Ukrainian producers
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Present export-ready offers to international buyers with consistent data and less noise from unqualified leads.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-md border-2 border-brand bg-white px-6 py-3 text-base font-semibold text-brand transition hover:bg-brand/5"
            >
              Producer registration
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-slate-200/80 bg-brand py-16 text-white sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ready to connect?</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-blue-100">
            Start a structured RFQ or ask how verification works for your category.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:support@agroexport-ua.com"
              className="inline-flex rounded-md bg-white px-6 py-3 text-base font-semibold text-brand shadow-md transition hover:bg-blue-50"
            >
              support@agroexport-ua.com
            </a>
            <a
              href="tel:+380673446622"
              className="inline-flex rounded-md border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              +380 67 344 66 22
            </a>
          </div>
          <p className="mt-8 text-xs text-blue-200/90">7A Zdolbunivska St., 02081 Kyiv, Ukraine</p>
        </div>
      </section>
    </>
  );
}
