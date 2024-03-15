'use client';

import { AuthContext } from '@/providers/AuthProvider';
import React, { useContext } from 'react';

export const Footer = () => {
  const { userId } = useContext(AuthContext);
  return (
    <div>
      This section is rendered by the Footer component. The userId is {userId}
    </div>
  );
};
