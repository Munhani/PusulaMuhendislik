'use client';

import React, { useState, Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { modelCache } from './modelCache';

// Lazy load video modal
const VideoModal = dynamic(() => import('./VideoModal'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>,
  ssr: false
});

function ModelLoading({ message }: { message: string }) {
  return (
    <div className="animate-pulse bg-gray-200 h-64 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">{message}</div>
    </div>
  );
}

export default function RealityModelClient() {
  const t = useTranslations('realitymodel');
  const [videoModal, setVideoModal] = useState<{ src: string; title: string } | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState<{[key: string]: boolean}>({});

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
    const cachedModels = ['kiptas', 'durusu', 'esenyurt', 'haraccikayasehir'];
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
          {t('whatIs')}
        </h2>
        <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
          {t('whatIsText')}
        </p>
        <div className="mt-4 md:mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
            <div className="flex flex-col gap-3">
              <Suspense fallback={<ModelLoading message={t('modelLoading')} />}>
                <a 
                  href="/01_KiptasKavsak_20240903_3MX/App/index.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center h-[52px] w-full text-center bg-blue-900 text-white px-2 md:px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors text-sm md:text-base ${isModelLoaded['kiptas'] ? 'opacity-100' : 'opacity-75'}`}
                  onClick={() => cacheModel('kiptas')}
                >
                  {t('kiptas')}
                </a>
              </Suspense>
              <button
                onClick={() => setVideoModal({ src: 'https://www.youtube.com/embed/pD80sTSVh84', title: t('kiptasVideo') })}
                className="flex items-center justify-center h-[52px] w-full text-center bg-red-600 text-white px-2 md:px-4 py-3 rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base"
              >
                {t('kiptasVideo')}
              </button>
            </div>
            <Suspense fallback={<ModelLoading message={t('modelLoading')} />}>
              <a 
                href="/01_103_1_20250416_3MX/App/index.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center justify-center h-[52px] w-full text-center bg-blue-900 text-white px-2 md:px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors text-sm md:text-base ${isModelLoaded['durusu'] ? 'opacity-100' : 'opacity-75'}`}
                onClick={() => cacheModel('durusu')}
              >
                {t('durusu')}
              </a>
            </Suspense>
            <div className="flex flex-col gap-3">
              <Suspense fallback={<ModelLoading message={t('modelLoading')} />}>
                <a
                  href={
                    process.env.NEXT_PUBLIC_HARACCI_MODEL_URL ??
                    (process.env.NODE_ENV === 'development'
                      ? '/01_Hacimasli2250628_3MX/App/index.html'
                      : '/realitymodel/haracci')
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center h-[52px] w-full text-center bg-blue-900 text-white px-2 md:px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors text-sm md:text-base ${isModelLoaded['haraccikayasehir'] ? 'opacity-100' : 'opacity-75'}`}
                  onClick={() => cacheModel('haraccikayasehir')}
                  title="Acute3D görüntüleyici"
                >
                  {t('haracciKayasehir')}
                </a>
              </Suspense>
              <button
                onClick={() => setVideoModal({ src: 'https://www.youtube.com/embed/tex2DIpYUE0', title: t('haracciKayasehir') })}
                className="flex items-center justify-center h-[52px] w-full text-center bg-red-600 text-white px-2 md:px-4 py-3 rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base"
              >
                {t('haracciKayasehir')}
              </button>
            </div>
            <Suspense fallback={<ModelLoading message={t('modelLoading')} />}>
              <a 
                href="/01_300_5_20250315_3MX/App/index.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center justify-center h-[52px] w-full text-center bg-blue-900 text-white px-2 md:px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors text-sm md:text-base ${isModelLoaded['esenyurt'] ? 'opacity-100' : 'opacity-75'}`}
                onClick={() => cacheModel('esenyurt')}
              >
                {t('esenyurt')}
              </a>
            </Suspense>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      {videoModal && (
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>}>
          <VideoModal
            videoSrc={videoModal.src}
            videoTitle={videoModal.title}
            onClose={() => setVideoModal(null)}
          />
        </Suspense>
      )}
    </div>
  );
} 