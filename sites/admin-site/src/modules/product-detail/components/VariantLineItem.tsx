import React from 'react';
import { IVariant } from '../types/variant';
import { Box, Flex, Text, styled } from '@packages/ds-core';
import { Col, Row, Tag } from 'antd';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { Color } from '@packages/ds-core/dist/theme/token';

export interface VariantLineItemProps {
  variant: IVariant;
  onEdit?: () => void;
  index?: number;
}

export const VariantLineItem: React.FC<VariantLineItemProps> = ({
  variant,
  onEdit,
  index,
}) => {
  return (
    <Wrapper>
      <Row gutter={[16, 16]}>
        <Col span={1}>
          <Text>{index}</Text>
        </Col>
        <Col span={8}>
          <Flex align="center" gapX="s8">
            {variant.items?.map((item, index) => (
              <React.Fragment key={item.id}>
                {index > 0 && <Text> + </Text>}
                <Tag key={item.id} color="gold" style={{ marginRight: 0 }}>
                  {item.attributeOption?.name}
                </Tag>
              </React.Fragment>
            ))}
          </Flex>
        </Col>
        <Col span={4}>
          <Box style={{ minWidth: 120, textAlign: 'right' }}>
            {variant.sku ? (
              <Tag color="success">{variant.sku}</Tag>
            ) : (
              <Tag>No SKU</Tag>
            )}
          </Box>
        </Col>
        <Col span={3}>
          <Flex gap="s8">
            <ButtonIcon color="primary300" onClick={onEdit}>
              <BiPencil />
            </ButtonIcon>
            <ButtonIcon color="error300">
              <BiTrash />
            </ButtonIcon>
          </Flex>
        </Col>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  padding: 0.75rem 0.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayA50};
`;

const ButtonIcon = styled.div<{
  color?: Color;
}>`
  background-color: ${({ theme }) => theme.colors.greyA50};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  aspect-ratio: 1/1;
  width: 1.5rem;
  height: 1.5rem;
  color: ${({ theme, color }) => theme.colors[color || 'greyA100']};
  display: inline-flex;
  justify-items: center;
  align-items: center;
  :hover {
    background-color: ${({ theme }) => theme.colors.greyA100};
  }
`;
