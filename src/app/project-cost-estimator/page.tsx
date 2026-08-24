import type { Metadata } from "next";
import Link from "next/link";
import { Wallet, Layers, Gauge, Clock } from "lucide-react";
import { ProjectCostEstimatorClient } from "./ProjectCostEstimatorClient";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/SchemaOrg";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

export const metadata: Metadata = {
  title: "Freelance Project Cost Estimator | 417 Freelancers",
  description:
    "Estimate what a freelance project costs before you reach out. Pick a service, project size, and timeline to get a planning budget for web design, photography, video, copywriting, and marketing in the 417 area.",
  alternates: { canonical: `${siteUrl}/project-cost-estimator` },
  robots: { index: true, follow: true },
};

const features = [
  {
    icon: Layers,
    title: "Pick your project",
    body: "Choose the service and a project size, from a quick one-off to a full build, with plain examples.",
  },
  {
    icon: Gauge,
    title: "Adjust for complexity",
    body: "Custom work, integrations, and unknowns cost more. Flag complex jobs so the estimate reflects it.",
  },
  {
    icon: Clock,
    title: "Factor in the timeline",
    body: "Rush work carries a premium. Toggle a tight deadline to see how it changes the range.",
  },
  {
    icon: Wallet,
    title: "Set a real budget",
    body: "Get an honest cost range you can plan around before asking local freelancers for a firm quote.",
  },
];

const faqs = [
  {
    q: "How much does it cost to hire a freelancer in the 417 area?",
    a: "It depends heavily on the service and scope. Small one-off jobs often land in the low hundreds, while multi-week projects like a custom website or a full brand identity can run into the thousands. This estimator gives you a planning range based on typical local hourly rates and the number of hours a project of that size usually takes.",
  },
  {
    q: "Is this estimate a real quote?",
    a: "No. It is a planning tool to help you set a budget. Actual pricing depends on your exact requirements, the freelancer's experience level, and how the work is structured. Once you have a range, reach out to a few local freelancers in our directory for firm quotes.",
  },
  {
    q: "Why is there such a wide range in the estimate?",
    a: "Freelance work is not one-size-fits-all. Two projects that sound similar can differ a lot in hours once the details are clear, and experienced specialists charge more than generalists. The low end reflects a lean scope with a value-priced freelancer, and the high end reflects a larger scope with a senior specialist.",
  },
  {
    q: "Should I hire hourly or for a fixed project price?",
    a: "Many freelancers offer both. Fixed project pricing gives you cost certainty when the scope is well defined, while hourly billing is common for ongoing or open-ended work. Whichever you choose, a clear written scope protects both sides. Our free contract generator can help you put one together.",
  },
  {
    q: "What makes a project cost more than expected?",
    a: "Unclear scope is the biggest driver. Vague briefs lead to extra revision rounds, added features mid-project, and rework. Tight deadlines, custom integrations, and multiple stakeholders also add hours. Writing down exactly what you need before you start keeps costs closer to the estimate.",
  },
  {
    q: "How can I keep freelance costs down without cutting corners?",
    a: "Come prepared with a clear brief, examples of what you like, and any assets the freelancer will need. Bundle related work into one project rather than many small requests, be responsive during the work, and keep revisions grouped. Clear communication saves hours, and saved hours mean a lower bill.",
  },
];

export default function ProjectCostEstimatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Resources", url: `${siteUrl}/resources` },
          { name: "Project Cost Estimator", url: `${siteUrl}/project-cost-estimator` },
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
            Freelance Project Cost Estimator
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "#C8B8A8" }}>
            Wondering what your project should cost before you reach out? Pick a service, a project
            size, and a timeline to get an honest budget range for hiring a freelancer in the 417.
          </p>
          <a
            href="#estimator-tool"
            className="inline-block rounded-md px-6 py-3 text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#C47A3A", color: "#fff" }}
          >
            Estimate My Project
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

      {/* Estimator tool */}
      <section id="estimator-tool" className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5EFE6" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1" style={{ color: "#2C2420" }}>
              Estimate your project
            </h2>
            <p className="text-sm" style={{ color: "#6B5E55" }}>
              Adjust the options below. Your budget range updates automatically.
            </p>
          </div>
          <ProjectCostEstimatorClient />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#2C2420" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center" style={{ color: "#F5EFE6" }}>
            Freelance budgeting, answered
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: "#C8B8A8" }}>
            Common questions about what freelance work costs.
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
            Ready to find the right freelancer?
          </h2>
          <p className="text-base mb-8" style={{ color: "#6B5E55" }}>
            Browse the 417 Freelancers directory to get firm quotes from vetted local professionals,
            then lock in the details with our free contract generator.
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
