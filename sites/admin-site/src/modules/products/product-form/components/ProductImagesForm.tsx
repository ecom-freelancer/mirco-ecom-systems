import { FormInstance } from 'antd';
import { UploadImages } from 'modules/_shared/components/ImageListFormItem';
import { FormBuilder } from '@packages/react-form-builder';
import { fileToBase64 } from '@packages/react-helper';

export interface ProductImagesFormProps {
  form: FormInstance;
  onChange?: (value: string[]) => void;
}

export const ProductImagesForm: React.FC<ProductImagesFormProps> = ({
  form,
  onChange,
}) => {
  return (
    <div>
      <FormBuilder<{
        images: string[];
      }>
        form={form}
        onValuesChange={({ images }) => {
          onChange?.(images || []);
        }}
        formLayout="vertical"
        configs={{
          images: {
            formType: 'custom',
            render: (props) => {
              return <UploadImages {...props} onUpload={fileToBase64} />;
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
