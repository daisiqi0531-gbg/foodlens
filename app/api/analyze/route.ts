import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Lang = "sv" | "en";

interface AnalyzeRequest {
  food: string;
  lang?: Lang;
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
  betterChoice: { text: string; adSlot: boolean } | null;
  estimated: boolean;
  source: "openfoodfacts" | "estimated";
  verdictLabel: string;
  verdictDescription: string;
  funFact: string | null;
  notFound: boolean;
}

const levelNamesMap: Record<Lang, Record<number, string>> = {
  sv: {
    1: "Minimalt bearbetad",
    2: "Basingredienser",
    3: "Måttligt processad",
    4: "Ultraprocessad",
  },
  en: {
    1: "Minimally processed",
    2: "Basic ingredients",
    3: "Moderately processed",
    4: "Ultra-processed",
  },
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
  "protein bar", "deli turkey", "veggie burger",
  "fruit juice", "flavoured yogurt", "oat milk",
  "bottled smoothie", "flavoured nuts", "coleslaw",
  "filmjolk", "kvarg", "skyr",
  "frozen vegetables", "sardines", "chickpeas",
  "coconut oil", "creme fraiche",
  "herring", "dark chocolate", "granola",
  "rice cakes", "instant oats",
  "havregryn", "oatmeal", "knackebrod", "knäckebröd",
  "falukorv", "kottbullar", "köttbullar",
  "wasa", "leksands",
  // Dairy & basics
  "plain yogurt", "full fat yogurt", "full fat milk", "canned tomatoes",
  "plain nuts", "almonds", "popcorn",
  // Bread & grains
  "rye bread", "dark rye bread", "naan", "naan bread",
  "pita", "pita bread", "basmati rice",
  // Breakfast
  "breakfast cereal",
  // Protein & plant
  "paneer", "halloumi", "edamame",
  // Asian foods – clean
  "miso", "miso paste", "kimchi", "coconut milk",
  "rice noodles", "fish sauce", "chili oil",
  // Asian foods – processed
  "instant ramen", "ramen",
  "teriyaki sauce", "bulgogi sauce", "gochujang",
  "hoisin sauce", "oyster sauce", "curry sauce",
  "dumpling", "frozen dumpling", "wonton", "spring roll",
  "kimchi",
  "pad thai", "fried rice", "bibimbap",
  "supermarket sushi",
  // Fermented
  "tapai", "tape",
  // Additives (for search recognition)
  "acesulfame k", "sorbitol",
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
  havregryn: ["Axa", "ICA Ekologisk"],
  oats: ["Axa", "ICA Ekologisk"],
  knackebrod: ["Wasa", "Leksands"],
  falukorv: ["Scan", "Lithells"],
  kvarg: ["Lindahls", "Arla"],
  skyr: ["Lindahls", "Milko"],
  kottbullar: ["Scan", "ICA"],
  meatball: ["Scan", "ICA"],
  meatballs: ["Scan", "ICA"],
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

  // Chocolate special case — must check before level4Terms
  if (text.includes("dark chocolate")) return 3;
  if (text.includes("chocolate") || text.includes("milk chocolate")) return 4;

  // Level-2 specifics that must be caught before broader level-3/4 term checks
  if (includesAny(text, ["kimchi", "fish sauce", "plain cheese"])) return 2;

  const level4Terms = [
    "sausage", "hot dog", "bacon", "salami", "ham", "chorizo", "pepperoni", "meatball",
    "burger", "nuggets", "fried chicken",
    "pizza", "lasagna", "ready meal",
    "chips", "crisps", "candy", "soda", "energy drink",
    "deli meat", "smoked meat", "cured meat",
    "protein bar", "deli turkey", "deli chicken",
    "veggie burger", "fruit juice", "flavoured yogurt",
    "flavored yogurt", "energy bar",
    "falukorv",
    "ramen", "teriyaki", "dumpling",
  ];

  if (includesAny(text, level4Terms)) return 4;

  const level3Terms = [
    "bread", "pasta", "rice cake", "canned", "sauce", "dressings", "dressing",
    "corn flakes", "cornflakes", "cereal", "granola", "muesli",
    "oat milk", "bottled smoothie", "smoothie",
    "flavoured nuts", "flavored nuts", "coleslaw",
    "frozen meal", "instant oats",
    "kottbullar", "köttbullar", "meatballs",
    "cheese", "ost",
  ];
  if (includesAny(text, level3Terms)) return 3;

  const level2Terms = [
    "plain yogurt", "plain yoghurt", "plain butter", "plain cream", "plain milk", "plain oats",
    "filmjolk", "filmjölk", "kvarg", "skyr",
    "knackebrod", "knäckebröd", "wasa", "leksands",
    "frozen vegetables", "frozen veg",
    "sardines", "canned chickpeas", "chickpeas",
    "coconut oil", "creme fraiche",
  ];
  if (includesAny(text, level2Terms)) return 2;

  const level1FreshTerms = [
    "fresh fruit", "fruit", "vegetable", "vegetables", "plain nuts", "nuts",
    "apple", "banana", "kiwi", "orange", "grape", "strawberry", "watermelon",
    "carrot", "spinach", "broccoli", "tomato", "cucumber", "lettuce",
    "avocado", "plain popcorn", "almonds", "herring", "sill", "tofu",
    "havregryn",
  ];
  if (includesAny(text, level1FreshTerms) || /\beggs?\b/.test(text)) return 1;

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

function getStructuredAdditives(food: string): string[] {
  const text = normalizeText(food);

  if (includesAny(text, ["falukorv"]))
    return ["Sodium nitrite", "E450 (phosphates)", "Starch fillers"];
  if (includesAny(text, ["kottbullar", "köttbullar", "meatball", "meatballs"]))
    return ["E450 (phosphates)", "Modified starch", "Flavour enhancers"];
  if (includesAny(text, ["sausage", "korv", "pepperoni", "bacon", "salami", "ham", "chorizo"]))
    return ["Sodium nitrite", "E450 (phosphates)", "Artificial flavourings"];
  if (includesAny(text, ["deli turkey", "deli chicken"]))
    return ["Sodium nitrite", "E450 (phosphates)", "Modified starch"];
  if (includesAny(text, ["frozen pizza", "pizza"]))
    return ["E471 (emulsifier)", "Modified starch", "Palm oil"];
  if (includesAny(text, ["lasagna", "lasagne"]))
    return ["E471 (emulsifier)", "Modified starch", "Flavour enhancers"];
  if (includesAny(text, ["ready meal", "frozen meal"]))
    return ["E471 (emulsifier)", "E450 (phosphates)", "Modified starch"];
  if (includesAny(text, ["burger", "nuggets", "fried chicken"]))
    return ["E450 (phosphates)", "Modified starch", "Artificial flavourings"];
  if (includesAny(text, ["chips", "crisps"]))
    return ["E621 (MSG)", "Artificial flavourings", "Palm oil"];
  if (includesAny(text, ["protein bar", "energy bar"]))
    return ["Maltodextrin", "Sucralose", "Artificial flavourings"];
  if (includesAny(text, ["candy", "godis", "sweets"]))
    return ["Glucose syrup", "E471 (emulsifier)", "Artificial colours"];
  if (includesAny(text, ["milk chocolate"]))
    return ["E476 (emulsifier)", "Glucose syrup", "Artificial flavourings"];
  if (includesAny(text, ["flavoured yogurt", "flavored yogurt"]))
    return ["E471 (emulsifier)", "Glucose syrup", "Artificial flavourings"];
  if (includesAny(text, ["ice cream"]))
    return ["E471 (emulsifier)", "E407 (carrageenan)", "Glucose syrup"];
  if (includesAny(text, ["bread", "brod", "bröd"]))
    return ["E471 (emulsifier)", "Calcium propionate", "Modified starch"];
  if (includesAny(text, ["cornflakes", "corn flakes", "breakfast cereal", "cereal"]))
    return ["Glucose syrup", "Artificial flavourings", "Modified starch"];
  if (includesAny(text, ["instant oats", "flavoured oats"]))
    return ["Glucose syrup", "Artificial flavourings", "Maltodextrin"];
  if (includesAny(text, ["wrap", "tortilla"]))
    return ["E471 (emulsifier)", "Calcium propionate", "Modified starch"];
  if (includesAny(text, ["soda", "energy drink", "läsk"]))
    return ["Glucose syrup", "E330 (citric acid)", "Artificial flavourings"];
  if (includesAny(text, ["fruit juice"]))
    return ["E330 (citric acid)", "Glucose syrup", "Artificial flavourings"];
  if (includesAny(text, ["instant ramen", "ramen"]))
    return ["E621 (MSG)", "Palm oil", "Modified starch"];
  if (includesAny(text, ["teriyaki sauce"]))
    return ["Glucose syrup", "Modified starch", "Artificial flavourings"];
  if (includesAny(text, ["ketchup"]))
    return ["Glucose syrup", "E330 (citric acid)", "Modified starch"];
  if (includesAny(text, ["mayonnaise", "mayo"]))
    return ["E471 (emulsifier)", "E330 (citric acid)", "Modified starch"];
  if (includesAny(text, ["instant soup"]))
    return ["E621 (MSG)", "Modified starch", "Palm oil"];
  if (includesAny(text, ["spring roll", "dumpling", "wonton"]))
    return ["E450 (phosphates)", "Modified starch", "Artificial flavourings"];
  if (includesAny(text, ["curry sauce"]))
    return ["Modified starch", "Glucose syrup", "Artificial flavourings"];
  if (includesAny(text, ["granola"]))
    return ["Glucose syrup", "Palm oil", "Artificial flavourings"];
  if (includesAny(text, ["oyster sauce"]))
    return ["Modified starch", "Glucose syrup", "E330 (citric acid)"];
  if (includesAny(text, ["hoisin sauce", "bulgogi sauce"]))
    return ["Glucose syrup", "E330 (citric acid)", "Artificial flavourings"];
  if (includesAny(text, ["sauce", "dressing"]))
    return ["E471 (emulsifier)", "E330 (citric acid)", "Glucose syrup"];

  return [];
}

function getBetterChoice(food: string, level: number, lang: Lang): { text: string; adSlot: boolean } | null {
  if (level < 3) return null;

  const text = normalizeText(food);

  if (lang === "en") {
    if (includesAny(text, ["sausage", "bacon", "salami", "ham", "chorizo", "pepperoni", "processed meat"])) {
      return { text: "Try chicken breast or lean mince instead — unprocessed meat with no additives or preservatives.", adSlot: true };
    }
    if (includesAny(text, ["veggie burger", "veggie patty", "plant burger"])) {
      return { text: "Try Oumph! or Naturli — they have cleaner ingredient lists than most veggie burgers. Or make your own with chickpeas, oats and spices.", adSlot: true };
    }
    if (includesAny(text, ["burger", "nuggets", "fried chicken"])) {
      return { text: "Make your own burgers with lean mince, or try Oumph! or Naturli for a cleaner plant-based option.", adSlot: true };
    }
    if (includesAny(text, ["pizza", "frozen", "ready meal", "lasagna"])) {
      return { text: "Try making your own pizza with a wholegrain base, or look for Sigrid's Kitchen or cleaner frozen options.", adSlot: true };
    }
    if (includesAny(text, ["chips", "crisps"])) {
      return { text: "Swap for rice cakes, unsalted nuts or plain popcorn without added flavourings.", adSlot: true };
    }
    if (includesAny(text, ["candy", "chocolate"])) {
      return { text: "Try dark chocolate 70%+ (Fazer Dark or Marabou Dark) or a small handful of dried fruit and nuts.", adSlot: true };
    }
    if (includesAny(text, ["soda", "energy drink"])) {
      return { text: "Swap for sparkling water with fresh lemon, or Ramlösa flavoured water with no added sugar.", adSlot: true };
    }
    if (includesAny(text, ["bread"])) {
      return { text: "Look for sourdough or rye bread with 5 or fewer ingredients — Polarbröd Råg or bakery sourdough are solid options.", adSlot: true };
    }
    if (includesAny(text, ["cornflakes", "corn flakes", "cereal", "granola", "muesli"])) {
      return { text: "Try plain oats or unsweetened muesli — look for options with no added sugar. Axa or ICA Ekologisk are good starting points.", adSlot: true };
    }
    if (includesAny(text, ["sauce", "dressing"])) {
      return { text: "Make your own dressing with olive oil, lemon and herbs — or check the label for options with no added sugar.", adSlot: true };
    }
    if (includesAny(text, ["instant noodles", "noodles", "pasta"])) {
      return { text: "Try wholegrain pasta with homemade tomato sauce, or Banza chickpea pasta for more nutrition.", adSlot: true };
    }
    if (includesAny(text, ["falukorv"])) {
      return { text: "Try plain chicken breast or homemade meatballs — same satisfying meal with far fewer additives.", adSlot: true };
    }
    if (includesAny(text, ["kottbullar", "köttbullar", "meatballs"])) {
      return { text: "Homemade meatballs take 20 minutes and have 5 ingredients — mince, egg, onion, breadcrumbs, salt. Far cleaner than shop-bought.", adSlot: true };
    }
    if (level === 4) {
      return { text: "Look for a whole food alternative with 5 or fewer ingredients, and no E-numbers on the label.", adSlot: true };
    }
    return { text: "Check the ingredient list for a version with fewer additives — or try making a homemade version.", adSlot: true };
  }

  if (includesAny(text, ["sausage", "bacon", "salami", "ham", "chorizo", "pepperoni", "processed meat"])) {
    return {
      text: "Prova kycklingbröst eller nötfärs istället — obearbetat kött utan tillsatser eller konserveringsmedel.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["veggie burger", "veggie patty", "plant burger"])) {
    return {
      text: "Prova Oumph! eller Naturli — de har renare ingredienslistor än de flesta vegoburgare. Eller gör dina egna med kikärtor, havregryn och kryddor.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["burger", "nuggets", "fried chicken"])) {
    return {
      text: "Gör dina egna burgare med nötfärs, eller prova Oumph! eller Naturli för ett renare växtbaserat alternativ.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["pizza", "frozen", "ready meal", "lasagna"])) {
    return {
      text: "Prova att göra din egen pizza med en fullkornsbotten, eller leta efter Sigrid's Kitchen eller renare frysta alternativ.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["chips", "crisps"])) {
    return {
      text: "Byt mot riskex, osaltade nötter eller popcorn utan tillsatta smakämnen.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["candy", "chocolate"])) {
    return {
      text: "Prova mörk choklad 70%+ (Fazer Dark eller Marabou Dark) eller en liten handful torkad frukt och nötter.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["soda", "energy drink"])) {
    return {
      text: "Byt mot kolsyrat vatten med färsk citron, eller Ramlösa smaksatt vatten utan tillsatt socker.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["bread"])) {
    return {
      text: "Leta efter surdegsböd eller rågbröd med 5 ingredienser eller färre — Polarböd Råg eller bagerisurdeg är bra alternativ.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["cornflakes", "corn flakes", "cereal", "granola", "muesli"])) {
    return {
      text: "Prova vanliga havregryn eller osötat müsli — leta efter alternativ utan tillsatt socker. Axa eller ICA Ekologisk är bra startpunkter.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["sauce", "dressing"])) {
    return {
      text: "Gör din egen dressing med olivolja, citron och örter — eller kolla etiketten för alternativ utan tillsatt socker.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["instant noodles", "noodles", "pasta"])) {
    return {
      text: "Prova fullkornspasta med hemgjord tomatsås, eller Banza kikärtspasta för mer näring.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["falukorv"])) {
    return {
      text: "Prova vanligt kycklingbröst eller hemgjorda köttbullar — samma tillfredsställande måltid med mycket färre tillsatser.",
      adSlot: true,
    };
  }

  if (includesAny(text, ["kottbullar", "köttbullar", "meatballs"])) {
    return {
      text: "Hemgjorda köttbullar tar 20 minuter och har 5 ingredienser — nötfärs, ägg, lök, ströbröd, salt. Mycket renare än färdigköpta.",
      adSlot: true,
    };
  }

  if (level === 4) {
    return {
      text: "Leta efter ett helfodsalternativ med 5 ingredienser eller färre, och inga E-nummer på etiketten.",
      adSlot: true,
    };
  }

  return {
    text: "Kolla ingredienslistan efter en version med färre tillsatser — eller prova att göra en hemgjord version.",
    adSlot: true,
  };
}

function getVerdict(level: number, lang: Lang): string {
  if (lang === "en") {
    if (level === 1) return "This is real food with minimal processing — an excellent choice as part of a balanced diet.";
    if (level === 2) return "This is lightly processed and generally fine to eat regularly.";
    if (level === 3) return "This product is moderately processed — fine occasionally, but worth checking the ingredients.";
    return "This is ultra-processed — enjoy rarely and in small amounts.";
  }
  if (level === 1) {
    return "Det här är riktig mat med minimal bearbetning — ett utmärkt val som en del av en balanserad kost.";
  }

  if (level === 2) {
    return "Det här är lätt bearbetat och generellt bra att äta regelbundet.";
  }

  if (level === 3) {
    return "Den här produkten är måttligt bearbetad — bra ibland, men värt att kolla ingredienserna.";
  }

  return "Det här är ultraprocessat — njut sällan och i små mängder.";
}

function getVerdictLabel(level: number, lang: Lang): string {
  if (lang === "en") {
    if (level === 1) return "As clean as it gets";
    if (level === 2) return "Everyday food";
    if (level === 3) return "Now and then";
    return "A treat";
  }
  if (level === 1) return "Så rent som det blir";
  if (level === 2) return "Vardagsmat";
  if (level === 3) return "Ibland";
  return "En njutning";
}

function getVerdictDescription(food: string, level: number, lang: Lang): string {
  const text = normalizeText(food);

  if (lang === "en") {
    if (level === 1) {
      if (includesAny(text, ["fruit", "banana", "apple", "kiwi", "orange", "grape", "strawberry", "watermelon"])) {
        return "A perfect daily snack — grab it without a second thought";
      }
      if (includesAny(text, ["carrot", "spinach", "broccoli", "tomato", "cucumber", "lettuce", "vegetable"])) {
        return "Eat as much as you like — the more the better";
      }
      if (/\beggs?\b/.test(text)) return "A solid daily protein source — nothing to worry about";
      if (includesAny(text, ["salmon", "lax", "gravlax"])) return "An excellent everyday protein — one of the best fish choices";
      if (includesAny(text, ["havregryn", "oats", "oatmeal"])) return "One of the best breakfast choices you can make — keeps you full for hours and has just one ingredient";
      return "Minimal processing, no additives — eat it as often as you like";
    }
    if (level === 2) {
      if (includesAny(text, ["olive oil", "butter", "cream"])) return "Use it in cooking every day — it's just a base ingredient, nothing added";
      if (includesAny(text, ["kvarg", "skyr"])) return "An excellent daily protein snack — just strained milk, nothing added";
      if (includesAny(text, ["yogurt", "yoghurt", "filmjolk", "milk", "filmjölk"])) return "A solid everyday choice — perfect at breakfast or as a snack";
      if (includesAny(text, ["knackebrod", "knäckebröd", "wasa", "leksands", "crispbread"])) return "A Swedish kitchen staple — go for ones with just rye, water and salt for the cleanest option";
      return "A simple, lightly processed ingredient — fine to eat every day without thinking about it";
    }
    if (level === 3) {
      if (includesAny(text, ["bread", "brod", "bröd"])) return "Most people eat bread every day and that's fine — just look for versions with fewer than 5 ingredients";
      if (includesAny(text, ["cornflakes", "corn flakes", "cereal", "granola", "muesli"])) return "Fine occasionally but not the best daily breakfast — high sugar versions leave you hungry again soon";
      if (includesAny(text, ["cheese", "ost"])) return "Perfect on sandwiches or in cooking — just not the whole block at once";
      if (includesAny(text, ["kottbullar", "köttbullar", "meatball", "meatballs"])) return "Shop-bought: level 3\u20134 / Homemade: level 2 — if you have 20 minutes, homemade is always the better choice";
      if (includesAny(text, ["pasta", "rice cakes"])) return "A reliable dinner base — just watch the portion size and add some vegetables";
      if (includesAny(text, ["kanelbulle", "semla"])) return "A Swedish classic — enjoy it for the treat it is, not as an everyday snack";
      if (includesAny(text, ["sauce", "dressing"])) return "Use it for flavour — just check the label, many sauces hide surprising amounts of sugar";
      return "Worth eating less often than whole foods — but no reason to stress if it's part of a varied diet";
    }
    // level 4
    if (includesAny(text, ["falukorv"])) return "A Swedish classic but heavily processed — fine occasionally, not every day";
    if (includesAny(text, ["sausage", "korv", "bacon", "salami", "ham", "chorizo", "pepperoni"])) return "Best saved for the weekend — high in preservatives and salt";
    if (includesAny(text, ["chips", "crisps"])) return "Perfect for movie nights — just don't make it your daily afternoon snack";
    if (includesAny(text, ["candy", "chocolate", "godis"])) return "It's a treat — enjoy it and don't overthink it, just not every day";
    if (includesAny(text, ["soda", "energy drink", "läsk"])) return "Worth swapping for water or sparkling water most of the time";
    if (includesAny(text, ["pizza", "frozen", "lasagna", "ready meal"])) return "Fine for a lazy night — just not every night";
    if (includesAny(text, ["veggie burger", "veggie patty", "plant burger"])) return "Most plant-based burgers are just as processed as meat ones — check the label for a shorter ingredient list";
    if (includesAny(text, ["burger", "nuggets", "fried chicken"])) return "A meal to enjoy occasionally — fun but not fuel";
    return "This is heavily processed — fun to enjoy occasionally but your body will thank you for not making it a habit";
  }

  if (level === 1) {
    if (includesAny(text, ["fruit", "banana", "apple", "kiwi", "orange", "grape", "strawberry", "watermelon"])) {
      return "En perfekt snack varje dag — ta den utan att tveka";
    }
    if (includesAny(text, ["carrot", "spinach", "broccoli", "tomato", "cucumber", "lettuce", "vegetable"])) {
      return "Ät hur mycket du vill — ju mer desto bättre";
    }
    if (/\beggs?\b/.test(text)) {
      return "En solid proteinkälla varje dag — inget att oroa sig för";
    }
    if (includesAny(text, ["salmon", "lax", "gravlax"])) {
      return "Ett utmärkt vardagsprotein — ett av de bästa fiskvalen";
    }
    if (includesAny(text, ["havregryn", "oats", "oatmeal"])) {
      return "Ett av de bästa frukostval du kan göra — håller dig mätt i timmar och har bara en ingrediens";
    }
    return "Minimal bearbetning, inga tillsatser — ät det så ofta du vill";
  }

  if (level === 2) {
    if (includesAny(text, ["olive oil", "butter", "cream"])) {
      return "Använd det i matlagning varje dag — det är bara en basingrediiens, inget tillsatt";
    }
    if (includesAny(text, ["kvarg", "skyr"])) {
      return "En utmärkt proteinsnack varje dag — bara silad mjölk, inget tillsatt";
    }
    if (includesAny(text, ["yogurt", "yoghurt", "filmjolk", "milk", "filmjölk"])) {
      return "Ett solitt vardagsval — perfekt till frukost eller som mellanmål";
    }
    if (includesAny(text, ["knackebrod", "knäckebröd", "wasa", "leksands", "crispbread"])) {
      return "En svensk köksstapel — välj de med bara råg, vatten och salt för det renaste alternativet";
    }
    return "En enkel, lätt bearbetad ingrediens — bra att äta varje dag utan att tänka på det";
  }

  if (level === 3) {
    if (includesAny(text, ["bread", "brod", "bröd"])) {
      return "De flesta äter bröd varje dag och det är okej — leta bara efter versioner med färre än 5 ingredienser";
    }
    if (includesAny(text, ["cornflakes", "corn flakes", "cereal", "granola", "muesli"])) {
      return "Okej ibland men inte det bästa dagliga frukostalternativet — högsockerversioner gör att du snart blir hungrig igen";
    }
    if (includesAny(text, ["cheese", "ost"])) {
      return "Perfekt på smörgåsar eller i matlagning — bara inte hela blocket på en gång";
    }
    if (includesAny(text, ["kottbullar", "köttbullar", "meatball", "meatballs"])) {
      return "Färdigköpta: nivå 3\u20134 / Hemgjorda: nivå 2 — om du har 20 minuter är hemgjorda alltid det bättre valet";
    }
    if (includesAny(text, ["pasta", "rice cakes"])) {
      return "En pålitlig middagsrätt — kolla bara portionsstorleken och lägg till lite grönsaker";
    }
    if (includesAny(text, ["kanelbulle", "semla"])) {
      return "En svensk klassiker — njut av den som den godis den är, inte som en vardagssnack";
    }
    if (includesAny(text, ["sauce", "dressing"])) {
      return "Använd det för smak — kolla bara etiketten, många såser döljer överraskande mycket socker";
    }
    return "Värt att äta mer sällan än hela livsmedel — men ingen anledning att stressa om det är en del av en varierad kost";
  }

  // level 4
  if (includesAny(text, ["falukorv"])) {
    return "En svensk klassiker men kraftigt bearbetad — bra ibland, men inte varje dag";
  }
  if (includesAny(text, ["sausage", "korv", "bacon", "salami", "ham", "chorizo", "pepperoni"])) {
    return "Bäst sparat till helgen — hög halt av konserveringsmedel och salt";
  }
  if (includesAny(text, ["chips", "crisps"])) {
    return "Perfekt till filmkvällar — men gör det inte till din eftermiddagssnack varje dag";
  }
  if (includesAny(text, ["candy", "chocolate", "godis"])) {
    return "Det är godis — njut av det och övertänk det inte, bara inte varje dag";
  }
  if (includesAny(text, ["soda", "energy drink", "läsk"])) {
    return "Värt att byta mot vatten eller kolsyrat vatten för det mesta";
  }
  if (includesAny(text, ["pizza", "frozen", "lasagna", "ready meal"])) {
    return "Fint för en lat kväll — bara inte varje kväll";
  }
  if (includesAny(text, ["veggie burger", "veggie patty", "plant burger"])) {
    return "De flesta växtbaserade burgare är lika bearbetade som köttburgare — kolla etiketten för en kortare ingredienslista";
  }
  if (includesAny(text, ["burger", "nuggets", "fried chicken"])) {
    return "En måltid att njuta av ibland — rolig men inte bränsle";
  }
  return "Den här är kraftigt bearbetad — kul att njuta av ibland men din kropp kommer tacka dig för att inte göra det till en vana";
}

const funFacts: Array<{ keywords: string[]; sv: string; en: string }> = [
  { keywords: ["butter"], sv: "Smör får dåligt rykte — men det är bara grädde och salt, en av de minst bearbetade mejeriprodukterna du kan köpa", en: "Butter gets a bad rep — but it's just cream and salt, one of the least processed dairy products you can buy" },
  { keywords: ["eggs", "egg"], sv: "Ägg har fått orättvis kritik i decennier — de är riktig mat med noll bearbetning och bra näring", en: "Eggs have been unfairly blamed for decades — they're a whole food with zero processing and great nutrition" },
  { keywords: ["plain yogurt"], sv: "Naturell yoghurt är bara mjölk och kulturer — det är de smaksatta versionerna som är fulla av socker och tillsatser", en: "Plain yogurt is just milk and cultures — it's the flavoured versions that are full of sugar and additives" },
  { keywords: ["dark chocolate"], sv: "Mörk choklad 70%+ är mycket mindre bearbetad än mjölkchoklad — och innehåller faktiskt riktiga kakaofördelar", en: "Dark chocolate 70%+ is much less processed than milk chocolate — and actually contains real cacao benefits" },
  { keywords: ["cheese", "ost"], sv: "Äkta lagrad ost har en förvånansvärt kort ingredienslista — mjölk, kulturer, löpe, salt. Det är allt", en: "Real aged cheese has a surprisingly short ingredient list — milk, cultures, rennet, salt. That's it" },
  { keywords: ["creme fraiche", "crème fraiche"], sv: "Crème fraiche är bara grädde med kulturer tillagda — knappt bearbetad och helt okej i matlagning", en: "Crème fraiche is just cream with cultures added — barely processed and totally fine in cooking" },
  { keywords: ["avocado"], sv: "Avokado är ren helfoder — fettet är nyttigt och inget är tillsatt", en: "Avocados are pure whole food — the fat is healthy and there's nothing added whatsoever" },
  { keywords: ["honey"], sv: "Honung är minimalt bearbetad — den går från bikupan till burken med väldigt lite gjort", en: "Honey is minimally processed — it goes from hive to jar with very little done to it" },
  { keywords: ["coconut oil"], sv: "Kokosolja är en basingrediiens — inga tillsatser, bara pressad kokos", en: "Coconut oil is a basic culinary ingredient — no additives, just pressed coconut" },
  { keywords: ["filmjolk", "filmjölk"], sv: "Filmjölk är fermenterad mjölk med en väldigt kort ingredienslista — en av Sveriges renaste mejeristaplar", en: "Filmjölk is fermented milk with a very short ingredient list — one of Sweden's cleanest dairy staples" },
  { keywords: ["kvarg", "skyr"], sv: "Kvarg och skyr är bara silad mjölk — trots att de ser ut som bearbetade produkter är de väldigt rena", en: "Kvarg and skyr are just strained milk — despite looking like a processed product, they're very clean" },
  { keywords: ["knackebrod", "knäckebröd", "crispbread"], sv: "Vanlig knäckebröd är ofta bara råg, vatten och salt — ett av de renaste brödval du kan köpa", en: "Plain knäckebröd is often just rye, water and salt — one of the cleanest bread options you can buy" },
  { keywords: ["canned tomatoes"], sv: "Krossade tomater är bara tomater — knappt förändrade från färska, och ibland mer näringsrika", en: "Canned tomatoes are just tomatoes — barely changed from fresh, and sometimes more nutritious" },
  { keywords: ["frozen vegetables", "frozen veg"], sv: "Frysta grönsaker fryses ofta direkt efter skörd — de kan vara lika näringsrika som färska", en: "Frozen vegetables are often frozen straight after harvest — they can be just as nutritious as fresh" },
  { keywords: ["sardines"], sv: "Sardiner i olivolja är bara fisk och olja — konserv betyder inte bearbetat här", en: "Sardines in olive oil are just fish and oil — canned doesn't mean processed here" },
  { keywords: ["full fat milk"], sv: "Helmjölk är bara mjölk — mindre bearbetad än lättmjölk som har saker borttagna och tillagda", en: "Full fat milk is just milk — less processed than low fat versions which have things removed and added back" },
  { keywords: ["almonds", "plain nuts"], sv: "Vanliga nötter är helfoder — det är bara när de är smaksatta eller rostade i olja som bearbetning sker", en: "Plain nuts are a whole food — it's only when they're flavoured or roasted in oil that processing kicks in" },
  { keywords: ["tofu"], sv: "Tofu ser industriellt ut men är bara pressad sojamjölk — en förvånansvärt ren ingrediens", en: "Tofu looks industrial but it's just compressed soya milk — a surprisingly clean ingredient" },
  { keywords: ["herring", "sill"], sv: "Sill är ett av Sveriges renaste proteinkällor — vanlig eller inlagd i enkel lag är nivå 1-2", en: "Herring is one of Sweden's cleanest protein sources — plain or pickled in basic brine is level 1-2" },
  { keywords: ["canned chickpeas", "chickpeas"], sv: "Konserverade kikärtor är bara kikärtor och vatten — konserv betyder inte alltid bearbetat", en: "Canned chickpeas are just chickpeas and water — canned doesn't always mean processed" },
  { keywords: ["plain popcorn", "popcorn"], sv: "Vanlig popcorn är ett fullkorn — det är de smaksatta färdigförpackade versionerna som är ultraprocessade", en: "Plain air-popped popcorn is a whole grain — it's the flavoured bagged versions that are ultra processed" },
  { keywords: ["dark rye bread", "rye bread"], sv: "Mörkt rågbröd är mycket mindre bearbetat än vitt bröd — leta efter versioner med bara råg, vatten och salt", en: "Dark rye bread is much less processed than white bread — look for versions with just rye, water and salt" },
  { keywords: ["flavoured yogurt", "flavored yogurt"], sv: "Smaksatt yoghurt är ofta närmre dessert än hälsomat — full av socker, smakämnen och förtjockningsmedel", en: "Flavoured yogurts are often closer to dessert than health food — full of sugar, flavourings and thickeners" },
  { keywords: ["fruit juice"], sv: "Fruktjuice tar bort allt fiber och tillsätter ofta socker — att äta hela frukten är alltid bättre", en: "Fruit juice strips out all the fibre and often adds sugar — eating the whole fruit is always better" },
  { keywords: ["breakfast cereal"], sv: "De flesta frukostflingor är kraftigt bearbetade — även de som säger 'fullkorn' på förpackningen", en: "Most breakfast cereals are highly processed — even the ones that say 'whole grain' on the box" },
  { keywords: ["protein bar"], sv: "Proteinbars har ofta lika lång ingredienslista som en chokladkaka — proteinet väger inte upp för resten", en: "Protein bars often have ingredient lists as long as a chocolate bar — the protein doesn't make up for the rest" },
  { keywords: ["rice cakes"], sv: "Riskex är kraftigt bearbetade och ger snabb blodsockerstegring — de är inte den dietmat folk tror de är", en: "Rice cakes are highly processed and spike blood sugar fast — they're not the diet food people think they are" },
  { keywords: ["oat milk"], sv: "Havremjölk har tillsatta oljor, stabilisatorer och ofta socker — vanliga havregryn är nivå 1, havremjölk är nivå 3", en: "Oat milk has added oils, stabilisers and often sugar — plain oats are level 1, oat milk is level 3" },
  { keywords: ["low fat"], sv: "Lättversioner byter vanligtvis ut fett mot socker och tillsatser — fullfetversionerna är ofta renare", en: "Low fat products usually replace fat with sugar and additives — full fat versions are often cleaner" },
  { keywords: ["deli turkey", "deli chicken"], sv: "Charkuterikött är kraftigt bearbetat — det som ser ut som vanlig kyckling innehåller ofta natriumnitrit och fyllmedel", en: "Deli meats are heavily processed — what looks like plain chicken often contains sodium nitrite and fillers" },
  { keywords: ["veggie burger"], sv: "De flesta vegoburgare är lika bearbetade som köttburgare — ibland mer, med långa tillsatslistor", en: "Most veggie burgers are just as processed as meat burgers — sometimes more, with long additive lists" },
  { keywords: ["flavoured nuts"], sv: "Smaksatta nötter är väldigt annorlunda mot vanliga — beläggningar och kryddor tar dem till nivå 3-4", en: "Flavoured nuts are very different from plain ones — coatings and seasonings push them to level 3-4" },
  { keywords: ["instant oats"], sv: "Vanliga havregryn är ett av de bästa livsmedel du kan äta — men smaksatta snabbhavrepaket är nivå 3 bearbetade", en: "Plain oats are one of the best foods you can eat — but flavoured instant packets are level 3 processed" },
  { keywords: ["coleslaw"], sv: "Färdigköpt coleslaw ser ut som bara kål men är full av konserveringsmedel, socker och stabilisatorer", en: "Packaged coleslaw looks like just cabbage but is full of preservatives, sugar and stabilisers" },
  { keywords: ["bottled smoothie", "smoothie"], sv: "Flasksmoothies är pastöriserade och har ofta tillsatt socker — en hel frukt är alltid bättre", en: "Bottled smoothies are pasteurised and often have added sugars — a whole piece of fruit is always better" },
  { keywords: ["granola"], sv: "Granola är ofta ett av de sockertätaste frukostalternativen — ibland värre än cornflakes", en: "Granola is often one of the most sugar-dense breakfast options — sometimes worse than cornflakes" },
  { keywords: ["actimel", "yogurt drink", "probiotic drink"], sv: "Probiotiska yoghurtdrycker är kraftigt bearbetade och höga i socker — vanlig yoghurt har samma fördelar", en: "Probiotic yogurt drinks are heavily processed and high in sugar — plain yogurt has the same benefits" },
];

function getFunFact(food: string, lang: Lang): string | null {
  const normalized = normalizeText(food);
  for (const entry of funFacts) {
    if (entry.keywords.some((k) => {
      const kn = normalizeText(k);
      const regex = new RegExp(`(^|\\s)${kn}s?(\\s|$)`);
      return regex.test(normalized);
    })) {
      return lang === "en" ? entry.en : entry.sv;
    }
  }
  return null;
}

function buildResult(food: string, lang: Lang, offProduct?: AnalyzeRequest["offProduct"]): AnalyzeResult {
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
      betterChoice: null,
      estimated: false,
      source: "estimated",
      verdictLabel: "",
      verdictDescription: "",
      funFact: null,
      notFound: true,
    };
  }

  const { level, estimated } = estimateLevel(food, offProduct);
  const brandFields = buildBrandFields(food, offProduct);

  const ingredients = translateIngredients(offProduct?.ingredients_text?.trim() || null);
  const additives = (offProduct?.additives_tags ?? []).map((t) => t.replace(/^en:/i, "").toUpperCase());

  let harmfulIngredients: string[] | null = null;
  if (level >= 3) {
    // Try real OFF data first
    const text = normalizeText(`${ingredients ?? ""} ${additives.join(" ")}`);
    const found = riskyMarkers.filter((m) => text.includes(m));

    if (found.length > 0) {
      harmfulIngredients = found.map(formatReasonItem).slice(0, 3);
    } else {
      // Fall back to category-based structured list
      const structured = getStructuredAdditives(food);
      if (structured.length > 0) {
        harmfulIngredients = structured;
      } else {
        // Always show something for level 3-4 even if we don't know the specific food
        if (level === 4) {
          harmfulIngredients = ["Industrial emulsifiers", "Artificial preservatives", "Flavour enhancers"];
        } else {
          harmfulIngredients = ["Added preservatives", "Stabilisers", "Modified ingredients"];
        }
      }
    }
  }

  return {
    level,
    levelName: levelNamesMap[lang][level],
    verdict: getVerdict(level, lang),
    brand: brandFields.brand,
    brandSuggested: brandFields.brandSuggested,
    suggestedBrands: brandFields.suggestedBrands,
    ingredients: level === 1 ? null : ingredients,
    harmfulIngredients,
    betterChoice: getBetterChoice(food, level, lang),
    estimated,
    source: offProduct ? "openfoodfacts" : "estimated",
    verdictLabel: getVerdictLabel(level, lang),
    verdictDescription: getVerdictDescription(food, level, lang),
    funFact: getFunFact(food, lang),
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

    const lang: Lang = body.lang === "en" ? "en" : "sv";
    const result = buildResult(food, lang, body.offProduct ?? null);
    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    console.error("Analyze error:", err);
    return NextResponse.json({ error: "Failed to analyze food. Please try again." }, { status: 500 });
  }
}
