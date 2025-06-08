import Image from 'next/image';
import type { FeaturesSection } from '@/types/contentful';

export default function FeaturesSection({ title, featuresCollection }: FeaturesSection) {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuresCollection?.items.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              {feature.icon?.url && (
                <Image
                  src={feature.icon.url}
                  alt={feature.title}
                  width={48}
                  height={48}
                  className="mb-4 mx-auto"
                />
              )}
              <h3 className="text-xl font-semibold text-center mb-2">{feature.title}</h3>
              {feature.description && <p className="text-gray-600 text-center">{feature.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}