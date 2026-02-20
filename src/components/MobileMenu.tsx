'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('nav');

  return (
    <div className="md:hidden">
      <button 
        className="p-2"
        aria-label="Menüyü Aç/Kapat"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg py-4">
          <div className="flex flex-col space-y-4 px-4">
            <Link href="/" className="text-gray-700 hover:text-blue-900 transition-colors">
              {t('home')}
            </Link>
            <Link href="/hizmetler" className="text-gray-700 hover:text-blue-900 transition-colors">
              {t('services')}
            </Link>
            <Link href="/realitymodel" className="text-gray-700 hover:text-blue-900 transition-colors">
              {t('realityModel')}
            </Link>
            <Link href="/hakkimizda" className="text-gray-700 hover:text-blue-900 transition-colors">
              {t('about')}
            </Link>
            <Link href="/iletisim" className="text-gray-700 hover:text-blue-900 transition-colors">
              {t('contact')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 