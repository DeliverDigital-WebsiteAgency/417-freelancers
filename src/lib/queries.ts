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
    categories {
      nodes {
        name
        slug
      }
    }
    freelancerFields {
      tagline
      skill1
      skill2
      skill3
      rate
    }
  }
`;

// ---------------------------------------------------------------------------
// Directory listing
// ---------------------------------------------------------------------------

export const GET_FREELANCERS = /* GraphQL */ `
  ${FREELANCER_CARD_FIELDS}
  query GetFreelancers($first: Int = 24, $after: String, $category: String) {
    freelancers(
      first: $first
      after: $after
      where: { categoryName: $category, status: PUBLISH }
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
      categories {
        nodes {
          name
          slug
        }
      }
      freelancerFields {
        tagline
        bio
        skill1
        skill2
        skill3
        website
        rate
        portfolioLink
        profileImage {
          sourceUrl
          altText
        }
        socialLinks {
          linkedin
          github
          twitter
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
