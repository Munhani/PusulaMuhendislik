'use client';

import React, { useState, Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { modelCache } from './modelCache';

/** Cloudinary cloud name: dnnelobda (env ile override edilebilir) */
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'dnnelobda';

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

/** Proxy üzerinden iframe'de açıyoruz; Cloudinary X-Frame-Options ve indirme sorununu aşar */
function ModelViewerModal({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
  const isCloudinary = url.includes('res.cloudinary.com');
  const iframeSrc = isCloudinary ? `/api/reality-model?url=${encodeURIComponent(url)}` : url;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-2 md:p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-lg shadow-xl flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-3 py-2 border-b bg-gray-100 rounded-t-lg shrink-0">
          <span className="font-medium text-gray-800">{title}</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-red-600 rounded text-2xl leading-none"
            aria-label="Kapat"
          >
            ×
          </button>
        </div>
        <div className="flex-1 min-h-[60vh] relative" style={{ minHeight: 480 }}>
          <iframe
            key={iframeSrc}
            src={iframeSrc}
            title={title}
            className="absolute inset-0 w-full h-full min-h-[480px] rounded-b-lg border-0"
            allow="fullscreen"
          />
        </div>
      </div>
    </div>
  );
}

export default function RealityModelClient() {
  const t = useTranslations('realitymodel');
  const [videoModal, setVideoModal] = useState<{ src: string; title: string } | null>(null);
  const [modelViewerUrl, setModelViewerUrl] = useState<{ url: string; title: string } | null>(null);
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
    const cachedModels = ['kiptas', 'durusu', 'esenyurt', 'haraccikayasehir', 'turkkose'];
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 max-w-6xl mx-auto">
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
                <button
                  type="button"
                  onClick={() => {
                    cacheModel('haraccikayasehir');
                    setModelViewerUrl({
                      url: process.env.NEXT_PUBLIC_HARACCI_MODEL_URL ?? '/01_Hacimasli2250628_3MX/App/index.html',
                      title: t('haracciKayasehir')
                    });
                  }}
                  className={`flex items-center justify-center h-[52px] w-full text-center bg-blue-900 text-white px-2 md:px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors text-sm md:text-base ${isModelLoaded['haraccikayasehir'] ? 'opacity-100' : 'opacity-75'}`}
                  title="Acute3D görüntüleyici"
                >
                  {t('haracciKayasehir')}
                </button>
              </Suspense>
              <button
                onClick={() => setVideoModal({ src: 'https://www.youtube.com/embed/tex2DIpYUE0', title: t('haracciKayasehir') })}
                className="flex items-center justify-center h-[52px] w-full text-center bg-red-600 text-white px-2 md:px-4 py-3 rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base"
              >
                {t('haracciKayasehir')}
              </button>
            </div>
            {/* Turkkose: Cloudinary – Pusula/01_Hacimasli2250628_3MX/App/index.html, proxy ile iframe */}
            <Suspense fallback={<ModelLoading message={t('modelLoading')} />}>
              <button
                type="button"
                onClick={() => {
                  cacheModel('turkkose');
                  setModelViewerUrl({
                    url: process.env.NEXT_PUBLIC_TURKKOSE_MODEL_URL ?? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/raw/upload/Pusula/01_Hacimasli2250628_3MX/App/index.html`,
                    title: t('turkkose')
                  });
                }}
                className={`flex items-center justify-center h-[52px] w-full text-center bg-blue-900 text-white px-2 md:px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors text-sm md:text-base ${isModelLoaded['turkkose'] ? 'opacity-100' : 'opacity-75'}`}
                title="Acute3D görüntüleyici"
              >
                {t('turkkose')}
              </button>
            </Suspense>
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

      {/* Model viewer modal – Cloudinary HTML iframe ile açılır (indirme olmaz) */}
      {modelViewerUrl && (
        <ModelViewerModal
          url={modelViewerUrl.url}
          title={modelViewerUrl.title}
          onClose={() => setModelViewerUrl(null)}
        />
      )}
    </div>
  );
} 