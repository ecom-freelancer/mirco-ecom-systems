'use client';

import React, { useEffect, useMemo, useState } from 'react';

export const CounterContext = React.createContext({
  count: 0,
});

export const CounterProvider = ({ children }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  const value = useMemo(() => counter * 2, [counter]);

  return (
    <CounterContext.Provider value={{ count: value }}>
      {children}
    </CounterContext.Provider>
  );
};
