import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { IProductCategory, IReorderCategoryPayload } from '../../types';
import React, { useState } from 'react';
import { styled } from '@packages/ds-core';

interface CategoryReorderListProps {
  categories: IProductCategory[];
  loading: boolean;
  onClickCancel: () => void;
  onClickSave: (payload: IReorderCategoryPayload) => Promise<void>;
}

const columns: ColumnsType<IProductCategory> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Code',
    dataIndex: 'code',
  },
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = (props: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };
  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
};

const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: end;
  column-gap: ${({ theme }) => theme.spaces.s8};
  margin-bottom: ${({ theme }) => theme.spaces.s16};
`;

const CategoryReorderList: React.FC<CategoryReorderListProps> = ({
  categories,
  loading,
  onClickCancel,
  onClickSave,
}) => {
  const [dataSource, setDataSource] = useState<IProductCategory[]>([
    ...categories,
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.id === active.id);
        const overIndex = prev.findIndex((i) => i.id === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const handleClickSave = async () => {
    const length = dataSource.length;
    const newOrder = dataSource.map((category, index) => ({
      id: category.id,
      order: length - index,
    }));
    await onClickSave({ newOrder });
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Reorder category list by dragging a row into other rows.</p>
        <ActionButtonsWrapper>
          <Button onClick={onClickCancel}>Cancel</Button>
          <Button type="primary" loading={loading} onClick={handleClickSave}>
            Save
          </Button>
        </ActionButtonsWrapper>
      </div>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={onDragEnd}
      >
        <SortableContext // rowKey array
          items={dataSource.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            components={{
              body: {
                row: Row,
              },
            }}
            rowKey="id"
            columns={columns}
            dataSource={dataSource}
          />
        </SortableContext>
      </DndContext>
    </>
  );
};

export default CategoryReorderList;
