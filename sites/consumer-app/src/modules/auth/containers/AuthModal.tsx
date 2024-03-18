import { Modal } from 'antd';
import { useAuthContext } from '../auth-context';
import { styled } from '@packages/ds-core';
import { AuthForm } from '../components/AuthForm';

export interface AuthModalProps {
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}
export const AuthModal: React.FC<AuthModalProps> = ({
  showLoginModal,
  setShowLoginModal,
}) => {
  const {} = useAuthContext();
  return (
    <StyledAuthModal
      open={showLoginModal}
      footer={null}
      centered
      width={800}
      onCancel={() => setShowLoginModal(false)}
    >
      <AuthForm />
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
