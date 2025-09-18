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
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <FeatureCard
              icon={<ChartBarIcon className="w-6 h-6 text-blue-600" />}
              title={t('features.investmentPlanning.title')}
              description={t('features.investmentPlanning.description')}
              href="/investment-planning/?step=2"
              ctaLabel={t('features.learnMore')}
            />

            <FeatureCard
              icon={<CogIcon className="w-6 h-6 text-blue-600" />}
              title={t('features.portfolioManagement.title')}
              description={t('features.portfolioManagement.description')}
              href="/portfolio-management"
              ctaLabel={t('features.learnMore')}
            />

            <FeatureCard
              icon={<LightBulbIcon className="w-6 h-6 text-blue-600" />}
              title={t('features.marketInsights.title')}
              description={t('features.marketInsights.description')}
              href="/market-insights/detailed"
              ctaLabel={t('features.learnMore')}
            />

            <FeatureCard
              icon={<MagnifyingGlassIcon className="w-6 h-6 text-blue-600" />}
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
