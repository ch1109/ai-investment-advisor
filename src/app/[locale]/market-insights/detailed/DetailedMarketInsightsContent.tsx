'use client';

import {motion} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import {detailedNewsInsights} from '@/data/mockData';

export default function DetailedMarketInsightsContent() {
  const [mounted, setMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const router = useRouter();
  
  // Hooks必须在组件顶部调用
  const locale = useLocale();
  const t = useTranslations('MarketInsightsDetailed');
  const planningT = useTranslations('InvestmentPlanning');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">加载中...</h2>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleContinueGenerate = () => {
    console.info(t('actions.logMessage'));
  };

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const generatedAt = new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'zh-CN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date());

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // 合并所有分类的新闻数据，并添加分类信息
  const categoryLabels = {
    macroPolicy: t('sections.macroPolicy.title'),
    industryGeopolitics: t('sections.industryGeopolitics.title'),
    techRegulationSecurity: t('sections.techRegulationSecurity.title'),
    laborMarketStructure: t('sections.laborMarketStructure.title')
  };

  const allInsights = [
    ...(detailedNewsInsights.macroPolicy || []).map(item => ({ ...item, category: 'macroPolicy' })),
    ...(detailedNewsInsights.industryGeopolitics || []).map(item => ({ ...item, category: 'industryGeopolitics' })),
    ...(detailedNewsInsights.techRegulationSecurity || []).map(item => ({ ...item, category: 'techRegulationSecurity' })),
    ...(detailedNewsInsights.laborMarketStructure || []).map(item => ({ ...item, category: 'laborMarketStructure' }))
  ];
  const insights = allInsights;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {t('header.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t('header.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Button
              onClick={handleBack}
              variant="outline"
              className="w-full sm:w-auto px-8 py-3 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300"
            >
              {t('actions.back')}
            </Button>
            <Button
              onClick={handleContinueGenerate}
              className="w-full sm:w-auto px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t('actions.continue')}
            </Button>
          </div>
          <p className="text-sm text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
            {t('header.generatedAt', { timestamp: generatedAt })}
          </p>
        </motion.div>

        {/* Insights Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {insights.map((insight, index) => {
            const insightId = `insight-${index}`;
            const currentLocale = locale === 'ja' ? 'ja' : 'zh';

            return (
              <motion.div
                key={insightId}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: index * 0.1}}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <div className="p-8">
                    {/* 标签区域 */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {t('sections.shared.insight')}
                      </span>
                      {(insight as any).category && (
                        <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
                          {categoryLabels[(insight as any).category] || t('sections.shared.other')}
                        </span>
                      )}
                    </div>

                    {/* 标题 */}
                    <h3 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
                      {insight.title[currentLocale]}
                    </h3>

                    {/* 摘要 */}
                    <p className={`text-gray-600 mb-6 leading-relaxed ${
                      expandedItems[insightId] ? '' : 'line-clamp-4'
                    }`}>
                      {insight.summary[currentLocale]}
                    </p>

                    {/* AI建议 */}
                    {expandedItems[insightId] && (
                      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-400">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">AI 投顾建议</h4>
                        <p className="text-sm text-blue-800 leading-relaxed">
                          {insight.aiAdvice[currentLocale]}
                        </p>
                      </div>
                    )}

                    {/* 展开/收起按钮 */}
                    <button
                      onClick={() => toggleExpanded(insightId)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-6 hover:underline transition-colors"
                    >
                      {expandedItems[insightId] ? t('sections.shared.collapse') : t('sections.shared.expand')}
                    </button>

                    {/* 底部信息 */}
                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          {t('sections.shared.aiAnalysis')}
                        </span>
                        <span className="font-medium">{insight.date[currentLocale]}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Action Section */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.5}}
          className="mt-16 text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-0 shadow-xl">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('actions.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                {t('actions.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  onClick={handleContinueGenerate}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t('actions.continue')}
                </Button>
                <Button
                  onClick={() => router.push('/investment-planning')}
                  variant="outline"
                  className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300"
                >
                  {planningT('navigation.startDemo')}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
