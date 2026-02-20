'use server';

import { cookies } from 'next/headers';

const LOCALE_COOKIE = 'NEXT_LOCALE';
const MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export async function setLocale(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, { path: '/', maxAge: MAX_AGE, sameSite: 'lax' });
}
