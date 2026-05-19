"use client";
import Link from "next/link";

const articles = [
  {
    slug: "is-granola-healthy",
    title: "Is Granola Actually Healthy?",
    subtitle: "The breakfast food marketed as wholesome often has more sugar than cornflakes.",
    emoji: "🥣",
    level: 4,
    levelName: "Ultra processed",
    readTime: "3 min read",
  },
  {
    slug: "is-fruit-juice-healthy",
    title: "Is Fruit Juice as Healthy as Fruit?",
    subtitle: "Parents give it to kids every morning — but juice is not the same as eating fruit.",
    emoji: "🧃",
    level: 4,
    levelName: "Ultra processed",
    readTime: "3 min read",
  },
  {
    slug: "is-oat-milk-healthy",
    title: "Is Oat Milk Actually Good For You?",
    subtitle: "The plant-based trend everyone loves — but most oat milks are more processed than you think.",
    emoji: "🥛",
    level: 3,
    levelName: "Moderately processed",
    readTime: "3 min read",
  },
  {
    slug: "is-flavoured-yogurt-healthy",
    title: "Is Flavoured Yogurt Healthy?",
    subtitle: "Plain yogurt is level 2. Flavoured yogurt is level 4. Here is why they are completely different.",
    emoji: "🍓",
    level: 4,
    levelName: "Ultra processed",
    readTime: "3 min read",
  },
  {
    slug: "are-protein-bars-healthy",
    title: "Are Protein Bars Actually Healthy?",
    subtitle: "High protein does not mean clean. Most protein bars have ingredient lists as long as a candy bar.",
    emoji: "💪",
    level: 4,
    levelName: "Ultra processed",
    readTime: "3 min read",
  },
  {
    slug: "is-veggie-burger-healthy",
    title: "Are Veggie Burgers Healthier Than Meat?",
    subtitle: "Plant-based does not automatically mean less processed. Some veggie burgers are worse than beef.",
    emoji: "🌱",
    level: 4,
    levelName: "Ultra processed",
    readTime: "3 min read",
  },
  {
    slug: "is-instant-ramen-healthy",
    title: "Is Instant Ramen Bad For You?",
    subtitle: "It is cheap, fast and filling — but instant ramen is one of the most processed foods you can buy.",
    emoji: "🍜",
    level: 4,
    levelName: "Ultra processed",
    readTime: "3 min read",
  },
  {
    slug: "are-rice-cakes-healthy",
    title: "Are Rice Cakes a Healthy Snack?",
    subtitle: "The ultimate diet food — but rice cakes are highly processed and spike blood sugar fast.",
    emoji: "🌾",
    level: 3,
    levelName: "Moderately processed",
    readTime: "3 min read",
  },
  {
    slug: "is-falukorv-healthy",
    title: "Is Falukorv Healthy?",
    subtitle: "A Swedish classic — but what is it actually made of?",
    emoji: "🌭",
    level: 4,
    levelName: "Ultra processed",
    readTime: "3 min read",
  },
  {
    slug: "is-butter-healthy",
    title: "Is Butter Actually Bad For You?",
    subtitle: "Butter had a terrible reputation for decades — but is it really deserved?",
    emoji: "🧈",
    level: 2,
    levelName: "Everyday food",
    readTime: "3 min read",
  },
  {
    slug: "is-oatmeal-healthy",
    title: "Is Oatmeal the Healthiest Breakfast?",
    subtitle: "The classic Swedish breakfast — and one of the cleanest foods you can eat.",
    emoji: "🌾",
    level: 1,
    levelName: "As clean as it gets",
    readTime: "3 min read",
  },
  {
    slug: "is-kvarg-healthy",
    title: "Is Kvarg (Quark) Actually Healthy?",
    subtitle: "The protein trend everyone loves — but what is kvarg really?",
    emoji: "🫙",
    level: 2,
    levelName: "Everyday food",
    readTime: "3 min read",
  },
  {
    slug: "is-filmjolk-healthy",
    title: "Is Filmjölk (Swedish Fermented Milk) Healthy?",
    subtitle: "A Swedish dairy product with a long history — and a surprisingly clean ingredient list.",
    emoji: "🥛",
    level: 2,
    levelName: "Everyday food",
    readTime: "3 min read",
  },
  {
    slug: "is-knackebrod-healthy",
    title: "Is Crispbread (Knäckebröd) Healthy?",
    subtitle: "Sweden's most iconic bread — but not all crispbreads are equally clean.",
    emoji: "🍞",
    level: 2,
    levelName: "Everyday food",
    readTime: "3 min read",
  },
  {
    slug: "are-meatballs-healthy",
    title: "Are Swedish Meatballs Healthy?",
    subtitle: "Homemade or store-bought — it makes a huge difference to the NOVA level.",
    emoji: "🍖",
    level: 3,
    levelName: "Moderately processed",
    readTime: "3 min read",
  },
];

const levelColor: Record<number, string> = {
  1: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/50",
  2: "text-lime-600 bg-lime-50 dark:text-lime-400 dark:bg-lime-950/50",
  3: "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/50",
  4: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/50",
};

export default function BlogClient() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 pt-8 pb-16 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mb-6 inline-block"
        >
          ← Back to FoodLens
        </Link>

        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
          Food Myths, Explained
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Foods people think are healthy — and foods people think are fine — checked against the NOVA classification system.
        </p>

        <div className="space-y-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer group"
            >
              <span className="text-3xl flex-shrink-0">{article.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[article.level]}`}>
                    NOVA {article.level} — {article.levelName}
                  </span>
                  <span className="text-xs text-gray-400">{article.readTime}</span>
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
