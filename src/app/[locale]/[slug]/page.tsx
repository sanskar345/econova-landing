import { fetchLandingPage } from '@/lib/contentful';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import type { LandingPage } from '@/types/contentful';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function LandingPage({ params }: { params: { slug: string; locale: string } }) {
  // Ensure params are properly typed and accessed
  const { slug, locale } = await params;

  // Validate locale
  if (!['en', 'es'].includes(locale)) {
    return <div className="text-center py-12">Error: Invalid locale</div>;
  }

  const page: LandingPage | null = await fetchLandingPage(slug, locale) as LandingPage | null;

  if (!page) {
    return <div className="text-center py-12">Error: Page not found</div>;
  }

  return (
    <main className="min-h-screen">
      <h1 className="sr-only">{page.title}</h1>
      {page.sectionsCollection?.items.map((section, index) => {
        switch (section.type) {
          case 'hero':
            return <HeroSection key={index} {...section.content} />;
          case 'features':
            return <FeaturesSection key={index} {...section.content} />;
          case 'testimonials':
            return <TestimonialsSection key={index} {...section.content} />;
          case 'cta':
            return <CtaSection key={index} {...section.content} />;
          default:
            return null;
        }
      })}
    </main>
  );
}