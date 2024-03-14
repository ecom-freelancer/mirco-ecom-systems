import { Box, Flex, Text, styled } from '@packages/ds-core';
import { Color } from '@packages/ds-core/dist/theme/token';
import React, { useEffect } from 'react';
import { IconType } from 'react-icons';

import { MdError, MdWarning, MdCheckCircle } from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';

export type Status = 'success' | 'warning' | 'error' | 'loading';

export interface StatusConfig {
  message: string;
  icon: IconType;
  color: Color;
}

const colorsStatus: Record<Status, Color> = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  loading: 'primary',
};
const iconsStatus: Record<Status, IconType> = {
  success: MdCheckCircle,
  warning: MdWarning,
  error: MdError,
  loading: MdCheckCircle,
};

export interface StatusAsyncProps {
  asyncFunc: (value) => Promise<Status>;
  messages: Partial<Record<Status, String>>;
  colors?: Partial<Record<Status, Color>>;
  icons?: Partial<Record<Status, IconType>>;
  trigger: string | number | object | boolean;
  triggerOnNull?: boolean;
}

export const StatusAsync: React.FC<StatusAsyncProps> = ({
  messages,
  asyncFunc,
  colors: inputColors,
  icons: inputIcons,
  trigger,
  triggerOnNull = false,
}) => {
  const [status, setStatus] = React.useState<Status>();

  const colors = { ...colorsStatus, ...inputColors };
  const icons = { ...iconsStatus, ...inputIcons };

  const excute = async () => {
    setStatus('loading');
    asyncFunc(trigger).then((status) => setStatus(status));
  };

  useEffect(() => {
    if (!trigger && !triggerOnNull) {
      setStatus(null);
      return;
    }

    excute();
  }, [trigger, triggerOnNull]);

  switch (status) {
    case 'loading':
      return (
        <Flex gap="s6" align="center">
          <InfiniteRote>
            <AiOutlineLoading size={16} />
          </InfiniteRote>
          <Box
            style={{
              paddingTop: 1,
            }}
          >
            <Text fontSize="xs" color={colors.loading}>
              {messages.loading}
            </Text>
          </Box>
        </Flex>
      );
    case 'success':
    case 'warning':
    case 'error':
      const Icon = icons[status];
      return (
        <Flex gap="s6" align="center">
          <IconWrapper color={colors[status]}>
            <Icon fontSize={18} />
          </IconWrapper>
          <Box
            style={{
              paddingTop: 1,
            }}
          >
            <Text fontSize="xs" color={colors[status]}>
              {messages[status]}
            </Text>
          </Box>
        </Flex>
      );
    default:
      return null;
  }
};

const IconWrapper = styled.span<{ color: Color }>`
  display: flex;
  color: ${({ theme, color }) => theme.colors[color]};
  align-items: center;
  justify-content: center;
`;

const InfiniteRote = styled.span`
  animation: infiniteRotate 1s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.primary};

  @keyframes infiniteRotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
