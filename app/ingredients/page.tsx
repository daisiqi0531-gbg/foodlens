import type { Metadata } from "next";
import IngredientsClient from "./IngredientsClient";

export const metadata: Metadata = {
  title: "Food Ingredient Dictionary — What's Really In Your Food | FoodLens",
  description:
    "Plain English explanations of common food ingredients — E-numbers, sweeteners, preservatives, fats and marketing terms. Vad är E471, modifierad stärkelse, glukossirap? Förstå vad som verkligen finns i din mat. Free guide for Swedish consumers.",
  keywords: [
    "food additives",
    "E numbers explained",
    "vad är E471",
    "livsmedelstillsatser",
    "modified starch",
    "modifierad stärkelse",
    "glucose syrup",
    "glukossirap",
    "food ingredients dictionary",
    "E-nummer förklarat",
    "konserveringsmedel mat",
    "sötningsmedel förklarat",
    "E471",
    "E621 MSG",
    "palm oil food",
    "aspartame",
    "maltodextrin",
    "sodium nitrite E250",
    "carrageenan E407",
    "vad betyder E-nummer",
    "tillsatser i mat Sverige",
  ],
  openGraph: {
    title: "Food Ingredient Dictionary — What's Really In Your Food",
    description:
      "Plain English explanations of common food additives, sweeteners, preservatives and fats found in Swedish supermarkets. Förstå E-nummer, sötningsmedel och konserveringsmedel.",
    url: "https://foodlens.se/ingredients",
  },
  alternates: {
    canonical: "https://foodlens.se/ingredients",
  },
};

export default function IngredientsPage() {
  return <IngredientsClient />;
}
