import Link from "next/link";

export default function ProductGroupNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900">Product group not found</h1>
      <p className="mt-2 text-slate-600">Check the URL or pick a group from the catalog.</p>
      <Link href="/product-groups" className="mt-6 inline-flex font-semibold text-brand hover:underline">
        Back to product groups
      </Link>
    </div>
  );
}
