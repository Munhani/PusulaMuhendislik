import Link from 'next/link';

// www.pusulamuhendislik.com ile aynı format ve metinler
const services = [
  {
    id: 1,
    title: 'Mühendislik Hizmetleri',
    items: [
      'Altyapı Projeleri',
      'Kentsel Dönüşüm İşleri',
      'Yol ve Kavşak Projeleri',
    ],
    link: '/hizmetler#muhendislik',
  },
  {
    id: 2,
    title: 'Kadastro İşleri',
    items: [
      'Yoldan İhdas İşlemleri',
      'Yola Terk İşlemleri',
      'İfraz ve Tevhid İşlemleri',
    ],
    link: '/hizmetler#kadastro',
  },
  {
    id: 3,
    title: 'Haritacılık Hizmetleri',
    items: [
      'Aplikasyon İşlemleri',
      'Plankote ve Halihazır Harita',
      'Özel Parselasyon Planları',
    ],
    link: '/hizmetler#haritacilik',
  },
];

export default function Services() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Hizmetlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className="group bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
              role="listitem"
              aria-label={`${service.title} hakkında daha fazla bilgi`}
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-4 group-hover:text-blue-700 transition-colors">
                {service.title}
              </h3>
              <ul className="space-y-2 text-gray-600">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-900 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
