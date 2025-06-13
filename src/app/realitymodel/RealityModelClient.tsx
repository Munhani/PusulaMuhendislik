'use client';

import React, { useState, Suspense, lazy, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { modelCache } from './modelCache';

// Lazy load video modal
const VideoModal = dynamic(() => import('./VideoModal'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>,
  ssr: false
});

// Model yükleme durumu için loading component
const ModelLoading = () => (
  <div className="animate-pulse bg-gray-200 h-64 rounded-lg flex items-center justify-center">
    <div className="text-gray-500">Model yükleniyor...</div>
  </div>
);

export default function RealityModelClient() {
  const [showVideo, setShowVideo] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState<{[key: string]: boolean}>({});

  // Model önbelleğe alma fonksiyonu
  const cacheModel = (modelId: string) => {
    if (!modelCache.has(modelId)) {
      modelCache.set(modelId, { loaded: true });
      setIsModelLoaded(prev => ({
        ...prev,
        [modelId]: true
      }));
    }
  };

  // Sayfa yüklendiğinde önbellekteki modelleri kontrol et
  useEffect(() => {
    const cachedModels = ['kiptas', 'durusu', 'esenyurt'];
    cachedModels.forEach(modelId => {
      if (modelCache.has(modelId)) {
        setIsModelLoaded(prev => ({
          ...prev,
          [modelId]: true
        }));
      }
    });
  }, []);

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
              <Suspense fallback={<ModelLoading />}>
                <a 
                  href="/01_KiptasKavsak_20240903_3MX/App/index.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`block text-center bg-blue-900 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-800 transition-colors text-sm md:text-base ${isModelLoaded['kiptas'] ? 'opacity-100' : 'opacity-75'}`}
                  onClick={() => cacheModel('kiptas')}
                >
                  Arnavutköy Kiptaş
                </a>
              </Suspense>
              <button
                onClick={() => setShowVideo(true)}
                className="block text-center bg-red-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base mt-3"
              >
                Arnavutköy Kiptaş Video
              </button>
            </div>
            <div className="flex flex-col justify-center gap-3">
              <Suspense fallback={<ModelLoading />}>
                <a 
                  href="/01_103_1_20250416_3MX/App/index.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`block text-center bg-blue-900 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-800 transition-colors text-sm md:text-base w-full ${isModelLoaded['durusu'] ? 'opacity-100' : 'opacity-75'}`}
                  onClick={() => cacheModel('durusu')}
                >
                  Durusu
                </a>
              </Suspense>
              <Suspense fallback={<ModelLoading />}>
                <a 
                  href="/01_300_5_20250315_3MX/App/index.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`block text-center bg-blue-900 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-800 transition-colors text-sm md:text-base w-full ${isModelLoaded['esenyurt'] ? 'opacity-100' : 'opacity-75'}`}
                  onClick={() => cacheModel('esenyurt')}
                >
                  Esenyurt
                </a>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      {showVideo && (
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>}>
          <VideoModal onClose={() => setShowVideo(false)} />
        </Suspense>
      )}
    </div>
  );
} 