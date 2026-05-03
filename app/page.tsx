"use client";
import { useEffect, useState, useRef } from "react";
import { ResultCard, type AnalyzeResult } from "./components/ResultCard";

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
  const [mounted, setMounted] = useState(false);
  const [food, setFood] = useState("");
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const debounceRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const exampleChips = [
    { label: "🌱 Banana", query: "banana" },
    { label: "😊 Olive oil", query: "olive oil" },
    { label: "🤔 Sourdough bread", query: "sourdough bread" },
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
      console.log("OFF raw result:", JSON.stringify(product));
      return product;
    } catch (err) {
      console.error("Search error:", err);
      return null;
    }
  };

  const analyzeFood = async (overrideFood?: string) => {
    const foodToAnalyze = (overrideFood ?? food).trim();
    if (!foodToAnalyze) {
      showToast("Type a food or brand to get started 🔍");
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
        body: JSON.stringify({ food: query, offProduct }),
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
      <div className="text-center mb-4 md:mb-8">
        <div className="flex items-center justify-center gap-2 mb-1">
          <img 
            src="/logo.svg" 
            alt="FoodLens logo" 
            className="h-7 w-7"
          />
          <h1 className="text-lg font-semibold tracking-tight">
            FoodLens
          </h1>
        </div>

        <p className="text-2xl md:text-3xl font-normal mb-3 leading-tight italic text-gray-700 dark:text-gray-100">Food clarity, made simple.</p>

        <p className="text-sm text-gray-400 mb-0">
          Check how processed your food is (
          <a
            href="https://nutritionsource.hsph.harvard.edu/processed-foods/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 underline hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            NOVA classification
          </a>
          )
        </p>
      </div>

      {/* Main content - grows to fill available space */}
      <div className="flex-1 w-full flex flex-col items-center">
        {/* Search Input */}
        <div className="w-full max-w-md mt-1 md:mt-2 relative">
          <div className="flex gap-[10px] relative">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Try: ICA milk, Coop bread, Oatly oat drink"
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
                className="w-full px-3 py-2 md:px-4 md:py-3 pr-10 text-base md:text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
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
              Analyze
            </button>
          </div>

          {/* Autocomplete dropdown */}
          {(suggestionsLoading || filtered.length > 0) && (
            <div className="bg-white dark:bg-gray-800 mt-1 rounded-lg shadow-md overflow-hidden absolute left-0 right-0 z-10">
              {suggestionsLoading ? (
                <div className="px-4 py-2 text-gray-400 text-sm">Searching...</div>
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
          <div className="w-full max-w-md mt-3 md:mt-4">
            <p className="text-xs text-gray-400 text-center mb-2">Try these:</p>
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
              Checking ingredients...
            </p>
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div
            className="w-full max-w-md mt-1 transition-all duration-500 ease-out"
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

      {/* Footer */}
      <footer className="w-full max-w-md mt-auto pt-8 pb-6 text-center border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-400 leading-relaxed mb-4">
          FoodLens provides general food information based on the NOVA classification system. Results are for informational purposes only and do not constitute medical, nutritional, or dietary advice. Always consult a qualified health professional before making changes to your diet.
        </p>
        <div className="flex justify-center">
          <a
            href="/privacy"
            className="text-xs text-gray-400 underline hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
