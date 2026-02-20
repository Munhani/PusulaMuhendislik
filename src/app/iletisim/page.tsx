import ContactForm from '@/components/ContactForm';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { getTranslations } from 'next-intl/server';

export const metadata = {
  title: 'İletişim | Pusula Mühendislik',
  description: 'Pusula Mühendislik iletişim sayfası. Bize ulaşmak için formu doldurabilirsiniz.',
};

export default async function IletisimPage() {
  const t = await getTranslations('contact');
  const tFooter = await getTranslations('footer');
  const mapQuery = process.env.CONTACT_MAP_QUERY || '41.183954,28.719024';
  const encodedMapQuery = encodeURIComponent(mapQuery);
  const [lat, lon] = mapQuery.split(',').map((s) => s.trim());
  const latNum = parseFloat(lat) || 41.183954;
  const lonNum = parseFloat(lon) || 28.719024;
  const bbox = `${lonNum - 0.01},${latNum - 0.008},${lonNum + 0.01},${latNum + 0.008}`;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latNum},${lonNum}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">{t('title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">{t('contactInfo')}</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-900 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">{t('address')}</h3>
                  <p className="text-gray-600">
                    {tFooter('address')}<br />
                    {tFooter('city')}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaPhone className="text-blue-900 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">{t('phone')}</h3>
                  <p className="text-gray-600">
                    {tFooter('phoneWork')}<br />
                    {tFooter('phoneMobile')}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaEnvelope className="text-blue-900 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">{t('email')}</h3>
                  <p className="text-gray-600">tsivri@pusulamuhendislik.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">{t('location')}</h2>
            <div className="aspect-w-16 aspect-h-9">
              {process.env.GOOGLE_MAPS_EMBED_API_KEY ? (
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_EMBED_API_KEY}&q=${encodedMapQuery}&zoom=15&maptype=roadmap`}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pusula Mühendislik Konum"
                />
              ) : (
                <>
                  <iframe
                    src={osmEmbedUrl}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Pusula Mühendislik Konum"
                    className="rounded-lg"
                  />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodedMapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:underline"
                  >
                    {t('openInMaps')}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* İletişim Formu */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Bize Ulaşın</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
} 