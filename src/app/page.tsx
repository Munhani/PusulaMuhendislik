import HeroSlider from "@/components/HeroSlider";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <HeroSlider />
      </section>

      {/* Hizmetler Section */}
      <section className="py-16 md:py-20 bg-gray-50" aria-labelledby="hizmetler-baslik">
        <div className="container mx-auto px-4">
          <h2 id="hizmetler-baslik" className="text-3xl font-bold text-center mb-12">Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mühendislik Hizmetleri */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Mühendislik Hizmetleri</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-900 mr-2">•</span>
                  Yol ve Kavşak Projeleri
                </li>
                <li className="flex items-center">
                  <span className="text-blue-900 mr-2">•</span>
                  Kentsel Dönüşüm İşleri
                </li>
                <li className="flex items-center">
                  <span className="text-blue-900 mr-2">•</span>
                  Altyapı Projeleri
                </li>
              </ul>
            </div>

            {/* Kadastro İşleri */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Kadastro İşleri</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-900 mr-2">•</span>
                  İfraz ve Tevhid İşlemleri
                </li>
                <li className="flex items-center">
                  <span className="text-blue-900 mr-2">•</span>
                  Yola Terk İşlemleri
                </li>
                <li className="flex items-center">
                  <span className="text-blue-900 mr-2">•</span>
                  Yoldan İhdas İşlemleri
                </li>
              </ul>
            </div>

            {/* Haritacılık Hizmetleri */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Haritacılık Hizmetleri</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-900 mr-2">•</span>
                  Özel Parselasyon Planları
                </li>
                <li className="flex items-center">
                  <span className="text-blue-900 mr-2">•</span>
                  Plankote ve Halihazır Harita
                </li>
                <li className="flex items-center">
                  <span className="text-blue-900 mr-2">•</span>
                  Aplikasyon İşlemleri
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Katalog Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <a 
              href="/Katalog.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-900 px-8 py-4 rounded-lg text-xl font-semibold 
                transform transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                hover:bg-blue-50 hover:text-blue-900"
            >
              Katalog İçin Tıklayın
            </a>
          </div>
        </div>
      </section>

      {/* Hakkımızda Section */}
      <section className="py-16 md:py-20" aria-labelledby="hakkimizda-baslik">
        <div className="container mx-auto px-4">
          <h2 id="hakkimizda-baslik" className="text-3xl font-bold text-center mb-12">Hakkımızda</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700">
              Pusula Mühendislik olarak, mühendislik ve haritacılık alanında uzman kadromuzla 
              müşterilerimize en kaliteli hizmeti sunmayı hedefliyoruz. Modern teknoloji ve 
              yenilikçi çözümlerle, projelerinizi hayata geçiriyoruz.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
