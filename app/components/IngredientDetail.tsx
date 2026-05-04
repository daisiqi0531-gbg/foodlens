"use client";

const shortDescriptions: Record<string, string> = {
  "sodium nitrite": "a preservative in cured meats — linked to cancer risk at high consumption",
  "e250": "a preservative in cured meats — linked to cancer risk at high consumption",
  "e471": "an emulsifier — a strong signal of ultra processed food",
  "e471 (emulsifier)": "an emulsifier — a strong signal of ultra processed food",
  "e450": "raises water retention in processed meats — linked to kidney stress",
  "e450 (phosphates)": "raises water retention in processed meats — linked to kidney stress",
  "e621": "a flavour enhancer that makes savoury foods taste more intense",
  "e621 (msg)": "a flavour enhancer that makes savoury foods taste more intense",
  "palm oil": "cheap vegetable fat — major environmental concern",
  "modified starch": "chemically altered starch — thickens sauces industrially",
  "glucose syrup": "liquid sugar that spikes blood sugar faster than table sugar",
  "artificial flavourings": "chemically synthesised — a clear sign of ultra processing",
  "artificial colours": "synthetic dyes — some linked to hyperactivity in children",
  "e330 (citric acid)": "the acid in lemons — very common and generally harmless",
  "e330": "the acid in lemons — very common and generally harmless",
  "e407 (carrageenan)": "a controversial thickener linked to gut inflammation",
  "e407": "a controversial thickener linked to gut inflammation",
  "e476 (emulsifier)": "an emulsifier used to replace cocoa butter in cheap chocolate",
  "e476": "an emulsifier used to replace cocoa butter in cheap chocolate",
  "calcium propionate": "an anti-mould agent — why supermarket bread lasts weeks",
  "hydrogenated fat": "industrial trans fats — strongly linked to heart disease",
  "maltodextrin": "a starch powder that spikes blood sugar faster than table sugar",
  "sucralose": "an artificial sweetener that may affect gut bacteria",
  "yeast extract": "concentrated yeast flavour — very high in sodium",
  "starch fillers": "used to bulk out processed meat products industrially",
  "flavour enhancers": "industrial compounds that intensify taste artificially",
  "industrial emulsifiers": "synthetic compounds that bind ingredients together industrially",
  "artificial preservatives": "chemicals added to extend shelf life beyond natural limits",
  "added preservatives": "chemicals that prevent spoilage beyond simple home cooking methods",
  "stabilisers": "additives that maintain texture and prevent separation in processed foods",
  "modified ingredients": "ingredients altered from their natural state for industrial use",
};

interface IngredientBulletsProps {
  items: string[];
}

export function IngredientBullets({ items }: IngredientBulletsProps) {
  if (!items || items.length === 0) return null;

  return (
    <ul className="space-y-1.5">
      {items.slice(0, 3).map((item) => {
        const key = item.toLowerCase().trim();
        const description = shortDescriptions[key] ?? "an industrial food additive";
        return (
          <li
            key={item}
            className="flex items-start gap-2 text-xs leading-relaxed"
          >
            <span className="mt-0.5 text-gray-400 dark:text-gray-500 flex-shrink-0">
              •
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {item}
              </span>
              {" — "}
              {description}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
