import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import { getFreelancers } from "@/lib/api";
import { FreelancerList } from "@/components/FreelancerList";
import { BreadcrumbSchema } from "@/components/SchemaOrg";

export const revalidate = 90;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://417freelancers.com";

const categoryOptions = [
  { label: "All", value: "" },
  { label: "Web Development", value: "web-development" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Copywriting", value: "copywriting" },
  { label: "Photography", value: "photography" },
  { label: "Video", value: "video" },
];

export const metadata: Metadata = {
  title: "Freelancer Directory",
  description:
    "Browse all local freelancers in Springfield, MO and the 417 area. Filter by skill or category to find the perfect match.",
  alternates: { canonical: `${siteUrl}/directory` },
  openGraph: {
    title: "Freelancer Directory | 417 Freelancers",
    description:
      "Browse all local freelancers in Springfield, MO and the 417 area.",
    url: `${siteUrl}/directory`,
  },
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function DirectoryPage({ searchParams }: PageProps) {
  const { category } = await searchParams;

  let freelancers: Awaited<ReturnType<typeof getFreelancers>>["freelancers"] = [];
  let hasNextPage = false;
  let endCursor: string | null = null;

  try {
    const result = await getFreelancers({ first: 24, category });
    freelancers = result.freelancers;
    hasNextPage = result.hasNextPage;
    endCursor = result.endCursor;
  } catch {
    // WordPress not configured yet
  }

  const activeCategory = categoryOptions.find((c) => c.value === (category ?? ""));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Directory", url: `${siteUrl}/directory` },
          ...(category && activeCategory
            ? [{ name: activeCategory.label, url: `${siteUrl}/directory?category=${category}` }]
            : []),
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#2C2420" }}>Freelancer Directory</h1>
          <p className="mt-2" style={{ color: "#6B5E55" }}>
            {category
              ? `Showing ${activeCategory?.label ?? category} freelancers in the 417 area`
              : "All freelancers in Springfield, MO and the 417 area"}
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categoryOptions.map((cat) => {
            const isActive = (category ?? "") === cat.value;
            const href = cat.value ? `/directory?category=${cat.value}` : "/directory";
            return (
              <a
                key={cat.value}
                href={href}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                style={
                  isActive
                    ? { backgroundColor: "#7C4A1E", color: "#F5EFE6" }
                    : { backgroundColor: "white", color: "#6B5E55", border: "1px solid #E8C99A" }
                }
              >
                {cat.label}
              </a>
            );
          })}
        </div>

        {/* Grid */}
        {freelancers.length > 0 ? (
          <FreelancerList
            initial={freelancers}
            initialHasNextPage={hasNextPage}
            initialCursor={endCursor}
            category={category}
          />
        ) : (
          <div className="text-center py-20">
            <SearchX size={48} className="mx-auto mb-4" style={{ color: "#E8C99A" }} strokeWidth={1.5} />
            <p className="text-lg font-medium" style={{ color: "#2C2420" }}>No freelancers found</p>
            <p className="mt-1 text-sm" style={{ color: "#6B5E55" }}>
              {category ? "Try a different category or " : ""}
              <a href="/directory" style={{ color: "#C47A3A" }} className="hover:underline">
                view all freelancers
              </a>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
