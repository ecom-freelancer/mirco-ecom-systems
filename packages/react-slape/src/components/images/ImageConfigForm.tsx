import { FormBuilder } from '@packages/react-form-builder';
import React, { useEffect } from 'react';
import { ImageUrlFormInput } from './ImageUrlFormInput';
import { useForm } from 'antd/es/form/Form';
import { Box, Flex, Text } from '@packages/ds-core';
import { ImageElement } from '../../plugins/image/render-element';
import { Button } from 'antd';

export type ImageFormType = Pick<
  ImageElement,
  'alt' | 'url' | 'height' | 'name' | 'width'
>;

export interface ImageFormConfigProps {
  initialValues?: Partial<ImageFormType>;
  onCancel?: () => void;
  onSave?: (data: ImageFormType) => void;
}

export const ImageFormConfig: React.FC<ImageFormConfigProps> = ({
  initialValues,
  onCancel,
  onSave,
}) => {
  const [form] = useForm();
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        form.submit();
      }
    };
    ref.current?.addEventListener('keydown', handleKeyDown);
    return () => {
      ref.current?.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleSave = (data: ImageFormType) => {
    onSave?.(data);
  };

  return (
    <div ref={ref}>
      <FormBuilder<ImageFormType>
        form={form}
        initialValues={initialValues}
        onSubmit={handleSave}
        configs={{
          url: {
            label: 'Image',
            formType: 'custom',
            render: ImageUrlFormInput,
            validateFirst: true,
            rules: [
              {
                required: true,
                message: 'Please input image url',
              },
              {
                pattern:
                  /(^data:image\/[a-z]+;base64,)|(^(http|https):\/\/[^ "]+$)/,
                message: 'Invalid image url',
              },
            ],
          },
          name: {
            formType: 'input',
            label: 'Image name',
          },
          alt: {
            formType: 'input',
            label: 'Alt',
            placeholder: 'Eg: Alt text for image',
          },
          height: {
            formType: 'input-number',
            label: (
              <Text>
                Height&nbsp;
                <Text color="textSecondary">(px)</Text>
              </Text>
            ),
          },
          width: {
            formType: 'input-number',
            label: (
              <Text>
                Width&nbsp;
                <Text color="textSecondary">(px)</Text>
              </Text>
            ),
          },
        }}
        layouts={[
          {
            name: 'url',
            span: 24,
          },
          {
            name: 'alt',
            span: 24,
          },
          {
            name: 'name',
            span: 24,
          },
          {
            name: 'width',
            span: 12,
          },
          {
            name: 'height',
            span: 12,
          },
        ]}
        formLayout="vertical"
      />
      <Box marginTop="s16">
        <Flex gapX="s16" justify="end">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" onClick={form.submit}>
            Save
          </Button>
        </Flex>
      </Box>
    </div>
  );
};
