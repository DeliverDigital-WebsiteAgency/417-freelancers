import Link from "next/link";
import { getFreelancers } from "@/lib/api";
import { FreelancerCard } from "@/components/FreelancerCard";

export const revalidate = 3600;

const categories = [
  { label: "Web Development", slug: "web-development", icon: "💻" },
  { label: "Graphic Design", slug: "design", icon: "🎨" },
  { label: "Digital Marketing", slug: "marketing", icon: "📈" },
  { label: "Copywriting", slug: "copywriting", icon: "✍️" },
  { label: "Photography", slug: "photography", icon: "📷" },
  { label: "Video Production", slug: "video", icon: "🎥" },
];

const steps = [
  {
    title: "Browse the directory",
    body: "Filter by skill, category, or availability to find the right fit for your project.",
    icon: "🔍",
  },
  {
    title: "View profiles",
    body: "Explore portfolios, read bios, and check availability before reaching out.",
    icon: "👤",
  },
  {
    title: "Get in touch",
    body: "Contact freelancers directly through their profile page with a quick message.",
    icon: "✉️",
  },
];

export default async function HomePage() {
  let featuredFreelancers: Awaited<ReturnType<typeof getFreelancers>>["freelancers"] = [];

  try {
    const result = await getFreelancers({ first: 6 });
    featuredFreelancers = result.freelancers;
  } catch {
    // WordPress may not be configured yet during development
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-indigo-200 font-medium mb-4 uppercase tracking-widest text-sm">
            Springfield, MO • 417 Area
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mx-auto">
            Hire talented local freelancers
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-2xl mx-auto">
            Connect with skilled professionals right here in the 417 area. From web development
            to design, marketing, and more.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/directory"
              className="px-8 py-3.5 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Browse Freelancers
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 border-2 border-white/40 text-white font-semibold rounded-xl hover:border-white/70 hover:bg-white/10 transition-colors"
            >
              List Your Services
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Browse by category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/directory?category=${cat.slug}`}
                className="flex flex-col items-center gap-2 p-5 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all text-center group"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs font-medium text-gray-700 group-hover:text-indigo-700">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured freelancers */}
      {featuredFreelancers.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Featured freelancers</h2>
              <Link
                href="/directory"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredFreelancers.map((f) => (
                <FreelancerCard key={f.id} freelancer={f} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-14">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl mx-auto mb-5">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Are you a 417 freelancer?</h2>
          <p className="text-indigo-100 mb-8">
            Get listed in the directory and connect with local clients looking for your skills.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Apply to Join
          </Link>
        </div>
      </section>
    </>
  );
}
