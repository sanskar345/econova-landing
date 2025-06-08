import Image from 'next/image';
import type { HeroSection } from '@/types/contentful';

export default function HeroSection({ headline, subHeadline, backgroundImage, ctaButton }: HeroSection) {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center text-white">
      {backgroundImage?.url && (
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.description || 'Hero Background'}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="relative z-10 text-center p-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{headline}</h1>
        {subHeadline && <p className="text-lg md:text-xl mb-6">{subHeadline}</p>}
        {ctaButton && (
          <a
            href={ctaButton.url}
            className="inline-block bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label={ctaButton.text}
          >
            {ctaButton.text}
          </a>
        )}
      </div>
    </section>
  );
}