/**
 * CLI check: Strapi flat list → category tree.
 * Run: npm run verify:categories
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // optional
  }
}

function countNodes(
  nodes: { children: { children: unknown[] }[] }[],
): number {
  return nodes.reduce((sum, n) => sum + 1 + countNodes(n.children), 0);
}

async function main() {
  loadEnvLocal();

  const base = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  console.log(`Fetching categories from ${base} …`);

  const { fetchCategoryTree } = await import("../src/lib/catalog/fetch-category-tree");
  const tree = await fetchCategoryTree();
  const total = countNodes(tree);

  console.log(`OK — ${tree.length} root categories, ${total} nodes in tree.`);
  for (const root of tree) {
    console.log(`  · ${root.name} (${root.slug}) — ${root.children.length} direct children`);
  }
}

main().catch((err) => {
  console.error("FAILED:", err instanceof Error ? err.message : err);
  process.exit(1);
});
