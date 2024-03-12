'use client';

import { CounterContext } from '@/providers/CounterProvider';
import React, { useContext } from 'react';

export interface CounterDetailProps {
  counter: number;
}
const CounterDetail: React.FC<CounterDetailProps> = ({ counter }) => {
  const { count } = useContext(CounterContext);
  return (
    <div>
      {count} | {counter}
    </div>
  );
};

export default CounterDetail;
