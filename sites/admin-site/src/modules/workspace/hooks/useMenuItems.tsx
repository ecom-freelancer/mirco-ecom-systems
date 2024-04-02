import { useMemo } from 'react';
import { useMatches } from 'react-router';
import { MenuProps } from 'antd';
import { IRoute } from 'configs/router';
import { Link } from 'react-router-dom';
import { workspacesRoutes } from '../routers';

type IMenuItem = NonNullable<MenuProps['items']>[number];

export const useMenuItems = (defaultCollapsed?: boolean) => {
  const matchs = useMatches();

  const { menuItems } = useMemo(() => {
    const route2Menu = (route: IRoute, parentKey = ''): IMenuItem => {
      const menuItemKey = route.path || parentKey;
      const childrenItems = route?.children?.filter((c) => !c.hiddenOnMenu);
      return {
        label: (
          <Link to={route.path || ''} style={{ color: 'unset' }}>
            {route.label}
          </Link>
        ),
        key: route.index ? menuItemKey + '/' : menuItemKey,
        children: childrenItems?.map((c) => route2Menu(c, menuItemKey)),
        icon: route.icon,
        className: 'root-menu-item',
      };
    };
    const items: IMenuItem[] = workspacesRoutes
      .filter((c) => !c.hiddenOnMenu)
      .map((route) => route2Menu(route));

    return {
      menuItems: items,
    };
  }, []);

  const defaultOpenItems = defaultCollapsed
    ? []
    : workspacesRoutes
        .filter((route) => route.defaultOpen)
        .map((r) => r.path) ?? [];

  return {
    menuItems,
    defaultOpenItems,
    defaultSeletedKeys: matchs.map((m) => m.pathname),
  };
};
