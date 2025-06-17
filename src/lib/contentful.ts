import { createClient } from 'contentful';
import { draftMode } from 'next/headers';

// Map Next.js locales to Contentful locales
const localeMap: { [key: string]: string } = {
  en: 'en-US',
  es: 'es',
};

async function getContentfulClient() {
  const isDraftMode = (await draftMode()).isEnabled;

  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: isDraftMode
      ? process.env.CONTENTFUL_PREVIEW_TOKEN!
      : process.env.CONTENTFUL_ACCESS_TOKEN!,
    host: isDraftMode ? 'preview.contentful.com' : 'cdn.contentful.com',
  });
}

export async function fetchLandingPage(slug: string, locale: string) {
  const contentfulLocale = localeMap[locale] || 'en-US';
  const client = await getContentfulClient();

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
    case 'footerSection':
      return {
        copyright: content.fields.copyright
      }
    default:
      return {};
  }
}