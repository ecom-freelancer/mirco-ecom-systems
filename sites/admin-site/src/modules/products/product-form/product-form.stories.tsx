import { Meta, StoryObj } from '@storybook/react';
import { Container } from '@packages/ds-core';

import { CreateProductForm } from './containers';
import { ProductBaseInfoForm } from './components';

import React from 'react';
import { useForm } from 'antd/es/form/Form';
import { IProductCategory } from './types';
const meta: Meta = {
  title: 'Product/Create-Product-Form',
};

export const CreateProductFormStory: StoryObj = () => {
  return <CreateProductForm />;
};

CreateProductFormStory.storyName = 'Form';

const allCategories: IProductCategory[] = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing', parentId: 5 },
  { id: 3, name: 'Books' },
  { id: 4, name: 'Home & Kitchen' },
  { id: 5, name: 'Apparel' },
  { id: 6, name: "Men's Clothing", parentId: 5 },
  { id: 7, name: "Women's Clothing", parentId: 5 },
  { id: 8, name: "Children's Clothing", parentId: 5 },
  { id: 9, name: 'Computers', parentId: 1 },
  { id: 10, name: 'Laptops', parentId: 9 },
  { id: 11, name: 'Desktops', parentId: 9 },
  { id: 12, name: 'Accessories', parentId: 1 },
  { id: 13, name: 'Kitchen Appliances', parentId: 4 },
  { id: 14, name: 'Bedroom', parentId: 4 },
  { id: 15, name: 'Living Room', parentId: 4 },
];

export const BaseFormStory: StoryObj = () => {
  const [form] = useForm();
  return (
    <Container
      padding={['s12', 's12']}
      style={{
        backgroundColor: 'white',
        width: 800,
      }}
    >
      <ProductBaseInfoForm form={form} allCategories={allCategories} />
    </Container>
  );
};

BaseFormStory.storyName = 'Base InfoForm';

export default meta;
