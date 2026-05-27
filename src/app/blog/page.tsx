import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/api";
import { BreadcrumbSchema, BlogSchema } from "@/components/SchemaOrg";

export const revalidate = 3600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

export const metadata: Metadata = {
  title: {
    absolute: "Blog | 417 Freelancers — Springfield, MO",
  },
  description:
    "Tips on hiring freelancers, growing your local business, and building the Springfield creative community. From the 417 Freelancers blog.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "Blog | 417 Freelancers — Springfield, MO",
    description:
      "Freelancing tips, local business advice, and community news from the 417 Freelancers blog.",
    url: `${siteUrl}/blog`,
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630 }],
  },
};

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getPosts>>["posts"] = [];

  try {
    const result = await getPosts({ first: 24 });
    posts = result.posts;
  } catch (err) {
    console.error("[Blog] Failed to fetch posts:", err);
  }

  return (
    <>
      <BlogSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Blog", url: `${siteUrl}/blog` },
        ]}
      />

      {/* Hero */}
      <section style={{ background: "linear-gradient(to bottom right, #7C4A1E, #2C2420)", color: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="font-medium mb-3 uppercase tracking-widest text-sm" style={{ color: "#E8C99A" }}>
            417 Freelancers
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">The Blog</h1>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: "#E8C99A" }}>
            Tips on hiring local talent, growing your business, and building the Springfield creative community.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg font-medium" style={{ color: "#2C2420" }}>No posts yet</p>
            <p className="mt-2 text-sm" style={{ color: "#6B5E55" }}>
              Check back soon — content is on the way.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const excerpt = post.excerpt ? stripHtml(post.excerpt) : "";
              const category = post.categories?.nodes?.[0];

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden flex flex-col"
                  style={{ border: "1px solid #E8C99A" }}
                >
                  {/* Featured image */}
                  {post.featuredImage?.node.sourceUrl ? (
                    <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </Link>
                  ) : (
                    <div className="aspect-video flex items-center justify-center" style={{ backgroundColor: "#E8C99A" }}>
                      <span className="text-2xl font-bold" style={{ color: "#7C4A1E" }}>417</span>
                    </div>
                  )}

                  {/* Card body */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Category + date */}
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      {category && (
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                          style={{ backgroundColor: "#E8C99A", color: "#7C4A1E" }}
                        >
                          {category.name}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs" style={{ color: "#6B5E55" }}>
                        <CalendarDays size={12} strokeWidth={1.5} />
                        {formatDate(post.date)}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-bold leading-snug mb-2" style={{ color: "#2C2420" }}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:underline"
                        style={{ color: "#2C2420" }}
                      >
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    {excerpt && (
                      <p className="text-sm leading-relaxed mb-4 flex-1 line-clamp-3" style={{ color: "#6B5E55" }}>
                        {excerpt}
                      </p>
                    )}

                    {/* Read more */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold"
                      style={{ color: "#C47A3A" }}
                    >
                      Read more
                      <ArrowRight size={14} strokeWidth={2} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
