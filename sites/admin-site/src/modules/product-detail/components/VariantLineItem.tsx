import React from 'react';
import { IVariant } from '../types.ts/variant';
import { Flex, styled } from '@packages/ds-core';
import { Checkbox, Tag, Tooltip } from 'antd';
import { BiPencil, BiPlus, BiTrash } from 'react-icons/bi';
import { Color } from '@packages/ds-core/dist/theme/token';

export interface VariantLineItemProps {
  variant: IVariant;
  onEdit?: () => void;
}

export const VariantLineItem: React.FC<VariantLineItemProps> = ({
  variant,
  onEdit,
}) => {
  return (
    <Wrapper gapX={'s16'} justify="space-between">
      <Flex gapX={'s16'}>
        <Checkbox />
        <Flex align="center">
          {variant.items?.map((item) => (
            <Tag key={item.id} color="gold">
              {item.attributeOption?.name}
            </Tag>
          ))}
        </Flex>
      </Flex>
      <Flex gap="s8">
        <Tooltip title="Add SKU">
          <ButtonIcon color="primary300">
            <BiPlus />
          </ButtonIcon>
        </Tooltip>
        <ButtonIcon color="primary300" onClick={onEdit}>
          <BiPencil />
        </ButtonIcon>
        <ButtonIcon color="error300">
          <BiTrash />
        </ButtonIcon>
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
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
