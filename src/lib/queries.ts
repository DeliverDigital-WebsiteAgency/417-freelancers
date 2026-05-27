// ---------------------------------------------------------------------------
// Fragments
// ---------------------------------------------------------------------------

const FREELANCER_CARD_FIELDS = /* GraphQL */ `
  fragment FreelancerCardFields on Freelancer {
    id
    slug
    title
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    freelancerFields: freelancerFieldGroups {
      ... on FreelancerFieldGroups {
        tagline
        skill1
        skill2
        skill3
        profile_image {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Directory listing
// ---------------------------------------------------------------------------

export const GET_FREELANCERS = /* GraphQL */ `
  ${FREELANCER_CARD_FIELDS}
  query GetFreelancers($first: Int = 24, $after: String) {
    freelancers(
      first: $first
      after: $after
      where: { status: PUBLISH }
    ) {
      nodes {
        ...FreelancerCardFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_FREELANCERS_BY_CATEGORY = /* GraphQL */ `
  ${FREELANCER_CARD_FIELDS}
  query GetFreelancersByCategory($first: Int = 24, $after: String, $category: ID!) {
    freelancerCategory(id: $category, idType: SLUG) {
      freelancers(first: $first, after: $after, where: { status: PUBLISH }) {
        nodes {
          ...FreelancerCardFields
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Single freelancer profile
// ---------------------------------------------------------------------------

export const GET_FREELANCER = /* GraphQL */ `
  query GetFreelancer($slug: ID!) {
    freelancer(id: $slug, idType: SLUG) {
      id
      databaseId
      slug
      title
      date
      modified
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      freelancerFields: freelancerFieldGroups {
        ... on FreelancerFieldGroups {
          tagline
          bio
          location
          email
          phone
          website
          skill1
          skill2
          skill3
          profile_image {
            node {
              sourceUrl
              altText
            }
          }
          portfolio_link
        }
      }
      seo {
        title
        metaDesc
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// All slugs for static generation
// ---------------------------------------------------------------------------

export const GET_ALL_FREELANCER_SLUGS = /* GraphQL */ `
  query GetAllFreelancerSlugs {
    freelancers(first: 1000, where: { status: PUBLISH }) {
      nodes {
        slug
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Blog posts — listing
// ---------------------------------------------------------------------------

export const GET_POSTS = /* GraphQL */ `
  query GetPosts($first: Int = 12, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH }) {
      nodes {
        id
        slug
        title
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Blog posts — single post
// ---------------------------------------------------------------------------

export const GET_POST = /* GraphQL */ `
  query GetPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      date
      modified
      content
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          name
        }
      }
      seo {
        title
        metaDesc
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Blog posts — all slugs for static generation
// ---------------------------------------------------------------------------

export const GET_ALL_POST_SLUGS = /* GraphQL */ `
  query GetAllPostSlugs {
    posts(first: 1000, where: { status: PUBLISH }) {
      nodes {
        slug
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Site settings / SEO
// ---------------------------------------------------------------------------

export const GET_SITE_SETTINGS = /* GraphQL */ `
  query GetSiteSettings {
    generalSettings {
      title
      description
      url
    }
  }
`;
