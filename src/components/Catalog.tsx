import Image from 'next/image';
import Link from 'next/link';

export default function Catalog() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
<<<<<<< HEAD
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Kataloğumuzu İnceleyin</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0">
=======
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Kataloğumuzu İnceleyin</h2>
            <p className="text-gray-600 mb-8">
>>>>>>> 15482864ec85881d2236f4414271b3ec43fac266
              Detaylı bilgi için kataloğumuzu inceleyebilirsiniz. Kataloğumuzda tüm hizmetlerimiz ve
              projelerimiz hakkında detaylı bilgi bulabilirsiniz.
            </p>
            <Link
<<<<<<< HEAD
              href="/katalog.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Kataloğu indir"
=======
              href="/Katalog.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
>>>>>>> 15482864ec85881d2236f4414271b3ec43fac266
            >
              Kataloğu İndir
            </Link>
          </div>
<<<<<<< HEAD
          <div className="flex-1 relative h-[300px] sm:h-[350px] md:h-[400px] w-full">
=======
          <div className="flex-1 relative h-[400px] w-full">
>>>>>>> 15482864ec85881d2236f4414271b3ec43fac266
            <Image
              src="/images/katalog.jpg"
              alt="Pusula Mühendislik Katalog"
              fill
<<<<<<< HEAD
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg shadow-lg"
              priority
=======
              className="object-cover rounded-lg shadow-lg"
>>>>>>> 15482864ec85881d2236f4414271b3ec43fac266
            />
          </div>
        </div>
      </div>
    </section>
  );
} 