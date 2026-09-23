export const locales = {
  he: {label: 'עברית', lang: 'he-IL', dir: 'rtl'},
  en: {label: 'English', lang: 'en', dir: 'ltr'},
  ar: {label: 'العربية', lang: 'ar', dir: 'rtl'},
} as const;

export type Locale = keyof typeof locales;
export const defaultLocale: Locale = 'he';
export const activeLocales: Locale[] = ['he'];
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
