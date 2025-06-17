export interface ReusableCtaBlock {
  text: string;
  url: string;
}

export interface AuthorProfile {
  name: string;
  title: string;
}

export interface FeatureItem {
  icon?: { url: string };
  title: string;
  description?: string;
}

export interface TestimonialItem {
  quote: string;
  author: AuthorProfile;
}

export interface HeroSection {
  headline?: string;
  subHeadline?: string;
  backgroundImage?: { url: string; description?: string };
  ctaButton?: ReusableCtaBlock;
}

export interface FeaturesSection {
  title?: string;
  featuresCollection?: { items: FeatureItem[] };
}

export interface TestimonialsSection {
  title?: string;
  testimonialsCollection?: { items: TestimonialItem[] };
}

export interface CtaSection {
  headline?: string;
  description?: string;
  ctaButton?: ReusableCtaBlock;
}

export interface Section {
  type: string;
  content: HeroSection | FeaturesSection | TestimonialsSection | CtaSection;
}

export interface LandingPage {
  title: string;
  slug: string;
  language: string;
  sectionsCollection?: { items: Section[] };
}

export interface Footer {
  copyright?: string;
}