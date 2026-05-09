import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Globe, ArrowUpRight } from "lucide-react";
import { getFreelancer, getAllFreelancerSlugs } from "@/lib/api";
import { getSkills } from "@/types/freelancer";
import { ContactForm } from "@/components/ContactForm";
import { FreelancerSchema, BreadcrumbSchema } from "@/components/SchemaOrg";
import { FreelancerContactLinks } from "@/components/FreelancerContactLinks";

export const revalidate = 90;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://417freelancers.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllFreelancerSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const freelancer = await getFreelancer(slug);

  if (!freelancer) {
    return { title: "Freelancer Not Found" };
  }

  const title = freelancer.seo?.title ?? `${freelancer.title} | 417 Freelancers`;
  const description =
    freelancer.seo?.metaDesc ??
    freelancer.freelancerFields?.tagline ??
    `View ${freelancer.title}'s portfolio and contact information on 417 Freelancers.`;
  const image =
    freelancer.seo?.opengraphImage?.sourceUrl ??
    freelancer.featuredImage?.node.sourceUrl;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/directory/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/directory/${slug}`,
      ...(image && { images: [{ url: image }] }),
    },
  };
}

export default async function FreelancerProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const freelancer = await getFreelancer(slug);

  if (!freelancer) notFound();

  const fields = freelancer.freelancerFields;
  const skills = getSkills(fields);
  const profileImage =
    fields?.profile_image?.node.sourceUrl ?? freelancer.featuredImage?.node.sourceUrl;

  return (
    <>
      <FreelancerSchema
        name={freelancer.title}
        description={fields?.tagline ?? undefined}
        url={`${siteUrl}/directory/${slug}`}
        image={profileImage}
        skills={skills.length > 0 ? skills : undefined}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Directory", url: `${siteUrl}/directory` },
          { name: freelancer.title, url: `${siteUrl}/directory/${slug}` },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8 flex items-center gap-2" style={{ color: "#6B5E55" }}>
          <Link href="/" className="link-amber">Home</Link>
          <span style={{ color: "#E8C99A" }}>/</span>
          <Link href="/directory" className="link-amber">Directory</Link>
          <span style={{ color: "#E8C99A" }}>/</span>
          <span style={{ color: "#2C2420" }}>{freelancer.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Profile card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center" style={{ border: "1px solid #E8C99A" }}>
              <div className="relative w-28 h-28 mx-auto mb-4">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt={freelancer.title}
                    fill
                    className="rounded-full object-cover ring-4"
                    style={{ "--tw-ring-color": "#E8C99A" } as React.CSSProperties}
                    sizes="112px"
                  />
                ) : (
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center text-4xl font-bold"
                    style={{ backgroundColor: "#E8C99A", color: "#7C4A1E" }}
                  >
                    {freelancer.title.charAt(0)}
                  </div>
                )}
              </div>

              <h1 className="text-xl font-bold" style={{ color: "#2C2420" }}>{freelancer.title}</h1>

              {fields?.location && (
                <p className="text-sm mt-1 font-medium" style={{ color: "#C47A3A" }}>
                  {fields.location}
                </p>
              )}

              {fields?.tagline && (
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6B5E55" }}>{fields.tagline}</p>
              )}
            </div>

            {/* Details */}
            {(fields?.email || fields?.phone || fields?.website) && (
              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4" style={{ border: "1px solid #E8C99A" }}>
                <FreelancerContactLinks
                  email={fields.email}
                  phone={fields.phone}
                  freelancerName={freelancer.title}
                  slug={slug}
                />
                {fields.website && (
                  <div className="flex items-start gap-3">
                    <Globe size={16} strokeWidth={1.5} style={{ color: "#C47A3A", marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#6B5E55" }}>Website</p>
                      <a
                        href={fields.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm link-amber hover:underline break-all"
                      >
                        {fields.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Portfolio link */}
            {fields?.portfolio_link && (
              <a
                href={fields.portfolio_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-md font-medium text-sm transition-colors btn-accent"
              >
                <ArrowUpRight size={16} strokeWidth={2} />
                View Portfolio
              </a>
            )}
          </aside>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            {fields?.bio && (
              <section>
                <h2 className="text-xl font-semibold mb-4" style={{ color: "#2C2420" }}>About</h2>
                <div
                  className="prose prose-sm max-w-none leading-relaxed"
                  style={{ color: "#6B5E55" }}
                  dangerouslySetInnerHTML={{ __html: fields.bio }}
                />
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4" style={{ color: "#2C2420" }}>Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{ backgroundColor: "#E8C99A", color: "#2C2420" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Contact */}
            <section id="contact">
              <h2 className="text-xl font-semibold mb-6" style={{ color: "#2C2420" }}>
                Get in touch with {freelancer.title.split(" ")[0]}
              </h2>
              <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8C99A" }}>
                <ContactForm
                  freelancerName={freelancer.title}
                  freelancerSlug={slug}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
