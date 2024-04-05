import React, { useRef, useState } from 'react';
import { Box, styled } from '@packages/ds-core';
import { Image, message } from 'antd';
import { MdOutlineFileUpload } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';
import { IImageFile } from './ImageListFormItem';

export interface UploadImageProps {
  value?: string;
  onChange?: (value?: string) => void;
  onUpload?: (file: File) => Promise<string>;
}

export const UploadImageFormItem: React.FC<UploadImageProps> = ({
  value: imageUrl,
  onUpload: upload,
  onChange,
}) => {
  const [image, setImage] = useState<IImageFile | undefined>(
    imageUrl ? { url: imageUrl, id: imageUrl, loading: false } : undefined,
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload?.(e.target.files);
    }
  };

  const onUpload = async (files: FileList) => {
    const file = files?.[0];
    const newImage = {
      id: Math.random().toString(36).substr(2, 9),
      loading: true,
    };

    setImage(newImage);

    upload?.(file)
      .then((url) => {
        setImage((prev) => ({
          ...prev,
          url,
          loading: false,
        }));
        onChange?.(url);
      })
      .catch((e) => message.error(e.message || 'Upload Image Fail'));
  };

  const ref = useRef<HTMLLabelElement>(null);

  const onDelete = (id?: string) => {
    if (!id) return;
    setImage(undefined);
    onChange?.();
  };

  return (
    <Wrapper>
      <label ref={ref}>
        <input
          type="file"
          multiple={false}
          accept="image/*"
          hidden
          onChange={onInputChange}
          style={{ display: 'none' }}
        />
      </label>

      {!image && (
        <ButtonImage onClick={() => ref.current?.click()}>
          <MdOutlineFileUpload size={30} />
        </ButtonImage>
      )}

      {image && (
        <ImageWrapper loading={image.loading} key={image.id}>
          {!image.loading && (
            <React.Fragment>
              <Image
                src={image.url}
                width="100%"
                height="100%"
                fallback="https://via.placeholder.com/150"
                preview={{
                  mask: <React.Fragment />,
                  destroyOnClose: true,
                }}
              />
              <CloseWrapper
                className="icon-close"
                onClick={() => onDelete(image.id)}
              >
                <IoCloseOutline />
              </CloseWrapper>
            </React.Fragment>
          )}
        </ImageWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CloseWrapper = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.lightA300};
  top: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  cursor: pointer;
`;

const ImageWrapper = styled(Box)<{ loading?: boolean }>`
  position: relative;
  aspect-ratio: 1;
  border-radius: 4px;
  overflow: hidden;
  .icon-close {
    display: none;
  }
  :hover .icon-close {
    display: flex;
  }

  ::before {
    content: ${({ loading }) => (loading ? '"loading..."' : '')};
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    justify-content: center;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    background-color: ${({ theme }) => theme.colors.grayA50};
  }
`;
const ButtonImage = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 4px;
  border: 1px dashed #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  :hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryA50};
  }
`;
