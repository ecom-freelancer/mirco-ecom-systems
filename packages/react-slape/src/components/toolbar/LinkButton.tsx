import { styled } from '@packages/ds-core';
import { Tooltip } from 'antd';
import React, { Suspense, useMemo, useState } from 'react';
import { IoMdLink } from 'react-icons/io';
import { useListenEvent } from '../../hooks/useEvent';
import { useSlape } from '../../hooks/useSlape';
import { wrapLink } from '../../plugins/inlines/handleHotKeys';
import { ILink } from '../LinkModal/LinkConfig';

const LinkModal = React.lazy(() => import('../LinkModal/LinkModal'));

export const LinkButton = () => {
  const [open, setOpen] = useState(undefined);

  const { editor } = useSlape();

  const disabled = useMemo(() => {
    const { selection } = editor;
    return !selection;
  }, [editor.selection]);

  useListenEvent<Boolean>((event) => {
    if (event) {
      setOpen(true);
    }
  }, 'hyperlink');

  const onSave = (link: ILink) => {
    if (editor.selection) {
      wrapLink(editor, link);
    }
  };

  const onUnLink = () => {};

  return (
    <React.Fragment>
      <Tooltip title="Hyperlink">
        <IconButton onClick={() => setOpen(true)} disabled={disabled}>
          <IoMdLink />
        </IconButton>
      </Tooltip>
      <Suspense>
        <LinkModal
          open={open}
          onClose={() => setOpen(false)}
          onSave={onSave}
          onUnlink={onUnLink}
        />
      </Suspense>
    </React.Fragment>
  );
};

const IconButton = styled.div<{
  disabled?: boolean;
}>`
  font-size: 20px;
  border-radius: 4px;
  padding: 8px;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray100 : theme.colors.gray};
  display: flex;
  align-items: center;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'unset')};
`;
