import { Space, Switch, Table } from 'antd';
import { useCategories } from 'modules/products/hooks';
import { categoryService } from 'modules/products/services';
import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { IProductCategory } from 'modules/products/types';

const CategoryList = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const { categories, loading } = useCategories();

  const onChangeDisplay = useCallback(async (display: boolean, id: number) => {
    setUpdateLoading(true);
    await categoryService.changeCategoryDisplay(id, display);
    setUpdateLoading(false);
  }, []);

  const columns = useMemo(() => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'Display',
        key: 'display',
        render: (_, category) => (
          <Switch
            defaultChecked={category.display}
            onChange={(value) => onChangeDisplay(value, category.id)}
          />
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, category: IProductCategory) => (
          <Space size="middle">
            <Link to={`/products/categories/${category.id}`}>
              <a>Edit</a>
            </Link>
            <a>Delete</a>
          </Space>
        ),
      },
    ];
  }, [onChangeDisplay]);

  return (
    <Table
      loading={loading || updateLoading}
      dataSource={categories}
      columns={columns}
    />
  );
};

export default CategoryList;
