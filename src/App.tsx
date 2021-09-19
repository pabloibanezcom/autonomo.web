import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import { rootRoutes } from './routes';

const App = () => {
  return <Router>{rootRoutes()}</Router>;
};

export default App;
