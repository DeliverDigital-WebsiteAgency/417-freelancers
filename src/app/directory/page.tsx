import type { Metadata } from "next";
import { getFreelancers } from "@/lib/api";
import { FreelancerCard } from "@/components/FreelancerCard";
import { BreadcrumbSchema } from "@/components/SchemaOrg";

export const revalidate = 3600;

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

  try {
    const result = await getFreelancers({ first: 24, category });
    freelancers = result.freelancers;
    hasNextPage = result.hasNextPage;
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
          <h1 className="text-3xl font-bold text-gray-900">Freelancer Directory</h1>
          <p className="mt-2 text-gray-500">
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {cat.label}
              </a>
            );
          })}
        </div>

        {/* Grid */}
        {freelancers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {freelancers.map((f) => (
                <FreelancerCard key={f.id} freelancer={f} />
              ))}
            </div>
            {hasNextPage && (
              <div className="mt-12 text-center">
                <p className="text-sm text-gray-500">More freelancers available — pagination coming soon.</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium text-gray-600">No freelancers found</p>
            <p className="mt-1 text-sm">
              {category ? "Try a different category or " : ""}
              <a href="/directory" className="text-indigo-600 hover:underline">
                view all freelancers
              </a>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
