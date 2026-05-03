import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface AnalyzeRequest {
  food: string;
  offProduct?: {
    nova_group?: number;
    ingredients_text?: string;
    additives_tags?: string[];
    product_name?: string;
    brands?: string;
  } | null;
}

interface AnalyzeResult {
  level: number;
  levelName: string;
  verdict: string;
  brand: string | null;
  brandSuggested: boolean;
  suggestedBrands: string[] | null;
  ingredients: string | null;
  harmfulIngredients: string[] | null;
  reason: string | null;
  betterChoice: { text: string; adSlot: boolean } | null;
  estimated: boolean;
  source: "openfoodfacts" | "estimated";
  notFound: boolean;
}

const levelNames: Record<number, string> = {
  1: "Minimally processed",
  2: "Basic culinary ingredients",
  3: "Moderately processed",
  4: "Ultra processed",
};

const freshWholeFoodKeywords = [
  "apple",
  "banana",
  "kiwi",
  "orange",
  "grape",
  "strawberry",
  "watermelon",
  "carrot",
  "spinach",
  "broccoli",
  "tomato",
  "cucumber",
  "lettuce",
];

const commonFoods = [
  "apple", "banana", "kiwi", "orange", "grape",
  "strawberry", "watermelon", "carrot", "spinach",
  "broccoli", "tomato", "cucumber", "lettuce",
  "chicken", "salmon", "eggs", "milk", "yogurt",
  "cheese", "butter", "bread", "pasta", "rice",
  "oats", "pizza", "burger", "sausage", "bacon",
  "chocolate", "chips", "soda", "candy", "coffee",
  "olive oil", "honey", "tofu", "avocado",
  "corn flakes", "cornflakes", "cereal",
];

const brandSuggestionsByCategory: Record<string, string[]> = {
  sausage: ["Scan", "Kronfagel"],
  meat: ["Scan", "Kronfagel"],
  chicken: ["Scan", "Kronfagel"],
  dairy: ["Arla", "Skånemejerier"],
  milk: ["Arla", "Skånemejerier"],
  yogurt: ["Arla", "Skånemejerier"],
  yoghurt: ["Arla", "Skånemejerier"],
  cheese: ["Arla", "Skånemejerier"],
  bread: ["Pågen", "Polarbröd"],
  snack: ["OLW", "Estrella"],
  chips: ["OLW", "Estrella"],
  frozen: ["Findus", "Felix"],
  pizza: ["Findus", "Felix"],
};

const knownBrands = [
  // Swedish/Nordic dairy
  "Arla", "Skånemejerier", "Norrmejerier", "Lindahls",
  // Oat/plant milk
  "Oatly", "Alpro", "Planti", "Aumu", "Oatwell",
  // Meat
  "Scan", "Kronfågel", "Korv", "Charkuteri",
  // Bread
  "Pågen", "Polarbröd", "Fazer", "Hatting",
  // Snacks
  "OLW", "Estrella", "Taffel", "Friggs",
  // Frozen/ready meals
  "Findus", "Felix", "Dafgårds", "Gordo",
  // Candy/chocolate
  "Marabou", "Malaco", "Cloetta", "Ahlgrens",
  // Drinks
  "Ramlösa", "Loka", "Coca-Cola", "Pepsi", "Fanta",
  // Condiments/sauces
  "Heinz", "Kikkoman", "Santa Maria",
  // Plant-based
  "Oumph", "Naturli", "Impossible", "Beyond Meat",
  // International common
  "Nestle", "Kellogs", "Quaker", "Heinz",
  "Danone", "Activia", "Innocent",
  // Supermarket own brands
  "ICA", "Coop", "Garant", "Anglamark",
];

const riskyMarkers = [
  "palm oil",
  "sugar",
  "glucose syrup",
  "modified starch",
  "e621",
  "e471",
  "e450",
  "e330",
  "carrageenan",
  "sodium nitrite",
  "hydrogenated fat",
  "artificial",
];

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

function findTypoCorrection(food: string): string | null {
  const normalized = normalizeText(food);
  if (normalized.length > 30) return null;
  let bestMatch: string | null = null;
  let bestDist = Infinity;
  for (const candidate of commonFoods) {
    const dist = editDistance(normalized, candidate);
    if (dist > 0 && dist <= 2 && dist < bestDist) {
      bestDist = dist;
      bestMatch = candidate;
    }
  }
  return bestMatch;
}

function checkNotFound(food: string, offProduct?: AnalyzeRequest["offProduct"]): boolean {
  const normalized = normalizeText(food);
  const stripped = normalized.replace(/\s/g, "");
  // a. Less than 3 meaningful characters
  if (stripped.length < 3) return true;
  // b. Only numbers
  if (/^\d+$/.test(stripped)) return true;
  // b. No vowels at all (gibberish / all consonants)
  const letters = stripped.replace(/[^a-z]/g, "");
  if (letters.length > 0 && !/[aeiou]/.test(letters)) return true;
  // c. No offProduct AND no category override AND not near or in common foods
  if (!offProduct) {
    const hasOverride = getCategoryOverrideLevel(food) !== null;
    const isFresh = isFreshWholeFood(food);
    const isCommon = commonFoods.some((f) => normalizeText(f) === normalized);
    const hasCorrection = findTypoCorrection(food) !== null;
    if (!hasOverride && !isFresh && !isCommon && !hasCorrection) return true;
  }
  return false;
}

function isFreshWholeFood(food: string): boolean {
  const normalized = normalizeText(food);
  return freshWholeFoodKeywords.some((k) => normalized.includes(k));
}

function getSuggestedBrands(food: string): string[] {
  const normalized = normalizeText(food);
  for (const [category, brands] of Object.entries(brandSuggestionsByCategory)) {
    if (normalized.includes(normalizeText(category))) {
      return brands;
    }
  }
  return ["ICA", "Coop Anglamark"];
}

function extractBrandFromQuery(food: string): string | null {
  const normalized = normalizeText(food);
  for (const brand of knownBrands) {
    if (normalized.includes(normalizeText(brand))) {
      return brand;
    }
  }
  return null;
}

function isRelevantOffBrand(food: string, product?: AnalyzeRequest["offProduct"]): boolean {
  const rawBrand = product?.brands?.trim();
  if (!rawBrand) return false;

  const normalizedBrand = normalizeText(rawBrand);
  if (!normalizedBrand || ["unknown", "n/a", "none"].includes(normalizedBrand)) {
    return false;
  }

  const normalizedFood = normalizeText(food);
  const normalizedProductName = normalizeText(product?.product_name ?? "");

  return (
    normalizedFood.includes(normalizedBrand) ||
    normalizedProductName.includes(normalizedBrand)
  );
}

function translateIngredients(rawIngredients: string | null): string | null {
  if (!rawIngredients) return null;

  const replacements: Array<[RegExp, string]> = [
    [/\bferments\s+lactiques\b/gi, "Lactic cultures"],
    [/\bpresure\b/gi, "Rennet"],
    [/\bfromage\b/gi, "Cheese"],
    [/\boeufs\b/gi, "Eggs"],
    [/\boeuf\b/gi, "Egg"],
    [/\blait\b/gi, "Milk"],
    [/\bcreme\b/gi, "Cream"],
    [/\bsel\b/gi, "Salt"],
    [/\bsucre\b/gi, "Sugar"],
    [/\bfarine\b/gi, "Flour"],
    [/\beau\b/gi, "Water"],
    [/\bhuile\b/gi, "Oil"],
    [/\bbeurre\b/gi, "Butter"],
  ];

  let translated = rawIngredients;
  for (const [pattern, replacement] of replacements) {
    translated = translated.replace(pattern, replacement);
  }

  const nonEnglishMarkers = [
    "lait",
    "creme",
    "sel",
    "sucre",
    "farine",
    "eau",
    "huile",
    "beurre",
    "oeuf",
    "oeufs",
    "fromage",
    "ferments lactiques",
    "presure",
  ];

  const remainingNonEnglish = nonEnglishMarkers.some((marker) =>
    normalizeText(translated).includes(normalizeText(marker))
  );

  return remainingNonEnglish ? `${translated} (translated from original packaging)` : translated;
}

function includesAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function getCategoryOverrideLevel(food: string): number | null {
  const text = normalizeText(food);

  const level4Terms = [
    "sausage", "hot dog", "bacon", "salami", "ham", "chorizo", "pepperoni", "meatball",
    "burger", "nuggets", "fried chicken",
    "pizza", "lasagna", "ready meal",
    "chips", "crisps", "candy", "chocolate", "soda", "energy drink",
    "deli meat", "smoked meat", "cured meat",
  ];

  if (includesAny(text, level4Terms)) return 4;

  const level3Terms = ["bread", "pasta", "rice cakes", "canned", "sauce", "dressings", "dressing",
    "corn flakes", "cornflakes", "cereal", "granola", "muesli"];
  if (includesAny(text, level3Terms)) return 3;

  const level2Terms = ["plain yogurt", "plain yoghurt", "plain cheese", "plain butter", "plain cream", "plain milk", "plain oats"];
  if (includesAny(text, level2Terms)) return 2;

  const level1FreshTerms = [
    "fresh fruit", "fruit", "vegetable", "vegetables", "eggs", "egg", "plain nuts", "nuts",
    "apple", "banana", "kiwi", "orange", "grape", "strawberry", "watermelon",
    "carrot", "spinach", "broccoli", "tomato", "cucumber", "lettuce",
  ];
  if (includesAny(text, level1FreshTerms)) return 1;

  const curedTerms = ["cured", "smoked", "deli", "bacon", "ham", "salami", "sausage"];
  const plainMeatFishTerms = ["plain meat", "plain fish", "fresh fish", "fresh meat", "raw fish", "raw meat"];
  if (includesAny(text, plainMeatFishTerms) && !includesAny(text, curedTerms)) return 1;

  return null;
}

function estimateLevel(food: string, offProduct?: AnalyzeRequest["offProduct"]): { level: number; estimated: boolean } {
  const product = offProduct ?? null;
  if (typeof product?.nova_group === "number" && product.nova_group >= 1 && product.nova_group <= 4) {
    return { level: product.nova_group, estimated: false };
  }

  const overrideLevel = getCategoryOverrideLevel(food);
  if (overrideLevel !== null) {
    return { level: overrideLevel, estimated: true };
  }

  const additivesCount = product?.additives_tags?.length ?? 0;
  if (additivesCount >= 4) return { level: 4, estimated: true };
  if (additivesCount >= 1) return { level: 3, estimated: true };

  const ingredients = (product?.ingredients_text ?? "").trim();
  if (!ingredients) return { level: 2, estimated: true };

  const parts = ingredients
    .split(/[,;]+/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length <= 1) return { level: 1, estimated: true };
  return { level: 3, estimated: true };
}

function buildBrandFields(food: string, product?: AnalyzeRequest["offProduct"]): {
  brand: string | null;
  brandSuggested: boolean;
  suggestedBrands: string[] | null;
} {
  if (isFreshWholeFood(food)) {
    return { brand: null, brandSuggested: false, suggestedBrands: null };
  }

  const queryBrand = extractBrandFromQuery(food);
  if (queryBrand) {
    return { brand: queryBrand, brandSuggested: false, suggestedBrands: null };
  }

  if (isRelevantOffBrand(food, product)) {
    return { brand: product?.brands?.trim() ?? null, brandSuggested: false, suggestedBrands: null };
  }

  const suggestions = getSuggestedBrands(food);
  return {
    brand: null,
    brandSuggested: true,
    suggestedBrands: suggestions.slice(0, 2),
  };
}

function formatReasonItem(value: string): string {
  if (/^e\d+/i.test(value)) return value.toUpperCase();
  return value
    .split(" ")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function buildDynamicReason(level: number, harmfulIngredients: string[] | null, additives: string[]): string | null {
  if (level < 3) return null;

  if (harmfulIngredients && harmfulIngredients.length > 0) {
    const list = harmfulIngredients.map(formatReasonItem).join(", ");
    return `Contains potentially harmful ingredients: ${list}. This indicates industrial processing beyond home cooking.`;
  }

  if (additives.length > 0) {
    const firstTwo = additives.slice(0, 2).map((item) => item.toUpperCase()).join(", ");
    return `Contains ${additives.length} food additives including ${firstTwo}. This level of processing adds preservatives and stabilisers not found in home cooking.`;
  }

  if (level === 4) {
    return "Ultra processed foods typically contain industrial ingredients, flavour enhancers and preservatives not used in home cooking.";
  }

  return "This product has been moderately processed with added salt, sugar, or preservatives beyond simple home cooking.";
}

function getBetterChoice(food: string, level: number): { text: string; adSlot: boolean } | null {
  if (level < 3) return null;

  const text = normalizeText(food);

  if (includesAny(text, ["sausage", "bacon", "salami", "ham", "chorizo", "pepperoni", "processed meat"])) {
    return {
      text: "Try fresh chicken breast or turkey mince instead - unprocessed meat with no additives or preservatives.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["burger", "nuggets", "fried chicken"])) {
    return {
      text: "Make your own burgers with lean beef mince, or try Oumph! or Naturli for a cleaner plant-based option.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["pizza", "frozen", "ready meal", "lasagna"])) {
    return {
      text: "Try making your own pizza with a wholegrain base, or look for Sigrid's Kitchen or clean-label frozen options.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["chips", "crisps"])) {
    return {
      text: "Swap for plain rice cakes, unsalted nuts, or air-popped popcorn with no added flavourings.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["candy", "chocolate"])) {
    return {
      text: "Try dark chocolate 70%+ (Fazer Dark or Marabou Dark) or a small handful of dried fruit and nuts.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["soda", "energy drink"])) {
    return {
      text: "Swap for sparkling water with fresh lemon, or Ramlosa flavoured water with no added sugar.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["bread"])) {
    return {
      text: "Look for sourdough or rye bread with 5 ingredients or fewer - Polarbrod Rag or bakery sourdough are good options.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["cornflakes", "corn flakes", "cereal", "granola", "muesli"])) {
    return {
      text: "Try plain oats or unsweetened muesli — look for options with no added sugar or flavourings. Lindahls or ICA Ekologisk are good starting points.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["sauce", "dressing"])) {
    return {
      text: "Make your own dressing with olive oil, lemon and herbs - or check labels for options without added sugar.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["instant noodles", "noodles", "pasta"])) {
    return {
      text: "Try whole grain pasta with homemade tomato sauce, or Banza chickpea pasta for more nutrients.",
      adSlot: true,
    };
  }

  if (level === 4) {
    return {
      text: "Look for a whole food alternative with 5 ingredients or fewer, and no E-numbers on the label.",
      adSlot: true,
    };
  }

  return {
    text: "Check the ingredient list for a version with fewer additives - or try making a homemade version.",
    adSlot: true,
  };
}

function getVerdict(level: number): string {
  if (level === 1) {
    return "This is a whole food with minimal processing — a great choice as part of a balanced diet.";
  }

  if (level === 2) {
    return "This is lightly processed and generally fine to include regularly in your diet.";
  }

  if (level === 3) {
    return "This product is moderately processed — fine occasionally, but worth checking the ingredients.";
  }

  return "This is ultra processed — best enjoyed rarely and in small amounts.";
}

function buildResult(food: string, offProduct?: AnalyzeRequest["offProduct"]): AnalyzeResult {
  if (checkNotFound(food, offProduct)) {
    return {
      level: 0,
      levelName: "",
      verdict: "",
      brand: null,
      brandSuggested: false,
      suggestedBrands: null,
      ingredients: null,
      harmfulIngredients: null,
      reason: null,
      betterChoice: null,
      estimated: false,
      source: "estimated",
      notFound: true,
    };
  }

  const { level, estimated } = estimateLevel(food, offProduct);
  const brandFields = buildBrandFields(food, offProduct);

  const ingredients = translateIngredients(offProduct?.ingredients_text?.trim() || null);
  const additives = (offProduct?.additives_tags ?? []).map((t) => t.replace(/^en:/i, "").toUpperCase());

  let harmfulIngredients: string[] | null = null;
  if (level >= 3) {
    const text = normalizeText(`${ingredients ?? ""} ${additives.join(" ")}`);
    const found = riskyMarkers.filter((m) => text.includes(m));
    harmfulIngredients = found.length > 0 ? found : null;
  }

  return {
    level,
    levelName: levelNames[level],
    verdict: getVerdict(level),
    brand: brandFields.brand,
    brandSuggested: brandFields.brandSuggested,
    suggestedBrands: brandFields.suggestedBrands,
    ingredients: level === 1 ? null : ingredients,
    harmfulIngredients,
    reason: buildDynamicReason(level, harmfulIngredients, additives),
    betterChoice: getBetterChoice(food, level),
    estimated,
    source: offProduct ? "openfoodfacts" : "estimated",
    notFound: false,
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AnalyzeRequest;
    const food = body.food?.trim();

    if (!food) {
      return NextResponse.json({ error: "Food item is required" }, { status: 400 });
    }

    const result = buildResult(food, body.offProduct ?? null);
    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    console.error("Analyze error:", err);
    return NextResponse.json({ error: "Failed to analyze food. Please try again." }, { status: 500 });
  }
}
