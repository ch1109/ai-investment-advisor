import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import {notFound} from 'next/navigation';

import Header from '@/components/layout/Header';
import {routing} from '@/i18n/routing';

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as 'zh' | 'ja')) notFound();

  setRequestLocale(locale);

  const messages = await getMessages({locale});

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main>{children}</main>
    </NextIntlClientProvider>
  );
}
