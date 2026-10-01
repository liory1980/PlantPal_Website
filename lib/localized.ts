import type {Article} from './content';
import type {NewLocale} from './multilingual';
import {articleCopies,localeExtras} from './l10n';

// Kept separate from lib/multilingual.ts, which client components import: the localized copy is ~2.5 MB and must stay on the server.
/** Localized article: real translated copy when available, otherwise the English original (never a generated placeholder). */
export function localizeFor(article:Article,locale:NewLocale):Article{const copy=articleCopies[locale][article.slug];return copy?{...article,...copy,author:'PlantPal'}:article}
export function hasTranslation(slug:string,locale:NewLocale){return Boolean(articleCopies[locale][slug])}
export function extrasFor(locale:NewLocale){return localeExtras[locale]}
