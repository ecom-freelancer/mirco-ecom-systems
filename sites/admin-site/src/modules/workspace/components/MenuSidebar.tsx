import { Divider, Layout, Menu } from 'antd';
import { useWorkSpaceContext } from '../context';
import { useMenuItems } from '../hooks/useMenuItems';
import { styled } from '@packages/ds-core';

export const MenuSidebar: React.FC = () => {
  const { collapsed } = useWorkSpaceContext();
  const { menuItems, defaultSeletedKeys, defaultOpenItems } =
    useMenuItems(collapsed);
  return (
    <Layout.Sider width={270} collapsible trigger={null} collapsed={collapsed}>
      <Wrapper>
        <MenuStyled
          items={menuItems}
          className="root-menu"
          defaultSelectedKeys={defaultSeletedKeys || []}
          defaultOpenKeys={defaultOpenItems as string[]}
          mode="inline"
        />
        <div
          style={{
            padding: '0.5rem',
          }}
        >
          <Divider />
          <div>1.0.0</div>
        </div>
      </Wrapper>
    </Layout.Sider>
  );
};

const MenuStyled = styled(Menu)`
  padding: 0 0.5rem;
  .root-menu-item,
  .ant-menu-submenu-title {
    align-items: center;
    column-gap: 0.5rem;
  }
  height: 100%;
  flex: 1;
  overflow-y: auto;

  //style scroll bar
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.gray300};
  }
`;
const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;
