import type { TestimonialsSection } from '@/types/contentful';

export default function TestimonialsSection({ title, testimonialsCollection }: TestimonialsSection) {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonialsCollection?.items.map((testimonial, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">{`"${testimonial.quote}"`}</p>
              <p className="font-semibold">{testimonial.author.name}</p>
              <p className="text-gray-500">{testimonial.author.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}