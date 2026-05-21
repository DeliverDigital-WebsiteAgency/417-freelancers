import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ShieldCheck, Users } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

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
          Connecting Springfield businesses with talented local independent professionals.
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

      {/* Built by Deliver Digital */}
      <div className="rounded-2xl p-8 mb-16 flex flex-col sm:flex-row gap-6 items-start" style={{ backgroundColor: "#2C2420" }}>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#C47A3A" }}>Built by</p>
          <h2 className="text-2xl font-bold mb-3 text-white">Deliver Digital</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#E8C99A" }}>
            417 Freelancers is owned and operated by Deliver Digital, a Springfield-based digital
            agency that builds websites, web applications, and digital tools for businesses in the
            417 area and beyond. Deliver Digital created this directory to fill a real gap in the
            local market and to invest in the Springfield creative community.
          </p>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "#E8C99A" }}>
            If your business needs a website, a custom web application, or a broader digital
            strategy, Deliver Digital works with clients of all sizes across Southwest Missouri.
          </p>
          <a
            href="https://deliverdigital.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 text-sm font-semibold rounded-md btn-accent"
          >
            Visit Deliver Digital
          </a>
        </div>
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
          <Link href="/apply" className="px-6 py-3 font-semibold rounded-md btn-accent">
            Apply to Join
          </Link>
        </div>
      </div>
    </div>
  );
}
