import Link from "next/link";
import {
  Monitor, Palette, TrendingUp, PenLine, Camera, Film,
  Search, User, Mail,
} from "lucide-react";

const categories = [
  { label: "Web Development", slug: "web-development", Icon: Monitor },
  { label: "Graphic Design", slug: "design", Icon: Palette },
  { label: "Digital Marketing", slug: "marketing", Icon: TrendingUp },
  { label: "Copywriting", slug: "copywriting", Icon: PenLine },
  { label: "Photography", slug: "photography", Icon: Camera },
  { label: "Video Production", slug: "video", Icon: Film },
];

const steps = [
  {
    title: "Browse the directory",
    body: "Filter by skill or category to find who you need.",
    Icon: Search,
  },
  {
    title: "Review profiles",
    body: "Check portfolios and bios to make sure they're the right fit.",
    Icon: User,
  },
  {
    title: "Reach out",
    body: "Message them directly from their profile.",
    Icon: Mail,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(to bottom right, #7C4A1E, #2C2420)", color: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="font-medium mb-4 uppercase tracking-widest text-sm" style={{ color: "#E8C99A" }}>
            417: Southwest Missouri
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mx-auto text-white">
            Locally vetted, high-quality freelancers.
          </h1>
          <p className="mt-6 text-xl max-w-2xl mx-auto" style={{ color: "#E8C99A" }}>
            Connect with skilled professionals across Southwest Missouri. Every freelancer in our directory is hand-reviewed, so you can hire with confidence, skip the guesswork, and get to work faster.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/directory"
              className="px-8 py-3.5 font-semibold rounded-md btn-outline-hero"
            >
              Browse Freelancers
            </Link>
            <Link
              href="/apply"
              className="px-8 py-3.5 font-semibold rounded-md btn-accent"
            >
              Join the Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16" style={{ backgroundColor: "#F5EFE6" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: "#2C2420" }}>
            Browse by category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(({ label, slug, Icon }) => (
              <Link
                key={slug}
                href={`/directory?category=${slug}`}
                className="flex flex-col items-center gap-2 p-5 rounded-xl transition-all text-center bg-white"
                style={{ border: "0.5px solid #E8C99A" }}
              >
                <Icon size={28} style={{ color: "#C47A3A" }} strokeWidth={1.5} />
                <span className="text-xs font-medium" style={{ color: "#2C2420" }}>
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Keep it local */}
      <section className="py-20" style={{ backgroundColor: "#F5EFE6" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#2C2420" }}>Keep it local. Keep it real.</h2>
          <p className="text-base leading-relaxed" style={{ color: "#6B5E55" }}>
            When you hire local, you&apos;re not just getting a freelancer, you&apos;re investing in your community. Local professionals understand the market, show up when it counts, and have a reputation worth protecting. In Southwest Missouri, we look out for each other. This directory exists to make those connections easier.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20" style={{ backgroundColor: "#F5EFE6" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-14" style={{ color: "#2C2420" }}>How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map(({ title, body, Icon }, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "#E8C99A" }}>
                  <Icon size={28} style={{ color: "#7C4A1E" }} strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: "#2C2420" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B5E55" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-white text-center" style={{ backgroundColor: "#7C4A1E" }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Are you a local freelancer?</h2>
          <p className="mb-8" style={{ color: "#E8C99A" }}>
            Get listed and start connecting with clients in the 417.
          </p>
          <Link
            href="/apply"
            className="inline-block px-8 py-3.5 font-semibold rounded-md btn-accent"
          >
            Apply to Join
          </Link>
        </div>
      </section>
    </>
  );
}
