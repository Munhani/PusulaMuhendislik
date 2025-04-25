'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/images/BakuAirport.jpg',
    title: 'Bakü Havalimanı Kavşak Projesi',
    description: 'Modern ve Etkileyici Yol Tasarımı'
  },
  {
    id: 2,
    image: '/images/BineKavsagi.jpg',
    title: 'Bine Kavşak Projesi',
    description: 'Profesyonel Mühendislik Çözümleri'
  },
  {
    id: 3,
    image: '/images/EdirneSirpsindigiKopru.jpg',
    title: 'Edirne Sırpsındığı Köprüsü',
    description: 'Mühendislik Harikası Köprü Projesi'
  },
  {
    id: 4,
    image: '/images/FatihYayaUstGecidi.jpg',
    title: 'Fatih Yaya Üst Geçidi',
    description: 'Modern Şehir Ulaşım Çözümleri'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
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
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
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
          />
        ))}
      </div>
    </div>
  );
} 