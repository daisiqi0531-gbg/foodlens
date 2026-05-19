import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Svenska livsmedel — Hur nyttiga är de egentligen? | FoodLens",
  description: "Vi kollar hur bearbetade svenska favoritlivsmedel egentligen är — falukorv, havregryn, kvarg, filmjölk, knäckebröd och mer. Baserat på NOVA-klassificeringen.",
  keywords: [
    "är falukorv nyttigt", "är havregryn nyttigt",
    "är kvarg nyttigt", "är filmjölk nyttigt",
    "är knäckebröd nyttigt", "är köttbullar nyttiga",
    "är smör nyttigt", "är oatly nyttigt",
    "svenska livsmedel nyttigt", "nova klassificering"
  ],
  openGraph: {
    title: "Svenska livsmedel — Hur nyttiga är de egentligen?",
    description: "Vi kollar hur bearbetade svenska favoritlivsmedel egentligen är — baserat på NOVA-klassificeringen.",
    url: "https://foodlens.se/svenska-livsmedel",
  },
  alternates: {
    canonical: "https://foodlens.se/svenska-livsmedel",
  },
};

const articles = [
  {
    slug: "falukorv",
    title: "Är falukorv nyttigt?",
    subtitle: "En svensk klassiker — men vad är den egentligen gjord av?",
    emoji: "🌭",
    level: 4,
    levelName: "Ultrabearbetat",
  },
  {
    slug: "oatly",
    title: "Är Oatly verkligen nyttigt?",
    subtitle: "Havremjölk är ett stort trendval — men är det så rent som folk tror?",
    emoji: "🥛",
    level: 3,
    levelName: "Måttligt bearbetat",
  },
  {
    slug: "smor",
    title: "Är smör nyttigt?",
    subtitle: "Smör har fått dåligt rykte i decennier — men är det verkligen förtjänt?",
    emoji: "🧈",
    level: 2,
    levelName: "Vardagsmat",
  },
  {
    slug: "havregryn",
    title: "Är havregryn nyttigt?",
    subtitle: "Den klassiska svenska frukosten — och en av de renaste maten du kan äta.",
    emoji: "🌾",
    level: 1,
    levelName: "Så rent som det blir",
  },
  {
    slug: "kvarg",
    title: "Är kvarg nyttigt?",
    subtitle: "Proteintrender och hälsokost — men vad är kvarg egentligen?",
    emoji: "🫙",
    level: 2,
    levelName: "Vardagsmat",
  },
  {
    slug: "filmjolk",
    title: "Är filmjölk nyttigt?",
    subtitle: "En svensk mejeriprodukt med lång historia — och en överraskande ren sammansättning.",
    emoji: "🥛",
    level: 2,
    levelName: "Vardagsmat",
  },
  {
    slug: "knackebrod",
    title: "Är knäckebröd nyttigt?",
    subtitle: "Sveriges mest ikoniska bröd — men alla knäckebröd är inte lika rena.",
    emoji: "🍞",
    level: 2,
    levelName: "Vardagsmat",
  },
  {
    slug: "kottbullar",
    title: "Är köttbullar nyttiga?",
    subtitle: "Hemgjorda eller färdigköpta — det gör stor skillnad på NOVA-nivån.",
    emoji: "🍖",
    level: 3,
    levelName: "Måttligt bearbetat",
  },
];

const levelColor: Record<number, string> = {
  1: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/50",
  2: "text-lime-600 bg-lime-50 dark:text-lime-400 dark:bg-lime-950/50",
  3: "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/50",
  4: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/50",
};

export default function SvenskaLivsmedel() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 pt-8 pb-16 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mb-6 inline-block"
        >
          ← Tillbaka till FoodLens
        </Link>

        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
          Svenska livsmedel — hur nyttiga är de?
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
          Vi tar svenska favoritlivsmedel och kollar hur bearbetade de egentligen är — baserat på
          NOVA-klassificeringen, samma system som används av nutritionsforskare världen över.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Svaren är ibland överraskande. Smör är renare än de flesta tror. Falukorv är mer bearbetad än den
          ser ut. Och skillnaden mellan hemgjorda och färdigköpta köttbullar är större än du kanske anar.
        </p>

        <div className="space-y-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/svenska-livsmedel/${article.slug}`}
              className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer group"
            >
              <span className="text-3xl flex-shrink-0">{article.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[article.level]}`}>
                    NOVA {article.level} — {article.levelName}
                  </span>
                </div>
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors leading-tight">
                  {article.title}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {article.subtitle}
                </p>
              </div>
              <span className="text-gray-300 dark:text-gray-600 flex-shrink-0 group-hover:text-green-500 transition-colors">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
