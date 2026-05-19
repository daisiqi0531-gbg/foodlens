import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy — FoodLens",
  description: "FoodLens privacy policy — how we handle your data and protect your privacy.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://foodlens.se/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
