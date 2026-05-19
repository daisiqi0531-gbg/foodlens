import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { LanguageToggle } from "./components/LanguageToggle";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodLens — Know What's In Your Food",
  description:
    "Check how processed your food is using the NOVA classification system. Search any food or brand and instantly get a processing level, ingredients breakdown, and healthier alternatives. Free tool for Swedish consumers.",
  keywords: [
    "processed food",
    "NOVA classification",
    "food processing levels",
    "ultraprocessed food",
    "processat mat",
    "nova klassificering",
    "hälsosam mat",
    "ren mat",
    "foodlens",
  ],
  authors: [{ name: "FoodLens" }],
  creator: "FoodLens",
  publisher: "FoodLens",
  metadataBase: new URL("https://foodlens.se"),
  alternates: {
    canonical: "https://foodlens.se",
  },
  openGraph: {
    title: "FoodLens — Know What's In Your Food",
    description:
      "Check how processed your food is. Search any food or brand and get instant results based on the NOVA classification system.",
    url: "https://foodlens.se",
    siteName: "FoodLens",
    locale: "sv_SE",
    type: "website",
    images: [
      {
        url: "https://foodlens.se/logo.svg",
        width: 120,
        height: 120,
        alt: "FoodLens logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "FoodLens — Know What's In Your Food",
    description:
      "Check how processed your food is using the NOVA classification system.",
    images: ["https://foodlens.se/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3240793114742105"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]" suppressHydrationWarning>
        <LanguageProvider>
          <div className="fixed top-3 right-3 z-50">
            <LanguageToggle />
          </div>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
