import { Button, Layout, Row } from 'antd';
import { useWorkSpaceContext } from '../../context';
import { FiMenu } from 'react-icons/fi';
import { styled } from '@packages/ds-core';
import { AccountDropDown } from './AccountDropDown';

export interface TopbarProps {}

export const Topbar: React.FC<TopbarProps> = () => {
  const { collapsed, toggleCollapsed } = useWorkSpaceContext();

  return (
    <StyledHeader>
      <StyleHeaderSidebar collapsed={collapsed}>
        <StyleLogo src={'logo.svg'} show={!collapsed} />
        <StyleMiniLogo src="logo-mini.svg" show={collapsed} />
      </StyleHeaderSidebar>

      <MainTopBar>
        <Row>
          <Button
            size="large"
            type="text"
            icon={<FiMenu size={20} />}
            onClick={toggleCollapsed}
          />
        </Row>
        <Row>
          <AccountDropDown />
        </Row>
      </MainTopBar>
    </StyledHeader>
  );
};

const StyledHeader = styled(Layout.Header)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0px 5px 21px -5px #cdd1e1;
`;

const StyleHeaderSidebar = styled.div<{ collapsed: boolean }>`
  width: ${({ collapsed }) => (collapsed ? '80px' : '270px')};
  transition: width 0.25s;
  max-height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleLogo = styled.img<{
  show: boolean;
}>`
  object-fit: cover;
  max-width: 100%;
  width: 200px;
  ${({ show }) => !show && 'display: none;'}
`;

const StyleMiniLogo = styled.img<{ show: boolean }>`
  object-fit: cover;
  max-width: 100%;
  width: 50px;
  ${({ show }) => !show && 'display: none;'}
`;

const MainTopBar = styled.div`
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  flex: 1;
`;
