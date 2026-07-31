import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck, ShieldCheck, PenTool, Download } from "lucide-react";
import { ContractClient } from "./ContractClient";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/SchemaOrg";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

export const metadata: Metadata = {
  title: "Free Freelance Contract Generator | 417 Freelancers",
  description:
    "Create a professional freelance services agreement and export it as a PDF in minutes. Covers scope, payment terms, revisions, and ownership. Free, no account required.",
  alternates: { canonical: `${siteUrl}/contract-generator` },
  robots: { index: true, follow: true },
};

const features = [
  {
    icon: FileCheck,
    title: "Covers the essentials",
    body: "Scope of work, timeline, payment terms, revisions, and ownership, all in one document.",
  },
  {
    icon: ShieldCheck,
    title: "Protects both sides",
    body: "Clear terms around late payments, termination, and confidentiality reduce disputes before they start.",
  },
  {
    icon: PenTool,
    title: "Customize every clause",
    body: "Adjust deposit amounts, revision rounds, ownership timing, and governing state to fit your project.",
  },
  {
    icon: Download,
    title: "Export as PDF",
    body: "Download a clean, print-ready PDF to send for signature. No account, no subscription.",
  },
];

const faqs = [
  {
    q: "Do freelancers really need a contract?",
    a: "Yes, for any project involving real money or meaningful time. A contract protects you if a client disappears mid-project, disputes an invoice, or asks for unlimited free revisions. It also signals professionalism, which itself helps you win better clients.",
  },
  {
    q: "Is this contract legally binding?",
    a: "A signed agreement between two parties is generally enforceable, but enforceability depends on your state, the specific terms, and how the agreement is executed. This tool provides a solid general-purpose template. For high-value projects or unusual terms, have a licensed attorney review it before use.",
  },
  {
    q: "When should Client pay a deposit?",
    a: "A deposit of 25 to 50% before work begins is standard for freelance projects, and protects you from doing unpaid work if a client backs out early. Larger or longer projects sometimes split payment into more milestones instead of a single deposit and final payment.",
  },
  {
    q: "How many revision rounds should I include?",
    a: "Two rounds of revisions is a common default for most design, writing, and web projects. Fewer rounds can frustrate clients; unlimited revisions can drag a project out indefinitely. Whatever you choose, state it clearly so both sides know what happens if more rounds are needed.",
  },
  {
    q: "When should ownership of the work transfer to the client?",
    a: "Most freelancers transfer ownership upon final payment, not upon signing. This protects you if a client stops paying partway through, since they do not gain rights to unfinished or unpaid-for work.",
  },
  {
    q: "Can I reuse this contract for every client?",
    a: "Yes. Your business details are saved in your browser so you only need to re-enter client and project details for each new agreement. Always double-check dates, fees, and scope before sending.",
  },
];

export default function ContractGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Resources", url: `${siteUrl}/resources` },
          { name: "Contract Generator", url: `${siteUrl}/contract-generator` },
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
            Free Freelance Contract Generator
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "#C8B8A8" }}>
            Build a clear, professional service agreement in minutes. Set your scope, payment terms, and
            ownership rights, then export a print-ready PDF to send for signature.
          </p>
          <a
            href="#contract-tool"
            className="inline-block rounded-md px-6 py-3 text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#C47A3A", color: "#fff" }}
          >
            Create My Contract
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

      {/* Contract tool */}
      <section id="contract-tool" className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5EFE6" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1" style={{ color: "#2C2420" }}>
              Build your contract
            </h2>
            <p className="text-sm" style={{ color: "#6B5E55" }}>
              Fill in your details below, then click Generate Contract to preview and download your PDF.
            </p>
          </div>
          <ContractClient />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#2C2420" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center" style={{ color: "#F5EFE6" }}>
            Freelance contracts, answered
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: "#C8B8A8" }}>
            Common questions about protecting yourself with a written agreement.
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
            Ready to bill for the work?
          </h2>
          <p className="text-base mb-8" style={{ color: "#6B5E55" }}>
            Once the contract is signed and the project is underway, use our free invoice generator to
            get paid.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/invoice"
              className="inline-block rounded-md px-6 py-3 text-sm font-semibold transition-colors"
              style={{ backgroundColor: "#7C4A1E", color: "#F5EFE6" }}
            >
              Create an Invoice
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
