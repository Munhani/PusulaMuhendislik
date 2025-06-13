export default function HizmetlerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Hizmetlerimiz</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Harita ve Ölçüm Hizmetleri */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Harita ve Ölçüm Hizmetleri</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Arazi ve Arsa Ölçümleri</li>
            <li>• GPS ile Hassas Konum Belirleme</li>
            <li>• Topografik Haritalama</li>
          </ul>
        </div>

        {/* Kadastro Hizmetleri */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Kadastro Hizmetleri</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Aplikasyon Hizmetleri</li>
            <li>• Yola Terk, İfraz, Tevhid İşleri</li>
          </ul>
        </div>

        {/* Altyapı Projeleri */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Altyapı Projeleri</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Yol ve Köprü Projeleri</li>
            <li>• İçme Suyu ve Kanalizasyon</li>
            <li>• Küçük Sanat Yapıları Projeleri</li>
          </ul>
        </div>

        {/*  Kentsel Dönüşüm Hizmetleri */}
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