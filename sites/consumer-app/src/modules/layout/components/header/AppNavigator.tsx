import { styled } from '@packages/ds-core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const allNavItems = [
  {
    label: 'Home',
    href: '/',
    activeSegment: null,
  },
  {
    label: 'Blogs',
    href: '/blogs',
    activeSegment: 'promotions',
  },
  {
    label: 'About',
    href: '/about',
    activeSegment: 'about',
  },
  {
    label: 'Contact Us',
    href: '/contact',
    activeSegment: 'contact',
  },
];

export const AppNavigatorBar = () => {
  const pathname = usePathname();

  return (
    <StyleNavigator>
      <NavigtatorWrapper>
        {allNavItems.map((navItem) => (
          <NavItem key={navItem.label}>
            <StyledLink
              href={navItem.href}
              prefetch={false}
              className={pathname === navItem.href ? 'active' : ''}
            >
              {navItem.label}
            </StyledLink>
          </NavItem>
        ))}
      </NavigtatorWrapper>
    </StyleNavigator>
  );
};

const StyleNavigator = styled.nav``;

const NavigtatorWrapper = styled.ul`
  display: flex;
  column-gap: 1.25rem;
`;

const NavItem = styled.li`
  list-style: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textPrimary};

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
  }
`;
