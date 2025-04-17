import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Pusula Mühendislik</title>
        <meta name="description" content="Pusula Mühendislik - Profesyonel Mühendislik Çözümleri" />
        <meta name="keywords" content="mühendislik, haritacılık, kadastro, inşaat, proje" />
        <meta name="author" content="Pusula Mühendislik" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Pusula Mühendislik" />
        <meta property="og:description" content="Profesyonel Mühendislik Çözümleri" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pusulamuhendislik.com" />
        <meta property="og:image" content="/images/PusulaLogo.png" />
      </head>
      <body className={`${inter.className} relative min-h-screen bg-gray-50`}>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-md z-50">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/PusulaLogo.png"
                  alt="Pusula Mühendislik Logo"
                  width={250}
                  height={250}
                  className="mr-2"
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-900">
                  Ana Sayfa
                </Link>
                <Link href="/hakkimizda" className="text-gray-700 hover:text-blue-900">
                  Hakkımızda
                </Link>
                <Link href="/hizmetler" className="text-gray-700 hover:text-blue-900">
                  Hizmetler
                </Link>
                <Link href="/realitymodel" className="text-gray-700 hover:text-blue-900">
                  Reality Model
                </Link>
                <Link href="/iletisim" className="text-gray-700 hover:text-blue-900">
                  İletişim
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <MobileMenu />
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow pt-[250px]">{children}</main>

        {/* Footer */}
        <footer className="bg-blue-900 text-white py-2">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <div className="flex items-center mb-1">
                  <Image
                    src="/images/PusulaLogo.png"
                    alt="Pusula Mühendislik Logo"
                    width={200}
                    height={200}
                    className="mr-2"
                  />
                </div>
                <p className="text-sm">Karlıbayır Mahallesi Selçuklu Caddesi No:5 D:11</p>
                <p className="text-sm">Arnavutköy/İstanbul</p>
                <p className="text-sm">İş: +90 212 597 97 00</p>
                <p className="text-sm">Cep: +90 533 490 29 85</p>
                <p className="text-sm">tsivri@pusulamuhendislik.com</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Hızlı Bağlantılar</h3>
                <ul className="space-y-0.5">
                  <li>
                    <Link href="/hakkimizda" className="hover:text-blue-200 text-sm">
                      Hakkımızda
                    </Link>
                  </li>
                  <li>
                    <Link href="/hizmetler" className="hover:text-blue-200 text-sm">
                      Hizmetler
                    </Link>
                  </li>
                  <li>
                    <Link href="/iletisim" className="hover:text-blue-200 text-sm">
                      İletişim
                    </Link>
                  </li>
                  <li>
                    <Link href="/realitymodel" className="hover:text-blue-200 text-sm">
                      Reality Model
                    </Link>
                  </li>
                  <li>
                    <a 
                      href="/Katalog.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-blue-200 text-sm"
                    >
                      Katalog İçin Tıklayın
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Sosyal Medya</h3>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/company/pusula-muhendislik" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 text-sm">
                    LinkedIn
                  </a>
                  <a href="https://twitter.com/pusulamuh" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 text-sm">
                    Twitter
                  </a>
                  <a href="https://www.instagram.com/pusula2006" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 text-sm">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-blue-800 text-center">
              <p className="text-sm">&copy; {new Date().getFullYear()} Pusula Mühendislik. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

