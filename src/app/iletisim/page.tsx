import ContactForm from '@/components/ContactForm';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export const metadata = {
  title: 'İletişim | Pusula Mühendislik',
  description: 'Pusula Mühendislik iletişim sayfası. Bize ulaşmak için formu doldurabilirsiniz.',
};

export default function IletisimPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">İletişim</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* İletişim Bilgileri */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">İletişim Bilgileri</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-900 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">Adres</h3>
                  <p className="text-gray-600">
                    Karlıbayır Mahallesi Selçuklu Caddesi No:5 D:11<br />
                    Arnavutköy/İstanbul
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaPhone className="text-blue-900 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">Telefon</h3>
                  <p className="text-gray-600">
                    İş: +90 212 597 97 00<br />
                    Cep: +90 533 490 29 85
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaEnvelope className="text-blue-900 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">E-posta</h3>
                  <p className="text-gray-600">tsivri@pusulamuhendislik.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Harita */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Konum</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=41.18434576628961,28.719424740492506&zoom=15&maptype=roadmap"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pusula Mühendislik Konum"
              />
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