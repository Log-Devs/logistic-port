import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {
  LEGAL_EFFECTIVE_DATE,
  LEGAL_COMPANY_NAME,
  LEGAL_COMPANY_ADDRESS,
  LEGAL_DPO_EMAIL,
} from "../legal-config";
import React from "react"; // Added React import

// Moved components to top for proper declaration
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

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <main className="flex-1 container mt-10 max-w-5xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="inline-flex items-center gap-3 bg-primary/10 dark:bg-primary/20 px-8 py-6 rounded-full">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent dark:from-primary dark:to-[#b30000] text-center">
              Privacy Policy
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-4 text-center">
            Effective Date: {LEGAL_EFFECTIVE_DATE}
          </p>
        </div>

        <section className="prose lg:prose-lg dark:prose-invert max-w-none">
          <Section title="1. Data Collection Framework">
            <div className="mb-20">
              <p>
                {LEGAL_COMPANY_NAME} ("Company", "We", "Our") respects your
                privacy and complies with global data protection regulations
                including GDPR, CCPA, and PIPEDA. This Privacy Policy ("Policy")
                governs all data processing activities related to our logistics
                management platform and associated services ("Services").
              </p>

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
            </div>
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

          {/* Other sections follow similar structure */}

          <div className="bg-primary/10 rounded-xl p-8 dark:bg-primary/20 mt-8">
            <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primary">
              Data Protection Office
            </h2>
            <p className="mb-2">
              Attn: Chief Privacy Officer
              <br />
              {LEGAL_COMPANY_NAME}
              <br />
              {LEGAL_COMPANY_ADDRESS[0]}
              <br />
              {LEGAL_COMPANY_ADDRESS[1]}
              <br />
              {LEGAL_COMPANY_ADDRESS[2]}
            </p>
            <p>
              Email:{" "}
              <a
                href={`mailto:${LEGAL_DPO_EMAIL}`}
                className="text-primary hover:underline dark:text-primary"
              >
                {LEGAL_DPO_EMAIL}
              </a>
            </p>
            <p className="mt-4 text-sm opacity-75">
              For EU/UK Representatives: contact.eu@logisticsfuture.com
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
