import { id } from './dictionaries/id';
import { en } from './dictionaries/en';
import { Locale, defaultLocale } from './config';

const dictionaries = {
  id,
  en,
};

export type Dictionary = any;

export function getDictionary(locale: Locale): Dictionary {
  // Retrieve the raw dictionary for the requested locale (or fallback to default)
  const raw = dictionaries[locale] || dictionaries[defaultLocale];
  // Ensure the `home` section exists and contains all required keys by merging with the default locale's home values.
  const defaultHome = dictionaries[defaultLocale].home || {};
  const localeHome = raw.home || {};
  const mergedHome = { ...defaultHome, ...localeHome };
  // Ensure the `bibleReadingPlan` section exists and merge defaults.
  const defaultBPR = (dictionaries[defaultLocale] as any).bibleReadingPlan || {};
  const localeBPR = (raw as any).bibleReadingPlan || {};
  const mergedBPR = { ...defaultBPR, ...localeBPR };
  // Return a shallow copy with merged sections.
  return { ...raw, home: mergedHome, bibleReadingPlan: mergedBPR };
}
