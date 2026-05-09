import { fetchGraphQL } from "./wordpress";
import {
  GET_FREELANCERS,
  GET_FREELANCERS_BY_CATEGORY,
  GET_FREELANCER,
  GET_ALL_FREELANCER_SLUGS,
} from "./queries";
import type {
  FreelancersQueryResult,
  FreelancersByCategoryResult,
  FreelancerQueryResult,
  AllFreelancerSlugsResult,
  FreelancerListItem,
  Freelancer,
} from "@/types/freelancer";

export async function getFreelancers(opts?: {
  first?: number;
  after?: string;
  category?: string;
}): Promise<{ freelancers: FreelancerListItem[]; hasNextPage: boolean; endCursor: string | null }> {
  const category = opts?.category;
  const vars = { first: opts?.first ?? 24, after: opts?.after ?? null };

  if (category) {
    const data = await fetchGraphQL<FreelancersByCategoryResult>(
      GET_FREELANCERS_BY_CATEGORY,
      { ...vars, category }
    );
    const connection = data.freelancerCategory?.freelancers;
    return {
      freelancers: connection?.nodes ?? [],
      hasNextPage: connection?.pageInfo.hasNextPage ?? false,
      endCursor: connection?.pageInfo.endCursor ?? null,
    };
  }

  const data = await fetchGraphQL<FreelancersQueryResult>(GET_FREELANCERS, vars);
  return {
    freelancers: data.freelancers.nodes,
    hasNextPage: data.freelancers.pageInfo.hasNextPage,
    endCursor: data.freelancers.pageInfo.endCursor,
  };
}

export async function getFreelancer(slug: string): Promise<Freelancer | null> {
  try {
    const data = await fetchGraphQL<FreelancerQueryResult>(GET_FREELANCER, { slug });
    return data.freelancer ?? null;
  } catch {
    return null;
  }
}

export async function getAllFreelancerSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<AllFreelancerSlugsResult>(GET_ALL_FREELANCER_SLUGS);
  return data.freelancers.nodes.map((n) => n.slug);
}
