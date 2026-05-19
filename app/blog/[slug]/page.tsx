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
}> = {
  "is-granola-healthy": {
    title: "Is Granola Actually Healthy?",
    subtitle: "The breakfast food marketed as wholesome often has more sugar than cornflakes.",
    emoji: "🥣",
    level: 4,
    levelName: "Ultra processed",
    verdict: "🫣 Keep as a treat",
    intro: "Granola sits in the health food aisle, comes in kraft paper bags, and has words like 'natural', 'wholesome' and 'nutritious' printed on the front. But when you check the NOVA classification, most commercial granola lands at level 3 or 4 — the same category as crisps and fast food. Here is why.",
    sections: [
      {
        heading: "What is actually in granola?",
        body: "Traditional granola is just oats, nuts, seeds and a little honey — baked together. That version is level 2 at most. But the granola sold in most Swedish supermarkets is very different. Commercial granola typically contains glucose syrup, palm oil, artificial flavourings, and sometimes more sugar per 100g than a bowl of cornflakes. The oats are still there, but they are surrounded by industrial ingredients.",
      },
      {
        heading: "Why does it get a bad NOVA score?",
        body: "NOVA classification looks at the extent of processing and the presence of industrial ingredients not used in home cooking. Glucose syrup, palm oil and artificial flavourings are all classic ultra processed markers. Even granolas labelled 'natural' or 'organic' often contain these — because organic glucose syrup is still glucose syrup.",
      },
      {
        heading: "What should you look for?",
        body: "Check the ingredient list, not the front of the pack. A clean granola has 5-7 ingredients — oats, nuts, seeds, a natural sweetener like honey or maple syrup, and maybe some dried fruit. If you see glucose syrup, modified starch or anything you could not find in a kitchen, put it back.",
      },
      {
        heading: "Better alternatives",
        body: "Plain oats (havregryn) are level 1 — one ingredient, zero processing. Add your own nuts, seeds and a little honey for a homemade granola that costs less and has nothing you would not recognise. Or look for brands with very short ingredient lists — Axa and ICA Ekologisk have cleaner options.",
      },
    ],
    conclusion: "Granola is a good example of health washing — a product that looks clean on the outside but is highly processed on the inside. The best breakfast is still plain oats with toppings you add yourself.",
    cta: "Check your granola on FoodLens →",
  },

  "is-fruit-juice-healthy": {
    title: "Is Fruit Juice as Healthy as Fruit?",
    subtitle: "Parents give it to kids every morning — but juice is not the same as eating fruit.",
    emoji: "🧃",
    level: 4,
    levelName: "Ultra processed",
    verdict: "🫣 Keep as a treat",
    intro: "Fruit juice feels healthy. It comes from fruit, it has vitamins, and it has been part of the Swedish morning routine for decades. But nutritionally and in terms of processing, juice is very different from the fruit it came from — and most people do not realise how much.",
    sections: [
      {
        heading: "What happens to fruit when it becomes juice?",
        body: "When fruit is juiced, the fibre is removed. Fibre is what slows down sugar absorption — without it, the natural sugars in fruit hit your bloodstream much faster. A glass of orange juice has roughly the same sugar content as a glass of cola, and your body processes them in a similar way.",
      },
      {
        heading: "What about 100% juice with no added sugar?",
        body: "Even 100% juice with no added sugar is still a level 3-4 product. The processing involved — pasteurisation, concentration and reconstitution — qualifies it as processed beyond simple home preparation. Many commercial juices are made from concentrate, stored for months, and then have 'natural flavours' added back to restore taste lost during processing.",
      },
      {
        heading: "Why do parents give it to children?",
        body: "Because it feels like fruit. The marketing is very effective — cartoon fruits, green packaging, words like 'pure' and 'natural'. But giving a child a glass of juice every morning is closer to giving them a sugary drink than a piece of fruit.",
      },
      {
        heading: "What to drink instead?",
        body: "Water is the obvious answer. Sparkling water with a squeeze of fresh lemon or orange gives you the flavour with almost none of the sugar. If you want the vitamins from fruit, eat the whole fruit — the fibre makes a real difference to how your body handles the sugar.",
      },
    ],
    conclusion: "Juice is not a replacement for fruit. It is a processed drink that happens to come from fruit. Eating a whole orange gives you fibre, vitamins and a much slower sugar release than a glass of orange juice.",
    cta: "Check your juice on FoodLens →",
  },

  "is-oat-milk-healthy": {
    title: "Is Oat Milk Actually Good For You?",
    subtitle: "The plant-based trend everyone loves — but most oat milks are more processed than you think.",
    emoji: "🥛",
    level: 3,
    levelName: "Moderately processed",
    verdict: "🤔 Occasionally",
    intro: "Oat milk has become the default choice for anyone trying to eat more sustainably or avoid dairy. It tastes good, it froths well for coffee, and it feels like a clean choice. But oat milk is a level 3 processed product — and here is what that means.",
    sections: [
      {
        heading: "What is oat milk made from?",
        body: "Oat milk starts with oats and water — which sounds simple. But commercial oat milk goes through an industrial enzymatic process to break down the oat starch, then adds rapeseed oil, salt, and usually stabilisers like dipotassium phosphate or gellan gum. The result is a liquid that tastes like oats but is industrially produced.",
      },
      {
        heading: "Is Oatly worse than regular milk?",
        body: "Regular plain milk is level 1-2 — it is just milk. Oat milk is level 3 because of the additives and processing required to make it stable and palatable. That does not mean Oatly is bad for you — it means it is more processed than dairy milk, which surprises most people.",
      },
      {
        heading: "What about the environmental argument?",
        body: "Oat milk does have a lower carbon footprint than dairy milk — that is a real benefit. But environmental sustainability and nutritional processing level are separate things. You can choose oat milk for environmental reasons while understanding that it is not a whole food.",
      },
      {
        heading: "Which oat milk is cleanest?",
        body: "Look for oat milks with the shortest ingredient list. Some brands have as few as 3-4 ingredients — oats, water, salt, and maybe rapeseed oil. Avoid versions with added sugar, flavourings or long stabiliser lists. Barista versions tend to have more additives to improve frothing.",
      },
    ],
    conclusion: "Oat milk is a reasonable choice — especially for environmental reasons. But it is not a whole food and it is more processed than dairy milk. If you drink it daily, check the label and choose the cleanest version you can find.",
    cta: "Check your oat milk on FoodLens →",
  },

  "is-flavoured-yogurt-healthy": {
    title: "Is Flavoured Yogurt Healthy?",
    subtitle: "Plain yogurt is level 2. Flavoured yogurt is level 4. Here is why they are completely different.",
    emoji: "🍓",
    level: 4,
    levelName: "Ultra processed",
    verdict: "🫣 Keep as a treat",
    intro: "Yogurt has a healthy reputation — and plain yogurt deserves it. But most yogurt sold in Swedish supermarkets is not plain yogurt. It is flavoured yogurt, which is a very different product that belongs in the same NOVA category as crisps and fast food.",
    sections: [
      {
        heading: "What is in flavoured yogurt?",
        body: "Take strawberry yogurt as an example. Plain yogurt is milk and live cultures — two ingredients. Strawberry yogurt adds sugar, glucose syrup, artificial strawberry flavouring, modified starch, E471 emulsifier, and sometimes artificial colours. The yogurt base is still there, but it is surrounded by industrial ingredients.",
      },
      {
        heading: "Why does flavoured yogurt get NOVA level 4?",
        body: "Level 4 is assigned when a product contains industrial ingredients not used in home cooking — glucose syrup, artificial flavourings and E471 all qualify. You would never add these to yogurt at home. Their presence means the product has been industrially reformulated beyond simple food preparation.",
      },
      {
        heading: "What about low fat yogurt?",
        body: "Low fat flavoured yogurt is often even more processed than full fat versions. When fat is removed, flavour is lost — so manufacturers add more sugar, more flavourings and more thickeners to compensate. Full fat plain yogurt is dramatically cleaner than low fat flavoured yogurt.",
      },
      {
        heading: "What to eat instead?",
        body: "Plain yogurt — Greek yogurt, kvarg or filmjölk — with your own toppings. A handful of berries, a spoon of honey, some granola (check the label) or fresh fruit. You control what goes in, and the base product is level 2.",
      },
    ],
    conclusion: "The word yogurt on the label does not tell you much. Plain yogurt is one of the cleanest dairy products you can buy. Flavoured yogurt is often closer to a dessert. Check the ingredient list — the shorter it is, the better.",
    cta: "Check your yogurt on FoodLens →",
  },

  "are-protein-bars-healthy": {
    title: "Are Protein Bars Actually Healthy?",
    subtitle: "High protein does not mean clean. Most protein bars have ingredient lists as long as a candy bar.",
    emoji: "💪",
    level: 4,
    levelName: "Ultra processed",
    verdict: "🫣 Keep as a treat",
    intro: "Protein bars are sold in the sports nutrition aisle with claims about muscle, performance and health. The high protein content makes them feel like a smart choice. But open the wrapper and read the ingredients — most protein bars are level 4 ultra processed food.",
    sections: [
      {
        heading: "What is actually in a protein bar?",
        body: "A typical protein bar contains hydrolysed whey protein, glucose syrup, maltodextrin, palm oil, sucralose or acesulfame K, artificial flavourings, and a range of emulsifiers and stabilisers. The protein is real — but it comes packaged with industrial ingredients that would not look out of place in a confectionery product.",
      },
      {
        heading: "Does protein make it healthy?",
        body: "Protein is an important nutrient — but it does not neutralise everything else in the product. A candy bar with added protein powder is still a candy bar. The NOVA system looks at the overall processing level of the product, not just one nutrient. High protein and ultra processed are not mutually exclusive.",
      },
      {
        heading: "When are protein bars useful?",
        body: "For endurance athletes who need fast energy and protein between training sessions, protein bars have a practical role. For most people eating one as a snack or meal replacement, the same nutrition can be found in whole foods without the industrial additives.",
      },
      {
        heading: "Better protein snacks",
        body: "Plain kvarg or Greek yogurt has similar protein content to most protein bars with far fewer ingredients. Hard boiled eggs, a handful of plain nuts, or cottage cheese with fruit are all level 1-2 alternatives that provide real protein without the industrial processing.",
      },
    ],
    conclusion: "Protein bars are convenient and the protein is real — but they are ultra processed food. For everyday snacking, whole food protein sources are cleaner and often cheaper. Save protein bars for when you genuinely need fast fuel.",
    cta: "Check your protein bar on FoodLens →",
  },

  "is-veggie-burger-healthy": {
    title: "Are Veggie Burgers Healthier Than Meat?",
    subtitle: "Plant-based does not automatically mean less processed. Some veggie burgers are worse than beef.",
    emoji: "🌱",
    level: 4,
    levelName: "Ultra processed",
    verdict: "🫣 Keep as a treat",
    intro: "Veggie burgers feel like the responsible choice — better for the planet, better for your health, better all round. And for the environment, they often are. But from a food processing perspective, most veggie burgers are just as ultra processed as the meat they replace — and sometimes more so.",
    sections: [
      {
        heading: "What goes into a veggie burger?",
        body: "To make a plant-based product that looks, feels and tastes like meat, manufacturers use a long list of industrial ingredients — methylcellulose, soy protein isolate, modified starch, yeast extract, flavourings, E450 phosphates, and various emulsifiers and binders. The result is a highly engineered product that is far from simple plant food.",
      },
      {
        heading: "How does it compare to a beef burger?",
        body: "A plain beef burger patty made from mince is level 1 — just meat. A commercial veggie burger is level 4. That does not mean beef is healthier overall — red meat has its own concerns at high consumption. But in terms of food processing, plain meat is significantly less processed than most plant-based alternatives.",
      },
      {
        heading: "Are some veggie burgers cleaner than others?",
        body: "Yes — significantly. Brands like Oumph! and some Naturli products have shorter ingredient lists than others. A burger made from black beans, oats and spices is much cleaner than one made from isolated proteins and industrial binders. Check the label and look for products where you recognise every ingredient.",
      },
      {
        heading: "The environmental argument still stands",
        body: "Even if veggie burgers are ultra processed, their carbon footprint is lower than beef. These are separate considerations. You can choose plant-based for environmental reasons while being aware that it is not a whole food — and occasionally choosing the cleanest versions available.",
      },
    ],
    conclusion: "Plant-based does not mean unprocessed. Most veggie burgers are ultra processed food that happens to not contain meat. If you eat them for environmental reasons, that is valid — just do not assume they are nutritionally cleaner than what they replace.",
    cta: "Check your veggie burger on FoodLens →",
  },

  "is-instant-ramen-healthy": {
    title: "Is Instant Ramen Bad For You?",
    subtitle: "It is cheap, fast and filling — but instant ramen is one of the most processed foods you can buy.",
    emoji: "🍜",
    level: 4,
    levelName: "Ultra processed",
    verdict: "🫣 Keep as a treat",
    intro: "Instant ramen is a student staple, a late night meal, and a comfort food for millions of people. It is also one of the most processed foods you can buy — and the combination of ingredients in a typical packet is a useful lesson in how ultra processed food works.",
    sections: [
      {
        heading: "What is in instant ramen?",
        body: "The noodles are made from refined wheat flour, palm oil and salt — then fried at high temperature. The flavour packet typically contains E621 (MSG), salt, sugar, hydrolysed vegetable protein, artificial flavourings, and a range of preservatives. A single serving can contain more than 70% of your recommended daily sodium intake.",
      },
      {
        heading: "Why is it level 4?",
        body: "Instant ramen scores level 4 for multiple reasons — the industrial frying of the noodles, the extensive additive list in the flavour packet, and the presence of ingredients like MSG, hydrolysed protein and artificial flavourings that are classic markers of ultra processed food.",
      },
      {
        heading: "Is it dangerous to eat occasionally?",
        body: "Eating instant ramen occasionally is not going to harm you. The concern is regular consumption — studies link frequent instant noodle consumption to higher risk of metabolic syndrome, particularly in women, and the very high sodium content is a concern for cardiovascular health at high intakes.",
      },
      {
        heading: "A cleaner noodle soup",
        body: "Rice noodles with homemade broth — chicken or vegetable stock, ginger, garlic, soy sauce and whatever vegetables you have — takes about 15 minutes and is dramatically cleaner. Rice noodles themselves are level 2. The flavour comes from real ingredients rather than industrial flavour packets.",
      },
    ],
    conclusion: "Instant ramen is fine occasionally — it is convenient, affordable and filling. But it is ultra processed food by any measure. If you eat it regularly, it is worth knowing what is in the packet and what a cleaner alternative looks like.",
    cta: "Check your instant ramen on FoodLens →",
  },

  "are-rice-cakes-healthy": {
    title: "Are Rice Cakes a Healthy Snack?",
    subtitle: "The ultimate diet food — but rice cakes are highly processed and spike blood sugar fast.",
    emoji: "🌾",
    level: 3,
    levelName: "Moderately processed",
    verdict: "🤔 Occasionally",
    intro: "Rice cakes have been a diet food staple for decades. Low calorie, light, seemingly clean — they feel like the responsible snack choice. But rice cakes are more processed than they look, and their effect on blood sugar is worse than most people realise.",
    sections: [
      {
        heading: "How are rice cakes made?",
        body: "Rice cakes are made by exposing rice to high heat and pressure until it puffs up and binds together. This process dramatically raises the glycaemic index of the rice — plain white rice has a GI of around 64, while rice cakes score around 82, higher than white bread. The processing that makes them light and crispy also makes them metabolise faster.",
      },
      {
        heading: "What about flavoured rice cakes?",
        body: "Plain rice cakes are level 3. Flavoured versions — cheese flavour, salt and vinegar, sweet chilli — add artificial flavourings, glucose syrup and various additives that push them toward level 4. The flavouring transforms a moderately processed product into something closer to a crisp.",
      },
      {
        heading: "Are they good for weight loss?",
        body: "Rice cakes are low in calories but they are also low in protein, fat and fibre — the three things that make you feel full. The rapid blood sugar spike followed by a crash tends to make you hungrier faster than a more balanced snack would. As a weight loss food, they are less effective than their reputation suggests.",
      },
      {
        heading: "Better snack alternatives",
        body: "Plain nuts provide protein, fat and fibre that keep you full much longer. Oatcakes have more fibre than rice cakes and a lower GI. Vegetables with hummus, plain yogurt, or a piece of fruit all provide more sustained energy than rice cakes with less processing.",
      },
    ],
    conclusion: "Rice cakes are not terrible — but they are not the clean diet food they are marketed as. They are moderately processed, spike blood sugar quickly, and do not keep you full. For a genuinely clean snack, plain nuts or vegetables are a better choice.",
    cta: "Check your snacks on FoodLens →",
  },

  "is-falukorv-healthy": {
    title: "Is Falukorv Healthy?",
    subtitle: "A Swedish classic — but what is it actually made of?",
    emoji: "🌭",
    level: 4,
    levelName: "Ultra processed",
    verdict: "🫣 Keep as a treat",
    intro: "Falukorv is one of Sweden's most beloved foods. Fried with macaroni, baked in pastry or sliced on bread — it sits in almost every Swedish fridge. But when you check the NOVA classification, falukorv lands at level 4, the same category as crisps and fast food. Here is why.",
    sections: [
      {
        heading: "What is falukorv actually made of?",
        body: "Falukorv contains beef, pork and rind — but also sodium nitrite (preservative), E450 (phosphates), modified starch and flavourings. It is these additives that place it in NOVA level 4. A plain piece of meat is level 1. Falukorv is industrially processed with ingredients you would never use at home.",
      },
      {
        heading: "What does sodium nitrite do?",
        body: "Sodium nitrite is the preservative that gives falukorv its characteristic pink colour and prevents dangerous bacteria. The WHO classifies processed meat products containing nitrites as Group 1 carcinogens — the same category as tobacco. This does not mean eating falukorv occasionally will cause cancer, but it is a reason not to eat it every day.",
      },
      {
        heading: "How does it compare to plain meat?",
        body: "A chicken fillet is level 1 — just meat, no additives. Falukorv is level 4 because of the industrial ingredients. It is the same difference as between a whole tomato and ketchup — the raw ingredient is there, but it is surrounded by industrial processing.",
      },
      {
        heading: "What to eat instead?",
        body: "Chicken breast, turkey or fish are all level 1 with similar satiety but without the additives. If you love falukorv — eat it occasionally, enjoy it, but do not make it a daily dinner habit.",
      },
    ],
    conclusion: "Falukorv is part of Swedish food culture and it is fine to eat occasionally. But it is ultra processed food and not something you should eat every day. Choose unprocessed meat on weekdays and save falukorv for a treat.",
    cta: "Check falukorv on FoodLens →",
  },

  "is-butter-healthy": {
    title: "Is Butter Actually Bad For You?",
    subtitle: "Butter had a terrible reputation for decades — but is it really deserved?",
    emoji: "🧈",
    level: 2,
    levelName: "Everyday food",
    verdict: "😊 Good everyday food — use it without guilt",
    intro: "Butter was labelled a health hazard for decades — too much saturated fat, too many calories, switch to margarine. But when you check the NOVA classification, butter is level 2, one of the cleanest dairy products you can buy. And margarine? Often level 4.",
    sections: [
      {
        heading: "What is in butter?",
        body: "Butter contains cream and salt — sometimes just cream. That is it. No emulsifiers, no stabilisers, no industrial additives. This short ingredient list places butter in NOVA level 2, alongside olive oil and other staple foods.",
      },
      {
        heading: "What about the saturated fat?",
        body: "The research on saturated fat and heart health is more nuanced than was communicated in the 1980s and 90s. Current evidence suggests that butter in normal amounts as part of a varied diet is not the health problem it was once thought to be. The raw fat content is not the same as the degree of processing.",
      },
      {
        heading: "How does it compare to margarine?",
        body: "Margarine is often marketed as a healthier alternative to butter — but most margarines are level 3-4 with long ingredient lists including hardened fats, emulsifiers and flavourings. Butter with its 1-2 ingredients is dramatically cleaner than most margarines.",
      },
      {
        heading: "How should you use butter?",
        body: "Butter is excellent for frying, baking and as a spread. It is a staple food that has been used for thousands of years. Use it in cooking without guilt — it is one of the cleanest fats you can buy in a Swedish supermarket.",
      },
    ],
    conclusion: "Butter is not the health hazard it was once labelled. It is a staple food with a short ingredient list and minimal processing. Margarine is often a worse choice from a NOVA perspective, despite being marketed as healthier.",
    cta: "Check butter on FoodLens →",
  },

  "is-oatmeal-healthy": {
    title: "Is Oatmeal the Healthiest Breakfast?",
    subtitle: "The classic Swedish breakfast — and one of the cleanest foods you can eat.",
    emoji: "🌾",
    level: 1,
    levelName: "As clean as it gets",
    verdict: "🌱 As clean as it gets — eat it every day",
    intro: "Oatmeal is one of the few foods that actually lives up to its healthy reputation. NOVA level 1 — minimally processed, one ingredient, no additives. But there is an important difference between plain oats and flavoured instant versions.",
    sections: [
      {
        heading: "What is in plain oats?",
        body: "Plain rolled oats contain one thing — oats. It is a whole grain that has been rolled into flakes. No added sugar, no flavourings, no preservatives. This is exactly what NOVA level 1 is about: unprocessed or minimally processed food.",
      },
      {
        heading: "How do flavoured oat products compare?",
        body: "Flavoured instant oats — strawberry, chocolate, honey — look like oatmeal but often contain glucose syrup, artificial flavourings and maltodextrin. They are level 3-4. Same base ingredient, but surrounded by industrial additives. Always buy plain oats and add your own toppings.",
      },
      {
        heading: "Why are oats so good?",
        body: "Oats contain beta-glucan, a soluble fibre linked to lower cholesterol and better blood sugar control. They keep you full for a long time due to the slow breakdown. As a breakfast choice, they are one of the most scientifically well-supported options available.",
      },
      {
        heading: "How to eat them best?",
        body: "Cook them in water or milk and add your own toppings — berries, nuts, a little honey or cinnamon. You control what goes in, and the base is level 1. It is dramatically cleaner and often cheaper than pre-packaged breakfast products.",
      },
    ],
    conclusion: "Oatmeal is one of the best breakfasts you can eat — cheap, filling and level 1. Buy plain rolled oats and avoid flavoured versions. Add your own toppings and you have full control.",
    cta: "Check your oats on FoodLens →",
  },

  "is-kvarg-healthy": {
    title: "Is Kvarg (Quark) Actually Healthy?",
    subtitle: "The protein trend everyone loves — but what is kvarg really?",
    emoji: "🫙",
    level: 2,
    levelName: "Everyday food",
    verdict: "😊 Good everyday food — one of the cleanest protein snacks",
    intro: "Kvarg (quark) has become one of Sweden's most popular protein choices — at the gym, as a snack, as a dessert with berries. And unlike many health trend products, kvarg actually lives up to its reputation. Here is why.",
    sections: [
      {
        heading: "What is kvarg?",
        body: "Kvarg is strained milk — milk that has had the whey removed to concentrate the protein. The ingredient list is short: milk and live cultures, sometimes a little salt. It is level 2, the same category as butter and olive oil. Despite looking like a processed product, it is remarkably clean.",
      },
      {
        heading: "How does flavoured kvarg compare?",
        body: "Plain kvarg is level 2. Flavoured kvarg — strawberry, vanilla, chocolate — often contains glucose syrup, artificial flavourings and stabilisers that push it to level 3-4. Same base product, very different processing level. Always buy plain and add your own toppings.",
      },
      {
        heading: "How does it compare to protein bars?",
        body: "A protein bar with the same amount of protein as kvarg often contains maltodextrin, sucralose, artificial flavourings and a range of emulsifiers — level 4. Kvarg with 2-3 ingredients delivers the same protein with a fraction of the processing and is usually cheaper.",
      },
      {
        heading: "How to eat kvarg?",
        body: "With berries and a little honey, as a smoothie base, in cooking as an alternative to sour cream, or straight from the tub with a spoon. The neutral flavour makes it versatile.",
      },
    ],
    conclusion: "Kvarg is one of the cleanest high-protein foods you can buy in Sweden. Choose plain, add your own flavours, and you have an excellent everyday snack at level 2.",
    cta: "Check kvarg on FoodLens →",
  },

  "is-filmjolk-healthy": {
    title: "Is Filmjölk (Swedish Fermented Milk) Healthy?",
    subtitle: "A Swedish dairy product with a long history — and a surprisingly clean ingredient list.",
    emoji: "🥛",
    level: 2,
    levelName: "Everyday food",
    verdict: "😊 Good everyday food — one of Sweden's cleanest dairy products",
    intro: "Filmjölk has been part of the Swedish breakfast table for generations. This fermented milk has a long tradition and — it turns out — one of the cleanest ingredient lists you will find in the dairy section.",
    sections: [
      {
        heading: "What is in filmjölk?",
        body: "Filmjölk contains milk and live cultures — sometimes just that. It is a fermented food, just like yogurt and kvarg, with a short and recognisable ingredient list. NOVA level 2 is the right classification for a staple food with minimal processing.",
      },
      {
        heading: "What is fermentation and why is it good?",
        body: "Fermentation means bacteria convert lactose into lactic acid, giving filmjölk its characteristic sour taste. Fermented foods are linked to better gut health and are easier to digest for people sensitive to lactose. It is one of the oldest preservation methods in existence.",
      },
      {
        heading: "Is it better than regular milk?",
        body: "Regular milk is level 1-2, filmjölk is level 2 — they are comparable. Filmjölk adds live cultures that regular milk does not have. Both are clean choices. Choose whichever taste you prefer.",
      },
      {
        heading: "What to avoid?",
        body: "Flavoured filmjölk — strawberry, vanilla — adds sugar and flavourings that raise the processing level. Plain filmjölk is always the cleanest choice. Add your own toppings if you want more flavour.",
      },
    ],
    conclusion: "Filmjölk is one of the cleanest dairy products in Swedish supermarkets. Choose plain, eat it for breakfast or as a snack, and you have a genuine level 2 food with a long Swedish tradition.",
    cta: "Check filmjölk on FoodLens →",
  },

  "is-knackebrod-healthy": {
    title: "Is Crispbread (Knäckebröd) Healthy?",
    subtitle: "Sweden's most iconic bread — but not all crispbreads are equally clean.",
    emoji: "🍞",
    level: 2,
    levelName: "Everyday food",
    verdict: "😊 Good everyday food — but check the ingredient list",
    intro: "Crispbread is a staple in Swedish kitchens and has a well-earned healthy reputation. But there is a big difference between a genuinely clean crispbread and the processed versions with long ingredient lists. Here is what to look for.",
    sections: [
      {
        heading: "What is in clean crispbread?",
        body: "The cleanest crispbread has just 3-4 ingredients — rye flour, water, salt and possibly yeast. Wasa Rågi and Leksands original are examples with short ingredient lists. These are level 2, a staple food with minimal processing.",
      },
      {
        heading: "Which crispbreads are more processed?",
        body: "Flavoured varieties — with seeds, herbs, cheese or sweet variants — often contain E471 (emulsifier), glucose syrup and flavourings that push them to level 3. Always check the ingredient list. The shorter, the better.",
      },
      {
        heading: "Is it better than regular bread?",
        body: "Regular sliced bread from the supermarket often contains E471, calcium propionate and modified starch — level 3-4. Clean crispbread is in most cases significantly cleaner than sliced bread, and it keeps for a long time without preservatives thanks to its low moisture content.",
      },
      {
        heading: "What to top it with?",
        body: "Butter, cheese, avocado, eggs — all good choices. Avoid pre-packaged toppings with long ingredient lists. Clean crispbread deserves a clean topping.",
      },
    ],
    conclusion: "Crispbread can be an excellent choice — but not all varieties are equally clean. Check the ingredient list and choose one with 3-5 ingredients. Wasa and Leksands have good basic versions.",
    cta: "Check crispbread on FoodLens →",
  },

  "are-meatballs-healthy": {
    title: "Are Swedish Meatballs Healthy?",
    subtitle: "Homemade or store-bought — it makes a huge difference to the NOVA level.",
    emoji: "🍖",
    level: 3,
    levelName: "Moderately processed",
    verdict: "🤔 Depends — homemade is level 2, store-bought is level 3-4",
    intro: "Swedish meatballs are a national dish — and a perfect example of how the same meal can be either level 2 or level 4 depending on whether you make them yourself or buy them ready-made. Here is the difference.",
    sections: [
      {
        heading: "Homemade meatballs — level 2",
        body: "Homemade meatballs have 5-6 ingredients — beef mince, egg, onion, breadcrumbs, salt and pepper. These are all staple foods, no industrial additives, level 2. You know exactly what is in them and can adjust to taste.",
      },
      {
        heading: "Store-bought meatballs — level 3-4",
        body: "Ready-made meatballs often contain E450 (phosphates), modified starch, flavourings and sometimes E621 (MSG). Phosphates are used to hold the meatballs together and give them a consistent texture at industrial scale. These additives place them in level 3-4.",
      },
      {
        heading: "Does it matter in practice?",
        body: "Eating ready-made meatballs occasionally is not a disaster. But if you eat them regularly, it is worth knowing that homemade are dramatically cleaner. And homemade Swedish meatballs actually take no more than 20 minutes to make.",
      },
      {
        heading: "Recipe for cleaner meatballs",
        body: "500g beef mince, 1 egg, 1 small onion (grated), 2 tbsp breadcrumbs, salt and pepper. Mix, roll into balls, fry in butter. That is it. Freeze a batch and you always have homemade meatballs in the freezer.",
      },
    ],
    conclusion: "Meatballs are great — but it matters whether they are homemade or store-bought. Make a large batch at home occasionally and freeze them. You get a level 2 food with full control over the ingredients.",
    cta: "Check meatballs on FoodLens →",
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
      url: `https://foodlens.se/blog/${slug}`,
    },
    alternates: {
      canonical: `https://foodlens.se/blog/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function ArticlePage({
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
            href="/blog"
            className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            ← All articles
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[article.level]}`}>
              NOVA {article.level} — {article.levelName}
            </span>
            <span className="text-xs text-gray-400">3 min read</span>
          </div>
          <p className="text-4xl mb-4">{article.emoji}</p>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 leading-tight">
            {article.title}
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            {article.subtitle}
          </p>
        </div>

        {/* Verdict badge */}
        <div className={`rounded-xl p-4 mb-8 ${article.level >= 4 ? "bg-red-50 dark:bg-red-950/30" : "bg-orange-50 dark:bg-orange-950/30"}`}>
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            FoodLens verdict
          </p>
          <p className="text-lg font-semibold dark:text-white">{article.verdict}</p>
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
          Check another food on FoodLens →
        </Link>

        {/* Related articles */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
            More articles
          </p>
          <div className="space-y-2">
            {Object.entries(articles)
              .filter(([s]) => s !== slug)
              .slice(0, 3)
              .map(([s, a]) => (
                <Link
                  key={s}
                  href={`/blog/${s}`}
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
