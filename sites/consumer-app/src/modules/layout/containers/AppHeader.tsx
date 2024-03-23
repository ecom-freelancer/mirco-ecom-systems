import React from 'react';
import { MainHeader, NavigatorBar } from '../components';

export const AppHeader = async () => {
  return (
    <header>
      <MainHeader />
      <NavigatorBar />
    </header>
  );
};
