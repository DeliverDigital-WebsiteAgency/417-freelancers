import { GraphQLClient } from "graphql-request";

const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT!;

export const wpClient = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
  },
  cache: "no-store",
});

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  return wpClient.request<T>(query, variables);
}
