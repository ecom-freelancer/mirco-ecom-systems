import { FormInstance } from 'antd';
import { UploadImages } from 'modules/_shared/components/ImageListFormItem';
import { FormBuilder } from '@packages/react-form-builder';
import { useServices } from 'modules/_shared/hooks';

export interface ProductImagesFormProps {
  form: FormInstance;
  onChange?: (value: string[]) => void;
}

export const ProductImagesForm: React.FC<ProductImagesFormProps> = ({
  form,
  onChange,
}) => {
  const { fileService } = useServices();
  return (
    <div>
      <FormBuilder<{
        images: string[];
      }>
        asChild
        form={form}
        onValuesChange={({ images }) => {
          onChange?.(images || []);
        }}
        formLayout="vertical"
        configs={{
          images: {
            formType: 'custom',
            render: (props) => {
              return <UploadImages {...props} onUpload={fileService.upload} />;
            },
          },
        }}
        layouts={[
          {
            name: 'images',
            span: 24,
          },
        ]}
      />
    </div>
  );
};
