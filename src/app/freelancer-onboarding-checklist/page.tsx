import type { Metadata } from "next";
import Link from "next/link";
import {
  Rocket,
  KeyRound,
  MessageCircle,
  CalendarCheck,
  ClipboardCheck,
  FolderOpen,
  CircleCheckBig,
  ArrowRight,
} from "lucide-react";
import { FAQPageSchema, BreadcrumbSchema } from "@/components/SchemaOrg";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";
const pageUrl = `${siteUrl}/freelancer-onboarding-checklist`;

export const metadata: Metadata = {
  title: "Freelancer Onboarding Checklist | 417 Freelancers",
  description:
    "What to line up, share, and confirm in the first week after you hire a freelancer, so the project starts smoothly and stays on track. A practical checklist for businesses hiring in the 417 area.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Freelancer Onboarding Checklist",
    description:
      "A practical checklist for the first week after you hire a freelancer, covering access, kickoff, communication, milestones, and close out.",
    url: pageUrl,
  },
  robots: { index: true, follow: true },
};

const stages = [
  {
    icon: Rocket,
    heading: "Before day one",
    intro:
      "A good start happens before any work begins. Nail down these basics once you have chosen who to hire, and the rest of the project has something solid to stand on.",
    items: [
      "Sign a simple contract covering scope, price, payment schedule, deadlines, revisions, and who owns the finished work.",
      "Confirm a start date and a rough timeline both sides agree on.",
      "Agree on a deposit if one applies, and when the remaining payments are due.",
      "Make sure the brief or scope you sent matches what you actually talked about, not just the first draft.",
    ],
  },
  {
    icon: KeyRound,
    heading: "Give them what they need to start",
    intro:
      "Nothing stalls a project faster than a freelancer waiting on a file, a login, or an answer only you can provide. Gather this up front so the first week is not spent chasing you down.",
    items: [
      "Brand assets: logo files, color codes, fonts, and any existing style guide.",
      "Access they need to do the work: a website login, a hosting or domain account, a shared drive, a social account, or a content management system.",
      "Examples of work or styles you like, and just as useful, ones you do not.",
      "Any existing content, product information, or photos the work depends on.",
      "One clear point of contact on your side, so questions do not stall waiting on a group reply.",
    ],
  },
  {
    icon: MessageCircle,
    heading: "Run a short kickoff conversation",
    intro:
      "A quick call or detailed message at the start is worth more than several emails later. Use it to confirm you are both picturing the same project.",
    items: [
      "Walk through the goal and the deliverables together, out loud, not just on paper.",
      "Ask how they prefer to work: what they need from you, how they take feedback, and what usually slows a project down on their end.",
      "Set expectations for response time on both sides.",
      "Agree on what tool you will use to communicate and to share files, so things do not get scattered across email, text, and social messages.",
    ],
  },
  {
    icon: CalendarCheck,
    heading: "Confirm milestones and check-ins",
    intro:
      "Even a short project benefits from a few visible checkpoints. They give you both an early, low-stakes chance to catch a misunderstanding before it is baked into the final result.",
    items: [
      "Break the project into two or three checkpoints, even for smaller jobs, so you see progress before the very end.",
      "Set a simple check-in rhythm, whether that is a weekly update or a note at each milestone.",
      "Confirm which milestones are tied to a payment, so there are no surprises when an invoice arrives.",
      "Write down the plan for changes: what happens if the scope shifts partway through.",
    ],
  },
  {
    icon: ClipboardCheck,
    heading: "Give feedback that is easy to act on",
    intro:
      "How you respond to the first draft sets the tone for the rest of the project. Specific, timely feedback keeps momentum and revisions to a minimum.",
    items: [
      "Respond within the window you agreed on, even if it is just to say you need a few more days.",
      "Be specific: point to what is not working and why, rather than a general sense that something is off.",
      "Separate a must-fix from a nice-to-have, so the freelancer can prioritize correctly.",
      "Keep feedback in one place, in writing, instead of split across a call, a text, and a comment.",
    ],
  },
  {
    icon: FolderOpen,
    heading: "Close out the project the right way",
    intro:
      "The end of a project is as much a part of onboarding the next one as the start was. A clean close out makes it easy to come back to the same freelancer later.",
    items: [
      "Confirm you have received final files in a usable, editable format, not just a preview.",
      "Double check that ownership and usage rights match what the contract says.",
      "Update or remove any access you shared that is no longer needed, like a temporary login.",
      "If the work went well, ask if you can share a short reference or review, and let them know you would hire them again.",
    ],
  },
];

const relatedTools = [
  {
    href: "/contract-generator",
    title: "Contract Generator",
    description: "Build a simple services agreement covering scope, payment, revisions, and ownership.",
  },
  {
    href: "/project-brief-builder",
    title: "Project Brief Builder",
    description: "Put the goal, deliverables, and requirements in writing before work begins.",
  },
  {
    href: "/invoice",
    title: "Invoice Generator",
    description: "Create a professional PDF invoice for a milestone or final payment.",
  },
];

const faqs = [
  {
    question: "What should I have ready before a freelancer starts?",
    answer:
      "At minimum, a signed contract, any brand assets or examples, and access to whatever accounts or files the work depends on. Gathering these before day one, instead of during it, is the single biggest thing you can do to keep a project on schedule.",
  },
  {
    question: "How often should I check in with a freelancer?",
    answer:
      "It depends on the length of the project, but a short weekly update or a note at each milestone works well for most freelance work. Agree on the rhythm during your kickoff conversation so neither side is guessing whether a silence means things are fine or stalled.",
  },
  {
    question: "What if I do not have brand guidelines or examples ready?",
    answer:
      "That is common, especially for a first project. Say so directly rather than leaving the freelancer to guess, and share whatever you do have, even if it is informal, like a competitor's site you like or a rough color preference. Most freelancers can work from general direction and refine it with you as drafts come in.",
  },
  {
    question: "Do I need a written contract for a small project?",
    answer:
      "Yes, even a simple one. A short contract covering scope, price, payment, and ownership protects both sides and prevents the most common disputes, and it takes only a few minutes to put together with a tool like the contract generator above.",
  },
  {
    question: "What happens if the project scope needs to change partway through?",
    answer:
      "Scope changes are normal. What matters is handling them the same way you handled the original scope: write down what is changing, agree on any effect on price or timeline, and confirm it in writing before the new work starts.",
  },
  {
    question: "How do I know when a project is finished?",
    answer:
      "A project is finished when you have the final files in a usable format, ownership matches what the contract says, and any outstanding invoice is settled. Confirming these three things at close out avoids a project that quietly drags on past its real end point.",
  },
];

export default function FreelancerOnboardingChecklistPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Resources", url: `${siteUrl}/resources` },
          { name: "Freelancer Onboarding Checklist", url: pageUrl },
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
            Freelancer Onboarding Checklist
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#C8B8A8" }}>
            What to line up, share, and confirm in the first week after you hire, so the project starts smoothly and stays on track.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="mb-14 space-y-4 text-base leading-relaxed" style={{ color: "#6B5E55" }}>
          <p>
            Picking the right freelancer is only half the job. How you bring them on board in the first week often decides whether a project runs smoothly or turns into a string of delays and back and forth. Most onboarding problems are not about talent. They are about a missing login, an unclear expectation, or feedback that never quite lands.
          </p>
          <p>
            This checklist walks through what to line up before work starts, through the first check-ins, to a clean close out at the end. If you have not hired anyone yet, the{" "}
            <Link href="/directory" className="font-medium" style={{ color: "#C47A3A" }}>
              freelancer directory
            </Link>{" "}
            is where to find vetted local professionals in the 417 area.
          </p>
        </div>

        {/* Stages */}
        <div className="space-y-12">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div key={stage.heading}>
                <div className="flex items-start gap-4 mb-3">
                  <div
                    className="flex items-center justify-center rounded-md shrink-0"
                    style={{ backgroundColor: "#E8C99A", width: 44, height: 44 }}
                  >
                    <Icon size={22} style={{ color: "#7C4A1E" }} strokeWidth={1.75} />
                  </div>
                  <h2 className="text-2xl font-bold pt-1.5" style={{ color: "#2C2420" }}>
                    {stage.heading}
                  </h2>
                </div>
                <div className="sm:pl-[60px]">
                  <p className="text-base leading-relaxed mb-4" style={{ color: "#6B5E55" }}>
                    {stage.intro}
                  </p>
                  <ul className="space-y-3">
                    {stage.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CircleCheckBig
                          size={18}
                          className="mt-0.5 shrink-0"
                          style={{ color: "#C47A3A" }}
                          strokeWidth={1.75}
                        />
                        <span className="text-base leading-relaxed" style={{ color: "#6B5E55" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Related tools */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#2C2420" }}>
            Tools to formalize the work
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
          <h2 className="text-2xl font-bold mb-3">Ready to bring someone on?</h2>
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
