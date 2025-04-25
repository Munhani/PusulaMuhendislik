import HeroSlider from "@/components/HeroSlider";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12 text-blue-900">
          Pusula Mühendislik
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 mb-6 md:mb-8">
            <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4 text-blue-800">
              Hizmetlerimiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Kadastro İşleri</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-blue-900 mr-2">•</span>
                    <span className="text-sm md:text-base">İfraz ve Tevhid İşlemleri</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-900 mr-2">•</span>
                    <span className="text-sm md:text-base">Yola Terk İşlemleri</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-900 mr-2">•</span>
                    <span className="text-sm md:text-base">Yoldan İhdas İşlemleri</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Haritacılık Hizmetleri</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-blue-900 mr-2">•</span>
                    <span className="text-sm md:text-base">Özel Parselasyon Planları</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-900 mr-2">•</span>
                    <span className="text-sm md:text-base">Plankote ve Halihazır Harita</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-900 mr-2">•</span>
                    <span className="text-sm md:text-base">Aplikasyon İşlemleri</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
