import React, { useContext } from 'react';
import { Editable } from 'slate-react';
import { useSlape } from './hooks/useSlape';
import { styled } from '@packages/ds-core';
import { EditorContext } from './context';

export const SlapEditable = () => {
  const { maxHeight, minHeight, placeHolder } = useContext(EditorContext);

  const { renderLeaf, renderElement, hanldeHotKeys } = useSlape();
  return (
    <Wrapper maxHeight={maxHeight} minHeight={minHeight}>
      <Editable
        className="slape-editable"
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        onKeyDown={hanldeHotKeys}
        placeholder={placeHolder}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  maxHeight?: string;
  minHeight?: string;
}>`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  max-height: ${({ maxHeight }) => maxHeight};
  min-height: ${({ minHeight }) => minHeight};
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.grayA100};
    border-radius: 4px;
  }

  .slape-editable {
    &:focus-visible,
    &:focus-within {
      outline: none;
    }
  }
`;
