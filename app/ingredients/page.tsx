import type { Metadata } from "next";
import IngredientsClient from "./IngredientsClient";

export const metadata: Metadata = {
  title: "Ingredient Dictionary — FoodLens",
  description:
    "Plain English explanations of common food ingredients — E-numbers, sweeteners, preservatives, fats and marketing terms. Understand what's really in your food.",
  openGraph: {
    title: "Ingredient Dictionary — FoodLens",
    description:
      "Plain English explanations of common food ingredients. Understand E-numbers, sweeteners, preservatives and more.",
    url: "https://foodlens.se/ingredients",
  },
  alternates: {
    canonical: "https://foodlens.se/ingredients",
  },
};

export default function IngredientsPage() {
  return <IngredientsClient />;
}
