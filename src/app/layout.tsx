import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import Image from "next/image";
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

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
          <nav className="container mx-auto px-4 py-2 md:py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/PusulaLogo.png"
                  alt="Pusula Mühendislik Logo"
                  width={200}
                  height={200}
                  className="mr-2 w-32 md:w-48"
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
        <main className="flex-grow pt-[200px] md:pt-[250px]">{children}</main>

        {/* Footer */}
        <footer className="bg-blue-900 text-white py-4 md:py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              <div>
                <div className="flex items-center mb-2 md:mb-4">
                  <Image
                    src="/images/PusulaLogo.png"
                    alt="Pusula Mühendislik Logo"
                    width={150}
                    height={150}
                    className="mr-2 w-24 md:w-32"
                  />
                </div>
                <p className="text-xs md:text-sm">Karlıbayır Mahallesi Selçuklu Caddesi No:5 D:11</p>
                <p className="text-xs md:text-sm">Arnavutköy/İstanbul</p>
                <p className="text-xs md:text-sm">İş: +90 212 597 97 00</p>
                <p className="text-xs md:text-sm">Cep: +90 533 490 29 85</p>
                <p className="text-xs md:text-sm">tsivri@pusulamuhendislik.com</p>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold mb-2 md:mb-4">Hızlı Bağlantılar</h3>
                <ul className="space-y-1 md:space-y-2">
                  <li>
                    <Link href="/hakkimizda" className="hover:text-blue-200 text-xs md:text-sm">
                      Hakkımızda
                    </Link>
                  </li>
                  <li>
                    <Link href="/hizmetler" className="hover:text-blue-200 text-xs md:text-sm">
                      Hizmetler
                    </Link>
                  </li>
                  <li>
                    <Link href="/iletisim" className="hover:text-blue-200 text-xs md:text-sm">
                      İletişim
                    </Link>
                  </li>
                  <li>
                    <Link href="/realitymodel" className="hover:text-blue-200 text-xs md:text-sm">
                      Reality Model
                    </Link>
                  </li>
                  <li>
                    <a 
                      href="/Katalog.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-blue-200 text-xs md:text-sm"
                    >
                      Katalog İçin Tıklayın
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex flex-col items-center">
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-4">Sosyal Medya</h3>
                  <div className="flex justify-center space-x-6">
                    <a 
                      href="https://www.linkedin.com/company/pusula-muhendislik" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#0077B5] hover:text-[#005582] text-xl md:text-2xl transition-colors"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                    <a 
                      href="https://twitter.com/pusulamuh" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#1DA1F2] hover:text-[#0c85d0] text-xl md:text-2xl transition-colors"
                      aria-label="Twitter"
                    >
                      <FaTwitter />
                    </a>
                    <a 
                      href="https://www.instagram.com/pusula2006" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#E4405F] hover:text-[#c13552] text-xl md:text-2xl transition-colors"
                      aria-label="Instagram"
                    >
                      <FaInstagram />
                    </a>
                    <a 
                      href="https://www.youtube.com/@PusulaMuhendislik" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#FF0000] hover:text-[#cc0000] text-xl md:text-2xl transition-colors"
                      aria-label="YouTube"
                    >
                      <FaYoutube />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-8 pt-2 md:pt-4 border-t border-blue-800 text-center">
              <p className="text-xs md:text-sm">&copy; {new Date().getFullYear()} Pusula Mühendislik. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

