import React from 'react';

export default function RealityModel() {
  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-blue-900">
          Reality Model
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              Gerçeklik Modeli Nedir?
            </h2>
            <p className="text-gray-700 mb-6">
              Gerçeklik modeli, fiziksel dünyanın dijital bir temsilidir. Bu model, 
              nesnelerin, binaların ve çevrenin 3 boyutlu dijital kopyasını oluşturarak 
              daha iyi analiz ve planlama yapmanıza olanak tanır.
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <a 
                  href="/01_KiptasKavsak_20240903_3MX/App/index.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  ArnavutkoyKiptaş
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">
                Avantajları
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  Daha doğru ölçümler ve analizler
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  Proje planlamasında verimlilik
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  Zaman ve maliyet tasarrufu
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  Daha iyi karar verme süreçleri
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">
                Kullanım Alanları
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  Mimari projeler
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  İnşaat planlaması
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  Kentsel dönüşüm projeleri
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  Altyapı planlaması
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 