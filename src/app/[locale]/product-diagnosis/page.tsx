'use client';

import {motion} from 'framer-motion';
import {useCallback, useEffect, useMemo, useRef, useState, Suspense} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {useRouter} from '@/i18n/routing';
import {useSearchParams} from 'next/navigation';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer
} from 'recharts';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import {productDiagnosisData} from '@/data/mockData';
import {ChartBarIcon, DocumentTextIcon, MagnifyingGlassIcon, StarIcon} from '@heroicons/react/24/outline';

const TOTAL_STEPS = 2;

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

function ProductDiagnosisPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const t = useTranslations('ProductDiagnosis');
  const dataT = useTranslations('Data');

  const [searchQuery, setSearchQuery] = useState('');
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [maxCompletedStep, setMaxCompletedStep] = useState(1);

  const inputSectionRef = useRef<HTMLDivElement>(null);
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const productName = dataT(`productDiagnosis.names.${productDiagnosisData.productNameKey}`);
  const productSummary = dataT(`productDiagnosis.summaries.${productDiagnosisData.summaryKey}`);

  const scrollToStep = useCallback((step: number) => {
    const targetRef = step === 1 ? inputSectionRef : resultsSectionRef;

    const scrollFn = () => targetRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(scrollFn);
    } else {
      scrollFn();
    }
  }, []);

  const updateQueryStep = useCallback(
    (step: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (step <= 1) {
        params.delete('step');
      } else {
        params.set('step', step.toString());
      }

      const query = params.toString();
      router.replace(`/product-diagnosis${query ? `?${query}` : ''}`, {locale});
    },
    [locale, router, searchParams]
  );

  const navigateToStep = useCallback(
    (step: number) => {
      if (step < 1 || step > TOTAL_STEPS) return;
      setCurrentStep(step);
      updateQueryStep(step);
      scrollToStep(step);
    },
    [scrollToStep, updateQueryStep]
  );

  const unlockAndNavigate = useCallback(
    (step: number) => {
      setMaxCompletedStep((previous) => Math.max(previous, step));
      navigateToStep(step);
    },
    [navigateToStep]
  );

  const handleStepNavigation = useCallback(
    (step: number) => {
      if (step > maxCompletedStep) return;
      navigateToStep(step);
    },
    [maxCompletedStep, navigateToStep]
  );

  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (!stepParam) {
      setCurrentStep(1);
      return;
    }

    const parsed = Number.parseInt(stepParam, 10);
    if (Number.isFinite(parsed) && parsed >= 1 && parsed <= TOTAL_STEPS) {
      setCurrentStep(parsed);
      setMaxCompletedStep((previous) => Math.max(previous, parsed));
      if (parsed >= 2) {
        setShowDiagnosis(true);
        setIsAnalyzing(false);
      }
      scrollToStep(parsed);
    }
  }, [scrollToStep, searchParams]);

  const handleDiagnosis = () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      setSearchQuery(dataT(`productDiagnosis.names.${productDiagnosisData.productNameKey}`));
    }

    setIsAnalyzing(true);
    setShowDiagnosis(false);
    unlockAndNavigate(2);

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowDiagnosis(true);
    }, 2000);
  };

  const stepNavigation = useMemo(
    () => [
      {index: 1, label: t('steps.input')},
      {index: 2, label: t('steps.report')}
    ],
    [t]
  );

  const scoreColorClasses = useMemo(() => {
    if (productDiagnosisData.overallScore >= 8) return 'text-green-600 bg-green-50';
    if (productDiagnosisData.overallScore >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  }, []);

  const radarData = useMemo(() => {
    const metrics = productDiagnosisData.recommendations[0]?.comparisonMetrics;
    if (!metrics) return [] as Array<{subject: string; current: number; recommended: number}>;

    return [
      {
        subject: t('analysis.radar.performance'),
        current: 7.5,
        recommended: metrics.performance
      },
      {
        subject: t('analysis.radar.risk'),
        current: 6.8,
        recommended: metrics.risk
      },
      {
        subject: t('analysis.radar.cost'),
        current: 5.5,
        recommended: metrics.cost
      },
      {
        subject: t('analysis.radar.liquidity'),
        current: 8.0,
        recommended: metrics.liquidity
      }
    ];
  }, [t]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1 initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="text-4xl font-bold text-gray-900 mb-4">
            {t('hero.title')}
          </motion.h1>
          <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="text-xl text-gray-600">
            {t('hero.subtitle')}
          </motion.p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex space-x-8">
            {stepNavigation.map((step) => {
              const isActive = currentStep === step.index;
              const isAvailable = maxCompletedStep >= step.index;
              const baseTextClass = isActive ? 'text-blue-600' : isAvailable ? 'text-gray-500 hover:text-blue-600' : 'text-gray-300';
              const circleClass = isActive
                ? 'bg-blue-600 text-white'
                : isAvailable
                ? 'bg-gray-200 text-gray-600'
                : 'bg-gray-100 text-gray-400';

              return (
                <button
                  key={step.index}
                  type="button"
                  disabled={!isAvailable && step.index !== 1}
                  className={`flex items-center focus:outline-none ${baseTextClass} ${
                    !isAvailable && step.index !== 1 ? 'cursor-not-allowed' : ''
                  }`}
                  onClick={() => (isAvailable || step.index === 1) && handleStepNavigation(step.index)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mr-3 ${circleClass}`}>
                    {step.index}
                  </div>
                  <span className="font-medium">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-12">
          {currentStep === 1 && (
            <motion.section
              ref={inputSectionRef}
              initial={{opacity: 0, y: 40}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.2}}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('search.title')}</h2>
                <p className="text-gray-600">{t('search.subtitle')}</p>
              </div>

              <Card className="p-8">
                <div className="max-w-2xl mx-auto">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('search.placeholder', {
                        example: dataT('productDiagnosis.names.huaxiaGrowthFund')
                      })}
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') handleDiagnosis();
                      }}
                    />
                  </div>
                  <div className="text-center mt-6">
                    <Button
                      size="lg"
                      onClick={handleDiagnosis}
                      disabled={isAnalyzing}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isAnalyzing ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          {t('search.loading')}
                        </div>
                      ) : (
                        t('search.cta')
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.section>
          )}

          {currentStep >= 2 && (
            <motion.section
              ref={resultsSectionRef}
              initial={{opacity: 0, y: 40}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.3}}
              className="space-y-12"
            >
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('analysis.title', {name: productName})}</h2>
                  <p className="text-gray-600">{t('analysis.subtitle')}</p>
                </div>

                <Card className="p-8 space-y-8">
                  {isAnalyzing && !showDiagnosis ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                      <p className="text-gray-600 mt-4">{t('search.loading')}</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className={`p-6 rounded-lg ${scoreColorClasses}`}>
                          <div className="text-sm text-gray-600 mb-2">{t('analysis.overview.overallScore')}</div>
                          <div className="text-3xl font-bold">{productDiagnosisData.overallScore.toFixed(1)}</div>
                        </div>
                        <div className="p-6 rounded-lg bg-blue-50">
                          <div className="text-sm text-gray-600 mb-2">{t('analysis.overview.recommendedRating')}</div>
                          <div className="text-3xl font-bold text-blue-600">{t('analysis.overview.recommendation')}</div>
                        </div>
                        <div className="p-6 rounded-lg bg-purple-50">
                          <div className="text-sm text-gray-600 mb-2">{t('analysis.overview.riskLevel')}</div>
                          <div className="text-3xl font-bold text-purple-600">{productDiagnosisData.risk.riskLevel.toFixed(1)}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <DocumentTextIcon className="w-5 h-5 text-blue-600 mr-2" />
                            {t('analysis.summaryTitle')}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">{productSummary}</p>

                          <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-lg bg-green-50">
                              <div className="text-sm text-gray-600">{t('analysis.metrics.performance')}</div>
                              <div className="text-lg font-semibold text-green-700">{productDiagnosisData.performance.annualReturn}%</div>
                            </div>
                            <div className="p-4 rounded-lg bg-red-50">
                              <div className="text-sm text-gray-600">{t('analysis.metrics.maxDrawdown')}</div>
                              <div className="text-lg font-semibold text-red-700">{productDiagnosisData.performance.maxDrawdown}%</div>
                            </div>
                            <div className="p-4 rounded-lg bg-yellow-50">
                              <div className="text-sm text-gray-600">{t('analysis.metrics.volatility')}</div>
                              <div className="text-lg font-semibold text-yellow-700">{productDiagnosisData.performance.volatility}%</div>
                            </div>
                            <div className="p-4 rounded-lg bg-indigo-50">
                              <div className="text-sm text-gray-600">{t('analysis.metrics.sharpe')}</div>
                              <div className="text-lg font-semibold text-indigo-700">{productDiagnosisData.performance.sharpeRatio}</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <ChartBarIcon className="w-5 h-5 text-purple-600 mr-2" />
                            {t('analysis.radar.title')}
                          </h3>
                          <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="80%">
                                <PolarGrid stroke="#E5E7EB" />
                                <PolarAngleAxis dataKey="subject" tick={{fill: '#4B5563', fontSize: 12}} />
                                <PolarRadiusAxis angle={30} domain={[0, 10]} tickCount={6} stroke="#E5E7EB" tick={{fill: '#9CA3AF', fontSize: 10}} />
                                <Radar
                                  name={t('analysis.radar.current')}
                                  dataKey="current"
                                  stroke="#60A5FA"
                                  fill="#60A5FA"
                                  fillOpacity={0.3}
                                />
                                <Radar
                                  name={t('analysis.radar.recommended')}
                                  dataKey="recommended"
                                  stroke="#A855F7"
                                  fill="#A855F7"
                                  fillOpacity={0.3}
                                />
                              </RadarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </Card>
              </div>

              {showDiagnosis && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('recommendations.title')}</h2>
                    <p className="text-gray-600">{t('recommendations.subtitle')}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {productDiagnosisData.recommendations.map((recommendation) => (
                      <Card key={recommendation.nameKey} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                              <StarIcon className="w-5 h-5 text-amber-500 mr-2" />
                              {dataT(`productDiagnosis.names.${recommendation.nameKey}`)}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {t('recommendations.scoreLabel', {score: recommendation.score.toFixed(1)})}
                            </p>
                          </div>
                          <div className="text-2xl font-bold text-blue-600">{recommendation.score.toFixed(1)}</div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('recommendations.advantagesTitle')}</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            {recommendation.advantagesKeys.map((advKey) => (
                              <li key={advKey}>{dataT(`productDiagnosis.advantages.${advKey}`)}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-blue-50">
                            <div className="text-xs text-gray-500">{t('recommendations.metrics.performance')}</div>
                            <div className="text-sm font-semibold text-blue-600">{recommendation.comparisonMetrics.performance.toFixed(1)}</div>
                          </div>
                          <div className="p-3 rounded-lg bg-green-50">
                            <div className="text-xs text-gray-500">{t('recommendations.metrics.risk')}</div>
                            <div className="text-sm font-semibold text-green-600">{recommendation.comparisonMetrics.risk.toFixed(1)}</div>
                          </div>
                          <div className="p-3 rounded-lg bg-amber-50">
                            <div className="text-xs text-gray-500">{t('recommendations.metrics.cost')}</div>
                            <div className="text-sm font-semibold text-amber-600">{recommendation.comparisonMetrics.cost.toFixed(1)}</div>
                          </div>
                          <div className="p-3 rounded-lg bg-purple-50">
                            <div className="text-xs text-gray-500">{t('recommendations.metrics.liquidity')}</div>
                            <div className="text-sm font-semibold text-purple-600">{recommendation.comparisonMetrics.liquidity.toFixed(1)}</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductDiagnosisPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDiagnosisPageContent />
    </Suspense>
  );
}
