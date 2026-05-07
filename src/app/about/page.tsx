import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://417freelancers.com";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about 417 Freelancers — Springfield, MO's premier local freelancer directory connecting businesses with skilled independent professionals.",
  alternates: { canonical: `${siteUrl}/about` },
};

const values = [
  {
    title: "Local first",
    body: "We believe in the power of local economies. Every freelancer in our directory is based in the 417 area.",
    icon: "📍",
  },
  {
    title: "Quality vetted",
    body: "We review every application to ensure our directory remains a trusted resource for businesses.",
    icon: "✅",
  },
  {
    title: "Community driven",
    body: "417 Freelancers exists to strengthen Springfield's creative and tech community.",
    icon: "🤝",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About 417 Freelancers</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Connecting Springfield businesses with talented local independent professionals
          since 2024.
        </p>
      </div>

      <div className="prose prose-lg prose-indigo max-w-none mb-16">
        <p>
          <strong>417 Freelancers</strong> is Springfield, Missouri&apos;s dedicated directory for
          local freelance talent. We built this platform because we noticed a gap — businesses in
          the 417 area struggled to find skilled local professionals, while freelancers struggled
          to reach local clients.
        </p>
        <p>
          Whether you&apos;re a startup looking for your first website, an established business
          that needs a brand refresh, or a nonprofit in need of a copywriter, we&apos;re here to
          help you find the right person — someone local who understands the Springfield market.
        </p>
        <p>
          Our directory spans web development, graphic design, digital marketing, photography,
          videography, copywriting, and more. Every freelancer is reviewed before joining to
          ensure quality and professionalism.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {values.map((v) => (
          <div key={v.title} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="text-3xl mb-4">{v.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{v.body}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-indigo-600 rounded-2xl text-white text-center p-10">
        <h2 className="text-2xl font-bold mb-3">Ready to get started?</h2>
        <p className="text-indigo-100 mb-6">
          Browse our directory or apply to join as a freelancer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/directory"
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Browse Freelancers
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border-2 border-white/40 font-semibold rounded-xl hover:border-white/70 hover:bg-white/10 transition-colors"
          >
            Apply to Join
          </Link>
        </div>
      </div>
    </div>
  );
}
