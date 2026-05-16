import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900">Producer not found</h1>
      <p className="mt-2 text-slate-600">This producer is not in the dummy catalog yet.</p>
      <Link href="/producers" className="mt-6 inline-flex font-semibold text-brand hover:underline">
        Browse producers
      </Link>
    </div>
  );
}
