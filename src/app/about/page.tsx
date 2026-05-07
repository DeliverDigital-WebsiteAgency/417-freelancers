import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ShieldCheck, Users } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://417freelancers.com";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about 417 Freelancers, Springfield, MO's premier local freelancer directory connecting businesses with skilled independent professionals.",
  alternates: { canonical: `${siteUrl}/about` },
};

const values = [
  {
    title: "Local first",
    body: "We believe in the power of local economies. Every freelancer in our directory is based in the 417 area.",
    Icon: MapPin,
  },
  {
    title: "Quality vetted",
    body: "We review every application to ensure our directory remains a trusted resource for businesses.",
    Icon: ShieldCheck,
  },
  {
    title: "Community driven",
    body: "417 Freelancers exists to strengthen Springfield's creative and tech community.",
    Icon: Users,
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#2C2420" }}>About 417 Freelancers</h1>
        <p className="text-xl max-w-2xl mx-auto" style={{ color: "#6B5E55" }}>
          Connecting Springfield businesses with talented local independent professionals
          since 2024.
        </p>
      </div>

      <div className="prose prose-lg max-w-none mb-16">
        <p>
          <strong>417 Freelancers</strong> is Springfield, Missouri&apos;s dedicated directory for
          local freelance talent. We built this platform because we noticed a gap: businesses in
          the 417 area struggled to find skilled local professionals, while freelancers struggled
          to reach local clients.
        </p>
        <p>
          Whether you&apos;re a startup looking for your first website, an established business
          that needs a brand refresh, or a nonprofit in need of a copywriter, we&apos;re here to
          help you find the right person, someone local who understands the Springfield market.
        </p>
        <p>
          Our directory spans web development, graphic design, digital marketing, photography,
          videography, copywriting, and more. Every freelancer is reviewed before joining to
          ensure quality and professionalism.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {values.map(({ title, body, Icon }) => (
          <div key={title} className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8C99A" }}>
            <div className="mb-4 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#E8C99A" }}>
              <Icon size={20} style={{ color: "#7C4A1E" }} strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold mb-2" style={{ color: "#2C2420" }}>{title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#6B5E55" }}>{body}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="rounded-2xl text-white text-center p-10" style={{ backgroundColor: "#7C4A1E" }}>
        <h2 className="text-2xl font-bold mb-3">Ready to get started?</h2>
        <p className="mb-6" style={{ color: "#E8C99A" }}>
          Browse our directory or apply to join as a freelancer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/directory" className="px-6 py-3 font-semibold rounded-md btn-outline-hero">
            Browse Freelancers
          </Link>
          <Link href="/contact" className="px-6 py-3 font-semibold rounded-md btn-accent">
            Apply to Join
          </Link>
        </div>
      </div>
    </div>
  );
}
