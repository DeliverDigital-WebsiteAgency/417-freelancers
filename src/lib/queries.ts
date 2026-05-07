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
      location
      rate
      availability
      skills
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
        location
        email
        phone
        website
        skills
        rate
        availability
        profileImage {
          sourceUrl
          altText
        }
        socialLinks {
          linkedin
          github
          twitter
        }
        portfolioItems {
          title
          description
          url
          image {
            sourceUrl
            altText
          }
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
