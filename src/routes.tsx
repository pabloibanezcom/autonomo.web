import { getPageComponent } from 'components/pages';
import { BreadcrumbsEl, RouteDefinition } from 'interfaces';
import { Navigate } from 'react-router-dom';
import { generateBreadcrumbs, getBreadcrumbById } from 'util/routes';
import routeDefinitions from './routes.json';

const breadCrumbs: BreadcrumbsEl[][] = generateBreadcrumbs(routeDefinitions);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateRoute = (route: RouteDefinition): any => {
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
