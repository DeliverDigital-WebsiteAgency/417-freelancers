import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList,
  Users,
  MapPin,
  ShieldCheck,
  DollarSign,
  FileText,
  Handshake,
  TriangleAlert,
  ArrowRight,
} from "lucide-react";
import { FAQPageSchema, BreadcrumbSchema } from "@/components/SchemaOrg";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";
const pageUrl = `${siteUrl}/how-to-hire-a-freelancer`;

export const metadata: Metadata = {
  title: "How to Hire a Freelancer in Springfield, MO | 417 Freelancers",
  description:
    "A practical, step by step guide to hiring a freelancer in Springfield and the 417 area. Scope your project, find local talent, compare quotes, vet candidates, and set up the work the right way.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "How to Hire a Freelancer in Springfield, MO",
    description:
      "A practical, step by step guide to hiring a freelancer in Springfield and the 417 area, from scoping your project to signing a contract.",
    url: pageUrl,
  },
  robots: { index: true, follow: true },
};

const steps = [
  {
    icon: ClipboardList,
    heading: "1. Get clear on the project before you reach out",
    body: [
      "The most common reason a freelance project goes sideways is a fuzzy starting point. Before you contact anyone, write down what you actually need: the goal, the deliverables, a rough deadline, and how you will know the work is done. A single paragraph is fine to start.",
      "Try to separate what you need from what you would like. A new website might need five pages, a contact form, and mobile friendly layout, and it would be nice to have a blog and a booking widget later. Knowing that difference helps a freelancer scope the work honestly and helps you compare quotes on the same footing.",
    ],
  },
  {
    icon: Users,
    heading: "2. Decide whether a freelancer is the right fit",
    body: [
      "Freelancers, agencies, and full time hires all solve different problems. A freelancer is usually the right call for a defined project or an ongoing need that does not fill a whole role: a logo, a website refresh, a monthly newsletter, a video, a batch of product photos. You work directly with the person doing the work, which keeps communication short and costs lower than an agency.",
      "An agency can make more sense when a project spans several disciplines at once and needs to be coordinated for you, or when you need guaranteed coverage and backup. A full time hire fits when the work is constant and central to your business. There is no universal answer here, so weigh the size and steadiness of the work against how much project management you want to own yourself.",
    ],
  },
  {
    icon: MapPin,
    heading: "3. Find local talent in the 417",
    body: [
      "Hiring someone nearby has real advantages: you can meet in person, you share a time zone and a local context, and your money stays in the community. Springfield and the surrounding 417 area have a deep bench of independent professionals across web, design, photography, video, copywriting, and marketing.",
      "The 417 Freelancers directory is built for exactly this. You can browse by category, look at each person's profile and work, and reach out directly. If you would rather start from the kind of help you need, the hire guides below point you to the right category.",
    ],
  },
  {
    icon: ShieldCheck,
    heading: "4. Vet candidates before you commit",
    body: [
      "Once you have a short list, look past the sales pitch. Ask to see recent work that resembles your project, and if you can, look at a finished result rather than a single polished screenshot. Ask how they typically communicate, how they handle revisions, and what they need from you to do their best work.",
      "Talking to a past client is worth more than any portfolio. A quick note asking whether the work was delivered on time, whether the budget held, and whether they would hire the person again tells you most of what you need to know. Vetted local references are easier to check than an anonymous profile from across the country.",
    ],
  },
  {
    icon: DollarSign,
    heading: "5. Understand pricing and get comparable quotes",
    body: [
      "Freelancers price work in different ways: an hourly rate, a fixed project fee, or a monthly retainer for ongoing work. Fixed project pricing is usually easiest for a client because you know the total up front, as long as the scope is clear. Hourly can be fair for open ended or exploratory work, but ask for an estimated range and a cap.",
      "When you collect quotes, make sure everyone is pricing the same scope, and be cautious of a bid that comes in far below the rest, since it often means something was left out. If you want a sense of a fair number before you reach out, the tools below can help you sanity check both a rate and a full project budget.",
    ],
  },
  {
    icon: FileText,
    heading: "6. Write a short, clear brief",
    body: [
      "A good brief does not need to be long. Include the goal, the deliverables, the deadline, your budget or budget range, and any brand assets or examples you like. Sharing a budget range is not a weakness. It helps the freelancer propose the right solution instead of guessing, and it filters out anyone who is not a fit before you waste time.",
      "Spell out what a finished deliverable looks like and how many rounds of revisions are included. Most disputes trace back to a detail that was assumed rather than written down, so a few extra sentences now save a difficult conversation later.",
    ],
  },
  {
    icon: Handshake,
    heading: "7. Set up the working relationship",
    body: [
      "Put the agreement in writing, even for a small job. A simple contract should cover scope, price and payment schedule, deadlines, how many revisions are included, and who owns the finished work. This protects both sides and makes expectations obvious from day one.",
      "For anything beyond a quick task, a deposit up front is standard and reasonable. Agree on how you will check in, whether that is a weekly note or a shared document, and keep decisions in writing so nothing gets lost in memory. Clear, friendly structure is what makes a freelance relationship worth repeating.",
    ],
  },
  {
    icon: TriangleAlert,
    heading: "8. Watch for red flags",
    body: [
      "A few warning signs are worth taking seriously. Be cautious if someone will not show relevant work, dodges a written scope or contract, is hard to reach before you have even hired them, or pressures you to pay the full amount up front before any work begins. Communication that is slow or vague during the courtship rarely improves once the money is in.",
      "None of these are automatic deal breakers on their own, but a cluster of them is a reason to keep looking. The right freelancer will welcome clear terms, because it protects their time as much as your budget.",
    ],
  },
];

const relatedTools = [
  {
    href: "/rate-calculator",
    title: "Rate Calculator",
    description: "See what a fair freelance hourly rate looks like so you can read a quote with context.",
  },
  {
    href: "/project-cost-estimator",
    title: "Project Cost Estimator",
    description: "Estimate what a web, design, photo, video, copy, or marketing project should cost before you reach out.",
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
    question: "How much does it cost to hire a freelancer in Springfield, MO?",
    answer:
      "It depends entirely on the work and the freelancer's experience. Small, well defined tasks can be a few hundred dollars, while a full website, brand identity, or video production runs into the thousands. The most reliable way to budget is to define your scope clearly and gather two or three quotes on that same scope. The Rate Calculator and Project Cost Estimator on this site can give you a starting range.",
  },
  {
    question: "Is it better to hire a freelancer or an agency?",
    answer:
      "A freelancer is usually the better fit for a defined project or a modest ongoing need, because you work directly with the person doing the work and keep costs lower. An agency can make more sense when a project spans several disciplines at once or you need guaranteed coverage. Weigh the size and steadiness of the work against how much coordination you want to handle yourself.",
  },
  {
    question: "How do I know if a freelancer is trustworthy?",
    answer:
      "Look at recent work similar to your project, ask for a written scope and a simple contract, and talk to a past client if you can. A freelancer who communicates clearly before you hire them and welcomes written terms is showing you how the working relationship will go.",
  },
  {
    question: "Should I pay a freelancer up front?",
    answer:
      "A deposit up front is standard and reasonable for anything beyond a quick task, and it is often tied to a payment schedule with the balance due on delivery. Be cautious of anyone who insists on the full amount before any work begins, especially if you have not seen a scope or contract.",
  },
  {
    question: "Where can I find local freelancers in the 417 area?",
    answer:
      "The 417 Freelancers directory lists vetted local professionals across web, design, photography, video, copywriting, and marketing. You can browse by category, review each profile, and reach out directly to the people whose work fits your project.",
  },
];

export default function HowToHirePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Resources", url: `${siteUrl}/resources` },
          { name: "How to Hire a Freelancer", url: pageUrl },
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
            How to Hire a Freelancer in Springfield, MO
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#C8B8A8" }}>
            A practical walkthrough for hiring local talent in the 417 area, from scoping your project to signing a simple contract.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="mb-14 space-y-4 text-base leading-relaxed" style={{ color: "#6B5E55" }}>
          <p>
            Hiring a freelancer is one of the fastest ways to get real help without adding a full time role. Done well, you get an experienced professional focused on your project and a clear result for a price you agreed to in advance. Done carelessly, you get missed deadlines and a budget that keeps creeping.
          </p>
          <p>
            The difference is almost always in the setup. This guide walks through the steps that keep a freelance project on track, written for business owners and teams hiring in Springfield and the surrounding 417 area. When you are ready, the{" "}
            <Link href="/directory" className="font-medium" style={{ color: "#C47A3A" }}>
              freelancer directory
            </Link>{" "}
            is the place to find local, vetted professionals.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.heading}>
                <div className="flex items-start gap-4 mb-3">
                  <div
                    className="flex items-center justify-center rounded-md shrink-0"
                    style={{ backgroundColor: "#E8C99A", width: 44, height: 44 }}
                  >
                    <Icon size={22} style={{ color: "#7C4A1E" }} strokeWidth={1.75} />
                  </div>
                  <h2 className="text-2xl font-bold pt-1.5" style={{ color: "#2C2420" }}>
                    {step.heading}
                  </h2>
                </div>
                <div className="space-y-4 text-base leading-relaxed sm:pl-[60px]" style={{ color: "#6B5E55" }}>
                  {step.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            );
          })}
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
            Hiring for something specific?
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
          <h2 className="text-2xl font-bold mb-3">Ready to find the right person?</h2>
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
