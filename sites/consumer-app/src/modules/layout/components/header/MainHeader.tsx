'use client';

import { Box, Flex, Text, styled } from '@packages/ds-core';
import { CiBoxList } from 'react-icons/ci';
``;

import React from 'react';
import { Logo } from '../Logo';
import { BiSearchAlt } from 'react-icons/bi';
import { VscAccount } from 'react-icons/vsc';
import { Container } from '../Contatiner';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';

export interface AppHeaderProps {}

export const MainHeader: React.FC<AppHeaderProps> = ({}) => {
  return (
    <StyldAppHeader>
      <Container padding={['s20', 0]}>
        <Wrapper>
          <LeftHeader gap="s12" className="left-header" justify="start">
            <AllCategories>
              <Flex gapX="s12" align="start">
                <CiBoxList className="icon-header" />

                <Flex direction="column" gap="s4" className="hide-md">
                  <Text block transform="uppercase" fontSize="xs">
                    All
                  </Text>
                  <Text
                    block
                    transform="uppercase"
                    fontSize="xs"
                    color="primary"
                  >
                    Categories
                  </Text>
                </Flex>
              </Flex>
            </AllCategories>
            <Box></Box>
          </LeftHeader>
          <CenterHeader className="center-header">
            <Logo />
          </CenterHeader>
          <RightHeader gap="s32" className="right-header" justify="end">
            <BiSearchAlt className="icon-header" />
            <VscAccount className="icon-header" />
            <Flex gapX="s16">
              <PiShoppingCartSimpleBold className="icon-header" />
              <Flex direction="column" gap="s4" className="hide-md">
                <Text block fontSize="xs" transform="uppercase">
                  My cart
                </Text>
                <Text block fontSize="xs" transform="uppercase" color="primary">
                  0 item(s) - $0.00
                </Text>
              </Flex>
            </Flex>
          </RightHeader>
        </Wrapper>
      </Container>
    </StyldAppHeader>
  );
};

const StyldAppHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyA100};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.lightA500};
`;

const Wrapper = styled(Box)`
  display: grid;
  grid-template-areas: 'leaft-header center-header right-header';
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-row-gap: 1rem;

  .icon-header {
    font-size: 2rem;
    transition: all 0.5 ease-in-out;
  }

  .left-header {
    grid-area: leaft-header;
  }

  .center-header {
    grid-area: center-header;
  }

  .right-header {
    grid-area: right-header;
  }

  @media screen and (max-width: 768px) {
    grid-template-areas: 'center-header center-header' 'leaft-header right-header';
    grid-template-columns: 1fr 1fr;

    .icon-header {
      font-size: 1.75rem !important;
    }
    .hide-md {
      display: none;
    }
  }
`;

const LeftHeader = styled(Flex)`
  flex-grow: 2;
  position: relative;
`;

const AllCategories = styled.div`
  position: relative;
  padding-right: 1rem;
  ::after {
    position: absolute;
    content: '';
    width: 1px;
    height: 100%;
    transform: translate(50%, 0);
    border-left: 1px solid ${({ theme }) => theme.colors.greyA200};
    top: 0;
    right: 0;
    z-index: 1;
    flex: 1;
  }
`;
const CenterHeader = styled(Flex)`
  padding: 0.5rem 0.5rem;
  justify-content: center;
  .logo {
    display: block;
  }
`;
const RightHeader = styled(Flex)``;
