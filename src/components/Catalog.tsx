import Image from 'next/image';
import Link from 'next/link';

export default function Catalog() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Kataloğumuzu İnceleyin</h2>
            <p className="text-gray-600 mb-8">
              Detaylı bilgi için kataloğumuzu inceleyebilirsiniz. Kataloğumuzda tüm hizmetlerimiz ve
              projelerimiz hakkında detaylı bilgi bulabilirsiniz.
            </p>
            <Link
              href="/Katalog.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kataloğu İndir
            </Link>
          </div>
          <div className="flex-1 relative h-[400px] w-full">
            <Image
              src="/images/katalog.jpg"
              alt="Pusula Mühendislik Katalog"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 