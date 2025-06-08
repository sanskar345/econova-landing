import { createClient } from 'contentful';

// Map Next.js locales to Contentful locales
const localeMap: { [key: string]: string } = {
  en: 'en-US',
  es: 'es',
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function fetchLandingPage(slug: string, locale: string) {
  const contentfulLocale = localeMap[locale] || 'en-US';

  try {
    const response = await client.getEntries({
      content_type: 'landingPageContent',
      'fields.slug': slug,
      include: 10,
      locale: contentfulLocale,
    });

    if (response.items.length === 0) {
      return null;
    }

    const entry = response.items[0];
    return {
      title: entry.fields.title,
      slug: entry.fields.slug,
      language: entry.fields.language,
      sectionsCollection: {
        items: ((entry.fields.sections as any[]) || []).map((section: any) => ({
          type: section.fields.type,
          content: normalizeContent(section.fields.content),
        })),
      },
    };
  } catch (error) {
    console.error('Contentful fetch error:', error);
    return null;
  }
}

// Normalize content to match expected structure
function normalizeContent(content: any) {
  const contentType = content?.sys?.contentType?.sys?.id;

  switch (contentType) {
    case 'heroSection':
      return {
        headline: content.fields.headline,
        subHeadline: content.fields.subHeadline,
        backgroundImage: content.fields.backgroundImage?.fields?.file
          ? {
            url: `https:${content.fields.backgroundImage.fields.file.url}`,
            description: content.fields.backgroundImage.fields.description,
          }
          : null,
        ctaButton: content.fields.ctaButton?.fields,
      };
    case 'featuresSection':
      return {
        title: content.fields.title,
        featuresCollection: {
          items: (content.fields.features || []).map((feature: any) => ({
            icon: feature.fields.icon?.fields?.file
              ? { url: `https:${feature.fields.icon.fields.file.url}` }
              : null,
            title: feature.fields.title,
            description: feature.fields.description,
          })),
        },
      };
    case 'testimonialsSection':
      return {
        title: content.fields.title,
        testimonialsCollection: {
          items: (content.fields.testimonials || []).map((testimonial: any) => ({
            quote: testimonial.fields.quote,
            author: testimonial.fields.author?.fields,
          })),
        },
      };
    case 'ctaSection':
      return {
        headline: content.fields.headline,
        description: content.fields.description,
        ctaButton: content.fields.ctaButton?.fields,
      };
    default:
      return {};
  }
}