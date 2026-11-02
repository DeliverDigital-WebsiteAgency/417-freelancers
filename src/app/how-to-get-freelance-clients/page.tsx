import type { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Search,
  FolderOpen,
  Users,
  MapPin,
  Send,
  Repeat,
  CircleCheckBig,
  ArrowRight,
} from "lucide-react";
import { FAQPageSchema, BreadcrumbSchema } from "@/components/SchemaOrg";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";
const pageUrl = `${siteUrl}/how-to-get-freelance-clients`;

export const metadata: Metadata = {
  title: "How to Get Freelance Clients in Springfield, MO | 417 Freelancers",
  description:
    "A practical guide to finding freelance clients in Springfield and the 417 area: positioning, getting found locally, portfolios, referrals, in person networking, direct outreach, and turning one project into steady work.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "How to Get Freelance Clients in Springfield, MO",
    description:
      "How local freelancers actually find work in the 417 area, from positioning and portfolios to referrals, networking, and repeat clients.",
    url: pageUrl,
  },
  robots: { index: true, follow: true },
};

const stages = [
  {
    icon: Target,
    heading: "Decide who you are for",
    intro:
      "The freelancers who stay busy are rarely the most talented ones in town. They are the ones people can describe in a sentence. If nobody can explain what you do, nobody can refer you, and you end up competing on price with everyone who does a little of everything.",
    items: [
      "Name the work you want more of, and the kind of client it tends to come from, even if you are capable of plenty else.",
      "Write what you do in one plain sentence someone could repeat to a friend from memory, with no industry jargon in it.",
      "Pick a position you can actually defend locally: an industry you know from the inside, a service few people nearby offer, or a project size you handle better than an agency would.",
      "Decide what you will turn down. Work that does not fit tends to eat the time you needed for the work that does.",
      "Say the same thing everywhere. A profile, a proposal, and an introduction at an event should all sound like the same person.",
    ],
  },
  {
    icon: Search,
    heading: "Make yourself easy to find, and easy to check",
    intro:
      "Most local hiring starts with a search and ends with a quick credibility check. A business owner looks for someone nearby, finds three names, then spends about a minute deciding which two are worth contacting. You want to survive that minute.",
    items: [
      "Keep a current web presence, even if it is a single page, that says what you do, who you do it for, where you are, and how to reach you.",
      "Use the words your clients use rather than the words your industry uses. People search for what they need, not for the name of your craft.",
      "Make sure your service and your area appear together somewhere on the page, since local searches lean heavily on location.",
      "List yourself in a local directory so you turn up where people are already looking for someone close by.",
      "Point every profile at the same email, phone number, and description. Conflicting details read as abandoned.",
      "Remove or update anything stale. An old rate sheet or a dead link costs you more than an empty section would.",
    ],
  },
  {
    icon: FolderOpen,
    heading: "Build a portfolio that answers the obvious questions",
    intro:
      "A portfolio is not a gallery, it is evidence. A prospective client is not admiring your work, they are trying to decide whether you can solve a problem that looks like theirs. Context does that job better than volume.",
    items: [
      "Show fewer pieces with more context: what the client needed, what you did, and what changed afterward.",
      "Lead with work that resembles the work you want next, even when it is not your most recent project.",
      "If you are starting out, make the samples real rather than hypothetical. A project for a local nonprofit or a small business you know carries more weight than an invented brief.",
      "Ask for a short reference while the project is still fresh in the client's mind, not months later.",
      "Be straightforward about your role when something was a team effort. Overstating it tends to surface at the worst time.",
      "Include a plain way to start a conversation on every page, so interest does not depend on someone hunting for your email.",
    ],
  },
  {
    icon: Users,
    heading: "Start with the network you already have",
    intro:
      "First clients almost always arrive through someone who already knows you. This is the least glamorous channel and consistently the most productive one, and it is the one most freelancers skip because it feels like asking for a favor.",
    items: [
      "Tell people specifically what you are doing now and what a good referral looks like. A vague request to keep an ear out gives nobody anything to act on.",
      "Go back to former employers and coworkers first. They already know your work, and overflow is a normal part of their week.",
      "Follow up with anyone who once asked about your rates and never booked. Budgets and timing change, and most people never circle back on their own.",
      "Make yourself easy to pass along: a short description and a link someone can forward without having to explain you.",
      "Thank people who send you work, and tell them how it went. Referrals come from people who know the last one landed well.",
    ],
  },
  {
    icon: MapPin,
    heading: "Show up locally, on purpose",
    intro:
      "In a market the size of Springfield and the surrounding 417 area, being known in person is a genuine advantage that no amount of online presence replaces. The pool of local business owners is small enough that reputation travels, in both directions.",
    items: [
      "Pick two or three places where your clients actually gather, such as business groups, the chamber, coworking spaces, or industry meetups, and attend consistently instead of once.",
      "Go to be useful rather than to pitch. Work follows familiarity, and familiarity takes more than one appearance.",
      "Build relationships with people who serve the same clients but do different work. A web developer, a photographer, and an accountant all field requests they cannot take themselves.",
      "Take some small local projects early. In a connected market, a well handled small job is an advertisement.",
      "Be reachable afterward. A card, a clear profile, or a simple page beats a promise to send details later.",
    ],
  },
  {
    icon: Send,
    heading: "Reach out directly, without being spammy",
    intro:
      "Cold outreach has a bad reputation because most of it is lazy. Done locally and specifically, it works, because you can reference a real business you have actually looked at and a problem you can genuinely fix.",
    items: [
      "Research before you write. Find something concrete about the business you can speak to, not a detail you could have copied from any homepage.",
      "Lead with the problem you noticed and what it likely costs them, rather than with your background and your service list.",
      "Keep it short enough to read on a phone, and ask for one small next step instead of a signed project.",
      "Send fewer, better messages. Twenty researched emails outperform two hundred templates, and they do not burn your name locally.",
      "Follow up once or twice, politely, then let it go. Persistence past that point reads as pressure.",
      "Track who you contacted and when, so you do not pitch the same business twice with two different angles.",
    ],
  },
  {
    icon: Repeat,
    heading: "Turn one project into steady work",
    intro:
      "Finding a new client costs far more effort than keeping one. A freelance business starts to feel stable not when the pipeline fills up, but when the same few clients keep coming back and sending others your way.",
    items: [
      "Finish well. Deliver on time, hand over files in a usable format, and make the close out simple.",
      "Before a project ends, name the obvious next thing: maintenance, a second phase, seasonal work, or the piece you deliberately left out of scope.",
      "Offer an ongoing arrangement where it genuinely fits, so neither side has to renegotiate from scratch every time something comes up.",
      "Stay in touch between projects with something useful, rather than a check in that only asks whether they have work.",
      "Ask for a referral at the moment the client is happiest, right after you have delivered something that worked.",
      "Raise your rates with new clients first. It is easier to price correctly at the start than to correct it mid relationship.",
    ],
  },
];

const relatedTools = [
  {
    href: "/rate-calculator",
    title: "Rate Calculator",
    description: "Work out an hourly and project rate from your real costs, time off, and income target.",
  },
  {
    href: "/contract-generator",
    title: "Contract Generator",
    description: "Build a simple services agreement covering scope, payment, revisions, and ownership.",
  },
  {
    href: "/invoice",
    title: "Invoice Generator",
    description: "Create a professional PDF invoice in your browser, with no account required.",
  },
];

const faqs = [
  {
    question: "How do I get my first freelance client with no portfolio?",
    answer:
      "Create real work rather than waiting for permission. A project for a local nonprofit, a small business you already know, or a rebuild of something that is visibly broken gives you a genuine sample and a reference at the same time. Pair that with the people who already know your work, former employers and coworkers especially, since they can judge you without a portfolio at all.",
  },
  {
    question: "Do I need a website to get freelance clients?",
    answer:
      "You need somewhere credible that people can check, and a single clear page is usually enough to start. What matters is that it states what you do, who it is for, where you work, and how to contact you, and that it matches what your other profiles say. A directory listing or a well kept profile can carry you early on, but having something you control is worth building toward.",
  },
  {
    question: "How much should I charge when I am starting out?",
    answer:
      "Start from your own numbers rather than from what you think the market expects. Add up your business costs and the income you need, account for unpaid time like admin, holidays, and gaps between projects, and work backward to a rate. Pricing low to win work is hard to undo, because raising a rate on an existing client is far more awkward than quoting correctly the first time.",
  },
  {
    question: "Is cold outreach worth it for local freelance work?",
    answer:
      "It can work well locally, precisely because you can look at a real business and reference something specific. The version that fails is the mass template. The version that works is a short, researched message about a problem you noticed, asking for one small next step. Expect most messages to go unanswered even when you do it properly, and judge it over a few dozen attempts rather than a few.",
  },
  {
    question: "How do I compete with cheaper freelancers online?",
    answer:
      "Usually by not competing on the same terms. Local presence, being reachable, understanding the market your client sells into, and being accountable in person are all things a low cost remote bid cannot match. If price is the only thing a prospective client is weighing, that is useful information about whether the project is a good fit for you.",
  },
  {
    question: "How long does it take to build a steady client base?",
    answer:
      "It varies enormously with your network, your field, and how much time you can put in, so treat any specific timeline you read with suspicion. What is consistent is the shape of it: early work comes from people who already know you, the middle stretch depends on referrals and repeat projects, and inbound enquiries from searches and listings tend to arrive last. Plan your finances around the slow start rather than the hoped for pace.",
  },
];

export default function HowToGetFreelanceClientsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Resources", url: `${siteUrl}/resources` },
          { name: "How to Get Freelance Clients", url: pageUrl },
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
            417 Freelancer Guide
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "#F5EFE6" }}>
            How to Get Freelance Clients in Springfield, MO
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#C8B8A8" }}>
            Where local work actually comes from, and the practical steps that bring it in, from your first client to a steady base of repeat ones.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="mb-14 space-y-4 text-base leading-relaxed" style={{ color: "#6B5E55" }}>
          <p>
            Most freelancers do not struggle because they are not good at the work. They struggle because finding clients is a different skill from doing the job, and nobody teaches it. The good news in a market like the 417 area is that the usual advice about scale and volume does not apply much here. Local work is won through clarity, visibility, and reputation, and all three are within reach of one person.
          </p>
          <p>
            This guide walks through the sequence that tends to work: deciding who you are for, making yourself findable, building proof, using the network you already have, showing up locally, reaching out directly, and then keeping the clients you win. If you are looking for the other side of this, the{" "}
            <Link href="/how-to-hire-a-freelancer" className="font-medium" style={{ color: "#C47A3A" }}>
              guide to hiring a freelancer
            </Link>{" "}
            shows how local businesses evaluate the people they are considering, which is worth reading as a freelancer too.
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

        {/* Get listed */}
        <div
          className="mt-16 rounded-lg p-8 border"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E8C99A" }}
        >
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#2C2420" }}>
            Be where people are already looking
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "#6B5E55" }}>
            Plenty of local hiring starts with someone searching for a freelancer nearby rather than for you by name. A listing in the 417 Freelancers directory puts your name, your service, and your contact details in front of businesses at the moment they are deciding who to call. It is free to apply, and every listing is reviewed before it goes live.
          </p>
          <Link href="/apply" className="inline-block px-8 py-3 font-semibold rounded-md btn-accent">
            Join the Directory
          </Link>
        </div>

        {/* Related tools */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#2C2420" }}>
            Tools for the business side
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
          <h2 className="text-2xl font-bold mb-3">Ready to be found locally?</h2>
          <p className="mb-6" style={{ color: "#E8C99A" }}>
            Apply to list your freelance services in the 417 Freelancers directory.
          </p>
          <Link href="/apply" className="inline-block px-8 py-3 font-semibold rounded-md btn-accent">
            Join the Directory
          </Link>
        </div>
      </div>
    </>
  );
}
