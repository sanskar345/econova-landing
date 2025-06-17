import { GraphQLClient } from 'graphql-request';
import { draftMode } from 'next/headers';

// Map Next.js locales to Contentful locales
const localeMap: { [key: string]: string } = {
  en: 'en-US',
  es: 'es',
};

const query = `
  query GetLandingPageContent($locale: String! = "en-US") {
    landingPageContentCollection(limit: 1, locale: $locale) {
      items {
        title
        slug
        language
        sectionsCollection(limit: 7) {
          items {
            ... on Section {
              type
              content {
                ... on HeroSection {
                  headline
                  subHeadline
                  backgroundImage {
                    url
                    title
                  }
                  ctaButton {
                    ... on ReusableCtaBlock {
                      text
                      url
                    }
                  }
                }
                ... on FeaturesSection {
                  title
                  featuresCollection(limit: 3) {
                    items {
                      ... on FeatureItem {
                        title
                        description
                        icon {
                          url
                          title
                        }
                      }
                    }
                  }
                }
                ... on TestimonialsSection {
                  title
                  testimonialsCollection(limit: 3) {
                    items {
                      ... on TestimonialItem {
                        quote
                        author {
                          ... on AuthorProfile {
                            name
                            title
                          }
                        }
                      }
                    }
                  }
                }
                ... on ProductShowcaseSection {
                  title
                  description
                  imagesCollection(limit: 3) {
                    items {
                      url
                      title
                    }
                  }
                }
                ... on CtaSection {
                  headline
                  description
                  ctaButton {
                    ... on ReusableCtaBlock {
                      text
                      url
                    }
                  }
                }
                ... on FooterSection {
                  copyright
                }
              }
            }
          }
        }
      }
    }
  }
`

async function getContentfulClient() {
  const isDraftMode = (await draftMode()).isEnabled;

  return new GraphQLClient(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      headers: {
        Authorization: `Bearer ${isDraftMode
          ? process.env.CONTENTFUL_PREVIEW_TOKEN!
          : process.env.CONTENTFUL_ACCESS_TOKEN!
          }`,
      },
    }
  );
}

export async function fetchLandingPage(slug: string, locale: string) {
  const contentfulLocale = localeMap[locale] || 'en-US';
  const client = await getContentfulClient();

  try {
    const response = await client.request<{
      landingPageContentCollection: {
        items: any[];
      };
    }>(query, { slug, locale: contentfulLocale });

    if (response.landingPageContentCollection.items.length === 0) {
      return null;
    }
    console.log('Fetched page:', response.landingPageContentCollection.items[0]?.sectionsCollection?.items);
    return response.landingPageContentCollection.items[0];
  } catch (error) {
    console.error('Contentful GraphQL fetch error:', error);
    return null;
  }
}