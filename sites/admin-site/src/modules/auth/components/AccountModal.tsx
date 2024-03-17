import { Button, Modal } from 'antd';

import React, { useState } from 'react';
import { Heading, styled, Box } from '@packages/ds-core';
import { IUser } from '../types';
import { UserInfo } from './UserInfo';
import { ProfileForm } from '@packages/react-user';

export interface AccoutModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  user?: IUser;
}

export const AccountModal: React.FC<AccoutModalProps> = ({
  open,
  onOpenChange,
  user,
}) => {
  const [editMode, setEditMode] = useState(false);
  const close = () => onOpenChange?.(false);

  return (
    <React.Fragment>
      {user && (
        <StyledModal
          afterClose={() => {
            setEditMode(false);
          }}
          onCancel={close}
          open={open}
          width={420}
          footer={false}
          style={{ padding: 0 }}
          className="modal-padding-0"
          title={
            <Heading type="h5">
              {editMode ? 'Cập nhật thông tin cá nhân' : 'Thông tin cá nhân'}
            </Heading>
          }
        >
          {!editMode ? (
            <Box>
              <UserInfo user={user} />
              <Box padding={['s6', 's6']}>
                <Button type="link" block onClick={() => setEditMode(true)}>
                  Cập nhật thông tin cá nhân
                </Button>
              </Box>
            </Box>
          ) : (
            <Box padding="s16">
              <ProfileForm
                profile={{
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  phonenumber: user.phonenumber,
                }}
              />
            </Box>
          )}
        </StyledModal>
      )}
    </React.Fragment>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 0 !important;
    border-radius: 0 !important;
  }
  .ant-modal-header {
    margin: 0 !important;
  }

  .ant-modal-title {
    padding: 0.5rem 1rem;
    margin: 0 !important;
  }
`;
