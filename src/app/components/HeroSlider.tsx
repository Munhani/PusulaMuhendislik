"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Profesyonel Mühendislik Çözümleri",
    description: "Yenilikçi ve sürdürülebilir projelerle geleceği şekillendiriyoruz.",
    bgColor: "bg-gradient-to-r from-blue-900 to-blue-700",
  },
  {
    id: 2,
    title: "Haritacılık Hizmetleri",
    description: "Modern teknolojilerle hassas ölçüm ve haritalama çözümleri.",
    bgColor: "bg-gradient-to-r from-blue-800 to-blue-600",
  },
  {
    id: 3,
    title: "Altyapı Projeleri",
    description: "Güvenilir ve dayanıklı altyapı çözümleri ile şehirleri güçlendiriyoruz.",
    bgColor: "bg-gradient-to-r from-blue-700 to-blue-500",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{ opacity: 1 }}
      >
        <div className={`absolute inset-0 ${slides[currentSlide].bgColor}`} />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-white">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Önceki slayt"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Sonraki slayt"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white w-6"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`${index + 1}. slayta git`}
            aria-current={currentSlide === index ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
} 