import FlagEN from 'assets/flags/en.png';
import FlagES from 'assets/flags/es.png';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocale, setLanguage } from 'store';
import MenuButton from '../menuButton/MenuButton';

const LanguageSelector = () => {
  const dispatch = useDispatch();

  const languageMenuItems = [
    {
      content: 'English',
      onClick: () => dispatch(setLanguage('en'))
    },
    {
      content: 'Español',
      onClick: () => dispatch(setLanguage('es'))
    }
  ];

  return (
    <MenuButton isIconButton menuItems={languageMenuItems}>
      <img
        src={useSelector(selectLocale) === 'en' ? FlagEN : FlagES}
        alt="language"
      />
    </MenuButton>
  );
};

export default LanguageSelector;
