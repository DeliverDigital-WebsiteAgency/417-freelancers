import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, Target, ListChecks, Send } from "lucide-react";
import { ProjectBriefBuilderClient } from "./ProjectBriefBuilderClient";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/SchemaOrg";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

export const metadata: Metadata = {
  title: "Free Project Brief Builder | 417 Freelancers",
  description:
    "Write a clear project brief in minutes before you hire. Answer a few plain questions and get a copy-ready brief to send freelancers in the 417 area for web design, photography, video, copywriting, and marketing work.",
  alternates: { canonical: `${siteUrl}/project-brief-builder` },
  robots: { index: true, follow: true },
};

const features = [
  {
    icon: ClipboardList,
    title: "Answer plain questions",
    body: "No jargon. Fill in a few short prompts about your business and what you are trying to get done.",
  },
  {
    icon: Target,
    title: "Get everyone on the same page",
    body: "A clear goal and audience help freelancers quote accurately and pitch the right approach.",
  },
  {
    icon: ListChecks,
    title: "List what you actually need",
    body: "Spell out deliverables and must-have requirements so nothing important gets missed.",
  },
  {
    icon: Send,
    title: "Copy and send",
    body: "Get a tidy, formatted brief you can paste into an email to local freelancers and compare quotes.",
  },
];

const faqs = [
  {
    q: "What is a project brief and why do I need one?",
    a: "A project brief is a short document that explains what you want done, why, and what a successful result looks like. Sending one when you reach out saves everyone time. Freelancers can give you a faster, more accurate quote, and you get proposals you can actually compare side by side instead of a pile of vague replies.",
  },
  {
    q: "Do I have to fill in every field?",
    a: "No. Fill in what you know and skip the rest. Even a title, a goal, a budget range, and a short list of deliverables is far more useful than a one-line request. The more detail you add, the closer the quotes you get back will be to reality.",
  },
  {
    q: "Is my information saved or shared?",
    a: "No. This tool runs entirely in your browser. Nothing you type is saved, stored, or sent anywhere. When you close or refresh the page, the brief is gone, so copy it out when you are done.",
  },
  {
    q: "I do not know my budget yet. What should I put?",
    a: "You can leave the budget as not sure yet, but sharing a range usually helps. It lets freelancers tell you honestly what is realistic and shape a proposal that fits. If you are unsure what a project should cost, our free project cost estimator can give you a planning range first.",
  },
  {
    q: "What do I do with the brief once it is written?",
    a: "Copy it, then paste it into an email or message to a few freelancers in the 417 Freelancers directory. Reaching out to two or three people with the same brief makes it easy to compare their approach, timeline, and price before you decide who to hire.",
  },
  {
    q: "How is this different from a contract?",
    a: "A brief describes the project so you can get quotes and pick someone. A contract is the agreement you sign once you have chosen a freelancer, covering scope, payment, revisions, and ownership. Use the brief first to hire, then our free contract generator to put the working terms in writing.",
  },
];

export default function ProjectBriefBuilderPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Resources", url: `${siteUrl}/resources` },
          { name: "Project Brief Builder", url: `${siteUrl}/project-brief-builder` },
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
            Project Brief Builder
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "#C8B8A8" }}>
            The clearer your brief, the better the quotes you get back. Answer a few short questions
            and walk away with a copy-ready brief to send freelancers in the 417.
          </p>
          <a
            href="#brief-tool"
            className="inline-block rounded-md px-6 py-3 text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#C47A3A", color: "#fff" }}
          >
            Build My Brief
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

      {/* Brief tool */}
      <section id="brief-tool" className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5EFE6" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1" style={{ color: "#2C2420" }}>
              Build your brief
            </h2>
            <p className="text-sm" style={{ color: "#6B5E55" }}>
              Fill in what you know. Your brief updates on the right as you go, then copy it out.
            </p>
          </div>
          <ProjectBriefBuilderClient />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#2C2420" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center" style={{ color: "#F5EFE6" }}>
            Writing a brief, answered
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: "#C8B8A8" }}>
            Common questions about briefing a freelancer before you hire.
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
            Brief in hand? Find your freelancer
          </h2>
          <p className="text-base mb-8" style={{ color: "#6B5E55" }}>
            Browse the 417 Freelancers directory, send your brief to a few local pros, and compare
            their quotes. Not sure on budget yet? Try the project cost estimator first.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/directory"
              className="inline-block rounded-md px-6 py-3 text-sm font-semibold transition-colors"
              style={{ backgroundColor: "#7C4A1E", color: "#F5EFE6" }}
            >
              Browse the Directory
            </Link>
            <Link
              href="/project-cost-estimator"
              className="inline-block rounded-md px-6 py-3 text-sm font-semibold border transition-colors"
              style={{ borderColor: "#7C4A1E", color: "#7C4A1E", backgroundColor: "transparent" }}
            >
              Estimate My Project Cost
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
