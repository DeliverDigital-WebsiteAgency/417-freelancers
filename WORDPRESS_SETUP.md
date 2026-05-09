# WordPress Headless CMS Setup - cms.417freelancers.com

## Required Plugins

Install and activate these on your WordPress instance.

| Plugin | Purpose |
|--------|---------|
| [WPGraphQL](https://wordpress.org/plugins/wp-graphql/) | GraphQL API layer |
| [WPGraphQL for ACF](https://wordpress.org/plugins/wpgraphql-acf/) | Expose ACF fields in GraphQL |
| [Advanced Custom Fields Pro](https://www.advancedcustomfields.com/pro/) | Custom post types, taxonomies, and fields |
| [WP Webhooks](https://wordpress.org/plugins/wp-webhooks/) | Trigger Vercel ISR revalidation on save |

---

## 1. Custom Post Type: `freelancer`

In **ACF > Post Types > Add New**, create:

| Setting | Value |
|---------|-------|
| Post Type Slug | `freelancer` |
| Plural Label | Freelancers |
| Singular Label | Freelancer |
| Show in GraphQL | Yes |
| GraphQL Single Name | `freelancer` |
| GraphQL Plural Name | `freelancers` |
| Supports | Title, Editor, Thumbnail |
| Has Archive | Yes, slug: `directory` |

---

## 2. Custom Taxonomy: `freelancer_category`

In **ACF > Taxonomies > Add New**, create:

| Setting | Value |
|---------|-------|
| Taxonomy Slug | `freelancer_category` |
| Plural Label | Freelancer Categories |
| Singular Label | Freelancer Category |
| Show in GraphQL | Yes |
| GraphQL Single Name | `freelancerCategory` |
| GraphQL Plural Name | `freelancerCategories` |
| Attach to Post Type | `freelancer` |

Then go to **Freelancer Categories > Add New** and create these terms. The slugs must match exactly:

| Name | Slug |
|------|------|
| Web Development | `web-development` |
| Design | `design` |
| Marketing | `marketing` |
| Copywriting | `copywriting` |
| Photography | `photography` |
| Video | `video` |

When editing a freelancer, assign one (or more) of these categories. The directory filter buttons on the frontend will then work correctly.

---

## 3. ACF Field Group: Freelancer Details

In **ACF > Field Groups > Add New**, create a group named **Freelancer Details** assigned to post type `freelancer`.

Every field must have **Show in GraphQL** set to Yes.

### Fields to create

| Field Label | Field Name (slug) | Field Type | Notes |
|-------------|-------------------|------------|-------|
| Tagline | `tagline` | Text | One-line summary shown on cards |
| Bio | `bio` | WYSIWYG | Full about section |
| Skill 1 | `skill_1` | Text | First skill tag |
| Skill 2 | `skill_2` | Text | Second skill tag |
| Skill 3 | `skill_3` | Text | Third skill tag |
| Rate | `rate` | Text | e.g. "$75/hr" or "Project-based" |
| Website | `website` | URL | Personal or business site |
| Portfolio Link | `portfolio_link` | URL | Behance, Dribbble, custom portfolio, etc. |
| Profile Image | `profile_image` | Image | Headshot |
| Social Links | `social_links` | Group | Container for social URLs |

Inside the **Social Links** group, add:

| Field Label | Field Name | Field Type |
|-------------|-----------|------------|
| LinkedIn | `linkedin` | URL |
| GitHub | `github` | URL |
| Twitter / X | `twitter` | URL |

The Group field type is available in ACF free (version 5+).

### ACF field name to GraphQL field name

WPGraphQL converts snake_case field names to camelCase:

| ACF name | GraphQL name |
|----------|-------------|
| `skill_1` | `skill1` |
| `skill_2` | `skill2` |
| `skill_3` | `skill3` |
| `portfolio_link` | `portfolioLink` |
| `profile_image` | `profileImage` |
| `social_links` | `socialLinks` |

---

## 3. WPGraphQL Settings

Go to **GraphQL > Settings**:

- Enable Public Introspection
- Set GraphQL endpoint to `/graphql`
- Add CORS allowed origins: `https://417freelancers.com` and `https://*.vercel.app`

---

## 4. Vercel Revalidation Webhook (optional but recommended)

Without this, updated freelancer profiles appear within 90 seconds automatically. With this webhook, changes appear instantly on save.

In **WP Webhooks > Send Data**, create a trigger:

- Trigger: Post Updated + Post Published
- URL: `https://417freelancers.com/api/revalidate`
- Method: POST
- Content-Type: `application/json`
- Body:

```json
{
  "secret": "YOUR_REVALIDATION_SECRET",
  "postType": "freelancer",
  "slug": "{post_name}"
}
```

---

## 5. Vercel Environment Variables

In **Vercel > Project > Settings > Environment Variables**:

```
NEXT_PUBLIC_WORDPRESS_URL        = https://cms.417freelancers.com
WORDPRESS_GRAPHQL_ENDPOINT       = https://cms.417freelancers.com/graphql
NEXT_PUBLIC_SITE_URL             = https://417freelancers.com
NEXT_PUBLIC_SITE_NAME            = 417 Freelancers
REVALIDATION_SECRET              = (random string, match what you put in the WP webhook)
CONTACT_EMAIL                    = koleman@deliverdigital.net
SENDGRID_API_KEY                 = (from sendgrid.com, Settings > API Keys)
```

---

## 6. WordPress Permalink Settings

Go to **Settings > Permalinks**, select **Post name** (`/%postname%/`), and save.

---

## 7. DNS

- `cms.417freelancers.com`: point to your WordPress host (A or CNAME record)
- `417freelancers.com`: add as a custom domain in Vercel project settings
- Enable SSL on both

---

## Adding and editing freelancers

1. Go to **WordPress Admin > Freelancers > Add New**
2. Set the **Title** to the freelancer's full name
3. Fill in the **Freelancer Details** ACF fields
4. Set a **Featured Image** (used as profile photo fallback)
5. Assign a **Category** (Web Development, Design, Marketing, etc.)
6. Publish

Changes appear within 90 seconds, or instantly if the webhook is configured.

---

## Testing the GraphQL connection

Once WPGraphQL is active, go to **GraphQL > GraphiQL IDE** and run:

```graphql
query {
  freelancers(first: 5) {
    nodes {
      id
      slug
      title
      freelancerFields {
        tagline
        skill1
        skill2
        skill3
        rate
        portfolioLink
      }
    }
  }
}
```

If you get results back, the connection is working. Add your env vars to Vercel and redeploy.
