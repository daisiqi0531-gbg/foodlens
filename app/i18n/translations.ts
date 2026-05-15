import type { Lang } from "../contexts/LanguageContext";

export const UI: Record<Lang, {
  tagline: string;
  searchPlaceholder: string;
  analyzeBtn: string;
  searching: string;
  checkingIngredients: string;
  emptyToast: string;
  novaSubtitle: string;
  novaLink: string;
  tryThese: string;
  didYouKnow: string;
  betterTab: string;
  worseTab: string;
  novaModalTitle: string;
  novaModalBody: string;
  novaG1: string;
  novaG2: string;
  novaG3: string;
  novaG4: string;
  novaResearch: string;
  novaLearnMore: string;
  footerDisclaimer: string;
  footerPrivacy: string;
  footerIngredients: string;
  footerNova: string;
  // ResultCard
  notFoundTitle: string;
  notFoundDesc: string;
  brand: string;
  commonBrands: string;
  ingredientsLabel: string;
  why: string;
  harmfulIngredientsLabel: string;
  understandIngredients: string;
  betterChoiceLabel: string;
  processLevel: string;
  estimatedNote: string;
  offNote: string;
  // Ingredients page
  ingredientsBack: string;
  ingredientsPageTitle: string;
  ingredientsPageSubtitle: string;
  ingredientsSearchPlaceholder: string;
  marketingNote: string;
  ingredientCount: (n: number) => string;
  noIngredientsFound: string;
  whatItIs: string;
  whyUsed: string;
  shouldWorry: string;
  foundIn: string;
  categoryAll: string;
  categoryENumbers: string;
  categoryPreservatives: string;
  categorySweeteners: string;
  categoryFats: string;
  categoryThickeners: string;
  categoryFlavour: string;
  categoryMarketing: string;
  // Privacy
  privacyBack: string;
  privacyTitle: string;
  privacyUpdated: string;
  privacyIntroHeading: string;
  privacyIntroBody: string;
  privacyDataCollHeading: string;
  privacyDataCollBody: string;
  privacyDataCollItems: string[];
  privacyUseHeading: string;
  privacyUseBody: string;
  privacyUseItems: string[];
  privacySecurityHeading: string;
  privacySecurityBody: string;
  privacyThirdPartyHeading: string;
  privacyThirdPartyBody: string;
  privacySourcesHeading: string;
  privacySourcesBody: string;
  privacyCookiesHeading: string;
  privacyCookiesBody: string;
  privacyRightsHeading: string;
  privacyRightsBody: string;
  privacyChildrenHeading: string;
  privacyChildrenBody: string;
  privacyChangesHeading: string;
  privacyChangesBody: string;
  privacyContactHeading: string;
  privacyContactBody: string;
}> = {
  sv: {
    tagline: "Matklarhet, enkelt.",
    searchPlaceholder: "Sök på mat eller varumärke...",
    analyzeBtn: "Analysera",
    searching: "Söker...",
    checkingIngredients: "Kontrollerar ingredienser...",
    emptyToast: "Skriv en mat eller ett varumärke för att börja 🔍",
    novaSubtitle: "Kolla hur processad din mat är, baserat på",
    novaLink: "NOVA-klassificeringen",
    tryThese: "Prova dessa:",
    didYouKnow: "Visste du?",
    betterTab: "😮 Bättre än du tror",
    worseTab: "😬 Sämre än du tror",
    novaModalTitle: "Vad är NOVA-klassificeringen?",
    novaModalBody: "NOVA är ett livsmedelsklassificeringssystem som delar in mat i 4 kategorier baserat på grad och syfte med bearbetningen.",
    novaG1: "Grupp 1 — Obearbetad eller minimalt bearbetad mat (frukt, grönsaker, ägg, kött)",
    novaG2: "Grupp 2 — Bearbetade kulinariska ingredienser (oljor, smör, socker, salt)",
    novaG3: "Grupp 3 — Bearbetad mat (konserver, ost, charkuterier, nybakat bröd)",
    novaG4: "Grupp 4 — Ultraprocessad mat (läsk, förpackade snacks, snabbnudlar, rekonstituerade köttprodukter)",
    novaResearch: "Forskning kopplar hög konsumtion av ultraprocessad mat till ökad risk för fetma, diabetes och hjärt-kärlsjukdom.",
    novaLearnMore: "Läs mer på Harvard T.H. Chan School of Public Health →",
    footerDisclaimer: "FoodLens är enbart för information — inte medicinsk eller kostrådgivning.",
    footerPrivacy: "Integritetspolicy",
    footerIngredients: "Ingredienslexikon",
    footerNova: "Vad är NOVA-klassificeringen?",
    notFoundTitle: "Vi hittade inte den",
    notFoundDesc: "Prova ett livsmedelsnamn som \"oatly\", \"banan\" eller \"cornflakes\" — ju mer specifikt desto bättre.",
    brand: "Varumärke",
    commonBrands: "Vanliga varumärken i Sverige:",
    ingredientsLabel: "Ingredienser",
    why: "Varför?",
    harmfulIngredientsLabel: "Potentiellt skadliga ingredienser:",
    understandIngredients: "Förstå dessa ingredienser →",
    betterChoiceLabel: "💚 Bättre val:",
    processLevel: "Bearbetningsnivå",
    estimatedNote: "📊 Baserat på hur den här typen av mat vanligtvis tillverkas — bra att kolla etiketten också",
    offNote: "✓ Data från OpenFoodFacts",
    ingredientsBack: "← Tillbaka till FoodLens",
    ingredientsPageTitle: "Vad innehåller din mat?",
    ingredientsPageSubtitle: "Vanliga livsmedelstillsatser förklarade på klarspråk — vad de är, varför de används och om du bör oroa dig.",
    ingredientsSearchPlaceholder: "Sök ett ämne...",
    marketingNote: "Det här är inte ingredienser — det är påståenden på förpackningar som ofta missförstås.",
    ingredientCount: (n) => `${n} ingrediens${n !== 1 ? "er" : ""}`,
    noIngredientsFound: "Inga ingredienser hittades — prova en annan sökning",
    whatItIs: "Vad det är",
    whyUsed: "Varför det används",
    shouldWorry: "Ska jag oroa mig?",
    foundIn: "Vanligen finns i",
    categoryAll: "Alla",
    categoryENumbers: "E-nummer",
    categoryPreservatives: "Konserveringsmedel",
    categorySweeteners: "Sötningsmedel",
    categoryFats: "Fetter & Oljor",
    categoryThickeners: "Förtjockningsmedel & Stabilisatorer",
    categoryFlavour: "Smakämnen",
    categoryMarketing: "Marknadsföringstermer",
    privacyBack: "← Tillbaka till FoodLens",
    privacyTitle: "Integritetspolicy",
    privacyUpdated: "Senast uppdaterad: 3 maj 2026",
    privacyIntroHeading: "Introduktion",
    privacyIntroBody: "FoodLens (\"vi\", \"oss\" eller \"vår\") driver FoodLens webbplats och applikation. Den här sidan informerar dig om vår policy gällande insamling, användning och utlämnande av personuppgifter när du använder vår tjänst, samt de val du har i samband med dessa uppgifter.",
    privacyDataCollHeading: "Datainsamling",
    privacyDataCollBody: "Vi samlar in information du lämnar direkt till oss, till exempel när du söker efter livsmedelsprodukter eller skickar in förfrågningar. Detta kan inkludera:",
    privacyDataCollItems: [
      "Sökfrågor och livsmedelsinformation du anger",
      "Enhetsinformation och användningsanalys",
      "Webbläsardata och IP-adress",
    ],
    privacyUseHeading: "Hur vi använder dina uppgifter",
    privacyUseBody: "Vi använder insamlade uppgifter för följande ändamål:",
    privacyUseItems: [
      "Att tillhandahålla och förbättra vår tjänst",
      "Att analysera användningsmönster och optimera användarupplevelsen",
      "Att övervaka och felsöka tekniska problem",
      "Att uppfylla rättsliga skyldigheter",
    ],
    privacySecurityHeading: "Datasäkerhet",
    privacySecurityBody: "Vi implementerar lämpliga tekniska och organisatoriska åtgärder för att skydda dina personuppgifter mot obehörig åtkomst, ändring, utlämnande eller förstöring. Ingen metod för överföring via internet är dock 100% säker, och vi kan inte garantera absolut säkerhet.",
    privacyThirdPartyHeading: "Tredjepartstjänster",
    privacyThirdPartyBody: "FoodLens kan använda tredjepartstjänster för att förbättra funktionaliteten, inklusive OpenFoodFacts för information om livsmedelsprodukter. Vi är inte ansvariga för tredje parters sekretesspolicyer och uppmanar dig att läsa deras integritetspolicyer.",
    privacySourcesHeading: "Datakällor",
    privacySourcesBody: "Matdata hämtas från world.openfoodfacts.org, en öppen samarbetsdatabas licensierad under Open Database License (ODbL). FoodLens är inte anslutet till OpenFoodFacts.",
    privacyCookiesHeading: "Cookies",
    privacyCookiesBody: "Vi kan använda cookies och liknande spårningstekniker för att spåra aktivitet på vår tjänst och bibehålla preferenser. Du kan instruera din webbläsare att neka alla cookies eller att indikera när en cookie skickas.",
    privacyRightsHeading: "Dina rättigheter",
    privacyRightsBody: "Beroende på din plats kan du ha vissa rättigheter gällande dina personuppgifter, inklusive rätten att få tillgång till, korrigera eller radera dina uppgifter. Kontakta oss för att utöva dessa rättigheter.",
    privacyChildrenHeading: "Barns integritet",
    privacyChildrenBody: "FoodLens samlar inte medvetet in personligt identifierbar information från någon under 13 år. Om vi blir medvetna om att ett barn under 13 år har lämnat oss personuppgifter raderar vi sådan information omedelbart.",
    privacyChangesHeading: "Ändringar av denna integritetspolicy",
    privacyChangesBody: "Vi kan uppdatera vår integritetspolicy från tid till annan. Vi meddelar dig om eventuella ändringar genom att publicera den nya integritetspolicyn på den här sidan och uppdatera datumet \"Senast uppdaterad\" längst upp.",
    privacyContactHeading: "Kontakta oss",
    privacyContactBody: "Om du har frågor om denna integritetspolicy eller vår sekretesspraxis, kontakta oss. Vi svarar på din förfrågan inom 30 dagar.",
  },
  en: {
    tagline: "Food clarity, made simple.",
    searchPlaceholder: "Search any food or brand...",
    analyzeBtn: "Analyze",
    searching: "Searching...",
    checkingIngredients: "Checking ingredients...",
    emptyToast: "Type a food or brand to get started 🔍",
    novaSubtitle: "Check how processed your food is, based on",
    novaLink: "NOVA classification",
    tryThese: "Try these:",
    didYouKnow: "Did you know?",
    betterTab: "😮 Better than you think",
    worseTab: "😬 Worse than you think",
    novaModalTitle: "What is NOVA classification?",
    novaModalBody: "NOVA is a food classification system that groups foods into 4 categories based on the extent and purpose of their processing.",
    novaG1: "Group 1 — Unprocessed or minimally processed foods (fruits, vegetables, eggs, meat)",
    novaG2: "Group 2 — Processed culinary ingredients (oils, butter, sugar, salt)",
    novaG3: "Group 3 — Processed foods (canned goods, cheese, cured meats, freshly baked bread)",
    novaG4: "Group 4 — Ultra-processed foods (soft drinks, packaged snacks, instant noodles, reconstituted meat products)",
    novaResearch: "Research links high consumption of ultra-processed foods to increased risk of obesity, diabetes, and cardiovascular disease.",
    novaLearnMore: "Learn more at Harvard T.H. Chan School of Public Health →",
    footerDisclaimer: "FoodLens is for information only — not medical or dietary advice.",
    footerPrivacy: "Privacy Policy",
    footerIngredients: "Ingredient Dictionary",
    footerNova: "What is NOVA classification?",
    notFoundTitle: "We couldn't find that one",
    notFoundDesc: "Try a food name like \"oatly\", \"banana\" or \"cornflakes\" — the more specific the better.",
    brand: "Brand",
    commonBrands: "Common brands in Sweden:",
    ingredientsLabel: "Ingredients",
    why: "Why?",
    harmfulIngredientsLabel: "Potentially harmful ingredients:",
    understandIngredients: "Understand these ingredients →",
    betterChoiceLabel: "💚 Better choice:",
    processLevel: "Process level",
    estimatedNote: "📊 Based on how this type of food is typically made - good to check the label too",
    offNote: "✓ Data sourced from OpenFoodFacts",
    ingredientsBack: "← Back to FoodLens",
    ingredientsPageTitle: "What's in your food?",
    ingredientsPageSubtitle: "Common food ingredients explained in plain English — what they are, why they're used, and whether to worry.",
    ingredientsSearchPlaceholder: "Search an ingredient...",
    marketingNote: "These aren't ingredients — they're claims on packaging that are often misunderstood.",
    ingredientCount: (n) => `${n} ingredient${n !== 1 ? "s" : ""}`,
    noIngredientsFound: "No ingredients found — try a different search",
    whatItIs: "What it is",
    whyUsed: "Why it's used",
    shouldWorry: "Should I worry?",
    foundIn: "Commonly found in",
    categoryAll: "All",
    categoryENumbers: "E-numbers",
    categoryPreservatives: "Preservatives",
    categorySweeteners: "Sweeteners",
    categoryFats: "Fats & Oils",
    categoryThickeners: "Thickeners & Stabilisers",
    categoryFlavour: "Flavour",
    categoryMarketing: "Marketing terms",
    privacyBack: "← Back to FoodLens",
    privacyTitle: "Privacy Policy",
    privacyUpdated: "Last updated: May 3, 2026",
    privacyIntroHeading: "Introduction",
    privacyIntroBody: "FoodLens (\"we\", \"our\", or \"us\") operates the FoodLens website and application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.",
    privacyDataCollHeading: "Data Collection",
    privacyDataCollBody: "We collect information you provide directly to us, such as when you search for food products or submit queries. This may include:",
    privacyDataCollItems: [
      "Search queries and food product information you enter",
      "Device information and usage analytics",
      "Browser data and IP address",
    ],
    privacyUseHeading: "How We Use Your Data",
    privacyUseBody: "We use the collected data for the following purposes:",
    privacyUseItems: [
      "To provide and improve our service",
      "To analyze usage patterns and optimize the user experience",
      "To monitor and troubleshoot technical issues",
      "To comply with legal obligations",
    ],
    privacySecurityHeading: "Data Security",
    privacySecurityBody: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
    privacyThirdPartyHeading: "Third-Party Services",
    privacyThirdPartyBody: "FoodLens may use third-party services to enhance functionality, including OpenFoodFacts for food product information. We are not responsible for the privacy practices of third parties and encourage you to review their privacy policies.",
    privacySourcesHeading: "Data Sources",
    privacySourcesBody: "Food data is sourced from world.openfoodfacts.org, an open collaborative database licensed under the Open Database License (ODbL). FoodLens is not affiliated with OpenFoodFacts.",
    privacyCookiesHeading: "Cookies",
    privacyCookiesBody: "We may use cookies and similar tracking technologies to track activity on our service and maintain preferences. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
    privacyRightsHeading: "Your Rights",
    privacyRightsBody: "Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete your data. Please contact us to exercise these rights.",
    privacyChildrenHeading: "Children's Privacy",
    privacyChildrenBody: "FoodLens does not knowingly collect personally identifiable information from anyone under the age of 13. If we become aware that a child under 13 has provided us with personal data, we will delete such information immediately.",
    privacyChangesHeading: "Changes to This Privacy Policy",
    privacyChangesBody: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date at the top.",
    privacyContactHeading: "Contact Us",
    privacyContactBody: "If you have any questions about this Privacy Policy or our privacy practices, please contact us. We will respond to your inquiry within 30 days.",
  },
};
