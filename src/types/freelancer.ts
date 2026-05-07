export interface FreelancerSEO {
  title: string;
  metaDesc: string;
  opengraphImage?: { sourceUrl: string } | null;
}

export interface FreelancerPortfolioItem {
  title: string;
  description: string;
  url?: string | null;
  image?: { sourceUrl: string; altText: string } | null;
}

export interface FreelancerFields {
  tagline?: string | null;
  bio?: string | null;
  location?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  skills?: string[] | null;
  rate?: string | null;
  availability?: "available" | "busy" | "unavailable" | null;
  portfolioItems?: FreelancerPortfolioItem[] | null;
  profileImage?: { sourceUrl: string; altText: string } | null;
  socialLinks?: {
    linkedin?: string | null;
    github?: string | null;
    twitter?: string | null;
  } | null;
}

export interface Freelancer {
  id: string;
  databaseId: number;
  slug: string;
  title: string;
  date: string;
  modified: string;
  featuredImage?: {
    node: { sourceUrl: string; altText: string };
  } | null;
  freelancerFields?: FreelancerFields | null;
  seo?: FreelancerSEO | null;
  categories?: {
    nodes: { name: string; slug: string }[];
  } | null;
}

export interface FreelancerListItem {
  id: string;
  slug: string;
  title: string;
  featuredImage?: {
    node: { sourceUrl: string; altText: string };
  } | null;
  freelancerFields?: Pick<
    FreelancerFields,
    "tagline" | "location" | "skills" | "rate" | "availability"
  > | null;
  categories?: {
    nodes: { name: string; slug: string }[];
  } | null;
}

export interface FreelancersQueryResult {
  freelancers: {
    nodes: FreelancerListItem[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

export interface FreelancerQueryResult {
  freelancer: Freelancer;
}

export interface AllFreelancerSlugsResult {
  freelancers: {
    nodes: { slug: string }[];
  };
}
