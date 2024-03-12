'use client';

import React from 'react';
import { Box } from './Box';
import CounterDetail from './CounterDetail';

const Counter = async ({ count }: { count?: number }) => {
  const counter = await new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
  return (
    <div>
      <Box>{counter}</Box>
      <CounterDetail counter={counter} />
    </div>
  );
};

export default Counter;
