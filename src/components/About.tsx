'use client';

import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('home');
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 text-center">{t('aboutTitle')}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t('aboutText')}
          </p>
        </div>
      </div>
    </section>
  );
}
