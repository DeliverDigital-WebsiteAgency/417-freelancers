import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

export const metadata: Metadata = {
  title: "Terms of Service | 417 Freelancers",
  description:
    "Read the Terms of Service for 417 Freelancers, Springfield MO's free local freelancer directory.",
  alternates: { canonical: `${siteUrl}/terms` },
};

const sections = [
  {
    id: "acceptance",
    heading: "1. Acceptance of Terms",
    body: (
      <>
        <p>
          By accessing or using 417freelancers.com, you agree to be bound by these Terms of
          Service. If you do not agree to these terms, please do not use the site. These terms
          apply to all visitors, freelancers listed in the directory, and anyone who uses the
          contact forms or other features of the site.
        </p>
      </>
    ),
  },
  {
    id: "what-we-are",
    heading: "2. What 417 Freelancers Is",
    body: (
      <>
        <p>
          417 Freelancers is a free online directory connecting clients with independent
          freelancers based in Springfield, Missouri and the broader 417 area. We provide a
          platform for freelancers to be discovered and for clients to find local talent.
        </p>
        <p>
          We are not a party to any agreement, contract, or arrangement made between a client
          and a freelancer found through this directory. We do not guarantee the quality,
          legality, timeliness, or delivery of any services offered by listed freelancers.
        </p>
        <p>
          Listing in the directory is currently free of charge. We reserve the right to
          introduce paid options in the future, and we will provide advance notice to currently
          listed freelancers before any such change takes effect.
        </p>
      </>
    ),
  },
  {
    id: "listings",
    heading: "3. Freelancer Listings",
    body: (
      <>
        <p>
          Freelancers are solely responsible for the accuracy, completeness, and legality of
          the information in their profiles. 417 Freelancers does not verify the credentials,
          licenses, or qualifications of any listed freelancer.
        </p>
        <p>
          We reserve the right to remove or edit any listing at any time, for any reason, at
          our sole discretion. A listing on this directory does not constitute an endorsement,
          recommendation, or guarantee of any freelancer's work or character.
        </p>
        <p>
          To be listed, freelancers must be based in or primarily serve clients in the 417
          area, which includes Springfield, Missouri and surrounding communities.
        </p>
      </>
    ),
  },
  {
    id: "client-responsibilities",
    heading: "4. Client Responsibilities",
    body: (
      <>
        <p>
          Clients are responsible for conducting their own due diligence before hiring any
          freelancer found through this directory. This includes verifying credentials,
          reviewing portfolios, checking references, and agreeing on the scope, timeline, and
          payment terms of any project.
        </p>
        <p>
          417 Freelancers is not responsible for disputes, disagreements, or damages that arise
          between clients and freelancers. Any such matters are between the client and the
          freelancer directly.
        </p>
        <p>
          The contact forms on this site must be used only for legitimate business inquiries.
          Use of the contact system for spam, solicitation, harassment, or any unlawful purpose
          is prohibited and may result in removal from the directory or other action.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    heading: "5. Intellectual Property",
    body: (
      <>
        <p>
          All site content, design, branding, and code belonging to 417 Freelancers, including
          but not limited to the site name, logo, and layout, are the property of 417
          Freelancers and may not be reproduced or used without written permission.
        </p>
        <p>
          Portfolio images, project descriptions, and other content submitted by freelancers
          remain the property of the respective freelancer. By submitting content for inclusion
          in the directory, freelancers grant 417 Freelancers a non-exclusive license to
          display that content on the site.
        </p>
        <p>
          Scraping, bulk downloading, or redistributing directory content without written
          permission is prohibited.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    heading: "6. Limitation of Liability",
    body: (
      <>
        <p>
          417 Freelancers is provided on an "as is" basis without warranties of any kind,
          express or implied. We do not warrant that the site will be available, error-free, or
          free from viruses or other harmful components.
        </p>
        <p>
          To the fullest extent permitted by law, 417 Freelancers and its operators shall not
          be liable for any indirect, incidental, or consequential damages arising from your
          use of the site. We are not liable for any disputes, losses, or damages arising from
          engagements between clients and freelancers found through this directory.
        </p>
      </>
    ),
  },
  {
    id: "monetization",
    heading: "7. Future Monetization",
    body: (
      <>
        <p>
          The 417 Freelancers directory is currently free for all listed freelancers. We
          reserve the right to introduce paid tiers, featured listing options, or other
          monetized features in the future.
        </p>
        <p>
          If we introduce any requirement for payment to maintain a listing, we will notify
          currently listed freelancers in advance. We are committed to considering free-tier
          options when any paid model is introduced.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "8. Changes to Terms",
    body: (
      <>
        <p>
          We reserve the right to update these Terms of Service at any time. Changes will be
          posted on this page with an updated date. Your continued use of the site after any
          changes constitutes your acceptance of the updated terms.
        </p>
        <p>
          We encourage you to review this page periodically to stay informed of any updates.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    heading: "9. Contact",
    body: (
      <>
        <p>
          If you have questions about these Terms of Service, please contact us at{" "}
          <a
            href="mailto:hello@417freelancers.com"
            className="hover:underline"
            style={{ color: "#C47A3A" }}
          >
            hello@417freelancers.com
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16" id="top">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2" style={{ color: "#2C2420" }}>
          Terms of Service
        </h1>
        <p className="text-sm" style={{ color: "#6B5E55" }}>Last updated: May 2026</p>
      </div>

      {/* Plain-English summary callout */}
      <div className="rounded-xl p-6 mb-12" style={{ backgroundColor: "#E8C99A" }}>
        <p className="text-sm font-semibold mb-1" style={{ color: "#7C4A1E" }}>
          The short version
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "#2C2420" }}>
          This directory is free to use and free to be listed in. We connect clients with local
          freelancers, but we are not involved in your agreements with each other. Freelancers are
          responsible for the accuracy of their own profiles, and clients are responsible for
          vetting who they hire. We reserve the right to update these terms or introduce paid
          features in the future, and we will give listed freelancers advance notice before
          anything changes.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-0">
        {sections.map((section, i) => (
          <div key={section.id} id={section.id}>
            {i > 0 && (
              <div className="my-8" style={{ borderTop: "1px solid #E8C99A" }} />
            )}
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "#2C2420" }}
            >
              {section.heading}
            </h2>
            <div
              className="space-y-4 text-base leading-relaxed"
              style={{ color: "#6B5E55" }}
            >
              {section.body}
            </div>
          </div>
        ))}
      </div>

      {/* Back to top */}
      <div className="mt-12 pt-8" style={{ borderTop: "1px solid #E8C99A" }}>
        <a
          href="#top"
          className="text-sm font-medium hover:underline"
          style={{ color: "#C47A3A" }}
        >
          Back to top
        </a>
      </div>
    </div>
  );
}
