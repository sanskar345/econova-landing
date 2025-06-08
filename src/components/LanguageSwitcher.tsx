'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [, locale, slug] = pathname.split('/');

  const switchLanguage = (newLocale: string) => {
    router.push(`/${newLocale}/${slug}`);
  };

  return (
    <nav className="fixed top-4 right-4 flex gap-4" aria-label="Language switcher">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-4 py-2 rounded ${locale === 'en' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        disabled={locale === 'en'}
        aria-current={locale === 'en' ? 'true' : 'false'}
      >
        English
      </button>
      <button
        onClick={() => switchLanguage('es')}
        className={`px-4 py-2 rounded ${locale === 'es' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        disabled={locale === 'es'}
        aria-current={locale === 'es' ? 'true' : 'false'}
      >
        Español
      </button>
    </nav>
  );
}