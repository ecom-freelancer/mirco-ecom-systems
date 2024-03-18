'use client';

import { IProductCategory } from '@/modules/category/types';
import { Box, Flex, Text, styled } from '@packages/ds-core';
import { useEffect, useRef, useState } from 'react';
import { IoCaretDownSharp } from 'react-icons/io5';

export interface CategoryWithFilterProps {
  categories: IProductCategory[];
}

const useClickOutside = <T extends HTMLDivElement>(handler) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]);

  return ref;
};

export const CategoryWithFilter: React.FC<CategoryWithFilterProps> = ({
  categories,
}) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const ref = useClickOutside<HTMLDivElement>(() => {
    setOpenMenu(false);
  });

  return (
    <ButtonCategoryWrapper>
      <Wrapper>
        <Flex gapX="s8">
          <Box ref={ref}>
            <ButtonCategory
              gapX="s6"
              align="center"
              onClick={(e) => {
                setOpenMenu(!openMenu);
              }}
            >
              <Text fontSize="xs">All Categories</Text>
              <Box paddingTop="s2">
                <Text fontSize="xs">
                  <IoCaretDownSharp />
                </Text>
              </Box>
            </ButtonCategory>
            <CategoryMenu open={openMenu}>
              {categories.map((category) => (
                <Box padding="s10" key={category.slug}>
                  <Text fontSize="xs">{category.title}</Text>
                </Box>
              ))}
            </CategoryMenu>
          </Box>
          <SearchInput placeholder="Search for items" />
        </Flex>
      </Wrapper>
    </ButtonCategoryWrapper>
  );
};

const Wrapper = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colors.grey100};
  min-width: 450px;
  border-radius: ${({ theme }) => theme.radius.r8};
  padding: 0.5rem 0.75rem;
`;

const ButtonCategoryWrapper = styled(Box)`
  position: relative;
`;

const CategoryMenu = styled(Box)<{ open: boolean }>`
  position: absolute;
  max-width: 250px;
  max-height: 300px;
  top: 45px;
  left: 0px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.grey100};
  border-radius: ${({ theme }) => theme.radius.r8};
  height: ${({ open }) => (open ? 'auto' : '0')};
  opacity: ${({ open }) => (open ? '1' : '0')};
`;

const ButtonCategory = styled(Flex)`
  cursor: pointer;
  position: relative;
  ::after {
    content: '';
    height: 80%;
    padding: 0.5rem 1;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colors.secondary100};
    opacity: 0.5;
    width: 1px;
  }
`;

const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.xs};

  :active,
  :focus {
    outline: none;
    border: none;
    box-shadow: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.secondary100};
  }
`;
