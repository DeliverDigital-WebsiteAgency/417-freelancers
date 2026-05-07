import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { FreelancerListItem } from "@/types/freelancer";

const availabilityLabel: Record<string, { label: string; color: string; bg: string }> = {
  available: { label: "Available", color: "#166534", bg: "#dcfce7" },
  busy: { label: "Limited", color: "#854d0e", bg: "#fef9c3" },
  unavailable: { label: "Unavailable", color: "#991b1b", bg: "#fee2e2" },
};

export function FreelancerCard({ freelancer }: { freelancer: FreelancerListItem }) {
  const { slug, title, featuredImage, freelancerFields, categories } = freelancer;
  const fields = freelancerFields;
  const avail = fields?.availability ? availabilityLabel[fields.availability] : null;

  return (
    <Link
      href={`/directory/${slug}`}
      className="group bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md"
      style={{ border: "1px solid #E8C99A" }}
    >
      <div className="relative h-48" style={{ background: "linear-gradient(to bottom right, #F5EFE6, #E8C99A)" }}>
        {featuredImage?.node ? (
          <Image
            src={featuredImage.node.sourceUrl}
            alt={featuredImage.node.altText || title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold select-none" style={{ color: "#C47A3A" }}>
            {title.charAt(0)}
          </div>
        )}
        {avail && (
          <span
            className="absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full"
            style={{ color: avail.color, backgroundColor: avail.bg }}
          >
            {avail.label}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-semibold text-lg leading-snug transition-colors"
          style={{ color: "#2C2420" }}
        >
          {title}
        </h3>

        {fields?.tagline && (
          <p className="mt-1 text-sm line-clamp-2" style={{ color: "#6B5E55" }}>{fields.tagline}</p>
        )}

        {fields?.location && (
          <p className="mt-2 text-xs flex items-center gap-1" style={{ color: "#6B5E55" }}>
            <MapPin size={12} strokeWidth={1.5} style={{ color: "#C47A3A" }} />
            {fields.location}
          </p>
        )}

        {fields?.skills && fields.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {fields.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "#E8C99A", color: "#2C2420" }}
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between">
          {categories?.nodes?.[0] && (
            <span className="text-xs" style={{ color: "#6B5E55" }}>{categories.nodes[0].name}</span>
          )}
          {fields?.rate && (
            <span className="text-sm font-semibold" style={{ color: "#7C4A1E" }}>{fields.rate}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
