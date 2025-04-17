'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/images/BakuAirport.jpg',
    title: 'Bakü Havalimanı Kavşak Projesi',
    description: 'Modern ve Etkileyici Yol Tasarımı',
  },
  {
    id: 2,
    image: '/images/BineKavsagi.jpg',
    title: 'Bine Kavşak Projesi',
    description: 'Profesyonel Mühendislik Çözümleri',
  },
  {
    id: 3,
    image: '/images/EdirneSirpsindigiKopru.jpg',
    title: 'Edirne Sırpsındığı Köprüsü',
    description: 'Mühendislik Harikası Köprü Projesi',
  },
  {
    id: 4,
    image: '/images/FatihYayaUstGecidi.jpg',
    title: 'Fatih Yaya Üst Geçidi',
    description: 'Modern Şehir Ulaşım Çözümleri',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isDragging]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setCurrentX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = startX - currentX;
    const threshold = 50; // minimum kaydırma mesafesi

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Sola kaydırma
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        // Sağa kaydırma
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      ref={sliderRef}
      className="relative h-[600px] overflow-hidden"
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: isDragging ? `translateX(${currentX - startX}px)` : 'none',
            transition: isDragging ? 'none' : 'transform 0.5s ease-in-out'
          }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="100vw"
            quality={100}
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/40">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl">{slide.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Önceki slayt"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Sonraki slayt"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
} 