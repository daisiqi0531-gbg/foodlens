import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Svenska livsmedel — Hur nyttiga är de egentligen? | FoodLens",
  description: "Vi kollar hur bearbetade svenska favoritlivsmedel egentligen är — falukorv, kaviar, müsli, proteinbröd och mer. Svaren förvånar. Baserat på NOVA-klassificeringen.",
  keywords: [
    "är falukorv nyttigt", "är kaviar nyttigt",
    "är müsli nyttigt", "är proteinbröd nyttigt",
    "är kvarg nyttigt", "är filmjölk nyttigt",
    "är köttbullar nyttiga", "är fiskpinnar nyttigt",
    "svenska livsmedel nyttigt", "nova klassificering"
  ],
  openGraph: {
    title: "Svenska livsmedel — Hur nyttiga är de egentligen?",
    description: "Vi kollar hur bearbetade svenska favoritlivsmedel egentligen är — svaren förvånar.",
    url: "https://foodlens.se/svenska-livsmedel",
  },
  alternates: {
    canonical: "https://foodlens.se/svenska-livsmedel",
  },
};

const worseArticles = [
  {
    slug: "falukorv",
    title: "Är falukorv nyttigt?",
    subtitle: "En svensk klassiker — men natriumnitrit och fosfater gör den till nivå 4.",
    emoji: "🌭",
    level: 4,
    levelName: "Ultrabearbetat",
    surprise: "Innehåller natriumnitrit — ett konserveringsmedel WHO klassar som cancerframkallande",
  },
  {
    slug: "oatly",
    title: "Är Oatly verkligen nyttigt?",
    subtitle: "Havremjölk känns rent — men är mer bearbetat än komjölk.",
    emoji: "🥛",
    level: 3,
    levelName: "Måttligt bearbetat",
    surprise: "Vanlig komjölk är nivå 1-2. Oatly är nivå 3.",
  },
  {
    slug: "kottbullar",
    title: "Är köttbullar nyttiga?",
    subtitle: "Hemgjorda är nivå 2. Färdigköpta är nivå 3-4. Stor skillnad.",
    emoji: "🍖",
    level: 3,
    levelName: "Måttligt bearbetat",
    surprise: "Färdigköpta innehåller E450, modifierad stärkelse och smakämnen",
  },
  {
    slug: "kaviar",
    title: "Är kaviar (tub) nyttigt?",
    subtitle: "Ser ut som ett enkelt fiskpålägg — men ingredienslistan berättar en annan historia.",
    emoji: "🐟",
    level: 4,
    levelName: "Ultrabearbetat",
    surprise: "Innehåller E471, modifierad stärkelse och artificiella smakämnen",
  },
  {
    slug: "musli",
    title: "Är müsli nyttigt?",
    subtitle: "Hälsofrukostens kung — men ofta mer socker än cornflakes.",
    emoji: "🥣",
    level: 4,
    levelName: "Ultrabearbetat",
    surprise: "Färdigmüsli kan innehålla mer socker per 100g än cornflakes",
  },
  {
    slug: "proteinbrod",
    title: "Är proteinbröd nyttigt?",
    subtitle: "Högt protein låter bra — men de flesta proteinbröd är mer bearbetade än vanligt bröd.",
    emoji: "🍞",
    level: 4,
    levelName: "Ultrabearbetat",
    surprise: "Ofta nivå 4 — mer bearbetat än vanligt vitt bröd",
  },
  {
    slug: "smaksatt-kvarg",
    title: "Är smaksatt kvarg nyttigt?",
    subtitle: "Naturell kvarg är nivå 2. Smaksatt kvarg är nivå 4. Samma förpackning — helt olika produkt.",
    emoji: "🫙",
    level: 4,
    levelName: "Ultrabearbetat",
    surprise: "Glukossirap och artificiella smakämnen gör den till nivå 4",
  },
  {
    slug: "fruktyoghurt",
    title: "Är fruktyoghurt nyttigt?",
    subtitle: "Det är yoghurt, eller? Nej — det är dessert i yoghurtförpackning.",
    emoji: "🍓",
    level: 4,
    levelName: "Ultrabearbetat",
    surprise: "Mer socker och tillsatser än de flesta inser",
  },
  {
    slug: "fiskpinnar",
    title: "Är fiskpinnar nyttiga?",
    subtitle: "Barnfavoriten som ser oskyldig ut — men är industriellt bearbetad.",
    emoji: "🐠",
    level: 4,
    levelName: "Ultrabearbetat",
    surprise: "Panering, fosfater och smakämnen gör dem till nivå 4",
  },
  {
    slug: "leverpastej",
    title: "Är leverpastej nyttigt?",
    subtitle: "En svensk klassiker på smörgåsen — men innehåller natriumnitrit.",
    emoji: "🥪",
    level: 4,
    levelName: "Ultrabearbetat",
    surprise: "Natriumnitrit och E471 gör leverpastej till nivå 4",
  },
];

const betterArticles = [
  {
    slug: "cottage-cheese",
    title: "Är cottage cheese nyttigt?",
    subtitle: "Ser industriellt ut — men är egentligen bara mjölk och kulturer.",
    emoji: "🧀",
    level: 2,
    levelName: "Vardagsmat",
    surprise: "Kort ingredienslista — ett av de renaste mejerisnacksen",
  },
  {
    slug: "naturell-kvarg",
    title: "Är naturell kvarg nyttigt?",
    subtitle: "Proteintrendens renaste val — bara silet mjölk.",
    emoji: "🫙",
    level: 2,
    levelName: "Vardagsmat",
    surprise: "Bara mjölk och kulturer — nivå 2 trots proteininnehållet",
  },
  {
    slug: "creme-fraiche",
    title: "Är crème fraiche nyttigt?",
    subtitle: "Folk undviker det för fettet — men det är ett av kökets renaste ingredienser.",
    emoji: "🥛",
    level: 2,
    levelName: "Vardagsmat",
    surprise: "Bara grädde och kulturer — renare än de flesta tror",
  },
  {
    slug: "helfett-mjolk",
    title: "Är helfett mjölk nyttigt?",
    subtitle: "Lättmjölk marknadsförs som hälsosammare — men helfett är faktiskt renare.",
    emoji: "🥛",
    level: 2,
    levelName: "Vardagsmat",
    surprise: "Helfett mjölk är nivå 1-2. Lättmjölk är mer bearbetat.",
  },
  {
    slug: "frysta-artor",
    title: "Är frysta ärtor nyttiga?",
    subtitle: "Frysta grönsaker verkar bearbetade — men de fryses samma dag som de skördas.",
    emoji: "🫛",
    level: 1,
    levelName: "Så rent som det blir",
    surprise: "Frysta ärtor är nivå 1 — lika nyttiga som färska",
  },
  {
    slug: "kikartor",
    title: "Är kikärtor (konserv) nyttiga?",
    subtitle: "Konservburk låter bearbetat — men det är bara kikärtor och vatten.",
    emoji: "🫘",
    level: 2,
    levelName: "Vardagsmat",
    surprise: "Bara kikärtor och vatten — konserv betyder inte bearbetat här",
  },
];

const levelColor: Record<number, string> = {
  1: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/50",
  2: "text-lime-600 bg-lime-50 dark:text-lime-400 dark:bg-lime-950/50",
  3: "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/50",
  4: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/50",
};

function ArticleCard({ article, basePath }: { 
  article: typeof worseArticles[0], 
  basePath: string 
}) {
  return (
    <Link
      href={`${basePath}/${article.slug}`}
      className="flex items-start gap-4 p-4 bg-white
      dark:bg-gray-800 rounded-xl border border-gray-200
      dark:border-gray-700 hover:border-gray-400
      dark:hover:border-gray-500 transition-colors
      cursor-pointer group"
    >
      <span className="text-3xl flex-shrink-0">
        {article.emoji}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={`text-xs px-2 py-0.5
          rounded-full font-medium ${levelColor[article.level]}`}>
            NOVA {article.level} — {article.levelName}
          </span>
        </div>
        <h2 className="text-sm font-semibold
        text-gray-900 dark:text-white mb-1
        group-hover:text-green-600
        dark:group-hover:text-green-400
        transition-colors leading-tight">
          {article.title}
        </h2>
        <p className="text-xs text-gray-500
        dark:text-gray-400 leading-relaxed mb-1">
          {article.subtitle}
        </p>
        <p className="text-xs text-gray-400
        dark:text-gray-500 italic leading-relaxed">
          💡 {article.surprise}
        </p>
      </div>
      <span className="text-gray-300 dark:text-gray-600
      flex-shrink-0 group-hover:text-green-500
      transition-colors mt-1">
        →
      </span>
    </Link>
  );
}

export default function SvenskaLivsmedel() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900
    text-gray-900 dark:text-gray-100 px-4 pt-8 pb-16 font-sans">
      <div className="max-w-2xl mx-auto">

        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-gray-600
          dark:hover:text-gray-300 transition-colors mb-6
          inline-block"
        >
          ← Tillbaka till FoodLens
        </Link>

        <h1 className="text-2xl font-semibold text-gray-900
        dark:text-white mb-3">
          Svenska livsmedel — hur nyttiga är de?
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400
        leading-relaxed mb-3">
          Vi tar svenska favoritlivsmedel och kollar hur 
          bearbetade de egentligen är — baserat på 
          NOVA-klassificeringen, samma system som används 
          av nutritionsforskare världen över.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400
        leading-relaxed mb-10">
          Svaren är ofta förvånande. Kaviar på tub är nivå 4. 
          Smaksatt kvarg är nivå 4. Frysta ärtor är nivå 1 — 
          lika nyttiga som färska. Det handlar inte om vad 
          vi tror är nyttigt, utan vad som faktiskt finns 
          i förpackningen.
        </p>

        {/* Worse section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">😬</span>
            <h2 className="text-base font-semibold 
            text-gray-900 dark:text-white">
              Sämre än du tror
            </h2>
          </div>
          <p className="text-xs text-gray-400 
          dark:text-gray-500 mb-4 leading-relaxed">
            Svenska livsmedel som de flesta tror är okej — 
            men som är mer bearbetade än de ser ut.
          </p>
          <div className="space-y-3">
            {worseArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                basePath="/svenska-livsmedel"
              />
            ))}
          </div>
        </div>

        {/* Better section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">😊</span>
            <h2 className="text-base font-semibold
            text-gray-900 dark:text-white">
              Renare än du tror
            </h2>
          </div>
          <p className="text-xs text-gray-400
          dark:text-gray-500 mb-4 leading-relaxed">
            Svenska livsmedel som folk ofta undviker eller 
            misstänker — men som faktiskt är 
            överraskande rena.
          </p>
          <div className="space-y-3">
            {betterArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                basePath="/svenska-livsmedel"
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
