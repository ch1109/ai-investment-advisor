'use client';

import {motion} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {FormEvent, KeyboardEvent, useMemo, useState} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import {portfolioData} from '@/data/mockData';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  CheckCircleIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';

type ReminderKey = 'priceMovement' | 'marketShift' | 'riskAlert';

export default function PortfolioManagementPage() {
  const [showHealthCheck, setShowHealthCheck] = useState(false);
  const [showHealthInsights, setShowHealthInsights] = useState(false);
  const [executionComplete, setExecutionComplete] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<ReminderKey | null>(null);
  const [reminderThreshold, setReminderThreshold] = useState(5);
  const [reminderPhone, setReminderPhone] = useState('');
  const [showReminderSuccess, setShowReminderSuccess] = useState(false);
  const [reminderError, setReminderError] = useState<string | null>(null);

  const t = useTranslations('PortfolioManagement');
  const dataT = useTranslations('Data');
  const locale = useLocale();

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

  const handleHealthCheck = () => {
    setShowHealthCheck(true);
    setTimeout(() => setShowHealthCheck(false), 3000);
  };

  const handleShowHealthInsights = () => {
    setShowHealthInsights(true);
  };

  const handleExecute = () => {
    setExecutionComplete(true);
    setShowHealthInsights(false);
    setTimeout(() => setExecutionComplete(false), 3000);
  };

  const handleSaveReminderSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedReminder) {
      return;
    }
    if (!reminderPhone.trim()) {
      setReminderError(t('risk.reminderSettings.errors.phoneRequired'));
      return;
    }
    setReminderError(null);
    setShowReminderSuccess(true);
    setTimeout(() => setShowReminderSuccess(false), 3000);
  };

  const reminders = useMemo(
    () => [
      {
        key: 'priceMovement' as ReminderKey,
        defaultThreshold: 5,
        icon: ArrowTrendingUpIcon,
        bgClass: 'bg-blue-50',
        iconClass: 'text-blue-600',
        title: t('risk.reminders.priceMovement.title'),
        description: t('risk.reminders.priceMovement.description')
      },
      {
        key: 'marketShift' as ReminderKey,
        defaultThreshold: 3,
        icon: BoltIcon,
        bgClass: 'bg-amber-50',
        iconClass: 'text-amber-600',
        title: t('risk.reminders.marketShift.title'),
        description: t('risk.reminders.marketShift.description')
      },
      {
        key: 'riskAlert' as ReminderKey,
        defaultThreshold: 10,
        icon: ShieldExclamationIcon,
        bgClass: 'bg-rose-50',
        iconClass: 'text-rose-600',
        title: t('risk.reminders.riskAlert.title'),
        description: t('risk.reminders.riskAlert.description')
      }
    ],
    [t]
  );

  const handleSelectReminder = (key: ReminderKey) => {
    const matchedReminder = reminders.find((reminder) => reminder.key === key);
    if (matchedReminder) {
      setReminderThreshold(matchedReminder.defaultThreshold);
    }
    setSelectedReminder(key);
    setShowReminderSuccess(false);
    setReminderError(null);
  };

  const handleReminderKeyDown = (event: KeyboardEvent<HTMLDivElement>, key: ReminderKey) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelectReminder(key);
    }
  };

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
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('overview.title')}</h2>
              <p className="text-gray-600">{t('overview.subtitle')}</p>
            </div>

            <Card className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {currencyFormatter.format(portfolioData.totalAssets)}
                  </div>
                  <div className="text-sm text-gray-600">{t('overview.metrics.totalAssets')}</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center">
                    <ArrowUpIcon className="w-6 h-6 text-green-600 mr-2" />
                    <span className="text-3xl font-bold text-green-600">
                      {currencyFormatter.format(portfolioData.todayPnL)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {t('overview.metrics.todayPnL', {
                      percent: percentFormatter.format(portfolioData.todayPnLPercentage / 100)
                    })}
                  </div>
                </div>
                <div className="text-center p-6 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">
                    {portfolioData.riskScore}/10
                  </div>
                  <div className="text-sm text-gray-600">{t('overview.metrics.riskScore')}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{t('overview.assetDistributionTitle')}</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={portfolioData.assetDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="percentage"
                          label={false}
                        >
                          {portfolioData.assetDistribution.map((entry, index) => (
                            <Cell key={`asset-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">{t('overview.holdingsTitle')}</h3>
                  <div className="space-y-3">
                    {portfolioData.holdings.map((holding, index) => {
                      const isPositive = holding.pnl >= 0;
                      return (
                        <div key={`holding-${index}`} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{dataT(`portfolio.holdings.${holding.nameKey}`)}</div>
                            <div className="text-sm text-gray-600">{holding.symbol}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{currencyFormatter.format(holding.totalValue)}</div>
                            <div className={`text-sm flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {isPositive ? (
                                <ArrowUpIcon className="w-4 h-4 mr-1" />
                              ) : (
                                <ArrowDownIcon className="w-4 h-4 mr-1" />
                              )}
                              {holding.pnlPercentage > 0 ? '+' : ''}
                              {holding.pnlPercentage}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} transition={{delay: 0.6}}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('risk.title')}</h2>
              <p className="text-gray-600">{t('risk.subtitle')}</p>
            </div>

            <Card className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">{t('risk.panelTitle')}</h3>
                <Button onClick={handleHealthCheck} variant="outline">
                  {t('risk.actions.healthCheck')}
                </Button>
              </div>

              {showHealthCheck && (
                <motion.div initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800">{t('risk.healthCheck.title')}</h4>
                      <p className="text-green-700 mt-1">{t('risk.healthCheck.description')}</p>
                      <Button size="sm" className="mt-3" onClick={handleShowHealthInsights}>
                        {t('risk.actions.viewInsights')}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{t('risk.metrics.health.value')}</div>
                  <div className="text-sm text-gray-600">{t('risk.metrics.health.label')}</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-gray-600">{t('risk.metrics.alignment.label')}</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-gray-600">{t('risk.metrics.coverage.label')}</div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{t('risk.reminders.title')}</h4>
                  <p className="text-sm text-gray-600 md:text-right">{t('risk.reminders.subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                  {reminders.map((reminder, index) => {
                    const IconComponent = reminder.icon;
                    const isActive = reminder.key === selectedReminder;
                    return (
                      <div
                        key={`reminder-${index}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleSelectReminder(reminder.key)}
                        onKeyDown={(event) => handleReminderKeyDown(event, reminder.key)}
                        className={`p-4 bg-white rounded-lg border shadow-sm cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                          isActive ? 'border-blue-300 ring-2 ring-blue-200' : 'border-gray-100'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${reminder.bgClass}`}>
                          <IconComponent className={`w-5 h-5 ${reminder.iconClass}`} />
                        </div>
                        <div className="font-semibold text-gray-900 mb-1">{reminder.title}</div>
                        <p className="text-sm text-gray-600 leading-snug">{reminder.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedReminder ? (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('risk.reminderSettings.title')}</h4>
                  <p className="text-sm text-gray-600 mb-4">{t(`risk.reminderSettings.types.${selectedReminder}.subtitle`)}</p>
                  <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSaveReminderSettings}>
                    <label className="flex flex-col bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                      <span className="text-sm font-medium text-gray-700 mb-2">{t(`risk.reminderSettings.types.${selectedReminder}.thresholdLabel`)}</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          max={100}
                          value={reminderThreshold}
                          onChange={(event) => {
                            const value = Number(event.target.value);
                            if (Number.isNaN(value)) {
                              return;
                            }
                            const clampedValue = Math.min(Math.max(value, 1), 100);
                            setReminderThreshold(clampedValue);
                          }}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-500">{t('risk.reminderSettings.thresholdUnit')}</span>
                      </div>
                      <span className="text-xs text-gray-400 mt-2">{t(`risk.reminderSettings.types.${selectedReminder}.thresholdHint`)}</span>
                    </label>

                    <label className="flex flex-col bg-white border border-gray-100 rounded-lg p-4 shadow-sm md:col-span-2">
                      <span className="text-sm font-medium text-gray-700 mb-2">{t(`risk.reminderSettings.types.${selectedReminder}.phoneLabel`)}</span>
                      <input
                        type="tel"
                        value={reminderPhone}
                        onChange={(event) => {
                          setReminderPhone(event.target.value);
                          setReminderError(null);
                        }}
                        placeholder={t(`risk.reminderSettings.types.${selectedReminder}.phonePlaceholder`)}
                        className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${reminderError ? 'border-red-400' : 'border-gray-300'}`}
                      />
                      <span className="text-xs text-gray-400 mt-2">{t(`risk.reminderSettings.types.${selectedReminder}.phoneHint`)}</span>
                    </label>

                    <div className="md:col-span-3 flex flex-col gap-3">
                      <Button type="submit" className="w-full md:w-auto">
                        {t(`risk.reminderSettings.types.${selectedReminder}.saveButton`)}
                      </Button>
                      {reminderError && <div className="text-sm text-red-500">{reminderError}</div>}
                      {showReminderSuccess && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircleIcon className="w-5 h-5" />
                          <span>
                            {t(`risk.reminderSettings.types.${selectedReminder}.successMessage`, {
                              threshold: reminderThreshold,
                              phone: reminderPhone || t('risk.reminderSettings.phoneFallback')
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              ) : (
                <div className="mt-8 text-sm text-gray-500">
                  {t('risk.reminderSettings.selectPrompt')}
                </div>
              )}
            </Card>
          </motion.div>

          <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} transition={{delay: 0.8}}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('execution.title')}</h2>
              <p className="text-gray-600">{t('execution.subtitle')}</p>
            </div>

            {showHealthInsights && (
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}>
                <Card className="p-8 mb-6">
                  <h3 className="text-lg font-semibold mb-4">{t('execution.planTitle')}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                      <span className="text-red-700">
                        {t('execution.sell', {
                          name: dataT('portfolio.holdings.chinaGrowthFund')
                        })}
                      </span>
                      <span className="font-semibold text-red-700">{currencyFormatter.format(50000)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <span className="text-green-700">
                        {t('execution.buy', {
                          name: dataT('productDiagnosis.names.yifangdaBluechipFund')
                        })}
                      </span>
                      <span className="font-semibold text-green-700">{currencyFormatter.format(50000)}</span>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <Button size="lg" onClick={handleExecute}>
                      {t('execution.executeButton')}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {executionComplete && (
              <motion.div initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircleIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">{t('execution.completedTitle')}</h3>
                <p className="text-green-700">{t('execution.completedMessage')}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
