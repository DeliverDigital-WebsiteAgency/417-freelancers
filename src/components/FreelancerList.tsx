"use client";

import { useState, useTransition } from "react";
import { FreelancerCard } from "@/components/FreelancerCard";
import { loadMoreFreelancers } from "@/app/directory/actions";
import type { FreelancerListItem } from "@/types/freelancer";

interface FreelancerListProps {
  initial: FreelancerListItem[];
  initialHasNextPage: boolean;
  initialCursor: string | null;
  category?: string;
}

export function FreelancerList({ initial, initialHasNextPage, initialCursor, category }: FreelancerListProps) {
  const [freelancers, setFreelancers] = useState(initial);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [cursor, setCursor] = useState(initialCursor);
  const [isPending, startTransition] = useTransition();

  function handleLoadMore() {
    if (!cursor) return;
    startTransition(async () => {
      const result = await loadMoreFreelancers(cursor, category);
      setFreelancers((prev) => [...prev, ...result.freelancers]);
      setHasNextPage(result.hasNextPage);
      setCursor(result.endCursor);
    });
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {freelancers.map((f) => (
          <FreelancerCard key={f.id} freelancer={f} />
        ))}
      </div>
      {hasNextPage && (
        <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            disabled={isPending}
            className="px-8 py-3 text-sm font-medium rounded-md btn-primary"
          >
            {isPending ? "Loading..." : "Load More Freelancers"}
          </button>
        </div>
      )}
    </>
  );
}
