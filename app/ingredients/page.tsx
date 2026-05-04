"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ingredients, type Ingredient } from "../../data/ingredients";

const categoryLabels: Record<string, string> = {
  all: "All",
  "e-numbers": "E-numbers",
  preservatives: "Preservatives",
  sweeteners: "Sweeteners",
  fats: "Fats & Oils",
  thickeners: "Thickeners & Stabilisers",
  flavour: "Flavour",
  marketing: "Marketing terms",
};

const novaLabel: Record<number, string> = {
  1: "🌱 Level 1",
  2: "😊 Level 2",
  3: "🤔 Level 3",
  4: "🫣 Level 4",
};

const novaBg: Record<number, string> = {
  1: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  2: "bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300",
  3: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  4: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

export default function IngredientsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Ingredient | null>(null);

  const filtered = useMemo(() => {
    return ingredients.filter((i) => {
      const matchesSearch =
        search.length < 2 ||
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.fullName.toLowerCase().includes(search.toLowerCase()) ||
        i.summary.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || i.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 pt-8 pb-16 font-sans">
      {/* Header */}
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-sm text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors mb-6 inline-block"
        >
          ← Back to FoodLens
        </Link>

        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
          What's in your food?
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-200 mb-6 leading-relaxed">
          Common food ingredients explained in plain English — what they are, why they're used, and whether to worry.
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search an ingredient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 text-base mb-4"
        />

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === key
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {category === "marketing" && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
            These aren't ingredients — they're claims on packaging that are often misunderstood.
          </p>
        )}

        {/* Count */}
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
          {filtered.length} ingredient{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Grid — 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((ingredient) => (
            <button
              key={ingredient.id}
              onClick={() => setSelected(ingredient)}
              className="text-left bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-semibold text-gray-900 dark:text-white text-base">
                  {ingredient.name}
                </span>
                {ingredient.category !== "marketing" && (
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${novaBg[ingredient.novaSignal]}`}>
                    {novaLabel[ingredient.novaSignal]}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-200 leading-relaxed">
                {ingredient.fullName !== ingredient.name && (
                  <span className="block text-gray-500 dark:text-gray-300 mb-1 italic">
                    {ingredient.fullName}
                  </span>
                )}
                {ingredient.summary}
              </p>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl mb-3">🔍</p>
            <p className="text-sm text-gray-400">
              No ingredients found — try a different search
            </p>
          </div>
        )}
      </div>

      {/* Detail overlay */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-t-2xl md:rounded-2xl p-6 shadow-xl z-10 max-h-[85vh] overflow-y-auto"
            style={{ animation: "slideIn 0.3s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>

            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selected.name}
                </h2>
                {selected.fullName !== selected.name && (
                  <p className="text-sm text-gray-400 italic">{selected.fullName}</p>
                )}
              </div>
              {selected.category !== "marketing" && (
                <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${novaBg[selected.novaSignal]}`}>
                  {novaLabel[selected.novaSignal]}
                </span>
              )}
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">What it is</p>
                <p className="text-gray-600 dark:text-gray-100 leading-relaxed">{selected.whatItIs}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Why it's used</p>
                <p className="text-gray-600 dark:text-gray-100 leading-relaxed">{selected.whyUsed}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Should I worry?</p>
                <p className="text-gray-600 dark:text-gray-100 leading-relaxed">{selected.shouldWorry}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Commonly found in</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selected.foundIn.map((item) => (
                    <span
                      key={item}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white px-2 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
