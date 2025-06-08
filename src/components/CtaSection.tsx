import type { CtaSection } from '@/types/contentful';

export default function CtaSection({ headline, description, ctaButton }: CtaSection) {
  return (
    <section className="py-12 bg-green-600 text-white">
      <div className="container mx-auto px-4 max-w-7xl text-center">
        <h2 className="text-3xl font-bold mb-4">{headline}</h2>
        {description && <p className="text-lg mb-6">{description}</p>}
        {ctaButton && (
          <a
            href={ctaButton.url}
            className="inline-block bg-white text-green-600 py-3 px-6 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={ctaButton.text}
          >
            {ctaButton.text}
          </a>
        )}
      </div>
    </section>
  );
}