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

import React, { useState } from 'react';
import AttributeUpsertForm from './AttributeForm';

export interface ProductAttributesFormItemProps {
  value?: IProductAttribute[];
  onChange?: (value: IProductAttribute[]) => void;
}

export const ProductAttributesFormItem: React.FC<
  ProductAttributesFormItemProps
> = ({ value: attributes = [], onChange: setAttributes }) => {
  const [openIndex, setOpenIndex] = useState<number | undefined>();

  const dragable = openIndex === undefined && attributes?.length > 1;

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const previous = [...attributes];
      const activeIndex = previous.findIndex(
        (i) => (i.id || i.uniqCode) === active.id,
      );
      const overIndex = previous.findIndex(
        (i) => (i.id || i.uniqCode) === over?.id,
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

  const onAddAttribute = () => {
    setAttributes?.([
      ...attributes,
      {
        name: '',
        options: [],
        uniqCode: Math.random().toString(36).substr(2, 9),
      },
    ]);
    setOpenIndex(attributes.length);
  };

  const openEdit = (index: number) => {
    setOpenIndex(index);
  };

  const onSetAttribute =
    (index: number) =>
    (value: IProductAttribute, closeEdit = true) => {
      const newAttributes = [...attributes];
      newAttributes[index] = value;
      setAttributes?.(newAttributes);
      if (closeEdit) {
        setOpenIndex(undefined);
      }
    };

  const onRemoveAttribute = (index: number) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes?.(newAttributes);
    setOpenIndex(undefined);
  };

  return (
    <Wrapper>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          disabled={!dragable}
          items={attributes.map(
            (attribute, index) =>
              attribute.id || attribute.uniqCode || index + 1,
          )}
        >
          <Flex direction="column" gap="s4">
            {attributes.map((attribute, index) => {
              return (
                <AttributeItem
                  key={attribute.id || attribute.uniqCode || index}
                  editing={openIndex === index}
                  editable={openIndex === undefined}
                  attribute={attribute}
                  order={`${attribute.id || attribute.uniqCode || index + 1}`}
                  onChange={onSetAttribute(index)}
                  onEdit={() => openEdit(index)}
                  onRemove={() => onRemoveAttribute(index)}
                />
              );
            })}
          </Flex>
        </SortableContext>
      </DndContext>
      <Flex>
        <Button
          block
          type="primary"
          ghost
          icon={<AiOutlinePlus />}
          onClick={onAddAttribute}
        >
          Add a Attribute
        </Button>
      </Flex>
    </Wrapper>
  );
};

const AttributeItem: React.FC<{
  attribute: IProductAttribute;
  order: string;
  editing?: boolean;
  editable?: boolean;
  onChange?: (value: IProductAttribute, closeEdit?: boolean) => void;
  onEdit?: () => void;
  onRemove?: () => void;
}> = ({ attribute, order, editable, editing, onChange, onEdit, onRemove }) => {
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

  const onCloseEdit = () => {
    if (!attribute.name && !attribute?.options?.length) {
      onRemove?.();
    } else {
      onChange?.(attribute, true);
    }
  };

  return (
    <AttributeWrapper>
      {editing ? (
        <AttributeUpsertForm
          onCancel={onCloseEdit}
          attribute={attribute}
          onSubmit={(v) => onChange?.({ ...attribute, ...v })}
        />
      ) : (
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
              disabled={!editable}
              style={{
                borderRadius: 0,
              }}
              onClick={onEdit}
            >
              <Text fontSize="xs">{t('Edit')}</Text>
            </Button>
          </Col>
        </Row>
      )}
    </AttributeWrapper>
  );
};

const Wrapper = styled(Box)``;

const AttributeWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayA50};
  margin-bottom: 0.5rem;
`;
