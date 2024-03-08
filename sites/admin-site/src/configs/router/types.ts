import { RouteObject } from 'react-router';

export type IRoute = Omit<RouteObject, 'children'> & {
  /**
   * item will be hide on Mneu
   */
  hiddenOnMenu?: boolean;
  label?: string;
  icon?: React.ElementType;
  children?: IRoute[];
  permision?: string[];
  defaultOpen?: boolean;
};

export interface MenuItem extends Pick<IRoute, 'icon' | 'label' | 'path'> {
  key: string;
  children?: MenuItem[];
}
