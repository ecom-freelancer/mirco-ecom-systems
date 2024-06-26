import { Box, styled } from '@packages/ds-core';
import { SlapeEditor, image } from '@packages/react-slape';
import { message } from 'antd';
import { useServices } from 'modules/_shared/hooks';
import React, { useMemo } from 'react';

export interface FormDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const FormDescriptionInput: React.FC<FormDescriptionInputProps> = ({
  value,
  onChange,
}) => {
  const { fileService } = useServices();

  const initialValue = useMemo(() => {
    try {
      if (!value) return null;
      return JSON.parse(value);
    } catch (e) {
      console.error(e); // Expected error: `e` is defined but never used  no-unused-vars
      return null;
    }
  }, [value]);

  const onUploadFile = async (file: File) => {
    try {
      const url = await fileService.upload(file);
      return url;
    } catch (e) {
      message.error('Upload file failed');
      return '';
    }
  };

  const onChangeValue = (value) => {
    try {
      onChange(JSON.stringify(value));
    } catch (e) {
      console.error(e); // Expected error: `e` is defined but never used  no-unused-vars
    }
  };

  return (
    <Wrapper>
      <SlapeEditor
        plugins={[
          image({
            onImageUpload: onUploadFile,
          }),
        ]}
        placeholder="Write a litte for product"
        minHeight="100px"
        maxHeight="700px"
        initialValue={initialValue}
        onChange={onChangeValue}
      />
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;

  :focus-within {
    border-color: ${({ theme }) => theme.colors.primary300};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primaryA100};
  }
`;
