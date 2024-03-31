import React, { useRef, useState } from 'react';
import { Box, styled } from '@packages/ds-core';
import { Col, Image, Row } from 'antd';
import { MdOutlineFileUpload } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';

export interface UploadImagesProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  onUpload?: (file: File) => Promise<string>;
}

export interface IImageFile {
  id?: string;
  url?: string;
  loading?: boolean;
}

export const UploadImages: React.FC<UploadImagesProps> = ({
  value: imageUrls,
  onUpload: upload,
  onChange,
}) => {
  const [images, setImages] = useState<Array<IImageFile>>(
    imageUrls?.map((url) => ({ url, id: url, loading: false })) || [],
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload?.(e.target.files);
    }
  };

  const onUpload = async (files: FileList) => {
    const newImages = Array.from(files).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      loading: true,
    }));
    setImages([...images, ...newImages]);

    Promise.all(
      newImages.map(async (image, index) => {
        const url = await upload?.(files[index]);
        setImages((prev) =>
          prev.map((prevImage) =>
            prevImage.id === image.id
              ? { ...prevImage, url, loading: false }
              : prevImage,
          ),
        );
        return url || '';
      }),
    ).then((urls) => onChange?.(urls));
  };

  const ref = useRef<HTMLLabelElement>(null);

  return (
    <Wrapper>
      <label ref={ref}>
        <input
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={onInputChange}
          style={{ display: 'none' }}
        />
      </label>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <ButtonImage onClick={() => ref.current?.click()}>
            <MdOutlineFileUpload size={30} />
          </ButtonImage>
        </Col>
        {images.map((image) => (
          <Col span={8}>
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
                  <CloseWrapper className="icon-close">
                    <IoCloseOutline />
                  </CloseWrapper>
                </React.Fragment>
              )}
            </ImageWrapper>
          </Col>
        ))}
      </Row>
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
