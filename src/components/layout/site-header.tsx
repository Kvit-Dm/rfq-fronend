import { ArrowRight, Sprout } from "lucide-react";
import Link from "next/link";

const navLinkClass = "transition hover:text-brand";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white shadow-sm">
            <Sprout className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            AGROEXPORT <span className="text-brand">UA</span>
          </span>
        </Link>
        <nav
          className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex"
          aria-label="Primary"
        >
          <Link href="/product-groups" className={navLinkClass}>
            Product groups
          </Link>
          <Link href="/#how" className={navLinkClass}>
            How it works
          </Link>
          <Link href="/#buyers" className={navLinkClass}>
            For buyers
          </Link>
          <Link href="/#producers" className={navLinkClass}>
            For producers
          </Link>
          <Link href="/#contact" className={navLinkClass}>
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 sm:inline-flex"
          >
            Sign in
          </button>
          <Link
            href="/#rfq"
            className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark"
          >
            Start RFQ
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </header>
  );
}
