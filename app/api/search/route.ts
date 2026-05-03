import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface SearchRequest {
  query: string;
}

interface OFFProduct {
  nova_group?: number;
  ingredients_text?: string;
  additives_tags?: string[];
  product_name?: string;
  brands?: string;
}

interface OFFResponse {
  products: OFFProduct[];
  count: number;
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function extractKeywords(query: string): string[] {
  return normalizeText(query)
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 2);
}

function isRelevantProduct(query: string, product: OFFProduct | null): boolean {
  if (!product) return false;

  const keywords = extractKeywords(query);
  if (keywords.length === 0) return true;

  const productName = normalizeText(product.product_name ?? "");
  const brandName = normalizeText(product.brands ?? "");

  return keywords.some((keyword) => productName.includes(keyword) || brandName.includes(keyword));
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SearchRequest;
    const query = body.query?.trim();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    console.log("Searching OFF for:", query);

    const url = `https://world.openfoodfacts.org/api/v2/search?search_terms=${encodeURIComponent(query)}&page_size=3&fields=product_name,brands,nova_group,ingredients_text,additives_tags`;
    console.log("Fetching from OFF:", url);

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Foodlense/1.0 (foodlense@gmail.com)",
        "Accept": "application/json",
      },
    });

    console.log("OFF response status:", res.status);

    if (!res.ok) {
      throw new Error(`OpenFoodFacts API error: ${res.status}`);
    }

    const data = (await res.json()) as OFFResponse;
    const firstProduct = data.products?.[0] || null;
    const product = isRelevantProduct(query, firstProduct) ? firstProduct : null;

    if (firstProduct && !product) {
      console.log("OFF product discarded as irrelevant:", firstProduct.product_name);
    }

    console.log("OFF product found:", product ? "yes" : "no");

    return NextResponse.json({ product }, { status: 200 });
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json(
      { error: "Failed to search OpenFoodFacts. Please try again." },
      { status: 500 }
    );
  }
}
