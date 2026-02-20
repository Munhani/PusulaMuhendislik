'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setLocale as setLocaleAction } from '@/app/actions/locale';

const LOCALE_COOKIE = 'NEXT_LOCALE';
const DEFAULT_LOCALE = 'tr';

const languages = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'zh', label: '中文' },
] as const;

function getLocaleFromCookie(): string {
  if (typeof document === 'undefined') return DEFAULT_LOCALE;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  return (match ? decodeURIComponent(match[1]) : DEFAULT_LOCALE) || DEFAULT_LOCALE;
}

export default function LanguageSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState<string>(DEFAULT_LOCALE);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLocale(getLocaleFromCookie());
  }, []);

  const handleSelect = async (code: string) => {
    setLocale(code);
    setOpen(false);
    await setLocaleAction(code);
    router.refresh();
  };

  const current = languages.find((l) => l.code === locale) ?? languages[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 md:px-3 md:py-2"
        aria-label="Dil seçin"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="font-medium">{current.label}</span>
        <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" aria-hidden onClick={() => setOpen(false)} />
          <ul
            className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
            role="listbox"
          >
            {languages.map((lang) => (
              <li key={lang.code} role="option" aria-selected={locale === lang.code}>
                <button
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                    locale === lang.code ? 'bg-blue-50 font-medium text-blue-900' : 'text-gray-700'
                  }`}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
