import { StyledModal } from 'modules/_shared/components';
import { SeoInfoForm } from '../components';
import { ISeoInfo } from '../types';
import { useForm } from 'antd/es/form/Form';

export interface SeoInfoModalProps {
  open: boolean;
  onClose: () => void;
  defaultValues?: ISeoInfo;
  onSubmit?: (value: ISeoInfo) => void;
  loading?: boolean;
}

export const SeoInfoModal: React.FC<SeoInfoModalProps> = ({
  onClose,
  open,
  defaultValues,
  onSubmit,
  loading,
}) => {
  const [form] = useForm();

  const submit = async (values: ISeoInfo) => {
    await onSubmit?.(values);
    onClose();
  };

  return (
    <StyledModal
      title="Setup SEO"
      centered
      onCancel={onClose}
      open={open}
      width={800}
      onOk={() => form.submit()}
      okText="Save"
      confirmLoading={loading}
    >
      <SeoInfoForm
        initialValues={defaultValues}
        onSubmit={submit}
        form={form}
      />
    </StyledModal>
  );
};
