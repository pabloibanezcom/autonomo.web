import React, { useEffect } from 'react';
import { IntlProvider, updateIntl } from 'react-intl-redux';
import { useDispatch, useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import './App.scss';
import routes from './routes';
import { selectLocaleAndMessages } from './store/intl/intl';
import { selectPreferences } from './store/preferences/preferencesSlice';
import { getMessagesFromLocale } from './util/language';

const App = () => {
  const dispatch = useDispatch();
  const intl = useSelector(selectLocaleAndMessages);
  const preferences = useSelector(selectPreferences);
  const routesChildren = useRoutes(routes);

  useEffect(() => {
    if (
      preferences?.language &&
      (preferences.language !== intl.locale ||
        !Object.keys(intl.messages).length)
    ) {
      dispatch(
        updateIntl({
          locale: preferences.language,
          messages: getMessagesFromLocale(preferences.language)
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, preferences]);

  const isLanguageLoaded = () => {
    return !!Object.keys(intl.messages).length;
  };

  return (
    <IntlProvider locale="en">
      {isLanguageLoaded() && routesChildren}
    </IntlProvider>
  );
};

export default App;
