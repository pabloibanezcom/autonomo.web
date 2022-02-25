export default interface RouteDefinition {
  id?: string;
  path?: string;
  index?: boolean;
  title?: string;
  element?: string;
  to?: string;
  useParentBreadcrumbs?: boolean;
  noBreadcrumbs?: boolean;
  navbar?: {
    icon: string;
    order?: number;
  };
  breadcrumbsRoute?: {
    path?: string;
    title?: string;
  };
  children?: RouteDefinition[];
}
