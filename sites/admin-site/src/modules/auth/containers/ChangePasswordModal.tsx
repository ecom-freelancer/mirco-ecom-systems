import { ChangePasswordForm } from '@packages/react-user';
import { StyledModal } from 'modules/_shared/components/StyledModal';
import { IModalProps } from 'modules/_shared/types';
import { authService } from '../auth-service';
import { useLogin } from '../hooks/useLogin';

export interface ChangePasswordModalProps extends IModalProps {}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { loading, changePassword } = useLogin();
  return (
    <StyledModal open={isOpen} destroyOnClose onCancel={onClose} footer={false}>
      <ChangePasswordForm
        onValidateOldPassword={authService.checkPassword}
        loading={loading}
        onSubmit={(values) =>
          changePassword(values.password, values.newPassword)
        }
      />
    </StyledModal>
  );
};
