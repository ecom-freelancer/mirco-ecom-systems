import { Box, styled } from '@packages/ds-core';
import { Col, Row } from 'antd';

export const ProductImagesForm = () => {
  return (
    <div>
      <Box marginTop="s16">
        <Row gutter={[8, 8]}>
          {Array(5)
            .fill(0)
            .map(() => {
              return (
                <Col span={8}>
                  <ImageWrapper />
                </Col>
              );
            })}
        </Row>
      </Box>
    </div>
  );
};

const ImageWrapper = styled(Box)`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: #fafafa;
  position: relative;
  border-radius: 0.5rem;
`;
