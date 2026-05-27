import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ArrowLeft, User } from "lucide-react";
import { getPost, getAllPostSlugs } from "@/lib/api";
import { ArticleSchema, BreadcrumbSchema } from "@/components/SchemaOrg";

export const revalidate = 3600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Post Not Found" };

  const title = post.seo?.title ?? `${post.title} | 417 Freelancers`;
  const description =
    post.seo?.metaDesc ??
    (post.excerpt ? post.excerpt.replace(/<[^>]*>/g, "").trim().slice(0, 160) : undefined);
  const image = post.seo?.opengraphImage?.sourceUrl ?? post.featuredImage?.node.sourceUrl;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      ...(image && { images: [{ url: image }] }),
    },
  };
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const image = post.featuredImage?.node.sourceUrl;
  const description = post.seo?.metaDesc ?? post.excerpt?.replace(/<[^>]*>/g, "").trim();

  return (
    <>
      <ArticleSchema
        headline={post.title}
        description={description}
        url={`${siteUrl}/blog/${slug}`}
        datePublished={post.date}
        dateModified={post.modified}
        authorName={post.author?.node.name}
        image={image}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Blog", url: `${siteUrl}/blog` },
          { name: post.title, url: `${siteUrl}/blog/${slug}` },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium mb-8"
          style={{ color: "#C47A3A" }}
        >
          <ArrowLeft size={15} strokeWidth={2} />
          All posts
        </Link>

        {/* Categories */}
        {post.categories?.nodes && post.categories.nodes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.nodes.map((cat) => (
              <span
                key={cat.slug}
                className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                style={{ backgroundColor: "#E8C99A", color: "#7C4A1E" }}
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4" style={{ color: "#2C2420" }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-6" style={{ borderBottom: "1px solid #E8C99A" }}>
          {post.author?.node.name && (
            <span className="flex items-center gap-1.5 text-sm" style={{ color: "#6B5E55" }}>
              <User size={14} strokeWidth={1.5} style={{ color: "#C47A3A" }} />
              {post.author.node.name}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-sm" style={{ color: "#6B5E55" }}>
            <CalendarDays size={14} strokeWidth={1.5} style={{ color: "#C47A3A" }} />
            {formatDate(post.date)}
          </span>
        </div>

        {/* Featured image */}
        {image && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10">
            <Image
              src={image}
              alt={post.featuredImage?.node.altText || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* Content */}
        {post.content && (
          <div
            className="prose prose-lg max-w-none"
            style={{ color: "#6B5E55" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}

        {/* Footer CTA */}
        <div className="mt-16 rounded-2xl text-white text-center p-10" style={{ backgroundColor: "#7C4A1E" }}>
          <h2 className="text-xl font-bold mb-3">Looking for local freelancers?</h2>
          <p className="text-sm mb-6" style={{ color: "#E8C99A" }}>
            Browse vetted professionals in Springfield and the 417 area.
          </p>
          <Link
            href="/directory"
            className="inline-block px-6 py-3 font-semibold rounded-md btn-accent"
          >
            Browse the Directory
          </Link>
        </div>
      </div>
    </>
  );
}
