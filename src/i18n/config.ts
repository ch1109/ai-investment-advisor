export const locales = ['zh', 'ja'] as const;
export const defaultLocale = 'zh';
export const localePrefix = 'as-needed';

export type AppLocale = (typeof locales)[number];
