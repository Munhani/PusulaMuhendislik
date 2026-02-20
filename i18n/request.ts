import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const LOCALE_COOKIE = 'NEXT_LOCALE';
/** Site varsayılan olarak her zaman Türkçe açılır; kullanıcı dil seçeneği ile değiştirebilir. */
const DEFAULT_LOCALE = 'tr';
const supportedLocales = ['tr', 'en', 'ru', 'zh'] as const;

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const stored = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale: string = (stored && supportedLocales.includes(stored as (typeof supportedLocales)[number])) ? stored : DEFAULT_LOCALE;

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
