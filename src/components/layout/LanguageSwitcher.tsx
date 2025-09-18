'use client';

import {ChangeEvent, Suspense} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {useSearchParams} from 'next/navigation';

import {routing, usePathname, useRouter} from '@/i18n/routing';

type AppLocale = (typeof routing.locales)[number];

const localeLabels: Record<AppLocale, string> = {
  zh: '中文',
  ja: '日本語'
};

function LanguageSwitcherContent() {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('Common');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as AppLocale;
    if (nextLocale === locale) return;

    // 保留当前的查询参数
    const currentSearchParams = searchParams.toString();
    const targetPath = pathname || '/';
    const fullPath = currentSearchParams ? `${targetPath}?${currentSearchParams}` : targetPath;

    router.replace(fullPath, {locale: nextLocale});
  };

  return (
    <div className="relative">
      <label className="sr-only" htmlFor="language-switcher">
        {t('languageSwitcher')}
      </label>
      <select
        id="language-switcher"
        value={locale}
        onChange={handleChange}
        className="appearance-none bg-transparent border border-gray-200 text-sm font-medium text-gray-700 rounded-lg px-3 py-2 pr-8 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        {routing.locales.map((item) => (
          <option key={item} value={item} className="text-gray-900">
            {localeLabels[item]}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12l-4-4h8l-4 4z" />
        </svg>
      </span>
    </div>
  );
}

export default function LanguageSwitcher() {
  return (
    <Suspense fallback={
      <div className="relative">
        <select className="appearance-none bg-transparent border border-gray-200 text-sm font-medium text-gray-700 rounded-lg px-3 py-2 pr-8">
          <option>中文</option>
        </select>
      </div>
    }>
      <LanguageSwitcherContent />
    </Suspense>
  );
}
