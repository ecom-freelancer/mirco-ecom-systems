import { Button, Col, Input, Row, Upload, message } from 'antd';
import React, { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { usePlugin } from '../../hooks/usePlugin';
import { ImagePlugin } from '../../plugins/image';
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload';
import { styled } from '@packages/ds-core';

const beforeUpload = (file: RcFile) => {
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error('Image must smaller than 10MB!');
  }
  return isLt2M;
};

export interface ImageUrlFormInputProps {
  value?: string;
  onChange: (value: string) => void;
}
export const ImageUrlFormInput: React.FC<ImageUrlFormInputProps> = ({
  value,
  onChange,
}) => {
  const { configs } = usePlugin<ImagePlugin>('image');

  const { onImageUpload, accept } = configs || {};

  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      onImageUpload?.(info.file.originFileObj as File)
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
        <Upload
          itemRender={() => <React.Fragment />}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          disabled={loading}
          accept={accept}
          customRequest={() => {}}
        >
          <Button icon={<MdOutlineFileUpload size={18} />} loading={loading} />
        </Upload>
      </Col>
    </Row>
  );
};

const StyledInput = styled(Input)`
  input {
    text-overflow: ellipsis !important;
  }
`;
