"use client";
import { useLang } from "../contexts/LanguageContext";

export function LanguageToggle() {
  const { lang, toggleLang } = useLang();
  return (
    <button
      onClick={toggleLang}
      className="text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-gray-900"
      aria-label="Toggle language"
    >
      {lang === "sv" ? "EN" : "SV"}
    </button>
  );
}
