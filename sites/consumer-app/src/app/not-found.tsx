'use client';

import { Box, Flex, Text, styled } from '@packages/ds-core';
import { Button, Image } from 'antd';

const NotFoundPage = () => {
  return (
    <Wrapper>
      <WrapperImage>
        <Image src="/not_found.png" alt="Not found" preview={false} />
      </WrapperImage>
      <Box marginTop="s24">
        <Flex direction="column" align="center" justify="center" gap="s4">
          <Text color="textPrimary" fontSize="l">
            Page not found
          </Text>
          <Box>
            <Text color="textSecondary">
              {"The page you're looking does not seen to exist"}
            </Text>
          </Box>

          <Box marginTop="s24">
            <Button type="primary" href="/">
              Go to Home
            </Button>
          </Box>
        </Flex>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WrapperImage = styled.div`
  max-width: 400px;
  border-radius: 2rem;
  overflow: hidden;
`;

export default NotFoundPage;
