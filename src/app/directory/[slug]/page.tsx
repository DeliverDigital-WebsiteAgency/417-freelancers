import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

const availabilityBadge: Record<string, { label: string; color: string }> = {
  available: { label: "Available for work", color: "bg-green-100 text-green-800" },
  busy: { label: "Limited availability", color: "bg-yellow-100 text-yellow-800" },
  unavailable: { label: "Not available", color: "bg-red-100 text-red-800" },
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
        <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link href="/directory" className="hover:text-indigo-600">Directory</Link>
          <span>/</span>
          <span className="text-gray-700">{freelancer.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Profile card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="relative w-28 h-28 mx-auto mb-4">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt={freelancer.title}
                    fill
                    className="rounded-full object-cover ring-4 ring-indigo-50"
                    sizes="112px"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center text-indigo-400 text-4xl font-bold">
                    {freelancer.title.charAt(0)}
                  </div>
                )}
              </div>

              <h1 className="text-xl font-bold text-gray-900">{freelancer.title}</h1>

              {freelancer.categories?.nodes?.[0] && (
                <p className="text-sm text-indigo-600 mt-1 font-medium">
                  {freelancer.categories.nodes[0].name}
                </p>
              )}

              {fields?.tagline && (
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{fields.tagline}</p>
              )}

              {avail && (
                <span className={`mt-3 inline-block text-xs font-medium px-3 py-1 rounded-full ${avail.color}`}>
                  {avail.label}
                </span>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
              {fields?.location && (
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-lg">📍</span>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Location</p>
                    <p className="text-sm text-gray-800">{fields.location}</p>
                  </div>
                </div>
              )}
              {fields?.rate && (
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-lg">💰</span>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</p>
                    <p className="text-sm text-gray-800">{fields.rate}</p>
                  </div>
                </div>
              )}
              {fields?.website && (
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-lg">🌐</span>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Website</p>
                    <a
                      href={fields.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:underline break-all"
                    >
                      {fields.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Social links */}
            {fields?.socialLinks && Object.values(fields.socialLinks).some(Boolean) && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Find me online</p>
                <div className="flex gap-3">
                  {fields.socialLinks.linkedin && (
                    <a href={fields.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                      className="text-sm px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                      LinkedIn
                    </a>
                  )}
                  {fields.socialLinks.github && (
                    <a href={fields.socialLinks.github} target="_blank" rel="noopener noreferrer"
                      className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                      GitHub
                    </a>
                  )}
                  {fields.socialLinks.twitter && (
                    <a href={fields.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                      className="text-sm px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 transition-colors font-medium">
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                <div
                  className="prose prose-sm prose-indigo max-w-none text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: fields.bio }}
                />
              </section>
            )}

            {/* Skills */}
            {fields?.skills && fields.skills.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {fields.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
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
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Portfolio</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {fields.portfolioItems.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
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
                        <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                        {item.description && (
                          <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-3">
                            {item.description}
                          </p>
                        )}
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-xs text-indigo-600 hover:underline font-medium"
                          >
                            View project →
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
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Get in touch with {freelancer.title.split(" ")[0]}
              </h2>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
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
