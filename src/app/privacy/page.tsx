import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://417freelancers.com";

export const metadata: Metadata = {
  title: "Privacy Policy | 417 Freelancers",
  description:
    "Read the Privacy Policy for 417 Freelancers, Springfield MO's free local freelancer directory. Learn how we collect, use, and protect your information.",
  alternates: { canonical: `${siteUrl}/privacy` },
};

const sections = [
  {
    id: "introduction",
    heading: "1. Introduction",
    body: (
      <>
        <p>
          This Privacy Policy explains how 417 Freelancers ("we," "us," or "our") collects,
          uses, and handles information when you visit 417freelancers.com. We take your privacy
          seriously and keep the data we collect to the minimum needed to operate the directory.
        </p>
        <p>
          By using this site, you agree to the practices described in this policy. If you do
          not agree, please do not use the site.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    heading: "2. Information We Collect",
    body: (
      <>
        <p>
          We collect information in two ways: information you give us directly, and information
          collected automatically when you visit the site.
        </p>
        <p>
          <strong style={{ color: "#2C2420" }}>Information you provide directly:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Contact form submissions: your name, email address, subject, and message. If you
            use a contact form on a freelancer profile, the name of the freelancer you are
            contacting is also noted.
          </li>
          <li>
            Freelancer applications: your name, email, phone number, location, bio, skills,
            website, portfolio link, headshot URL, hourly rate, social profile links, and how
            you heard about us.
          </li>
        </ul>
        <p>
          <strong style={{ color: "#2C2420" }}>Information collected automatically:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Basic server and access logs, including your IP address, browser type, and the
            pages you visit. These logs are used for security and performance monitoring and
            are not sold or shared with third parties.
          </li>
          <li>
            If we use a web analytics tool, it may collect anonymized data such as page views,
            session duration, and general geographic location (country or city level). No
            personally identifiable information is included in analytics data.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    heading: "3. How We Use Your Information",
    body: (
      <>
        <p>We use the information we collect for the following purposes:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            To respond to contact form submissions and direct your inquiry to the appropriate
            freelancer or to our team.
          </li>
          <li>
            To review freelancer applications and, if approved, to create and maintain your
            listing in the directory.
          </li>
          <li>
            To communicate with listed freelancers about updates to the directory, changes to
            these policies, or anything affecting their listing.
          </li>
          <li>
            To monitor and improve the performance, security, and reliability of the site.
          </li>
        </ul>
        <p>
          We do not use your information for advertising, and we do not sell your data to any
          third party.
        </p>
      </>
    ),
  },
  {
    id: "how-we-share",
    heading: "4. How We Share Your Information",
    body: (
      <>
        <p>
          We do not sell, rent, or trade your personal information. We may share information
          only in the following limited circumstances:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong style={{ color: "#2C2420" }}>Service providers:</strong> We use third-party
            tools to help operate the site, including email delivery services (such as
            SendGrid) to forward contact form submissions. These providers are given only the
            information necessary to perform their function and are not permitted to use it for
            other purposes.
          </li>
          <li>
            <strong style={{ color: "#2C2420" }}>Legal requirements:</strong> We may disclose
            information if required to do so by law or in response to a valid legal request.
          </li>
          <li>
            <strong style={{ color: "#2C2420" }}>Freelancer contact forms:</strong> When you
            submit a contact form on a freelancer profile, your name, email, and message are
            forwarded to that freelancer. By using the contact form, you consent to this
            forwarding.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "freelancer-profiles",
    heading: "5. Freelancer Profile Data",
    body: (
      <>
        <p>
          Information included in a freelancer's public profile, such as their name, tagline,
          bio, location, skills, website, portfolio link, and profile photo, is intentionally
          made public and may be indexed by search engines.
        </p>
        <p>
          If you are a listed freelancer and wish to update or remove your profile, please
          contact us at{" "}
          <a
            href="mailto:hello@417freelancers.com"
            className="hover:underline"
            style={{ color: "#C47A3A" }}
          >
            hello@417freelancers.com
          </a>
          . We will process your request promptly.
        </p>
        <p>
          Email addresses and phone numbers submitted as part of a freelancer application are
          used for internal communication only and are not publicly displayed on the site
          unless you choose to include them in your public profile.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "6. Cookies and Tracking",
    body: (
      <>
        <p>
          417 Freelancers uses minimal cookies. The site may set technical cookies required
          for basic functionality, such as security tokens or session identifiers. We do not
          use advertising cookies or cross-site tracking cookies.
        </p>
        <p>
          If we add analytics tools in the future, we will update this policy to reflect that.
          At this time, any analytics we use are configured to anonymize IP addresses and
          collect only aggregated, non-identifying data.
        </p>
        <p>
          You can disable cookies in your browser settings, though doing so may affect the
          functionality of certain features on the site.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    heading: "7. Data Retention",
    body: (
      <>
        <p>
          Contact form submissions are forwarded to our email inbox and retained for as long
          as needed to handle your inquiry. We do not store raw form submissions in a separate
          database.
        </p>
        <p>
          Freelancer application data is retained until we have reviewed your application and,
          if listed, for the duration of your listing. If your application is not approved or
          your listing is removed, we will delete your application data on request.
        </p>
        <p>
          Server access logs are typically retained for a short period for security purposes
          and then automatically deleted.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "8. Your Rights",
    body: (
      <>
        <p>You have the right to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Request access to the personal data we hold about you.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion of your data, subject to any legal obligations we may have.</li>
          <li>
            Opt out of any future marketing communications from us (we do not currently send
            marketing emails, but this may change with advance notice).
          </li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
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
  {
    id: "childrens-privacy",
    heading: "9. Children's Privacy",
    body: (
      <>
        <p>
          417 Freelancers is not intended for use by anyone under the age of 18. We do not
          knowingly collect personal information from minors. If you believe a minor has
          submitted information to us, please contact us and we will delete it promptly.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "10. Changes to This Policy",
    body: (
      <>
        <p>
          We may update this Privacy Policy from time to time. When we do, we will update the
          date at the top of this page. Your continued use of the site after any changes
          constitutes your acceptance of the updated policy.
        </p>
        <p>
          We encourage you to review this page periodically to stay informed of how we handle
          your data.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    heading: "11. Contact",
    body: (
      <>
        <p>
          If you have questions or concerns about this Privacy Policy or how your data is
          handled, please reach out to us at{" "}
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

export default function PrivacyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16" id="top">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2" style={{ color: "#2C2420" }}>
          Privacy Policy
        </h1>
        <p className="text-sm" style={{ color: "#6B5E55" }}>Last updated: May 2026</p>
      </div>

      {/* Plain-English summary callout */}
      <div className="rounded-xl p-6 mb-12" style={{ backgroundColor: "#E8C99A" }}>
        <p className="text-sm font-semibold mb-1" style={{ color: "#7C4A1E" }}>
          The short version
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "#2C2420" }}>
          We collect only what we need to run the directory: the information you submit through
          our forms and basic server logs. We do not sell your data, we do not run advertising,
          and we use third-party tools only to deliver your messages and keep the site running.
          If you are a listed freelancer and want to update or remove your profile, just email us.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-0">
        {sections.map((section, i) => (
          <div key={section.id} id={section.id}>
            {i > 0 && (
              <div className="my-8" style={{ borderTop: "1px solid #E8C99A" }} />
            )}
            <h2 className="text-xl font-semibold mb-4" style={{ color: "#2C2420" }}>
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
