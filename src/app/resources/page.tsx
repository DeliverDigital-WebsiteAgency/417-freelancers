import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

export const metadata: Metadata = {
  title: "Freelancer Resources | 417 Freelancers",
  description:
    "Free tools for freelancers in the 417 area. Create invoices, calculate your rate, and generate contracts instantly with no account required.",
  alternates: { canonical: `${siteUrl}/resources` },
  robots: { index: true, follow: true },
};

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg, #2C2420 0%, #7C4A1E 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#E8C99A" }}>
            417 Community
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "#F5EFE6" }}>
            Resources for Freelancers
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#C8B8A8" }}>
            Free tools built for freelancers in the 417 area.
          </p>
        </div>
      </section>

      {/* Tools */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#2C2420" }}>
            Tools
          </h2>
          <p className="text-base" style={{ color: "#6B5E55" }}>
            Practical tools that keep your freelance business organized and looking professional.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/invoice"
            className="group flex flex-col rounded-lg p-6 border transition-shadow hover:shadow-md"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E8C99A" }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-base font-semibold leading-snug" style={{ color: "#2C2420" }}>
                Free Invoice Generator
              </h3>
              <ArrowRight size={15} className="mt-0.5 shrink-0" style={{ color: "#C47A3A" }} />
            </div>
            <p className="text-sm leading-relaxed flex-1" style={{ color: "#6B5E55" }}>
              Create and export professional PDF invoices right here on 417 Freelancers. Add your logo, brand colors, line items, and a payment link. No account required.
            </p>
            <span className="mt-4 text-sm font-medium group-hover:underline" style={{ color: "#C47A3A" }}>
              Open Tool
            </span>
          </Link>
          <Link
            href="/rate-calculator"
            className="group flex flex-col rounded-lg p-6 border transition-shadow hover:shadow-md"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E8C99A" }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-base font-semibold leading-snug" style={{ color: "#2C2420" }}>
                Free Rate Calculator
              </h3>
              <ArrowRight size={15} className="mt-0.5 shrink-0" style={{ color: "#C47A3A" }} />
            </div>
            <p className="text-sm leading-relaxed flex-1" style={{ color: "#6B5E55" }}>
              Calculate your ideal freelance hourly rate based on your income goals, expenses, taxes, and billable hours.
            </p>
            <span className="mt-4 text-sm font-medium group-hover:underline" style={{ color: "#C47A3A" }}>
              Open Tool
            </span>
          </Link>
          <Link
            href="/contract-generator"
            className="group flex flex-col rounded-lg p-6 border transition-shadow hover:shadow-md"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E8C99A" }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-base font-semibold leading-snug" style={{ color: "#2C2420" }}>
                Free Contract Generator
              </h3>
              <ArrowRight size={15} className="mt-0.5 shrink-0" style={{ color: "#C47A3A" }} />
            </div>
            <p className="text-sm leading-relaxed flex-1" style={{ color: "#6B5E55" }}>
              Build a professional freelance services agreement covering scope, payment, revisions, and ownership. Export as PDF.
            </p>
            <span className="mt-4 text-sm font-medium group-hover:underline" style={{ color: "#C47A3A" }}>
              Open Tool
            </span>
          </Link>
          <Link
            href="/project-cost-estimator"
            className="group flex flex-col rounded-lg p-6 border transition-shadow hover:shadow-md"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E8C99A" }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-base font-semibold leading-snug" style={{ color: "#2C2420" }}>
                Free Project Cost Estimator
              </h3>
              <ArrowRight size={15} className="mt-0.5 shrink-0" style={{ color: "#C47A3A" }} />
            </div>
            <p className="text-sm leading-relaxed flex-1" style={{ color: "#6B5E55" }}>
              Planning to hire? Estimate what a web, design, photo, video, copywriting, or marketing project should cost before you reach out. No account required.
            </p>
            <span className="mt-4 text-sm font-medium group-hover:underline" style={{ color: "#C47A3A" }}>
              Open Tool
            </span>
          </Link>
        </div>

        {/* Guides */}
        <div className="mt-16 mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#2C2420" }}>
            Guides
          </h2>
          <p className="text-base" style={{ color: "#6B5E55" }}>
            Plain, practical advice for working with local freelancers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/how-to-hire-a-freelancer"
            className="group flex flex-col rounded-lg p-6 border transition-shadow hover:shadow-md"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E8C99A" }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-base font-semibold leading-snug" style={{ color: "#2C2420" }}>
                How to Hire a Freelancer in Springfield, MO
              </h3>
              <ArrowRight size={15} className="mt-0.5 shrink-0" style={{ color: "#C47A3A" }} />
            </div>
            <p className="text-sm leading-relaxed flex-1" style={{ color: "#6B5E55" }}>
              A step by step guide to hiring local talent in the 417 area, from scoping your project and comparing quotes to vetting candidates and setting up a simple contract.
            </p>
            <span className="mt-4 text-sm font-medium group-hover:underline" style={{ color: "#C47A3A" }}>
              Read Guide
            </span>
          </Link>
        </div>
      </div>

      {/* CTA */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#2C2420" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#F5EFE6" }}>
            Are you a Springfield freelancer?
          </h2>
          <p className="text-base mb-8" style={{ color: "#C8B8A8" }}>
            Join the 417 Freelancers directory and get discovered by local clients looking to hire someone nearby.
          </p>
          <Link
            href="/apply"
            className="btn-accent inline-block"
          >
            Apply to Join
          </Link>
        </div>
      </section>
    </>
  );
}
