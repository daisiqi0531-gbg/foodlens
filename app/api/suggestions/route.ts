import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query || query.length < 3) {
    return NextResponse.json({ suggestions: [] });
  }

  const hasVowel = /[aeiou]/i.test(query);
  const isOnlyNumbers = /^\d+$/.test(query);
  if (!hasVowel || isOnlyNumbers) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=5`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch from OpenFoodFacts");
    }

    const data = await res.json();

    const queryWords = query.toLowerCase().split(" ");
    const suggestions = data.products
      .map((p: any) => p.product_name)
      .filter((name: string) => {
        if (!name || name.length < 3) return false;
        const nameLower = name.toLowerCase();
        return queryWords.some(word => word.length > 2 && nameLower.includes(word));
      })
      .slice(0, 5);

    return NextResponse.json({ suggestions });
  } catch (err) {
    console.error("Error fetching suggestions:", err);
    return NextResponse.json({ suggestions: [] }, { status: 500 });
  }
}
