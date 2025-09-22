'use client';

import {motion} from 'framer-motion';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import dynamicImport from 'next/dynamic';
import {useLocale, useTranslations, useMessages} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/routing';
import {useSearchParams} from 'next/navigation';
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import Button from '@/components/ui/Button';
import {planningResult} from '@/data/mockData';
import {PlanningResult, ProductRecommendation, ProductRecommendations} from '@/types';

const GOAL_OPTIONS = [
  {id: 'retirement', icon: '🏖️', isPopular: true},
  {id: 'house', icon: '🏠', isPopular: true},
  {id: 'education', icon: '🎓', isPopular: false},
  {id: 'travel', icon: '✈️', isPopular: false},
  {id: 'business', icon: '💼', isPopular: false},
  {id: 'emergency', icon: '🛡️', isPopular: false}
] as const;

const AMOUNT_OPTIONS = [
  {id: '50'},
  {id: '100'},
  {id: '200', defaultSelected: true},
  {id: '500'},
  {id: '1000'},
  {id: '2000'},
  {id: '5000'},
  {id: 'custom'}
] as const;

const AGE_OPTIONS = [
  {id: '20_25'},
  {id: '26_30', defaultSelected: true},
  {id: '31_35'},
  {id: '36_40'},
  {id: '41_50'},
  {id: '50_plus'}
] as const;

const RISK_OPTIONS = [
  {id: 'conservative', icon: '🛡️'},
  {id: 'balanced', icon: '⚖️', defaultSelected: true},
  {id: 'aggressive', icon: '🚀'}
] as const;

const TOTAL_STEPS = 2;

type GoalOptionId = (typeof GOAL_OPTIONS)[number]['id'];
type AmountOptionId = (typeof AMOUNT_OPTIONS)[number]['id'];
type AgeOptionId = (typeof AGE_OPTIONS)[number]['id'];
type RiskOptionId = (typeof RISK_OPTIONS)[number]['id'];

// 禁用静态生成
export const dynamic = 'force-dynamic';



function InvestmentPlanningPageContentOriginal() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const searchParams = useSearchParams();

  const t = useTranslations('InvestmentPlanning');
  const dataT = useTranslations('Data');
  const messages = useMessages() as Record<string, unknown>;

  // 提取 InvestmentPlanning 消息以避免复杂的依赖表达式
  const investmentPlanningMessages = useMemo(() => {
    return (messages?.InvestmentPlanning as Record<string, unknown>) || {};
  }, [messages?.InvestmentPlanning]);

  const [currentStep, setCurrentStep] = useState(1);
  const [maxCompletedStep, setMaxCompletedStep] = useState(1);
  const [sliderValue, setSliderValue] = useState(3500);
  const [selectedGoal, setSelectedGoal] = useState<GoalOptionId>('house');
  const [selectedAmount, setSelectedAmount] = useState<AmountOptionId>('200');
  const [selectedAge, setSelectedAge] = useState<AgeOptionId>('26_30');
  const [selectedRisk, setSelectedRisk] = useState<RiskOptionId>('balanced');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [personalizedResult, setPersonalizedResult] = useState<PlanningResult>(planningResult);

  const stepOneRef = useRef<HTMLDivElement>(null);
  const stepTwoRef = useRef<HTMLDivElement>(null);

  // 生成个性化投资推荐
  const generatePersonalizedRecommendation = useCallback((): PlanningResult => {
    // 根据风险偏好调整资产配置
    const riskAdjustments = {
      conservative: { equity: 25, bond: 45, money: 25, alternative: 5 },
      balanced: { equity: 40, bond: 30, money: 20, alternative: 10 },
      aggressive: { equity: 60, bond: 20, money: 10, alternative: 10 }
    };

    // 根据年龄调整成功率
    const ageAdjustments = {
      '20_25': 90,
      '26_30': 85,
      '31_35': 82,
      '36_40': 80,
      '41_50': 78,
      '50_plus': 75
    };

    // 根据目标金额调整月定投
    const amountAdjustments = {
      '50': 1500,
      '100': 2500,
      '200': 3500,
      '500': 6000,
      '1000': 8500,
      '2000': 12000,
      '5000': 20000,
      'custom': 3500
    };

    // 从翻译中获取产品推荐数据
    const getProductRecommendations = (riskLevel: string): ProductRecommendations => {
      try {
        // 直接从 messages 对象获取产品数据
        const step2Data = (investmentPlanningMessages?.step2 as Record<string, unknown>) || {};
        const productsData = (step2Data?.products as Record<string, unknown>) || {};
        const products = productsData?.[riskLevel] as Record<string, unknown[]> | undefined;

        if (!products) {
          return {
            equityFunds: [],
            bondFunds: [],
            moneyMarket: [],
            alternative: []
          };
        }

        return {
          equityFunds: (products?.equityFunds as ProductRecommendation[]) || [],
          bondFunds: (products?.bondFunds as ProductRecommendation[]) || [],
          moneyMarket: (products?.moneyMarket as ProductRecommendation[]) || [],
          alternative: (products?.alternative as ProductRecommendation[]) || []
        };
      } catch (error) {
        console.error('Error loading product recommendations:', error);
        // 返回空数组作为后备
        return {
          equityFunds: [],
          bondFunds: [],
          moneyMarket: [],
          alternative: []
        };
      }
    };

    const riskConfig = riskAdjustments[selectedRisk];
    const successRate = ageAdjustments[selectedAge] || 85;
    const monthlyInvestment = amountAdjustments[selectedAmount] || 3500;
    const recommendations = getProductRecommendations(selectedRisk);

    return {
      successRate,
      monthlyInvestment,
      riskLevelKey: selectedRisk,
      riskLevel: dataT(`riskLevels.${selectedRisk}`),
      assetAllocation: [
        {labelKey: 'equityFunds', label: '股票基金', percentage: riskConfig.equity, color: '#3B82F6'},
        {labelKey: 'bondFunds', label: '债券基金', percentage: riskConfig.bond, color: '#10B981'},
        {labelKey: 'moneyMarket', label: '货币基金', percentage: riskConfig.money, color: '#F59E0B'},
        {labelKey: 'alternative', label: '另类投资', percentage: riskConfig.alternative, color: '#8B5CF6'}
      ],
      projectionData: planningResult.projectionData, // 使用原有的预测数据
      productRecommendations: recommendations
    };
  }, [selectedRisk, selectedAge, selectedAmount, dataT, investmentPlanningMessages]);

  // 当语言切换时重新生成个性化推荐
  useEffect(() => {
    if (showResults) {
      setPersonalizedResult(generatePersonalizedRecommendation());
    }
  }, [locale, generatePersonalizedRecommendation, showResults]);

  const scrollToStep = useCallback((step: number) => {
    const targetRef = step === 1 ? stepOneRef : stepTwoRef;

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
      router.replace(`${pathname}${query ? `?${query}` : ''}`, {locale});
    },
    [locale, pathname, router, searchParams]
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

  // 开始AI分析流程
  const startAnalysis = useCallback(() => {
    setIsAnalyzing(true);
    setShowResults(false);
    unlockAndNavigate(2);

    // 3秒后显示个性化推荐结果
    setTimeout(() => {
      const newResult = generatePersonalizedRecommendation();
      setPersonalizedResult(newResult);
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  }, [unlockAndNavigate, generatePersonalizedRecommendation]);

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

    const parsedStep = Number.parseInt(stepParam, 10);
    if (Number.isFinite(parsedStep) && parsedStep >= 1 && parsedStep <= TOTAL_STEPS) {
      setCurrentStep(parsedStep);
      setMaxCompletedStep((previous) => Math.max(previous, parsedStep));

      // 如果直接访问步骤2或更高步骤，需要初始化相应的状态
      if (parsedStep >= 2) {
        setShowResults(true);
        setIsAnalyzing(false);
      }

      scrollToStep(parsedStep);
    }
  }, [scrollToStep, searchParams]);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale === 'ja' ? 'ja-JP' : 'zh-CN', {
        style: 'currency',
        currency: 'CNY',
        maximumFractionDigits: 0
      }),
    [locale]
  );

  const percentFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale === 'ja' ? 'ja-JP' : 'zh-CN', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }),
    [locale]
  );

  const formatTenThousands = useCallback(
    (value: number) =>
      t('step3.chart.yAxisTick', {
        value: Math.round(value / 10000)
      }),
    [t]
  );

  const navigationSteps = useMemo(
    () => [
      {index: 1, title: t('steps.goalSetting.title'), description: t('steps.goalSetting.description')},
      {
        index: 2,
        title: t('steps.aiPlan.title'),
        description: `${t('steps.aiPlan.description')} / ${t('steps.projection.description')}`
      }
    ],
    [t]
  );

  const renderStepHeader = (stepIndex: number) => (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        {t('stepHeading', {step: stepIndex, title: navigationSteps[stepIndex - 1]?.title ?? ''})}
      </h2>
      <p className="text-gray-600">{navigationSteps[stepIndex - 1]?.description}</p>
    </div>
  );

  const selectedGoalDefinition = useMemo(
    () => GOAL_OPTIONS.find((option) => option.id === selectedGoal),
    [selectedGoal]
  );

  const selectedRiskDefinition = useMemo(
    () => RISK_OPTIONS.find((option) => option.id === selectedRisk),
    [selectedRisk]
  );



  const renderStepNavigation = () => (
    <div className="flex space-x-8">
      {navigationSteps.map((step) => {
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
            <span className="font-medium">{step.title}</span>
          </button>
        );
      })}
    </div>
  );

  const renderGoalSelection = () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
      {GOAL_OPTIONS.map((option) => {
        const isActive = selectedGoal === option.id;
        return (
          <div
            key={option.id}
            onClick={() => setSelectedGoal(option.id)}
            className={`relative p-4 border-2 rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 group ${
              isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {option.isPopular && (
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                {t('step1.goalSection.popular')}
              </div>
            )}
            {isActive && (
              <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {t('step1.goalSection.selected')}
              </div>
            )}
            <div className="text-center">
              <div className="text-3xl mb-2">{option.icon}</div>
              <h5 className={`font-semibold mb-1 ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>
                {t(`step1.goalSection.options.${option.id}.title`)}
              </h5>
              <p className={`text-sm ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                {t(`step1.goalSection.options.${option.id}.description`)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderAmountSelection = () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4">
      {AMOUNT_OPTIONS.map((option) => {
        const isActive = selectedAmount === option.id;
        return (
          <div
            key={option.id}
            onClick={() => setSelectedAmount(option.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all duration-200 hover:shadow-md ${
              isActive ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="font-semibold">{t(`step1.amountSection.options.${option.id}.label`)}</div>
            <div className={`text-xs mt-1 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
              {t(`step1.amountSection.options.${option.id}.hint`)}
            </div>
            {isActive && <div className="text-blue-500 text-xs mt-1">✓</div>}
          </div>
        );
      })}
    </div>
  );

  const renderAgeSelection = () => (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {AGE_OPTIONS.map((option) => {
        const isActive = selectedAge === option.id;
        return (
          <div
            key={option.id}
            onClick={() => setSelectedAge(option.id)}
            className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-all duration-200 hover:shadow-md ${
              isActive ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="font-semibold text-sm">{t(`step1.ageSection.options.${option.id}.label`)}</div>
            <div className={`text-xs mt-1 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
              {t(`step1.ageSection.options.${option.id}.hint`)}
            </div>
            {isActive && <div className="text-blue-500 text-xs mt-1">✓</div>}
          </div>
        );
      })}
    </div>
  );

  const renderRiskSelection = () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3">
      {RISK_OPTIONS.map((option) => {
        const isActive = selectedRisk === option.id;
        return (
          <div
            key={option.id}
            onClick={() => setSelectedRisk(option.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
              isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-center mb-3">
              <div className="text-2xl mb-2">{option.icon}</div>
              <h5 className={`font-semibold ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>
                {t(`step1.riskSection.options.${option.id}.title`)}
              </h5>
              <p className={`text-sm mb-2 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                {t(`step1.riskSection.options.${option.id}.description`)}
              </p>
            </div>
            <div className="text-xs text-center">
              <div className={isActive ? 'text-blue-500' : 'text-gray-500'}>
                {t(`step1.riskSection.options.${option.id}.riskLabel`)}
              </div>
              <div className="text-green-600 font-medium">
                {t(`step1.riskSection.options.${option.id}.returnRange`)}
              </div>
            </div>
            {isActive && (
              <div className="text-center mt-2">
                <div className="text-blue-500 text-sm">{t('step1.riskSection.selected')}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1 initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="text-4xl font-bold text-gray-900 mb-4">
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.2}}
            className="text-xl text-gray-600"
          >
            {t('hero.subtitle')}
          </motion.p>
        </div>

        <div className="flex justify-center mb-12">{renderStepNavigation()}</div>

        <div className="space-y-12">
          {currentStep === 1 && (
            <motion.section
              ref={stepOneRef}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.3}}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              {renderStepHeader(1)}

              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  {t('step1.goalSection.title')}
                </h4>
                {renderGoalSelection()}
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  {t('step1.amountSection.title')}
                </h4>
                {renderAmountSelection()}
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                  {t('step1.ageSection.title')}
                </h4>
                {renderAgeSelection()}
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">4</span>
                  {t('step1.riskSection.title')}
                </h4>
                {renderRiskSelection()}
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-lg font-semibold mb-4 text-center text-gray-900">
                  📋 {t('step1.summary.title')}
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">{t('step1.summary.goalLabel')}</div>
                    <div className="font-semibold text-blue-700">
                      {selectedGoalDefinition
                        ? `${selectedGoalDefinition.icon} ${t(`step1.goalSection.options.${selectedGoalDefinition.id}.title`)}`
                        : t('step1.summary.unselected')}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">{t('step1.summary.amountLabel')}</div>
                    <div className="font-semibold text-green-700">
                      {t(`step1.amountSection.options.${selectedAmount}.label`)}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">{t('step1.summary.ageLabel')}</div>
                    <div className="font-semibold text-purple-700">
                      {t(`step1.ageSection.options.${selectedAge}.label`)}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">{t('step1.summary.riskLabel')}</div>
                    <div className="font-semibold text-orange-700">
                      {selectedRiskDefinition
                        ? `${selectedRiskDefinition.icon} ${t(`step1.riskSection.options.${selectedRiskDefinition.id}.title`)}`
                        : t('step1.summary.unselected')}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-4">
                    💡 {t('step1.summary.helper')}
                  </div>
                  <Button
                    size="lg"
                    onClick={startAnalysis}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
                  >
                    🚀 {t('step1.summary.cta')}
                  </Button>
                </div>
              </div>
            </motion.section>
          )}

          {currentStep >= 2 && (
            <motion.section
              ref={stepTwoRef}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.3}}
              className="space-y-8"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg">
                {renderStepHeader(2)}

                {isAnalyzing && !showResults ? (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                    <p className="text-gray-600">{t('step2.loadingMessage')}</p>
                  </div>
                ) : showResults ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600">{percentFormatter.format(personalizedResult.successRate / 100)}</div>
                        <div className="text-sm text-gray-600">{t('step2.metrics.successRate')}</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">{currencyFormatter.format(personalizedResult.monthlyInvestment)}</div>
                        <div className="text-sm text-gray-600">{t('step2.metrics.monthlyInvestment')}</div>
                      </div>
                    </div>
                  </>
                ) : null}

                {showResults && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-4">
                      {t('step2.assetAllocationTitle', {risk: dataT(`riskLevels.${personalizedResult.riskLevelKey}`)})}
                    </h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={personalizedResult.assetAllocation}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="percentage"
                            label={false}
                          >
                            {personalizedResult.assetAllocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {personalizedResult.productRecommendations && (
                      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 animate-fade-in-up">
                        <div className="text-center mb-6">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">
                            {t('step2.productRecommendations.title')}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {t('step2.productRecommendations.subtitle')}
                          </p>
                          <div className="inline-flex items-center text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            {t('step2.productRecommendations.hoverHint')}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {personalizedResult.assetAllocation.map((asset) => {
                            const recommendations = personalizedResult.productRecommendations![asset.labelKey as keyof typeof personalizedResult.productRecommendations];
                            const monthlyAmount = (personalizedResult.monthlyInvestment * asset.percentage) / 100;

                            return (
                              <div key={asset.labelKey} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
                                {/* 资产类别头部 */}
                                <div className="p-4 border-b border-gray-100" style={{ backgroundColor: `${asset.color}10` }}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <div className="flex items-center justify-center w-8 h-8 rounded-full mr-3 shadow-sm" style={{ backgroundColor: asset.color }}>
                                        {asset.labelKey === 'equityFunds' && (
                                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                          </svg>
                                        )}
                                        {asset.labelKey === 'bondFunds' && (
                                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                          </svg>
                                        )}
                                        {asset.labelKey === 'moneyMarket' && (
                                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                          </svg>
                                        )}
                                        {asset.labelKey === 'alternative' && (
                                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                          </svg>
                                        )}
                                      </div>
                                      <h5 className="font-semibold text-gray-900">
                                        {dataT(`planning.assetAllocation.${asset.labelKey}`)} ({asset.percentage}%)
                                      </h5>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-lg font-bold" style={{ color: asset.color }}>
                                        {currencyFormatter.format(monthlyAmount)}
                                      </div>
                                      <div className="text-xs text-gray-500">{t('step2.productRecommendations.monthlyInvestment')}</div>
                                    </div>
                                  </div>
                                </div>

                                {/* 产品推荐列表 */}
                                <div className="p-4 space-y-3">
                                  {recommendations?.map((product, productIndex) => (
                                    <div key={productIndex} className="group relative p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 hover:shadow-sm cursor-pointer">
                                      {/* 左侧装饰线 */}
                                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                      <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center">
                                          <div className="w-2 h-2 rounded-full mr-2 opacity-60 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: asset.color }}></div>
                                          <h6 className="font-semibold text-sm text-gray-900 group-hover:text-blue-900 transition-colors">
                                            {product.name}
                                          </h6>
                                        </div>
                                        <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 group-hover:bg-green-200 rounded-full transition-colors duration-200 shadow-sm">
                                          {product.expectedReturn}
                                        </span>
                                      </div>

                                      <p className="text-xs text-gray-600 leading-relaxed pl-4 group-hover:text-gray-700 transition-colors">
                                        {product.reason}
                                      </p>

                                      {/* 右下角小图标 */}
                                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                                        <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {showResults && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">{t('step3.title')}</h3>
                    <p className="text-gray-600">{t('steps.projection.description')}</p>
                  </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('step3.sliderLabel', {amount: currencyFormatter.format(sliderValue)})}
                  </label>
                  <input
                    type="range"
                    min="2000"
                    max="5000"
                    step="100"
                    value={sliderValue}
                    onChange={(event) => setSliderValue(Number(event.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={personalizedResult.projectionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" tick={{fontSize: 12, fill: '#4B5563'}} />
                      <YAxis tickFormatter={formatTenThousands} tick={{fontSize: 12, fill: '#4B5563'}} />
                      <Tooltip
                        formatter={(value: number | string) => [
                          currencyFormatter.format(Number(value)),
                          t('step3.tooltip.valueLabel')
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="optimistic"
                        stroke="#10B981"
                        strokeWidth={2}
                        name={t('step3.chart.lines.optimistic')}
                      />
                      <Line
                        type="monotone"
                        dataKey="neutral"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        name={t('step3.chart.lines.neutral')}
                      />
                      <Line
                        type="monotone"
                        dataKey="pessimistic"
                        stroke="#EF4444"
                        strokeWidth={2}
                        name={t('step3.chart.lines.pessimistic')}
                      />
                    </LineChart>
                  </ResponsiveContainer>
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

// 使用动态导入禁用SSR
const InvestmentPlanningPageContent = dynamicImport(() => Promise.resolve(InvestmentPlanningPageContentComponent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">加载中...</h2>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
});

function InvestmentPlanningPageContentComponent() {
  return <InvestmentPlanningPageContentOriginal />;
}

export default function InvestmentPlanningPage() {
  return <InvestmentPlanningPageContent />;
}
