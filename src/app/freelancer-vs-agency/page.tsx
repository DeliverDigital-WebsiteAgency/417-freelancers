import type { Metadata } from "next";
import Link from "next/link";
import {
  User,
  Building2,
  Scale,
  DollarSign,
  Zap,
  Layers,
  MessageSquareText,
  Clock,
  ArrowRight,
} from "lucide-react";
import { FAQPageSchema, BreadcrumbSchema } from "@/components/SchemaOrg";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";
const pageUrl = `${siteUrl}/freelancer-vs-agency`;

export const metadata: Metadata = {
  title: "Freelancer vs. Agency: Which Should You Hire? | 417 Freelancers",
  description:
    "A straight comparison of hiring a freelancer versus an agency for your project, covering cost, speed, communication, scope, and reliability, written for businesses in Springfield and the 417 area.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Freelancer vs. Agency: Which Should You Hire?",
    description:
      "How freelancers and agencies really compare on cost, speed, communication, and scope, and how to decide which one fits your project in the 417 area.",
    url: pageUrl,
  },
  robots: { index: true, follow: true },
};

const dimensions = [
  {
    icon: DollarSign,
    label: "Cost",
    freelancer:
      "Lower overhead, so you generally pay for the work itself rather than a layer of management and office costs on top. Best value for defined projects.",
    agency:
      "Higher rates that fund account managers, coordination, and capacity. You pay more, but part of what you buy is having the project run for you.",
  },
  {
    icon: MessageSquareText,
    label: "Communication",
    freelancer:
      "You talk directly to the person doing the work. Feedback is fast and nothing gets lost in a hand off, though you are the one managing the relationship.",
    agency:
      "You usually work through an account manager who relays to a team. Smoother when several people are involved, but a step removed from the maker.",
  },
  {
    icon: Zap,
    label: "Speed and flexibility",
    freelancer:
      "Quick to start and easy to adjust for small to mid sized work. A single person can only take on so much at once, so availability is the limit.",
    agency:
      "More capacity to run large or parallel workstreams, but process and scheduling can add lead time before anything begins.",
  },
  {
    icon: Layers,
    label: "Scope and range",
    freelancer:
      "Deep in a specialty: a developer, a designer, a photographer. Ideal when your project is one clear discipline done well.",
    agency:
      "Covers several disciplines under one roof and coordinates them, which helps when a project truly needs strategy, design, and build together.",
  },
  {
    icon: Clock,
    label: "Continuity and coverage",
    freelancer:
      "One person means one point of contact and one calendar. Ask up front how they handle vacations, sick days, and support after launch.",
    agency:
      "Built for backup and continuity, so work can continue if one team member is out. That reliability is part of what the higher price covers.",
  },
];

const freelancerFits = [
  "A single, well defined project such as a logo, a website, a promo video, a batch of product photos, or a monthly newsletter.",
  "A modest ongoing need that does not fill a full role, like recurring design or copy support.",
  "A budget where every dollar should go toward the actual work rather than overhead.",
  "A project where you want to work directly with the maker and keep the loop short.",
];

const agencyFits = [
  "A project that spans several disciplines at once and needs to be coordinated for you.",
  "Work where guaranteed coverage and backup matter more than the lowest price.",
  "A large or long running program with many moving parts and stakeholders.",
  "A team that wants to hand off project management rather than own it internally.",
];

const relatedTools = [
  {
    href: "/project-cost-estimator",
    title: "Project Cost Estimator",
    description: "Estimate what a web, design, photo, video, copy, or marketing project should cost before you reach out.",
  },
  {
    href: "/rate-calculator",
    title: "Rate Calculator",
    description: "See what a fair freelance hourly rate looks like so you can read any quote with context.",
  },
  {
    href: "/contract-generator",
    title: "Contract Generator",
    description: "Build a simple services agreement covering scope, payment, revisions, and ownership.",
  },
];

const hireLinks = [
  { href: "/hire/web-developers", label: "Web Developers" },
  { href: "/hire/graphic-designers", label: "Graphic Designers" },
  { href: "/hire/photographers", label: "Photographers" },
  { href: "/hire/videographers", label: "Videographers" },
  { href: "/hire/copywriters", label: "Copywriters" },
  { href: "/hire/digital-marketers", label: "Digital Marketers" },
];

const faqs = [
  {
    question: "Is a freelancer or an agency cheaper?",
    answer:
      "A freelancer is almost always the lower cost option for the same defined scope, because you are not paying for account management, office space, and team overhead on top of the work. An agency costs more, but part of that premium buys coordination and capacity you would otherwise manage yourself. The right question is not which is cheaper but which delivers the outcome you need at a price you can justify.",
  },
  {
    question: "When does an agency make more sense than a freelancer?",
    answer:
      "An agency is usually the better fit when a project spans several disciplines that have to work together, when you need guaranteed coverage and backup, or when the program is large and long running with many stakeholders. If you want to hand off project management rather than own it, an agency is built for that.",
  },
  {
    question: "Can a freelancer handle a big project?",
    answer:
      "Often yes, especially a specialist working on a project within their discipline. For work that reaches beyond one person's capacity, many experienced freelancers collaborate with a small network of other independents, which can give you agency style breadth while keeping the direct, lower cost relationship. Ask how they handle scope and timelines that stretch past a single person.",
  },
  {
    question: "How do I decide between a freelancer and an agency?",
    answer:
      "Start with your project, not the provider. Write down the scope, the number of disciplines involved, your budget, and how much coordination you want to handle. A single, clearly defined project usually points to a freelancer. A multi discipline, high coordination program usually points to an agency. When it is a close call, the freelancer is often worth trying first because the cost and commitment are lower.",
  },
  {
    question: "Where can I find freelancers in the 417 area?",
    answer:
      "The 417 Freelancers directory lists vetted local professionals across web, design, photography, video, copywriting, and marketing. You can browse by category, review each profile, and reach out directly to the people whose work fits your project.",
  },
];

export default function FreelancerVsAgencyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Resources", url: `${siteUrl}/resources` },
          { name: "Freelancer vs. Agency", url: pageUrl },
        ]}
      />
      <FAQPageSchema faqs={faqs} />

      {/* Hero */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg, #2C2420 0%, #7C4A1E 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#E8C99A" }}>
            417 Hiring Guide
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "#F5EFE6" }}>
            Freelancer vs. Agency: Which Should You Hire?
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#C8B8A8" }}>
            A straight comparison of the two most common ways to get creative and technical work done, written for businesses hiring in Springfield and the 417 area.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="mb-14 space-y-4 text-base leading-relaxed" style={{ color: "#6B5E55" }}>
          <p>
            When you need a website, a brand, a video, or a marketing push, one of the first decisions is who does the work: an independent freelancer or a full service agency. Both can produce excellent results. They are simply built for different kinds of projects, and picking the wrong one usually costs you either money you did not need to spend or coordination you did not want to give away.
          </p>
          <p>
            This guide lays out how the two really differ, where each one shines, and a simple way to decide. When you are ready to find local talent, the{" "}
            <Link href="/directory" className="font-medium" style={{ color: "#C47A3A" }}>
              freelancer directory
            </Link>{" "}
            connects you with vetted professionals across the 417 area.
          </p>
        </div>

        {/* At a glance comparison */}
        <div className="mb-16">
          <div className="flex items-start gap-4 mb-6">
            <div
              className="flex items-center justify-center rounded-md shrink-0"
              style={{ backgroundColor: "#E8C99A", width: 44, height: 44 }}
            >
              <Scale size={22} style={{ color: "#7C4A1E" }} strokeWidth={1.75} />
            </div>
            <h2 className="text-2xl font-bold pt-1.5" style={{ color: "#2C2420" }}>
              How they compare at a glance
            </h2>
          </div>

          {/* Column headers */}
          <div className="hidden sm:grid grid-cols-[1fr_1fr] gap-4 mb-3 sm:pl-[60px]">
            <div className="flex items-center gap-2">
              <User size={18} style={{ color: "#7C4A1E" }} strokeWidth={1.75} />
              <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: "#7C4A1E" }}>
                Freelancer
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 size={18} style={{ color: "#7C4A1E" }} strokeWidth={1.75} />
              <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: "#7C4A1E" }}>
                Agency
              </span>
            </div>
          </div>

          <div className="space-y-4 sm:pl-[60px]">
            {dimensions.map((dim) => {
              const Icon = dim.icon;
              return (
                <div
                  key={dim.label}
                  className="rounded-lg border p-5"
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E8C99A" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Icon size={18} style={{ color: "#C47A3A" }} strokeWidth={1.75} />
                    <h3 className="text-base font-semibold" style={{ color: "#2C2420" }}>
                      {dim.label}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span
                        className="sm:hidden block text-xs font-semibold uppercase tracking-wide mb-1"
                        style={{ color: "#7C4A1E" }}
                      >
                        Freelancer
                      </span>
                      <p className="text-sm leading-relaxed" style={{ color: "#6B5E55" }}>
                        {dim.freelancer}
                      </p>
                    </div>
                    <div>
                      <span
                        className="sm:hidden block text-xs font-semibold uppercase tracking-wide mb-1"
                        style={{ color: "#7C4A1E" }}
                      >
                        Agency
                      </span>
                      <p className="text-sm leading-relaxed" style={{ color: "#6B5E55" }}>
                        {dim.agency}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* When a freelancer fits */}
        <div className="mb-14">
          <div className="flex items-start gap-4 mb-4">
            <div
              className="flex items-center justify-center rounded-md shrink-0"
              style={{ backgroundColor: "#E8C99A", width: 44, height: 44 }}
            >
              <User size={22} style={{ color: "#7C4A1E" }} strokeWidth={1.75} />
            </div>
            <h2 className="text-2xl font-bold pt-1.5" style={{ color: "#2C2420" }}>
              When a freelancer is the better call
            </h2>
          </div>
          <div className="sm:pl-[60px]">
            <p className="text-base leading-relaxed mb-4" style={{ color: "#6B5E55" }}>
              For most small and mid sized businesses, a skilled freelancer is the right fit more often than people expect. You get an experienced professional focused on your project, without the overhead that pads an agency invoice. A freelancer tends to be the stronger choice when:
            </p>
            <ul className="space-y-3">
              {freelancerFits.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-2 shrink-0 rounded-full"
                    style={{ backgroundColor: "#C47A3A", width: 7, height: 7 }}
                    aria-hidden="true"
                  />
                  <span className="text-base leading-relaxed" style={{ color: "#6B5E55" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* When an agency fits */}
        <div className="mb-14">
          <div className="flex items-start gap-4 mb-4">
            <div
              className="flex items-center justify-center rounded-md shrink-0"
              style={{ backgroundColor: "#E8C99A", width: 44, height: 44 }}
            >
              <Building2 size={22} style={{ color: "#7C4A1E" }} strokeWidth={1.75} />
            </div>
            <h2 className="text-2xl font-bold pt-1.5" style={{ color: "#2C2420" }}>
              When an agency is the better call
            </h2>
          </div>
          <div className="sm:pl-[60px]">
            <p className="text-base leading-relaxed mb-4" style={{ color: "#6B5E55" }}>
              An agency earns its higher price when a project is bigger than one person and needs to be managed for you. The coordination, capacity, and continuity are the product as much as the creative work itself. An agency tends to be the stronger choice when:
            </p>
            <ul className="space-y-3">
              {agencyFits.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-2 shrink-0 rounded-full"
                    style={{ backgroundColor: "#C47A3A", width: 7, height: 7 }}
                    aria-hidden="true"
                  />
                  <span className="text-base leading-relaxed" style={{ color: "#6B5E55" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How to decide */}
        <div className="mb-4">
          <div className="flex items-start gap-4 mb-4">
            <div
              className="flex items-center justify-center rounded-md shrink-0"
              style={{ backgroundColor: "#E8C99A", width: 44, height: 44 }}
            >
              <Scale size={22} style={{ color: "#7C4A1E" }} strokeWidth={1.75} />
            </div>
            <h2 className="text-2xl font-bold pt-1.5" style={{ color: "#2C2420" }}>
              A simple way to decide
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed sm:pl-[60px]" style={{ color: "#6B5E55" }}>
            <p>
              Start with the project, not the provider. Write down the scope, count how many distinct disciplines it involves, set your budget, and be honest about how much coordination you actually want to own. Those four answers point you most of the way there.
            </p>
            <p>
              If the work is one clear discipline done well, and you are comfortable being the point of contact, a freelancer will usually give you more for your money. If the work reaches across strategy, design, and build at once, or you need guaranteed coverage and would rather hand off the management, an agency is worth the premium. When it is a genuine toss up, the freelancer is often the smart first move: the cost and commitment are lower, and you can always scale up to an agency later if the project grows beyond one person.
            </p>
            <p>
              Whichever way you lean, the fundamentals of a good hire are the same. Get the scope in writing, agree on price and payment up front, and confirm who owns the finished work. If you want help sizing a budget before you reach out, the tools below give you a starting range.
            </p>
          </div>
        </div>

        {/* Related tools */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#2C2420" }}>
            Tools to plan your budget
          </h2>
          <p className="text-base mb-6" style={{ color: "#6B5E55" }}>
            Free and in your browser, with no account required.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col rounded-lg p-6 border transition-shadow hover:shadow-md"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E8C99A" }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-semibold leading-snug" style={{ color: "#2C2420" }}>
                    {tool.title}
                  </h3>
                  <ArrowRight size={15} className="mt-0.5 shrink-0" style={{ color: "#C47A3A" }} />
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#6B5E55" }}>
                  {tool.description}
                </p>
                <span className="mt-4 text-sm font-medium group-hover:underline" style={{ color: "#C47A3A" }}>
                  Open Tool
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Hire by category */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#2C2420" }}>
            Ready to hire a freelancer?
          </h2>
          <p className="text-base mb-6" style={{ color: "#6B5E55" }}>
            Each guide covers what to look for and what to expect when hiring that kind of professional in the 417.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hireLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between gap-3 rounded-md px-5 py-4 border transition-colors"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E8C99A" }}
              >
                <span className="text-base font-medium" style={{ color: "#2C2420" }}>
                  Hire {link.label}
                </span>
                <ArrowRight size={16} className="shrink-0" style={{ color: "#C47A3A" }} />
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#2C2420" }}>
            Common questions
          </h2>
          <div>
            {faqs.map((faq, i) => (
              <details key={i} className="group" style={{ borderTop: "1px solid #E8C99A" }}>
                <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none">
                  <span className="font-medium text-base pr-2" style={{ color: "#2C2420" }}>
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 text-xl leading-none transition-transform duration-200 group-open:rotate-45"
                    style={{ color: "#C47A3A" }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="pb-4 text-sm leading-relaxed" style={{ color: "#6B5E55" }}>
                  {faq.answer}
                </div>
              </details>
            ))}
            <div style={{ borderTop: "1px solid #E8C99A" }} />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl text-white text-center p-10" style={{ backgroundColor: "#7C4A1E" }}>
          <h2 className="text-2xl font-bold mb-3">Find the right person for your project</h2>
          <p className="mb-6" style={{ color: "#E8C99A" }}>
            Browse vetted local freelancers in Springfield and the 417 area.
          </p>
          <Link href="/directory" className="inline-block px-8 py-3 font-semibold rounded-md btn-accent">
            Browse the Directory
          </Link>
        </div>
      </div>
    </>
  );
}
