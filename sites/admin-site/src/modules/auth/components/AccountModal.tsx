import { Modal } from 'antd';

import React from 'react';
import { Heading, styled } from '@packages/ds-core';
import { IUser } from '../types';
import { UserInfo } from './UserInfo';

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
  const close = () => onOpenChange?.(false);

  return (
    <React.Fragment>
      {user && (
        <StyledModal
          onCancel={close}
          open={open}
          width={420}
          footer={false}
          style={{ padding: 0 }}
          className="modal-padding-0"
          title={<Heading type="h5">Thông tin tài khoản</Heading>}
        >
          <UserInfo user={user} />
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
