import React, { useContext } from 'react';
import FlagEN from '../../assets/flags/en.png';
import FlagES from '../../assets/flags/es.png';
import { LanguageContext } from '../../context/language';
import MenuButton from '../menuButton/MenuButton';

const LanguageSelector = () => {
  const { locale, selectLanguage } = useContext(LanguageContext);

  const languageMenuItems = [
    {
      content: 'English',
      onClick: () => selectLanguage('en')
    },
    {
      content: 'Español',
      onClick: () => selectLanguage('es')
    }
  ];

  return (
    <MenuButton isIconButton menuItems={languageMenuItems}>
      <img src={locale === 'en' ? FlagEN : FlagES} alt="language" />
    </MenuButton>
  );
};

export default LanguageSelector;
