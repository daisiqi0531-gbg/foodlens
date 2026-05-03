import axios from "axios";
import { load } from "cheerio";
import fs from "node:fs";

const productSources = [
  {
    name: "ICA",
    baseUrl: "https://handla.ica.se/produkt/",
    ids: ["1487131", "1487150"]
  },
  {
    name: "Coop",
    baseUrl: "https://www.coop.se/produkt/",
    ids: ["12345", "67890"]
  },
  {
    name: "Willys",
    baseUrl: "https://www.willys.se/produkt/",
    ids: ["11111", "22222"]
  },
  {
    name: "Hemkop",
    baseUrl: "https://www.hemkop.se/produkt/",
    ids: ["33333", "44444"]
  }
];

const harmfulKeywords = [
  "socker",
  "sockerarter",
  "palmolja",
  "palm oil",
  "e471",
  "e200",
  "konserveringsmedel"
];

function estimateNOVA(ingredients) {
  if (!ingredients || ingredients.length === 0) return 1;

  const joined = ingredients.join(" ").toLowerCase();

  if (joined.match(/palmolja|socker|e[0-9]+|konserveringsmedel/)) return 4;
  if (joined.match(/syrningsmedel|emulgeringsmedel/)) return 3;
  if (ingredients.length > 5) return 2;

  return 1;
}

function extractIngredients($) {
  let ingredients = [];

  $("p, div").each((_, el) => {
    const text = $(el).text().trim();
    if (/ingredienser/i.test(text)) {
      ingredients.push(text.replace(/ingredienser[:：]/i, "").trim());
    }
  });

  return ingredients
    .join(", ")
    .split(",")
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);
}

function buildAdditives(ingredients) {
  const harmful = ingredients.filter((ingredient) =>
    harmfulKeywords.some((keyword) =>
      ingredient.toLowerCase().includes(keyword)
    )
  );

  return harmful.length > 0 ? harmful.join(", ") : "None detected";
}

function buildReason(level, ingredients) {
  if (level === 4) return "Ultra-processed food with additives, sugars, or preservatives.";
  if (level === 3) return "Processed food with several ingredients and some additives.";
  if (level === 2) return "Moderately processed product with limited added ingredients.";
  if (ingredients.length === 0) return "Could not extract ingredients reliably from the page.";
  return "Minimally processed product with simple ingredients.";
}

function normalizeText(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isGenericName(name) {
  const normalizedName = normalizeText(name);
  const genericNames = new Set([
    "unknown",
    "produkt",
    "product",
    "vara",
    "item",
    "artikel"
  ]);

  if (!normalizedName || genericNames.has(normalizedName)) {
    return true;
  }

  return /^(produkt|product|vara|item|artikel)\s*\d*$/i.test(normalizedName);
}

function isUsefulProduct(product) {
  if (!product) return false;

  const normalizedName = normalizeText(product.name);
  const normalizedBrand = normalizeText(product.brand);
  const normalizedStore = normalizeText(product.store);
  const nameWords = normalizedName.split(/\s+/).filter(Boolean);

  if (isGenericName(product.name)) return false;
  if (!normalizedBrand || normalizedBrand === "unknown") return false;
  if (normalizedName === normalizedStore) return false;

  const hasStoreOnlyBrand = normalizedBrand === normalizedStore;
  const hasWeakStoreName =
    normalizedName.startsWith(`${normalizedStore} produkt`) ||
    normalizedName.startsWith(`${normalizedStore} product`) ||
    normalizedName.startsWith(`${normalizedStore} vara`) ||
    normalizedName.startsWith(`${normalizedStore} item`) ||
    nameWords.length < 2;

  if (hasStoreOnlyBrand && hasWeakStoreName) return false;

  return product.ingredients.length > 0;
}

function dedupeProducts(products) {
  const seenIds = new Set();
  const seenNames = new Set();

  return products.filter((product) => {
    const normalizedId = normalizeText(product.id);
    const normalizedName = normalizeText(product.name);

    if (seenIds.has(normalizedId) || seenNames.has(normalizedName)) {
      console.log(`🔁 Skipping duplicate product: ${product.id} (${product.name})`);
      return false;
    }

    seenIds.add(normalizedId);
    seenNames.add(normalizedName);
    return true;
  });
}

async function fetchProduct(source, id) {
  try {
    const url = source.baseUrl + id;
    console.log(`⏳ Fetching ${url} ...`);

    const { data } = await axios.get(url);
    const $ = load(data);

    const name = $("h1").first().text().trim() || "Unknown";
    const brand =
      $("a")
        .filter((_, el) => {
          const text = $(el).text().trim();
          return text && text !== name;
        })
        .first()
        .text()
        .trim() || source.name;

    const ingredients = extractIngredients($);
    const level = estimateNOVA(ingredients);
    const additives = buildAdditives(ingredients);
    const reason = buildReason(level, ingredients);

    const product = {
      id,
      store: source.name,
      name,
      brand,
      ingredients,
      level,
      additives,
      reason,
      betterChoice: "Choose fresh or eco alternatives"
    };

    if (!isUsefulProduct(product)) {
      console.log(`⚠️ Skipping incomplete product: ${source.name} ${id} (${name})`);
      return null;
    }

    console.log(`✅ Success: ${name}`);

    return product;
  } catch (err) {
    console.log(`❌ Failed ${source.name} product ${id}: ${err.message}`);
    return null;
  }
}

(async () => {
  const allProducts = [];

  for (const source of productSources) {
    for (const id of source.ids) {
      const product = await fetchProduct(source, id);
      if (product) allProducts.push(product);
    }
  }

  const uniqueProducts = dedupeProducts(allProducts);

  if (!fs.existsSync("data")) fs.mkdirSync("data");

  fs.writeFileSync(
    "data/grocery-products.json",
    JSON.stringify(uniqueProducts, null, 2)
  );

  console.log(`🎉 Finished! ${uniqueProducts.length} products saved to data/grocery-products.json`);
})();