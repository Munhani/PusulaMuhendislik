import React from 'react';

export default function RealityModel() {
  return (
    <main className="min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12 text-blue-900">
          Reality Model
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 mb-6 md:mb-8">
            <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4 text-blue-800">
              Gerçeklik Modeli Nedir?
            </h2>
            <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
              Gerçeklik modeli, fiziksel dünyanın dijital bir temsilidir. Bu model, 
              nesnelerin, binaların ve çevrenin 3 boyutlu dijital kopyasını oluşturarak 
              daha iyi analiz ve planlama yapmanıza olanak tanır.
            </p>
            <div className="mt-4 md:mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <div className="flex flex-col justify-center">
                  <a 
                    href="/01_KiptasKavsak_20240903_3MX/App/index.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-center bg-blue-900 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-800 transition-colors text-sm md:text-base"
                  >
                    Arnavutköy Kiptaş
                  </a>
                  <a 
                    href="https://youtu.be/pD80sTSVh84" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-center bg-red-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base mt-3"
                  >
                    Arnavutköy Kiptaş Video
                  </a>
                </div>
                <div className="flex items-start">
                  <a 
                    href="/01_103_1_20250416_3MX/App/index.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-center bg-blue-900 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-800 transition-colors text-sm md:text-base w-full h-1/2"
                  >
                    Durusu
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-blue-800">
                Avantajları
              </h3>
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  <span className="text-sm md:text-base">Daha doğru ölçümler ve analizler</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  <span className="text-sm md:text-base">Proje planlamasında verimlilik</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  <span className="text-sm md:text-base">Zaman ve maliyet tasarrufu</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  <span className="text-sm md:text-base">Daha iyi karar verme süreçleri</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-blue-800">
                Kullanım Alanları
              </h3>
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  <span className="text-sm md:text-base">Mimari projeler</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  <span className="text-sm md:text-base">İnşaat planlaması</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  <span className="text-sm md:text-base">Kentsel dönüşüm projeleri</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2">•</span>
                  <span className="text-sm md:text-base">Altyapı planlaması</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 