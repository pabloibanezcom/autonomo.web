export default interface Route {
  path?: string;
  index?: boolean;
  element?: JSX.Element;
  children?: Route[];
}
