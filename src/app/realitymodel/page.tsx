import RealityModelClient from './RealityModelClient';

export default function RealityModel() {
  return (
    <main className="min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12 text-blue-900">
          Reality Model
        </h1>
        <RealityModelClient />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-8">
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
    </main>
  );
} 