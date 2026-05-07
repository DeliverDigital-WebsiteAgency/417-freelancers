# 417 Freelancers - Project Rules

## Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Saddle Brown | `#7C4A1E` | Primary brand, nav, primary buttons, logo |
| Warm Amber | `#C47A3A` | CTAs, hover states, links, icon accents |
| Soft Sand | `#E8C99A` | Tags, badges, category chips, borders, section accents |
| Cream White | `#F5EFE6` | Page background, light section backgrounds |
| Deep Espresso | `#2C2420` | Headlines, footer background |
| Warm Slate | `#6B5E55` | Body text, muted UI, secondary text |

Button hover backgrounds: Saddle Brown darkens to `#70431B`, Warm Amber darkens to `#B06E34`.

## Content Rules (apply to all code, copy, and generated content)

- **No emojis** anywhere in the codebase, components, pages, or content. Zero exceptions.
- **Icons only from Lucide React** (`lucide-react` package). No other icon libraries.
- **No em dashes** (`—`) in any copy, comments, or content. Use a comma, colon, or rewrite the sentence.
- **No purple, violet, indigo, or blue** brand colors. Use only the palette above.
- **Page background is always `#F5EFE6`** (Cream White) unless inside a designated dark section (footer, hero).

## Typography

- Font: **Inter** loaded via `next/font/google` with variable `--font-inter`
- Apply via `font-sans` utility (mapped to `--font-inter` in `@theme`)
- Maintain existing font sizes and weights

## Buttons

- **Primary**: `#7C4A1E` background, `#F5EFE6` text, `border-radius: 6px` (`rounded-md`)
- **CTA / Secondary**: `#C47A3A` background, white text, `rounded-md`
- **Outline**: `#7C4A1E` border and text, transparent background, `rounded-md`
- All button hover states darken background by ~10%

## Architecture

- Next.js 16 App Router, TypeScript, Tailwind v4
- WordPress headless CMS at `cms.417freelancers.com` via WPGraphQL
- GraphQL client: `graphql-request` in `src/lib/wordpress.ts`
- All data queries in `src/lib/queries.ts`, typed fetchers in `src/lib/api.ts`
- ISR with 1-hour revalidation; on-demand revalidation via `/api/revalidate`
- Contact form routes to Resend or WP webhook via `/api/contact`
- See `WORDPRESS_SETUP.md` for full CMS plugin and ACF field configuration
