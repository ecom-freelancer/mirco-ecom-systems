import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Text } from '@packages/ds-core';
import { Avatar, Dropdown, MenuProps, Space } from 'antd';
import { AccountModal } from 'modules/auth/components';
import { ChangePasswordModal } from 'modules/auth/containers/ChangePasswordModal';
import { useAuthContext } from 'modules/auth/hooks';
import React, { useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

export const AccountDropDown: React.FC = () => {
  const { logout, user } = useAuthContext();

  const [showAccountModal, setAccountModalOpen] = useState(false);

  const [showPasswordModal, setPasswordModalOpen] = useState(false);

  const items: MenuProps['items'] = [
    {
      key: '2',
      label: 'Thông tin tài khoản',
      icon: <UserOutlined />,
      onClick: () => setAccountModalOpen(true),
    },
    {
      key: '3',
      label: 'Đổi mật khẩu',
      icon: <FaExchangeAlt />,
      onClick: () => setPasswordModalOpen(true),
    },
    {
      key: '1',
      label: 'Đăng xuất',
      onClick: logout,
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <React.Fragment>
      <Wrapper trigger={['click']} menu={{ items }}>
        <Space wrap={false}>
          <Avatar size={30} src={user?.avatarUrl} icon={<UserOutlined />}>
            {user?.name?.toUpperCase()}
          </Avatar>
          <Text>{user?.name}</Text>

          <DownOutlined style={{ fontSize: 10 }} />
        </Space>
      </Wrapper>
      <AccountModal
        onOpenChange={setAccountModalOpen}
        open={showAccountModal}
        user={user}
      />
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setPasswordModalOpen(false)}
      />
    </React.Fragment>
  );
};

const Wrapper = styled(Dropdown)`
  cursor: pointer;
`;
