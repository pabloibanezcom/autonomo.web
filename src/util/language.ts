import English from '../i18n/en.json';
import Spanish from '../i18n/es.json';

export const getLocaleFromLang = (lang: string): string => {
  if (lang === 'es') {
    return 'es-ES';
  }
  return 'en-GB';
};

export const getMessagesFromLocale = (
  locale: string
): Record<string, string> => {
  if (locale === 'es') {
    return Spanish;
  }
  return English;
};
