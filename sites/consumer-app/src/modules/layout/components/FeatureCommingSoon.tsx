'use client';

import React from 'react';
import { Box, Heading, Text, Flex } from '@packages/ds-core';

export const FeatureCommingSoon = () => {
  return (
    <Box padding={['s48', 's16']}>
      <Flex direction="column" justify="center" align="center" block>
        <Heading type="h3" color="textSecondary">
          Comming Soon
        </Heading>
        <Box>
          <Text color="textSecondary">
            We are currently working on this feature. Please check back later.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
