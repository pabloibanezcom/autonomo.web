import English from '../lang/en.json';
import Spanish from '../lang/es.json';

export const getMessagesFromLocale = (
  locale: string
): Record<string, string> => {
  if (locale === 'es') {
    return Spanish;
  }
  return English;
};
