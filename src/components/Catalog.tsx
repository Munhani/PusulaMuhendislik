import Link from 'next/link';

export default function Catalog() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Kataloğumuzu İnceleyin</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
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
      </div>
    </section>
  );
} 