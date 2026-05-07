import Image from "next/image";
import Link from "next/link";
import type { FreelancerListItem } from "@/types/freelancer";

const availabilityLabel: Record<string, { label: string; color: string }> = {
  available: { label: "Available", color: "bg-green-100 text-green-800" },
  busy: { label: "Limited", color: "bg-yellow-100 text-yellow-800" },
  unavailable: { label: "Unavailable", color: "bg-red-100 text-red-800" },
};

export function FreelancerCard({ freelancer }: { freelancer: FreelancerListItem }) {
  const { slug, title, featuredImage, freelancerFields, categories } = freelancer;
  const fields = freelancerFields;
  const avail = fields?.availability
    ? availabilityLabel[fields.availability]
    : null;

  return (
    <Link
      href={`/directory/${slug}`}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all overflow-hidden flex flex-col"
    >
      <div className="relative h-48 bg-gradient-to-br from-indigo-50 to-purple-50">
        {featuredImage?.node ? (
          <Image
            src={featuredImage.node.sourceUrl}
            alt={featuredImage.node.altText || title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-indigo-300 text-6xl font-bold select-none">
            {title.charAt(0)}
          </div>
        )}
        {avail && (
          <span
            className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full ${avail.color}`}
          >
            {avail.label}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-lg leading-snug group-hover:text-indigo-700 transition-colors">
          {title}
        </h3>

        {fields?.tagline && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{fields.tagline}</p>
        )}

        {fields?.location && (
          <p className="mt-2 text-xs text-gray-400 flex items-center gap-1">
            <span>📍</span> {fields.location}
          </p>
        )}

        {fields?.skills && fields.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {fields.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between">
          {categories?.nodes?.[0] && (
            <span className="text-xs text-gray-400">{categories.nodes[0].name}</span>
          )}
          {fields?.rate && (
            <span className="text-sm font-semibold text-indigo-700">{fields.rate}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
