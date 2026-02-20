import RealityModelClient from './RealityModelClient';
import { getTranslations } from 'next-intl/server';

export default async function RealityModel() {
  const t = await getTranslations('realitymodel');
  return (
    <main className="min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12 text-blue-900">
          {t('title')}
        </h1>
        <RealityModelClient />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-blue-800">
              {t('advantages')}
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-start"><span className="text-blue-900 mr-2">•</span><span className="text-sm md:text-base">{t('adv1')}</span></li>
              <li className="flex items-start"><span className="text-blue-900 mr-2">•</span><span className="text-sm md:text-base">{t('adv2')}</span></li>
              <li className="flex items-start"><span className="text-blue-900 mr-2">•</span><span className="text-sm md:text-base">{t('adv3')}</span></li>
              <li className="flex items-start"><span className="text-blue-900 mr-2">•</span><span className="text-sm md:text-base">{t('adv4')}</span></li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-blue-800">
              {t('useCases')}
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-start"><span className="text-blue-900 mr-2">•</span><span className="text-sm md:text-base">{t('use1')}</span></li>
              <li className="flex items-start"><span className="text-blue-900 mr-2">•</span><span className="text-sm md:text-base">{t('use2')}</span></li>
              <li className="flex items-start"><span className="text-blue-900 mr-2">•</span><span className="text-sm md:text-base">{t('use3')}</span></li>
              <li className="flex items-start"><span className="text-blue-900 mr-2">•</span><span className="text-sm md:text-base">{t('use4')}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
} 