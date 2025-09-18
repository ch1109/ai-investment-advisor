import {getRequestConfig} from 'next-intl/server';

import {routing} from './i18n/routing';
import {AppLocale} from './i18n/config';

import zhMessages from './messages/zh.json';
import jaMessages from './messages/ja.json';

const messages = {
  zh: zhMessages,
  ja: jaMessages
};

export default getRequestConfig(async ({locale}) => {
  // 如果 locale 是 undefined，使用默认语言
  const actualLocale = locale || routing.defaultLocale;

  const isKnownLocale = routing.locales.includes(actualLocale as AppLocale);
  if (!isKnownLocale) {
    // 返回默认语言而不是 notFound
    return {
      locale: routing.defaultLocale,
      messages: messages[routing.defaultLocale as AppLocale]
    };
  }

  const localeMessages = messages[actualLocale as AppLocale];
  if (!localeMessages) {
    return {
      locale: actualLocale,
      messages: {}
    };
  }

  return {
    locale: actualLocale,
    messages: localeMessages
  };
});
