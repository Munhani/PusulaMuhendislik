'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Catalog() {
  const t = useTranslations('footer');
  return (
    <section className="py-8 md:py-10 bg-blue-900">
      <div className="container mx-auto px-4 text-center">
        <Link
          href="/Katalog.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-white font-semibold text-lg hover:text-blue-200 underline underline-offset-2 transition-colors"
          aria-label="Katalog indir"
        >
          {t('catalogClick')}
        </Link>
      </div>
    </section>
  );
}
