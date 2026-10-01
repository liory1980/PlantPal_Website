import type {ArticleCopies} from './types';
import he1 from './he/articles-1';
import he2 from './he/articles-2';
import fr1 from './fr/articles-1';
import fr2 from './fr/articles-2';
import it1 from './it/articles-1';
import it2 from './it/articles-2';
import hi1 from './hi/articles-1';
import hi2 from './hi/articles-2';
import zh1 from './zh/articles-1';
import zh2 from './zh/articles-2';
import ar1 from './ar/articles-1';
import ar2 from './ar/articles-2';
import pt1 from './pt/articles-1';
import pt2 from './pt/articles-2';
import ru1 from './ru/articles-1';
import ru2 from './ru/articles-2';
import es1 from './es/articles-1';
import es2 from './es/articles-2';

export type {ArticleCopy,ArticleCopies,LocaleExtras,PlantCopy,TermCopy} from './types';

/** Localized article text by locale, then slug. English lives in the source modules (lib/content.ts etc.). */
export const articleCopies: Record<'he'|'fr'|'it'|'hi'|'zh'|'ar'|'pt'|'ru'|'es', ArticleCopies> = {
  he: {...he1, ...he2},
  fr: {...fr1, ...fr2},
  it: {...it1, ...it2},
  hi: {...hi1, ...hi2},
  zh: {...zh1, ...zh2},
  ar: {...ar1, ...ar2},
  pt: {...pt1, ...pt2},
  ru: {...ru1, ...ru2},
  es: {...es1, ...es2},
};

export {localeExtras} from './extras';
