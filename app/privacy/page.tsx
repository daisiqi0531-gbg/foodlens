"use client";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Back link */}
        <a
          href="/"
          className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mb-8 inline-block"
        >
          ← Back to FoodLens
        </a>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: May 3, 2026</p>

        {/* Body content */}
        <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">

          <h2 className="text-base font-semibold mt-6 mb-2">Introduction</h2>
          <p>
            FoodLens ("we", "our", or "us") operates the FoodLens website and application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
          </p>

          <h2 className="text-base font-semibold mt-6 mb-2">Data Collection</h2>
          <p>
            We collect information you provide directly to us, such as when you search for food products or submit queries. This may include:
          </p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>Search queries and food product information you enter</li>
            <li>Device information and usage analytics</li>
            <li>Browser data and IP address</li>
          </ul>

          <h2 className="text-base font-semibold mt-6 mb-2">How We Use Your Data</h2>
          <p>
            We use the collected data for the following purposes:
          </p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>To provide and improve our service</li>
            <li>To analyze usage patterns and optimize the user experience</li>
            <li>To monitor and troubleshoot technical issues</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="text-base font-semibold mt-6 mb-2">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-base font-semibold mt-6 mb-2">Third-Party Services</h2>
          <p>
            FoodLens may use third-party services to enhance functionality, including OpenFoodFacts for food product information. We are not responsible for the privacy practices of third parties and encourage you to review their privacy policies.
          </p>

          <h2 className="text-base font-semibold mt-6 mb-2">Data Sources</h2>
          <p>
            Food data is sourced from{" "}
            <a
              href="https://world.openfoodfacts.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 underline hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              world.openfoodfacts.org
            </a>
            , an open collaborative database licensed under the Open Database License (ODbL). FoodLens is not affiliated with OpenFoodFacts.
          </p>

          <h2 className="text-base font-semibold mt-6 mb-2">Cookies</h2>
          <p>
            We may use cookies and similar tracking technologies to track activity on our service and maintain preferences. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2 className="text-base font-semibold mt-6 mb-2">Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete your data. Please contact us to exercise these rights.
          </p>

          <h2 className="text-base font-semibold mt-6 mb-2">Children's Privacy</h2>
          <p>
            FoodLens does not knowingly collect personally identifiable information from anyone under the age of 13. If we become aware that a child under 13 has provided us with personal data, we will delete such information immediately.
          </p>

          <h2 className="text-base font-semibold mt-6 mb-2">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top.
          </p>

          <h2 className="text-base font-semibold mt-6 mb-2">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our privacy practices, please contact us. We will respond to your inquiry within 30 days.
          </p>

        </div>
      </div>
    </div>
  );
}
