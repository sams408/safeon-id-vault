
import { en } from "./translations/en";
import { es } from "./translations/es";

export const translations = {
  en,
  es
};

export type LanguageCode = keyof typeof translations;
export type TranslationKeys = typeof en;
