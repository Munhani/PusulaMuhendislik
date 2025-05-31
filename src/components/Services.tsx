import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    id: 1,
    title: 'Haritacılık',
    description: 'Profesyonel harita çizimi ve ölçüm hizmetleri',
    image: '/images/haritacilik.jpg',
    link: '/hizmetler#haritacilik',
  },
  {
    id: 2,
    title: 'Kadastro',
    description: 'Kadastro ölçümleri ve belgelendirme işlemleri',
    image: '/images/kadastro.jpg',
    link: '/hizmetler#kadastro',
  },
  {
    id: 3,
    title: 'İnşaat',
    description: 'İnşaat projeleri ve danışmanlık hizmetleri',
    image: '/images/insaat.jpg',
    link: '/hizmetler#insaat',
  },
  {
    id: 4,
    title: 'Reality Model',
    description: '3D tarama ve modelleme çözümleri',
    image: '/images/realitymodel.jpg',
    link: '/realitymodel',
  },
];

export default function Services() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Hizmetlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 