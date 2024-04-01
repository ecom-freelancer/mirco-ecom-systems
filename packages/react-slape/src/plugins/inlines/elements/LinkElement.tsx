import React, { Suspense, useMemo, useState } from 'react';
import { InlineChromiumBugfix } from '../../../components/InlineChromiumBugfix';
import { Tooltip } from 'antd';
import { Flex, Text, styled } from '@packages/ds-core';
import { LuExternalLink } from 'react-icons/lu';
import { MdOutlineLinkOff } from 'react-icons/md';
import { ReactEditor, useSelected } from 'slate-react';
import { BaseElement, Transforms } from 'slate';
import { ILink } from '../../../components/LinkModal/LinkConfig';
import { InlineElement } from '../render-element';
import { unwrapLink } from '../handleHotKeys';
import { useEditor } from '../../../hooks/useEditor';

const LinkModal = React.lazy(
  () => import('../../../components/LinkModal/LinkModal'),
);

export interface LinkElementProps {
  children: React.ReactNode;
  element?: InlineElement;
  attributes?: any;
}

export const LinkElement: React.FC<LinkElementProps> = ({
  element,
  children,
  attributes,
}) => {
  const { href, target, rel } = element;
  const [open, setOpen] = useState(undefined);
  const editor = useEditor();
  const selected = useSelected();

  const path = useMemo(
    () => ReactEditor.findPath(editor, element as BaseElement),
    [element],
  );

  const onUpdateLink = (configs: ILink) => {
    Transforms.setNodes<any>(
      editor,
      {
        ...element,
        ...configs,
      },
      { at: path },
    );
  };

  const onUnlink = () => unwrapLink(editor);

  return (
    <React.Fragment>
      <Tooltip
        zIndex={500}
        overlayInnerStyle={{
          overflow: 'hidden',
          background: 'red',
          textOverflow: 'ellipsis',
        }}
        color="white"
        title={
          <Flex align="center">
            <IconButton onClick={() => setOpen(true)}>
              <Text fontSize="s">Edit Link</Text>
            </IconButton>
            <Line />
            <IconButton onClick={() => window.open(href)}>
              <LuExternalLink />
            </IconButton>
            <Line />
            <IconButton onClick={onUnlink}>
              <MdOutlineLinkOff />
            </IconButton>
          </Flex>
        }
        placement="bottom"
      >
        <a
          {...attributes}
          href={href}
          rel={rel}
          target={target}
          style={{
            color: selected ? 'blue' : 'link',
          }}
          onClick={(ev) => ev.preventDefault()}
        >
          <InlineChromiumBugfix />
          {children}
          <InlineChromiumBugfix />
        </a>
      </Tooltip>
      {open !== undefined && (
        <Suspense>
          <LinkModal
            open={open}
            onClose={() => setOpen(false)}
            onSave={onUpdateLink}
            initialValue={{
              href: href,
              rel: rel,
              target: target,
            }}
          />
        </Suspense>
      )}
    </React.Fragment>
  );
};

const IconButton = styled.div`
  font-size: 16px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: ${({ theme }) => theme.colors.blueGreyA50};
  }
`;

const Line = styled.div`
  height: 24px;
  width: 1px;
  margin: 0 0.5rem;
  background-color: ${({ theme }) => theme.colors.grayA100};
`;
