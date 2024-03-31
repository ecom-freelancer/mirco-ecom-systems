import { Box, Flex } from '@packages/ds-core';
import { FormBuilder } from '@packages/react-form-builder';
import { Button } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { debounce } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { MdOutlineLinkOff } from 'react-icons/md';

export interface ILink {
  href: string;
  rel: string;
  target?: string;
}

export interface LinkConfigProps {
  initialValue?: Partial<ILink>;
  onSubmit?: (link: ILink) => void;
  onUnlink?: () => void;
  onCancel?: () => void;
}

export const LinkConfig: React.FC<LinkConfigProps> = ({
  initialValue,
  onUnlink,
  onSubmit,
  onCancel,
}) => {
  const [form] = useForm();

  const ref = React.useRef<HTMLDivElement>(null);

  const handleSubmit = useMemo(() => {
    return debounce(() => {
      form.submit();
    }, 150);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    };
    ref.current?.addEventListener('keydown', handleKeyDown);
    return () => {
      ref.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={ref}>
      <FormBuilder<ILink>
        formLayout="vertical"
        form={form}
        onSubmit={onSubmit}
        initialValues={initialValue}
        configs={{
          href: {
            formType: 'input',
            autoFocus: true,
            label: 'URL',
            required: false,
            placeholder: 'https://example.com',
            rules: [
              {
                required: true,
                message: 'URL is required',
              },
              {
                type: 'url',
                message: 'Invalid URL',
              },
            ],
          },
          rel: {
            formType: 'select',
            label: 'Rel',
            placeholder: 'noopener',
            options: [
              {
                value: 'noopener',
              },
              {
                value: 'noreferrer',
              },
            ],
          },
          target: {
            formType: 'select',
            label: 'Target',
            placeholder: '_blank',
            options: [
              {
                value: '_blank',
              },
              {
                value: '_self',
              },
              {
                value: '_parent',
              },
              {
                value: '_top',
              },
            ],
          },
        }}
        layouts={[
          {
            name: 'href',
            span: 24,
          },
          {
            name: 'rel',
            span: 12,
          },
          {
            name: 'target',
            span: 12,
          },
        ]}
      />
      <Box marginTop="s16">
        <Flex justify="space-between">
          <Flex>
            {onUnlink && (
              <Button danger onClick={onUnlink}>
                <Flex gapX="s4" align="center">
                  <MdOutlineLinkOff size={18} />
                  UnLink
                </Flex>
              </Button>
            )}
          </Flex>
          <Flex gapX="s8">
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" onClick={form.submit}>
              Save
            </Button>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};
