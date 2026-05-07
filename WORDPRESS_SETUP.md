# WordPress Headless CMS Setup — cms.417freelancers.com

## Required WordPress Plugins

Install and activate these plugins on your WordPress instance at cms.417freelancers.com:

| Plugin | Purpose |
|--------|---------|
| [WPGraphQL](https://www.wpgraphql.com/) | GraphQL API layer |
| [WPGraphQL for Advanced Custom Fields](https://www.wpgraphql.com/acf) | Expose ACF fields in GraphQL |
| [Advanced Custom Fields PRO](https://www.advancedcustomfields.com/) | Custom freelancer fields |
| [Custom Post Type UI](https://wordpress.org/plugins/custom-post-type-ui/) | `freelancer` CPT |
| [WP Webhooks](https://wordpress.org/plugins/wp-webhooks/) | Trigger Vercel ISR revalidation |
| [Yoast SEO](https://yoast.com/wordpress/plugins/seo/) | SEO fields (optional) |
| [WPGraphQL Yoast SEO Addon](https://github.com/ashhitch/wp-graphql-yoast-seo) | Expose Yoast SEO via GraphQL |

---

## 1. Custom Post Type: `freelancer`

In **Custom Post Type UI**, create a post type with these settings:

- **Post Type Slug**: `freelancer`
- **Plural Label**: Freelancers
- **Singular Label**: Freelancer
- **Show in GraphQL**: ✅ Yes
- **GraphQL Single Name**: `freelancer`
- **GraphQL Plural Name**: `freelancers`
- **Supports**: title, editor, thumbnail, custom-fields
- **Has Archive**: Yes → slug: `directory`

---

## 2. ACF Field Group: Freelancer Details

Create a field group named **Freelancer Details**, assigned to post type `freelancer`.

Mark each field **Show in GraphQL: Yes**.

| Field Name (slug) | Type | Notes |
|---|---|---|
| `tagline` | Text | One-line description |
| `bio` | WYSIWYG | Full bio / about section |
| `location` | Text | e.g. "Springfield, MO" |
| `email` | Email | Contact email |
| `phone` | Text | Phone number |
| `website` | URL | Personal/business website |
| `skills` | Repeater → Text `skill` | List of skills |
| `rate` | Text | e.g. "$75/hr" or "Project-based" |
| `availability` | Select | Choices: available, busy, unavailable |
| `profile_image` | Image | Headshot (returns URL) |
| `social_links` | Group | Contains linkedin, github, twitter (URL fields) |
| `portfolio_items` | Repeater | Sub-fields below |

**portfolio_items sub-fields:**

| Field | Type |
|---|---|
| `title` | Text |
| `description` | Textarea |
| `url` | URL |
| `image` | Image |

---

## 3. WordPress GraphQL Settings

Go to **GraphQL > Settings** and enable:

- ✅ Enable Public Introspection
- ✅ Enable GraphQL Debug Mode (disable in production)
- Set **GraphQL Endpoint** to `/graphql`

Enable CORS for your Vercel domain:
- Add `https://417freelancers.com` and `https://*.vercel.app` to allowed origins.

---

## 4. Vercel Revalidation Webhook

On every freelancer post save/publish, WordPress should POST to your Next.js revalidation endpoint.

In **WP Webhooks > Send Data**, create a trigger:

- **Trigger**: Post Updated / Post Published
- **URL**: `https://417freelancers.com/api/revalidate`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body** (custom template):
  ```json
  {
    "secret": "YOUR_REVALIDATION_SECRET",
    "postType": "freelancer",
    "slug": "{post_name}"
  }
  ```

Set `YOUR_REVALIDATION_SECRET` to match `REVALIDATION_SECRET` in your Vercel env vars.

---

## 5. Vercel Environment Variables

Add these in **Vercel > Project > Settings > Environment Variables**:

```
NEXT_PUBLIC_WORDPRESS_URL        = https://cms.417freelancers.com
WORDPRESS_GRAPHQL_ENDPOINT       = https://cms.417freelancers.com/graphql
NEXT_PUBLIC_SITE_URL             = https://417freelancers.com
NEXT_PUBLIC_SITE_NAME            = 417 Freelancers
REVALIDATION_SECRET              = (generate a random secret)
CONTACT_EMAIL                    = koleman@deliverdigital.net
RESEND_API_KEY                   = (from resend.com — free tier works)
```

---

## 6. WordPress Permalink Settings

Go to **Settings > Permalinks** and set to **Post name** (`/%postname%/`). Save.

---

## 7. DNS / Hosting

- Point `cms.417freelancers.com` to your WordPress host (A or CNAME record).
- Point `417freelancers.com` to Vercel (add domain in Vercel project settings).
- Enable SSL on both domains.

---

## Testing the GraphQL Connection

Once the plugin is installed, test at:
```
https://cms.417freelancers.com/graphql
```

Run this query in the GraphQL IDE (WPGraphQL > GraphQL IDE):
```graphql
query {
  freelancers(first: 5) {
    nodes {
      id
      slug
      title
      freelancerFields {
        tagline
        location
        availability
      }
    }
  }
}
```
