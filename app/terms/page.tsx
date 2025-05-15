// Reusable section components
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

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {
  LEGAL_EFFECTIVE_DATE,
  LEGAL_COMPANY_NAME,
  LEGAL_COMPANY_ADDRESS,
  LEGAL_EMAIL,
  LEGAL_GOVERNING_LAW,
} from "../legal-config";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <main className="flex-1 container mt-10 max-w-5xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="inline-flex items-center gap-3 bg-primary/10 dark:bg-primary/20 px-8 py-6 rounded-full">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent dark:from-primary dark:to-[#b30000] text-center">
              Terms of Service
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-4 text-center">
            Effective Date: {LEGAL_EFFECTIVE_DATE}
          </p>
        </div>
        <section className="prose lg:prose-lg dark:prose-invert max-w-none">
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-6 border-l-4 border-primary pl-4 dark:border-primary">
              Introduction
            </h2>
            <p>
              These Terms of Service ("Agreement") govern your access to and use
              of {LEGAL_COMPANY_NAME}'s ("Company", "We", "Our") digital
              platforms, services, and solutions (collectively, "Services"). By
              accessing or using our Services, you ("Client", "You") agree to be
              legally bound by these Terms. If acting on behalf of an entity,
              you represent authority to bind said entity.
            </p>
          </div>

          <div className="space-y-20">
            {/* Section 1 */}
            <div>
              <h2 className="text-3xl font-bold mb-6 border-l-4 border-primary pl-4 dark:border-primary">
                1. Service Engagement
              </h2>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">1.1 Scope of Services</h3>
                <p>
                  We provide comprehensive logistics solutions including but not
                  limited to:
                </p>
                <ul className="list-disc pl-8 space-y-3">
                  <li>Freight management and optimization</li>
                  <li>Global supply chain orchestration</li>
                  <li>Customs brokerage services</li>
                  <li>Inventory warehousing solutions</li>
                  <li>Real-time logistics analytics</li>
                </ul>

                <h3 className="text-xl font-semibold">
                  1.2 Service Modifications
                </h3>
                <p>
                  We reserve the right to modify, suspend, or discontinue any
                  Service component with 30 days' prior notice. Material changes
                  will be communicated via registered email or through our
                  client portal.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-3xl font-bold mb-6 border-l-4 border-primary pl-4 dark:border-primary">
                2. Client Obligations
              </h2>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">
                  2.1 Account Management
                </h3>
                <p>Clients must:</p>
                <ul className="list-decimal pl-8 space-y-3">
                  <li>
                    Maintain updated organizational and billing information
                  </li>
                  <li>
                    Implement multi-factor authentication for account access
                  </li>
                  <li>Immediately report unauthorized account activity</li>
                </ul>

                <h3 className="text-xl font-semibold">
                  2.2 Regulatory Compliance
                </h3>
                <p>
                  Client agrees to comply with all applicable international
                  trade laws including:
                </p>
                <ul className="list-disc pl-8 space-y-3">
                  <li>INCOTERMS 2020 regulations</li>
                  <li>OFAC export control requirements</li>
                  <li>Customs-Trade Partnership Against Terrorism (C-TPAT)</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-3xl font-bold mb-6 border-l-4 border-primary pl-4 dark:border-primary">
                3. Financial Terms
              </h2>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">3.1 Fee Structure</h3>
                <p>Fees are calculated based on:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="p-4 bg-slate-50 rounded-lg dark:bg-slate-800">
                    <strong>Transactional Fees:</strong> Per-shipment charges
                    based on weight/dimensions
                  </li>
                  <li className="p-4 bg-slate-50 rounded-lg dark:bg-slate-800">
                    <strong>Subscription Fees:</strong> Monthly platform access
                    charges
                  </li>
                  <li className="p-4 bg-slate-50 rounded-lg dark:bg-slate-800">
                    <strong>Incidental Fees:</strong> Customs duties, storage
                    fees, etc.
                  </li>
                </ul>

                <h3 className="text-xl font-semibold">3.2 Payment Terms</h3>
                <p>
                  Invoices are payable within 15 days of receipt. Late payments
                  incur:
                </p>
                <ul className="list-disc pl-8">
                  <li>1.5% monthly interest charge</li>
                  <li>$75 late payment fee</li>
                  <li>
                    Potential service suspension after 45 days delinquency
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 4+ (Professional Sections) */}
            <div className="space-y-16">
              <Section title="4. Liability Framework">
                <SubSection title="4.1 Service Guarantees">
                  <p>
                    While we employ industry-standard measures, we do not
                    guarantee uninterrupted service availability. Maximum
                    service credits for downtime shall not exceed 20% of monthly
                    fees.
                  </p>
                </SubSection>
                <SubSection title="4.2 Consequential Damages">
                  <p>
                    Under no circumstances shall {LEGAL_COMPANY_NAME} be liable
                    for indirect, special, or consequential damages including
                    lost profits, data loss, or business interruption.
                  </p>
                </SubSection>
              </Section>

              <Section title="5. Intellectual Property">
                <p>
                  All logistics algorithms, route optimization models, and
                  platform interfaces remain our exclusive property. Clients
                  receive limited, revocable license to access our Services.
                </p>
              </Section>

              <Section title="6. Dispute Resolution">
                <SubSection title="6.1 Arbitration">
                  <p>
                    Any disputes shall be resolved through binding arbitration
                    under ICC Rules with proceedings held in Singapore.
                  </p>
                </SubSection>
                <SubSection title="6.2 Governing Law">
                  <p>
                    This Agreement shall be governed by the laws of the{" "}
                    {LEGAL_GOVERNING_LAW}, excluding its conflict of laws
                    principles.
                  </p>
                </SubSection>
              </Section>
            </div>

            <div className="bg-primary/10 rounded-xl p-8 dark:bg-primary/20">
              <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primary">
                Contact Information
              </h2>
              <p className="mb-2">
                {LEGAL_COMPANY_NAME}
                <br />
                {LEGAL_COMPANY_ADDRESS[0]}
                <br />
                {LEGAL_COMPANY_ADDRESS[1]}
                <br />
                {LEGAL_COMPANY_ADDRESS[2]}
              </p>
              <p>
                Legal Inquiries:{" "}
                <a
                  href={`mailto:${LEGAL_EMAIL}`}
                  className="text-primary hover:underline dark:text-primary"
                >
                  {LEGAL_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
