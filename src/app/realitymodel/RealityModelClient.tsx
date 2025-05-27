'use client';

import React, { useState } from 'react';

export default function RealityModelClient() {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 mb-6 md:mb-8">
        <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4 text-blue-800">
          Gerçeklik Modeli Nedir?
        </h2>
        <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
          Gerçeklik modeli, fiziksel dünyanın dijital bir temsilidir. Bu model, 
          nesnelerin, binaların ve çevrenin 3 boyutlu dijital kopyasını oluşturarak 
          daha iyi analiz ve planlama yapmanıza olanak tanır.
        </p>
        <div className="mt-4 md:mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            <div className="flex flex-col justify-center">
              <a 
                href="/01_KiptasKavsak_20240903_3MX/App/index.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-center bg-blue-900 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-800 transition-colors text-sm md:text-base"
              >
                Arnavutköy Kiptaş
              </a>
              <button
                onClick={() => setShowVideo(true)}
                className="block text-center bg-red-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base mt-3"
              >
                Arnavutköy Kiptaş Video
              </button>
            </div>
            <div className="flex items-start">
              <a 
                href="/01_103_1_20250416_3MX/App/index.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-center bg-blue-900 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-800 transition-colors text-sm md:text-base w-full"
              >
                Durusu
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 relative max-w-2xl w-full">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-2xl font-bold"
              aria-label="Kapat"
            >
              ×
            </button>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/pD80sTSVh84"
                title="Arnavutköy Kiptaş Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 