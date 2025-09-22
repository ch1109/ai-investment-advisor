'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import FeatureCard from '@/components/home/FeatureCard';
import {
  ChartBarIcon,
  CogIcon,
  LightBulbIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 md:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Enhanced Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-300 to-pink-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-full opacity-10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
          >
            <FeatureCard
              icon={<ChartBarIcon className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" />}
              title={t('features.investmentPlanning.title')}
              description={t('features.investmentPlanning.description')}
              href="/investment-planning/?step=2"
              ctaLabel={t('features.learnMore')}
            />

            <FeatureCard
              icon={<CogIcon className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" />}
              title={t('features.portfolioManagement.title')}
              description={t('features.portfolioManagement.description')}
              href="/portfolio-management"
              ctaLabel={t('features.learnMore')}
            />

            <FeatureCard
              icon={<LightBulbIcon className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" />}
              title={t('features.marketInsights.title')}
              description={t('features.marketInsights.description')}
              href="/market-insights/detailed"
              ctaLabel={t('features.learnMore')}
            />

            <FeatureCard
              icon={<MagnifyingGlassIcon className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" />}
              title={t('features.productDiagnosis.title')}
              description={t('features.productDiagnosis.description')}
              href="/product-diagnosis/?step=2"
              ctaLabel={t('features.learnMore')}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
