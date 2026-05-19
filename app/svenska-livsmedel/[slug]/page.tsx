import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const articles: Record<string, {
  title: string;
  subtitle: string;
  emoji: string;
  level: number;
  levelName: string;
  verdict: string;
  intro: string;
  sections: { heading: string; body: string }[];
  conclusion: string;
  cta: string;
  englishSlug?: string;
}> = {

  "falukorv": {
    title: "Är falukorv nyttigt?",
    subtitle: "En svensk klassiker — men vad är den egentligen gjord av?",
    emoji: "🌭",
    level: 4,
    levelName: "Ultrabearbetat",
    verdict: "🫣 En njutning — inte vardagsmat",
    englishSlug: "is-falukorv-healthy",
    intro: "Falukorv är en av Sveriges mest älskade maträtter. Stekt med makaroner, inbakad i pajdeg eller skivad på smörgåsen — den finns i nästan varje svensk kylskåp. Men när vi kollar NOVA-klassificeringen hamnar falukorv på nivå 4, samma kategori som chips och snabbmat. Här är varför.",
    sections: [
      {
        heading: "Vad är falukorv egentligen gjord av?",
        body: "Falukorv innehåller nötköttsfyllning, griskött och svål — men också natriumnitrit (konserveringsmedel), E450 (fosfater), modifierad stärkelse och smakämnen. Det är dessa tillsatser som placerar den i NOVA-nivå 4. En vanlig köttbit är nivå 1. Falukorv är industriellt bearbetad med ingredienser du aldrig skulle använda hemma.",
      },
      {
        heading: "Vad gör natriumnitrit?",
        body: "Natriumnitrit är det konserveringsmedel som ger falukorv dess karakteristiska rosa färg och förhindrar farliga bakterier. WHO klassificerar bearbetade köttprodukter som innehåller nitriter som Grupp 1-cancerframkallande ämnen — samma kategori som tobak. Det betyder inte att du får cancer av att äta falukorv ibland, men det är ett skäl att inte äta den varje dag.",
      },
      {
        heading: "Hur skiljer den sig från vanligt kött?",
        body: "En kycklingfilé är nivå 1 — bara kött, inga tillsatser. Falukorv är nivå 4 på grund av de industriella ingredienserna. Det är samma skillnad som mellan en hel tomat och ketchup — råvaran finns där, men den är omgiven av industriell bearbetning.",
      },
      {
        heading: "Vad kan man äta istället?",
        body: "Kycklingfilé, kalkonbröst eller fisk är alla nivå 1 med liknande mättnadskänsla men utan tillsatserna. Om du älskar falukorv — ät den ibland, njut av den, men gör inte den till en daglig middagsvana.",
      },
    ],
    conclusion: "Falukorv är en del av den svenska matkulturen och det är okej att äta den ibland. Men den är ultrabearbetad mat och inte något du bör äta varje dag. Välj obearbetat kött till vardags och spara falukorven till fredagsmyset.",
    cta: "Kolla falukorv på FoodLens →",
  },

  "oatly": {
    title: "Är Oatly verkligen nyttigt?",
    subtitle: "Havremjölk är ett stort trendval — men är det så rent som folk tror?",
    emoji: "🥛",
    level: 3,
    levelName: "Måttligt bearbetat",
    verdict: "🤔 Okej ibland — kolla innehållsförteckningen",
    englishSlug: "is-oat-milk-healthy",
    intro: "Oatly har blivit en symbol för hälsosamt och hållbart drickande. Havremjölk i kaffet, i smoothien, på flingorna — det känns som ett rent val. Men Oatly är nivå 3 bearbetat, och det finns skäl att förstå vad som faktiskt finns i förpackningen.",
    sections: [
      {
        heading: "Vad innehåller Oatly?",
        body: "Oatly Havredryck innehåller havre, vatten, rapsolja, salt och dipotatiumfosfat. Det är relativt kort ingredienslista — men rapsoljan och stabilisatorn är industriella tillsatser som inte finns i vanlig mjölk eller hemlagad havremjölk. Barista-versionen innehåller ytterligare tillsatser för att förbättra skumning.",
      },
      {
        heading: "Är det renare än komjölk?",
        body: "Komjölk är nivå 1-2 — det är bara mjölk. Oatly är nivå 3 på grund av tillsatserna och den industriella enzymatiska process som krävs för att bryta ner haverstärkelsen. Det betyder inte att Oatly är dåligt — men det är mer bearbetat än vanlig mjölk, vilket överraskar många.",
      },
      {
        heading: "Vad säger miljöargumentet?",
        body: "Oatly har lägre klimatavtryck än komjölk — det är verkligt. Men miljömässig hållbarhet och NOVA-bearbetningsnivå är separata saker. Du kan välja havremjölk av miljöskäl och samtidigt förstå att det är mer bearbetat än hel mjölk.",
      },
      {
        heading: "Vilken havremjölk är renast?",
        body: "Kolla ingredienslistan. Vissa märken har bara 3-4 ingredienser — havre, vatten, salt och eventuellt rapsolja. Undvik versioner med tillsatt socker, smakämnen eller långa stabilisatorlistor. Vanliga versioner är renare än barista-varianter.",
      },
    ],
    conclusion: "Oatly är ett rimligt val — särskilt av miljöskäl. Men det är inte en helfood och det är mer bearbetat än komjölk. Om du dricker det dagligen, välj den renaste versionen du hittar och kolla innehållsförteckningen.",
    cta: "Kolla Oatly på FoodLens →",
  },

  "smor": {
    title: "Är smör nyttigt?",
    subtitle: "Smör har fått dåligt rykte i decennier — men är det verkligen förtjänt?",
    emoji: "🧈",
    level: 2,
    levelName: "Vardagsmat",
    verdict: "😊 Bra vardagsmat — använd det utan skuldkänslor",
    englishSlug: "is-butter-healthy",
    intro: "Smör har under decennier pekats ut som en hälsofara — för mycket mättat fett, för många kalorier, byt till margarin. Men när vi kollar NOVA-klassificeringen är smör nivå 2, en av de renaste mejeriprodukterna du kan köpa. Och margarin? Ofta nivå 4.",
    sections: [
      {
        heading: "Vad innehåller smör?",
        body: "Smör innehåller grädde och salt — ibland bara grädde. Det är det. Inga emulgatorer, inga stabilisatorer, inga industriella tillsatser. Den korta ingredienslistan placerar smör i NOVA-nivå 2, tillsammans med olivolja och andra baslivsmedel.",
      },
      {
        heading: "Vad är det med det mättade fettet?",
        body: "Forskningen om mättat fett och hjärthälsa är mer nyanserad än vad som kommunicerades under 1980- och 90-talen. Nuvarande evidens tyder på att smör i normala mängder som del av en varierad kost inte är det hälsoproblem man tidigare trodde. Det råa fettinnehållet är inte detsamma som graden av bearbetning.",
      },
      {
        heading: "Hur jämförs det med margarin?",
        body: "Margarin marknadsförs ofta som ett hälsosammare alternativ till smör — men de flesta margariner är nivå 3-4 med långa ingredienslistor som inkluderar härdade fetter, emulgatorer och smakämnen. Smör med sina 1-2 ingredienser är dramatiskt renare än de flesta margariner.",
      },
      {
        heading: "Hur ska man använda smör?",
        body: "Smör är utmärkt för stekning, bakning och som pålägg. Det är ett baslivsmedel som använts i tusentals år. Använd det i matlagning utan skuldkänslor — det är ett av de renaste fetterna du kan köpa i en svensk matbutik.",
      },
    ],
    conclusion: "Smör är inte den hälsofara det en gång utpekades som. Det är ett baslivsmedel med kort ingredienslista och minimal bearbetning. Margarin är ofta ett sämre val ur ett NOVA-perspektiv, trots att det marknadsförs som hälsosammare.",
    cta: "Kolla smör på FoodLens →",
  },

  "havregryn": {
    title: "Är havregryn nyttigt?",
    subtitle: "Den klassiska svenska frukosten — och en av de renaste maten du kan äta.",
    emoji: "🌾",
    level: 1,
    levelName: "Så rent som det blir",
    verdict: "🌱 Så rent som det blir — ät det varje dag",
    englishSlug: "is-oatmeal-healthy",
    intro: "Havregryn är en av de få livsmedel som faktiskt lever upp till sitt hälsosammare rykte. NOVA-nivå 1 — minimalt bearbetat, en ingrediens, inga tillsatser. Men det finns en viktig skillnad mellan vanliga havregryn och smaksatta snabbversioner.",
    sections: [
      {
        heading: "Vad innehåller havregryn?",
        body: "Vanliga havregryn innehåller en sak — havre. Det är ett helt korn som valserats till flingor. Ingen tillsatt socker, inga smakämnen, inga konserveringsmedel. Det är exakt det NOVA-nivå 1 handlar om: obearbetad eller minimalt bearbetad mat.",
      },
      {
        heading: "Vad är skillnaden mot smaksatta havreprodukter?",
        body: "Smaksatta snabbhavreflingor — jordgubb, choklad, honung — ser ut som havregryn men innehåller ofta glukossirap, artificiella smakämnen och maltodextrin. De är nivå 3-4. Samma råvara, men omgiven av industriella ingredienser. Alltid köp vanliga havregryn och lägg till egna toppings.",
      },
      {
        heading: "Varför är havregryn så bra?",
        body: "Havregryn innehåller betaglukan, en löslig fiber som är kopplad till lägre kolesterol och bättre blodsockerkontroll. De håller dig mätt länge på grund av den långsamma nedbrytningen. Som frukost är de ett av de vetenskapligt mest välstödda valen du kan göra.",
      },
      {
        heading: "Hur äter man dem bäst?",
        body: "Koka dem i vatten eller mjölk och lägg till egna toppings — bär, nötter, lite honung eller kanel. Du kontrollerar vad som går i, och basen är nivå 1. Det är dramatiskt renare och ofta billigare än färdigpaketerade frukostprodukter.",
      },
    ],
    conclusion: "Havregryn är en av de bästa frukostarna du kan äta — billig, mättande och nivå 1. Köp vanliga havregryn och undvik smaksatta versioner. Lägg till egna toppings så har du full kontroll.",
    cta: "Kolla havregryn på FoodLens →",
  },

  "kvarg": {
    title: "Är kvarg nyttigt?",
    subtitle: "Proteintrender och hälsokost — men vad är kvarg egentligen?",
    emoji: "🫙",
    level: 2,
    levelName: "Vardagsmat",
    verdict: "😊 Bra vardagsmat — ett av de renaste proteinsnacksen",
    englishSlug: "is-kvarg-healthy",
    intro: "Kvarg har blivit ett av Sveriges populäraste proteinalternativ — i gymmet, som mellanmål, som dessers med bär. Och till skillnad från många andra hälsotrendprodukter lever kvarg faktiskt upp till sitt rykte. Här är varför.",
    sections: [
      {
        heading: "Vad är kvarg egentligen?",
        body: "Kvarg är silet mjölk — mjölk som silen bort vassle ifrån för att koncentrera proteinet. Ingredienslistan är kort: mjölk och mjölksyrekulturer, ibland lite salt. Det är nivå 2, samma kategori som smör och olivolja. Trots att det ser ut som en bearbetad produkt är det remarkabelt rent.",
      },
      {
        heading: "Vad är skillnaden mot smaksatt kvarg?",
        body: "Naturell kvarg är nivå 2. Smaksatt kvarg — jordgubb, vanilj, choklad — innehåller ofta glukossirap, artificiella smakämnen och stabilisatorer som placerar den i nivå 3-4. Samma produkt som bas, men väldigt olika bearbetningsgrad. Köp alltid naturell och lägg till egna toppings.",
      },
      {
        heading: "Hur jämförs den med proteinbars?",
        body: "En proteinbar med samma mängd protein som kvarg innehåller ofta maltodextrin, sukralos, artificiella smakämnen och en rad emulgatorer — nivå 4. Kvarg med 2-3 ingredienser ger samma protein med en bråkdel av bearbetningen och är ofta billigare.",
      },
      {
        heading: "Hur äter man kvarg?",
        body: "Med bär och lite honung, som base i smoothies, i matlagning som ett alternativ till gräddfil, eller bara med en sked ur burken. Den neutrala smaken gör den flexibel och tillagd sönderbör den inte sina goda egenskaper.",
      },
    ],
    conclusion: "Kvarg är ett av de renaste proteinrika livsmedlen du kan köpa i Sverige. Välj naturell, lägg till egna smaker och du har ett utmärkt vardagssnack på nivå 2.",
    cta: "Kolla kvarg på FoodLens →",
  },

  "filmjolk": {
    title: "Är filmjölk nyttigt?",
    subtitle: "En svensk mejeriprodukt med lång historia — och en överraskande ren sammansättning.",
    emoji: "🥛",
    level: 2,
    levelName: "Vardagsmat",
    verdict: "😊 Bra vardagsmat — en av Sveriges renaste mejeriprodukter",
    englishSlug: "is-filmjolk-healthy",
    intro: "Filmjölk är en del av det svenska frukostbordet sedan generationer. Den fermenterade mjölken har en lång tradition och — visar det sig — en av de renaste ingredienslistorna du hittar i mejeriavdelningen.",
    sections: [
      {
        heading: "Vad innehåller filmjölk?",
        body: "Filmjölk innehåller mjölk och mjölksyrekulturer — ibland bara det. Det är ett fermenterat livsmedel, precis som yoghurt och kvarg, med en kort och igenkännlig ingredienslista. NOVA-nivå 2 är rätt placering för ett baslivsmedel med minimal bearbetning.",
      },
      {
        heading: "Vad är fermentering och varför är det bra?",
        body: "Fermentering innebär att bakterier omvandlar laktos till mjölksyra, vilket ger filmjölken dess karakteristiska sura smak. Fermenterade livsmedel är kopplade till bättre tarmhälsa och är lättare att smälta för de som är känsliga för laktos. Det är en av de äldsta konserveringsmetoderna som finns.",
      },
      {
        heading: "Är det bättre än vanlig mjölk?",
        body: "Vanlig mjölk är nivå 1-2, filmjölk är nivå 2 — de är jämförbara. Filmjölk tillför levande kulturer som vanlig mjölk inte har. Båda är rena alternativ. Välj det du föredrar smaken på.",
      },
      {
        heading: "Vad ska man undvika?",
        body: "Smaksatt filmjölk — jordgubb, vanilj — lägger till socker och smakämnen som höjer bearbetningsnivån. Naturell filmjölk är alltid det renaste valet. Lägg till egna toppings om du vill ha mer smak.",
      },
    ],
    conclusion: "Filmjölk är en av de renaste mejeriproduktena i svenska butiker. Välj naturell, ät den som frukost eller mellanmål, och du har ett äkta nivå 2-livsmedel med lång svensk tradition.",
    cta: "Kolla filmjölk på FoodLens →",
  },

  "knackebrod": {
    title: "Är knäckebröd nyttigt?",
    subtitle: "Sveriges mest ikoniska bröd — men alla knäckebröd är inte lika rena.",
    emoji: "🍞",
    level: 2,
    levelName: "Vardagsmat",
    verdict: "😊 Bra vardagsmat — men kolla ingredienslistan",
    englishSlug: "is-knackebrod-healthy",
    intro: "Knäckebröd är en stapelvara i svenska kök och har ett välförtjänt hälsosammare rykte. Men det finns stor skillnad mellan ett riktigt rent knäckebröd och de bearbetade varianterna med lång ingredienslista. Här är vad du ska titta efter.",
    sections: [
      {
        heading: "Vad innehåller ett rent knäckebröd?",
        body: "Det renaste knäckebrödet har bara 3-4 ingredienser — rågmjöl, vatten, salt och eventuellt jäst. Wasa Rågi Tunnbröd och Leksands original är exempel på knäckebröd med korta ingredienslistor. Dessa är nivå 2, ett baslivsmedel med minimal bearbetning.",
      },
      {
        heading: "Vilka knäckebröd är mer bearbetade?",
        body: "Smaksatta varianter — med frön, örter, ost eller söta varianter — innehåller ofta E471 (emulgator), glukossirap och smakämnen som höjer bearbetningsnivån till nivå 3. Kolla alltid ingredienslistan. Ju kortare, desto bättre.",
      },
      {
        heading: "Är det bättre än vanligt bröd?",
        body: "Vanligt slimmat bröd från butik innehåller ofta E471, kalciumpropionat och modifierad stärkelse — nivå 3-4. Rent knäckebröd är i de flesta fall renare än slimmat bröd och håller sig länge utan konserveringsmedel tack vare sin låga fukthalt.",
      },
      {
        heading: "Vad ska man toppa det med?",
        body: "Smör, ost, avokado, ägg — alla bra val. Undvik färdigförpackade pålägg med långa ingredienslistor. Det rena knäckebrödet förtjänar ett rent pålägg.",
      },
    ],
    conclusion: "Knäckebröd kan vara ett utmärkt val — men inte alla varianter är lika rena. Kolla ingredienslistan och välj en med 3-5 ingredienser. Wasa och Leksands har bra grundvarianter.",
    cta: "Kolla knäckebröd på FoodLens →",
  },

  "kottbullar": {
    title: "Är köttbullar nyttiga?",
    subtitle: "Hemgjorda eller färdigköpta — det gör stor skillnad på NOVA-nivån.",
    emoji: "🍖",
    level: 3,
    levelName: "Måttligt bearbetat",
    verdict: "🤔 Beror på — hemgjorda är nivå 2, färdigköpta är nivå 3-4",
    englishSlug: "are-meatballs-healthy",
    intro: "Köttbullar är Sveriges nationalrätt — och ett perfekt exempel på hur samma maträtt kan vara antingen nivå 2 eller nivå 4 beroende på om du gör dem själv eller köper dem färdiga. Här är skillnaden.",
    sections: [
      {
        heading: "Hemgjorda köttbullar — nivå 2",
        body: "Hemgjorda köttbullar har 5-6 ingredienser — nötfärs, ägg, lök, ströbröd, salt och peppar. Det är baslivsmedel, inga industritillsatser, nivå 2. Du vet exakt vad som finns i dem och kan anpassa efter smak.",
      },
      {
        heading: "Färdigköpta köttbullar — nivå 3-4",
        body: "Färdigköpta köttbullar innehåller ofta E450 (fosfater), modifierad stärkelse, smakämnen och ibland E621 (MSG). Fosfater används för att hålla köttbollarna ihop och ge dem en jämnare konsistens industriellt. Dessa tillsatser placerar dem i nivå 3-4.",
      },
      {
        heading: "Spelar det någon roll i praktiken?",
        body: "Färdigköpta köttbullar ibland är ingen katastrof. Men om du äter dem regelbundet är det värt att veta att hemgjorda är dramatiskt renare. Och hemgjorda köttbullar tar faktiskt inte mer än 20 minuter att göra.",
      },
      {
        heading: "Recept för renare köttbullar",
        body: "500g nötfärs, 1 ägg, 1 liten lök (riven), 2 msk ströbröd, salt och peppar. Blanda, rulla till bollar, stek i smör. Det är allt. Frys in en sats så har du alltid hemgjorda i frysen.",
      },
    ],
    conclusion: "Köttbullar är fantastiska — men det spelar roll om de är hemgjorda eller färdigköpta. Gör en stor sats hemgjorda ibland och frys in. Du får ett nivå 2-livsmedel med full kontroll över ingredienserna.",
    cta: "Kolla köttbullar på FoodLens →",
  },
};

const levelColor: Record<number, string> = {
  1: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/50",
  2: "text-lime-600 bg-lime-50 dark:text-lime-400 dark:bg-lime-950/50",
  3: "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/50",
  4: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/50",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};
  return {
    title: `${article.title} | FoodLens`,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      url: `https://foodlens.se/svenska-livsmedel/${slug}`,
    },
    alternates: {
      canonical: `https://foodlens.se/svenska-livsmedel/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function SwedishArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 pt-8 pb-16 font-sans">
      <div className="max-w-2xl mx-auto">

        {/* Back links */}
        <div className="flex gap-4 mb-6">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            ← FoodLens
          </Link>
          <Link
            href="/svenska-livsmedel"
            className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            ← Svenska livsmedel
          </Link>
          {article.englishSlug && (
            <Link
              href={`/blog/${article.englishSlug}`}
              className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ml-auto"
            >
              Read in English →
            </Link>
          )}
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[article.level]}`}>
              NOVA {article.level} — {article.levelName}
            </span>
            <span className="text-xs text-gray-400">3 min läsning</span>
          </div>
          <p className="text-4xl mb-4">{article.emoji}</p>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 leading-tight">
            {article.title}
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            {article.subtitle}
          </p>
        </div>

        {/* Verdict */}
        <div className={`rounded-xl p-4 mb-8 ${
          article.level <= 2
            ? "bg-green-50 dark:bg-green-950/30"
            : article.level === 3
            ? "bg-orange-50 dark:bg-orange-950/30"
            : "bg-red-50 dark:bg-red-950/30"
        }`}>
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            FoodLens-omdöme
          </p>
          <p className="text-lg font-semibold dark:text-white">
            {article.verdict}
          </p>
        </div>

        {/* Intro */}
        <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-8">
          {article.intro}
        </p>

        {/* Sections */}
        <div className="space-y-6 mb-8">
          {article.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                {section.heading}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-8">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
            {article.conclusion}
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="block w-full text-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-3 px-6 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors mb-8"
        >
          {article.cta}
        </Link>

        {/* Related articles */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
            Fler artiklar
          </p>
          <div className="space-y-2">
            {Object.entries(articles)
              .filter(([s]) => s !== slug)
              .slice(0, 3)
              .map(([s, a]) => (
                <Link
                  key={s}
                  href={`/svenska-livsmedel/${s}`}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-400 transition-colors"
                >
                  <span>{a.emoji}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-200">{a.title}</span>
                  <span className="ml-auto text-gray-300 dark:text-gray-600">→</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
