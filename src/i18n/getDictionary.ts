import { id } from './dictionaries/id';
import { en } from './dictionaries/en';
import { Locale, defaultLocale } from './config';

const dictionaries = {
  id,
  en,
};

export type Dictionary = any;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries[defaultLocale];
}
