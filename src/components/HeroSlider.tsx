'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/images/BakuAirport.jpg',
    title: 'Bakü Havalimanı Kavşak Projesi',
<<<<<<< HEAD
    description: 'Modern ve Etkileyici Yol Tasarımı',
    width: 1920,
    height: 1080
=======
    description: 'Modern ve Etkileyici Yol Tasarımı'
>>>>>>> 15482864ec85881d2236f4414271b3ec43fac266
  },
  {
    id: 2,
    image: '/images/BineKavsagi.jpg',
    title: 'Bine Kavşak Projesi',
<<<<<<< HEAD
    description: 'Profesyonel Mühendislik Çözümleri',
    width: 1920,
    height: 1080
=======
    description: 'Profesyonel Mühendislik Çözümleri'
>>>>>>> 15482864ec85881d2236f4414271b3ec43fac266
  },
  {
    id: 3,
    image: '/images/EdirneSirpsindigiKopru.jpg',
    title: 'Edirne Sırpsındığı Köprüsü',
<<<<<<< HEAD
    description: 'Mühendislik Harikası Köprü Projesi',
    width: 1920,
    height: 1080
=======
    description: 'Mühendislik Harikası Köprü Projesi'
>>>>>>> 15482864ec85881d2236f4414271b3ec43fac266
  },
  {
    id: 4,
    image: '/images/FatihYayaUstGecidi.jpg',
    title: 'Fatih Yaya Üst Geçidi',
<<<<<<< HEAD
    description: 'Modern Şehir Ulaşım Çözümleri',
    width: 1920,
    height: 1080
=======
    description: 'Modern Şehir Ulaşım Çözümleri'
>>>>>>> 15482864ec85881d2236f4414271b3ec43fac266
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden" role="region" aria-label="Proje Sliderı" aria-live="polite">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={`Pusula Mühendislik Projesi: ${slide.title} - ${slide.description}`}
              fill
<<<<<<< HEAD
              sizes="100vw"
              quality={85}
              priority={index === 0}
              className="object-cover"
              loading={index === 0 ? "eager" : "lazy"}
=======
              className="object-cover"
              priority={index === 0}
>>>>>>> 15482864ec85881d2236f4414271b3ec43fac266
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl">{slide.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Slide ${index + 1}`}
            aria-pressed={index === currentSlide}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
} 