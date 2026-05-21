import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { servicePages, getServicePage } from "@/lib/service-pages";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

export function generateStaticParams() {
  return servicePages.map((p) => ({ service: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const page = getServicePage(service);
  if (!page) return { title: "Not Found" };

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `${siteUrl}/hire/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${siteUrl}/hire/${page.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const page = getServicePage(service);
  if (!page) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3" style={{ color: "#2C2420" }}>
          {page.h1}
        </h1>
        <p className="text-xl mb-5" style={{ color: "#C47A3A" }}>
          {page.subheadline}
        </p>
        <p className="text-base leading-relaxed mb-8" style={{ color: "#6B5E55" }}>
          {page.intro}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/directory?category=${page.directoryCategory}`}
            className="inline-block px-6 py-3 font-semibold rounded-md btn-primary text-center"
          >
            {page.directoryLabel}
          </Link>
          <Link
            href="/apply"
            className="inline-block px-6 py-3 font-semibold rounded-md btn-outline-brand text-center"
          >
            Join as a Freelancer
          </Link>
        </div>
      </div>

      {/* Body copy */}
      <div className="mb-14 space-y-4 text-base leading-relaxed" style={{ color: "#6B5E55" }}>
        {page.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {/* What to look for */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#2C2420" }}>
          What to look for when hiring
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {page.highlights.map((item) => (
            <div
              key={item.heading}
              className="bg-white rounded-xl p-5"
              style={{ border: "1px solid #E8C99A" }}
            >
              <h3 className="font-semibold mb-2" style={{ color: "#2C2420" }}>
                {item.heading}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6B5E55" }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#2C2420" }}>
          Common questions
        </h2>
        <div>
          {page.faqs.map((faq, i) => (
            <details
              key={i}
              className="group"
              style={{ borderTop: "1px solid #E8C99A" }}
            >
              <summary
                className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none"
              >
                <span className="font-medium text-base pr-2" style={{ color: "#2C2420" }}>
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  strokeWidth={1.5}
                  className="flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                  style={{ color: "#C47A3A" }}
                />
              </summary>
              <div
                className="pb-4 text-sm leading-relaxed"
                style={{ color: "#6B5E55" }}
              >
                {faq.answer}
              </div>
            </details>
          ))}
          <div style={{ borderTop: "1px solid #E8C99A" }} />
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        className="rounded-2xl text-white text-center p-10"
        style={{ backgroundColor: "#7C4A1E" }}
      >
        <h2 className="text-2xl font-bold mb-3">Ready to find the right fit?</h2>
        <p className="mb-6" style={{ color: "#E8C99A" }}>
          Browse vetted local professionals in Springfield and the 417 area.
        </p>
        <Link
          href={`/directory?category=${page.directoryCategory}`}
          className="inline-block px-8 py-3 font-semibold rounded-md btn-accent"
        >
          {page.directoryLabel}
        </Link>
      </div>
    </div>
  );
}
