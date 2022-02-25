export default interface RouteDefinition {
  id?: string;
  path?: string;
  index?: boolean;
  title?: string;
  element?: string;
  to?: string;
  useParentBreadcrumbs?: boolean;
  noBreadcrumbs?: boolean;
  breadcrumbsRoute?: {
    path?: string;
    title?: string;
  };
  children?: RouteDefinition[];
}
