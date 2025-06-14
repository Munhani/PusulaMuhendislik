import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 relative h-[300px] sm:h-[350px] md:h-[400px] w-full">
            <Image
              src="/images/about.jpg"
              alt="Pusula Mühendislik Hakkında"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Hakkımızda</h2>
            <p className="text-gray-600 mb-4">
              Pusula Mühendislik olarak, 20 yılı aşkın süredir haritacılık, kadastro ve inşaat
              sektöründe faaliyet göstermekteyiz. Uzman kadromuz ve modern teknolojik altyapımızla
              müşterilerimize en kaliteli hizmeti sunmayı hedefliyoruz.
            </p>
            <p className="text-gray-600 mb-8">
              Reality Model teknolojileri başta olmak üzere, sektördeki yenilikleri yakından takip
              ediyor ve müşterilerimize en güncel çözümleri sunuyoruz.
            </p>
            <Link
              href="/hakkimizda"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Daha Fazla Bilgi
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 