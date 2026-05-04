"use client";
import { IngredientBullets } from "./IngredientBullets";

export interface AnalyzeResult {
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
  verdictLabel: string;
  verdictDescription: string;
  funFact: string | null;
  notFound: boolean;
}

interface ResultCardProps {
  result: AnalyzeResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const verdictEmoji =
    result.level === 1 ? "🌱" : result.level === 2 ? "😊" : result.level === 3 ? "🤔" : "🫣";

  const levelBg =
    result.level === 1
      ? "bg-green-50 dark:bg-green-950/50"
      : result.level === 2
        ? "bg-lime-50 dark:bg-lime-950/50"
        : result.level === 3
          ? "bg-orange-50 dark:bg-orange-950/50"
          : "bg-red-50 dark:bg-red-950/50";

  const levelText =
    result.level === 1
      ? "text-green-600 dark:text-green-400"
      : result.level === 2
        ? "text-lime-600 dark:text-lime-400"
        : result.level === 3
          ? "text-orange-600 dark:text-orange-400"
          : "text-red-600 dark:text-red-400";

  if (result.notFound) {
    return (
      <div className="max-w-md mx-auto mt-4 p-6 md:p-8 bg-white dark:bg-gray-900/80 rounded-xl shadow-lg border border-transparent dark:border-gray-700 text-center">
        <p className="text-4xl mb-4">🥦🤷🫙</p>
        <p className="text-base font-medium text-gray-700 dark:text-gray-200 mb-2">
          We couldn't find that one
        </p>
        <p className="text-sm text-gray-400 leading-relaxed">
          Try a food name like "oatly", "banana" or "cornflakes" — the more specific the better.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-4 p-4 md:p-6 bg-white dark:bg-gray-900/80 rounded-xl shadow-lg border border-transparent dark:border-gray-700">
      {/* Combined Verdict + NOVA block */}
      <div className={`mb-4 rounded-xl p-4 ${levelBg}`}>
        {/* Verdict — prominent at top */}
        <p className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          <span className="mr-2">{verdictEmoji}</span>
          {result.verdictLabel}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {result.verdictDescription}
        </p>

        {result.funFact && (
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 leading-relaxed italic">
            💡 {result.funFact}
          </p>
        )}

        {/* Divider */}
        <div className="border-t border-black/10 dark:border-white/10 mb-3" />

        {/* Process level — supporting detail below */}
        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
          Process level
        </p>
        <div className="flex items-center gap-2">
          <span className={`text-3xl font-bold leading-none ${levelText}`}>
            {result.level}
          </span>
          <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {result.levelName}
          </span>
        </div>
      </div>

      {/* Brand Section (conditional) */}
      {(result.brand !== null || result.brandSuggested) && (
        <div className="mt-3">
          {!result.brandSuggested && (
            <>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Brand</p>
              <p className="mt-1 text-gray-800 dark:text-gray-100">{result.brand}</p>
            </>
          )}
          {result.brandSuggested && (
            <div className="mt-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Common brands in Sweden:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(result.suggestedBrands ?? []).map((brand) => (
                  <span
                    key={brand}
                    className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-100 dark:border dark:border-gray-600"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ingredients Section */}
      {result.level >= 2 && result.ingredients && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Ingredients</p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">{result.ingredients}</p>

          {result.level >= 3 && result.harmfulIngredients && result.harmfulIngredients.length > 0 && (
            <p className="mt-2 text-sm font-medium text-amber-700 dark:text-amber-200">
              ⚠️ Potentially harmful: {result.harmfulIngredients.join(", ")}
            </p>
          )}
        </div>
      )}

      {/* Reason Section */}
      {result.level >= 3 && result.reason && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">Why?</p>
          <IngredientBullets text={result.reason ?? ""} />
          <a
            href="/ingredients"
            className="mt-2 inline-block text-xs text-gray-400 underline hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Understand these ingredients →
          </a>
        </div>
      )}

      {/* Better Choice Section */}
      {result.level >= 3 && result.betterChoice && (
        <div className="mt-4 rounded-lg bg-green-50 p-3 dark:bg-green-800/30">
          <p className="text-sm text-gray-800 dark:text-gray-100">💚 Better choice: {result.betterChoice.text}</p>
          <div
            id="ad-slot-better-choice"
            className="mt-3 rounded border border-dashed border-gray-200 p-2 text-center dark:border-gray-700/50"
          >
            <p className="text-xs text-gray-300 dark:text-gray-600">Sponsored</p>
          </div>
        </div>
      )}

      {/* Footer Note (always show) */}
      <div className="mt-4 space-y-1 border-t border-gray-200 pt-3 text-xs text-gray-500 dark:border-gray-600 dark:text-gray-200">
        {result.estimated ? (
          <p>📊 Based on how this type of food is typically made - good to check the label too</p>
        ) : (
          <p>✓ Data sourced from OpenFoodFacts</p>
        )}
      </div>
    </div>
  );
}
