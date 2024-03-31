import { IProductAttribute, IProductAttributeOption } from '../types';
import { useForm } from 'antd/es/form/Form';
import { FormBuilder } from '@packages/react-form-builder';
import React, { useMemo } from 'react';
import { Button, Col, Input, Row } from 'antd';
import { Box, Flex, styled } from '@packages/ds-core';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { debounce } from 'lodash';
import { AiOutlineDrag } from 'react-icons/ai';
import { CiTrash } from 'react-icons/ci';
import { CSS } from '@dnd-kit/utilities';
import { t } from 'i18next';

export interface AttributeUpsertFormProps {
  attribute?: IProductAttribute;
  onSubmit: (values: IProductAttribute) => void;
  onCancel?: () => void;
}

export const AttributeUpsertForm: React.FC<AttributeUpsertFormProps> = ({
  attribute,
  onSubmit,
  onCancel,
}) => {
  const [form] = useForm();
  return (
    <Box marginBottom="s16">
      <FormBuilder<IProductAttribute>
        initialValues={attribute}
        form={form}
        onSubmit={onSubmit}
        validateTrigger="onSubmit"
        configs={{
          name: {
            formType: 'input',
            label: 'Attribute',
            placeholder: 'Enter name of the attribute',
            rules: [
              {
                required: true,
                message: 'Please enter attribute name',
              },
            ],
          },
          options: {
            formType: 'custom',
            label: 'Options',
            render: AttributeOptionsFormItem,
            validateFirst: true,
            rules: [
              {
                validator: (_, value?: IProductAttributeOption[]) => {
                  if (!value || value?.length === 0) {
                    return Promise.reject('Please add at least one option');
                  }
                  return Promise.resolve();
                },
              },
              {
                validator: (_, value?: IProductAttributeOption[]) => {
                  const isFilled = value?.every((option) => !!option.name);
                  if (!isFilled) {
                    return Promise.reject('Please fill all options');
                  }
                  return Promise.resolve();
                },
              },
            ],
          },
        }}
        layouts={[
          {
            name: 'name',
            span: 12,
          },
          {
            name: 'options',
            span: 12,
          },
        ]}
        formLayout="vertical"
      />
      <Box marginTop="s16">
        <Flex justify="end" gapX="s8">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" onClick={form.submit}>
            Save
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

const AttributeOptionsFormItem: React.FC<{
  value?: IProductAttributeOption[];
  onChange?: (value: IProductAttributeOption[]) => void;
}> = ({ value: options = [], onChange: setOptions }) => {
  const addOption = useMemo(() => {
    return debounce(
      () =>
        setOptions?.([
          ...options,
          {
            order: options.length + 1,
            uniqCode: Math.random().toString(36).substr(2, 9),
          },
        ]),
      150,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const previous = [...options];
      const activeIndex = previous.findIndex(
        (option) => (option.id || option.uniqCode) === active.id,
      );
      const overIndex = previous.findIndex(
        (option) => (option.id || option.uniqCode) === over?.id,
      );

      const newOptions = arrayMove(previous, activeIndex, overIndex).map(
        (option, index) => {
          return {
            ...option,
            order: index + 1,
          } as IProductAttributeOption;
        },
      );

      setOptions?.(newOptions);
    }
  };

  const setOptionValue =
    (index: number) => (value: IProductAttributeOption) => {
      const newOptions = [...options];
      newOptions[index] = value;
      setOptions?.(newOptions);
    };

  return (
    <div>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={options.map((i, index) => i.id || i.uniqCode || index + 1)}
        >
          <Flex direction="column" gap="s4">
            {options.map((option, index) => {
              return (
                <OptionItem
                  key={option.id || option.uniqCode}
                  option={option}
                  order={`${option.id || option.uniqCode}`}
                  onChange={setOptionValue(index)}
                />
              );
            })}
          </Flex>
        </SortableContext>
      </DndContext>
      <Button type="primary" block ghost onClick={addOption}>
        Add Option
      </Button>
    </div>
  );
};

const OptionItem: React.FC<{
  option: IProductAttributeOption;
  order: string;
  onChange?: (value: IProductAttributeOption) => void;
}> = ({ order, option, onChange }) => {
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
      gutter={[8, 8]}
      ref={setNodeRef}
      style={{ ...style, marginBottom: '0.5rem' }}
      {...attributes}
    >
      <Col flex={1}>
        <Input
          placeholder={t('Add a Tag')}
          value={option.name}
          onChange={(e) => {
            onChange?.({ ...option, name: e.target.value });
          }}
        />
      </Col>
      <Col>
        <Flex gap="s4">
          <IconButton
            ref={setActivatorNodeRef}
            style={{ touchAction: 'none', cursor: 'move' }}
            {...listeners}
          >
            <AiOutlineDrag />
          </IconButton>
          <IconButton>
            <CiTrash />
          </IconButton>
        </Flex>
      </Col>
    </Row>
  );
};

const IconButton = styled.div`
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  display: inline-flex;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export default AttributeUpsertForm;
