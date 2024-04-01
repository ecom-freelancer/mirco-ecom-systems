import { Flex, styled } from '@packages/ds-core';
import React, { useCallback } from 'react';
import { RiItalic, RiBold, RiUnderline, RiStrikethrough } from 'react-icons/ri';
import { IoIosCode } from 'react-icons/io';

import { Editor } from 'slate';
import { Tooltip } from 'antd';
import { inlineHandler } from '../../plugins/rich-text/handleHotKey';
import { IRichLeaf } from '../../plugins/rich-text/types';
import { useEditor } from '../../hooks/useEditor';
const styleItems = [
  {
    style: 'bold',
    icon: <RiBold />,
    name: 'Bold',
  },
  {
    style: 'italic',
    icon: <RiItalic />,
    name: 'Italic',
  },
  {
    style: 'underline',
    icon: <RiUnderline />,
    name: 'Underline',
  },
  {
    style: 'strikethrough',
    icon: <RiStrikethrough />,
    name: 'Strikethrough',
  },
  {
    style: 'code',
    icon: <IoIosCode />,
    name: 'Code',
  },
];

export const SlyleItems = () => {
  const editor = useEditor();
  const getIsActive = useCallback(
    (format: string) => {
      const marks = Editor.marks(editor);
      const isActive = marks ? marks[format] === true : false;
      return isActive;
    },
    [editor.selection],
  );
  return (
    <Flex gapX="s4" align="center">
      {styleItems.map((item) => {
        return (
          <ItemOption
            item={item}
            key={item.style}
            active={getIsActive(item.style)}
          />
        );
      })}
    </Flex>
  );
};

const ItemOption: React.FC<{
  item: (typeof styleItems)[number];
  active?: boolean;
}> = ({ item, active }) => {
  const editor = useEditor();

  const handleClick = () => {
    inlineHandler(editor, item.style as keyof IRichLeaf);
  };

  return (
    <Tooltip title={item.name}>
      <IconButton isActive={active} onClick={handleClick}>
        {item.icon}
      </IconButton>
    </Tooltip>
  );
};

const IconButton = styled.div<{
  isActive: boolean;
}>`
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.gray};
  font-size: 16px;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  align-items: center;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.grayA100 : 'transparent'};
  cursor: pointer;
`;
