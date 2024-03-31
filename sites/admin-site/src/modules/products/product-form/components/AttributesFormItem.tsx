import { Box, Flex, Text, styled } from '@packages/ds-core';
import { Button, Col, Row, Tag } from 'antd';
import { t } from 'i18next';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { IProductAttribute } from '../types';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AiOutlinePlus } from 'react-icons/ai';

import React from 'react';
import AttributeUpsertForm from './AttributeForm';

export interface ProductAttributesFormItemProps {
  value?: IProductAttribute[];
  onChange?: (value: IProductAttribute[]) => void;
}

export const ProductAttributesFormItem: React.FC<
  ProductAttributesFormItemProps
> = ({ value: attributes = [], onChange: setAttributes }) => {
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const previous = [...attributes];
      const activeIndex = previous.findIndex(
        (i, index) => (i.order || index + 1) === active.id,
      );
      const overIndex = previous.findIndex(
        (i, index) => (i.order || index + 1) === over?.id,
      );

      const newAttributes = arrayMove(previous, activeIndex, overIndex).map(
        (attribute, index) => {
          return {
            ...attribute,
            order: index + 1,
          } as IProductAttribute;
        },
      );

      setAttributes?.(newAttributes);
    }
  };

  return (
    <ImageWrapper>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={attributes.map((i, index) => i.order || index + 1)}
        >
          <Flex direction="column" gap="s4">
            {attributes.map((attribute, index) => {
              return (
                <AttributeItem
                  key={attribute.id || index}
                  attribute={attribute}
                  order={attribute.order || index + 1}
                />
              );
            })}
          </Flex>
        </SortableContext>
      </DndContext>
      <AttributeUpsertForm />
      <Flex>
        <Button block type="primary" ghost icon={<AiOutlinePlus />}>
          Add a Attribute
        </Button>
      </Flex>
    </ImageWrapper>
  );
};

const AttributeItem: React.FC<{
  attribute: IProductAttribute;
  order: number;
}> = ({ attribute, order }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: order,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <Row
      align="middle"
      className="attribute-item"
      gutter={8}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <Col>
        <Box
          padding={'s12'}
          ref={setActivatorNodeRef}
          style={{ touchAction: 'none', cursor: 'move' }}
          {...listeners}
        >
          <MdOutlineDragIndicator size={20} />
        </Box>
      </Col>
      <Col flex={1}>
        <Row align="middle">
          <Col span={10}>
            <Text fontWeight="bold"> {attribute.name} </Text>
          </Col>
          <Col span={14}>
            <Flex>
              {attribute?.options?.map((option) => {
                return <Tag key={option.id}>{option.name}</Tag>;
              })}
            </Flex>
          </Col>
        </Row>
      </Col>
      <Col>
        <Button
          style={{
            borderRadius: 0,
          }}
        >
          <Text fontSize="xs">{t('Edit')}</Text>
        </Button>
      </Col>
    </Row>
  );
};

const ImageWrapper = styled(Box)`
  .attribute-item {
    padding: 0.375rem 0.25rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayA50};
  }
`;
