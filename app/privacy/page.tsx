"use client";
import { useLang } from "../contexts/LanguageContext";
import { UI } from "../i18n/translations";

export default function PrivacyPolicy() {
  const { lang } = useLang();
  const t = UI[lang];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <a
          href="/"
          className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mb-8 inline-block"
        >
          {t.privacyBack}
        </a>

        <h1 className="text-2xl font-bold mb-2">{t.privacyTitle}</h1>
        <p className="text-sm text-gray-400 mb-8">{t.privacyUpdated}</p>

        <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">

          <h2 className="text-base font-semibold mt-6 mb-2">{t.privacyIntroHeading}</h2>
          <p>{t.privacyIntroBody}</p>

          <h2 className="text-base font-semibold mt-6 mb-2">{t.privacyDataCollHeading}</h2>
          <p>{t.privacyDataCollBody}</p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            {t.privacyDataCollItems.map((item) => <li key={item}>{item}</li>)}
          </ul>

          <h2 className="text-base font-semibold mt-6 mb-2">{t.privacyUseHeading}</h2>
          <p>{t.privacyUseBody}</p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            {t.privacyUseItems.map((item) => <li key={item}>{item}</li>)}
          </ul>

          <h2 className="text-base font-semibold mt-6 mb-2">{t.privacySecurityHeading}</h2>
          <p>{t.privacySecurityBody}</p>

          <h2 className="text-base font-semibold mt-6 mb-2">{t.privacyThirdPartyHeading}</h2>
          <p>{t.privacyThirdPartyBody}</p>

          <h2 className="text-base font-semibold mt-6 mb-2">{t.privacySourcesHeading}</h2>
          <p>
            {lang === "sv" ? "Matdata hämtas från" : "Food data is sourced from"}{" "}
            <a
              href="https://world.openfoodfacts.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 underline hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              world.openfoodfacts.org
            </a>
            {lang === "sv"
              ? ", en öppen samarbetsdatabas licensierad under Open Database License (ODbL). FoodLens är inte anslutet till OpenFoodFacts."
              : ", an open collaborative database licensed under the Open Database License (ODbL). FoodLens is not affiliated with OpenFoodFacts."}
          </p>

          <h2 className="text-base font-semibold mt-6 mb-2">{t.privacyCookiesHeading}</h2>
          <p>{t.privacyCookiesBody}</p>

          <h2 className="text-base font-semibold mt-6 mb-2">{t.privacyRightsHeading}</h2>
          <p>{t.privacyRightsBody}</p>

          <h2 className="text-base font-semibold mt-6 mb-2">{t.privacyChildrenHeading}</h2>
          <p>{t.privacyChildrenBody}</p>

          <h2 className="text-base font-semibold mt-6 mb-2">{t.privacyChangesHeading}</h2>
          <p>{t.privacyChangesBody}</p>

          <h2 className="text-base font-semibold mt-6 mb-2">{t.privacyContactHeading}</h2>
          <p>{t.privacyContactBody}</p>

        </div>
      </div>
    </div>
  );
}

