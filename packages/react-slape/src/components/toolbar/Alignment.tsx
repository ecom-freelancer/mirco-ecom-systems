import { Flex, styled } from '@packages/ds-core';
import React, { useCallback } from 'react';
import {
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiAlignJustify,
} from 'react-icons/ri';

import { useSlape } from '../../hooks/useSlape';
import { Tooltip } from 'antd';
import { alignHandler } from '../../plugins/rich-text/handleHotKey';

import { RichTextElement } from '../../plugins/rich-text/render-element';
import { Editor, Element } from 'slate';
import { SlapeElement, SlapePlugin } from '../../types';
import { usePlugin } from '../../hooks/usePlugin';
import { richTextPluginKey } from '../../plugins/rich-text/constants';
const styleItems: Array<{
  align: RichTextElement['align'];
  icon: React.ReactNode;
  name: string;
}> = [
  {
    align: 'left',
    icon: <RiAlignLeft />,
    name: 'Align Left',
  },
  {
    align: 'center',
    icon: <RiAlignCenter />,
    name: 'Align Center',
  },
  {
    align: 'right',
    icon: <RiAlignRight />,
    name: 'Align Right',
  },
  {
    align: 'justify',
    icon: <RiAlignJustify />,
    name: 'Align Justify',
  },
];

export const Alignment = () => {
  const { editor } = useSlape();
  const plugin = usePlugin<SlapePlugin>(richTextPluginKey);

  const getAlign = useCallback(() => {
    const { selection } = editor;

    if (!selection) return '';

    const nodes = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && !!n['align'],
      }),
    ).map((e) => {
      return e[0] as SlapeElement;
    });

    const element = nodes.findLast((e) =>
      plugin.elementKeys.includes(e.type),
    ) as RichTextElement;

    return element?.align;
  }, [editor.selection, plugin]);

  const align = getAlign();
  return (
    <Flex gapX="s4" align="center">
      {styleItems.map((item) => {
        return (
          <ItemOption
            item={item}
            key={item.align}
            active={align === item.align}
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
  const { editor } = useSlape();

  const handleClick = () => {
    alignHandler(editor, item.align);
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
