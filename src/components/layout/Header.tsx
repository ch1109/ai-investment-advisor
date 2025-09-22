'use client';

import {motion} from 'framer-motion';
import {Link, usePathname} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

const navigationItems = [
  {translationKey: 'home', href: '/'},
  {translationKey: 'investmentPlanning', href: '/investment-planning'},
  {translationKey: 'portfolioManagement', href: '/portfolio-management'},
  {translationKey: 'marketInsights', href: '/market-insights'},
  {translationKey: 'productDiagnosis', href: '/product-diagnosis'}
];

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');

  const normalizedPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <motion.div whileHover={{scale: 1.05}} className="text-2xl font-bold text-blue-600">
              {t('brand')}
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const targetPath = item.href.endsWith('/') && item.href !== '/' ? item.href.slice(0, -1) : item.href;
              const isActive = normalizedPath === targetPath;

              return (
                <Link
                  key={item.translationKey}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {t(item.translationKey)}
                </Link>
              );
            })}
            <LanguageSwitcher />
          </nav>

          <div className="md:hidden flex items-center">
            <button className="text-gray-700 hover:text-blue-600" aria-label={t('mobileMenu')}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
