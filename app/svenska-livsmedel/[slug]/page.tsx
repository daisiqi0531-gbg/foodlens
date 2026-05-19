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

  "kaviar": {
    title: "Är kaviar (tub) nyttigt?",
    subtitle: "Ser ut som ett enkelt fiskpålägg — men ingredienslistan berättar en annan historia.",
    emoji: "🐟",
    level: 4,
    levelName: "Ultrabearbetat",
    verdict: "🫣 En njutning — inte vardagsmat",
    intro: "Kaviar på tub är en svensk frukostklassiker — på knäckebrödet, i ägget, på smörgåsen. Den lilla blå tuben verkar oskyldig. Men när vi kollar ingredienslistan hamnar kaviar på NOVA-nivå 4, samma kategori som chips och falukorv.",
    sections: [
      {
        heading: "Vad innehåller kaviar på tub?",
        body: "Kaviar på tub innehåller fisk och rom — men också E471 (emulgator), modifierad stärkelse, socker, smakämnen och konserveringsmedel. Det är dessa industriella tillsatser som placerar den i nivå 4. Riktig löjrom eller naturlig kaviar har en helt annan och mycket kortare ingredienslista.",
      },
      {
        heading: "Varför behövs alla tillsatser?",
        body: "Tuben ska hålla länge i kylskåpet utan att separera — det kräver emulgatorer och stabilisatorer. Smaken ska vara konsekvent och intensiv — det kräver smakämnen. Resultatet är en produkt som smakar kaviar men är industriellt reformulerad.",
      },
      {
        heading: "Vad är ett renare alternativ?",
        body: "Äkta löjrom eller naturlig kallrökt lax har dramatiskt kortare ingredienslistor och är nivå 1-2. De kostar mer men är genuina livsmedel utan industriella tillsatser. Om du äter kaviar på tub regelbundet är det värt att veta vad som finns i den.",
      },
      {
        heading: "Ska man sluta äta den?",
        body: "Inte nödvändigtvis — men det är bra att veta att det är ett ultrabearbetat livsmedel. En klick på knäckebrödet ibland är ingen katastrof. Gör den bara inte till en daglig vana utan att förstå vad som finns i tuben.",
      },
    ],
    conclusion: "Kaviar på tub är ett bra exempel på hur ett livsmedel kan se enkelt ut men vara industriellt bearbetat. Ät den ibland, men välj äkta fisk och rom när du kan.",
    cta: "Kolla en annan mat på FoodLens →",
  },

  "musli": {
    title: "Är müsli nyttigt?",
    subtitle: "Hälsofrukostens kung — men ofta mer socker än cornflakes.",
    emoji: "🥣",
    level: 4,
    levelName: "Ultrabearbetat",
    verdict: "🫣 Kolla ingredienslistan noga",
    intro: "Müsli säljs i kraftpapperförpackningar med bilder på nötter och bär och ord som 'naturlig' och 'nyttig'. Det känns som det hälsosammaste frukostalternativet i butiken. Men de flesta färdigmüsli är nivå 3-4 och kan innehålla mer socker per 100g än vanliga cornflakes.",
    sections: [
      {
        heading: "Vad innehåller färdigmüsli?",
        body: "Basen är havre och nötter — det låter bra. Men färdigmüsli tillsätter glukossirap, socker, palmfett, artificiella smakämnen och ibland chokladbitar eller kanderade frukter. Det är dessa ingredienser som höjer bearbetningsnivån till 3-4.",
      },
      {
        heading: "Hur mycket socker kan det vara?",
        body: "En del kommersiell müsli innehåller 25-30g socker per 100g — mer än många godissorter. Framsidan på förpackningen berättar sällan detta. Kolla alltid näringsvärdet på baksidan, inte framsidans hälsopåståenden.",
      },
      {
        heading: "Finns det ren müsli?",
        body: "Ja — men du måste leta. Kolla ingredienslistan och välj varianter med bara havre, nötter, frön och eventuellt lite torkad frukt utan tillsatt socker. Ingredienslistan ska vara kort och igenkännlig.",
      },
      {
        heading: "Gör din egen",
        body: "Blanda havregryn, nötter, frön och lite torkad frukt själv. Du kontrollerar vad som går i, och havregryn är nivå 1. Det tar fem minuter och kostar mindre än märkesmüsli.",
      },
    ],
    conclusion: "Müsli kan vara ett utmärkt val — men kolla alltid ingredienslistan. Den med kortast lista och minst tillsatt socker vinner. Eller gör din egen med havregryn som bas.",
    cta: "Kolla en annan mat på FoodLens →",
  },

  "proteinbrod": {
    title: "Är proteinbröd nyttigt?",
    subtitle: "Högt protein låter bra — men de flesta proteinbröd är mer bearbetade än vanligt bröd.",
    emoji: "🍞",
    level: 4,
    levelName: "Ultrabearbetat",
    verdict: "🫣 En njutning — inte hälsobröd",
    intro: "Proteinbröd marknadsförs till fitnessentusiaster och hälsomedvetna konsumenter. Högt protein, låg kolhydrat, perfekt för dig som tränar. Men när vi kollar NOVA-klassificeringen är de flesta proteinbröd nivå 4 — mer bearbetade än vanligt vitt bröd.",
    sections: [
      {
        heading: "Vad innehåller proteinbröd?",
        body: "Proteinet i proteinbröd kommer ofta från isolat — vassleprotein, sojaprotein eller ärtprotein som extraherats industriellt. Till det läggs E471, modifierad stärkelse, glukossirap och en rad stabilisatorer för att hålla brödet ihop trots den ovanliga sammansättningen. Ingredienslistan är ofta längre än vanligt bröd.",
      },
      {
        heading: "Är proteinet bra?",
        body: "Proteinet är verkligt — men det levereras med ett paket industriella tillsatser. Samma mängd protein finns i ägg, kvarg eller kyckling utan någon av dessa tillsatser. Proteinet neutraliserar inte resten av ingredienslistan.",
      },
      {
        heading: "Hur jämförs det med vanligt bröd?",
        body: "Vanligt surdegsbröd från ett bageri med 4-5 ingredienser är nivå 3. Proteinbröd med 15+ ingredienser är nivå 4. Paradoxalt nog är det 'vanliga' brödet ofta renare än hälsobrödet.",
      },
      {
        heading: "Vad är bättre?",
        body: "Välj bröd med kortast möjliga ingredienslista — surdeg, rågbröd eller knäckebröd med bara mjöl, vatten och salt. Få ditt protein från ägg, kvarg eller kött istället för bearbetat proteinbröd.",
      },
    ],
    conclusion: "Proteinbröd är ett bra exempel på hur hälsopåståenden kan dölja hög bearbetningsgrad. Högt protein och rent livsmedel är inte samma sak. Välj enkelt bröd och äkta proteinkällor.",
    cta: "Kolla en annan mat på FoodLens →",
  },

  "smaksatt-kvarg": {
    title: "Är smaksatt kvarg nyttigt?",
    subtitle: "Naturell kvarg är nivå 2. Smaksatt kvarg är nivå 4. Samma förpackning — helt olika produkt.",
    emoji: "🫙",
    level: 4,
    levelName: "Ultrabearbetat",
    verdict: "🫣 Välj naturell istället",
    intro: "Kvarg har ett välförtjänt hälsosammare rykte — och naturell kvarg lever upp till det. Men smaksatt kvarg är en helt annan produkt. Trots att de säljs sida vid sida i mejeriavdelningen är skillnaden i bearbetningsgrad dramatisk.",
    sections: [
      {
        heading: "Vad är skillnaden?",
        body: "Naturell kvarg: mjölk och mjölksyrekulturer — nivå 2. Smaksatt kvarg (jordgubb, vanilj, choklad): tillsätter glukossirap, artificiella smakämnen, E471, modifierad stärkelse och ibland konstgjorda färger — nivå 4. Samma proteinhalt, helt olika bearbetningsgrad.",
      },
      {
        heading: "Varför köper folk smaksatt?",
        body: "Den smakar bättre direkt ur förpackningen. Men smaken kommer från industriella smakämnen och socker — inte från riktiga jordgubbar. En naturell kvarg med färska bär är godare och dramatiskt renare.",
      },
      {
        heading: "Hur mycket socker tillsätts?",
        body: "Smaksatt kvarg kan innehålla 10-15g socker per 100g — mer än många folk förväntar sig av en 'hälsoprodukt'. Naturell kvarg har naturligt förekommande mjölksocker men inget tillsatt.",
      },
      {
        heading: "Gör din egen smaksatta kvarg",
        body: "Naturell kvarg med egna bär, lite honung och kanske lite vaniljpulver ger samma smakupplevelse med en bråkdel av bearbetningen. Du kontrollerar vad som går i och basen är nivå 2.",
      },
    ],
    conclusion: "Smaksatt kvarg är ett tydligt exempel på hur samma råvara kan bearbetas till en helt annan produkt. Välj alltid naturell och lägg till egna smaker.",
    cta: "Kolla en annan mat på FoodLens →",
  },

  "fruktyoghurt": {
    title: "Är fruktyoghurt nyttigt?",
    subtitle: "Det är yoghurt, eller? Nej — det är dessert i yoghurtförpackning.",
    emoji: "🍓",
    level: 4,
    levelName: "Ultrabearbetat",
    verdict: "🫣 Närmre dessert än hälsomat",
    intro: "Fruktyoghurt är en av de mest missförstådda produkterna i svenska butiker. Den säljs i mejeriavdelningen, den marknadsförs med fruktbilder och hälsopåståenden, och de flesta tror att det är ett bra frukost- eller mellanmålsval. Men NOVA-klassificeringen placerar den på nivå 4.",
    sections: [
      {
        heading: "Vad innehåller fruktyoghurt?",
        body: "Basen är yoghurt — men till det tillsätts glukossirap, artificiell jordgubbssmak, E471, modifierad stärkelse och ibland artificiella färger. Den faktiska frukten är ofta minimal — smaken kommer från industriella smakämnen.",
      },
      {
        heading: "Hur mycket socker är det?",
        body: "En vanlig fruktyoghurt innehåller 12-18g socker per 100g. En liten förpackning på 150g kan innehålla nästan lika mycket socker som en chokladkaka. Förpackningens framsida berättar sällan detta.",
      },
      {
        heading: "Är lättyoghurt bättre?",
        body: "Nej — ofta sämre. Lättyoghurt ersätter fettet med mer socker, fler smakämnen och fler stabilisatorer. Den är mer bearbetad än fullfetvarianten och håller dig inte lika mätt.",
      },
      {
        heading: "Vad ska man äta istället?",
        body: "Naturell yoghurt, kvarg eller filmjölk med egna bär och lite honung. Du får samma frukiga smak med ett renare baslivsmedel och full kontroll över sockerinnehållet.",
      },
    ],
    conclusion: "Fruktyoghurt är ett av de tydligaste exemplen på hälsowashing i svenska butiker. Välj naturell och lägg till din egen frukt — det är godare, renare och du vet vad du äter.",
    cta: "Kolla en annan mat på FoodLens →",
  },

  "fiskpinnar": {
    title: "Är fiskpinnar nyttiga?",
    subtitle: "Barnfavoriten som ser oskyldig ut — men är industriellt bearbetad.",
    emoji: "🐠",
    level: 4,
    levelName: "Ultrabearbetat",
    verdict: "🫣 Ibland okej — men inte barnmat att äta varje dag",
    intro: "Fiskpinnar är en av de vanligaste barnmiddagarna i Sverige. De är snabba att laga, barn älskar dem, och de verkar hälsosamma — det är ju fisk. Men fiskpinnar är nivå 4 ultrabearbetat, och det är värt att förstå varför.",
    sections: [
      {
        heading: "Vad innehåller fiskpinnar?",
        body: "Fiskinnehållet varierar mellan märken — ofta 50-65% fisk. Resten är panering av vetemjöl, E450 (fosfater), modifierad stärkelse, salt och smakämnen. Fosfater tillsätts för att hålla fisken saftig och panering fast — de är inte naturliga i hemlagad panerad fisk.",
      },
      {
        heading: "Är fisken i dem bra?",
        body: "Fisken i sig är bra — men den levereras med industriell panering och tillsatser. En hemlagad panerad fisk med bara fisk, ägg och ströbröd är dramatiskt renare och har samma smak.",
      },
      {
        heading: "Varför äter barn dem så ofta?",
        body: "De är bekväma, billiga och barn gillar smaken. Men bekvämlighet och näringsvärde är inte samma sak. Det finns inget fel med att servera dem ibland — men de bör inte vara barnets dagliga fiskintag.",
      },
      {
        heading: "Bättre fiskalternativ för barn",
        body: "Laxfilé, torskfilé eller makrill — tillagad enkelt med lite smör och citron — är nivå 1 och har ett helt annat näringsvärde. Det tar 10 minuter och barn vänjer sig snabbt om det introduceras tidigt.",
      },
    ],
    conclusion: "Fiskpinnar ibland är ingen katastrof — men de är ultrabearbetad mat, inte ett hälsosamt barnmat-alternativ. Blanda dem med riktig fisk för en bättre balans.",
    cta: "Kolla en annan mat på FoodLens →",
  },

  "leverpastej": {
    title: "Är leverpastej nyttigt?",
    subtitle: "En svensk klassiker på smörgåsen — men innehåller natriumnitrit.",
    emoji: "🥪",
    level: 4,
    levelName: "Ultrabearbetat",
    verdict: "🫣 Spara till helgen",
    intro: "Leverpastej på knäckebrödet är ett av Sveriges mest klassiska mellanmål. Den smakar bra, den mättar, och den verkar som ett naturligt val. Men leverpastej innehåller natriumnitrit — samma konserveringsmedel som finns i bacon och falukorv — och är nivå 4 ultrabearbetat.",
    sections: [
      {
        heading: "Vad innehåller leverpastej?",
        body: "Fläsklever och fett — men också natriumnitrit (E250), E471 (emulgator), modifierad stärkelse och smakämnen. Natriumnitrit ger pastejen dess rosa färg och förhindrar farliga bakterier — men WHO klassar bearbetade köttprodukter med nitriter som Grupp 1-cancerframkallande.",
      },
      {
        heading: "Är lever i sig nyttigt?",
        body: "Ja — lever är ett av de mest näringsrika livsmedlen som finns, rikt på järn, B-vitaminer och A-vitamin. Problemet är inte levern — det är de industriella tillsatserna som omger den i pastejformen.",
      },
      {
        heading: "Hur ofta kan man äta den?",
        body: "Leverpastej ibland är okej. WHO:s varning gäller vid hög konsumtion av bearbetat kött — inte en klick på smörgåsen en gång i veckan. Men om du äter det dagligen är det värt att tänka på alternativ.",
      },
      {
        heading: "Renare alternativ",
        body: "Äkta stekt lever med lök är nivå 1 och dramatiskt mer näringsrikt än pastej. Avokado, ägg eller naturlig ost är bra pålägg som ger mättnad utan nitriter.",
      },
    ],
    conclusion: "Leverpastej är god och mättande men ultrabearbetat med natriumnitrit. Ät den ibland — men inte som dagligt pålägg. Välj renare alternativ till vardags.",
    cta: "Kolla en annan mat på FoodLens →",
  },

  "cottage-cheese": {
    title: "Är cottage cheese nyttigt?",
    subtitle: "Ser industriellt ut — men är egentligen bara mjölk och kulturer.",
    emoji: "🧀",
    level: 2,
    levelName: "Vardagsmat",
    verdict: "😊 Bra vardagsmat — ett av de renaste mejerisnacksen",
    intro: "Cottage cheese ser ut som något som tillverkats i en fabrik — vita klumpar i en plastburk, konstigt utseende. Men ingredienslistan berättar en helt annan historia. Cottage cheese är ett av de renaste mejerisnacksen du kan köpa.",
    sections: [
      {
        heading: "Vad innehåller cottage cheese?",
        body: "Mjölk, grädde, mjölksyrekulturer och salt — ibland bara de tre första. Det är allt. Ingen modifierad stärkelse, inga emulgatorer, inga smakämnen. Trots det industriella utseendet är det ett remarkabelt rent livsmedel på nivå 2.",
      },
      {
        heading: "Hur mycket protein innehåller det?",
        body: "Cottage cheese innehåller 11-13g protein per 100g — jämförbart med kvarg. Det gör det till ett utmärkt proteinalternativ för den som tränar eller vill hålla sig mätt länge.",
      },
      {
        heading: "Hur äter man det?",
        body: "Med bär och lite honung som frukost, som fyllning i wrap, som dip med grönsaker, eller bara med lite salt och peppar. Den neutrala smaken gör det flexibelt i matlagning.",
      },
      {
        heading: "Vad ska man undvika?",
        body: "Smaksatta varianter tillsätter socker och smakämnen som höjer bearbetningsnivån. Välj alltid naturell och lägg till egna smaker.",
      },
    ],
    conclusion: "Cottage cheese förtjänar sitt hälsosammare rykte — det är ett av de renaste mejerisnacksen i svenska butiker. Låt inte utseendet lura dig.",
    cta: "Kolla en annan mat på FoodLens →",
  },

  "naturell-kvarg": {
    title: "Är naturell kvarg nyttigt?",
    subtitle: "Proteintrendens renaste val — bara silet mjölk.",
    emoji: "🫙",
    level: 2,
    levelName: "Vardagsmat",
    verdict: "😊 Bra vardagsmat — ett av de renaste proteinalternativen",
    intro: "Kvarg har exploderat i popularitet i Sverige — och till skillnad från många andra hälsotrender lever naturell kvarg faktiskt upp till sitt rykte. Det är ett av de renaste proteinalternativen i mejeriavdelningen.",
    sections: [
      {
        heading: "Vad är kvarg egentligen?",
        body: "Kvarg är silet mjölk — vasslen tas bort för att koncentrera proteinet. Ingredienslistan är kort: mjölk och mjölksyrekulturer. Det är nivå 2, ett baslivsmedel med minimal bearbetning trots det höga proteininnehållet.",
      },
      {
        heading: "Hur jämförs naturell mot smaksatt?",
        body: "Naturell kvarg är nivå 2 med 2-3 ingredienser. Smaksatt kvarg är nivå 4 med glukossirap, artificiella smakämnen och emulgatorer. Välj alltid naturell och lägg till egna smaker.",
      },
      {
        heading: "Är det bättre än proteinbars?",
        body: "Dramatiskt renare. En proteinbar med samma mängd protein innehåller maltodextrin, sukralos och artificiella smakämnen — nivå 4. Kvarg ger samma protein med en bråkdel av bearbetningen och är ofta billigare.",
      },
      {
        heading: "Hur äter man det?",
        body: "Med bär och honung, i smoothies, som bas i såser istället för gräddfil, eller direkt ur burken. Lindahls och Arla har bra naturella varianter.",
      },
    ],
    conclusion: "Naturell kvarg är ett av de bästa proteinalternativen i svenska butiker — rent, billigt och mångsidigt. Välj alltid naturell och smaksätt själv.",
    cta: "Kolla en annan mat på FoodLens →",
  },

  "creme-fraiche": {
    title: "Är crème fraiche nyttigt?",
    subtitle: "Folk undviker det för fettet — men det är ett av kökets renaste ingredienser.",
    emoji: "🥛",
    level: 2,
    levelName: "Vardagsmat",
    verdict: "😊 Bra vardagsmat — använd det i matlagning utan skuldkänslor",
    intro: "Crème fraiche undviks av många som försöker äta hälsosamt — för mycket fett, för många kalorier. Men ur ett NOVA-perspektiv är crème fraiche ett av de renaste mejeriprodukterna du kan köpa.",
    sections: [
      {
        heading: "Vad innehåller crème fraiche?",
        body: "Grädde och mjölksyrekulturer — ibland med lite salt. Det är allt. Inga emulgatorer, inga stabilisatorer, inga industriella tillsatser. Den korta ingredienslistan placerar den i NOVA-nivå 2.",
      },
      {
        heading: "Hur jämförs det med matlagningsgrädde?",
        body: "Matlagningsgrädde är nivå 1-2 — vanlig grädde. Crème fraiche är samma råvara men fermenterad, vilket ger den tjockare konsistens och syra. Båda är rena val i matlagning.",
      },
      {
        heading: "Är fettet ett problem?",
        body: "Fett från naturliga mejeriprodukter är inte det hälsoproblem det en gång utpekades som. Crème fraiche i normala mängder som del av en varierad kost är inget att oroa sig för — särskilt jämfört med de industriella alternativ som marknadsförs som lättare.",
      },
      {
        heading: "Hur använder man det?",
        body: "I såser, soppor, som topping på tacos eller baked potato, i bakning eller som dip. Det tål hög värme utan att skära sig — vilket gör det utmärkt i varm matlagning.",
      },
    ],
    conclusion: "Crème fraiche är ett rent baslivsmedel som förtjänar sin plats i köket. Undvik det inte för fettets skull — det är renare än många av de 'lättare' alternativen.",
    cta: "Kolla en annan mat på FoodLens →",
  },

  "helfett-mjolk": {
    title: "Är helfett mjölk nyttigt?",
    subtitle: "Lättmjölk marknadsförs som hälsosammare — men helfett är faktiskt renare.",
    emoji: "🥛",
    level: 2,
    levelName: "Vardagsmat",
    verdict: "😊 Bra vardagsmat — renare än lättmjölk",
    intro: "I decennier har lättmjölk och minimjölk marknadsförts som det hälsosammare valet. Men ur ett NOVA-perspektiv är helfett mjölk faktiskt renare — och forskningen om mättat fett från mejeri är mer nyanserad än vad vi fick lära oss.",
    sections: [
      {
        heading: "Vad är skillnaden?",
        body: "Helfett mjölk är mjölk — nivå 1. Lättmjölk är mjölk där fett avlägsnats industriellt, och ibland tillsätts vitaminer och stabilisatorer för att kompensera — nivå 2-3 beroende på märke. Ju mer bearbetat, desto längre ingredienslista.",
      },
      {
        heading: "Är det mättade fettet farligt?",
        body: "Aktuell forskning tyder på att mättat fett från mejeriprodukter inte är lika problematiskt som från processade köttprodukter. Mjölkfett innehåller en komplex blandning av fettsyror som kroppen hanterar annorlunda än industriella fetter.",
      },
      {
        heading: "Håller helfett mjölk dig mättare?",
        body: "Ja — fett bromsar tömningen av magen och håller blodsockret stabilare. Ett glas helfett mjölk håller dig mättare längre än samma mängd lättmjölk, vilket kan minska snackandet.",
      },
      {
        heading: "Vilket märke ska man välja?",
        body: "Arla och Skånemejerier har båda bra naturella alternativ. Välj ekologisk om det finns inom budget — men vanlig helfett mjölk är redan ett rent val.",
      },
    ],
    conclusion: "Helfett mjölk är renare och mer mättande än lättmjölk. Fettskräcken från 1980-talet håller på att skrivas om — och mejerifett är inte den bov det utpekades som.",
    cta: "Kolla en annan mat på FoodLens →",
  },

  "frysta-artor": {
    title: "Är frysta ärtor nyttiga?",
    subtitle: "Frysta grönsaker verkar bearbetade — men de fryses samma dag som de skördas.",
    emoji: "🫛",
    level: 1,
    levelName: "Så rent som det blir",
    verdict: "🌱 Så rent som det blir — ät dem varje dag",
    intro: "Det finns en utbredd uppfattning att färska grönsaker alltid är bättre än frysta. Men frysta ärtor är ett av de bästa exemplen på att frysning inte är bearbetning — de är NOVA-nivå 1 och kan faktiskt vara mer näringsrika än 'färska' ärtor som legat i butiken i dagar.",
    sections: [
      {
        heading: "Hur tillverkas frysta ärtor?",
        body: "Ärtor skördas, blancheras snabbt i varmt vatten för att bevara färgen, och fryses inom timmar efter skörd. Det är allt. Inga tillsatser, inga konserveringsmedel, inga industriella ingredienser. En ingrediens: ärtor.",
      },
      {
        heading: "Är de lika nyttiga som färska?",
        body: "Ja — och ibland mer. Färska ärtor i butik kan ha legat i transport och kylkedja i 3-5 dagar, under vilken tid näringsämnena bryts ner. Frysta ärtor behåller sina vitaminer bättre tack vare den snabba frysningen direkt efter skörd.",
      },
      {
        heading: "Gäller detta alla frysta grönsaker?",
        body: "De flesta frysta grönsaker utan tillsatser är nivå 1. Kolla ingredienslistan — den ska bara innehålla grönsaken ifråga. Frysta grönsaker med sås eller kryddning kan vara nivå 3-4.",
      },
      {
        heading: "Hur använder man dem bäst?",
        body: "Lägg dem direkt i grytor, soppor och pastarätter utan att tina dem först. De är snabbare att tillaga än färska och håller längre i frysen — ett utmärkt baslivsmedel att alltid ha hemma.",
      },
    ],
    conclusion: "Frysta ärtor är ett perfekt exempel på att 'bearbetat' inte alltid betyder dåligt. Frysning är minimalt bearbetning — och frysta ärtor är nivå 1, lika rena som färska.",
    cta: "Kolla en annan mat på FoodLens →",
  },

  "kikartor": {
    title: "Är kikärtor (konserv) nyttiga?",
    subtitle: "Konservburk låter bearbetat — men det är bara kikärtor och vatten.",
    emoji: "🫘",
    level: 2,
    levelName: "Vardagsmat",
    verdict: "😊 Bra vardagsmat — konserv betyder inte bearbetat här",
    intro: "Konservburkar har dåligt rykte i hälsosammanhang — men inte alla konserver är lika. Kikärtor på konserv är ett av de renaste livsmedlen du kan öppna ur en burk, och ett utmärkt exempel på att förpackningsform inte avgör bearbetningsgrad.",
    sections: [
      {
        heading: "Vad innehåller konservkikärtor?",
        body: "Kikärtor, vatten och ibland lite salt. Det är allt. Ingen modifierad stärkelse, inga emulgatorer, inga konserveringsmedel. Konserveringen sker genom värmebehandling, inte kemiska tillsatser — samma princip som att koka mat hemma.",
      },
      {
        heading: "Är de lika nyttiga som torkade?",
        body: "Nästan. Torkade kikärtor som du blötlägger och kokar själv är nivå 1. Konservkikärtor är nivå 2 på grund av konserveringsprocessen, men näringsvärdet är jämförbart. De sparar tid utan att offra mycket näringskvalitet.",
      },
      {
        heading: "Vad är de bra för?",
        body: "Kikärtor är rika på protein, fiber och komplexa kolhydrater. De håller blodsockret stabilt och håller dig mätt länge. De är en av de bästa växtbaserade proteinkällorna och passar i soppor, currys, hummus och sallader.",
      },
      {
        heading: "Vad ska man kolla på burken?",
        body: "Ingredienslistan ska vara kort — kikärtor, vatten, eventuellt salt. Välj märken utan tillsatt socker eller konserveringsmedel. ICA och Eldorado har bra basversioner.",
      },
    ],
    conclusion: "Konservkikärtor är ett av de enklaste sätten att äta rent och billigt. Öppna burken, skölj av och lägg i maten — det är allt som behövs.",
    cta: "Kolla en annan mat på FoodLens →",
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
          className="block w-full text-center border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-medium py-3 px-6 rounded-xl hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors mb-8"
        >
          Kolla en annan mat på FoodLens →
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
