'use client';

import { Text, styled } from '@packages/ds-core';
import { Col, Row } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const allNavItems = [
  {
    label: 'Home',
    href: '/',
    activeSegment: null,
  },
  {
    label: 'Promotions',
    href: '/promotions',
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

export const NavigatorBar = () => {
  const pathname = usePathname();

  return (
    <StyleNavigator>
      <StyledUl>
        <Row>
          {allNavItems.map((navItem, index) => (
            <Col key={navItem.label} span={6} xs={index < 2 ? 12 : 0} md={6}>
              <NavItem>
                <StyledLink
                  href={navItem.href}
                  prefetch={false}
                  className={pathname === navItem.href ? 'active' : ''}
                >
                  <Text transform="uppercase" fontSize="xs">
                    {navItem.label}
                  </Text>
                </StyledLink>
              </NavItem>
            </Col>
          ))}
        </Row>
      </StyledUl>
    </StyleNavigator>
  );
};

const StyleNavigator = styled.nav`
  background: url('/navbar_background.jpg');
  padding: 0.5rem;
  text-align: center;
`;

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  margin: auto;
  margin-block: 0;
  padding-block: 0;
  max-width: 600px;
`;

const NavItem = styled.li`
  list-style: none;
  padding: 1rem;
  white-space: nowrap;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textPrimary};

  &.active {
    font-weight: 500;
  }
`;
