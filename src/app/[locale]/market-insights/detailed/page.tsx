'use client';

import {motion} from 'framer-motion';
import {useRouter} from '@/i18n/routing';
import {useLocale, useTranslations} from 'next-intl';
import {useState} from 'react';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import {detailedNewsInsights} from '@/data/mockData';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

const insightIcon = (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

export default function DetailedMarketInsightsPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('MarketInsightsDetailed');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const handleContinueGenerate = () => {
    console.info(t('actions.logMessage'));
  };

  const generatedAt = new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'zh-CN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date());

  const getLocalizedText = (value: {zh: string; ja: string}) => (locale === 'ja' ? value.ja : value.zh);

  const sections: Array<{
    key: keyof typeof detailedNewsInsights;
    borderClass: string;
    bgClass: string;
    textClass: string;
  }> = [
    {
      key: 'macroPolicy',
      borderClass: 'border-blue-500',
      bgClass: 'bg-blue-50',
      textClass: 'text-blue-800'
    },
    {
      key: 'industryGeopolitics',
      borderClass: 'border-purple-500',
      bgClass: 'bg-purple-50',
      textClass: 'text-purple-800'
    },
    {
      key: 'techRegulationSecurity',
      borderClass: 'border-amber-500',
      bgClass: 'bg-amber-50',
      textClass: 'text-amber-800'
    },
    {
      key: 'laborMarketStructure',
      borderClass: 'border-emerald-500',
      bgClass: 'bg-emerald-50',
      textClass: 'text-emerald-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push('/market-insights')}
                className="flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{t('header.back')}</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('header.title')}</h1>
                <p className="text-gray-600">{t('header.subtitle')}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">{t('header.generatedAt', {timestamp: generatedAt})}</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="space-y-12">
          {sections.map((section, index) => {
            const items = detailedNewsInsights[section.key];
            return (
              <motion.div key={section.key} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: index * 0.1}}>
                <Card className="p-10 shadow-xl">
                  <div className={`border-l-6 ${section.borderClass} pl-8`}>
                    {/* 标题区域 */}
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        {t(`sections.${section.key}.title`)}
                      </h2>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {t(`sections.${section.key}.subtitle`)}
                      </p>
                    </div>

                    {/* 新闻卡片网格 - 改为更宽松的布局 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {items.map((item, itemIndex) => {
                        const itemKey = `${section.key}-${itemIndex}`;
                        const isExpanded = Boolean(expandedItems[itemKey]);
                        return (
                          <div key={itemKey} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                            {/* 新闻标题和日期 */}
                            <div className="mb-4">
                              <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">
                                {getLocalizedText(item.title)}
                              </h3>
                              <span className="text-sm text-gray-500 font-medium">
                                {t('sections.shared.publishedAt', {
                                  date: getLocalizedText(item.date)
                                })}
                              </span>
                            </div>

                            {/* 新闻摘要 */}
                            <div className="mb-4">
                              <p className={`text-base text-gray-700 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                                {getLocalizedText(item.summary)}
                              </p>
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedItems((prev) => ({
                                    ...prev,
                                    [itemKey]: !isExpanded
                                  }))
                                }
                                className="text-sm text-blue-600 hover:text-blue-700 font-semibold mt-2 inline-flex items-center"
                              >
                                {isExpanded ? t('sections.shared.collapse') : t('sections.shared.expand')}
                                <svg className={`ml-1 w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            </div>

                            {/* AI 建议区域 */}
                            <div className={`${section.bgClass} p-4 rounded-lg border-l-4 ${section.borderClass}`}>
                              <div className={`text-sm font-bold ${section.textClass} mb-3 flex items-center`}>
                                {insightIcon}
                                <span className="ml-2">{t('sections.shared.aiLabel')}</span>
                              </div>
                              <p className="text-sm text-gray-800 leading-relaxed">
                                {getLocalizedText(item.aiAdvice)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}

          {/* 操作按钮区域 */}
          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: sections.length * 0.1}}>
            <Card className="p-10 text-center shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('actions.title')}</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{t('actions.subtitle')}</p>
              <div className="flex justify-center flex-wrap gap-6">
                <Button size="lg" onClick={handleContinueGenerate} className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg">
                  {t('actions.continue')}
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push('/market-insights')} className="px-8 py-4 text-lg">
                  {t('actions.back')}
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
