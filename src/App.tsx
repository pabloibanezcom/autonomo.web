import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import { rootRoutes } from './routes';

const App = () => {
  return (
    <IntlProvider locale="en" messages={{}}>
      <Router>{rootRoutes()}</Router>
    </IntlProvider>
  );
};

export default App;
