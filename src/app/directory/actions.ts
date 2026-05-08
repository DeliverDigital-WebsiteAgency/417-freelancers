"use server";

import { getFreelancers } from "@/lib/api";

export async function loadMoreFreelancers(after: string, category?: string) {
  return getFreelancers({ first: 24, after, category });
}
