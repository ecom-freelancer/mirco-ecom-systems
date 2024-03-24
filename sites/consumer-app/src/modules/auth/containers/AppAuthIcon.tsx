'use client';

import { Box, styled } from '@packages/ds-core';
import { useClickOutside } from '@packages/react-helper';
import { Button } from 'antd';
import React, { useState } from 'react';
import { VscAccount } from 'react-icons/vsc';
import { useAuthContext } from '../auth-context';
import Link from 'next/link';

export interface AppAuthIconProps {
  className?: string;
}

export const AppAuthIcon: React.FC<AppAuthIconProps> = ({ className }) => {
  const { loading, user, openLoginModal, logout } = useAuthContext();

  const [open, setOpen] = useState(false);

  const [ref] = useClickOutside<HTMLDivElement>(() => setOpen(false));

  const onClick = (callback?: () => void) => {
    setOpen(false);
    callback?.();
  };

  return (
    <Wrapper ref={ref as any}>
      <VscAccount className={className} onClick={() => setOpen(!open)} />
      {/* drop-down content: login, register | account, my orders, logout */}
      {!loading && (
        <DropdownContentWrapper open={open}>
          <ul>
            {!user ? (
              <React.Fragment>
                <li>
                  <Button
                    type="link"
                    onClick={() => onClick(() => openLoginModal?.('login'))}
                  >
                    Login
                  </Button>
                </li>
                <li>
                  <Button
                    type="link"
                    onClick={() => onClick(() => openLoginModal?.('register'))}
                  >
                    Register
                  </Button>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>
                  <Link prefetch={false} href="/account">
                    <Button type="link" onClick={() => onClick()}>
                      Account
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/account/orders">
                    <Button type="link" onClick={() => onClick()}>
                      My Orders
                    </Button>
                  </Link>
                </li>
                <li>
                  <Button type="link" onClick={() => onClick(logout)} danger>
                    Logout
                  </Button>
                </li>
              </React.Fragment>
            )}
          </ul>
        </DropdownContentWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  position: relative;
  cursor: pointer;
`;

const DropdownContentWrapper = styled(Box)<{
  open: boolean;
}>`
  user-select: none;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0.5rem;
  padding-right: 1rem;
  right: 0;
  top: 48px;
  z-index: 500;
  display: ${({ open }) => (open ? 'block' : 'none')};
  border: 1px solid ${({ theme }) => theme.colors.border};
  ul {
    margin: 0;
    padding: 0;
    padding-block: 0;
  }

  li {
    list-style: none;
  }

  li > a {
    text-decoration: none;
  }
`;
