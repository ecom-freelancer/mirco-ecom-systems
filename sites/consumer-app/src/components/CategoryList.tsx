'use client';

import React from 'react';
import { Box } from './Box';

export const CategoryList = ({ categories }: { categories: string[] }) => {
  return (
    <div>
      {categories.map((category) => (
        <div key={category}>{category}</div>
      ))}
      <Box />
    </div>
  );
};
