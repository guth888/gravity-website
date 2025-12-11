import { Link } from "react-router-dom";
import gravityLogo from '@/assets/new-gravitylogo.png';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-5 lg:px-6 py-2.5 backdrop-blur-md bg-[#f5f5f5]/95 border-b border-gray-200">
        <div className="w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto flex items-center">
          {/* Logo */}
          <a href="/" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity shrink-0">
            <img 
              src={gravityLogo} 
              alt="Gravity AI" 
              className="h-7 sm:h-8"
              style={{ transform: 'scale(2.5)', transformOrigin: 'left center', marginRight: '24px' }}
            />
            <span 
              className="font-headline font-bold text-gray-900 tracking-tight antialiased"
              style={{ fontSize: '1.5rem', marginLeft: '8px' }}
            >
              Gravity
            </span>
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Update Date */}
          <p className="text-center text-sm text-gray-600 mb-8">Effective Date: January 1, 2025</p>
          
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-headline font-bold text-center mb-8 text-gray-900">
            Privacy Policy
          </h1>

          {/* Navigation Links */}
          <div className="flex justify-center gap-6 mb-12 text-sm">
            <Link 
              to="/terms"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Terms of Use
            </Link>
            <Link 
              to="/privacy"
              className="text-gray-900 font-medium border-b-2 border-gray-900 pb-1"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Body Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-8">
              This Privacy Policy explains how Iris Technologies ("Iris", "we", "us") collects, uses, and shares information when you access our websites, SDKs, APIs, and related services (collectively, the "Services"). This Policy is intended to provide transparency regarding our advertising technology practices while maintaining a high standard of user trust and platform integrity.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We may collect information in the following categories to enable ad delivery, measurement, security, and service improvement:
              </p>
              <ul className="list-disc pl-6 space-y-3 mb-4">
                <li><strong>Device and Network:</strong> IP address, user-agent, operating system, device type, browser type, language, timezone, network provider, and connection metadata.</li>
                <li><strong>Identifiers:</strong> Advertising identifiers (e.g., AAID/IDFA where permitted), pseudonymous identifiers, and internal IDs used for fraud prevention, frequency management, and measurement.</li>
                <li><strong>Contextual Signals:</strong> Page or conversation-level context, keywords, categories, and other non-personal signals that help determine ad relevance without identifying individual users.</li>
                <li><strong>Interaction and Performance:</strong> Ad requests, impressions, clicks, conversions, viewability, scroll and visibility metrics, session timings, and SDK/API error diagnostics.</li>
                <li><strong>Location:</strong> Approximate geolocation derived from IP address or system signals, used for regional targeting, reporting, and fraud controls.</li>
              </ul>
              <p>
                Where permitted by law or with appropriate consent, we may also collect or receive hashed contact information, ad campaign metadata, and aggregated audience segments provided by trusted partners for measurement and reach estimation. We do not knowingly collect sensitive personal information unless expressly required for compliance or safety, and we restrict use of such data to permitted purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">2. How We Use Information</h2>
              <p className="mb-4">
                We use the information described above to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Serve, manage, and optimize native ad experiences in LLM environments</li>
                <li>Measure performance, attribution, and reach across campaigns and inventory</li>
                <li>Detect, prevent, and investigate ad fraud, invalid traffic, and abuse</li>
                <li>Provide reporting, analytics, and billing to publishers and advertisers</li>
                <li>Comply with legal obligations and enforce our terms and policies</li>
                <li>Improve our Services, including testing, research, and product development</li>
              </ul>
              <p>
                We may use de-identified or aggregated information for research, benchmarking, and product development. We may also perform limited modeling, inference, and prediction to improve ad relevance and safety, without attempting to re-identify individuals.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">3. Legal Bases</h2>
              <p>
                Where required, our processing is based on consent, legitimate interests in delivering and improving advertising services, performance of a contract, and/or compliance with legal obligations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">4. Controllers and Processors</h2>
              <p>
                Depending on the integration, Iris Technologies may act as a controller (e.g., for our own sites, services, and analytics) or as a processor/service provider on behalf of publishers and advertisers. When acting as a processor, we process personal data pursuant to the instructions and permissions of the applicable controller and in accordance with a data processing addendum where required.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">5. Data Sharing</h2>
              <p className="mb-4">
                We may share information with trusted partners to operate the Services, such as demand partners, exchanges, measurement providers, anti-fraud vendors, and cloud service providers. We require recipients to use reasonable security and process data only for the purposes described herein or as otherwise authorized by you or required by law.
              </p>
              <p>
                We may disclose information in connection with a merger, acquisition, financing, or sale of assets, and as required to comply with law, respond to lawful requests, enforce our rights, or protect the safety of users and the public.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">6. Data Retention</h2>
              <p>
                We retain information for as long as necessary to fulfill the purposes described in this Policy, including recordkeeping, dispute resolution, fraud prevention, and compliance with legal obligations. Retention periods vary based on data type and our operational needs.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">7. Security</h2>
              <p>
                We employ administrative, technical, and organizational safeguards designed to protect information against unauthorized access, loss, or misuse. No system can be guaranteed to be 100% secure, and you use the Services at your own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">8. Your Choices</h2>
              <p className="mb-4">
                Depending on your location and applicable law, you may have rights and choices with respect to certain data practices, including the ability to opt out of interest-based advertising, access or delete certain information, and manage consent settings. Publishers integrating our SDKs are responsible for providing appropriate notices and obtaining necessary consents from their users.
              </p>
              <p>
                Where available, we honor applicable preference signals and industry opt-out frameworks. Requests relating to data processed on behalf of a publisher or advertiser should be directed to that entity; we will assist controllers in responding to requests where required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">9. International Transfers</h2>
              <p>
                We may transfer information to countries other than your own, including the United States, where we and our service providers operate. We implement appropriate safeguards for such transfers where required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">10. Children</h2>
              <p>
                Our Services are not directed to children, and we do not knowingly collect personal information from children. If we learn that a child has provided us with personal information, we will take appropriate steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. If we make material changes, we will provide notice through the Services or by other reasonable means. Your continued use of the Services after the effective date constitutes acceptance of the updated Policy.
              </p>
            </section>

            <section className="mb-8 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">12. Contact</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us at{" "}
                <a href="mailto:privacy@trygravity.ai" className="text-gray-900 hover:underline font-medium">
                  privacy@trygravity.ai
                </a>{" "}
                or{" "}
                <a href="mailto:support@trygravity.ai" className="text-gray-900 hover:underline font-medium">
                  support@trygravity.ai
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
