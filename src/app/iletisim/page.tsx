"use client";

import { useState } from "react";
import ContactForm from '@/components/ContactForm';

export default function IletisimPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (formData: any) => {
    setFormStatus('loading');
    setErrorMessage('');

    try {
      // API endpoint URL'sini dinamik olarak al
      const apiUrl = `${window.location.origin}/api/contact`;
      console.log('API URL:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('API yanıtı:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
      }

      setFormStatus('success');
    } catch (error) {
      console.error('Form gönderme hatası:', error);
      setFormStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Bir hata oluştu');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">İletişim</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* İletişim Bilgileri */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6">İletişim Bilgileri</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Adres</h3>
              <p className="text-gray-600">
                <a
                  href="https://maps.google.com/?q=Karlıbayır+Mahallesi+Selçuklu+Caddesi+No:5+D:11+Arnavutköy/İstanbul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-900"
                >
                  Karlıbayır Mahallesi Selçuklu Caddesi No:5 D:11
                  <br />
                  Arnavutköy/İstanbul
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Telefon</h3>
              <p className="text-gray-600">
                <a href="tel:+902125979700" className="hover:text-blue-900">
                  İş: +90 212 597 97 00
                </a>
                <br />
                <a href="tel:+905334902985" className="hover:text-blue-900">
                  Cep: +90 533 490 29 85
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">E-posta</h3>
              <p className="text-gray-600">
                <a href="mailto:tsivri@pusulamuhendislik.com" className="hover:text-blue-900">
                  tsivri@pusulamuhendislik.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Çalışma Saatleri</h3>
              <p className="text-gray-600">
                Pazartesi - Cuma: 09:00 - 18:00
                <br />
                Cumartesi: 09:00 - 14:00
                <br />
                Pazar: Kapalı
              </p>
            </div>
          </div>
        </div>

        {/* İletişim Formu */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6">Bize Ulaşın</h2>
          
          <ContactForm onSubmit={handleSubmit} status={formStatus} errorMessage={errorMessage} />
        </div>
      </div>

      {/* Harita */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-8">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.5975810160687!2d28.717231312637773!3d41.18433297916897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDExJzAzLjYiTiAyOMKwNDMnMDkuOSJF!5e0!3m2!1str!2str!4v1709654321!5m2!1str!2str"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Pusula Mühendislik Konum"
          />
        </div>
      </div>
    </div>
  );
} 