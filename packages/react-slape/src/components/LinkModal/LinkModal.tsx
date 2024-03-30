import { Modal } from 'antd';
import React from 'react';
import { ILink, LinkConfig } from './LinkConfig';

export interface LinkModalProps {
  open: boolean;
  onClose?: () => void;
  onSave?: (link: ILink) => void;
  onUnlink?: () => void;
  initialValue?: Partial<ILink>;
}

const LinkModal: React.FC<LinkModalProps> = ({
  onClose,
  open,
  onSave,
  onUnlink,
  initialValue,
}) => {
  const execFun = (func: (...args) => void) => {
    return (...args) => {
      func(...args);
      onClose();
    };
  };

  return (
    <Modal
      destroyOnClose
      title="Hyperlink"
      open={open}
      onCancel={onClose}
      footer={null}
      styles={{
        mask: {
          backgroundColor: 'transparent',
        },

        header: {
          borderBottom: '1px solid #fafafa',
          paddingBottom: '0.5rem',
          marginBottom: '0.5rem',
        },
      }}
    >
      <LinkConfig
        onCancel={onClose}
        onSubmit={execFun(onSave)}
        onUnlink={execFun(onUnlink)}
        initialValue={initialValue}
      />
    </Modal>
  );
};

export default LinkModal;
