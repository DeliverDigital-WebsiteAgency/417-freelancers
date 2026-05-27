export interface PostSEO {
  title?: string | null;
  metaDesc?: string | null;
  opengraphImage?: { sourceUrl: string } | null;
}

export interface PostCategory {
  name: string;
  slug: string;
}

export interface PostAuthor {
  name: string;
}

export interface PostListItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt?: string | null;
  featuredImage?: {
    node: { sourceUrl: string; altText: string };
  } | null;
  categories?: {
    nodes: PostCategory[];
  } | null;
  author?: {
    node: PostAuthor;
  } | null;
}

export interface Post extends PostListItem {
  modified: string;
  content?: string | null;
  seo?: PostSEO | null;
}

export interface PostsQueryResult {
  posts: {
    nodes: PostListItem[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

export interface PostQueryResult {
  post: Post | null;
}

export interface AllPostSlugsResult {
  posts: {
    nodes: { slug: string }[];
  };
}
