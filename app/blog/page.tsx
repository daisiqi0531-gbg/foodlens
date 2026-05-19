import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Food Myths Explained — FoodLens Blog",
  description: "Foods people think are healthy checked against the NOVA classification system. Granola, fruit juice, oat milk, protein bars and more — the truth about processed food.",
  openGraph: {
    title: "Food Myths Explained — FoodLens Blog",
    description: "The truth about foods people think are healthy — checked with the NOVA classification system.",
    url: "https://foodlens.se/blog",
  },
  alternates: {
    canonical: "https://foodlens.se/blog",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
