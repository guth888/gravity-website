import { Link } from "react-router-dom";
import gravityLogo from '@/assets/gravity-logo.png';

const Terms = () => {
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
            Terms of Service
          </h1>

          {/* Navigation Links */}
          <div className="flex justify-center gap-6 mb-12 text-sm">
            <Link 
              to="/terms"
              className="text-gray-900 font-medium border-b-2 border-gray-900 pb-1"
            >
              Terms of Use
            </Link>
            <Link 
              to="/privacy"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Body Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-8">
              These Terms of Service (the "Terms") govern your access to and use of the services, software development kits (SDKs), application programming interfaces (APIs), websites, and related offerings provided by Iris Technologies (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms. If you are agreeing to these Terms on behalf of an organization, you represent and warrant that you have the authority to bind that organization, and "you" and "your" will refer to that organization.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">1. Eligibility; Accounts</h2>
              <p>
                You must be at least 18 years old and have the legal capacity to enter into a contract to use the Services. You are responsible for the accuracy of account information and for maintaining the confidentiality of your credentials and access tokens. You are responsible for all activities that occur under your account. You will promptly notify us of any suspected unauthorized use.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">2. Definitions</h2>
              <p>
                "Publisher" means an entity that integrates the Services into its properties to render ads. "Advertiser" or "Demand Partner" means an entity that provides bids, creatives, or demand for ad placements. "End Users" means individuals who interact with a Publisher's property where ads are served. "Signals" means device, contextual, and interaction data used for ad delivery, measurement, and fraud prevention.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">3. License and Acceptable Use</h2>
              <p className="mb-4">
                Subject to your compliance with these Terms, Iris Technologies grants you a limited, non-exclusive, non-transferable, revocable license to integrate and use our SDKs and APIs to enable native advertising experiences within your applications. You will not (and will not permit others to):
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>(a) reverse engineer, decompile, or otherwise attempt to derive source code or underlying ideas;</li>
                <li>(b) circumvent or disable any security or technical controls;</li>
                <li>(c) use the Services to violate any applicable law, industry code, or third-party right;</li>
                <li>(d) transmit malware, malicious code, or harmful content;</li>
                <li>(e) publish deceptive, misleading, or fraudulent content;</li>
                <li>(f) engage in activity that interferes with or degrades the Services;</li>
                <li>(g) exceed any documented rate limits; or</li>
                <li>(h) use the Services to build a competing product.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">4. Integration; Implementation Requirements</h2>
              <p>
                You must implement the Services in accordance with our documentation, including applicable privacy, consent, and brand-safety controls. You are solely responsible for the configuration of placements, category blocks, and any publisher-side filters. We may throttle, suspend, or terminate access for non-compliant implementations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">5. Advertiser and Publisher Responsibilities</h2>
              <p>
                Publishers are responsible for obtaining and maintaining legally required notices, disclosures, and user consents, including consent signals where applicable (e.g., TCF or U.S. state signals). Advertisers are responsible for the lawfulness, accuracy, and quality of their bids and creatives, adherence to category restrictions, and brand-safety and suitability settings. You will not target or deliver ads that are illegal, discriminatory, or otherwise prohibited by applicable law or our policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">6. Data; Signals; Measurement</h2>
              <p>
                You acknowledge and agree that the Services may collect, process, and use device and contextual Signals (e.g., device characteristics, advertising identifiers, approximate location, IP-derived geolocation, user-agent, language preferences, interaction events, ad performance metrics, conversion and attribution data, and conversation or page-level contextual signals) to enable ad delivery, measurement, optimization, security, and fraud prevention. Use of such information is described in our Privacy Policy, incorporated by reference.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">7. Ownership; Usage Data; Feedback</h2>
              <p>
                Iris Technologies and its licensors own all right, title, and interest in and to the Services and associated intellectual property. We may collect and use aggregated or de-identified data and usage metrics to operate, analyze, and improve the Services. If you provide feedback, you grant Iris Technologies a perpetual, irrevocable, royalty-free license to use such feedback without restriction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">8. Fees; Taxes</h2>
              <p>
                Fees (if any) are as stated in an order form or dashboard and are non-refundable unless required by law. You are responsible for all taxes and assessments associated with your purchases, excluding taxes based on our net income.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">9. Confidentiality</h2>
              <p>
                "Confidential Information" means non-public information disclosed by one party to the other that is designated as confidential or should reasonably be understood to be confidential. The receiving party will protect the disclosing party's Confidential Information with at least the same degree of care it uses for its own, but no less than reasonable care, and will use it only for purposes consistent with these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">10. Privacy; Data Protection</h2>
              <p>
                Your use of the Services is subject to our Privacy Policy. Where required by law (e.g., GDPR/UK GDPR, CCPA/CPRA), we will make available a data processing addendum (DPA) governing our processing of personal data on your behalf. You are responsible for implementing appropriate user notices, consent mechanisms, preference signals, and opt-out processes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">11. Third-Party Services</h2>
              <p>
                The Services may interoperate with or link to third-party exchanges, demand sources, analytics, anti-fraud tools, and cloud providers. We are not responsible for third-party services, and your use of such services may be subject to their terms and policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">12. Security; Acceptable Testing</h2>
              <p>
                We maintain administrative, technical, and organizational measures designed to protect the Services. You will not perform penetration testing or security scanning without our prior written consent and coordination through our vulnerability disclosure process.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">13. Warranties; Disclaimers</h2>
              <p className="font-semibold mb-2">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW, IRIS TECHNOLOGIES DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT MEASUREMENT OR ATTRIBUTION RESULTS WILL BE ACCURATE OR COMPLETE.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">14. Limitation of Liability</h2>
              <p className="font-semibold">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IRIS TECHNOLOGIES WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, COVER, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL. OUR AGGREGATE LIABILITY WILL NOT EXCEED THE AMOUNTS PAID BY YOU TO IRIS TECHNOLOGIES FOR THE SERVICES IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">15. Indemnification</h2>
              <p>
                You will defend, indemnify, and hold harmless Iris Technologies and its affiliates, officers, directors, employees, and agents from and against any claims, losses, liabilities, damages, costs, and expenses (including reasonable attorneys' fees) arising out of or related to: (a) your content, creatives, or applications; (b) your use of the Services; (c) your breach of these Terms; or (d) your violation of applicable laws or third-party rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">16. Suspension; Termination</h2>
              <p>
                We may suspend or terminate your access to the Services immediately if we believe you have breached these Terms, present a security risk, or pose a risk of harm or legal exposure to Iris Technologies or others. Upon termination, your license to use the Services will cease, but sections intended to survive (including ownership, confidentiality, disclaimers, limitations of liability, indemnities, and governing law) will remain in effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">17. Export; Sanctions; Anti-Corruption</h2>
              <p>
                You represent and warrant that you are not subject to sanctions and will comply with all applicable export control, sanctions, and anti-corruption laws, including the U.S. Export Administration Regulations and the Foreign Corrupt Practices Act.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">18. Government End Users</h2>
              <p>
                The Services are "commercial items" as defined in 48 C.F.R. §2.101 and are provided to U.S. Government end users only as commercial items with the same rights and restrictions applicable to other users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">19. Publicity; Marks</h2>
              <p>
                We may identify you as a customer in accordance with your reasonable brand guidelines unless you notify us in writing to the contrary. You may not use our names or marks without our prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">20. Force Majeure</h2>
              <p>
                Neither party will be liable for delays or failures due to causes beyond its reasonable control, including acts of God, labor disputes, or Internet failures.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">21. Governing Law; Dispute Resolution</h2>
              <p>
                These Terms are governed by the laws of the State of Delaware, without regard to conflicts of law. Any dispute will be resolved through binding arbitration on an individual basis under the rules of the American Arbitration Association. You waive any right to participate in a class or representative action to the extent permitted by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">22. Changes to the Services or Terms</h2>
              <p>
                We may modify the Services and these Terms from time to time. If we make material changes, we will provide notice as appropriate under the circumstances. Your continued use of the Services after changes become effective constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">23. General</h2>
              <p>
                These Terms constitute the entire agreement between you and Iris Technologies regarding the Services and supersede any prior or contemporaneous agreements on the same subject. If any provision is held unenforceable, the remaining provisions will remain in full force. You may not assign these Terms without our prior written consent; we may assign them in connection with a merger, acquisition, or sale of assets. Notices may be provided via the Services, email, or our website. No waiver is effective unless in writing.
              </p>
            </section>

            <section className="mb-8 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">Contact</h2>
              <p>
                If you have any questions about these Terms, please contact us at{" "}
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

export default Terms;
