/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import English from '../lang/en.json';
import Spanish from '../lang/es.json';

type LanguageContextType = {
  locale: string;
  selectLanguage: (newLocale: string) => void;
};

export const LanguageContext = createContext({} as LanguageContextType);

const lang = localStorage.getItem('lang') || navigator.language;

type LanguageProviderProps = {
  children: any;
};

const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [locale, setLocale] = useState(lang);
  const [messages, setMessages] = useState(lang === 'en' ? English : Spanish);

  const selectLanguage = (newLocale: string): void => {
    setLocale(newLocale);
    localStorage.setItem('lang', newLocale);
    if (newLocale === 'es') {
      setMessages(Spanish);
    } else {
      setMessages(English);
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, selectLanguage }}>
      <IntlProvider messages={messages} locale={locale}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
