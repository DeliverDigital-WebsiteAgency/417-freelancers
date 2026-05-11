import type { MetadataRoute } from "next";
import { getAllFreelancerSlugs } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/directory`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  let freelancerRoutes: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllFreelancerSlugs();
    freelancerRoutes = slugs.map((slug) => ({
      url: `${siteUrl}/directory/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // WordPress not available during build
  }

  return [...staticRoutes, ...freelancerRoutes];
}
