import Link from "next/link";

export default function Hakkimizda() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Hakkımızda
          </h1>
          <p className="text-lg text-center max-w-3xl mx-auto">
            Pusula Mühendislik olarak, müşterilerimize en kaliteli hizmeti sunmak için çalışıyoruz.
          </p>
        </div>
      </div>

      {/* Değerlerimiz Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Değerlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Kalite</h3>
              <p className="text-gray-600">
                Her projede en yüksek kalite standartlarını hedefliyor, müşterilerimize en iyi hizmeti sunuyoruz.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Güven</h3>
              <p className="text-gray-600">
                Müşterilerimizle şeffaf ve dürüst ilişkiler kurarak, güvenilir bir iş ortağı olmayı hedefliyoruz.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Yenilikçilik</h3>
              <p className="text-gray-600">
                Sürekli gelişim ve yenilikçi çözümlerle sektörde öncü olmayı hedefliyoruz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tarihçemiz Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Tarihçemiz
          </h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">2006</h3>
              <p className="text-gray-600">
                Pusula Mühendislik kuruldu ve profesyonel mühendislik ve haritacılık hizmetleri sunmaya başladı.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">2007</h3>
              <p className="text-gray-600">
                Uluslararası projelerde çalışmaya başladık.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">2010</h3>
              <p className="text-gray-600">
                Modern teknoloji altyapısı ve yeni hizmet alanları ile sektörde ilerleyen konuma ulaştık.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 