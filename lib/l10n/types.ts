import type {Category} from '../config';
import type {Section} from '../content';

/** Fully localized text of one article. Metadata (slug, category, related, sources, dates) stays in the English source. */
export type ArticleCopy = {title: string; description: string; takeaway: string; sections: Section[]};
export type ArticleCopies = Record<string, ArticleCopy>;

export type TermCopy = {name: string; definition: string; practice: string; example: string};
export type PlantCopy = {intro: string; tip: string; lightCare: string; waterCare: string};

export type LocaleExtras = {
  /** One distinct blurb per category, used on category cards and category page metadata. */
  categoryDescriptions: Record<Category, string>;
  /** Same order as the English app page: identification, reminders, light meter, Plant Sitter, AI assistant, zones, collection, personalized guides. */
  appFeatures: [title: string, text: string][];
  /** Keyed by plant slug (lib/plants.ts). */
  plants: Record<string, PlantCopy>;
  /** Keyed by glossary slug (lib/glossary.ts). */
  glossary: Record<string, TermCopy>;
  ui: {
    takeawayEyebrow: string; tocEyebrow: string; relatedTitle: string; sources: string;
    glossaryEyebrow: string; glossaryTitle: string; glossaryText: string;
    termMeaning: string; termInPractice: string; termGuide: string; backToGlossary: string;
  };
};
