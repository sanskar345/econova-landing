EcoNova Landing Page
This project is a Next.js application for the EcoNova product launch. It uses Contentful’s REST API to fetch content and Tailwind CSS for styling. The app supports English (en-US) and Spanish (es) locales, renders dynamic sections (hero, features, testimonials, CTA, footer), and follows headless CMS principles for flexibility and scalability.
Project Structure
econova-landing/
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   ├── components/             # Reusable React components
│   ├── lib/                    # Utility functions (e.g., Contentful client)
│   ├── types/                  # TypeScript type definitions
├── public/                     # Static assets
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── .env.local                  # Environment variables
├── README.md                   # This documentation
├── tsconfig.json               # TypeScript configuration

Setup Instructions
Install Dependencies

Clone the repository:
git clone <repo-url>
cd econova-landing


Install dependencies:
npm install


Install Tailwind CSS and related tools:
npm install -D tailwindcss@3.4.10 postcss@8.4.47 autoprefixer@10.4.20
npx tailwindcss init -p



Set Up Environment Variables

Create a .env.local file in the project root:
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
CONTENTFUL_PREVIEW_SECRET=your_secret


Replace placeholders with your Contentful credentials:

CONTENTFUL_SPACE_ID: Found in Contentful under Settings > General.
CONTENTFUL_ACCESS_TOKEN: Delivery API token from Settings > API Keys.
CONTENTFUL_PREVIEW_TOKEN: Preview API token for draft content.
CONTENTFUL_PREVIEW_SECRET: A custom secret for preview mode (set in Contentful webhooks).



Run Locally

Start development server:
npm run dev


Visit http://localhost:3000/en/econova or http://localhost:3000/es/econova.


Contentful Setup
Import Content Model

Export the content model as JSON:

In Contentful, run:npx contentful space export --space-id your_space_id --management-token your_management_token


Save the output as contentful-export.json.


Import the model into a new space:

Create a new Contentful space.
Run:npx contentful space import --space-id new_space_id --management-token your_management_token --content-file contentful-export.json





Manual Content Model Setup
If you prefer manual setup, create the following content types with their fields and relationships:

landingPageContent:

title: Short text, required, localized.
slug: Short text, required, unique.
language: Short text, optional.
sections: Array of Links to section entries, localized.


section:

type: Short text, required (values: hero, features, testimonials, cta, footer).
content: Link to heroSection, featuresSection, testimonialsSection, ctaSection, or footerSection, localized.


heroSection:

headline: Short text, required, localized.
subHeadline: Short text, optional, localized.
backgroundImage: Media, optional, localized.
ctaButton: Link to reusableCtaBlock, optional, localized.


featuresSection:

title: Short text, required, localized.
features: Array of Links to featureItem, localized.


testimonialsSection:

title: Short text, required, localized.
testimonials: Array of Links to testimonialItem, localized.


ctaSection:

headline: Short text, required, localized.
description: Long text, optional, localized.
ctaButton: Link to reusableCtaBlock, optional, localized.


footerSection:

title: Short text, required, localized.
links: Array of Links to reusableCtaBlock, optional, localized.
copyright: Short text, required, localized.
socialLinks: Array of Links to reusableCtaBlock, optional, localized.


reusableCtaBlock:

text: Short text, required, localized.
url: Short text, required, localized.


featureItem:

icon: Media, optional, localized.
title: Short text, required, localized.
description: Long text, optional, localized.


testimonialItem:

quote: Long text, required, localized.
author: Link to authorProfile, optional, localized.


authorProfile:

name: Short text, required, localized.



Populate Content

Create a landingPageContent entry:

slug: "econova".
title: "EcoNova Product Launch" (en-US), "Lanzamiento de EcoNova" (es).
sections: Add entries for hero, features, testimonials, cta, and footer.


Create section entries (e.g., footerSection with type: "footer", title: "EcoNova Footer", etc.).

Publish all entries and assets.


Contentful Content Model Design
The content model follows headless CMS principles to ensure reusability, scalability, and channel-agnosticism:

Reusability: The section content type acts as a wrapper, using a type field (hero, footer, etc.) to link to specific content types (heroSection, footerSection). This allows sections to be reused across multiple pages. The reusableCtaBlock type centralizes link data (text and URL) for use in hero, cta, and footer sections.

Scalability: The model supports adding new section types by extending the section.content field’s allowed content types. For example, adding a blogSection requires only a new content type and a new type value. The include=10 parameter in API calls ensures deep linking for complex content.

Channel-Agnosticism: Content types store data (e.g., text, images) without presentation logic, allowing use in web, mobile, or other platforms. Localized fields (en-US, es) enable multi-language support.

Dynamic Nature: The landingPageContent.sections array allows editors to reorder or add sections without code changes. The type field ensures the frontend renders each section correctly.


Design choices:

Used a section wrapper to normalize rendering logic (type determines the content type).
Kept fields minimal to reduce editor complexity while supporting required features (e.g., footerSection.links for navigation).
Localized all text and media fields to support en-US and es.

Frontend Architecture
The frontend uses Next.js App Router, React components, and a headless approach to support scalability and flexibility:

React Components: The src/app/[locale]/[slug]/page.tsx file renders sections dynamically based on section.type. Each section (e.g., footer) uses Tailwind CSS for consistent styling. Components in src/components/ (if added) would encapsulate reusable UI elements, reducing duplication.

Data Fetching Strategy: The src/lib/contentful.ts file fetches data using Contentful’s REST API with include=10 to resolve linked entries. The normalizeContent function maps raw API data to TypeScript interfaces (src/types/contentful.ts), ensuring type safety and clean rendering logic. Server-side fetching in getServerSideProps (or getStaticProps with ISR) minimizes client-side requests.

Next.js Rendering Choices: The app uses Incremental Static Regeneration (ISR) with a 60-second revalidation period to balance performance and content freshness. Dynamic routes ([locale]/[slug]) support localization and multiple pages. The generateStaticParams function prebuilds en/econova and es/econova routes for static generation.

Headless Support: The frontend consumes Contentful data as JSON, decoupling presentation from content. This allows the same content to serve other platforms (e.g., mobile apps) or additional pages by extending page.tsx logic.

Scalability: Adding new content types requires updating normalizeContent and page.tsx with new type cases. New features (e.g., search) can integrate via API routes. Multiple output channels (e.g., API for mobile) can reuse src/lib/contentful.ts logic.


Testing with Postman

Send a GET request:
GET https://cdn.contentful.com/spaces/<space_id>/entries?content_type=landingPageContent&fields.slug=econova&include=10&locale=en-US


Add headers:

Authorization: Bearer <access_token>
Content-Type: application/json


Verify response contains items with fields.sections (including type: "footer").


Assumptions, Challenges, and Trade-offs

Assumptions:

The landing page needs only one content entry (slug: "econova") with five sections (hero, features, testimonials, CTA, footer).
Footer includes navigation links, copyright, and social links, managed via Contentful.
Localization requires only en-US and es.


Challenges:

Missing Tailwind Config: The sm:px-6 error occurred due to a missing tailwind.config.js. Fixed by creating the file and specifying src paths.
npm Error: The could not determine executable error blocked npx tailwindcss init. Resolved by installing tailwindcss@3.4.10 and clearing npm cache.
Footer Type Issue: Initial footer attempts failed due to missing type in Contentful’s section entries. Fixed by ensuring type: "footer" in Contentful.
Contentful Setup: Linking sections required deep include=10 to fetch nested data, increasing API complexity.


Trade-offs:

ISR vs. SSR: Chose ISR for performance but requires revalidation tuning for frequent content updates.
Dynamic Sections: Using a type field simplifies rendering but requires frontend updates for new section types.
Tailwind CSS: Enables rapid styling but increases bundle size compared to custom CSS.
Contentful: Offers flexibility but adds API latency compared to static content.



Content Preview Bonus Challenge
The app supports Contentful’s Content Preview feature:

Implementation:

Added CONTENTFUL_PREVIEW_TOKEN and CONTENTFUL_PREVIEW_SECRET in .env.local.
Configured src/lib/contentful.ts to use the Preview API when preview=true in API calls (not fully shown in code but supported via environment variables).
Set up a preview webhook in Contentful to trigger Next.js revalidation.


Challenges:

Ensuring draft content renders correctly required toggling between Delivery and Preview APIs.
Preview secret validation added minor complexity to route handlers.


Outcome:

Editors can preview unpublished content at http://localhost:3000/en/econova?preview=true.
Scalable for production with Vercel’s preview URLs.



Troubleshooting

Footer Missing: Ensure section.type is set to footer in Contentful and footerSection is published.
npm Errors: Run npm cache clean --force and reinstall dependencies.
Tailwind Issues: Verify tailwind.config.js includes src/**/*.{js,ts,jsx,tsx,mdx} and clear .next cache (rm -rf .next).
Contentful Errors: Check console.log in src/lib/contentful.ts for API issues and publish all entries.
Localization: Confirm en-US and es fields are populated in Contentful.

