import { getTranslations } from 'next-intl/server';

export default async function HizmetlerPage() {
  const t = await getTranslations('hizmetler');
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">{t('title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div id="haritacilik" className="bg-white rounded-lg shadow-md p-6 scroll-mt-24">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">{t('mapping')}</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• {t('mappingItem1')}</li>
            <li>• {t('mappingItem2')}</li>
            <li>• {t('mappingItem3')}</li>
          </ul>
        </div>

        <div id="kadastro" className="bg-white rounded-lg shadow-md p-6 scroll-mt-24">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">{t('cadastre')}</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• {t('cadastreItem1')}</li>
            <li>• {t('cadastreItem2')}</li>
            <li>• {t('cadastreItem3')}</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">{t('infrastructure')}</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• {t('infraItem1')}</li>
            <li>• {t('infraItem2')}</li>
            <li>• {t('infraItem3')}</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">{t('urban')}</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• {t('urbanItem1')}</li>
            <li>• {t('urbanItem2')}</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">{t('reality')}</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• {t('realityItem1')}</li>
            <li>• {t('realityItem2')}</li>
            <li>• {t('realityItem3')}</li>
            <li>• {t('realityItem4')}</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">{t('consulting')}</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• {t('consultItem1')}</li>
            <li>• {t('consultItem2')}</li>
            <li>• {t('consultItem3')}</li>
            <li>• {t('consultItem4')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 