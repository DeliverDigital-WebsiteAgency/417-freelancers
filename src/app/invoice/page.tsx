import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Download, Palette, Clock } from "lucide-react";
import { InvoiceClient } from "./InvoiceClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

export const metadata: Metadata = {
  title: "Free Invoice Generator for Freelancers | 417 Freelancers",
  description:
    "Create professional freelance invoices and export as PDF in seconds. No account required. Add your logo, brand colors, line items, and payment link. Built for Springfield-area freelancers.",
  alternates: { canonical: `${siteUrl}/invoice` },
  robots: { index: true, follow: true },
};

const features = [
  {
    icon: FileText,
    title: "Professional invoices",
    body: "Clean, client-ready invoice layout with your branding, itemized services, tax, and totals.",
  },
  {
    icon: Palette,
    title: "Your brand, your colors",
    body: "Upload your logo and set your brand colors. Saved automatically — ready next time you visit.",
  },
  {
    icon: Download,
    title: "Export as PDF",
    body: "Download a print-ready PDF in one click. Send it directly to your client or save it for your records.",
  },
  {
    icon: Clock,
    title: "No account required",
    body: "Free forever. No signup, no subscription, no credit card. Just open it and start invoicing.",
  },
];

const faqs = [
  {
    q: "What should a freelance invoice include?",
    a: "Every invoice should include your business name and contact info, the client's name and contact info, a unique invoice number, the issue date and due date, an itemized list of services with quantities and rates, and the total amount due. A payment link or instructions make it even easier to get paid.",
  },
  {
    q: "When should I send an invoice?",
    a: "Send it as soon as you complete the work or reach a billing milestone. The faster you invoice, the faster you get paid. For ongoing projects, set a regular billing schedule (weekly or monthly) so clients expect it and budget for it.",
  },
  {
    q: "What payment terms should I set?",
    a: "Net 30 (payment due within 30 days) is the most common standard. For smaller projects or new clients, Net 15 or even due-on-receipt is reasonable. State your terms clearly on every invoice and in your contract so there are no surprises.",
  },
  {
    q: "Do I need to charge sales tax as a freelancer in Missouri?",
    a: "In Missouri, services are generally not subject to sales tax, but the answer depends on the specific nature of your work and deliverables. For example, selling a physical product or certain digital goods may be taxable. Talk to a local accountant if you're unsure. This tool lets you set a tax rate of 0% if it doesn't apply to you.",
  },
  {
    q: "How should I number my invoices?",
    a: "Use a sequential numbering system like INV-001, INV-002, or include the year: 2026-001. Consistent numbering makes it easy to track payments, reference invoices in conversations with clients, and organize your records at tax time.",
  },
  {
    q: "What if a client doesn't pay on time?",
    a: "Send a polite follow-up email the day after the due date, then again one week later. Reference the invoice number and total. If payment is still not received, consider adding a late fee clause to future contracts (typically 1.5% per month). Including your payment link on the invoice removes friction and often speeds up payment.",
  },
  {
    q: "How do I handle partial payments or deposits?",
    a: "Create separate invoices: one for the deposit (due upfront) and one for the remaining balance (due on delivery or completion). Reference the project name and invoice numbers in both so your client has a clear paper trail.",
  },
  {
    q: "Is this invoice generator really free?",
    a: "Yes, completely free. No account, no subscription, no hidden fees. 417 Freelancers is a community resource for Springfield-area freelancers, and this tool is part of that. Your branding (logo and colors) is saved to your browser so you don't have to re-enter it each visit.",
  },
];

export default function InvoicePage() {
  return (
    <>
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
            Free Invoice Generator<br className="hidden sm:block" /> for Freelancers
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "#C8B8A8" }}>
            Build a professional, branded invoice in minutes. Add your logo, set your colors, list your services,
            and export a clean PDF to send your client. No account. No subscription. Always free.
          </p>
          <a
            href="#invoice-tool"
            className="inline-block rounded-md px-6 py-3 text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#C47A3A", color: "#fff" }}
          >
            Create My Invoice
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

      {/* Divider */}
      <div style={{ height: "1px", backgroundColor: "#E8C99A" }} />

      {/* Invoice tool */}
      <section id="invoice-tool" className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5EFE6" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1" style={{ color: "#2C2420" }}>
              Build your invoice
            </h2>
            <p className="text-sm" style={{ color: "#6B5E55" }}>
              Fill in your details below, then click Generate Invoice to preview and download your PDF.
            </p>
          </div>
          <InvoiceClient />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#2C2420" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center" style={{ color: "#F5EFE6" }}>
            Freelance invoicing, answered
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: "#C8B8A8" }}>
            Common questions about invoicing as an independent freelancer.
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
            Looking for local freelance work?
          </h2>
          <p className="text-base mb-8" style={{ color: "#6B5E55" }}>
            Get listed in the 417 Freelancers directory and connect with Springfield-area businesses
            that want to hire someone local.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/apply"
              className="inline-block rounded-md px-6 py-3 text-sm font-semibold transition-colors"
              style={{ backgroundColor: "#7C4A1E", color: "#F5EFE6" }}
            >
              Apply to Join the Directory
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
