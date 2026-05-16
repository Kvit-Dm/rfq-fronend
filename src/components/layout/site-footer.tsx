import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} AGROEXPORT UA. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="transition hover:text-brand">
            Privacy
          </Link>
          <Link href="#" className="transition hover:text-brand">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
