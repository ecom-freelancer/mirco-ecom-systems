import { Modal } from 'antd';
import { useAuthContext } from '../auth-context';
import { styled } from '@packages/ds-core';
import { AuthForm } from '../components/AuthForm';

export interface AuthModalProps {
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  mode?: 'login' | 'register' | 'forgot-password';
}
export const AuthModal: React.FC<AuthModalProps> = ({
  showLoginModal,
  setShowLoginModal,
  mode,
}) => {
  const {} = useAuthContext();

  const close = () => setShowLoginModal(false);

  return (
    <StyledAuthModal
      open={showLoginModal}
      footer={null}
      centered
      width={800}
      onCancel={close}
      destroyOnClose={true}
    >
      <AuthForm mode={mode} onFinished={close} />
    </StyledAuthModal>
  );
};

const StyledAuthModal = styled(Modal)`
  .ant-modal-content {
    padding: 0 !important;
    background-color: transparent;
  }

  // transition setting
`;
