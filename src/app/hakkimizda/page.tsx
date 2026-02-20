import { getTranslations } from 'next-intl/server';

export default async function Hakkimizda() {
  const t = await getTranslations('hakkimizda');
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-center max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {t('values')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{t('quality')}</h3>
              <p className="text-gray-600">{t('qualityText')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{t('trust')}</h3>
              <p className="text-gray-600">{t('trustText')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{t('innovation')}</h3>
              <p className="text-gray-600">{t('innovationText')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {t('history')}
          </h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">2006</h3>
              <p className="text-gray-600">{t('year2006')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">2007</h3>
              <p className="text-gray-600">{t('year2007')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">2010</h3>
              <p className="text-gray-600">{t('year2010')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 