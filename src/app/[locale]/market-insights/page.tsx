'use client';

import {motion} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {useRouter} from '@/i18n/routing';
import {useCallback, useEffect, useMemo, useState, Suspense} from 'react';
import {useSearchParams} from 'next/navigation';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import {marketSentiment, newsEvents} from '@/data/mockData';
import {BellIcon, NewspaperIcon, SparklesIcon, ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/outline';

// 禁用静态生成
export const dynamic = 'force-dynamic';



function MarketInsightsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedNews, setExpandedNews] = useState<Record<string, boolean>>({});

  const t = useTranslations('MarketInsights');
  const dataT = useTranslations('Data');

  const handleGenerateInsights = useCallback(() => {
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      router.push('/market-insights/detailed');
    }, 2000);
  }, [router]);

  useEffect(() => {
    const insightsParam = searchParams.get('insights');
    if (insightsParam === 'true' && !isGenerating) {
      handleGenerateInsights();
    }
  }, [handleGenerateInsights, isGenerating, searchParams]);

  const sentimentClassName = useMemo(() => {
    switch (marketSentiment.level) {
      case 'fear':
        return 'text-red-600 bg-red-50';
      case 'greed':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  }, []);

  const sentimentLabel = t(`sentiment.levels.${marketSentiment.level}`);
  const sentimentDescription = dataT(`marketSentiment.descriptions.${marketSentiment.descriptionKey}`);

  const toggleNewsExpansion = useCallback((newsId: string) => {
    setExpandedNews(prev => ({
      ...prev,
      [newsId]: !prev[newsId]
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1 initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="text-4xl font-bold text-gray-900 mb-4">
            {t('hero.title')}
          </motion.h1>
          <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="text-xl text-gray-600">
            {t('hero.subtitle')}
          </motion.p>
        </div>

        <div className="space-y-12">
          <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} transition={{delay: 0.4}}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('sentiment.title')}</h2>
              <p className="text-gray-600">{t('sentiment.subtitle')}</p>
            </div>

            <Card className="p-8">
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-24 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-t-full"></div>
                  <div className="absolute inset-2 bg-white rounded-t-full"></div>
                  <div
                    className="absolute bottom-0 left-1/2 w-1 h-20 bg-gray-800 origin-bottom transform -translate-x-1/2"
                    style={{transform: `translateX(-50%) rotate(${(marketSentiment.index - 50) * 1.8}deg)`}}
                  ></div>
                  <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-gray-800 rounded-full transform -translate-x-1/2 translate-y-2"></div>
                </div>

                <div className={`text-center p-4 rounded-lg ${sentimentClassName}`}>
                  <div className="text-3xl font-bold mb-2">
                    {marketSentiment.index} - {sentimentLabel}
                  </div>
                  <p className="text-sm">{sentimentDescription}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} transition={{delay: 0.6}}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('events.title')}</h2>
              <p className="text-gray-600">{t('events.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {newsEvents.map((event) => {
                const isExpanded = expandedNews[event.id];
                const summary = dataT(`news.events.${event.summaryKey}`);
                const shouldTruncate = summary.length > 120;
                const displaySummary = shouldTruncate && !isExpanded
                  ? summary.substring(0, 120) + '...'
                  : summary;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <Card className="h-full bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                      {/* 顶部装饰条 */}
                      <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                      <div className="p-6">
                        {/* 标题区域 */}
                        <div className="flex items-start mb-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <NewspaperIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 mb-1 text-base leading-tight group-hover:text-blue-600 transition-colors">
                              {dataT(`news.events.${event.titleKey}`)}
                            </h3>
                            <div className="flex items-center text-xs text-gray-500 mb-3">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                              {event.date}
                            </div>
                          </div>
                        </div>

                        {/* 内容区域 */}
                        <div className="mb-4">
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {displaySummary}
                          </p>
                          {shouldTruncate && (
                            <button
                              onClick={() => toggleNewsExpansion(event.id)}
                              className="mt-2 text-blue-600 hover:text-blue-800 inline-flex items-center text-sm font-medium transition-colors"
                            >
                              {isExpanded ? (
                                <>
                                  收起 <ChevronUpIcon className="w-4 h-4 ml-1" />
                                </>
                              ) : (
                                <>
                                  展开阅读 <ChevronDownIcon className="w-4 h-4 ml-1" />
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        {/* AI 洞察区域 */}
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-100">
                          <div className="flex items-center mb-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                              <SparklesIcon className="w-3 h-3 text-purple-600" />
                            </div>
                            <span className="text-sm font-semibold text-purple-800">AI 投顾建议</span>
                          </div>
                          <p className="text-purple-700 text-sm leading-relaxed">
                            {dataT(`news.events.${event.aiInsightKey}`)}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} transition={{delay: 0.8}}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('personalized.title')}</h2>
              <p className="text-gray-600">{t('personalized.subtitle')}</p>
            </div>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <BellIcon className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="font-semibold text-gray-900">{t('personalized.sectionTitle')}</h3>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800">
                  {t('personalized.message', {
                    holding: dataT('portfolio.holdings.chinaGrowthFund'),
                    rating: t('personalized.ratingUpgrade')
                  })}
                  <span className="font-semibold ml-2">{t('personalized.action')}</span>
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} transition={{delay: 1}}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('summary.title')}</h2>
              <p className="text-gray-600">{t('summary.subtitle')}</p>
            </div>

            <Card className="p-8">
              <div className="text-center mb-6">
                <Button
                  size="lg"
                  onClick={handleGenerateInsights}
                  disabled={isGenerating}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {t('summary.buttonLoading')}
                    </div>
                  ) : (
                    t('summary.buttonIdle')
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function MarketInsightsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MarketInsightsPageContent />
    </Suspense>
  );
}
