import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { SlapeEditor } from '../SlapeEditor';
import { styled } from '@packages/ds-core';

const meta: Meta = {
  title: 'SLAPE/Editor',
};

export const RichTextStory: StoryObj<typeof SlapeEditor> = (props) => {
  const onValueChange = (value: any) => {};
  return (
    <Wrapper>
      <SlapeEditor
        initialValue={initialValue}
        onChange={onValueChange}
        maxHeight="500px"
        minHeight="500px"
      />
    </Wrapper>
  );
};

RichTextStory.storyName = 'Rich Text Editor';

export default meta;

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich' },
      { text: ' text, ' },
      { text: 'much' },
      { text: ' better than a ' },
      { text: '<textarea>' },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold' },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
      {
        type: 'link',
        href: 'https://twitter.com/JustMissEmma/status/1448679899531726852',
        children: [{ text: 'Finally, here is our favorite dog video.' }],
      },
      { text: 'Try it out for yourself!' },
    ],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [
      { text: 'Try it out for yourself!' },
      {
        type: 'link',
        href: 'https://google.com',
        children: [{ text: 'google' }],
      },
    ],
  },
  {
    type: 'paragraph',
    align: 'right',
    children: [
      {
        type: 'img',
        url: 'https://source.unsplash.com/zOwZKwZOZq8',
        width: 400,
        name: 'Ten anh ne',
        children: [{ text: '' }],
      },
    ],
  },

  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold' },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
];

const Wrapper = styled.div``;
