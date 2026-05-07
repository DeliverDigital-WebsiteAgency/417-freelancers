export interface FreelancerSEO {
  title: string;
  metaDesc: string;
  opengraphImage?: { sourceUrl: string } | null;
}

export interface FreelancerFields {
  tagline?: string | null;
  bio?: string | null;
  skill1?: string | null;
  skill2?: string | null;
  skill3?: string | null;
  website?: string | null;
  rate?: string | null;
  portfolioLink?: string | null;
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
  freelancerFields?: Pick<FreelancerFields, "tagline" | "skill1" | "skill2" | "skill3" | "rate"> | null;
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

export function getSkills(fields: Pick<FreelancerFields, "skill1" | "skill2" | "skill3"> | null | undefined): string[] {
  return [fields?.skill1, fields?.skill2, fields?.skill3].filter((s): s is string => Boolean(s?.trim()));
}
