'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Services() {
  const t = useTranslations('home');
  const services = [
    { id: 1, titleKey: 'service1Title', items: ['service1Item1', 'service1Item2', 'service1Item3'], link: '/hizmetler#muhendislik' },
    { id: 2, titleKey: 'service2Title', items: ['service2Item1', 'service2Item2', 'service2Item3'], link: '/hizmetler#kadastro' },
    { id: 3, titleKey: 'service3Title', items: ['service3Item1', 'service3Item2', 'service3Item3'], link: '/hizmetler#haritacilik' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('servicesTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className="group bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
              role="listitem"
              aria-label={`${t(service.titleKey)} hakkında daha fazla bilgi`}
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-4 group-hover:text-blue-700 transition-colors">
                {t(service.titleKey)}
              </h3>
              <ul className="space-y-2 text-gray-600">
                {service.items.map((key, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-900 mr-2">•</span>
                    {t(key)}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
