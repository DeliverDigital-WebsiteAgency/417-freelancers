import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { MapPin, DollarSign, Globe, ExternalLink } from "lucide-react";
import { getFreelancer, getAllFreelancerSlugs } from "@/lib/api";
import { ContactForm } from "@/components/ContactForm";
import { FreelancerSchema, BreadcrumbSchema } from "@/components/SchemaOrg";

export const revalidate = 3600;

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

const availabilityBadge: Record<string, { label: string; color: string; bg: string }> = {
  available: { label: "Available for work", color: "#166534", bg: "#dcfce7" },
  busy: { label: "Limited availability", color: "#854d0e", bg: "#fef9c3" },
  unavailable: { label: "Not available", color: "#991b1b", bg: "#fee2e2" },
};

export default async function FreelancerProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const freelancer = await getFreelancer(slug);

  if (!freelancer) notFound();

  const fields = freelancer.freelancerFields;
  const avail = fields?.availability ? availabilityBadge[fields.availability] : null;
  const profileImage =
    fields?.profileImage?.sourceUrl ?? freelancer.featuredImage?.node.sourceUrl;

  return (
    <>
      <FreelancerSchema
        name={freelancer.title}
        description={fields?.tagline ?? undefined}
        url={`${siteUrl}/directory/${slug}`}
        image={profileImage}
        email={fields?.email ?? undefined}
        jobTitle={freelancer.categories?.nodes?.[0]?.name}
        location={fields?.location ?? undefined}
        skills={fields?.skills ?? undefined}
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
          <Link href="/" className="hover:underline" style={{ color: "#C47A3A" }}>Home</Link>
          <span style={{ color: "#E8C99A" }}>/</span>
          <Link href="/directory" className="hover:underline" style={{ color: "#C47A3A" }}>Directory</Link>
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

              {freelancer.categories?.nodes?.[0] && (
                <p className="text-sm mt-1 font-medium" style={{ color: "#C47A3A" }}>
                  {freelancer.categories.nodes[0].name}
                </p>
              )}

              {fields?.tagline && (
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6B5E55" }}>{fields.tagline}</p>
              )}

              {avail && (
                <span
                  className="mt-3 inline-block text-xs font-medium px-3 py-1 rounded-full"
                  style={{ color: avail.color, backgroundColor: avail.bg }}
                >
                  {avail.label}
                </span>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4" style={{ border: "1px solid #E8C99A" }}>
              {fields?.location && (
                <div className="flex items-start gap-3">
                  <MapPin size={16} strokeWidth={1.5} style={{ color: "#C47A3A", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#6B5E55" }}>Location</p>
                    <p className="text-sm" style={{ color: "#2C2420" }}>{fields.location}</p>
                  </div>
                </div>
              )}
              {fields?.rate && (
                <div className="flex items-start gap-3">
                  <DollarSign size={16} strokeWidth={1.5} style={{ color: "#C47A3A", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#6B5E55" }}>Rate</p>
                    <p className="text-sm" style={{ color: "#2C2420" }}>{fields.rate}</p>
                  </div>
                </div>
              )}
              {fields?.website && (
                <div className="flex items-start gap-3">
                  <Globe size={16} strokeWidth={1.5} style={{ color: "#C47A3A", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#6B5E55" }}>Website</p>
                    <a
                      href={fields.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline break-all"
                      style={{ color: "#C47A3A" }}
                    >
                      {fields.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Social links */}
            {fields?.socialLinks && Object.values(fields.socialLinks).some(Boolean) && (
              <div className="bg-white rounded-2xl shadow-sm p-6" style={{ border: "1px solid #E8C99A" }}>
                <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: "#6B5E55" }}>Find me online</p>
                <div className="flex gap-3">
                  {fields.socialLinks.linkedin && (
                    <a
                      href={fields.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md transition-colors font-medium"
                      style={{ backgroundColor: "#F5EFE6", color: "#7C4A1E", border: "1px solid #E8C99A" }}
                    >
                      <ExternalLink size={14} strokeWidth={1.5} />
                      LinkedIn
                    </a>
                  )}
                  {fields.socialLinks.github && (
                    <a
                      href={fields.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md transition-colors font-medium"
                      style={{ backgroundColor: "#F5EFE6", color: "#7C4A1E", border: "1px solid #E8C99A" }}
                    >
                      <ExternalLink size={14} strokeWidth={1.5} />
                      GitHub
                    </a>
                  )}
                  {fields.socialLinks.twitter && (
                    <a
                      href={fields.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md transition-colors font-medium"
                      style={{ backgroundColor: "#F5EFE6", color: "#7C4A1E", border: "1px solid #E8C99A" }}
                    >
                      <ExternalLink size={14} strokeWidth={1.5} />
                      Twitter / X
                    </a>
                  )}
                </div>
              </div>
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
            {fields?.skills && fields.skills.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4" style={{ color: "#2C2420" }}>Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {fields.skills.map((skill) => (
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

            {/* Portfolio */}
            {fields?.portfolioItems && fields.portfolioItems.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-6" style={{ color: "#2C2420" }}>Portfolio</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {fields.portfolioItems.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                      style={{ border: "1px solid #E8C99A" }}
                    >
                      {item.image?.sourceUrl && (
                        <div className="relative h-44">
                          <Image
                            src={item.image.sourceUrl}
                            alt={item.image.altText || item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-sm" style={{ color: "#2C2420" }}>{item.title}</h3>
                        {item.description && (
                          <p className="mt-1 text-xs leading-relaxed line-clamp-3" style={{ color: "#6B5E55" }}>
                            {item.description}
                          </p>
                        )}
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-xs hover:underline font-medium"
                            style={{ color: "#C47A3A" }}
                          >
                            View project
                          </a>
                        )}
                      </div>
                    </div>
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
