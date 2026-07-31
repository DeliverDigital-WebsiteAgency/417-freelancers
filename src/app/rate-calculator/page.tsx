import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Target, Clock, TrendingUp } from "lucide-react";
import { RateCalculatorClient } from "./RateCalculatorClient";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/SchemaOrg";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

export const metadata: Metadata = {
  title: "Free Freelance Rate Calculator | 417 Freelancers",
  description:
    "Calculate your ideal freelance hourly rate based on income goals, expenses, taxes, and billable hours. Free tool built for Springfield-area freelancers.",
  alternates: { canonical: `${siteUrl}/rate-calculator` },
  robots: { index: true, follow: true },
};

const features = [
  {
    icon: Target,
    title: "Set your income goal",
    body: "Start with the take-home pay you actually want, not a guess at what clients might pay.",
  },
  {
    icon: Clock,
    title: "Account for real hours",
    body: "Only billable hours count. The calculator factors in admin time, time off, and non-billable work.",
  },
  {
    icon: Calculator,
    title: "Cover taxes and expenses",
    body: "Build in a buffer for self-employment tax, software, insurance, and other business costs.",
  },
  {
    icon: TrendingUp,
    title: "Price full projects",
    body: "Turn your hourly rate into a day rate, weekly rate, or a quote for a specific project.",
  },
];

const faqs = [
  {
    q: "How do freelancers calculate their hourly rate?",
    a: "Start with your desired annual take-home income, add your annual business expenses, then divide by the number of hours you actually expect to bill clients in a year. Build in a buffer for taxes and savings before dividing, since that revenue needs to cover more than just your paycheck.",
  },
  {
    q: "What counts as a billable hour?",
    a: "A billable hour is time spent doing work a client is directly paying for. Time spent on invoicing, marketing, finding new clients, professional development, and general admin is real work, but it is not billable. Most freelancers can only bill 4 to 6 hours out of an 8-hour workday.",
  },
  {
    q: "How much should I set aside for taxes as a freelancer?",
    a: "Self-employment tax in the US is 15.3% on top of your regular federal and state income tax, so many freelancers set aside 25 to 35% of revenue for taxes and savings combined. Your exact number depends on your income level and state. A local accountant can give you a precise figure.",
  },
  {
    q: "Should I charge hourly or by the project?",
    a: "Hourly pricing is simpler and protects you if scope grows, but project pricing rewards efficiency and gives clients cost certainty. A common approach is to calculate your hourly rate first, then use it to build fixed project quotes based on your estimated hours.",
  },
  {
    q: "How often should I raise my rates?",
    a: "Many freelancers review their rates once or twice a year, and raise them as demand increases, skills grow, or costs rise. If you are consistently fully booked with a waitlist, that is a strong signal your rate is below market.",
  },
  {
    q: "Is this calculator specific to Springfield, MO freelancers?",
    a: "The formula works anywhere, but the defaults and guidance are written with 417-area freelancers in mind. Once you have a target rate, you can compare it to what similar freelancers charge locally in our rate guide on the blog.",
  },
];

export default function RateCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Resources", url: `${siteUrl}/resources` },
          { name: "Rate Calculator", url: `${siteUrl}/rate-calculator` },
        ]}
      />
      <FAQPageSchema faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))} />

      {/* Hero */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg, #2C2420 0%, #7C4A1E 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#E8C99A" }}>
            Free Tool for 417 Freelancers
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5" style={{ color: "#F5EFE6" }}>
            Free Freelance Rate Calculator
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "#C8B8A8" }}>
            Stop guessing what to charge. Enter your income goals, expenses, and working hours to get a
            realistic hourly, daily, and project rate in seconds.
          </p>
          <a
            href="#calculator-tool"
            className="inline-block rounded-md px-6 py-3 text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#C47A3A", color: "#fff" }}
          >
            Calculate My Rate
          </a>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5EFE6" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-start gap-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                style={{ backgroundColor: "#E8C99A" }}
              >
                <f.icon size={18} style={{ color: "#7C4A1E" }} />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: "#2C2420" }}>{f.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#6B5E55" }}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: "1px", backgroundColor: "#E8C99A" }} />

      {/* Calculator tool */}
      <section id="calculator-tool" className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5EFE6" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1" style={{ color: "#2C2420" }}>
              Calculate your rate
            </h2>
            <p className="text-sm" style={{ color: "#6B5E55" }}>
              Adjust the numbers below. Your target rate updates automatically.
            </p>
          </div>
          <RateCalculatorClient />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#2C2420" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center" style={{ color: "#F5EFE6" }}>
            Freelance pricing, answered
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: "#C8B8A8" }}>
            Common questions about setting your freelance rates.
          </p>
          <div className="space-y-2">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-lg overflow-hidden"
                style={{ backgroundColor: "#3d3330" }}
              >
                <summary
                  className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none text-sm font-semibold list-none"
                  style={{ color: "#F5EFE6" }}
                >
                  {faq.q}
                  <span
                    className="shrink-0 text-lg leading-none transition-transform group-open:rotate-45"
                    style={{ color: "#C47A3A" }}
                  >
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-1 text-sm leading-relaxed" style={{ color: "#C8B8A8" }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5EFE6" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#2C2420" }}>
            Ready to send that rate to a client?
          </h2>
          <p className="text-base mb-8" style={{ color: "#6B5E55" }}>
            Turn your new rate into a professional quote with our free contract generator, then bill for
            it with our free invoice generator.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contract-generator"
              className="inline-block rounded-md px-6 py-3 text-sm font-semibold transition-colors"
              style={{ backgroundColor: "#7C4A1E", color: "#F5EFE6" }}
            >
              Create a Contract
            </Link>
            <Link
              href="/resources"
              className="inline-block rounded-md px-6 py-3 text-sm font-semibold border transition-colors"
              style={{ borderColor: "#7C4A1E", color: "#7C4A1E", backgroundColor: "transparent" }}
            >
              Browse All Freelancer Resources
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
