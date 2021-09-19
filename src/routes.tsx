import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthContainer from './containers/auth/AuthContainer';
import HomeContainer from './containers/home/HomeContainer';
import AddInvoiceContainer from './containers/invoice/add-invoice/AddInvoiceContainer';
import InvoicesListContainer from './containers/invoice/invoices-list/InvoicesListContainer';
import RootContainer from './containers/root/RootContainer';

const ROOT_PATH = '/';
const AUTH_PATH = '/auth';
const HOME_PATH = '/home';
const INVOICES_LIST_PATH = '/invoices';
const INVOICES_NEW_PATH = '/invoices/new';

export const rootRoutes = () => (
  <Switch>
    <Route path={AUTH_PATH} component={AuthContainer} />
    <Route path={ROOT_PATH} component={RootContainer} />
    <Redirect to={ROOT_PATH} />
  </Switch>
);

export const dashboardRoutes = () => (
  <Switch>
    <Route path={HOME_PATH} component={HomeContainer} />
    <Route path={INVOICES_LIST_PATH} exact component={InvoicesListContainer} />
    <Route path={INVOICES_NEW_PATH} exact component={AddInvoiceContainer} />
    <Redirect to={HOME_PATH} />
  </Switch>
);
