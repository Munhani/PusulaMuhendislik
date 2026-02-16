export default function HizmetlerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Hizmetlerimiz</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Haritacılık Hizmetleri - www.pusulamuhendislik.com ile uyumlu */}
        <div id="haritacilik" className="bg-white rounded-lg shadow-md p-6 scroll-mt-24">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Haritacılık Hizmetleri</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Özel parselasyon planları</li>
            <li>• Plankote ve halihazır harita</li>
            <li>• Aplikasyon işlemleri</li>
          </ul>
        </div>

        {/* Kadastro İşleri - www.pusulamuhendislik.com ile uyumlu */}
        <div id="kadastro" className="bg-white rounded-lg shadow-md p-6 scroll-mt-24">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Kadastro İşleri</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• İfraz ve tevhid işlemleri</li>
            <li>• Yola terk işlemleri</li>
            <li>• Yoldan ihdas işlemleri</li>
          </ul>
        </div>

        {/* Altyapı Projeleri (detay) */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Altyapı Projeleri</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Yol ve Köprü Projeleri</li>
            <li>• İçme Suyu ve Kanalizasyon</li>
            <li>• Küçük Sanat Yapıları Projeleri</li>
          </ul>
        </div>

        {/* Kentsel Dönüşüm Hizmetleri */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Kentsel Dönüşüm Hizmetleri</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Riskli Yapı Tespiti</li>
            <li>• Deprem Analizi</li>
          </ul>
        </div>

        {/* Reality Model Hizmetleri */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Reality Model Hizmetleri</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Drone Fotogrametri</li>
            <li>• 3D Modelleme</li>
            <li>• 3D Scan</li>
            <li>• Nokta Bulutu</li>
         </ul>
        </div>

        {/* Danışmanlık Hizmetleri */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Danışmanlık Hizmetleri</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Proje Yönetimi</li>
            <li>• Teknik Danışmanlık</li>
            <li>• Kadastro Bilirkişiliği</li>
            <li>• Risk Değerlendirmesi</li>

          </ul>
        </div>
      </div>
    </div>
  );
} 