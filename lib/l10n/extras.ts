import type {LocaleExtras} from './types';
import frExtras from './fr/extras';
import itExtras from './it/extras';
import hiExtras from './hi/extras';
import zhExtras from './zh/extras';
import arExtras from './ar/extras';
import ptExtras from './pt/extras';
import ruExtras from './ru/extras';
import esExtras from './es/extras';

export const localeExtras: Record<'fr'|'it'|'hi'|'zh'|'ar'|'pt'|'ru'|'es', LocaleExtras | null> = {
  fr: frExtras,
  it: itExtras,
  hi: hiExtras,
  zh: zhExtras,
  ar: arExtras,
  pt: ptExtras,
  ru: ruExtras,
  es: esExtras,
};
