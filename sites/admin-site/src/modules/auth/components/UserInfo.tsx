import { CameraOutlined } from '@ant-design/icons';
import { Avatar, Image, Tag, Typography } from 'antd';

import React from 'react';
import { IUser } from '../types';
import { Box, Flex, Heading, styled } from '@packages/ds-core';

export interface UserInfoInfoProps {
  user: IUser;
  allowChangeAvatar?: boolean;
  onChangeAvatar?: (file) => void;
}
export const UserInfo: React.FC<UserInfoInfoProps> = ({ user }) => {
  return (
    <div>
      <React.Fragment>
        <MainInfoWrapper>
          <StyledImage src="/user_background.jpeg" preview={false} />
          <Flex align="center" gapX="s24">
            <AvataWrapper>
              <Avatar
                src={user.avatarUrl}
                size={100}
                className="avatar"
                style={{
                  backgroundColor: '#fafafa',
                }}
              >
                {user.name?.[0].toUpperCase()}
              </Avatar>
              <Box className="upload-avatar">
                <CameraOutlined className="upload-avatar-button" />
              </Box>
            </AvataWrapper>
            <Box>
              <Heading type="h4" style={{ marginBottom: 0 }}>
                {user.name}
              </Heading>
              <Typography.Text type="secondary">Admin</Typography.Text>
            </Box>
          </Flex>
        </MainInfoWrapper>
        <Box style={{ height: 8, backgroundColor: '#f7f4f4' }} />
        <PersonalInfoWrapper>
          <Heading type="h5" style={{ marginBottom: '1rem' }}>
            Thông tin cá nhân
          </Heading>
          <Flex direction="column" gapY="s12">
            <Flex>
              <Typography.Text className="label">Email</Typography.Text>
              <Typography.Text className="value">{user.email}</Typography.Text>
            </Flex>
            <Flex>
              <Typography.Text className="label">Số điện thoại</Typography.Text>
              <Typography.Text className="value">
                {user.phonenumber?.replace(
                  /([^]{3})(\d+)(\d{3})/g,
                  '$1 $2 $3',
                ) || 'N/A'}
              </Typography.Text>
            </Flex>
            <Flex>
              <Typography.Text className="label">Ngày tham gia</Typography.Text>
              <Typography.Text className="value">22/01/2023</Typography.Text>
            </Flex>
            <Flex>
              <Typography.Text className="label">Trạng thái</Typography.Text>
              <Typography.Text className="value">
                <Tag color="success">Đã xác thực</Tag>
              </Typography.Text>
            </Flex>
          </Flex>
        </PersonalInfoWrapper>
        <Box style={{ height: 8, backgroundColor: '#f7f4f4' }} />
      </React.Fragment>
    </div>
  );
};

const MainInfoWrapper = styled(Box)`
  position: relative;
  padding-bottom: 1rem;
`;

const PersonalInfoWrapper = styled(Box)`
  position: relative;
  padding: 1rem 1rem;

  .label {
    width: 125px;
    color: #858585;
  }
`;

const StyledImage = styled(Image)`
  aspect-ratio: 5/2;
`;

const AvataWrapper = styled(Box)`
  position: relative;
  margin-top: -30px;
  .avatar {
    border: 3px solid white;
    margin-left: 30px;
    color: #9e9e9e;
    box-shadow: 0px 0px 1px 0px rgba(110, 110, 110, 0.2),
      0px 0px 1px 0px rgba(0, 0, 0, 0.14),
      0px 1px 3px 0px rgba(120, 120, 120, 0.2);
  }

  .upload-avatar {
    position: absolute;
    z-index: 2;
    right: 5px;
    bottom: 0;
  }

  .upload-avatar-button {
    background-color: #fafafa;
    border-radius: 50%;
    padding: 0.125rem;
    border: 2px solid white;
    box-shadow: 0px 0px 1px 0px rgba(110, 110, 110, 0.2),
      0px 0px 1px 0px rgba(0, 0, 0, 0.14),
      0px 1px 3px 0px rgba(120, 120, 120, 0.2);
  }
`;
