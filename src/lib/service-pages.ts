export interface ServiceHighlight {
  heading: string;
  body: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServicePage {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subheadline: string;
  intro: string;
  body: string[];
  highlights: ServiceHighlight[];
  faqs: ServiceFaq[];
  directoryCategory: string;
  directoryLabel: string;
}

export const servicePages: ServicePage[] = [
  {
    slug: "web-developers",
    metaTitle: "Web Developers in Springfield, MO | 417 Freelancers",
    metaDescription: "Find vetted freelance web developers in Springfield, MO and the 417 area. Local developers specializing in websites, e-commerce, apps, and CMS.",
    h1: "Web Developers in Springfield, MO",
    subheadline: "Find a local web developer who knows your market.",
    intro: "Whether you need a new business website, an e-commerce store, a web application, or a CMS your team can actually manage, Springfield has experienced freelance web developers ready to help. The 417 Freelancers directory connects you with vetted local professionals so you can hire with confidence.",
    body: [
      "Hiring a local web developer means you get someone who understands the Springfield market, can meet in person, and is invested in the community you both operate in. Rather than hiring through a national platform and hoping for the best, 417 Freelancers gives you access to developers your neighbors have already worked with.",
      "Springfield-area developers on our platform work across a wide range of technologies and platforms, including WordPress, Shopify, React, Next.js, and custom builds. Whether your project is a simple brochure site or a complex web application, you will find the right skill set here.",
    ],
    highlights: [
      { heading: "Check their portfolio", body: "A good developer's past work tells you more than any resume. Look for projects similar in scope and industry to yours." },
      { heading: "Ask about your platform", body: "If you need a WordPress site, make sure they have WordPress experience. If you need Shopify, look for e-commerce specialists." },
      { heading: "Clarify ownership", body: "Before the project begins, confirm you will own the final code and assets outright." },
      { heading: "Discuss maintenance", body: "Websites need ongoing updates. Ask whether the developer offers support after launch, and what that costs." },
    ],
    faqs: [
      {
        question: "How much does a freelance web developer cost in Springfield, MO?",
        answer: "Rates vary depending on project scope and the developer's experience. Most Springfield freelance developers charge between $50 and $150 per hour, or offer project-based pricing. A simple business website typically runs $1,500 to $5,000. More complex builds with custom functionality or e-commerce can range from $5,000 to $20,000 or more.",
      },
      {
        question: "How long does it take to build a website?",
        answer: "A straightforward business website typically takes 3 to 6 weeks from kickoff to launch. E-commerce sites or custom web applications can take 2 to 4 months depending on complexity. Timelines depend largely on how quickly feedback and content are provided by the client.",
      },
      {
        question: "Should I hire a freelancer or an agency?",
        answer: "For most small to mid-sized businesses, a skilled freelancer offers better value than an agency for website projects. Freelancers have lower overhead, are more flexible, and you work directly with the person doing the work. Agencies make more sense for very large or ongoing multi-discipline projects.",
      },
      {
        question: "What should I prepare before hiring a web developer?",
        answer: "Come with a clear idea of what the site needs to do, who your audience is, and examples of sites you like. Having your branding ready (logo, colors, fonts) speeds things up. A content outline or draft copy saves time and money on the development side.",
      },
    ],
    directoryCategory: "web-development",
    directoryLabel: "Browse Web Developers",
  },
  {
    slug: "graphic-designers",
    metaTitle: "Graphic Designers in Springfield, MO | 417 Freelancers",
    metaDescription: "Find vetted freelance graphic designers in Springfield, MO and the 417 area. Local designers for branding, logos, print, and digital design.",
    h1: "Graphic Designers in Springfield, MO",
    subheadline: "Local designers who understand your brand and your market.",
    intro: "Strong design is one of the most visible investments a business can make. From a logo that lasts a decade to marketing materials that convert, the right graphic designer shapes how the world sees your business. 417 Freelancers connects you with vetted local designers in Springfield and the 417 area.",
    body: [
      "Working with a local graphic designer means real conversations, faster revisions, and a collaborator who can attend events, visit your storefront, and understand your customer. The designers in our directory have worked with Springfield businesses across retail, food and beverage, real estate, nonprofits, health care, and more.",
      "Whether you need a brand identity from scratch, a redesign of aging materials, signage, social media graphics, or packaging design, the 417 area has talented designers ready to take on your project.",
    ],
    highlights: [
      { heading: "Review their style range", body: "Some designers have a distinct aesthetic. Make sure their portfolio includes work that fits the direction you want for your brand." },
      { heading: "Discuss file deliverables", body: "You should receive final files in formats you can actually use, including vector files for your logo and print-ready PDFs for any printed materials." },
      { heading: "Clarify revision rounds", body: "Most designers include a set number of revision rounds in their pricing. Agree on this upfront to avoid unexpected costs." },
      { heading: "Think beyond the logo", body: "The best designers think about your full brand system: colors, typography, and how your identity works across every touchpoint, not just the logo." },
    ],
    faqs: [
      {
        question: "How much does a freelance graphic designer cost in Springfield, MO?",
        answer: "Freelance designer rates in the 417 area typically run $40 to $120 per hour. Logo and brand identity packages generally range from $500 to $3,000 depending on scope. Print collateral, social templates, and ongoing design retainers are often priced separately.",
      },
      {
        question: "What is the difference between a logo and a brand identity?",
        answer: "A logo is a single mark. A brand identity is the full system: logo, color palette, typography, and usage guidelines that keep your business looking consistent across every application. For a new business, investing in a brand identity upfront saves money and rework later.",
      },
      {
        question: "Do I own the designs after the project is complete?",
        answer: "You should. Confirm before the project starts that the designer will transfer all rights and provide source files upon final payment. Most professional designers do this as standard practice.",
      },
      {
        question: "How long does a brand design project take?",
        answer: "A logo and basic brand identity project typically takes 3 to 6 weeks. More complex brand systems with guidelines, templates, and multiple applications take 6 to 12 weeks. Print-only projects like a brochure or flyer can often be completed in 1 to 2 weeks.",
      },
    ],
    directoryCategory: "design",
    directoryLabel: "Browse Designers",
  },
  {
    slug: "photographers",
    metaTitle: "Photographers in Springfield, MO | 417 Freelancers",
    metaDescription: "Find vetted freelance photographers in Springfield, MO and the 417 area. Local photographers for headshots, commercial, events, and product photography.",
    h1: "Photographers in Springfield, MO",
    subheadline: "Professional photographers who know the 417.",
    intro: "Great photography makes every part of your business look better: your website, your social media, your team page, your product listings. 417 Freelancers connects you with vetted local photographers in Springfield and across the 417 area, covering commercial and product work, headshots, events, and real estate.",
    body: [
      "Springfield has a vibrant community of professional photographers who work with local businesses every day. Hiring locally means no travel fees, faster turnaround, and a photographer who can scout locations with you in person.",
      "Whether you need updated headshots for your leadership team, product photography for an e-commerce launch, event coverage for a company function, or brand photography for a website redesign, you will find the right fit in the 417 Freelancers directory.",
    ],
    highlights: [
      { heading: "Match style to your brand", body: "Photography has a look. Review a photographer's portfolio and make sure their style aligns with how you want your business to be perceived." },
      { heading: "Ask about usage rights", body: "Commercial photography licenses vary. Confirm that your usage rights cover all the channels you plan to publish on, including print, web, and social." },
      { heading: "Discuss deliverables upfront", body: "Clarify how many edited images you will receive, the file formats, and the turnaround time for the final gallery." },
      { heading: "Location and logistics", body: "Discuss whether the shoot will be at your location, a studio, or an outdoor setting. Some photographers have studio access; others shoot on location only." },
    ],
    faqs: [
      {
        question: "How much does a freelance photographer cost in Springfield, MO?",
        answer: "Rates depend on the type of work and the photographer's experience. Headshot sessions typically run $150 to $400 per person. Commercial and brand photography day rates are usually $500 to $1,500. Event photography is often priced by the hour, running $100 to $250. Product photography is frequently priced per image or per set.",
      },
      {
        question: "What is the difference between commercial and portrait photography?",
        answer: "Portrait photography focuses on people, including headshots and team photos. Commercial photography is used to promote a product, service, or brand, and may include product shots, lifestyle imagery, and editorial-style brand photography. Many photographers do both; some specialize in one.",
      },
      {
        question: "How long does it take to receive edited photos?",
        answer: "Turnaround varies by photographer and project. Headshot sessions are often delivered within 5 to 10 business days. Event coverage and larger commercial shoots may take 2 to 4 weeks. Always ask for a delivery timeline before booking.",
      },
      {
        question: "Do I need a photographer for my website?",
        answer: "Yes, if you can afford it. Stock photography is obvious and forgettable. Custom photography of your actual team, space, products, or work is one of the highest-return investments you can make for your website and marketing materials.",
      },
    ],
    directoryCategory: "photography",
    directoryLabel: "Browse Photographers",
  },
  {
    slug: "videographers",
    metaTitle: "Videographers in Springfield, MO | 417 Freelancers",
    metaDescription: "Find vetted freelance videographers in Springfield, MO and the 417 area. Local video production for commercials, social media, events, and brand content.",
    h1: "Videographers in Springfield, MO",
    subheadline: "Local video production talent for every kind of project.",
    intro: "Video is the highest-performing content format across every platform, from your website to social media to paid advertising. 417 Freelancers connects you with vetted freelance videographers in Springfield and the 417 area who produce professional video content for businesses of every size.",
    body: [
      "Springfield has a growing community of skilled video professionals who work with local businesses, nonprofits, and organizations on everything from short social content to full commercial productions. Hiring locally keeps communication easy and eliminates out-of-town travel costs.",
      "Whether you need a brand story video for your homepage, testimonial videos from your customers, event coverage, social media reels, or a regional TV commercial, you will find the right fit among the videographers listed in the 417 Freelancers directory.",
    ],
    highlights: [
      { heading: "Define deliverables upfront", body: "Know before the project starts how many finished videos you will receive, the aspect ratios needed (horizontal, vertical, square), and whether you need raw footage." },
      { heading: "Ask about the full process", body: "Good video production includes pre-production planning as well as shooting and editing. Understand exactly what is included in the quoted price." },
      { heading: "Review their editing style", body: "Editing style, pacing, and music choices vary significantly between videographers. Watch past work samples to make sure their style fits your brand." },
      { heading: "Clarify usage rights", body: "Confirm that you can use the finished videos on your website, social media, and in paid advertising without additional licensing fees." },
    ],
    faqs: [
      {
        question: "How much does freelance video production cost in Springfield, MO?",
        answer: "Short brand or social videos typically run $500 to $2,500 depending on complexity and length. Half-day and full-day production rates usually range from $500 to $1,500 per day. Event videography runs $100 to $300 per hour. More produced commercial work with scripting, crew, and multiple shoot days can range from $3,000 to $15,000 or more.",
      },
      {
        question: "How long does it take to produce a video?",
        answer: "A simple social media video or testimonial clip can be delivered in 1 to 2 weeks. A brand story or commercial production with pre-production, a shoot day, and full editing typically takes 3 to 6 weeks. More complex productions can take longer depending on scope.",
      },
      {
        question: "What is the difference between a freelance videographer and a production company?",
        answer: "A freelance videographer typically works alone or with a small crew and handles most aspects of production themselves. A production company has a larger team and more infrastructure. For most small to mid-sized business video projects, a skilled freelancer offers better value and a more direct working relationship.",
      },
      {
        question: "What should I prepare before a video shoot?",
        answer: "Know the purpose of the video and who it is for. Have a rough idea of the message or story you want to tell. If there will be on-camera talent, prepare them in advance. The more organized you are before the shoot, the more efficient the day will be.",
      },
    ],
    directoryCategory: "video",
    directoryLabel: "Browse Videographers",
  },
  {
    slug: "copywriters",
    metaTitle: "Copywriters in Springfield, MO | 417 Freelancers",
    metaDescription: "Find vetted freelance copywriters in Springfield, MO and the 417 area. Local writers for websites, blogs, email marketing, ads, and brand content.",
    h1: "Copywriters in Springfield, MO",
    subheadline: "Words that work, written by someone who knows your market.",
    intro: "Every piece of writing your business puts out, from your website to your email campaigns to your social posts, shapes how customers perceive you. A skilled copywriter makes your message clear, compelling, and consistent. 417 Freelancers connects you with vetted local writers in Springfield and the 417 area.",
    body: [
      "Good copywriting is not about sounding fancy. It is about saying the right thing to the right person at the right time. Local writers bring knowledge of the Springfield market, regional tone, and community context that generic content mills simply cannot replicate.",
      "The copywriters in our directory work across website copy, blog content, email sequences, product descriptions, ad copy, social media content, press releases, and more. Whether you need a full website rewrite or a steady stream of blog posts, you will find the right writer here.",
    ],
    highlights: [
      { heading: "Match writer to medium", body: "Website copy, long-form content, and ad copy each require different skills. Look for writers with samples in the specific format you need." },
      { heading: "Read their samples carefully", body: "Good copy is clear, specific, and audience-aware. If their samples are vague or generic, their work for you likely will be too." },
      { heading: "Discuss your audience first", body: "The best writers ask a lot of questions about your customers before writing a word. A writer who skips this step is not writing for your audience." },
      { heading: "Ask about SEO experience", body: "If your content needs to rank in search, make sure your writer understands keyword strategy and on-page SEO basics." },
    ],
    faqs: [
      {
        question: "How much does a freelance copywriter cost in Springfield, MO?",
        answer: "Freelance copywriter rates in the 417 area typically run $40 to $100 per hour, or are quoted per project. A full website (5 to 7 pages) usually runs $1,000 to $3,500. Blog posts are often priced at $100 to $400 per post depending on length and research required. Email sequences and ad copy are usually priced per piece or per project.",
      },
      {
        question: "What is the difference between a copywriter and a content writer?",
        answer: "Copywriting is persuasive writing designed to drive action, including websites, ads, sales emails, and landing pages. Content writing is informational writing meant to educate or engage, including blog posts, guides, and articles. Many writers do both; some specialize. Make sure the writer you hire has experience in the type of writing you need.",
      },
      {
        question: "Should I hire a writer or use AI for my content?",
        answer: "AI tools can help with drafts and outlines but produce generic output that lacks brand voice, real experience, and persuasive specificity. A skilled human writer brings strategic thinking, audience insight, and creative judgment that AI cannot match. For content that represents your brand publicly, a human writer is a worthwhile investment.",
      },
      {
        question: "How do I give good feedback on copywriting?",
        answer: "Specific feedback produces better results than general reactions. Instead of saying something does not feel right, explain what impression you want the piece to create and what is missing. Providing example copy you like as a reference helps writers understand your preferences quickly.",
      },
    ],
    directoryCategory: "copywriting",
    directoryLabel: "Browse Copywriters",
  },
  {
    slug: "digital-marketers",
    metaTitle: "Digital Marketing in Springfield, MO | 417 Freelancers",
    metaDescription: "Find vetted freelance digital marketers in Springfield, MO and the 417 area. Local SEO, social media, paid ads, and marketing strategy.",
    h1: "Digital Marketers in Springfield, MO",
    subheadline: "Grow your business with local marketing talent.",
    intro: "Digital marketing moves fast, and having the right strategy makes the difference between a business that grows and one that stalls. 417 Freelancers connects you with vetted freelance digital marketers in Springfield and the 417 area, covering SEO, paid advertising, social media, email marketing, and full-funnel strategy.",
    body: [
      "Local marketers understand the Springfield market in ways that out-of-town agencies simply do not. They know the local media landscape, the community events worth sponsoring, the platforms your specific audience actually uses, and the competitive dynamics of doing business in the 417.",
      "The digital marketers in our directory work with businesses across a wide range of industries and can engage at the level you need, whether that is a one-time audit and strategy, ongoing campaign management, or specialized help with a specific channel.",
    ],
    highlights: [
      { heading: "Be clear about your goals", body: "More traffic, more leads, more sales, and more brand awareness all require different strategies. Know what success looks like before you hire." },
      { heading: "Ask for case studies", body: "Results matter more than credentials. Ask for examples of past campaigns with real outcomes: traffic growth, lead volume, cost per acquisition." },
      { heading: "Understand what is included", body: "Marketing retainers vary widely in scope. Get a clear list in writing so you know exactly what is being managed and reported on." },
      { heading: "Discuss reporting cadence", body: "You should know how campaigns are performing and why decisions are being made. Ask how often you will receive reports and what metrics will be tracked." },
    ],
    faqs: [
      {
        question: "How much does a freelance digital marketer cost in Springfield, MO?",
        answer: "Rates depend on the channel and scope. SEO retainers typically run $500 to $2,500 per month. Paid advertising management (Google, Meta) is usually 10 to 20 percent of ad spend with a minimum monthly fee. Social media management runs $400 to $1,500 per month. Strategy and consulting work is often priced at $75 to $150 per hour.",
      },
      {
        question: "What is the difference between SEO and paid advertising?",
        answer: "SEO improves your organic search rankings over time. It is a longer-term investment that builds compounding value. Paid advertising generates traffic immediately but stops when you stop paying. Most businesses benefit from both: paid ads for immediate results while SEO builds long-term traffic.",
      },
      {
        question: "How long before I see results from digital marketing?",
        answer: "Paid advertising can generate results within days. SEO typically takes 3 to 6 months to show meaningful movement, and 6 to 12 months for significant results depending on competition. Social media grows steadily with consistency. Be cautious of anyone promising fast SEO results.",
      },
      {
        question: "Should I hire a marketing generalist or a specialist?",
        answer: "For most small businesses, a generalist who can manage your overall strategy and execution is a better fit than multiple specialists. As your business grows and your marketing budget increases, bringing in channel specialists for paid search, email, or content makes more sense.",
      },
    ],
    directoryCategory: "marketing",
    directoryLabel: "Browse Marketers",
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((p) => p.slug === slug);
}
