import { MenuButton } from 'components/shared';
import { CircleFlag } from 'react-circle-flags';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocale, setLanguage } from 'store';

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

  const mapLocale = (locale: string): string => {
    return locale === 'en' ? 'gb' : locale;
  };

  return (
    <MenuButton isIconButton menuItems={languageMenuItems} menuMargin={20}>
      <CircleFlag countryCode={mapLocale(useSelector(selectLocale))} />
    </MenuButton>
  );
};

export default LanguageSelector;
