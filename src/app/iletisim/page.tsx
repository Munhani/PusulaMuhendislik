import ContactFormClient from '@/components/ContactFormClient';

export const metadata = {
  title: 'İletişim | Pusula Mühendislik',
  description: 'Pusula Mühendislik iletişim sayfası. Bize ulaşmak için formu doldurabilirsiniz.',
};

export default function IletisimPage() {
  return (
    <div>
      <ContactFormClient />
    </div>
  );
} 