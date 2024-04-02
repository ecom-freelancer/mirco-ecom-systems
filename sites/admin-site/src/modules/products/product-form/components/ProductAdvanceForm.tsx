import { FormBuilder } from '@packages/react-form-builder';
import { FormInstance, Tag } from 'antd';
import { IProductAdvanceInfo } from '../types';
import { KeywordsFormInput, KeywordsFormInputProps } from './KeywordsFormInput';
import {
  ProductStatus,
  deliveryOptions,
  productStatuses,
} from 'configs/constants/product';

export interface ProductAdvanceFormProps {
  form: FormInstance;
  initialValues?: Partial<IProductAdvanceInfo>;
}

export const ProductAdvanceForm: React.FC<ProductAdvanceFormProps> = ({
  form,
  initialValues,
}) => {
  return (
    <div>
      <FormBuilder<IProductAdvanceInfo>
        form={form}
        asChild
        initialValues={initialValues}
        formLayout="vertical"
        configs={{
          status: {
            formType: 'select',
            label: 'Status',
            options: productStatuses,
            defaultValue: ProductStatus.draft,
            tagRender: (props) => {
              const { label, closable, onClose } = props;
              const onPreventMouseDown = (
                event: React.MouseEvent<HTMLSpanElement>,
              ) => {
                event.preventDefault();
                event.stopPropagation();
              };
              return (
                <Tag
                  color={(props as every).color}
                  onMouseDown={onPreventMouseDown}
                  closable={closable}
                  onClose={onClose}
                  style={{ marginInlineEnd: 4 }}
                >
                  {label}
                </Tag>
              );
            },
          },
          deliveryType: {
            formType: 'select',
            options: deliveryOptions,
            label: 'Delivery Type',
          },
          keywords: {
            formType: 'custom',
            label: 'Tags',
            render: (props) => {
              return (
                <KeywordsFormInput {...(props as KeywordsFormInputProps)} />
              );
            },
          },
        }}
        layouts={[
          {
            name: 'status',
            span: 24,
          },
          {
            name: 'deliveryType',
            span: 24,
          },
          {
            name: 'keywords',
            span: 24,
          },
        ]}
      />
    </div>
  );
};
