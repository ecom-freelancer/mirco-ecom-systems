import React from 'react';

import { Meta } from '@storybook/react';
import { Text } from './Text';
import { Heading } from './Heading';

export default {
  title: 'ds-core/Typography',
} as Meta;

export const Default = () => {
  return (
    <div>
      <div>
        <Text color="primary">This is a normal Text</Text>
      </div>
      <div>
        <Text color="primary">This is a Text with color Primary</Text>
      </div>
      <div>
        <Text color="primary" underline>
          This is a Text with color Primary and Underlined
        </Text>
      </div>

      <div>
        <Text color="secondary" italic>
          This is a Text with color Secondary and Italic style
        </Text>
      </div>
      <div>
        <Text color="red400" fontWeight="600">
          This is a Text with color Red400 and Font weight 600
        </Text>
      </div>
      <div>
        <Text color="red400" fontSize="s">
          This is a Text with color Red400 and FontSize S
        </Text>
      </div>
    </div>
  );
};

Default.storyName = 'Text';

export const HeadingStory = () => {
  return (
    <div>
      <Heading type="h1">This is Heading 1</Heading>
      <Heading type="h2">This is Heading 2</Heading>
      <Heading type="h3">This is Heading 3</Heading>
      <Heading type="h4">This is Heading 4</Heading>
      <Heading type="h5">This is Heading 5</Heading>
      <Heading type="h1" color="primary400">
        This is Heading 1 with color primary
      </Heading>
    </div>
  );
};

HeadingStory.storyName = 'Heading';
