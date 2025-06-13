import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Pusula Mühendislik | Profesyonel Mühendislik ve Haritacılık Çözümleri",
    template: "%s | Pusula Mühendislik"
  },
  description: "Pusula Mühendislik, profesyonel mühendislik ve haritacılık hizmetleri sunan, yenilikçi ve sürdürülebilir çözümler üreten bir firmadır.",
  keywords: "mühendislik, haritacılık, inşaat, altyapı, endüstriyel tesis, çevre, sürdürülebilirlik",
  authors: [{ name: "Pusula Mühendislik" }],
  creator: "Pusula Mühendislik",
  publisher: "Pusula Mühendislik",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://pusulamuhendislik.com",
    siteName: "Pusula Mühendislik",
    title: "Pusula Mühendislik | Profesyonel Mühendislik ve Haritacılık Çözümleri",
    description: "Pusula Mühendislik, profesyonel mühendislik ve haritacılık hizmetleri sunan, yenilikçi ve sürdürülebilir çözümler üreten bir firmadır.",
    images: [
      {
        url: "/images/PusulaLogo.png",
        width: 400,
        height: 400,
        alt: "Pusula Mühendislik Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pusula Mühendislik | Profesyonel Mühendislik ve Haritacılık Çözümleri",
    description: "Pusula Mühendislik, profesyonel mühendislik ve haritacılık hizmetleri sunan, yenilikçi ve sürdürülebilir çözümler üreten bir firmadır.",
    images: ["/images/PusulaLogo.png"]
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
}; 