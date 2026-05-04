"use client";

interface IngredientBulletsProps {
  text: string;
}

// Short one-line descriptions for quick display
const shortDescriptions: Record<string, string> = {
  "e100": "a natural yellow colouring from turmeric",
  "e150": "a brown colouring made by heating sugar",
  "e200": "a preservative that stops mould",
  "e202": "a mild preservative that stops mould and yeast",
  "e210": "a preservative in soft drinks",
  "e220": "a preservative in wine and dried fruit",
  "e250": "a preservative in cured meats — linked to cancer risk at high consumption",
  "e300": "just vitamin C — one of the safest additives",
  "e322": "an emulsifier from soy or eggs",
  "e330": "the acid in lemons — very common and generally harmless",
  "e407": "a controversial thickener linked to gut inflammation",
  "e450": "raises water retention in processed meats, linked to kidney stress",
  "e471": "an emulsifier — a strong signal of ultra processed food",
  "e476": "an emulsifier used to replace cocoa butter in cheap chocolate",
  "e621": "a flavour enhancer that makes savoury foods taste more intense",
  "glucose-syrup": "liquid sugar that spikes blood sugar faster than table sugar",
  "hfcs": "an industrial sweetener linked to obesity and metabolic issues",
  "aspartame": "an artificial sweetener — WHO classified as possibly carcinogenic",
  "sucralose": "an artificial sweetener that may affect gut bacteria",
  "maltodextrin": "a starch powder that spikes blood sugar faster than table sugar",
  "stevia": "a natural plant-based sweetener — one of the cleaner alternatives",
  "sodium-nitrite": "a preservative in cured meats — linked to cancer risk",
  "bha-bht": "synthetic antioxidants — banned in some countries",
  "calcium-propionate": "an anti-mould agent — why supermarket bread lasts weeks",
  "sulphites": "preservatives that can trigger reactions in sensitive people",
  "palm-oil": "cheap vegetable fat — major environmental concern",
  "hydrogenated-fat": "industrial trans fats — strongly linked to heart disease",
  "interesterified-fat": "a trans fat replacement — newer, less studied",
  "natural-flavours": "sounds wholesome but can mean almost anything",
  "artificial-flavours": "chemically synthesised — a clear sign of ultra processing",
  "yeast-extract": "concentrated yeast flavour — very high in sodium",
  "hydrolysed-protein": "a cheap flavour enhancer that contains natural MSG",
  "modified-starch": "chemically altered starch — thickens sauces industrially",
  "xanthan-gum": "a thickener made by fermenting sugar",
  "guar-gum": "a natural thickener from guar beans",
  "pectin": "natural gelling agent from fruit peel — used in homemade jam too",
  "cellulose": "plant fibre used as a filler — sometimes from wood pulp",
  "acesulfame-k": "a very common artificial sweetener",
  "sorbitol": "a sugar alcohol that can cause digestive issues",
  "rapeseed-oil": "a common cooking oil — one of the cleaner vegetable oils",
  "locust-bean-gum": "a natural thickener from carob seeds",
};

// Keywords to detect in text, mapped to ingredient ids
const detectionKeywords: Array<{
  keywords: string[];
  id: string;
  displayName: string;
}> = [
  { keywords: ["sodium nitrite"], id: "e250", displayName: "Sodium nitrite" },
  { keywords: ["e250"], id: "e250", displayName: "E250" },
  { keywords: ["e471"], id: "e471", displayName: "E471" },
  { keywords: ["e450", "phosphate", "phosphates", "diphosphate"], id: "e450", displayName: "E450 (phosphates)" },
  { keywords: ["e621", "msg", "monosodium glutamate"], id: "e621", displayName: "E621 (MSG)" },
  { keywords: ["palm oil"], id: "palm-oil", displayName: "Palm oil" },
  { keywords: ["modified starch"], id: "modified-starch", displayName: "Modified starch" },
  { keywords: ["glucose syrup"], id: "glucose-syrup", displayName: "Glucose syrup" },
  { keywords: ["artificial flavour", "artificial flavoring", "artificial flavouring"], id: "artificial-flavours", displayName: "Artificial flavourings" },
  { keywords: ["natural flavour", "natural flavoring", "natural flavouring"], id: "natural-flavours", displayName: "Natural flavourings" },
  { keywords: ["e330", "citric acid"], id: "e330", displayName: "E330 (citric acid)" },
  { keywords: ["e407", "carrageenan"], id: "e407", displayName: "E407 (carrageenan)" },
  { keywords: ["e322", "lecithin"], id: "e322", displayName: "E322 (lecithin)" },
  { keywords: ["calcium propionate", "e282"], id: "calcium-propionate", displayName: "Calcium propionate" },
  { keywords: ["hydrogenated fat", "trans fat"], id: "hydrogenated-fat", displayName: "Hydrogenated fat" },
  { keywords: ["maltodextrin"], id: "maltodextrin", displayName: "Maltodextrin" },
  { keywords: ["yeast extract"], id: "yeast-extract", displayName: "Yeast extract" },
  { keywords: ["e476"], id: "e476", displayName: "E476" },
  { keywords: ["e200", "sorbic acid"], id: "e200", displayName: "Sorbic acid" },
  { keywords: ["sulphite", "sulfite", "e220"], id: "sulphites", displayName: "Sulphites" },
  { keywords: ["bha", "bht"], id: "bha-bht", displayName: "BHA/BHT" },
  { keywords: ["xanthan gum"], id: "xanthan-gum", displayName: "Xanthan gum" },
  { keywords: ["aspartame"], id: "aspartame", displayName: "Aspartame" },
  { keywords: ["sucralose"], id: "sucralose", displayName: "Sucralose" },
];

export function IngredientBullets({ text }: IngredientBulletsProps) {
  const normalizedText = text.toLowerCase();

  const detected: Array<{ displayName: string; description: string }> = [];
  const seenIds = new Set<string>();

  for (const entry of detectionKeywords) {
    if (seenIds.has(entry.id)) continue;
    const found = entry.keywords.some((k) =>
      normalizedText.includes(k.toLowerCase())
    );
    if (found) {
      seenIds.add(entry.id);
      const description = shortDescriptions[entry.id] ?? "an industrial food additive";
      detected.push({ displayName: entry.displayName, description });
    }
    if (detected.length >= 3) break;
  }

  if (detected.length === 0) return null;

  return (
    <ul className="mt-2 space-y-1">
      {detected.map((item) => (
        <li
          key={item.displayName}
          className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          <span className="mt-0.5 text-gray-400 dark:text-gray-500 flex-shrink-0">•</span>
          <span>
            <span className="font-medium text-gray-700 dark:text-gray-200">
              {item.displayName}
            </span>
            {" — "}
            {item.description}
          </span>
        </li>
      ))}
    </ul>
  );
}
