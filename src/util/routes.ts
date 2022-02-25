import { BreadcrumbsEl, NavbarEl, RouteDefinition } from 'interfaces';

export const generateBreadcrumbs = (
  routes: RouteDefinition[]
): BreadcrumbsEl[][] => {
  const result: BreadcrumbsEl[][] = [];
  const buildArrayForNode = (
    parents: BreadcrumbsEl[],
    route: RouteDefinition
  ): void => {
    const newArray =
      route.useParentBreadcrumbs || (!route.title && !route.breadcrumbsRoute)
        ? parents
        : [
            ...parents,
            {
              id: route.id,
              text: route.breadcrumbsRoute?.title || route.title,
              href: `${parents
                .map((p) => (p.href === '/' ? '' : p.href))
                .join('')}/${route.path}`
            }
          ];
    result.push(newArray);
    route.children?.forEach((r) => buildArrayForNode(newArray, r));
  };

  routes.forEach((route) => {
    return buildArrayForNode([], route);
  });

  return result;
};

export const getBreadcrumbById = (
  breadcrumbs: BreadcrumbsEl[][],
  lastNodeId: string
): BreadcrumbsEl[] => {
  return breadcrumbs.find(
    (array) => array[array.length - 1]?.id === lastNodeId
  );
};

export const generateNavbarElements = (
  routes: RouteDefinition[]
): NavbarEl[] => {
  const result: NavbarEl[] = [];
  const checkIfRouteIsNavbarEl = (route: RouteDefinition) => {
    if (route.navbar) {
      result.push({
        text: route.title,
        href: route.path,
        icon: route.navbar.icon,
        order: route.navbar.order
      });
    }
    if (route.children?.length) {
      route.children.forEach((r) => checkIfRouteIsNavbarEl(r));
    }
  };

  routes.forEach((r) => checkIfRouteIsNavbarEl(r));
  return result.sort((a, b) => a.order - b.order);
};
