import React, { useCallback } from 'react';
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
} from 'react-icons/lu';
import { RiParagraph } from 'react-icons/ri';

import {
  RichTextElementType,
  richTextPluginKey,
} from '../../plugins/rich-text/constants';
import { Flex, Text, styled } from '@packages/ds-core';
import { Dropdown } from 'antd';
import { Editor } from 'slate';
import { Element } from 'slate';
import { SlapeElement, SlapePlugin } from '../../types';
import { usePlugin } from '../../hooks/usePlugin';
import { useSlape } from '../../hooks/useSlape';
import { typographyHandler } from '../../plugins/rich-text/handleHotKey';
import { IoChevronDown } from 'react-icons/io5';

export interface TypographyDropdownProps {}

const typographyOptions = [
  {
    name: 'Paragraph',
    icon: <RiParagraph size={18} />,
    type: RichTextElementType.paragraph,
  },
  {
    name: 'Heading 1',
    icon: <LuHeading1 size={18} />,
    type: RichTextElementType.heading1,
  },
  {
    name: 'Heading 2',
    icon: <LuHeading2 size={18} />,
    type: RichTextElementType.heading2,
  },
  {
    name: 'Heading 3',
    icon: <LuHeading3 size={18} />,
    type: RichTextElementType.heading3,
  },
  {
    name: 'Heading 4',
    icon: <LuHeading4 size={18} />,
    type: RichTextElementType.heading4,
  },
  {
    name: 'Heading 5',
    icon: <LuHeading5 size={18} />,
    type: RichTextElementType.heading5,
  },
];

export const TypographyDropdown: React.FC<TypographyDropdownProps> = () => {
  const { editor } = useSlape();
  const plugin = usePlugin<SlapePlugin>(richTextPluginKey);

  const getSelection = useCallback(() => {
    const { selection } = editor;

    if (!selection) return typographyOptions[0];

    const nodes = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) => !Editor.isEditor(n) && Element.isElement(n),
      }),
    ).map((e) => e[0] as SlapeElement);

    // @ts-ignore
    const element = nodes.findLast((e) => plugin.elementKeys.includes(e.type));

    if (!element) {
      return typographyOptions[0];
    } else {
      return (
        typographyOptions.find((o) => o.type === element.type) ||
        typographyOptions[0]
      );
    }
  }, [editor.selection]);

  const selectedOtion = getSelection();

  return (
    <Wrapper className="slap-toolbar-typography">
      <Dropdown
        menu={{
          selectable: true,
          defaultSelectedKeys: [selectedOtion.type],
          items: typographyOptions.map((option) => ({
            key: option.type,
            icon: option.icon,
            label: <Text fontSize="s">{option.name}</Text>,
            onClick: () => {
              typographyHandler(editor, option.type, plugin.elementKeys);
            },
          })),
        }}
      >
        <Flex
          className="icon-button"
          gapX="s16"
          align="center"
          justify="space-between"
        >
          <Flex gapX="s8" align="center">
            {selectedOtion.icon}
            <Text>{selectedOtion.name}</Text>
          </Flex>
          <IoChevronDown size={14} />
        </Flex>
      </Dropdown>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 150px;
`;
