import type { Metadata } from "next";
import Link from "next/link";
import { Scale, ListChecks, MessageCircleQuestion, ShieldCheck } from "lucide-react";
import { QuoteComparisonClient } from "./QuoteComparisonClient";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/SchemaOrg";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

export const metadata: Metadata = {
  title: "Free Freelancer Quote Comparison Tool | 417 Freelancers",
  description:
    "Compare freelancer quotes side by side. Enter price, timeline, and what each quote includes, then see gaps and get questions to ask before you hire in the 417 area.",
  alternates: { canonical: `${siteUrl}/freelancer-quote-comparison` },
  robots: { index: true, follow: true },
};

const features = [
  {
    icon: Scale,
    title: "Compare side by side",
    body: "Line up two to four quotes by price, timeline, and what each one actually covers.",
  },
  {
    icon: ListChecks,
    title: "Spot what is missing",
    body: "A short checklist shows which quotes leave out scope, revisions, ownership, or support.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Get follow-up questions",
    body: "For every gap, you get a plain question to send the freelancer before you commit.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    body: "Everything stays in your browser. Nothing is saved or sent anywhere.",
  },
];

const faqs = [
  {
    q: "Should I just pick the cheapest quote?",
    a: "Not automatically. A low price can mean a narrower scope, fewer revisions, or no support after delivery. Compare what each quote includes first, then weigh price. If two quotes are far apart, ask the lower one what is not covered.",
  },
  {
    q: "How many quotes should I collect?",
    a: "Two or three is usually enough. Fewer than that makes it hard to tell what is normal for your project, and more than four tends to add confusion rather than clarity. Sending each freelancer the same written brief makes the quotes much easier to compare.",
  },
  {
    q: "What if a quote does not mention one of the checklist items?",
    a: "Leave it unchecked and use the suggested question. Often the freelancer simply did not spell it out, and a quick reply will clear it up. If they will not put it in writing, treat that as useful information.",
  },
  {
    q: "Does the tool pick a winner for me?",
    a: "No. It highlights the lowest price, the fastest timeline, and the most complete quote, but the right choice also depends on fit, communication, and the quality of past work. Use it to organize your thinking, not replace it.",
  },
  {
    q: "Is my information saved or shared?",
    a: "No. The tool runs entirely in your browser. When you refresh or close the page, everything you entered is cleared.",
  },
];

export default function FreelancerQuoteComparisonPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Resources", url: `${siteUrl}/resources` },
          { name: "Freelancer Quote Comparison", url: `${siteUrl}/freelancer-quote-comparison` },
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
            Free Tool for Hiring Locally
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5" style={{ color: "#F5EFE6" }}>
            Freelancer Quote Comparison
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "#C8B8A8" }}>
            Got a few quotes back? Put them side by side, see what each one leaves out, and know
            which questions to ask before you choose a freelancer in the 417.
          </p>
          <a
            href="#compare-tool"
            className="inline-block rounded-md px-6 py-3 text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#C47A3A", color: "#fff" }}
          >
            Compare My Quotes
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

      {/* Tool */}
      <section id="compare-tool" className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5EFE6" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1" style={{ color: "#2C2420" }}>
              Enter your quotes
            </h2>
            <p className="text-sm" style={{ color: "#6B5E55" }}>
              Fill in what you have. The comparison updates as you type.
            </p>
          </div>
          <QuoteComparisonClient />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#2C2420" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center" style={{ color: "#F5EFE6" }}>
            Comparing quotes, answered
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: "#C8B8A8" }}>
            Common questions about choosing between freelancer proposals.
          </p>
          <div className="space-y-2">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-lg overflow-hidden" style={{ backgroundColor: "#3d3330" }}>
                <summary
                  className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none text-sm font-semibold list-none"
                  style={{ color: "#F5EFE6" }}
                >
                  {faq.q}
                  <span className="shrink-0 text-lg leading-none transition-transform group-open:rotate-45" style={{ color: "#C47A3A" }}>
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
            Ready to choose? Put it in writing
          </h2>
          <p className="text-base mb-8" style={{ color: "#6B5E55" }}>
            Once you have picked a freelancer, confirm scope, payment, and ownership with a simple
            contract. Still gathering quotes? Browse local pros in the directory.
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
              href="/directory"
              className="inline-block rounded-md px-6 py-3 text-sm font-semibold border transition-colors"
              style={{ borderColor: "#7C4A1E", color: "#7C4A1E", backgroundColor: "transparent" }}
            >
              Browse the Directory
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
