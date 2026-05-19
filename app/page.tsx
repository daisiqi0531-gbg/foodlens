"use client";
import { useEffect, useState, useRef } from "react";
import { ResultCard, type AnalyzeResult } from "./components/ResultCard";
import { useLang } from "./contexts/LanguageContext";
import { UI } from "./i18n/translations";

const didYouKnowData = {
  better: [
    { emoji: "🧈", food: "Butter", query: "butter", surprise: { sv: "Folk tror att det är dåligt", en: "People think it's bad" }, label: { sv: "😊 Nivå 2 — Vardagsmat", en: "😊 Level 2 — Everyday food" } },
    { emoji: "🥚", food: "Eggs", query: "eggs", surprise: { sv: "Oroa sig för kolesterol", en: "People worry about cholesterol" }, label: { sv: "🌱 Nivå 1 — Så rent som det blir", en: "🌱 Level 1 — As clean as it gets" } },
    { emoji: "🫙", food: "Plain yogurt", query: "plain yogurt", surprise: { sv: "Verkar som en bearbetad produkt", en: "Seems like a processed product" }, label: { sv: "😊 Nivå 2 — Vardagsmat", en: "😊 Level 2 — Everyday food" } },
    { emoji: "🧀", food: "Real cheese", query: "cheese", surprise: { sv: "Verkar ohälsosamt", en: "Seems unhealthy" }, label: { sv: "🤔 Nivå 3 — Ibland", en: "🤔 Level 3 — Now and then" } },
    { emoji: "🥑", food: "Avocado", query: "avocado", surprise: { sv: "Folk tror att det är för fett", en: "People think it's too fatty" }, label: { sv: "🌱 Nivå 1 — Så rent som det blir", en: "🌱 Level 1 — As clean as it gets" } },
    { emoji: "🍫", food: "Dark chocolate", query: "dark chocolate", surprise: { sv: "Choklad måste vara dåligt", en: "Chocolate must be bad" }, label: { sv: "🤔 Nivå 3 — Ibland", en: "🤔 Level 3 — Now and then" } },
    { emoji: "🥛", food: "Filmjölk", query: "filmjolk", surprise: { sv: "Mejeriprodukter får dåligt rykte", en: "Dairy gets a bad rep" }, label: { sv: "😊 Nivå 2 — Vardagsmat", en: "😊 Level 2 — Everyday food" } },
    { emoji: "🍯", food: "Honey", query: "honey", surprise: { sv: "Det är i princip socker", en: "It's basically sugar" }, label: { sv: "😊 Nivå 2 — Vardagsmat", en: "😊 Level 2 — Everyday food" } },
    { emoji: "🐟", food: "Sardines", query: "sardines", surprise: { sv: "Konservfisk verkar bearbetad", en: "Canned fish seems processed" }, label: { sv: "😊 Nivå 2 — Vardagsmat", en: "😊 Level 2 — Everyday food" } },
    { emoji: "🥦", food: "Frozen veg", query: "frozen vegetables", surprise: { sv: "Färskt är alltid bättre, eller?", en: "Fresh is always better, right?" }, label: { sv: "😊 Nivå 2 — Vardagsmat", en: "😊 Level 2 — Everyday food" } },
    { emoji: "🥒", food: "Kimchi", query: "kimchi", surprise: { sv: "Fermenterad mat verkar bearbetad", en: "Fermented food seems processed" }, label: { sv: "😊 Nivå 2 — Vardagsmat", en: "😊 Level 2 — Everyday food" } },
    { emoji: "🍜", food: "Miso paste", query: "miso paste", surprise: { sv: "Ser ut som en bearbetad produkt", en: "Looks like a processed product" }, label: { sv: "😊 Nivå 2 — Vardagsmat", en: "😊 Level 2 — Everyday food" } },
    { emoji: "🥥", food: "Coconut milk", query: "coconut milk", surprise: { sv: "Verkar som en bearbetad dryck", en: "Seems like a processed drink" }, label: { sv: "😊 Nivå 2 — Vardagsmat", en: "😊 Level 2 — Everyday food" } },
    { emoji: "🐟", food: "Fish sauce", query: "fish sauce", surprise: { sv: "Luktar intensivt, måste vara bearbetat", en: "Smells intense, must be processed" }, label: { sv: "😊 Nivå 2 — Vardagsmat", en: "😊 Level 2 — Everyday food" } },
    { emoji: "🍚", food: "Tapai", query: "tapai", surprise: { sv: "Fermenterat låter bearbetat", en: "Fermented food sounds processed" }, label: { sv: "😊 Nivå 2 — Vardagsmat", en: "😊 Level 2 — Everyday food" } },
  ],
  worse: [
    { emoji: "🍓", food: "Flavoured yogurt", query: "flavoured yogurt", surprise: { sv: "Det är yoghurt, det är hälsosamt", en: "It's yogurt, it's healthy" }, label: { sv: "🫣 Nivå 4 — En njutning", en: "🫣 Level 4 — A treat" } },
    { emoji: "🧃", food: "Fruit juice", query: "fruit juice", surprise: { sv: "Det är bara frukt", en: "It's just fruit" }, label: { sv: "🫣 Nivå 4 — En njutning", en: "🫣 Level 4 — A treat" } },
    { emoji: "🥣", food: "Granola", query: "granola", surprise: { sv: "Hälsosamt frukostval", en: "Healthy breakfast choice" }, label: { sv: "🤔 Nivå 3 — Ibland", en: "🤔 Level 3 — Now and then" } },
    { emoji: "💪", food: "Protein bar", query: "protein bar", surprise: { sv: "Högt protein = hälsosamt", en: "High protein = healthy" }, label: { sv: "🫣 Nivå 4 — En njutning", en: "🫣 Level 4 — A treat" } },
    { emoji: "🥛", food: "Oat milk", query: "oat milk", surprise: { sv: "Växtbaserat = bra", en: "Plant-based = good" }, label: { sv: "🤔 Nivå 3 — Ibland", en: "🤔 Level 3 — Now and then" } },
    { emoji: "🦃", food: "Deli turkey", query: "deli turkey", surprise: { sv: "Det är bara kyckling", en: "It's just chicken" }, label: { sv: "🫣 Nivå 4 — En njutning", en: "🫣 Level 4 — A treat" } },
    { emoji: "🌱", food: "Veggie burger", query: "veggie burger", surprise: { sv: "Växtbaserat = hälsosamt", en: "Plant-based = healthy" }, label: { sv: "🫣 Nivå 4 — En njutning", en: "🫣 Level 4 — A treat" } },
    { emoji: "🎑", food: "Rice cakes", query: "rice cakes", surprise: { sv: "Lätt dietmat", en: "Light diet food" }, label: { sv: "🤔 Nivå 3 — Ibland", en: "🤔 Level 3 — Now and then" } },
    { emoji: "🥤", food: "Smoothie (bottled)", query: "bottled smoothie", surprise: { sv: "Det är bara frukt", en: "It's just fruit" }, label: { sv: "🤔 Nivå 3 — Ibland", en: "🤔 Level 3 — Now and then" } },
    { emoji: "🥜", food: "Flavoured nuts", query: "flavoured nuts", surprise: { sv: "Nötter är hälsosamma", en: "Nuts are healthy" }, label: { sv: "🤔 Nivå 3 — Ibland", en: "🤔 Level 3 — Now and then" } },
    { emoji: "🍜", food: "Instant ramen", query: "instant ramen", surprise: { sv: "Det är bara nudlar, eller?", en: "It's just noodles, right?" }, label: { sv: "🫣 Nivå 4 — En njutning", en: "🫣 Level 4 — A treat" } },
    { emoji: "🍱", food: "Teriyaki sauce", query: "teriyaki sauce", surprise: { sv: "Bara ett enkelt glasyr", en: "Just a simple glaze" }, label: { sv: "🫣 Nivå 4 — En njutning", en: "🫣 Level 4 — A treat" } },
    { emoji: "🥟", food: "Frozen dumplings", query: "frozen dumpling", surprise: { sv: "Bara kött och deg", en: "Just meat and dough" }, label: { sv: "🫣 Nivå 4 — En njutning", en: "🫣 Level 4 — A treat" } },
  ]
};

function pickRandom<T>(arr: T[], count: number): T[] {
  return [...arr]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

const LogoSpinner = ({ size = 24 }: { size?: number }) => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [nextFrame, setNextFrame] = useState(2);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % 4;
      const current = index + 1;
      const next = (index + 1) % 4 + 1;

      setFading(true);

      setTimeout(() => {
        setCurrentFrame(current);
        setNextFrame(next);
        setFading(false);
      }, 400);

    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: "relative",
      width: `${size}px`,
      height: `${size}px`,
      flexShrink: 0,
      overflow: "hidden"
    }}>
      <img
        src={`/loading${currentFrame}.png`}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: `${size}px`,
          height: `${size}px`,
          maxWidth: `${size}px`,
          maxHeight: `${size}px`,
          objectFit: "contain",
          opacity: fading ? 0 : 1,
          transform: fading ? "scale(0.95)" : "scale(1)",
          transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      <img
        src={`/loading${nextFrame}.png`}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: `${size}px`,
          height: `${size}px`,
          maxWidth: `${size}px`,
          maxHeight: `${size}px`,
          objectFit: "contain",
          opacity: fading ? 1 : 0,
          transform: fading ? "scale(1)" : "scale(1.05)",
          transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
};

export default function Home() {
  const { lang } = useLang();
  const t = UI[lang];
  const [mounted, setMounted] = useState(false);
  const [food, setFood] = useState("");
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [showNovaInfo, setShowNovaInfo] = useState(false);
  const [didYouKnowTab, setDidYouKnowTab] = useState<"better" | "worse">("better");
  const [randomCards, setRandomCards] = useState<{
    better: typeof didYouKnowData.better;
    worse: typeof didYouKnowData.worse;
  }>({ better: [], worse: [] });
  const debounceRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setRandomCards({
      better: pickRandom(didYouKnowData.better, 3),
      worse: pickRandom(didYouKnowData.worse, 3),
    });
  }, [result]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const exampleChips = [
    { label: "🌱 Banana", query: "banana" },
    { label: "😊 Olive oil", query: "olive oil" },
    { label: "🤔 Cornflakes", query: "cornflakes" },
    { label: "🫣 Pepperoni", query: "pepperoni sausage" },
  ];

  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 2) {
      setSuggestionsLoading(false);
      setFiltered([]);
      return;
    }
    setSuggestionsLoading(true);
    try {
      const res = await fetch(
        `/api/suggestions?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setFiltered(data.suggestions?.slice(0, 5) ?? []);
    } catch {
      setFiltered([]);
    } finally {
      setSuggestionsLoading(false);
    }
  };

  // Search OpenFoodFacts via API route (to avoid CORS)
  const searchOFF = async (query: string) => {
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      const product = data.product || null;
      return product;
    } catch (err) {
      console.error("Search error:", err);
      return null;
    }
  };

  const analyzeFood = async (overrideFood?: string) => {
    const foodToAnalyze = (overrideFood ?? food).trim();
    if (!foodToAnalyze) {
        showToast(t.emptyToast);
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);
    setFiltered([]);

    try {
      let query = foodToAnalyze;
      let offProduct = null;

      // Check if input looks like ICA or Coop URL
      const icaMatch = foodToAnalyze.match(/https:\/\/handla\.ica\.se\/produkt\/(\d+)/);
      const coopMatch = foodToAnalyze.match(/https:\/\/www\.coop\.se\/produkt\/(\d+)/);

      if (icaMatch) {
        // Pass the full URL so brand can be detected
        const productId = icaMatch[1];
        query = `ICA product ID: ${productId} ${foodToAnalyze}`;
      } else if (coopMatch) {
        const productId = coopMatch[1];
        query = `Coop product ID: ${productId} ${foodToAnalyze}`;
      } else {
        // Search OpenFoodFacts directly from API
        offProduct = await searchOFF(foodToAnalyze);
      }

      // Call API with optional OFF product data
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ food: query, offProduct, lang }),
      });

      const data = await res.json();
      if (data.result) {
        setResult(data.result);
        if (data.result?.notFound) {
          setTimeout(() => {
            setFood("");
          }, 300);
        }
      } else {
        setResult(null);
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900" />;
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start px-4 pt-8 md:pt-16 font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    >
      {/* Header */}
      <div className="text-center mb-2 md:mb-4">
        <button
          onClick={() => {
            setFood("");
            setResult(null);
            setError(null);
            setFiltered([]);
          }}
          className="inline-flex items-center justify-center gap-2 mb-1 cursor-pointer hover:opacity-70 transition-opacity"
          aria-label="Go to home"
        >
          <img 
            src="/logo.svg" 
            alt="FoodLens logo" 
            className="h-7 w-7"
          />
          <h1 className="text-lg font-semibold tracking-tight">
            FoodLens
          </h1>
        </button>

        <p className="text-2xl md:text-3xl font-normal mb-1 leading-tight italic text-gray-700 dark:text-gray-100">{t.tagline}</p>
      </div>

      {/* Main content - grows to fill available space */}
      <div className="flex-1 w-full flex flex-col items-center">
        {/* Search Input */}
        <div className="w-full max-w-md mt-1 md:mt-2 relative">
          <div className="flex gap-[10px] relative">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={food}
                onChange={(e) => {
                  const value = e.target.value;
                  setFood(value);
                  setError(null);

                  if (debounceRef.current) {
                    clearTimeout(debounceRef.current);
                  }

                  debounceRef.current = setTimeout(() => {
                    fetchSuggestions(value);
                  }, 300);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && food.trim() && !loading) {
                    analyzeFood();
                  }
                }}
                className="w-full px-3 py-2 md:px-4 md:py-3 pr-10 text-base md:text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
              
              {/* Clear button */}
              {food && (
                <button
                  onClick={() => {
                    setFood("");
                    setFiltered([]);
                    setResult(null);
                    setError(null);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                  aria-label="Clear input"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Analyze Button */}
            <button
              onClick={() => analyzeFood()}
              suppressHydrationWarning
              className={`px-4 py-2 text-sm md:px-6 md:py-3 md:text-base font-medium rounded-lg text-white whitespace-nowrap transition-colors cursor-pointer ${
                loading
                  ? "bg-gray-400 dark:bg-gray-600 opacity-80"
                  : "bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200"
              }`}
            >
              {loading ? t.searching : t.analyzeBtn}
            </button>
          </div>

          {/* Autocomplete dropdown */}
          {(suggestionsLoading || filtered.length > 0) && (
            <div className="bg-white dark:bg-gray-800 mt-1 rounded-lg shadow-md overflow-hidden absolute left-0 right-0 z-10">
              {suggestionsLoading ? (
                <div className="px-4 py-2 text-gray-400 text-sm">{t.searching}</div>
              ) : (
                filtered.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setFood(item);
                      setFiltered([]);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 dark:text-gray-200"
                  >
                    {item}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Error */}
        {error && <p className="mt-3 text-sm text-center text-red-400">⚠️ {error}</p>}

        {/* Example chips */}
        {!result && !food.trim() && (
          <>
          <p className="text-xs text-gray-400 text-center mt-4 mb-2">
            {t.novaSubtitle}{" "}
            <button
              onClick={() => setShowNovaInfo(true)}
              className="text-gray-400 underline hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {t.novaLink}
            </button>
          </p>
          <div className="w-full max-w-md mt-2 mb-0">
            <p className="text-xs text-gray-400 text-center mb-2">{t.tryThese}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {exampleChips.map((chip) => (
                <button
                  key={chip.query}
                  onClick={() => {
                    setFood(chip.query);
                    analyzeFood(chip.query);
                  }}
                  className="px-4 py-2 rounded-full text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md mt-8">
            <div className="border-t border-gray-200 dark:border-gray-700 mb-3" />
            <p className="text-xs text-gray-400 text-center mb-3">{t.didYouKnow}</p>
            <div className="flex gap-2 mb-3 justify-center">
              <button
                onClick={() => setDidYouKnowTab("better")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors outline-none focus:outline-none focus-visible:outline-none ${
                  didYouKnowTab === "better"
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800 active:bg-green-300 dark:active:bg-green-700"
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600"
                }`}
              >
                {t.betterTab}
              </button>
              <button
                onClick={() => setDidYouKnowTab("worse")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors outline-none focus:outline-none focus-visible:outline-none ${
                  didYouKnowTab === "worse"
                    ? "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 hover:bg-orange-200 dark:hover:bg-orange-800 active:bg-orange-300 dark:active:bg-orange-700"
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600"
                }`}
              >
                {t.worseTab}
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
              {randomCards[didYouKnowTab].length > 0 &&
              randomCards[didYouKnowTab].map((item) => (
                <button
                  key={item.query}
                  onClick={() => {
                    setFood(item.query);
                    analyzeFood(item.query);
                  }}
                  className="flex-shrink-0 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-left hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                >
                  <p className="text-2xl mb-2">{item.emoji}</p>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white mb-1 leading-tight">{item.food}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 leading-tight italic">{item.surprise[lang]}</p>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-tight">{item.label[lang]}</p>
                </button>
              ))}
            </div>
          </div>
          </>
        )}

        {/* Loading spinner */}
        {loading && !result && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              marginTop: "32px"
            }}
          >
            <LogoSpinner size={24} />
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>
              {t.checkingIngredients}
            </p>
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div
            className="w-full max-w-md mt-1 mb-8 transition-all duration-500 ease-out"
            style={{ animation: "slideIn 0.4s ease-out" }}
          >
            <ResultCard result={result} />
          </div>
        )}
      </div>

      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm px-5 py-3 rounded-full shadow-lg z-50"
          style={{ animation: "slideIn 0.3s ease-out" }}
        >
          {toast}
        </div>
      )}

      {showNovaInfo && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          onClick={() => setShowNovaInfo(false)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-t-2xl md:rounded-2xl p-6 shadow-xl z-10"
            style={{ animation: "slideIn 0.3s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowNovaInfo(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
              {t.novaModalTitle}
            </h2>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>{t.novaModalBody}</p>
              <div className="space-y-2">
                <p><span className="text-green-600 font-semibold">Group 1</span> — {t.novaG1.replace(/^Grupp 1 — |^Group 1 — /, "")}</p>
                <p><span className="text-lime-600 font-semibold">Group 2</span> — {t.novaG2.replace(/^Grupp 2 — |^Group 2 — /, "")}</p>
                <p><span className="text-orange-500 font-semibold">Group 3</span> — {t.novaG3.replace(/^Grupp 3 — |^Group 3 — /, "")}</p>
                <p><span className="text-red-500 font-semibold">Group 4</span> — {t.novaG4.replace(/^Grupp 4 — |^Group 4 — /, "")}</p>
              </div>
              <p className="text-xs text-gray-400 pt-1">{t.novaResearch}</p>
            </div>
            <a
              href="https://nutritionsource.hsph.harvard.edu/processed-foods/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs text-gray-400 underline hover:text-gray-600 transition-colors"
            >
              {t.novaLearnMore}
            </a>
          </div>
        </div>
      )}

      {/* Footer */}
      {!result && (
        <footer className="w-full max-w-md mt-auto pt-8 pb-6 text-center border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            {t.footerDisclaimer}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/blog"
              className="text-xs text-gray-400 underline hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Food Myths
            </a>
            <a
              href="/privacy"
              className="text-xs text-gray-400 underline hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {t.footerPrivacy}
            </a>
            <a
              href="/ingredients"
              className="text-xs text-gray-400 underline hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {t.footerIngredients}
            </a>
            <button
              onClick={() => setShowNovaInfo(true)}
              className="text-xs text-gray-400 underline hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {t.footerNova}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
