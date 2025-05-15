import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <main className="flex-1 container mt-10 max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent dark:from-primary dark:to-[#b30000]">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Effective Date: January 1, 2024 | Last Revised: January 1, 2024
          </p>
        </div>

        <section className="prose lg:prose-lg dark:prose-invert max-w-none">
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-6 border-l-4 border-primary pl-4 dark:border-primary">
              Introduction
            </h2>
            <p>
              LogisticsFuture Inc. ("Company", "We", "Our") respects your
              privacy and complies with global data protection regulations
              including GDPR, CCPA, and PIPEDA. This Privacy Policy ("Policy")
              governs all data processing activities related to our logistics
              management platform and associated services ("Services").
            </p>
          </div>

          <div className="space-y-20">
            <Section title="1. Data Collection Framework">
              <SubSection title="1.1 Data Categories">
                <p>We process three categories of information:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="p-4 bg-slate-50 rounded-lg dark:bg-slate-800">
                    <h4 className="font-semibold mb-2">Identity Data</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li>Legal entity details</li>
                      <li>Authorized user profiles</li>
                      <li>Government-issued IDs</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg dark:bg-slate-800">
                    <h4 className="font-semibold mb-2">Operational Data</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li>Shipment manifests</li>
                      <li>Customs documentation</li>
                      <li>GPS tracking data</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg dark:bg-slate-800">
                    <h4 className="font-semibold mb-2">Technical Data</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li>IP addresses</li>
                      <li>Device fingerprints</li>
                      <li>API usage metrics</li>
                    </ul>
                  </div>
                </div>
              </SubSection>

              <SubSection title="1.2 Collection Methods">
                <ul className="list-decimal pl-8 space-y-3">
                  <li>Direct input through client portal</li>
                  <li>Automated IoT sensor collection</li>
                  <li>Third-party trade compliance databases</li>
                  <li>Cookie technologies (see Section 6)</li>
                </ul>
              </SubSection>
            </Section>

            <Section title="2. Legal Basis & Processing">
              <SubSection title="2.1 Lawful Bases">
                <p>We process data under:</p>
                <ul className="list-disc pl-8 space-y-3">
                  <li>Contractual necessity (Article 6(1)(b) GDPR)</li>
                  <li>Legitimate business interests</li>
                  <li>Legal compliance requirements</li>
                </ul>
              </SubSection>

              <SubSection title="2.2 Processing Purposes">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg dark:bg-primary/20">
                    <h4 className="font-semibold mb-2">Core Operations</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Customs clearance processing</li>
                      <li>Carrier performance analytics</li>
                      <li>Risk assessment modeling</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg dark:bg-primary/20">
                    <h4 className="font-semibold mb-2">Value-Added Services</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Predictive supply chain analytics</li>
                      <li>Carbon footprint calculations</li>
                      <li>Trade compliance audits</li>
                    </ul>
                  </div>
                </div>
              </SubSection>
            </Section>

            <Section title="3. Data Sharing Protocol">
              <SubSection title="3.1 Authorized Third Parties">
                <ul className="list-disc pl-8 space-y-3">
                  <li>Certified customs brokers</li>
                  <li>Freight insurance providers</li>
                  <li>Payment processors (PCI DSS compliant)</li>
                  <li>Government regulatory bodies</li>
                </ul>
              </SubSection>

              <SubSection title="3.2 International Transfers">
                <p>
                  Data may be transferred globally using GDPR-approved
                  mechanisms:
                </p>
                <ul className="list-disc pl-8 space-y-3">
                  <li>Standard Contractual Clauses</li>
                  <li>Binding Corporate Rules</li>
                  <li>EU-US Data Privacy Framework</li>
                </ul>
              </SubSection>
            </Section>

            <Section title="4. Data Subject Rights">
              <SubSection title="4.1 Your Entitlements">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg dark:bg-slate-800">
                    <h4 className="font-semibold mb-2">Access & Portability</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li>Right to access report</li>
                      <li>Machine-readable exports</li>
                      <li>API-based data retrieval</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg dark:bg-slate-800">
                    <h4 className="font-semibold mb-2">Control & Objection</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li>Processing restrictions</li>
                      <li>Marketing opt-out</li>
                      <li>Automated decision review</li>
                    </ul>
                  </div>
                </div>
              </SubSection>

              <SubSection title="4.2 Exercise Process">
                <p>Submit requests via:</p>
                <ul className="list-disc pl-8 space-y-3">
                  <li>Client portal dashboard</li>
                  <li>Verified email to DPO</li>
                  <li>Postal request with notarization</li>
                </ul>
              </SubSection>
            </Section>

            <Section title="5. Security Architecture">
              <div className="space-y-6">
                <SubSection title="5.1 Protection Measures">
                  <ul className="list-disc pl-8 space-y-3">
                    <li>AES-256 encryption at rest and in transit</li>
                    <li>Biometric access controls</li>
                    <li>Annual penetration testing</li>
                    <li>SOC 2 Type II certified infrastructure</li>
                  </ul>
                </SubSection>

                <SubSection title="5.2 Breach Protocol">
                  <p>
                    In the event of a data breach affecting user privacy, we
                    will:
                  </p>
                  <ul className="list-decimal pl-8 space-y-3">
                    <li>Notify supervisory authority within 72 hours</li>
                    <li>Contact affected users via secure channels</li>
                    <li>Publish incident report in our transparency center</li>
                  </ul>
                </SubSection>
              </div>
            </Section>

            <Section title="6. Cookies & Tracking">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800">
                      <th className="p-4 text-left">Category</th>
                      <th className="p-4 text-left">Purpose</th>
                      <th className="p-4 text-left">Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="p-4">Essential</td>
                      <td className="p-4">Session maintenance</td>
                      <td className="p-4">24 months</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="p-4">Analytics</td>
                      <td className="p-4">Route optimization</td>
                      <td className="p-4">38 months</td>
                    </tr>
                    <tr>
                      <td className="p-4">Marketing</td>
                      <td className="p-4">Service recommendations</td>
                      <td className="p-4">User-controlled</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm">
                Manage preferences via our{" "}
                <a
                  href="/cookie-settings"
                  className="text-primary hover:underline dark:text-primary"
                >
                  Cookie Consent Portal
                </a>
              </p>
            </Section>

            <div className="bg-primary/10 rounded-xl p-8 dark:bg-primary/20">
              <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primary">
                Data Protection Office
              </h2>
              <p className="mb-2">
                Attn: Chief Privacy Officer
                <br />
                LogisticsFuture Inc.
                <br />
                2000 Global Trade Plaza
                <br />
                Wilmington, DE 19801
                <br />
                United States
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:dpo@logisticsfuture.com"
                  className="text-primary hover:underline dark:text-primary"
                >
                  dpo@logisticsfuture.com
                </a>
              </p>
              <p className="mt-4 text-sm opacity-75">
                For EU/UK Representatives: contact.eu@logisticsfuture.com
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Reusable components
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 border-l-4 border-primary pl-4 dark:border-primary">
        {title}
      </h2>
      {children}
    </div>
  );
}

interface SubSectionProps {
  title: string;
  children: React.ReactNode;
}

function SubSection({ title, children }: SubSectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}
