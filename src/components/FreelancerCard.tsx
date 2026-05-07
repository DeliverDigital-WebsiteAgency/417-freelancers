import Image from "next/image";
import Link from "next/link";
import type { FreelancerListItem } from "@/types/freelancer";
import { getSkills } from "@/types/freelancer";

export function FreelancerCard({ freelancer }: { freelancer: FreelancerListItem }) {
  const { slug, title, featuredImage, freelancerFields, categories } = freelancer;
  const fields = freelancerFields;
  const skills = getSkills(fields);

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
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-lg leading-snug" style={{ color: "#2C2420" }}>
          {title}
        </h3>

        {fields?.tagline && (
          <p className="mt-1 text-sm line-clamp-2" style={{ color: "#6B5E55" }}>{fields.tagline}</p>
        )}

        {skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skills.map((skill) => (
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
        </div>
      </div>
    </Link>
  );
}
