"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "sv" | "en";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "sv",
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("sv");

  useEffect(() => {
    const stored = localStorage.getItem("foodlens-lang") as Lang | null;
    if (stored === "sv" || stored === "en") setLang(stored);
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next: Lang = prev === "sv" ? "en" : "sv";
      localStorage.setItem("foodlens-lang", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
