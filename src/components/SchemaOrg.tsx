interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  url?: string;
}

export function LocalBusinessSchema({
  name = "417 Freelancers",
  description = "Springfield, MO's premier freelancer directory. Find skilled local professionals in the 417 area.",
  url = "https://417freelancers.com",
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
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
    sameAs: [],
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
      url: "https://417freelancers.com",
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
