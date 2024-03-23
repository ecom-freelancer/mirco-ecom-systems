'use client';

import React, { useMemo } from 'react';
import { Box, Flex, Heading, Text, styled } from '@packages/ds-core';
import { useCountdown } from '@packages/react-helper';
import { Button } from 'antd';
import { FaHome } from 'react-icons/fa';

const now = Date.now();

export const FeatureCommingSoon: React.FC = ({}) => {
  const releseDiff = useMemo(() => {
    const releaseDate = new Date(2024, 6, 1).getTime();
    return releaseDate - now > 0 ? Math.floor((releaseDate - now) / 1000) : 0;
  }, []);

  const [time] = useCountdown(releseDiff);
  const days = Math.round(time / (24 * 60 * 60));
  const hours = Math.round((time - days * 86400) / 3600);
  const minutes = Math.round((time - days * 86400 - hours * 3600) / 60);
  const seconds = time % 60;

  return (
    <Wrapper padding={['s48', 's16']} suppressHydrationWarning={true}>
      <Heading type="h1" color="secondary">
        Comming Soon
      </Heading>
      <Box>
        <Text color="textSecondary" fontSize="xs">
          Stay turned for something amazing
        </Text>
      </Box>
      <Box marginTop="s32">
        <Flex align="stretch" gap="s32">
          <Flex direction="column" justify="start" align="center" gap="s4">
            <CountdownValue>{days.toString().padStart(2, '0')}</CountdownValue>
            <Text color="textSecondary" fontSize="s" transform="uppercase">
              Days
            </Text>
          </Flex>
          <Flex direction="column" gap="s4" justify="start" align="center">
            <CountdownValue>{hours.toString().padStart(2, '0')}</CountdownValue>
            <Text color="textSecondary" fontSize="s" transform="uppercase">
              hours
            </Text>
          </Flex>
          <Flex direction="column" gap="s4" justify="start" align="center">
            <CountdownValue>
              {minutes.toString().padStart(2, '0')}
            </CountdownValue>
            <Text color="textSecondary" fontSize="s" transform="uppercase">
              Minutes
            </Text>
          </Flex>
          <Flex direction="column" gap="s4" justify="start" align="center">
            <CountdownValue>
              {seconds.toString().padStart(2, '0')}
            </CountdownValue>
            <Text color="textSecondary" fontSize="s" transform="uppercase">
              Sconds
            </Text>
          </Flex>
        </Flex>
        <Box marginTop="s24">
          <Flex justify="center">
            <Button type="primary" icon={<FaHome />} href="/">
              <Text>Return Home</Text>
            </Button>
          </Flex>
        </Box>
      </Box>
    </Wrapper>
  );
};

const CountdownValue = styled(Box)`
  background-color: white;

  border-radius: 0.5rem;
  color: ${(p) => p.theme.colors.gray};
  font-size: 20px;
  font-weight: 500;
  background: radial-gradient(
    white 0%,
    ${(p) => p.theme.colors.secondaryA100} 100%
  );
  width: 56px;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex: 1;
  height: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background: radial-gradient(white 0%, ${(p) => p.theme.colors.primary} 100%);
  box-sizing: border-box;
`;
