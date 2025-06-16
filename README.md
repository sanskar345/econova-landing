EcoNova Landing Page
This is a landing page for EcoNova, a made-up product launch. It’s built with Next.js, uses Contentful to manage content, and has Tailwind CSS for styling. TypeScript keeps the code safe. The page works in English (en) and Spanish (es) and shows sections like a hero, features, testimonials, and a call-to-action (CTA). You can see it live on Vercel at https://econova-landing-uanb.vercel.app/en/econova for English and https://econova-landing-uanb.vercel.app/es/econova for Spanish.
How to Set Up
Setting Up Contentful
You need a Contentful space to store the page’s content. Use the JSON export or set it up by hand.
Option 1: Use the JSON Export

Get the Export File:

The project includes contentful-export.json in the main folder.
It has all content types (like landingPageContent, heroSection, and others), English (en-US) and Spanish (es) languages, and sample content.


Install Contentful’s Tool:

Run this in your terminal:npm install -g contentful-cli




Log In:

Run:contentful login


A browser window will open. Follow the steps to log in.


Make a New Space:

Go to Contentful and create a new space.
Copy the Space ID (it looks like new_space_id).


Get a Management Token:

In Contentful, go to Settings > API Keys > Content Management Tokens.
Create a token (it looks like CFPAT-xxxx).


Import the JSON:

Run:contentful space import \
  --space-id new_space_id \
  --management-token CFPAT-xxxx \
  --content-file contentful-export.json


Use your Space ID and token instead of new_space_id and CFPAT-xxxx.
This sets up content types, languages, and sample content (like a page with slug: "econova").



Option 2: Set Up Content Types by Hand
If you don’t want to use the JSON, create these content types in Contentful:

landingPageContent:
title: Short text, must be filled, works in both languages.
slug: Short text, must be filled, unique, same for all languages.
language: Short text, optional, same for all languages.
sections: List of links to section entries, works in both languages.


section:
type: Short text, must be filled, same for all languages, can be hero, features, testimonials, or cta.
content: Link to heroSection, featuresSection, testimonialsSection, or ctaSection, works in both languages.


heroSection:
headline: Short text, must be filled, works in both languages.
subHeadline: Short text, optional, works in both languages.
backgroundImage: Image file, optional, works in both languages.
ctaButton: Link to reusableCtaBlock, optional, works in both languages.


featuresSection:
title: Short text, must be filled, works in both languages.
features: List of links to featureItem, works in both languages.


testimonialsSection:
title: Short text, must be filled, works in both languages.
testimonials: List of links to testimonialItem, works in both languages.


ctaSection:
headline: Short text, must be filled, works in both languages.
description: Long text, optional, works in both languages.
ctaButton: Link to reusableCtaBlock, optional, works in both languages.


reusableCtaBlock:
text: Short text, must be filled, works in both languages.
url: Short text, must be filled, works in both languages.


featureItem:
icon: Image file, optional, works in both languages.
title: Short text, must be filled, works in both languages.
description: Long text, optional, works in both languages.


testimonialItem:
quote: Long text, must be filled, works in both languages.
author: Link to authorProfile, optional, works in both languages.


authorProfile:
name: Short text, must be filled, works in both languages.



How They Connect:

landingPageContent links to many section entries.
Each section links to one content type, like heroSection.
reusableCtaBlock is used in heroSection and ctaSection.
featureItem and testimonialItem are used in featuresSection and testimonialsSection.

Sample Content:

Make a landingPageContent entry with slug: "econova", title: "EcoNova Launch", and links to section entries (e.g., type: "hero", content: heroSection).
Publish all entries in Contentful.

Install the Project

Get the Code:

Clone the project:git clone <repository-url>
cd econova-landing




Install Node.js:

Make sure you have Node.js version 18 or higher. Check with:node --version




Install Packages:

Run:npm install


This installs Next.js, Contentful’s SDK, Tailwind CSS, TypeScript, and other tools.



Set Up Environment Variables

Create .env.local:

Make a file called .env.local in the project folder (/home/sanskar/Desktop/personal/econova-landing).


Add Contentful Details:

Open .env.local and add:CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_token


Find your Space ID in Contentful under Settings > General.
Create a Delivery Token in Settings > API Keys > Content Delivery API.


Optional Preview Setup:

If you want to see unpublished content, add:CONTENTFUL_PREVIEW_TOKEN=your_preview_token


Get the preview token from Contentful’s API settings.



Run the Project

Start the Dev Server:

Run:npm run dev


The site will open at http://localhost:3000.


View the Pages:

Go to http://localhost:3000/en/econova for English or http://localhost:3000/es/econova for Spanish.


Build for Production:

Run:npm run build
npm run start





Live Site
The app is live on Vercel:

English: https://econova-landing-uanb.vercel.app/en/econova
Spanish: https://econova-landing-uanb.vercel.app/es/econova

Contentful Content Design
The content setup in Contentful is built to be flexible and reusable, fitting a headless CMS approach.

Separate Pieces: The section content type lets you add different sections (like hero or features) to a page. This keeps content separate from how it looks.
Reusable Parts: The reusableCtaBlock is used in both heroSection and ctaSection, so you don’t repeat the same button info. featureItem and testimonialItem handle lists of features or testimonials.
Languages: Fields like title and headline work in English (en-US) and Spanish (es), so the page switches languages easily.
Flexibility: The section.type field lets the code decide what to show based on the content type.
Growth: The setup allows for complex pages with nested content (like landingPageContent to sections to heroSection).

Why It’s Headless-Friendly:

Reuse Content: reusableCtaBlock, featureItem, and testimonialItem can work on other pages or apps, like a mobile app or email.
Add More: You can create new section types (like a FAQ) by adding a content type in Contentful and a new component in the code.
Any Platform: Content is just text, images, or links, so it can go to websites, apps, or other places using Contentful’s API.

Choices Made:

The nested setup makes API calls more complex (using include: 7). A simpler setup could make calls faster but limit what you can do.
Language fields take time to set up but make the site work in multiple languages.
Trade-offs:
The design chooses flexibility, but you need to publish all Contentful entries carefully.
The include: 7 setting works for now but might need tweaking if the site gets bigger.



How the Frontend Works
The frontend uses Next.js, React components, and Contentful’s API to work as a headless site.

Components:

Each section has its own component (HeroSection, FeaturesSection, TestimonialsSection, CtaSection). They get data from section.content.
Components use Tailwind CSS for styling, like padding that adjusts for small screens (sm:p-6).
For example, HeroSection shows a headline, backgroundImage, and ctaButton with proper accessibility.


Getting Data:

The src/lib/contentful.ts file pulls content from Contentful using fetchLandingPage.
It organizes the data to match src/types/contentful.ts, keeping the code safe with TypeScript.
Data is fetched when the page is built or updated every 60 seconds.


Next.js Setup:

ISR: Pages are built ahead of time for /en/econova and /es/econova using generateStaticParams. They update every 60 seconds (revalidate: 60).
Dynamic URLs ([locale]/[slug]) handle different languages.
The src/app/[locale]/[slug]/page.tsx file fetches and shows content on the server.


Growing the Site:

New Sections: Add a section like a FAQ by creating a Contentful content type, updating src/lib/contentful.ts, and making a new component.
New Features: Add fields to landingPageContent (like meta tags) without breaking existing code.
Other Platforms: Content can be used in apps or APIs by calling Contentful directly.
Safe Code: TypeScript files (src/types/contentful.ts) make it easy to add new content types.



Assumptions, Challenges, and Choices

Assumptions:

Contentful holds all content, with published entries for slug: "econova".
Vercel manages deployment and sets up Contentful credentials automatically.
Only English and Spanish are needed, with en-US as the default.


Challenges:

TypeScript Errors: Fixed errors like PageProps in src/app/[locale]/[slug]/page.tsx by using Promise for params. Alternatively, disabled TypeScript checks in next.config.js with typescript.ignoreBuildErrors: true.
Linting Issues: Fixed @typescript-eslint/no-explicit-any in src/lib/contentful.ts by adding types. Disabled linting in next.config.js with eslint.ignoreDuringBuilds: true to unblock builds.
Contentful Setup: Needed to publish all entries to avoid missing content errors.
Responsive Design: Added Tailwind classes like sm:p-6 for mobile-friendly layouts.


Trade-offs:

Disabling linting and TypeScript checks speeds up builds but risks errors at runtime. Fixing errors is better for a stable site.
The nested Contentful model is flexible but makes API calls slower. A simpler model could be faster but less powerful.
ISR with 60-second updates balances fresh content and performance but may need tweaking for high-traffic sites.



Troubleshooting

TypeScript Errors: Fix PageProps in src/app/[locale]/[slug]/page.tsx by typing params as Promise<{ slug: string; locale: string }>. Or, disable checks in next.config.js with typescript.ignoreBuildErrors: true.
Linting Errors: Fix @typescript-eslint/no-explicit-any in src/lib/contentful.ts with proper types. Or, disable linting in next.config.js with eslint.ignoreDuringBuilds: true.
Build Fails: Clear the cache with rm -rf .next and run npm run build.
Contentful Errors: Log API responses in src/lib/contentful.ts and ensure all entries are published.
Tailwind Issues: Check tailwind.config.js includes src/**/*.{js,ts,jsx,tsx,mdx}.
npm Errors: Clear the cache with npm cache clean --force and reinstall with npm install.

