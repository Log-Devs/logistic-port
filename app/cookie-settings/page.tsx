"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { Check, Cookie, ShieldCheck, ChevronDown, Info } from "lucide-react";

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  cookies?: Array<{ name: string; purpose: string; duration: string }>;
}

const cookieCategories: CookieCategory[] = [
  {
    id: "essential",
    name: "Essential",
    description: "Necessary for site functionality",
    required: true,
    cookies: [
      { name: "session_id", purpose: "User authentication", duration: "24h" },
      {
        name: "csrf_token",
        purpose: "Security validation",
        duration: "Session",
      },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Helps us improve the site",
    required: false,
    cookies: [
      { name: "ga_metrics", purpose: "Usage tracking", duration: "2 years" },
      {
        name: "perf_cookies",
        purpose: "Performance metrics",
        duration: "1 year",
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Personalized offers and advertising",
    required: false,
    cookies: [
      { name: "ad_targeting", purpose: "Ad preferences", duration: "6 months" },
      {
        name: "affiliate_tracking",
        purpose: "Partner referrals",
        duration: "1 year",
      },
    ],
  },
];

export default function CookieSettingsPage() {
  const [settings, setSettings] = useState(() => ({
    essential: true,
    analytics: false,
    marketing: false,
  }));
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showSavedBanner, setShowSavedBanner] = useState(false);
  const [consentHistory, setConsentHistory] = useState<Date[]>([]);

  // Load saved preferences and consent history from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("cookiePreferences");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    const savedHistory = localStorage.getItem("consentHistory");
    if (savedHistory) {
      // Parse dates from string
      setConsentHistory(
        JSON.parse(savedHistory).map((d: string) => new Date(d))
      );
    }
  }, []);

  const handleToggle = (categoryId: string) => {
    if (categoryId === "essential") return;
    setSettings((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId as keyof typeof prev],
    }));
    setShowSavedBanner(false);
  };

  const savePreferences = () => {
    localStorage.setItem("cookiePreferences", JSON.stringify(settings));
    const nonEssentialEnabled = settings.analytics || settings.marketing;
    localStorage.setItem(
      "cookie_consent",
      nonEssentialEnabled ? "accepted" : "rejected"
    );
    const newHistory = [...consentHistory, new Date()];
    setConsentHistory(newHistory);
    localStorage.setItem("consentHistory", JSON.stringify(newHistory));
    setShowSavedBanner(true);
    setTimeout(() => setShowSavedBanner(false), 3000);
  };

  const resetToDefault = () => {
    setSettings({ essential: true, analytics: false, marketing: false });
    setShowSavedBanner(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      {/* Saved Preferences Banner */}
      {showSavedBanner && (
        <div className="fixed top-20 right-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <Check className="w-5 h-5" />
          Preferences saved successfully!
        </div>
      )}

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 bg-primary/10 dark:bg-primary/20 px-6 py-3 rounded-full">
            <Cookie className="w-5 h-5 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent dark:from-primary dark:to-[#b30000]">
              Consent Management
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Control your data privacy preferences through granular cookie
            settings. Review individual tracking technologies and manage
            opt-in/opt-out choices.
          </p>
        </div>

        <div className="space-y-8">
          {/* Preferences Panel */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4 mb-8">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Privacy Preferences Center</h2>
            </div>

            {cookieCategories.map((category) => (
              <div key={category.id} className="group">
                <div className="flex items-start justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-xl transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {category.name}
                      </h3>
                      {category.required && (
                        <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                          Always Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {category.description}
                    </p>

                    {expandedCategory === category.id && (
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                          <Info className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Active Cookies
                          </span>
                        </div>
                        <div className="grid gap-2 text-sm">
                          {category.cookies?.map((cookie) => (
                            <div
                              key={cookie.name}
                              className="flex justify-between items-center bg-slate-50 dark:bg-slate-700/30 px-4 py-2 rounded"
                            >
                              <span className="font-medium">{cookie.name}</span>
                              <span className="text-slate-500 dark:text-slate-400">
                                {cookie.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-4 ml-4">
                    <button
                      onClick={() =>
                        setExpandedCategory(
                          expandedCategory === category.id ? null : category.id
                        )
                      }
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      <ChevronDown
                        className={`w-5 h-5 transform transition-transform ${
                          expandedCategory === category.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {!category.required && (
                      <div className="relative inline-block w-12 align-middle select-none">
                        <input
                          type="checkbox"
                          checked={
                            settings[category.id as keyof typeof settings]
                          }
                          onChange={() => handleToggle(category.id)}
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 border-slate-300 appearance-none cursor-pointer transition-transform"
                          id={category.id}
                        />
                        <label
                          htmlFor={category.id}
                          className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer transition-colors"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Panel */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Consent History</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Last updated:{" "}
                  {consentHistory[
                    consentHistory.length - 1
                  ]?.toLocaleDateString() || "Never"}
                </p>
              </div>

              <div className="flex gap-4 w-full md:w-auto">
                <button
                  onClick={resetToDefault}
                  className="px-6 py-3 w-full md:w-auto text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Reset Defaults
                </button>
                <button
                  onClick={savePreferences}
                  className="px-6 py-3 w-full md:w-auto text-sm font-medium bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg hover:from-primary hover:to-[#b30000] transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Confirm Preferences
                </button>
              </div>
            </div>
          </div>

          {/* Compliance Notice */}
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            By managing your preferences, you agree to our{" "}
            <a
              href="/privacy"
              className="text-primary hover:underline dark:text-primary"
            >
              Privacy Policy
            </a>{" "}
            and consent to cookie usage as described in our{" "}
            <a
              href="/cookies"
              className="text-primary hover:underline dark:text-primary"
            >
              Cookie Policy
            </a>
            .
          </div>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .toggle-checkbox:checked {
          transform: translateX(1.5rem);
          border-color: rgb(220 38 38);
          background-color: rgb(220 38 38);
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: rgba(220, 38, 38, 0.2);
        }
        .dark .toggle-checkbox:checked {
          background-color: rgb(239 68 68);
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
