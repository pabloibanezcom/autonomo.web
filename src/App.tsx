import React, { useEffect } from 'react';
import { IntlProvider, updateIntl } from 'react-intl-redux';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import {
  clearError,
  clearRedirecttUrl,
  selectError,
  selectLocaleAndMessages,
  selectPreferences,
  selectRedirectUrl
} from 'store';
import './App.scss';
import routes from './routes';
import { getMessagesFromLocale } from './util/language';

const INTERNAL_SERVER_ERROR_PATH = '/500';
const LOGIN_PATH = '/auth/login';

const App = () => {
  const dispatch = useDispatch();
  const intl = useSelector(selectLocaleAndMessages);
  const preferences = useSelector(selectPreferences);
  const redirectUrl: string = useSelector(selectRedirectUrl);
  const error = useSelector(selectError);
  const location = useLocation();
  const routesChildren = useRoutes(routes);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (redirectUrl) {
      dispatch(clearRedirecttUrl());
      navigate(redirectUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectUrl]);

  useEffect(() => {
    if (error) {
      if (error.code === '500') {
        dispatch(clearError());
        navigate(INTERNAL_SERVER_ERROR_PATH);
      }
      if (error.code === '401' && location.pathname !== LOGIN_PATH) {
        dispatch(clearError());
        navigate(LOGIN_PATH);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

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
