import { Button, Col, Input, Row } from 'antd';
import React, { useRef, useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { usePlugin } from '../../hooks/usePlugin';
import { ImagePlugin } from '../../plugins/image';
import { styled } from '@packages/ds-core';

export interface ImageUrlFormInputProps {
  value?: string;
  onChange: (value: string) => void;
}
export const ImageUrlFormInput: React.FC<ImageUrlFormInputProps> = ({
  value,
  onChange,
}) => {
  const { configs } = usePlugin<ImagePlugin>('image');
  const ref = useRef<HTMLLabelElement>(null);

  const { onImageUpload, accept } = configs || {};

  const [loading, setLoading] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files?.[0];
      setLoading(true);
      onImageUpload?.(file)
        .then((url) => {
          onChange?.(url);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Row gutter={[8, 8]}>
      <Col flex={1}>
        <StyledInput
          addonBefore="URL"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Col>
      <Col>
        <label ref={ref}>
          <input
            type="file"
            multiple={false}
            accept={accept || 'image/*'}
            hidden
            onChange={onInputChange}
            style={{ display: 'none' }}
          />
        </label>
        <Button
          icon={<MdOutlineFileUpload size={18} />}
          loading={loading}
          onClick={() => ref.current?.click()}
        />
      </Col>
    </Row>
  );
};

const StyledInput = styled(Input)`
  input {
    text-overflow: ellipsis !important;
  }
`;
