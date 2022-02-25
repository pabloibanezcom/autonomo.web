import LoginPage from 'components/auth/login/LoginPage';
import RegisterPage from 'components/auth/register/RegisterPage';
import HomePage from 'components/home/HomePage';
import {
  InvoiceAddPage,
  InvoiceDetailsPage,
  InvoicesListPage
} from 'components/invoices';
import RootPage from 'components/root/RootPage';
import { BreadcrumbsEl, Route, RouteDefinition } from 'interfaces';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { generateBreadcrumbs, getBreadcrumbById } from 'util/routes';
import routeDefinitions from './routes.json';

// const homeBreadcrumbs: BreadcrumbsEl[] = [
//   {
//     text: 'Home'
//   }
// ];

// const breadcrumbs: BreadcrumbsEl[] = [
//   {
//     text: 'Home',
//     href: '/'
//   },
//   {
//     text: 'Invoices'
//   }
// ];

const getPageComponent = (name: string) => {
  if (name === 'RootPage') {
    return RootPage;
  }
  if (name === 'HomePage') {
    return HomePage;
  }
  if (name === 'InvoicesListPage') {
    return InvoicesListPage;
  }
  if (name === 'InvoiceDetailsPage') {
    return InvoiceDetailsPage;
  }
  if (name === 'InvoiceAddPage') {
    return InvoiceAddPage;
  }
  if (name === 'LoginPage') {
    return LoginPage;
  }
  if (name === 'RegisterPage') {
    return RegisterPage;
  }
  return null;
};

const breadCrumbs: BreadcrumbsEl[][] = generateBreadcrumbs(routeDefinitions);

const generateRoute = (route: RouteDefinition): Route => {
  let ElComponent: JSX.Element;
  if (route.to) {
    ElComponent = <Navigate to={route.to} />;
  } else if (route.element) {
    const PageComponent = getPageComponent(route.element);
    ElComponent = (
      <PageComponent
        title={route.title}
        breadcrumbs={
          !route.noBreadcrumbs
            ? getBreadcrumbById(breadCrumbs, route.id)
            : undefined
        }
      />
    );
  }
  return {
    path: route.path,
    index: route.index,
    element: ElComponent,
    children: route.children?.map((children: RouteDefinition) =>
      generateRoute(children)
    )
  };
};

const routes = routeDefinitions.map((route) => generateRoute(route));

export default routes;
