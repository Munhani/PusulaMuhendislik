import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://pusulamuhendislik.com'),
  title: 'İletişim | Pusula Mühendislik',
  description: 'Pusula Mühendislik iletişim sayfası. Bize ulaşmak için formu doldurabilirsiniz.',
  openGraph: {
    title: 'İletişim | Pusula Mühendislik',
    description: 'Pusula Mühendislik iletişim sayfası. Bize ulaşmak için formu doldurabilirsiniz.',
    url: 'https://pusulamuhendislik.com/iletisim',
    siteName: 'Pusula Mühendislik',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'İletişim | Pusula Mühendislik',
    description: 'Pusula Mühendislik iletişim sayfası. Bize ulaşmak için formu doldurabilirsiniz.',
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 