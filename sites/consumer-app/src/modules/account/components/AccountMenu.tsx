'use client';

import { Flex, Text, styled } from '@packages/ds-core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FiShoppingBag } from 'react-icons/fi';
import { MdOutlineSettings } from 'react-icons/md';

const menuItems = [
  {
    label: 'My details',
    icon: <CgProfile size={20} />,
    href: '/account/profile',
  },
  {
    label: 'My orders',
    icon: <FiShoppingBag size={20} />,
    href: '/account/orders',
  },
  {
    label: 'My newsletters',
    icon: <BiPurchaseTagAlt size={20} />,
    href: '/account/newsletters',
  },
  {
    label: 'Account settings',
    icon: <MdOutlineSettings size={20} />,
    href: '/account/settings',
  },
];

export const AccountMenu = () => {
  const pathname = usePathname();

  return (
    <Flex direction="column" gapY="s2">
      {menuItems.map((item) => (
        <StyledLink href={item.href} prefetch={false} key={item.href}>
          <MenuItem
            gapX="s10"
            align="center"
            isActive={pathname.startsWith(item.href)}
          >
            <Text className="account-icon">{item.icon}</Text>
            <Text>{item.label}</Text>
          </MenuItem>
        </StyledLink>
      ))}
    </Flex>
  );
};

const StyledLink = styled(Link)`
  width: 100%;
`;

const MenuItem = styled(Flex)<{ isActive?: boolean }>`
  padding: 0.5rem;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.secondary : theme.colors.textSecondary};
  .account-icon {
    color: ${({ theme, isActive }) =>
      isActive ? theme.colors.secondary : theme.colors.textPrimary};
  }

  background-color: ${({ theme, isActive }) =>
    isActive && theme.colors.secondaryA50};
  border-radius: 0.5rem;
  :hover {
    color: ${({ theme }) => theme.colors.secondary400} !important;
  }
`;
