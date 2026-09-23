export const locales = {
  he: {label: 'עברית', lang: 'he-IL', dir: 'rtl'},
  en: {label: 'English', lang: 'en', dir: 'ltr'},
  ar: {label: 'العربية', lang: 'ar', dir: 'rtl'},
  fr: {label: 'Français', lang: 'fr-FR', dir: 'ltr'},
  it: {label: 'Italiano', lang: 'it-IT', dir: 'ltr'},
  hi: {label: 'हिन्दी', lang: 'hi-IN', dir: 'ltr'},
  zh: {label: '简体中文', lang: 'zh-CN', dir: 'ltr'},
  pt: {label: 'Português', lang: 'pt-BR', dir: 'ltr'},
  ru: {label: 'Русский', lang: 'ru-RU', dir: 'ltr'},
  es: {label: 'Español', lang: 'es-ES', dir: 'ltr'},
} as const;

export type Locale = keyof typeof locales;
export const defaultLocale: Locale = 'he';
export const activeLocales: Locale[] = ['he','en','fr','it','hi','zh','ar','pt','ru','es'];
export const locale = locales[defaultLocale];

export function directionFor(value: Locale) {
  return locales[value].dir;
}

export const ui = {
  home: 'דף הבית',
  updated: 'עודכן',
  minuteRead: 'דקות קריאה',
  by: 'מאת',
  search: 'חיפוש',
  clearSearch: 'ניקוי החיפוש',
  readGuide: 'למדריך',
  allGuides: 'כל המדריכים',
} as const;
