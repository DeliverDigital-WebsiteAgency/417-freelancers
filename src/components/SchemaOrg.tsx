const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  url?: string;
}

export function LocalBusinessSchema({
  name = "417 Freelancers",
  description = "Springfield, MO's premier freelancer directory. Find skilled local professionals in the 417 area.",
  url = siteUrl,
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    email: "hello@417freelancers.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Springfield",
      addressRegion: "MO",
      postalCode: "65801",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 37.2153,
        longitude: -93.2982,
      },
      geoRadius: "80000",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FreelancerSchemaProps {
  name: string;
  description?: string;
  url: string;
  image?: string;
  jobTitle?: string;
  skills?: string[];
}

export function FreelancerSchema({
  name,
  description,
  url,
  image,
  jobTitle,
  skills,
}: FreelancerSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    ...(description && { description }),
    ...(image && { image }),
    ...(jobTitle && { jobTitle }),
    ...(skills &&
      skills.length > 0 && {
        knowsAbout: skills,
      }),
    worksFor: {
      "@type": "Organization",
      name: "417 Freelancers",
      url: siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  headline: string;
  description?: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  /** Pass the WordPress author name when available; omit to attribute to 417 Freelancers (org). */
  authorName?: string;
  image?: string;
}

export function ArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  image,
}: ArticleSchemaProps) {
  const publisher = {
    "@type": "Organization",
    name: "417 Freelancers",
    url: siteUrl,
  };

  // Use Person when a real author name is present; fall back to the org as author.
  const author = authorName
    ? { "@type": "Person", name: authorName }
    : publisher;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    // BlogPosting is the correct subtype for blog content (subclass of Article).
    "@type": "BlogPosting",
    headline,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    datePublished,
    ...(dateModified && { dateModified }),
    ...(description && { description }),
    // Wrap image as ImageObject so Google's Rich Results Test accepts it.
    ...(image && {
      image: { "@type": "ImageObject", url: image },
    }),
    author,
    publisher,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogSchemaProps {
  name?: string;
  description?: string;
  url?: string;
}

export function BlogSchema({
  name = "417 Freelancers Blog",
  description = "Tips on hiring local freelancers, growing your business, and building the Springfield, MO creative community.",
  url = `${siteUrl}/blog`,
}: BlogSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name,
    description,
    url,
    publisher: {
      "@type": "Organization",
      name: "417 Freelancers",
      url: siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQPageSchemaProps {
  faqs: { question: string; answer: string }[];
}

export function FAQPageSchema({ faqs }: FAQPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
